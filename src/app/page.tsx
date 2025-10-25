import Link from "next/link";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrustBand } from "@/components/trust-band";
import { PartnerCard } from "@/components/partner-card";
import { CTA } from "@/components/cta";
import { Testimonials } from "@/components/testimonials";
import { Values } from "@/components/values";
import { FeatureSection } from "@/components/feature-section";
import { getPartners, getTestimonials } from "@/lib/content";
import { Shield, TrendingUp, AlertTriangle } from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "Regulatory Compliance",
    description: "Comprehensive HIPAA solutions, policy development, and training to protect your organization.",
    href: "/services/compliance",
  },
  {
    icon: TrendingUp,
    title: "Revenue Optimization",
    description: "Maximize financial performance through strategic revenue cycle management and analytics.",
    href: "/services/revenue-optimization",
  },
  {
    icon: AlertTriangle,
    title: "Risk Management",
    description: "Proactive strategies to protect operations, finances, and regulatory standing.",
    href: "/services/risk-management",
  },
];

export default async function HomePage() {
  const [partners, testimonials] = await Promise.all([
    getPartners(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero
        title="Your Complete Healthcare Business Partner"
        subtitle="Compliance & Risk. Revenue & Performance. Innovation that moves the needle."
        support="Trusted by SNFs, CCRCs, and healthcare organizations nationwide"
        ctaPrimary={{
          text: "Request a Practice Analysis",
          href: "/contact",
        }}
        ctaSecondary={{
          text: "See How We Help",
          href: "/services",
        }}
      />

      <TrustBand />

      {/* Three Pillars */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-primary font-heading sm:text-4xl">
              Complete Business Partnership
            </h2>
            <p className="mt-4 text-lg text-brand-text/80 max-w-2xl mx-auto">
              We align compliance, risk, and revenue to strengthen your healthcare practice
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <Card key={pillar.title} className="rounded-2xl bg-surface border border-surface-border shadow-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-secondary/15">
                    <pillar.icon className="h-6 w-6 text-brand-secondary" />
                  </div>
                  <CardTitle className="text-xl text-brand-primary">{pillar.title}</CardTitle>
                  <CardDescription className="mt-2 text-brand-text/80">{pillar.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="link" className="p-0">
                    <Link href={pillar.href}>Learn more →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Values />

      {/* Story section with imagery */}
      <Section>
        <Container>
          <FeatureSection
            title="From compliance to performance"
            body="We align compliance, risk, and revenue operations into one operating model. The result is fewer findings, faster documentation cycles, and better financial outcomes—without burnout."
            imageSrc="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop"
            imageAlt="Healthcare team collaborating"
            bullets={[
              "Decrease audit findings and rework",
              "Tighten documentation and coding",
              "Operationalize best practices across teams",
            ]}
          />
        </Container>
      </Section>

      {/* Testimonials */}
      <Section className="bg-white border-t border-brand-primary/10">
        <Container>
          <Testimonials
            items={testimonials}
            subtitle="Real outcomes from healthcare leaders we support"
          />
        </Container>
      </Section>

      {/* Single source of partner logos lives on /partners to avoid duplication on the homepage */}

      {/* Partners Preview */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-primary font-heading sm:text-4xl">
              Innovation Partners
            </h2>
            <p className="mt-4 text-lg text-brand-text/80 max-w-2xl mx-auto">
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

      <CTA />
    </>
  );
}