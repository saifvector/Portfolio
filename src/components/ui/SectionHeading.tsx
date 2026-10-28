import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  eyebrow,
  title,
  id,
  as: Tag = "h2",
  className,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  id?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <p className="eyebrow flex items-center gap-3">
        {index && <span className="text-accent">{index}</span>}
        <span>{eyebrow}</span>
      </p>
      <Tag id={id} className="font-display text-text text-3xl text-balance">
        {title}
      </Tag>
    </div>
  );
}
