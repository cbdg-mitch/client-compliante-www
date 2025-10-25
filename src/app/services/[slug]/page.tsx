import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { IconList } from "@/components/icon-list";
import { CTA } from "@/components/cta";
import { FeatureSection } from "@/components/feature-section";
import { getService, getServices } from "@/lib/content";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.seoTitle,
    description: service.seoDescription,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  // JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    provider: {
      "@type": "Organization",
      name: "Compliante Solutions Inc.",
      url: "https://compliantesolutions.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Section className="bg-white border-b-4 border-brand-secondary py-12">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl font-heading">
              {service.title}
            </h1>
            <p className="mt-6 text-xl text-brand-text leading-relaxed">
              {service.summary}
            </p>
          </div>
        </Container>
      </Section>

      {/* Visual story and deliverables */}
      <Section>
        <Container>
          {(() => {
            const title = "What you get";
            const base = {
              reverse: false,
            } as const;
            if (service.slug === "compliance") {
              return (
                <FeatureSection
                  {...base}
                  title={title}
                  body="Hands-on programs and artifacts that make compliance practical: built-for-you policies, training, role-based checklists, and inspection readiness."
                  imageSrc="https://images.unsplash.com/photo-1557425529-b1ae9c141e7d?q=80&w=1200&auto=format&fit=crop"
                  imageAlt="Compliance training session"
                  bullets={[
                    "Policy & procedure set with version control",
                    "HIPAA program updates and risk assessments",
                    "Role-based training and attestations",
                    "Mock surveys and inspection readiness",
                  ]}
                />
              );
            }
            if (service.slug === "revenue-optimization") {
              return (
                <FeatureSection
                  {...base}
                  title={title}
                  body="Actionable revenue cycle improvements grounded in documentation integrity and workflow design, not just reports."
                  imageSrc="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1200&auto=format&fit=crop"
                  imageAlt="Financial analytics dashboard"
                  bullets={[
                    "RCM diagnostics and denial pattern analysis",
                    "Documentation & coding improvement playbooks",
                    "Charge capture and claims escalation paths",
                    "KPI pack with weekly operational rhythms",
                  ]}
                />
              );
            }
            return (
              <FeatureSection
                {...base}
                title={title}
                body="A pragmatic risk program aligned to operations: you get visibility, controls, and response routines your teams can actually run."
                imageSrc="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1200&auto=format&fit=crop"
                imageAlt="Risk management planning"
                bullets={[
                  "Operational risk assessment and heatmap",
                  "Control library with owners and cadences",
                  "Incident playbooks and communications",
                  "Business continuity & tabletop exercises",
                ]}
              />
            );
          })()}
        </Container>
      </Section>

      <Section className="bg-gradient-to-br from-brand-primary/2 via-transparent to-brand-secondary/2">
        <Container>
          <div className="max-w-4xl">
            <h2 className="text-2xl font-semibold text-brand-primary font-heading mb-6">
              Key Focus Areas
            </h2>
            <IconList items={service.bullets} />
          </div>
        </Container>
      </Section>

      {service.content && service.content.length > 0 && (
        <Section className="bg-white border-t border-brand-primary/10">
          <Container>
            <div className="max-w-4xl space-y-6">
              {service.content.map((paragraph, index) => (
                <p key={index} className="text-lg text-brand-text leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CTA
        title="Ready to strengthen your practice?"
        description={`Learn how our ${service.title.toLowerCase()} services can help your organization achieve better outcomes.`}
      />
    </>
  );
}