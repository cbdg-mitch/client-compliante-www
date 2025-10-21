export function TrustBand() {
  const items = [
    "25+ years in healthcare compliance",
    "HIPAA-certified experts",
    "Trusted by SNFs & CCRCs nationwide",
  ];
  
  return (
    <section className="bg-surface-muted">
      <div className="mx-auto max-w-7xl px-6 py-8 grid gap-4 sm:grid-cols-3">
        {items.map((label) => (
          <div key={label} className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-secondary/15 text-brand-secondary text-lg font-bold">
              ✓
            </span>
            <p className="text-sm text-brand-text/90">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}