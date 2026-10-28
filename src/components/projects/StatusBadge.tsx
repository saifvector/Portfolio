import type { Project } from "@/data/projects";
import { isRenderable } from "@/lib/evidence";

const glyph: Record<Project["status"], string> = {
  Completed: "●",
  Prototype: "◐",
  "In progress": "◔",
  "Research experiment": "○",
};

export function StatusBadge({ project }: { project: Project }) {
  if (!isRenderable(project.statusEvidence)) return null;
  return (
    <span className="text-text-muted inline-flex items-center gap-2 text-xs tracking-[0.14em] uppercase">
      <span aria-hidden="true" className="text-accent">
        {glyph[project.status]}
      </span>
      <span>
        <span className="sr-only">Status: </span>
        {project.status}
      </span>
    </span>
  );
}
