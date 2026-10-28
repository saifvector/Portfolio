import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 px-6 text-sm tracking-wide transition-colors duration-200 rounded-[var(--radius-sm)]";
const variants: Record<Variant, string> = {
  primary: "bg-accent text-bg hover:bg-accent-strong",
  ghost: "border border-border-strong text-text hover:border-accent hover:text-accent",
};

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  external,
  ...rest
}: { href: string; variant?: Variant; external?: boolean; children: ReactNode } & Omit<ComponentProps<"a">, "href">) {
  const cls = cn(base, variants[variant], className);
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
