import Link from "next/link";
import { Container } from "@/components/container";

interface HeroProps {
  title: string;
  subtitle?: string;
  support?: string;
  ctaPrimary?: {
    text: string;
    href: string;
  };
  ctaSecondary?: {
    text: string;
    href: string;
  };
}

export function Hero({
  title,
  subtitle,
  support,
  ctaPrimary,
  ctaSecondary,
}: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-white border-b-4 border-brand-secondary">
      {/* Subtle accent decoration */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-primary/3 via-transparent to-brand-secondary/3" />
      
      <Container>
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-primary tracking-tight font-heading">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-6 text-xl text-brand-text leading-relaxed">
                {subtitle}
              </p>
            )}
            {support && (
              <p className="mt-4 text-lg text-brand-text/80">
                {support}
              </p>
            )}
            {(ctaPrimary || ctaSecondary) && (
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center">
                {ctaPrimary && (
                  <Link
                    href={ctaPrimary.href}
                    className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold bg-[var(--btn-bg)] text-[var(--btn-fg)] hover:bg-[var(--btn-bg-hover)] transition-colors shadow-lg"
                  >
                    {ctaPrimary.text}
                  </Link>
                )}
                {ctaSecondary && (
                  <Link
                    href={ctaSecondary.href}
                    className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold border-2 border-white text-white hover:bg-white/10 transition-colors"
                  >
                    {ctaSecondary.text}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}