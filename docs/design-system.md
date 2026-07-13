# Celeris Creative — Design System & Style Guide

The single source of truth for the visual language of celeriscreative.com.
All tokens live in `src/app/globals.css` under `@theme` (Tailwind v4).

## 1. Brand direction

**Personality:** premium, AI-first, swift, confident, quietly luxurious.
**Aesthetic:** dark luxury — near-black inks, iris/aqua aurora light, editorial serif accents,
generous whitespace, cinematic grain.
**Anti-goals:** template feel, decorative clutter, animation without purpose.

## 2. Color system

| Token | Hex / value | Usage |
| --- | --- | --- |
| `ink` | `#05050a` | Page background |
| `ink-2` | `#0a0a12` | Cards, alternate section bands |
| `ink-3` | `#10101c` | Elevated surfaces, hover states |
| `snow` | `#f4f4f8` | Primary text, primary buttons |
| `fog` | `#a3a3b2` | Secondary text |
| `mist` | `#6b6b7b` | Tertiary text, labels |
| `iris` | `#8478ff` | Primary accent — CTAs, highlights, cursor |
| `iris-soft` | `#a89eff` | Accent text on dark |
| `aqua` | `#6ee7f9` | Secondary accent — gradients, data viz |
| `gold` | `#e9c88f` | Rare tertiary accent (media/content contexts) |
| `line` | `rgba(244,244,248,0.08)` | Hairline borders |
| `line-strong` | `rgba(244,244,248,0.16)` | Hover borders |

**Signature gradient:** `linear-gradient(92deg, #f4f4f8 → #a89eff 55% → #6ee7f9)` (`.text-gradient`).
Accent-only variant: iris → aqua (`.text-gradient-iris`).

Rules:
- One accent moment per viewport. Iris leads; aqua supports; gold is rare.
- Text on `ink` must be `snow` (headings), `fog` (body), or `mist` (labels) — never pure white/gray-500.

## 3. Typography system

| Role | Font | Usage |
| --- | --- | --- |
| Display | **Bricolage Grotesque** (`--font-display`) | Headlines, nav logo, stats |
| Accent | **Instrument Serif italic** (`--font-serif`) | The emotional word in each headline |
| Body | **Inter** (`--font-body`) | Paragraphs, UI |
| Label | **JetBrains Mono** (`--font-mono`) | Eyebrows, indexes, metadata — always uppercase, `letter-spacing: 0.18em` |

Scale (fluid):
- Hero H1: `clamp(2.9rem, 8.2vw, 7rem)`, weight 600, line-height 0.98
- Page H1: `clamp(2.6rem, 6.5vw, 5.5rem)`
- Section H2: `text-4xl → text-6xl`, line-height 1.05
- Card H3: `text-xl → text-3xl`
- Body: `text-base/lg`, line-height 1.6–1.75, `max-width: ~36rem`
- Labels: `text-xs` mono uppercase

**Signature move:** every headline pairs grotesque + one italic serif word in gradient
("It's a *system*.", "shipped & *scaled*.").

## 4. Spacing & layout

- Container: `max-w-[1400px]`, padding `px-6` mobile / `px-10` desktop.
- Section rhythm: `py-28` mobile, `py-36` desktop. Alternate plain sections and
  bordered `bg-ink-2/60` bands for horizontal banding rhythm.
- Radius: cards `--radius-card: 1.25rem`, pills/buttons `rounded-full`.
- Asymmetry: sticky left columns (Process, FAQ), staggered offsets (`md:translate-y-16` in Why Celeris),
  full-bleed marquees.

## 5. Surfaces & effects

- **Glass:** `.glass` — `rgba(16,16,28,0.55)` + `blur(18px) saturate(140%)` + hairline border.
  Used for: floating hero cards, scrolled navbar, testimonial cards, contact form.
- **Grain:** fixed SVG-noise overlay at 3.5% opacity, animated in 6 steps (`.grain`).
- **Glow:** radial iris/aqua blobs (`blur-[100–120px]`) anchored to section corners; `.glow-iris` box-shadow for the featured pricing card.
- **Hairline dividers:** gradient-fade 1px lines (`.hairline`).

