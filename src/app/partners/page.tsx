import { Section } from "@/components/section";
import { Container } from "@/components/container";
import LogoCloud from "@/components/logo-cloud";
import { PartnerCard } from "@/components/partner-card";
import { CTA } from "@/components/cta";
import { getPartners } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Innovation Partners - Healthcare Technology Solutions",
  description: "Cutting-edge healthcare technology partnerships: dementia care, brain health, circadian lighting, and cybersecurity solutions.",
};

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <>
      <LogoCloud 
        logos={partners.map((p) => ({
          src: p.logo,
          alt: `${p.name} logo`,
          href: `/partners/${p.slug}`,
        }))}
      />

      <Section>
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl font-heading">
              Innovation Partners
            </h1>
            <p className="mt-6 text-xl text-brand-text/80 leading-relaxed">
              We connect you with proven solutions that drive better outcomes and adoption.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((p) => (
              <PartnerCard 
                key={p.slug} 
                slug={p.slug} 
                name={p.name} 
                tagline={p.tagline} 
                logo={p.logo} 
              />
            ))}
          </div>
        </Container>
      </Section>

      <CTA
        title="Explore Innovation Partnerships"
        description="Discover how these technology solutions can transform your healthcare organization."
      />
    </>
  );
}