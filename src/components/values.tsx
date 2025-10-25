import { ShieldCheck, LineChart, Scale, HeartHandshake } from "lucide-react";

export function Values() {
  const items = [
    { icon: ShieldCheck, title: "Compliance You Can Trust", desc: "Proven frameworks and hands-on enablement to pass inspections with confidence." },
    { icon: LineChart, title: "Revenue With Integrity", desc: "Tight documentation and RCM practices that reduce denials and improve yield." },
    { icon: Scale, title: "Proactive Risk Management", desc: "Operational oversight to prevent issues before they become findings." },
    { icon: HeartHandshake, title: "Partnership, Not Just Advice", desc: "We work shoulder-to-shoulder with your teams to achieve outcomes." },
  ];

  return (
    <section className="bg-surface-muted">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-brand-primary font-heading sm:text-4xl">Why choose Compliante</h2>
          <p className="mt-3 text-brand-text/80 max-w-2xl mx-auto">Our values translate into measurable operational and financial results.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.title} className="rounded-2xl bg-surface border border-surface-border shadow-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-secondary/15">
                <it.icon className="h-6 w-6 text-brand-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-brand-primary">{it.title}</h3>
              <p className="mt-2 text-sm text-brand-text/80">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
