import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TestimonialItem {
  quote: string;
  author: string;
  organization?: string;
}

interface TestimonialsProps {
  items: TestimonialItem[];
  className?: string;
  title?: string;
  subtitle?: string;
}

export function Testimonials({ items, className, title = "What our clients say", subtitle }: TestimonialsProps) {
  if (!items?.length) return null;

  return (
    <section className={cn("", className)}>
      <div className="mx-auto max-w-5xl text-center mb-12">
        <h2 className="text-3xl font-bold text-brand-primary font-heading sm:text-4xl">{title}</h2>
        {subtitle && (
          <p className="mt-4 text-lg text-brand-text/80 max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <figure key={i} className="rounded-2xl bg-surface border border-surface-border shadow-card p-6 text-left h-full flex flex-col">
            <Quote aria-hidden className="h-8 w-8 text-brand-secondary" />
            <blockquote className="mt-4 text-brand-text leading-relaxed">“{t.quote}”</blockquote>
            <figcaption className="mt-6 text-sm text-brand-text/80">
              <span className="font-semibold text-brand-primary">{t.author}</span>
              {t.organization ? <span className="block">{t.organization}</span> : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
