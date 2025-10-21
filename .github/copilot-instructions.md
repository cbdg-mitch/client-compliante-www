# Copilot Instructions for Compliante Solutions Website

## Project Overview
Next.js 15 (App Router) healthcare compliance consulting website using TypeScript, Tailwind CSS v4, and file-based content management. Production-ready with SEO, accessibility (WCAG 2.2 AA), and E2E testing via Playwright.

## Architecture Pattern: File-Based Content + RSC
- **Content source**: JSON/MDX files in `/content/` (not database)
- **Data layer**: `/src/lib/content.ts` exports React-cached loaders (`getServices()`, `getPartners()`)
- **Pages**: Server Components that await content loaders directly
- **Dynamic routes**: Use `generateStaticParams()` for SSG of all services/partners at build time

Example pattern for dynamic pages (`/services/[slug]`, `/partners/[slug]`):
```typescript
export async function generateStaticParams() {
  const items = await getServices(); // or getPartners()
  return items.map((item) => ({ slug: item.slug }));
}
```

## Brand System (Strict)
Five brand colors defined in `globals.css` as CSS variables:
- `--color-primary: #1C4E80` (Trust Blue) - primary actions, links
- `--color-secondary: #3CAEA3` (Healing Teal) - buttons, CTAs
- `--color-accent1: #C6B9E0` (Soft Lavender) - highlights
- `--color-bg: #F4F5F7` (Warm Gray) - backgrounds
- `--color-text: #4A4A4A` (Slate Gray) - body text

**Always use Tailwind tokens**: `bg-brand-primary`, `text-brand-secondary`, `bg-surface`, etc. Never hardcode hex values in components.

## Component Library (shadcn/ui + Custom)
- **Base UI**: `src/components/ui/` (button, input, card) - shadcn primitives with brand tokens
- **Layout**: `container`, `section`, `hero`, `site-header`, `site-footer`
- **Features**: `contact-form` (client), `breadcrumbs`, `icon-list`, `logo-cloud`, `cta`
- **Styling utility**: `cn()` from `lib/utils.ts` merges Tailwind classes (always use for conditional styles)

Button variants: `default` (teal), `secondary` (blue), `outline`, `ghost`, `link`. Sizes: `sm`, `default`, `lg`, `xl`.

## SEO & Metadata (Critical)
Every page MUST export `generateMetadata()` returning Next.js `Metadata` object:
```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Page Title | Compliante Solutions",
    description: "150-160 char SEO description",
  };
}
```

- **JSON-LD schemas**: Import from `lib/schema.ts` (Organization) or build inline (Service, BreadcrumbList)
- **Sitemap**: Auto-generated post-build via `next-sitemap` (config in `next-sitemap.config.js`)
- **Helpers**: Use `absUrl()` from `lib/seo.ts` for absolute URLs in schemas

## Content Editing Workflow
1. Edit JSON in `/content/services.json` or `/content/partners.json`
2. TypeScript types enforce structure: `Service` has `slug`, `title`, `summary`, `bullets[]`, `seoTitle`, `seoDescription`
3. No restart needed in dev mode (hot reload)
4. For production: `npm run build` statically generates all pages

Adding new service/partner: Add object to JSON array, slug becomes URL (`/services/your-slug`).

## Server Actions Pattern
Contact form uses Next.js Server Actions (`"use server"` in `lib/actions.ts`):
- Form submits to `submitContactForm(formData)`
- Includes honeypot field (`website`) for spam protection
- Returns `{ success: boolean, error?: string }`
- Client component (`contact-form.tsx`) handles loading/success/error states

Email integration: Currently logs to console, ready for SendGrid/Resend (see TODO in `actions.ts`).

## Development Commands
- `npm run dev` - Dev server with Turbopack (fast refresh)
- `npm run build` - Production build + sitemap generation (verify before deploy)
- `npm run lint` - ESLint (Next.js rules + TypeScript strict)
- `npm run typecheck` - TSC no-emit validation
- `npm test` - Playwright E2E tests (`tests/smoke.spec.ts`)

## Key Files to Reference
- **Content loaders**: `src/lib/content.ts` (all data fetching patterns)
- **SEO helpers**: `src/lib/seo.ts` (metadata builders, JSON-LD)
- **Brand tokens**: `src/app/globals.css` (CSS variables)
- **Dynamic page template**: `src/app/services/[slug]/page.tsx` (SSG pattern)
- **Component styling**: `src/components/ui/button.tsx` (CVA variant pattern)

## Common Patterns
- **Conditional classes**: Always use `cn()` from `lib/utils.ts`
- **Images**: Use Next.js `<Image>` from `next/image` with `width`/`height` or `fill`
- **Links**: Internal links use Next.js `<Link>` (auto-prefetch), external with `rel="noopener"`
- **Forms**: Client components with `"use client"`, wrap server actions in try-catch
- **TypeScript**: Strict mode enabled, avoid `any`, use type imports (`import type`)

## Accessibility Requirements
- Semantic HTML (`<main>`, `<nav>`, `<article>`)
- Heading hierarchy (one `<h1>` per page, sequential `<h2>`-`<h6>`)
- ARIA labels for icon-only buttons
- Focus visible styles (`.focus-visible` utility)
- Skip-to-content link in header
- Color contrast ratios meet WCAG AA

## Deployment Notes
- Platform: Vercel-optimized (uses `next start` command)
- Environment: Set `SITE_URL` env var for production domain (used in SEO helpers)
- Build verification: Run `npm run build` locally, check for TypeScript/ESLint errors
- Turbopack: Enabled for dev and build (faster than webpack)
