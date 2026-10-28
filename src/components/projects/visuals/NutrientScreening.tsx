const nutrients = [
  ["Protein", "Low"],
  ["Vitamin A", "Low"],
  ["Vitamin B12", "High"],
  ["Folate (B9)", "Moderate"],
  ["Vitamin C", "Low"],
  ["Vitamin D", "High"],
  ["Vitamin E", "Low"],
  ["Iron", "Moderate"],
  ["Calcium", "Moderate"],
  ["Zinc", "Low"],
  ["Magnesium", "Low"],
] as const;
const glyph = { Low: "○", Moderate: "◐", High: "●" } as const;

export function NutrientScreening() {
  return (
    <div className="bg-border grid gap-px lg:grid-cols-[1.3fr_1fr]">
      <div className="bg-surface p-5">
        <p className="eyebrow mb-4">Estimated risk · sample profile</p>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
          {nutrients.map(([n, r]) => (
            <li key={n} className="border-border flex items-center justify-between border-b py-1.5">
              <span className="text-text">{n}</span>
              <span className={r === "High" ? "text-accent" : "text-text-muted"}>
                <span aria-hidden="true">{glyph[r]} </span>
                {r} risk
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-surface flex flex-col gap-3 p-5 text-sm">
        <p className="eyebrow">Why · Vitamin B12</p>
        <ul className="flex flex-col gap-2 text-xs">
          <li className="flex justify-between">
            <span className="text-text">Vegetarian diet</span>
            <span className="text-accent">↑ raises</span>
          </li>
          <li className="flex justify-between">
            <span className="text-text">Reported fatigue</span>
            <span className="text-accent">↑ raises</span>
          </li>
          <li className="flex justify-between">
            <span className="text-text">Dairy intake</span>
            <span className="text-text-muted">↓ lowers</span>
          </li>
        </ul>
        <p className="border-border text-text-muted border-t pt-3 text-xs">
          Suggested next step: confirm with a serum B12 lab test. This is an estimate, not a diagnosis.
        </p>
      </div>
    </div>
  );
}
