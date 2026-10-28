import Link from "next/link";
import type { Project } from "@/data/projects";
import { renderable } from "@/lib/evidence";
import { StatusBadge } from "./StatusBadge";

/** Editorial numbered index of projects (a list, not a card grid). */
export function ProjectIndex({ projects, headingLevel = "h3" }: { projects: Project[]; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ol className="border-border border-t">
      {projects.map((p, i) => {
        const stack = renderable(p.stack).slice(0, 4);
        return (
          <li key={p.slug} className="border-border border-b">
            <Link
              href={`/projects/${p.slug}`}
              className="group grid-editorial hover:bg-surface/60 focus-visible:bg-surface/60 items-baseline gap-y-3 py-8 transition-colors md:py-10"
            >
              <span className="font-display text-accent col-span-1 text-xl tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="col-span-3 flex flex-col gap-2 md:col-span-5 lg:col-span-6">
                <H className="font-display text-text group-hover:text-accent text-2xl transition-colors">{p.title}</H>
                <p className="text-text-muted text-sm">{p.subtitle.value}</p>
              </div>
              <div className="col-span-4 col-start-2 flex flex-col gap-3 md:col-span-2 md:col-start-auto lg:col-span-4">
                <p className="text-text-muted text-sm">{p.category.join(" · ")}</p>
                {stack.length > 0 && (
                  <p className="text-text-muted/80 text-xs">{stack.map((s) => s.value).join(" / ")}</p>
                )}
              </div>
              <div className="col-span-4 col-start-2 flex items-center justify-between md:col-span-1 md:col-start-auto md:justify-end">
                <span className="md:hidden">
                  <StatusBadge project={p} />
                </span>
                <span
                  aria-hidden="true"
                  className="text-text-muted group-hover:text-accent text-xl transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
