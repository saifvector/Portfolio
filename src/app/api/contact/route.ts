import { NextResponse, type NextRequest } from "next/server";
import { contactSchema, type ContactResponse } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function json(body: ContactResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  if (!apiKey || !to) return json({ ok: false, error: "not_configured" }, 503);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const limit = rateLimit(ip);
  if (!limit.allowed)
    return json({ ok: false, error: "rate_limited" }, 429, { "Retry-After": String(limit.retryAfterSec) });

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ ok: false, error: "validation", fieldErrors: {} }, 400);
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    // A filled honeypot: pretend nothing happened, but never report success.
    if (parsed.error.issues.some((i) => i.path[0] === "company")) return json({ ok: false, error: "server" }, 400);
    return json({ ok: false, error: "validation", fieldErrors: parsed.error.flatten().fieldErrors }, 400);
  }

  const { name, email, message } = parsed.data;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
        html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("Resend rejected contact email", res.status);
      return json({ ok: false, error: "server" }, 502);
    }
    const body = (await res.json().catch(() => null)) as { id?: string } | null;
    if (!body?.id) return json({ ok: false, error: "server" }, 502);
    return json({ ok: true }, 200);
  } catch (err) {
    console.error("Contact email failed", err instanceof Error ? err.name : "unknown");
    return json({ ok: false, error: "server" }, 502);
  }
}
