export type Evidence = "verified" | "reported" | "unverified";

export type Claim<T> = { value: T; evidence: Evidence };

/** Only `verified` and `reported` claims may reach the UI. */
export function isRenderable(evidence: Evidence): boolean {
  return evidence === "verified" || evidence === "reported";
}

export function renderable<T extends { evidence: Evidence }>(items: readonly T[] | undefined): T[] {
  return (items ?? []).filter((item) => isRenderable(item.evidence));
}
