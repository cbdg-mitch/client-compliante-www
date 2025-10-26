# Copilot Instructions · Compliante Solutions

Productive defaults for this Next.js 15 (App Router) site using TypeScript, Tailwind v4 tokens, shadcn/ui, and file-based content. Favor Server Components, static generation, and the patterns below.

## Architecture & data flow
- Content lives in `/content` (JSON + MDX). Load via cached helpers in `src/lib/content.ts` (e.g., `getServices()`, `getPartners()`, `getCompanyMdx()`), not fetch.
- Pages are RSC and await loaders directly. Dynamic routes are fully SSG via `generateStaticParams()`.
- Convenience wrappers `getService(slug)` / `getPartner(slug)` call typed `getServiceBySlug`/`getPartnerBySlug` under the hood.

Example (`/services/[slug]`):
```ts
export async function generateStaticParams() {
  const services = await getServices();
  return services.map(s => ({ slug: s.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Next 15 async params
  const service = await getService(slug);
  if (!service) notFound();
  // render…
}
```

## Branding, styling, and UI
- Brand tokens defined in `src/styles/tokens.css` and mapped in `src/app/globals.css` (@theme). Use Tailwind tokens like `bg-brand-primary`, `text-brand-secondary`, `bg-surface`. Never hardcode hex.
- Typography via next/font: Inter (body) and Lato (headings). Use `font-heading` for headings.
- Components: shadcn-style primitives in `src/components/ui/` using CVA; see `ui/button.tsx` variants: `default`(teal), `secondary`(blue), `outline`, `ghost`, `link`; sizes `sm|default|lg|xl`.
- Always merge classes with `cn()` from `src/lib/utils.ts`.

## SEO & metadata
- Every page exports `generateMetadata(): Promise<Metadata>` with title/description. Prefer helpers in `src/lib/seo.ts` (`baseMetadata`, `absUrl`, `serviceMetadata`, JSON‑LD builders like `serviceJsonLd`, `partnerJsonLd`, `breadcrumbsJsonLd`).
- Sitemap via `next-sitemap` (see `next-sitemap.config.js`).

## Contact form (API route)
- Endpoint `src/app/api/contact/route.ts`: validation, honeypot, Cloudflare Turnstile verify, in‑memory rate limiting (`RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX`).
- Email via Mailgun in `src/lib/mailer.ts` (`MAILGUN_API_KEY`, `MAILGUN_DOMAIN`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`). Response shape: `{ success: boolean, error?: string }`.

## Images
- Remote patterns whitelisted in `next.config.ts` (Unsplash/Pexels). Prefer Next `<Image>`.
- Validate external image URLs with `node scripts/validate-images.mjs` using `src/data/images.json` registry (enforces https, host allowlist, width ≥1920, HTTP 200).

## Dev, QA, and conventions
- Commands: `npm run dev` (Turbopack), `npm run build`, `npm run lint`, `npm run typecheck`, `npm test` (Playwright at `tests/smoke.spec.ts`), `npm run format`.
- Accessibility: one `<h1>`/page, proper hierarchy, `.focus-visible` styles, skip link present, AA contrast.
- Types: strict TS, avoid `any`, use `import type` where possible.

## Deployment (summary)
- Doppler-managed env, PM2, NGINX reverse proxy. GitHub Actions deploy: `staging` → `compliante.cbdg-ext.com:3001`, `main` → `compliantesolutions.com:3000`.
- Build artifacts copied server-side; keeps last 5 releases for rollback.

## Environment vars (selected)
`NEXT_PUBLIC_SITE_URL`, `SITE_URL`, `PORT`, `MAILGUN_*`, `CONTACT_*`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `RATE_LIMIT_*`.

Gotchas
- Next 15 async route params: destructure with `const { slug } = await params`.
- Don’t read from a DB—content is file-based. Update `/content/*.json|mdx` and rebuild for SSG.
- Don’t inline colors; use brand tokens. Keep using `cn()` for conditional Tailwind classes.
