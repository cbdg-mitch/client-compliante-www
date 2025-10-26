import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CTA } from "@/components/cta";
import { FAQAccordion, faqJsonLd } from "@/components/faq-accordion";
import { SERVICE_COMPLIANCE_COPY as c } from "@/data/copy/service-compliance";
import { serviceJsonLd, serviceMetadata } from "@/lib/seo";
import type { Service } from "@/lib/content";

const svc: Service = {
  slug: "compliance",
  title: "Regulatory Compliance",
  summary: c.overview,
  bullets: [],
  seoTitle: c.meta.title,
  seoDescription: c.meta.description,
};

export const metadata: Metadata = serviceMetadata(svc);

export default function ComplianceServicePage() {
  const jsonLdService = serviceJsonLd(svc);

  const faqLd = faqJsonLd(c.faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <Section className="bg-white border-b-4 border-brand-secondary py-10 lg:py-14">
        <Container>
          <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: "Regulatory Compliance" }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl font-heading">{c.hero.h1}</h1>
            <p className="mt-6 text-xl text-brand-text leading-relaxed">{c.hero.blurb}</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-3xl space-y-6">
            <p className="text-lg text-brand-text leading-relaxed">{c.overview}</p>
          </div>
        </Container>
      </Section>

      <Section className="bg-gradient-to-br from-brand-primary/2 via-transparent to-brand-secondary/2">
        <Container>
          <h2 className="text-2xl font-semibold text-brand-primary font-heading mb-8">Key Focus Areas</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {c.focusAreas.map((fa, i) => (
              <div key={i} className="rounded-2xl bg-surface border border-surface-border shadow-card p-6">
                <h3 className="text-lg font-semibold text-brand-primary">{fa.title}</h3>
                <p className="mt-2 text-brand-text/90">{fa.sentence}</p>
                <ul className="mt-4 space-y-2 text-sm text-brand-text/80 list-disc pl-5">
                  {fa.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-2xl font-semibold text-brand-primary font-heading">How We Work</h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            {c.howWeWork.map((s, i) => (
              <li key={i} className="rounded-2xl bg-surface border border-surface-border shadow-card p-6">
                <div className="text-sm font-semibold text-brand-secondary">Step {i + 1}</div>
                <div className="mt-2 text-lg font-semibold text-brand-primary">{s.step}</div>
                <p className="mt-2 text-brand-text/90">{s.detail}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-white border-y border-brand-primary/10">
        <Container>
          <h2 className="text-2xl font-semibold text-brand-primary font-heading">Deliverables</h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2 list-disc pl-5 text-brand-text/90">
            {c.deliverables.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-2xl font-semibold text-brand-primary font-heading">FAQ</h2>
          <FAQAccordion items={c.faqs} className="mt-6" />
        </Container>
      </Section>

      <CTA title="Let’s start strengthening your practice." />
    </>
  );
}