## 6. Iconography

Line-based, `stroke-width` 1.4–1.6, `strokeLinecap="round"`, drawn inline as SVG.
Core set: diagonal arrow (↗) in a circle for links/cards, chevron for accordions,
dot bullets. No icon libraries; consistency over variety.

## 7. Component library (`src/components/`)

| Component | Location | Notes |
| --- | --- | --- |
| `Navbar` | `layout/` | Fixed; glass pill appears after 24px scroll; full-screen clip-path mobile menu |
| `Footer` | `layout/` | 4-column, oversized fading wordmark |
| `PageHero` | `layout/` | Inner-page hero with aurora + split headline |
| `MagneticButton` | `ui/` | Magnetic pull (0.28/0.12 factors), fill-sweep hover, arrow nudge |
| `CustomCursor` | `ui/` | Dot + trailing ring; morphs on interactives; label mode via `data-cursor-label` |
| `Reveal` | `ui/` | Scroll fade-up (opacity + 48px y) |
| `SplitReveal` | `ui/` | Masked word/char reveal. Gradient classes go on leaf spans (Chromium bg-clip constraint) |
| `SectionHeading` | `ui/` | Eyebrow + display title + serif accent + description |
| `Counter` | `ui/` | Count-up stat on scroll into view |
| Sections | `sections/` | `Hero`, `TrustedBy`, `Services`, `Process`, `FeaturedWork`, `WhyCeleris`, `AISection`, `Industries`, `Testimonials`, `FAQ`, `FinalCTA` |

## 8. Motion design documentation

**Principles**
1. Motion communicates hierarchy — reveals sequence content in reading order.
2. One physics: `power3.out` / `power4.out` (expo-like), durations 0.9–1.4s for reveals, 0.3–0.5s for hovers.
3. Everything respects `prefers-reduced-motion` (Lenis disabled, reveals forced visible, animations killed globally in CSS).

**Tokens**
- Ease: `--ease-out-expo: cubic-bezier(0.16,1,0.3,1)`, `--ease-luxe: cubic-bezier(0.65,0.05,0,1)`
- Smooth scroll: Lenis, duration 1.15, exponential easing, synced to GSAP ScrollTrigger via `gsap.ticker`.

**Choreography by section**
| Where | Animation |
| --- | --- |
| Hero | Masked line reveal (stagger 0.09) → eyebrow → sub → CTAs → floating cards; canvas particle field; mouse parallax (cards ±34px, aurora ±40px); scroll-out: content -18% y + fade, aurora scales 1.12 |
| Trusted By | CSS marquee 42s linear infinite, edge mask, pause on hover |
| Services | Cards fade-up stagger 0.12; cursor-follow glow orb per card; arrow rotates 45° on hover |
| Process | Left column sticky; gradient progress line scrubbed (`scrub: 0.6`); steps slide in from x:40 |
| Featured Work | Sticky stacking cards (`top-24`, z-index stack); mockup tilt ±7° via mouse; elastic return |
| Why/Stats | Staggered column offsets; counters 2s `power3.out` |
| AI | SVG circuit stroke-dash draw 2.2s; nodes pop `back.out(2)`; capability cards lift on hover |
| Industries | Row expand: background `scale-y` from 0, title translates, arrow rotates; note fades in from x:24 |
| Testimonials | Dual marquees, opposite directions (58s/64s), pause on hover |
| FAQ | Height auto-animate 0.5s `ease-out-expo`; chevron rotates 180° |
| Final CTA | Glow scales 0.7→1.15 scrubbed; split reveal; magnetic CTAs |
| Page transitions | `template.tsx`: fade-up 24px, 0.7s on every route change |

**Custom cursor spec:** 6px dot (instant, 0.08s) + 32px ring (trailing, 0.4s).
Interactive hover: ring 56px, iris tint. Label mode: ring 88px solid iris with mono label, dot hidden.
Hidden on touch/coarse pointers and under `prefers-reduced-motion`.
