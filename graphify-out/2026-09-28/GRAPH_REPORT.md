# Graph Report - celeris website  (2026-09-28)

## Corpus Check
- 62 files · ~1,118,542 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 316 nodes · 556 edges · 23 communities (19 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `91a2caaa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- data.ts
- seo.ts
- devDependencies
- compilerOptions
- dependencies
- layout.tsx
- email.ts
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
- gen-icons.mjs
- ContactClient.tsx

## God Nodes (most connected - your core abstractions)
1. `breadcrumbSchema()` - 23 edges
2. `compilerOptions` - 16 edges
3. `JsonLd()` - 14 edges
4. `pageMetadata()` - 14 edges
5. `SITE` - 12 edges
6. `SectionHeading()` - 11 edges
7. `Reveal()` - 10 edges
8. `Celeris Creative — Design System & Style Guide` - 9 edges
9. `Celeris Creative — Legacy Content Archive` - 7 edges
10. `Celeris Creative — Sitemap, User Journey & Wireframes` - 7 edges

## Surprising Connections (you probably didn't know these)
- `ContactPage()` --calls--> `breadcrumbSchema()`  [EXTRACTED]
  src/app/contact/page.tsx → src/lib/seo.ts
- `AboutPage()` --calls--> `breadcrumbSchema()`  [EXTRACTED]
  src/app/about/page.tsx → src/lib/seo.ts
- `POST()` --calls--> `sendContactEmail()`  [EXTRACTED]
  src/app/api/contact/route.ts → src/lib/email.ts
- `generateStaticParams()` --calls--> `getAllSlugs()`  [EXTRACTED]
  src/app/blog/[slug]/page.tsx → src/lib/blog.ts
- `generateMetadata()` --calls--> `pageMetadata()`  [EXTRACTED]
  src/app/blog/[slug]/page.tsx → src/lib/seo.ts

## Import Cycles
- None detected.

## Communities (23 total, 4 thin omitted)

### Community 0 - "data.ts"
Cohesion: 0.07
Nodes (42): metadata, VALUES, HomePage(), metadata, metadata, PLANS, metadata, PageHero() (+34 more)

### Community 1 - "seo.ts"
Cohesion: 0.11
Nodes (30): AboutPage(), BlogIndexPage(), metadata, CookiesPage(), doc, metadata, doc, metadata (+22 more)

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
Cohesion: 0.13
Nodes (16): bricolage, instrument, inter, jetbrains, metadata, RootLayout(), viewport, Footer() (+8 more)

### Community 6 - "email.ts"
Cohesion: 0.27
Nodes (12): ContactPayload, GET(), POST(), buildBodies(), ContactMail, emailConfigStatus(), escapeHtml(), recipient() (+4 more)

### Community 7 - "[slug]/page.tsx"
Cohesion: 0.27
Nodes (10): BlogPostPage(), generateMetadata(), generateStaticParams(), Props, sitemap(), BLOG_POSTS, BlogPost, getAllSlugs() (+2 more)

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

### Community 21 - "gen-icons.mjs"
Cohesion: 0.40
Nodes (3): header, sizes, svg

### Community 22 - "ContactClient.tsx"
Cohesion: 0.17
Nodes (9): ContactClient(), EXPECT, SERVICES_OPTIONS, ContactPage(), metadata, SmsConsent(), SmsOptInForm(), SITE (+1 more)

## Knowledge Gaps
- **130 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+125 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `breadcrumbSchema()` connect `seo.ts` to `data.ts`, `ContactClient.tsx`, `[slug]/page.tsx`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `SITE` connect `ContactClient.tsx` to `data.ts`, `seo.ts`, `layout.tsx`, `email.ts`, `[slug]/page.tsx`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `JsonLd()` connect `seo.ts` to `data.ts`, `layout.tsx`, `ContactClient.tsx`, `[slug]/page.tsx`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _130 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `data.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06873706004140787 - nodes in this community are weakly interconnected._
- **Should `seo.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1141025641025641 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._