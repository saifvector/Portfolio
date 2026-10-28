"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput, type ContactResponse } from "@/lib/validation";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "validation" | "server" | "rate_limited" | "not_configured";

const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
] as const;

export function ContactForm({ configured, fallbackEmail }: { configured: boolean; fallbackEmail: string | null }) {
  const [status, setStatus] = useState<Status>(configured ? "idle" : "not_configured");
  const statusRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
    shouldFocusError: true,
  });

  useEffect(() => {
    if (status === "success" || status === "server" || status === "rate_limited") statusRef.current?.focus();
  }, [status]);

  const onSubmit = async (data: ContactInput) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({ ok: false, error: "server" }))) as ContactResponse;
      if (body.ok) {
        reset();
        setStatus("success");
        return;
      }
      if (body.error === "validation") {
        const order: (keyof ContactInput)[] = ["name", "email", "message"];
        let first: keyof ContactInput | undefined;
        for (const key of order) {
          const msg = body.fieldErrors[key]?.[0];
          if (msg) {
            setError(key, { message: msg });
            first ??= key;
          }
        }
        setStatus(first ? "validation" : "server");
        if (first) setFocus(first);
        return;
      }
      setStatus(body.error);
    } catch {
      setStatus("server");
    }
  };

  const mailto = fallbackEmail ? (
    <a href={`mailto:${fallbackEmail}`} className="text-accent underline underline-offset-4">
      {fallbackEmail}
    </a>
  ) : null;

  const message: Record<Exclude<Status, "idle" | "submitting" | "validation">, React.ReactNode> = {
    success: <>Thanks. Your message was delivered, and I&apos;ll reply by email.</>,
    server: (
      <>
        Something went wrong and your message was <strong>not</strong> sent. Please try again
        {mailto ? <> or email me at {mailto}</> : null}.
      </>
    ),
    rate_limited: (
      <>
        Too many messages from this connection. Please wait a few minutes{mailto ? <> or email me at {mailto}</> : null}
        .
      </>
    ),
    not_configured: (
      <>
        Contact form not configured, so messages can&apos;t be sent from here yet.
        {mailto ? <> Please email me at {mailto}.</> : " Please reach me through GitHub for now."}
      </>
    ),
  };

  const inputCls = (invalid: boolean) =>
    cn(
      "min-h-12 w-full border bg-surface px-4 py-3 text-text placeholder:text-text-muted/60 transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
      invalid ? "border-warning/60" : "border-border-strong focus:border-accent",
    );

  const showBanner = status !== "idle" && status !== "submitting" && status !== "validation";
  const errorCount = Object.keys(errors).filter((k) => k !== "company").length;

  return (
    <div className="flex flex-col gap-6">
      <div aria-live="polite" role="status" className="empty:hidden">
        {errorCount > 0 ? (
          <p className="text-text-muted flex items-center gap-2 text-sm">
            <span aria-hidden="true" className="bg-warning inline-block size-1.5 rounded-full" />
            Please check {errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`}.
          </p>
        ) : null}
      </div>
      {showBanner && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role={status === "success" ? "status" : "alert"}
          className={cn(
            "border p-5 text-sm",
            status === "success"
              ? "border-accent/50 bg-accent/10 text-text"
              : "border-warning/40 bg-warning-bg text-text",
          )}
        >
          <span aria-hidden="true" className="mr-2">
            {status === "success" ? "✓" : "!"}
          </span>
          {message[status]}
        </div>
      )}
      {status !== "not_configured" && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6" aria-label="Contact form">
          {fields.map((f) => (
            <div key={f.name} className="flex flex-col gap-2">
              <label htmlFor={`cf-${f.name}`} className="text-text text-sm">
                {f.label}
              </label>
              <input
                id={`cf-${f.name}`}
                type={f.type}
                autoComplete={f.autoComplete}
                aria-invalid={Boolean(errors[f.name])}
                aria-describedby={errors[f.name] ? `cf-${f.name}-err` : undefined}
                className={inputCls(Boolean(errors[f.name]))}
                {...register(f.name)}
              />
              {errors[f.name] && (
                <p id={`cf-${f.name}-err`} className="text-warning text-xs">
                  {errors[f.name]?.message}
                </p>
              )}
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <label htmlFor="cf-message" className="text-text text-sm">
              Message
            </label>
            <textarea
              id="cf-message"
              rows={6}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "cf-message-err" : "cf-message-hint"}
              className={cn(inputCls(Boolean(errors.message)), "resize-y")}
              {...register("message")}
            />
            {errors.message ? (
              <p id="cf-message-err" className="text-warning text-xs">
                {errors.message.message}
              </p>
            ) : (
              <p id="cf-message-hint" className="text-text-muted text-xs">
                At least 20 characters.
              </p>
            )}
          </div>
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="cf-company">Company</label>
            <input id="cf-company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
          </div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="bg-accent text-bg hover:bg-accent-strong inline-flex min-h-12 items-center justify-center self-start px-8 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "submitting" ? "Sending…" : "Send message"}
          </button>
        </form>
      )}
    </div>
  );
}
