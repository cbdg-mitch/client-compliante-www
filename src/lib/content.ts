// lib/content.ts
// Typed content loaders for Services, Partners, Company MDX, and Bios.
// Reads from /content using fs/promises. Safe to call from RSC.
// 2025 best-practice: small cached loaders for file-backed content.

import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";

export type ServiceSlug = "compliance" | "revenue-optimization" | "risk-management";
export type PartnerSlug = "alzbetter" | "smartfit" | "healthy-senior-lighting" | "rudio";

export type Service = {
  slug: ServiceSlug;
  title: string;
  summary: string;
  bullets: string[]; // length 4 recommended
  seoTitle: string;
  seoDescription: string;
};

export type Partner = {
  slug: PartnerSlug;
  name: string;
  tagline: string;
  logo: string; // public path to logo
  bullets: string[]; // length 4 recommended
  seoTitle: string;
  seoDescription: string;
};

const root = process.cwd();
const contentDir = path.join(root, "content");

async function readJSON<T>(rel: string): Promise<T> {
  const file = path.join(contentDir, rel);
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw) as T;
}

async function readMDX(rel: string): Promise<string> {
  const file = path.join(contentDir, rel);
  return fs.readFile(file, "utf8");
}

/** SERVICES */
export const getServices = cache(async (): Promise<Service[]> => {
  const services = await readJSON<Service[]>("services.json");
  // Basic validation / normalization
  return services.map((s) => ({
    ...s,
    bullets: Array.isArray(s.bullets) ? s.bullets.slice(0, 8) : [],
  }));
});

export const getServiceBySlug = cache(async (slug: ServiceSlug): Promise<Service | null> => {
  const services = await getServices();
  return services.find((s) => s.slug === slug) ?? null;
});

/** PARTNERS */
export const getPartners = cache(async (): Promise<Partner[]> => {
  const partners = await readJSON<Partner[]>("partners.json");
  return partners.map((p) => ({
    ...p,
    bullets: Array.isArray(p.bullets) ? p.bullets.slice(0, 8) : [],
  }));
});

export const getPartnerBySlug = cache(async (slug: PartnerSlug): Promise<Partner | null> => {
  const partners = await getPartners();
  return partners.find((p) => p.slug === slug) ?? null;
});

/** COMPANY & BIOS MDX (raw MDX string; render with your MDX component) */
export const getCompanyMdx = cache(async (): Promise<{ mdx: string }> => {
  const mdx = await readMDX("company.mdx");
  return { mdx };
});

export const getBioMdx = cache(
  async (name: "charlotte" | "robert"): Promise<{ mdx: string }> => {
    const file =
      name === "charlotte" ? "bios/charlotte.mdx" : "bios/robert.mdx";
    const mdx = await readMDX(file);
    return { mdx };
  }
);

/** Optional helpers for overview pages (if you created these files) */
export const getHomeMdx = cache(async (): Promise<{ mdx: string } | null> => {
  try {
    const mdx = await readMDX("home.mdx");
    return { mdx };
  } catch {
    return null;
  }
});

export const getServicesOverviewMdx = cache(async (): Promise<{ mdx: string } | null> => {
  try {
    const mdx = await readMDX("services-overview.mdx");
    return { mdx };
  } catch {
    return null;
  }
});

export const getPartnersOverviewMdx = cache(async (): Promise<{ mdx: string } | null> => {
  try {
    const mdx = await readMDX("partners-overview.mdx");
    return { mdx };
  } catch {
    return null;
  }
});

export const getLegalMdx = cache(
  async (page: "privacy" | "terms"): Promise<{ mdx: string } | null> => {
    try {
      const mdx = await readMDX(`legal/${page}.mdx`);
      return { mdx };
    } catch {
      return null;
    }
  }
);

export const getSystemMdx = cache(
  async (page: "404" | "500"): Promise<{ mdx: string } | null> => {
    try {
      const mdx = await readMDX(`system/${page}.mdx`);
      return { mdx };
    } catch {
      return null;
    }
  }
);

// Legacy exports for backwards compatibility
export function getService(slug: string): Promise<Service | null> {
  return getServiceBySlug(slug as ServiceSlug);
}

export function getPartner(slug: string): Promise<Partner | null> {
  return getPartnerBySlug(slug as PartnerSlug);
}