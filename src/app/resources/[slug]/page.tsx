import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Prose } from "@/components/prose";
import { RESOURCES } from "@/data/resources";

export async function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = RESOURCES.find((r) => r.slug === slug);
  if (!post) return { title: "Resource Not Found" };
  return { title: post.seoTitle, description: post.seoDescription };
}

export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = RESOURCES.find((r) => r.slug === slug);
  if (!post) notFound();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Resources", item: "https://compliantesolutions.com/resources" },
      { "@type": "ListItem", position: 2, name: post.title, item: `https://compliantesolutions.com/resources/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <Section className="bg-white border-b-4 border-brand-secondary py-12">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-block rounded-full bg-brand-secondary/10 text-brand-secondary text-xs font-semibold px-3 py-1">
              {post.category}
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl font-heading">{post.title}</h1>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Prose>
            {post.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Prose>
        </Container>
      </Section>
    </>
  );
}
