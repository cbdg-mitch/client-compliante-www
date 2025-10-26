"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export type FAQ = { q: string; a: string };

export function faqJsonLd(items: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function FAQAccordion({ items, className }: { items: FAQ[]; className?: string }) {
  if (!items?.length) return null;
  return (
    <div className={cn("divide-y divide-brand-primary/10 rounded-2xl bg-surface border border-surface-border", className)}>
      {items.map((f, i) => (
        <details key={i} className="group p-6 open:bg-white open:shadow-sm rounded-2xl">
          <summary className="cursor-pointer list-none select-none flex items-start justify-between gap-4">
            <h3 className="text-base font-semibold text-brand-primary">{f.q}</h3>
            <span className="mt-1 text-brand-secondary group-open:rotate-45 transition">+</span>
          </summary>
          <div className="mt-3 text-brand-text/90 leading-relaxed">
            {f.a}
          </div>
        </details>)
      )}
    </div>
  );
}
