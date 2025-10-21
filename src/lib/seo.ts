// lib/seo.ts
// SEO helpers: JSON-LD builders + small utilities for Next.js App Router pages.
// Import into page files to embed structured data via <script type="application/ld+json">.

import type { Metadata } from "next";
import type { Partner, Service } from "./content";

const SITE_NAME = "Compliante Solutions";
const ORG_NAME = "Compliante Solutions, Inc.";
const DEFAULT_DESC =
  "Compliance & Risk. Revenue & Performance. Innovation that moves the needle.";
const DEFAULT_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://compliantesolutions.com";
const LOGO_URL = `${DEFAULT_URL}/images/logo_transparent.png`;

/** Build absolute URL from a path */
export function absUrl(pathname = "/"): string {
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${DEFAULT_URL}${clean}`;
}

/** Base Metadata helper (safe defaults; override per page with generateMetadata) */
export function baseMetadata(overrides?: Partial<Metadata>): Metadata {
  const metadata: Metadata = {
    metadataBase: new URL(DEFAULT_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESC,
    applicationName: SITE_NAME,
    openGraph: {
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      url: DEFAULT_URL,
      images: [{ url: `${DEFAULT_URL}/og.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: DEFAULT_DESC,
      images: [`${DEFAULT_URL}/og.png`],
    },
    alternates: { canonical: DEFAULT_URL },
    robots: { index: true, follow: true },
    ...overrides,
  };
  return metadata;
}

/** Organization JSON-LD */
export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: DEFAULT_URL,
    logo: LOGO_URL,
    sameAs: [
      // add LinkedIn/company page when ready
    ],
  };
}

/** Breadcrumbs JSON-LD */
export function breadcrumbsJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** Service JSON-LD */
export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    provider: {
      "@type": "Organization",
      name: ORG_NAME,
      url: DEFAULT_URL,
      logo: LOGO_URL,
    },
    areaServed: "US",
    url: absUrl(`/services/${service.slug}`),
    serviceType: service.title,
  };
}

/** Partner JSON-LD (as Organization). If a partner is more like a product, adjust @type to Product. */
export function partnerJsonLd(partner: Partner) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: partner.name,
    description: partner.tagline,
    url: absUrl(`/partners/${partner.slug}`),
    logo: absUrl(partner.logo),
    parentOrganization: {
      "@type": "Organization",
      name: ORG_NAME,
      url: DEFAULT_URL,
    },
  };
}

/** Per-page Metadata generators (optional sugar) */
export function serviceMetadata(service: Service): Metadata {
  return {
    title: service.seoTitle || `${service.title} | ${SITE_NAME}`,
    description: service.seoDescription || service.summary,
    alternates: { canonical: absUrl(`/services/${service.slug}`) },
    openGraph: {
      title: service.seoTitle || service.title,
      description: service.seoDescription || service.summary,
      url: absUrl(`/services/${service.slug}`),
      images: [{ url: `${DEFAULT_URL}/og.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle || service.title,
      description: service.seoDescription || service.summary,
      images: [`${DEFAULT_URL}/og.png`],
    },
  };
}

export function partnerMetadata(partner: Partner): Metadata {
  return {
    title: partner.seoTitle || `${partner.name} | ${SITE_NAME}`,
    description: partner.seoDescription || partner.tagline,
    alternates: { canonical: absUrl(`/partners/${partner.slug}`) },
    openGraph: {
      title: partner.seoTitle || partner.name,
      description: partner.seoDescription || partner.tagline,
      url: absUrl(`/partners/${partner.slug}`),
      images: [{ url: `${DEFAULT_URL}/og.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: partner.seoTitle || partner.name,
      description: partner.seoDescription || partner.tagline,
      images: [`${DEFAULT_URL}/og.png`],
    },
  };
}
