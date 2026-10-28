"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { duration, easing, prefersReducedMotion } from "@/lib/motion";

/**
 * Fades/lifts children into view once. Content is visible by default (no-JS and reduced-motion safe).
 * Animates opacity only (not visibility) so hidden content stays in the accessibility tree.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: duration.base,
          delay,
          ease: easing.out,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      }, el);
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [delay]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
