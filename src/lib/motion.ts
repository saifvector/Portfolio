export const easing = {
  outExpo: "expo.out",
  inOutQuart: "power4.inOut",
  out: "power3.out",
} as const;

export const duration = {
  fast: 0.25,
  base: 0.6,
  slow: 1.1,
  entrance: 1.8,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
