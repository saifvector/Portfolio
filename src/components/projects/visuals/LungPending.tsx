export function LungPending() {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center gap-3 p-8 text-center">
      <p className="font-display text-text text-2xl">Visual pending verification</p>
      <p className="text-text-muted max-w-md text-sm">
        No scan viewer is shown here. The imaging modality and task haven&apos;t been verified, and I don&apos;t want to
        show anything that misrepresents the experiment.
      </p>
    </div>
  );
}
