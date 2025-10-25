# Copilot Instructions for Compliante Solutions Website

## Project Overview
Next.js 15 (App Router) healthcare compliance consulting website using TypeScript, Tailwind CSS v4, and file-based content management. Production-ready with SEO, accessibility (WCAG 2.2 AA), and E2E testing via Playwright.

## Architecture Pattern: File-Based Content + RSC
- **Content source**: JSON/MDX files in `/content/` (not database)
- **Data layer**: `/src/lib/content.ts` exports React-cached loaders (`getServices()`, `getPartners()`)
- **Pages**: Server Components that await content loaders directly
- **Dynamic routes**: Use `generateStaticParams()` for SSG of all services/partners at build time
- **Content loaders**: Use convenience wrappers `getService(slug)` and `getPartner(slug)` in pages (they call the underlying cached `getServiceBySlug()` / `getPartnerBySlug()`)

Example pattern for dynamic pages (`/services/[slug]`, `/partners/[slug]`):
```typescript
export async function generateStaticParams() {
  const items = await getServices(); // or getPartners()
  return items.map((item) => ({ slug: item.slug }));
}

// In page component - note params is async in Next.js 15
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getService(slug); // convenience wrapper
  if (!service) notFound();
  // ...
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

**Typography**: Inter (body) and Lato (headings) via `next/font`. Use `font-heading` class for headings.

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

## Contact Form Pattern (API Route)
Contact form uses API Route (`/api/contact/route.ts`) with validation and rate limiting:
- **Client**: `contact-form.tsx` POSTs JSON to `/api/contact`
- **Validation**: Email format, required fields, max lengths (name 100, email 200, message 2000)
- **Honeypot**: `website` field traps bots (returns fake success if filled)
- **Turnstile**: Cloudflare Turnstile widget for CAPTCHA verification (server-side validation)
- **Rate limiting**: In-memory (3 requests/min per IP by default, configurable via env vars)
- **Email**: Mailgun API integration via `lib/mailer.ts` using `sendContactEmail()`
- **Response**: `{ success: boolean, error?: string }`

*Note: `lib/actions.ts` contains legacy Server Action code - API route is the active implementation.*

## Development Commands
- `npm run dev` - Dev server with Turbopack (fast refresh)
- `npm run build` - Production build + sitemap generation (verify before deploy)
- `npm run lint` - ESLint (Next.js rules + TypeScript strict)
- `npm run typecheck` - TSC no-emit validation
- `npm test` - Playwright E2E tests (`tests/smoke.spec.ts`)
- `npm run format` - Prettier code formatting

**Windows/PowerShell**: Use standard npm commands as-is (no need for cross-env).

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
- Platform: Self-hosted NGINX server at 104.236.33.3
- Process Manager: PM2 with ecosystem.config.js
- Secrets Management: Doppler (separate `stg` and `prd` configs)
- Build verification: Run `npm run build` locally, check for TypeScript/ESLint errors
- Turbopack: Enabled for dev and build (faster than webpack)

### Deployment Workflow
**Staging**: Push to `staging` branch → GitHub Actions → Deploy to `compliante.cbdg-ext.com` (port 3001)
**Production**: Push to `main` branch → GitHub Actions → Deploy to `compliantesolutions.com` (port 3000)

Deployment process:
1. Builds Next.js app with Doppler environment variables
2. SSHs to server and creates timestamped release directory
3. Copies build artifacts (.next, package.json, public)
4. Installs production dependencies
5. Updates `current` symlink to new release
6. Restarts PM2 process with Doppler-injected env vars
7. Keeps last 5 releases for rollback capability

### NGINX Configuration
Both sites are reverse-proxied from NGINX to Node.js:
- **Staging**: `compliante.cbdg-ext.com` → `localhost:3001`
- **Production**: `compliantesolutions.com` → `localhost:3000`

Update NGINX configs at:
- `/etc/nginx/sites-available/compliante.cbdg-ext.com`
- `/etc/nginx/sites-available/compliantesolutions.com`

Then reload: `sudo systemctl reload nginx`

### Environment Variables
Managed via Doppler (`compliante-www` project):
- `SITE_URL` - Production domain (e.g., `https://compliantesolutions.com`)
- `NEXT_PUBLIC_SITE_URL` - Client-side site URL
- `PORT` - Node.js server port (3000 prod, 3001 staging)
- `MAILGUN_API_KEY` - Mailgun API key for sending emails
- `MAILGUN_DOMAIN` - Mailgun domain (mg.cbdg-ext.com)
- `CONTACT_TO_EMAIL` - Recipient email for contact form
- `CONTACT_FROM_EMAIL` - Sender email for contact form
- `TURNSTILE_SECRET_KEY` - Cloudflare Turnstile secret key
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` - Cloudflare Turnstile site key (public)
- `RATE_LIMIT_WINDOW_MS` - Rate limit window in ms (default: 60000)
- `RATE_LIMIT_MAX` - Max requests per window (default: 3)

### GitHub Secrets Required
- `SSH_PRIVATE_KEY` - SSH key for deployment user (caliberadmin)
- `SSH_HOST` - Server IP (104.236.33.3)
- `SSH_USER` - SSH username (caliberadmin)
- `DOPPLER_TOKEN_STG` - Doppler service token for staging environment
- `DOPPLER_TOKEN_PRD` - Doppler service token for production environment
