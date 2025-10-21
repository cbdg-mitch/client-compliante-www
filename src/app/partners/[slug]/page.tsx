import { notFound } from "next/navigation";
import Image from "next/image";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { IconList } from "@/components/icon-list";
import { CTA } from "@/components/cta";
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
      
      <Section className="bg-gradient-to-br from-primary/5 via-white to-secondary/5 py-12">
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
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl font-heading">
              {partner.name}
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-3xl">
              {partner.tagline}
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-4xl">
            <h2 className="text-2xl font-semibold text-primary font-heading mb-6">
              Key Benefits
            </h2>
            <IconList items={partner.bullets} />
          </div>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold text-primary font-heading mb-4">
              Proven Outcomes
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {partner.name} has demonstrated measurable improvements in patient care, 
              operational efficiency, and quality of life for healthcare organizations 
              across the country. Our partnership ensures seamless integration and 
              ongoing support for your implementation.
            </p>
          </div>
        </Container>
      </Section>

      <CTA
        title={`Learn how ${partner.name} fits your practice`}
        description="Schedule a consultation to discover how this technology can enhance your organization."
      />
    </>
  );
}