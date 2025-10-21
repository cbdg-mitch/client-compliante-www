import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { IconList } from "@/components/icon-list";
import { CTA } from "@/components/cta";
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
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl font-heading">
              {service.title}
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              {service.summary}
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-4xl">
            <h2 className="text-2xl font-semibold text-primary font-heading mb-6">
              Key Focus Areas
            </h2>
            <IconList items={service.bullets} />
          </div>
        </Container>
      </Section>

      <CTA
        title="Ready to strengthen your practice?"
        description={`Learn how our ${service.title.toLowerCase()} services can help your organization achieve better outcomes.`}
      />
    </>
  );
}