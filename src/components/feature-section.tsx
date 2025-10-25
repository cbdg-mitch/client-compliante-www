import Image from "next/image";
import { cn } from "@/lib/utils";

interface FeatureSectionProps {
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  bullets?: string[];
  reverse?: boolean;
  className?: string;
}

export function FeatureSection({ title, body, imageSrc, imageAlt, bullets = [], reverse = false, className }: FeatureSectionProps) {
  return (
    <section className={cn("", className)}>
      <div className={cn("mx-auto max-w-7xl px-6 grid gap-10 lg:grid-cols-2 items-center", reverse && "lg:[&>div:first-child]:order-2")}> 
        <div>
          <h3 className="text-2xl font-bold text-brand-primary font-heading">{title}</h3>
          <p className="mt-4 text-brand-text leading-relaxed">{body}</p>
          {bullets.length > 0 && (
            <ul className="mt-6 grid gap-3">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-secondary/15 text-brand-secondary text-xs font-bold">✓</span>
                  <span className="text-brand-text">{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-surface-border shadow-card">
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 640px" />
        </div>
      </div>
    </section>
  );
}
