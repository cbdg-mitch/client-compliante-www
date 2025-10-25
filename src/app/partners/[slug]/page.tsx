import { notFound } from "next/navigation";
import Image from "next/image";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { IconList } from "@/components/icon-list";
import { CTA } from "@/components/cta";
import { FeatureSection } from "@/components/feature-section";
import { getPartner, getPartners } from "@/lib/content";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const partners = await getPartners();
  return partners.map((partner) => ({
    slug: partner.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const partner = await getPartner(slug);

  if (!partner) {
    return {
      title: "Partner Not Found",
    };
  }

  return {
    title: partner.seoTitle,
    description: partner.seoDescription,
  };
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const partner = await getPartner(slug);

  if (!partner) {
    notFound();
  }

  // JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: partner.name,
    description: partner.tagline,
    partner: {
      "@type": "Organization",
      name: "Compliante Solutions, Inc.",
      url: "https://compliantesolutions.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
  <Section className="bg-white border-b border-brand-secondary/20 py-8 lg:py-12">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Partners", href: "/partners" },
              { label: partner.name },
            ]}
          />
          <div className="mt-8">
            <div className="mb-8 h-24 relative max-w-sm">
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                fill
                className="object-contain object-left"
              />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl font-heading">
              {partner.name}
            </h1>
            <p className="mt-6 text-xl text-brand-text leading-relaxed max-w-3xl">
              {partner.tagline}
            </p>
            <div className="mt-6">
              <a
                href="/contact"
                className="inline-flex items-center rounded-lg bg-brand-secondary px-4 py-2 text-white shadow hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/40"
              >
                Talk to us about {partner.name}
              </a>
            </div>
          </div>
        </Container>
      </Section>

  <Section className="bg-gradient-to-br from-brand-primary/2 via-transparent to-brand-secondary/2 py-10 lg:py-14">
        <Container>
          <div className="max-w-4xl">
            <h2 className="text-2xl font-semibold text-brand-primary font-heading mb-6">
              Key Benefits
            </h2>
            <IconList items={partner.bullets} />
          </div>
        </Container>
      </Section>

      {/* Use cases with visual context */}
      <Section className="py-12 lg:py-16">
        <Container>
          {(() => {
            if (partner.slug === "alzbetter") {
              return (
                <FeatureSection
                  title="Where it fits"
                  body="Elevate dementia care programs across SNFs, CCRCs, and home health with structured training, real-time guidance, and measurable outcomes."
                  imageSrc="https://images.unsplash.com/photo-1604881987923-29f81f1e8224?q=80&w=1200&auto=format&fit=crop"
                  imageAlt="Dementia care support"
                  bullets={["Staff upskilling and onboarding", "Consistent care pathways", "Family engagement and support"]}
                />
              );
            }
            if (partner.slug === "smartfit") {
              return (
                <FeatureSection
                  title="Where it fits"
                  body="Brain health labs, wellness centers, and therapy programs that blend cognitive and physical training for measurable gains."
                  imageSrc="https://images.unsplash.com/photo-1558618409-e7797d8dbf9a?q=80&w=1200&auto=format&fit=crop"
                  imageAlt="Cognitive fitness training"
                  bullets={["Balance and executive function", "Attention and memory", "Motivation through gameplay"]}
                />
              );
            }
            if (partner.slug === "healthy-senior-lighting") {
              return (
                <FeatureSection
                  title="Where it fits"
                  body="Circadian lighting for memory care and senior living communities to improve sleep, behavior, and staff alertness."
                  imageSrc="https://images.unsplash.com/photo-1578894383420-4f5d97f0fbd8?q=80&w=1200&auto=format&fit=crop"
                  imageAlt="Circadian lighting in senior living"
                  bullets={["Day/night lighting schedules", "Resident wellbeing", "Staff productivity"]}
                />
              );
            }
            return (
              <FeatureSection
                title="Where it fits"
                body="Healthcare organizations seeking modern, standards-aligned security with pragmatic operations and 24/7 visibility."
                imageSrc="https://images.unsplash.com/photo-1556139930-c23fa4a4c1d6?q=80&w=1200&auto=format&fit=crop"
                imageAlt="Cybersecurity operations"
                bullets={["NIST/ISO-aligned controls", "Continuous monitoring", "Incident response readiness"]}
              />
            );
          })()}
        </Container>
      </Section>

      {partner.content && partner.content.length > 0 && (
        <Section className="bg-white border-t border-brand-primary/10 py-12 lg:py-16">
          <Container>
            <div className="max-w-4xl space-y-6">
              {partner.content.map((paragraph, index) => (
                <p key={index} className="text-lg text-brand-text leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CTA
        title={`Learn how ${partner.name} fits your practice`}
        description="Schedule a consultation to discover how this technology can enhance your organization."
      />
    </>
  );
}