import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { Section } from "@/components/section";

interface CTAProps {
  title?: string;
  description?: string;
  primaryText?: string;
  primaryHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
}

export function CTA({
  title = "Let's Start Strengthening Your Practice",
  description = "Schedule a practice analysis to discover how we can help you achieve better compliance, reduce risk, and optimize revenue.",
  primaryText = "Request a Practice Analysis",
  primaryHref = "/contact",
  secondaryText,
  secondaryHref,
}: CTAProps) {
  return (
    <Section className="bg-brand-primary border-t-4 border-brand-secondary">
      <Container>
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading">
            {title}
          </h2>
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/95">
              {description}
            </p>
          )}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Button asChild size="xl">
              <Link href={primaryHref}>{primaryText}</Link>
            </Button>
            {secondaryText && secondaryHref && (
              <Button asChild size="xl" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-brand-primary">
                <Link href={secondaryHref}>{secondaryText}</Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}