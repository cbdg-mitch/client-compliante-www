# Compliante Solutions WebsiteThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



Production-ready Next.js 15 website for Compliante Solutions, Inc. - Complete Privacy and Security Management for the Health, Insurance, and Financial Industries.## Getting Started



## Tech StackFirst, run the development server:



- **Framework:** Next.js 15 with TypeScript (App Router)```bash

- **Styling:** Tailwind CSS v4 with custom brand tokensnpm run dev

- **UI Components:** shadcn/ui (accessible primitives)# or

- **Content:** JSON data + MDX for biosyarn dev

- **SEO:** next-sitemap, JSON-LD schemas, dynamic metadata# or

- **Testing:** Playwright for E2E testspnpm dev

- **Code Quality:** ESLint, Prettier# or

bun dev

## Brand Colors```



- **Primary (Trust Blue):** `#1C4E80`Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- **Secondary (Healing Teal):** `#3CAEA3`

- **Accent (Soft Lavender):** `#C6B9E0`You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- **Background (Warm Gray):** `#F4F5F7`

- **Text (Slate Gray):** `#4A4A4A`This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



## Getting Started## Learn More



### PrerequisitesTo learn more about Next.js, take a look at the following resources:



- Node.js 18+ and npm- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

### Installation

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

```bash

npm install## Deploy on Vercel

```

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Development

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm start
```

### Other Commands

- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Type check with TypeScript
- `npm test` - Run Playwright tests

## Project Structure

```
├── src/
│   ├── app/              # App Router pages
│   │   ├── services/     # Service pages
│   │   ├── partners/     # Partner pages
│   │   ├── about/        # About page
│   │   ├── contact/      # Contact page
│   │   └── legal/        # Legal pages
│   ├── components/       # React components
│   │   ├── ui/          # Base UI components
│   │   └── ...          # Layout & feature components
│   └── lib/             # Utilities & content helpers
├── content/             # Content data (JSON & MDX)
│   ├── services.json    # Service definitions
│   ├── partners.json    # Partner definitions
│   ├── company.mdx      # Company info
│   └── bios/           # Leadership bios
├── public/             # Static assets
│   └── images/         # Images & logos
└── tests/              # Playwright tests
```

## Site Structure

- **Home** (`/`) - Hero, three pillars, partners preview, CTA
- **Services** (`/services`) - Overview + 3 detail pages
  - Regulatory Compliance
  - Revenue Optimization
  - Risk Management
- **Partners** (`/partners`) - Overview + 4 detail pages
  - AlzBetter
  - SmartFit
  - Healthy Senior Lighting
  - Rudio
- **About** (`/about`) - Leadership bios & company info
- **Contact** (`/contact`) - Contact form with server action
- **Legal** - Privacy Policy & Terms of Service

## Key Features

### SEO & Metadata
- Dynamic metadata per page
- JSON-LD structured data (Organization, Service, BreadcrumbList)
- Sitemap generation via next-sitemap
- Canonical URLs

### Accessibility
- WCAG 2.2 AA compliance
- Semantic HTML with proper heading hierarchy
- Skip-to-content link
- Focus visible styles
- Screen reader-friendly navigation

### Performance
- Next.js Image optimization
- Font optimization with next/font
- Minimal motion support
- Core Web Vitals optimized

### Contact Form
- Server-side form handling
- Honeypot spam protection
- Client-side validation
- Success/error states
- Email stub (ready for SendGrid/Resend integration)

## Content Management

### Services
Edit `content/services.json` to update service offerings.

### Partners
Edit `content/partners.json` to update partner information.

### Leadership Bios
Edit MDX files in `content/bios/` for leadership profiles.

## Deployment

The site is ready to deploy to Vercel, Netlify, or any Next.js-compatible platform.

### Vercel (Recommended)
```bash
vercel deploy --prod
```

### Environment Variables
```bash
SITE_URL=https://compliantesolutions.com
```

## Logo & Assets

Replace placeholder SVG logos in `public/images/` with actual brand assets:
- `/images/logo_transparent.png` - Main Compliante Solutions logo
- `/images/partners/*.svg` - Partner logos

Copy favicons from `/build_assets/images/` to `/public/`:
- `favicon.ico`
- `android-chrome-*.png`
- `apple-touch-icon.png`
- `favicon-16x16.png`
- `favicon-32x32.png`

## License

© 2025 Compliante Solutions Inc. All rights reserved.

## Contact

For questions about this codebase, contact the development team.