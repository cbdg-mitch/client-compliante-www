import Link from "next/link";
import { Container } from "@/components/container";

export function WhoWeServe() {
  const items = [
    {
      title: "Medical Practices",
      desc: "Tighter documentation, fewer denials, and sustainable compliance routines.",
      href: "/services/revenue-optimization",
    },
    {
      title: "SNFs & CCRCs",
      desc: "Pragmatic HIPAA programs, survey readiness, and risk management baked into ops.",
      href: "/services/compliance",
    },
    {
      title: "Multi-site Healthcare",
      desc: "Standardized controls and reporting that scale across locations.",
      href: "/services/risk-management",
    },
  ];

  return (
    <section className="bg-surface-muted">
      <Container>
        <div className="py-14">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-brand-primary font-heading sm:text-4xl">Who we serve</h2>
            <p className="mt-3 text-brand-text/80 max-w-2xl mx-auto">Purpose-built support for providers and operators across care settings.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
              <div key={it.title} className="rounded-2xl bg-surface border border-surface-border shadow-card p-6">
                <h3 className="text-lg font-semibold text-brand-primary">{it.title}</h3>
                <p className="mt-2 text-sm text-brand-text/80">{it.desc}</p>
                <div className="mt-4">
                  <Link href={it.href} className="text-brand-secondary hover:text-brand-primary font-medium">Learn more →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
