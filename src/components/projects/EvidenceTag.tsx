export function IllustrativeLabel({ text = "Illustrative" }: { text?: string }) {
  return (
    <span className="border-accent/40 bg-bg/80 text-accent inline-flex items-center gap-1.5 border px-2 py-1 text-[11px] tracking-[0.16em] uppercase">
      <span aria-hidden="true">◇</span>
      {text}
    </span>
  );
}
