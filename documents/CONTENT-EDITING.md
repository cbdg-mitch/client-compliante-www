# Content Editing Guide

Quick reference for updating content on the Compliante Solutions website.

## Services

**File:** `/content/services.json`

**Format:**
```json
[
  {
    "slug": "service-slug",
    "title": "Service Name",
    "summary": "One-sentence description (outcomes-focused, 120-160 chars)",
    "bullets": [
      "Key Feature 1",
      "Key Feature 2",
      "Key Feature 3",
      "Key Feature 4"
    ],
    "seoTitle": "Service Name | Compliante Solutions",
    "seoDescription": "SEO meta description (150-160 characters)"
  }
]
```

**Adding a new service:**
1. Add entry to `services.json`
2. Slug becomes the URL: `/services/your-slug`
3. Rebuild site: `npm run build`

## Partners

**File:** `/content/partners.json`

**Format:**
```json
[
  {
    "slug": "partner-slug",
    "name": "Partner Name",
    "tagline": "Value proposition in one line",
    "bullets": [
      "Feature/Benefit 1",
      "Feature/Benefit 2",
      "Feature/Benefit 3",
      "Feature/Benefit 4"
    ],
    "logo": "/images/partners/partner-logo.png",
    "seoTitle": "Partner Name Partnership | Compliante Solutions",
    "seoDescription": "SEO description"
  }
]
```

**Adding a new partner:**
1. Add logo to `/public/images/partners/`
2. Add entry to `partners.json`
3. Logo path must match file location
4. Rebuild site

## Leadership Bios

**Files:** 
- `/content/bios/charlotte.mdx`
- `/content/bios/robert.mdx`

**Format:**
```mdx
---
name: "Full Name"
role: "Job Title"
linkedin: "https://linkedin.com/in/username/"
seoTitle: "Name | Compliante Solutions"
seoDescription: "One-line bio"
---

# Full Name

Write the professional biography here in Markdown format.

Use regular paragraphs. The bio will render with proper styling automatically.
```

**Adding photos:**
Place headshots in `/public/images/bios/` as WebP format (optimized).

## Homepage Content

**File:** `/content/home.mdx`

This is a reference file. The homepage is built with components, but you can use this file to draft copy.

## Legal Pages

**Files:**
- `/content/legal/privacy.mdx`
- `/content/legal/terms.mdx`

Standard MDX format with frontmatter. Update the "Last Updated" date when making changes.

## About Page

**File:** `/content/company.mdx`

Company overview and mission statement.

## Error Pages

**Files:**
- `/content/system/404.mdx`
- `/content/system/500.mdx`

Short, friendly error messages.

---

## Content Best Practices

### Tone & Voice
- **Consulting, not clinical:** "strengthen your practice" not "treat patients"
- **Outcomes-first:** Focus on results, not features
- **Business partner:** collaborative tone, not vendor

### Writing Style
- Short paragraphs (2-3 sentences)
- Scannable bullet lists (4 items ideal)
- Active voice
- Specific, not vague

### SEO Guidelines
- **Page Titles:** 50-60 characters, include primary keyword
- **Meta Descriptions:** 150-160 characters, compelling, actionable
- **Headings:** One H1 per page, logical H2/H3 hierarchy
- **Internal Links:** Link between related Services/Partners/Contact

### Partner Names (Official)
- AlzBetter (not "Alz Better")
- SmartFit (not "Smart Fit")  
- Healthy Senior Lighting (full name)
- Rudio (one word)

### CTAs (Call to Action)
Primary CTA everywhere: **"Request a Practice Analysis"**

Secondary CTAs:
- "Learn More"
- "See How We Help"
- "Explore Our Services"
- "Contact Us"

---

After editing content files, rebuild the site:

```bash
npm run build
```

Then verify changes on the development server:

```bash
npm run dev
```
