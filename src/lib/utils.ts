import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function siteUrl(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return undefined;
  return raw.replace(/\/+$/, "");
}

/** Canonical alternates only when the public origin is known; relative canonicals without metadataBase are invalid. */
export function canonical(path: string): { alternates?: { canonical: string } } {
  return siteUrl() ? { alternates: { canonical: path } } : {};
}
