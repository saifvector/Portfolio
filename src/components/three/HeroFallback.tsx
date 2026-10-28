/** Static poster for the hero object: used while loading, without WebGL, and on errors. */
export function HeroFallback({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="hf-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#c9a66b" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hf-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e2c48f" />
          <stop offset="45%" stopColor="#3a3a3a" />
          <stop offset="100%" stopColor="#c9a66b" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(#hf-glow)" />
      <g fill="none" stroke="url(#hf-metal)" strokeWidth="10" strokeLinecap="round">
        <ellipse cx="200" cy="200" rx="120" ry="52" transform="rotate(-28 200 200)" />
        <ellipse cx="200" cy="200" rx="120" ry="52" transform="rotate(32 200 200)" />
        <ellipse cx="200" cy="200" rx="52" ry="120" transform="rotate(4 200 200)" opacity="0.8" />
      </g>
    </svg>
  );
}
