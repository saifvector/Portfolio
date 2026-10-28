import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (at least 2 characters).")
    .max(100, "Name must be 100 characters or fewer."),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  message: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters so I have some context.")
    .max(5000, "Message must be 5,000 characters or fewer."),
  /** Honeypot: real users never see or fill this. */
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResponse =
  | { ok: true }
  | { ok: false; error: "validation"; fieldErrors: Partial<Record<keyof ContactInput, string[]>> }
  | { ok: false; error: "rate_limited" | "not_configured" | "server" };
