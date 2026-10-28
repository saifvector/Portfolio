const permissions = ["READ_SMS", "RECEIVE_SMS", "SYSTEM_ALERT_WINDOW", "REQUEST_INSTALL_PACKAGES", "INTERNET"];

export function FraudForensics() {
  return (
    <div className="bg-border grid gap-px md:grid-cols-3">
      <div className="bg-surface flex flex-col gap-3 p-5 text-sm">
        <p className="eyebrow">Metadata</p>
        <dl className="grid gap-1 text-xs">
          <dt className="text-text-muted">Package</dt>
          <dd className="text-text">com.example.quickloan</dd>
          <dt className="text-text-muted">Listing claims</dt>
          <dd className="text-text">“Instant loans, no documents”</dd>
        </dl>
      </div>
      <div className="bg-surface flex flex-col gap-3 p-5 text-sm">
        <p className="eyebrow">Observed evidence</p>
        <ul className="text-text flex flex-col gap-1 text-xs">
          {permissions.map((p) => (
            <li key={p} className="font-mono">
              {p}
            </li>
          ))}
        </ul>
        <p className="text-text-muted text-xs">Requested in the manifest. These are facts, not conclusions.</p>
      </div>
      <div className="bg-surface-elevated flex flex-col gap-3 p-5 text-sm">
        <p className="eyebrow text-accent">Model prediction</p>
        <p className="font-display text-text text-3xl">0.82</p>
        <p className="text-text-muted text-xs">
          Estimated resemblance to fraudulent training samples. This is not a verdict, and a person should review it.
        </p>
        <p className="text-text-muted text-xs">Top factors: SMS permissions, overlay permission.</p>
      </div>
    </div>
  );
}
