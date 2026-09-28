# Graph Report - celeris website  (2026-09-28)

## Corpus Check
- 59 files · ~1,116,891 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 306 nodes · 539 edges · 21 communities (17 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d820336c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- data.ts
- seo.ts
- devDependencies
- compilerOptions
- dependencies
- layout.tsx
- SITE
- [slug]/page.tsx
- Celeris Creative — Sitemap, User Journey & Wireframes
- Celeris Creative — Legacy Content Archive
- Celeris Creative — Design System & Style Guide
- Celeris Creative — Website
- opengraph-image.tsx
- next.config.ts
- postcss.config.mjs
- screenshot.mjs
- sections.mjs

## God Nodes (most connected - your core abstractions)
1. `breadcrumbSchema()` - 23 edges
2. `compilerOptions` - 16 edges
3. `JsonLd()` - 14 edges
4. `pageMetadata()` - 14 edges
5. `SectionHeading()` - 11 edges
6. `SITE` - 11 edges
7. `Reveal()` - 10 edges
8. `Celeris Creative — Design System & Style Guide` - 9 edges
9. `Celeris Creative — Legacy Content Archive` - 7 edges
10. `Celeris Creative — Sitemap, User Journey & Wireframes` - 7 edges

## Surprising Connections (you probably didn't know these)
- `AboutPage()` --calls--> `breadcrumbSchema()`  [EXTRACTED]
  src/app/about/page.tsx → src/lib/seo.ts
- `BlogIndexPage()` --calls--> `breadcrumbSchema()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/seo.ts
- `ServicesPage()` --calls--> `breadcrumbSchema()`  [EXTRACTED]
  src/app/services/page.tsx → src/lib/seo.ts
- `WorkPage()` --calls--> `breadcrumbSchema()`  [EXTRACTED]
  src/app/work/page.tsx → src/lib/seo.ts
- `POST()` --calls--> `sendContactEmail()`  [EXTRACTED]
  src/app/api/contact/route.ts → src/lib/email.ts

## Import Cycles
- None detected.

## Communities (21 total, 4 thin omitted)

### Community 0 - "data.ts"
Cohesion: 0.06
Nodes (45): AboutPage(), metadata, VALUES, HomePage(), metadata, metadata, PLANS, ServicesPage() (+37 more)

### Community 1 - "seo.ts"
Cohesion: 0.11
Nodes (31): ContactClient(), EXPECT, SERVICES_OPTIONS, ContactPage(), metadata, CookiesPage(), doc, metadata (+23 more)

### Community 2 - "devDependencies"
Cohesion: 0.07
Nodes (27): devDependencies, playwright, postcss, tailwindcss, @tailwindcss/postcss, @types/node, @types/nodemailer, @types/react (+19 more)

### Community 3 - "compilerOptions"
Cohesion: 0.07
Nodes (27): dom, dom.iterable, esnext, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts (+19 more)

### Community 4 - "dependencies"
Cohesion: 0.10
Nodes (21): clsx, framer-motion, gsap, @gsap/react, lenis, next, nodemailer, dependencies (+13 more)

### Community 5 - "layout.tsx"
Cohesion: 0.14
Nodes (15): bricolage, instrument, inter, jetbrains, metadata, RootLayout(), viewport, Footer() (+7 more)

### Community 6 - "SITE"
Cohesion: 0.21
Nodes (13): ContactPayload, GET(), POST(), SITE, buildBodies(), ContactMail, emailConfigStatus(), escapeHtml() (+5 more)

### Community 7 - "[slug]/page.tsx"
Cohesion: 0.21
Nodes (12): BlogIndexPage(), metadata, BlogPostPage(), generateMetadata(), generateStaticParams(), Props, sitemap(), BLOG_POSTS (+4 more)

### Community 8 - "Celeris Creative — Sitemap, User Journey & Wireframes"
Cohesion: 0.15
Nodes (12): 1. Sitemap, 2. User journey (primary persona: founder/owner researching agencies), 3. Wireframes (structure per page), 4. SEO recommendations, 5. Performance optimization plan, 6. Copywriting system, About, Celeris Creative — Sitemap, User Journey & Wireframes (+4 more)

### Community 9 - "Celeris Creative — Legacy Content Archive"
Cohesion: 0.17
Nodes (11): About, Assets, Business facts (must remain accurate on the new site), Celeris Creative — Legacy Content Archive, Contact, Legacy copy worth preserving (facts / themes, not wording), Legacy SEO metadata, Pricing plans (from /plan — retained as source data) (+3 more)

### Community 10 - "Celeris Creative — Design System & Style Guide"
Cohesion: 0.20
Nodes (9): 1. Brand direction, 2. Color system, 3. Typography system, 4. Spacing & layout, 5. Surfaces & effects, 6. Iconography, 7. Component library (`src/components/`), 8. Motion design documentation (+1 more)

### Community 11 - "Celeris Creative — Website"
Cohesion: 0.33
Nodes (5): Before launch checklist, Celeris Creative — Website, Editing content, Project structure, Quick start

### Community 12 - "opengraph-image.tsx"
Cohesion: 0.33
Nodes (4): alt, contentType, runtime, size

## Knowledge Gaps
- **127 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+122 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `breadcrumbSchema()` connect `seo.ts` to `data.ts`, `[slug]/page.tsx`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `SITE` connect `SITE` to `data.ts`, `seo.ts`, `layout.tsx`, `[slug]/page.tsx`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `JsonLd()` connect `seo.ts` to `data.ts`, `layout.tsx`, `[slug]/page.tsx`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _127 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `data.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06430745814307458 - nodes in this community are weakly interconnected._
- **Should `seo.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1091753774680604 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._