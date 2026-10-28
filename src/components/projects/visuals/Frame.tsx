import type { ReactNode } from "react";
import { IllustrativeLabel } from "../EvidenceTag";

export function VisualFrame({
  illustrative,
  caption,
  children,
}: {
  illustrative: boolean;
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="flex flex-col gap-3">
      <div className="border-border bg-surface relative overflow-hidden border">
        {illustrative && (
          <div className="absolute top-3 left-3 z-10">
            <IllustrativeLabel />
          </div>
        )}
        {children}
      </div>
      <figcaption className="text-text-muted text-xs">{caption}</figcaption>
    </figure>
  );
}
