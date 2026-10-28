import type { Project } from "@/data/projects";

const copy: Record<NonNullable<Project["disclaimer"]>, { title: string; body: string }> = {
  medical: {
    title: "Experimental research. Not a diagnostic tool.",
    body: "This project is a student research experiment. It has not been clinically validated and must not be used to diagnose, screen or treat anyone.",
  },
  security: {
    title: "Model output is not a verdict.",
    body: "Scores and flags here are model predictions, kept separate from observed evidence. A flagged item still needs human investigation. Nothing here is a definitive finding.",
  },
  experimental: {
    title: "Experimental prototype.",
    body: "This is a prototype built to learn. Generated diagnoses can be wrong and should be reviewed by a person.",
  },
};

export function Disclaimer({ kind }: { kind: NonNullable<Project["disclaimer"]> }) {
  const c = copy[kind];
  return (
    <aside
      role="note"
      aria-label="Disclaimer"
      className="border-warning/40 bg-warning-bg flex gap-4 border p-5 text-sm"
    >
      <span aria-hidden="true" className="font-display text-warning mt-0.5 text-xl leading-none">
        !
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-text font-medium">{c.title}</p>
        <p className="text-text-muted">{c.body}</p>
      </div>
    </aside>
  );
}
