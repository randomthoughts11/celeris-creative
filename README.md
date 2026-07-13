# Celeris Creative — Website

Award-grade marketing site for Celeris Creative Agency LLP, the AI-powered growth agency.
Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger,
Framer Motion, and Lenis smooth scrolling.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes static)
npm start        # serve production build
```

## Project structure

```
src/
├── app/                  Routes (App Router, all statically generated)
│   ├── page.tsx          Home
│   ├── services/         Capabilities + pricing
│   ├── work/             Case studies
│   ├── about/            Story, values, process
│   ├── contact/          Strategy call form
│   ├── layout.tsx        Fonts, metadata, JSON-LD, providers
│   ├── template.tsx      Page transitions
│   ├── globals.css       Design tokens (@theme) + utilities
│   ├── sitemap.ts        /sitemap.xml
│   └── robots.ts         /robots.txt
├── components/
│   ├── layout/           Navbar, Footer, PageHero
│   ├── providers/        SmoothScroll (Lenis + GSAP sync)
│   ├── sections/         Homepage sections (Hero, Services, Process, …)
│   └── ui/               Primitives (MagneticButton, Reveal, SplitReveal,
│                         SectionHeading, Counter, CustomCursor)
└── lib/data.ts           ALL site content — copy, services, stats, FAQs, work
docs/
├── content-archive.md    Everything preserved from the old Wix site
├── design-system.md      Style guide, typography/color systems, motion spec
└── site-architecture.md  Sitemap, user journey, wireframes, SEO & perf plans
scripts/                  Playwright screenshot/QA scripts (dev-only)
```

## Editing content

All copy lives in `src/lib/data.ts`. Stats, testimonials, and case studies are
currently illustrative placeholders — replace them with verified client data
before launch (see the note in `docs/site-architecture.md`).

## Before launch checklist

- [ ] Replace placeholder stats/testimonials/case studies in `src/lib/data.ts`
- [ ] Add OG image (`src/app/opengraph-image.png`, 1200×630)
- [ ] Wire the contact form to a backend or booking tool (currently `mailto:`)
- [ ] Add 301 redirects from old URLs (`/about-us`, `/plan`, `/portfolio`) in `next.config.ts`
- [ ] Point DNS, then submit the new sitemap in Google Search Console
