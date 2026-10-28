const steps = [
  { name: "Checkout", state: "pass" },
  { name: "Install", state: "pass" },
  { name: "Lint", state: "pass" },
  { name: "Test", state: "fail" },
  { name: "Build", state: "skip" },
] as const;
const label = { pass: "passed", fail: "failed", skip: "skipped" } as const;
const glyph = { pass: "✓", fail: "✕", skip: "–" } as const;

export function CIPipeline() {
  return (
    <div className="bg-border flex flex-col gap-px">
      <ol className="bg-border flex flex-wrap gap-px" aria-label="Sample pipeline steps">
        {steps.map((s) => (
          <li
            key={s.name}
            className={`bg-surface flex min-w-[6.5rem] flex-1 items-center gap-2 px-4 py-3 text-sm ${s.state === "fail" ? "text-warning" : s.state === "skip" ? "text-text-muted/70" : "text-text"}`}
          >
            <span aria-hidden="true">{glyph[s.state]}</span>
            {s.name}
            <span className="sr-only">: {label[s.state]}</span>
          </li>
        ))}
      </ol>
      <div className="bg-border grid gap-px lg:grid-cols-2">
        <pre
          className="bg-bg text-text-muted overflow-x-auto p-5 text-xs leading-relaxed"
          aria-label="Sample log excerpt"
        >
          {`> jest --ci
 FAIL  src/utils/date.test.ts
  ● formatDate › handles timezone
    Expected: "2024-03-01"
    Received: "2024-02-29"
Tests: 1 failed, 41 passed`}
        </pre>
        <div className="bg-surface flex flex-col gap-3 p-5 text-sm">
          <p className="eyebrow">Diagnosis · LLM explanation</p>
          <p className="text-text">
            <span className="text-accent">Likely cause:</span> the date test assumes a local timezone, and CI runs in
            UTC.
          </p>
          <p className="text-text-muted">
            <span className="text-text">Next steps:</span> pin TZ in the test environment, or format with an explicit
            timezone.
          </p>
          <p className="text-text-muted text-xs">Category: test failure · Similar past incidents: 2</p>
        </div>
      </div>
    </div>
  );
}
