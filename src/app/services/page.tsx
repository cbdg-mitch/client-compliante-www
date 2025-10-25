import Link from "next/link";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/cta";
import { getServices } from "@/lib/content";
import { Shield, TrendingUp, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Services - Compliance, Revenue & Risk Management",
  description: "Expert healthcare compliance, revenue optimization, and risk management services. Comprehensive solutions for SNFs, CCRCs, and healthcare organizations.",
};

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  compliance: Shield,
  "revenue-optimization": TrendingUp,
  "risk-management": AlertTriangle,
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <Section className="bg-white border-b-4 border-brand-secondary py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl font-heading">
              Complete Healthcare Solutions
            </h1>
            <p className="mt-6 text-xl text-brand-text leading-relaxed">
              We align compliance, risk, and financial performance to create sustainable, 
              high-performing healthcare organizations. Every service we provide is designed 
              to strengthen your practice and improve outcomes.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = serviceIcons[service.slug] || Shield;
              return (
                <Card key={service.slug} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-brand-secondary/15">
                      <Icon className="h-7 w-7 text-brand-secondary" />
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <CardDescription className="mt-3 text-base">
                      {service.summary}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.bullets.slice(0, 3).map((bullet, index) => (
                        <li key={index} className="text-sm text-brand-text/80">
                          • {bullet}
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/services/${service.slug}`}>
                        Learn More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}