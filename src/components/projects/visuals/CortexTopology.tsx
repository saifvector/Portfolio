const hosts = [
  { id: "A", x: 80, y: 90 },
  { id: "B", x: 80, y: 250 },
  { id: "GW", x: 260, y: 170 },
  { id: "C", x: 440, y: 70 },
  { id: "D", x: 440, y: 270 },
];
const flows = [
  ["A", "GW"],
  ["B", "GW"],
  ["GW", "C"],
  ["GW", "D", "flag"],
] as const;
const pos = (id: string) => hosts.find((h) => h.id === id)!;

export function CortexTopology() {
  return (
    <div className="bg-border grid gap-px lg:grid-cols-[1.4fr_1fr]">
      <svg
        viewBox="0 0 520 340"
        className="bg-surface w-full"
        role="img"
        aria-label="Simulated network topology with five hosts. One flow from the gateway to host D is highlighted as a model prediction."
      >
        {flows.map(([a, b, f]) => {
          const p = pos(a),
            q = pos(b);
          return (
            <line
              key={a + b}
              x1={p.x}
              y1={p.y}
              x2={q.x}
              y2={q.y}
              stroke={f ? "#c9a66b" : "rgba(255,255,255,0.18)"}
              strokeWidth={f ? 2 : 1}
              strokeDasharray={f ? "6 4" : undefined}
            />
          );
        })}
        {hosts.map((h) => (
          <g key={h.id}>
            <rect x={h.x - 22} y={h.y - 16} width="44" height="32" fill="#1b1b1b" stroke="rgba(255,255,255,0.16)" />
            <text x={h.x} y={h.y + 5} textAnchor="middle" fontSize="13" fill="#f5f5f5" fontFamily="var(--font-sans)">
              {h.id}
            </text>
          </g>
        ))}
        <text x="350" y="205" fontSize="11" fill="#c9a66b" fontFamily="var(--font-sans)">
          predicted: anomalous flow
        </text>
      </svg>
      <div className="bg-surface flex flex-col gap-4 p-5 text-sm">
        <p className="eyebrow">Inspection panel · sample flow</p>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
          <dt className="text-text-muted">Observed</dt>
          <dd className="text-text">GW → D, TCP, 214 packets</dd>
          <dt className="text-text-muted">Observed</dt>
          <dd className="text-text">Flow duration 3.1 s</dd>
          <dt className="text-accent">Model prediction</dt>
          <dd className="text-text">Resembles DoS class</dd>
          <dt className="text-accent">Top SHAP feature</dt>
          <dd className="text-text">Fwd packet count</dd>
        </dl>
        <ol className="border-border text-text-muted flex flex-col gap-2 border-t pt-4 text-xs">
          <li>00:00.0 flow opened · GW → D</li>
          <li>00:03.1 flow closed · 20 features computed</li>
          <li>00:03.1 prediction emitted → needs review</li>
        </ol>
      </div>
    </div>
  );
}
