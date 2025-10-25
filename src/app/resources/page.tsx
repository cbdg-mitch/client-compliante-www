import Link from "next/link";
import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RESOURCES } from "@/data/resources";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Resources & Insights for Healthcare Leaders",
    description: "Plain-English insights on compliance, revenue, risk, and innovation. Practical playbooks you can use this quarter.",
  };
}

export default function ResourcesIndexPage() {
  const posts = RESOURCES;
  return (
    <>
      <Section className="bg-white border-b-4 border-brand-secondary py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl font-heading">Resources</h1>
            <p className="mt-6 text-xl text-brand-text leading-relaxed">
              Insights that help operators reduce findings, improve cash flow, and manage risk—without the jargon.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <Card key={post.slug} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="inline-block rounded-full bg-brand-secondary/10 text-brand-secondary text-xs font-semibold px-3 py-1">
                    {post.category}
                  </div>
                  <CardTitle className="mt-3 text-2xl text-brand-primary">
                    <Link href={`/resources/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="mt-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/resources/${post.slug}`} className="text-brand-secondary hover:text-brand-primary font-medium">
                    Read more →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
