"use client";

import { useId, useRef, useState } from "react";
import type { ProjectResultGroup } from "@/data/projects";
import { renderable } from "@/lib/evidence";

const frames = ["MRI slice", "Ground truth", "Prediction"];

export function BrainMetrics({ groups }: { groups: ProjectResultGroup[] }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + groups.length) % groups.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="bg-border flex flex-col gap-px">
      <div className="bg-border grid grid-cols-3 gap-px">
        {frames.map((f) => (
          <div key={f} className="bg-bg flex aspect-square flex-col items-center justify-center gap-2 p-3 text-center">
            <span className="text-text text-xs">{f}</span>
            <span className="text-text-muted text-[11px]">Output image not available</span>
          </div>
        ))}
      </div>
      <div className="bg-surface">
        <div role="tablist" aria-label="Evaluation datasets" className="border-border flex border-b">
          {groups.map((g, i) => (
            <button
              key={g.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`${base}-tab-${g.id}`}
              aria-selected={active === i}
              aria-controls={`${base}-panel-${g.id}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`min-h-11 flex-1 px-4 text-sm transition-colors ${active === i ? "border-accent text-text border-b-2" : "text-text-muted hover:text-text"}`}
            >
              {g.label}
            </button>
          ))}
        </div>
        {groups.map((g, i) => (
          <div
            key={g.id}
            role="tabpanel"
            id={`${base}-panel-${g.id}`}
            aria-labelledby={`${base}-tab-${g.id}`}
            hidden={active !== i}
            className="p-5"
          >
            <p className="text-text-muted mb-4 text-sm">{g.note}</p>
            <dl className="bg-border grid gap-px sm:grid-cols-2 lg:grid-cols-3">
              {renderable(g.results).map((r) => (
                <div key={r.label} className="bg-surface flex flex-col gap-1 p-4">
                  <dt className="text-text-muted text-xs">{r.label}</dt>
                  <dd className="font-display text-text text-2xl">{r.value}</dd>
                  <dd className="text-text-muted text-xs">
                    {r.context}
                    {r.evidence === "reported" ? " · reported, not re-run" : ""}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
