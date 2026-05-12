# Arkansas Medical Marijuana Card

Marketing site for **arkansasmedicalmarijuanascard.com** — an Amendment 98
medical marijuana evaluation service serving Arkansas patients via
HIPAA-compliant telehealth.

Part of a multi-state network. Shares the Pennsylvania parent brand
palette (`#20B780` emerald, `#033c3f` brand dark, `#002124` deepest
green) and differentiates through editorial typography
(Bricolage Grotesque + Inter + JetBrains Mono), asymmetric magazine
layouts, and GSAP-driven scroll motion.

## Stack

- **Next.js 16** (App Router, Turbopack, React Server Components)
- **React 19** / **React DOM 19**
- **TypeScript 5** (strict, ES2022)
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **react-hook-form** 7 + **zod** 4 + `@hookform/resolvers` 5
- **GSAP** 3 + `@gsap/react` (ScrollTrigger, custom matchMedia)
- **lucide-react**
- **sass**

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script          | Purpose                                          |
| --------------- | ------------------------------------------------ |
| `npm run dev`   | Start the dev server (Turbopack)                 |
| `npm run build` | Production build                                 |
| `npm run start` | Run the production build                         |
| `npm run lint`  | ESLint — `next/core-web-vitals + next/typescript`|

## Project structure

```
app/                Next.js App Router (layout, page, robots, sitemap, /contact-us)
components/
  cursor/           Custom emerald cursor (dot + ring follower)
  contact/          /contact-us query form
  footer/           Editorial light footer + state-pride marquee
  header/           Server + client header (sticky, structural)
  landing/          14 homepage sections (Hero, Stats, Conditions, …)
  motion/           GSAP-based motion primitives
                    (ScrollProvider, SplitText, PinnedSteps, Marquee,
                     CountUp, Magnetic, EmeraldOrb, ScrollProgress)
  JsonLd.tsx        Inline JSON-LD <script> via next/script
  backtotop.tsx     Fixed back-to-top button (gsap scroll)
lib/                seo helpers, form schema, utilities
public/assets/      logo, hero SVGs, doctor portraits, partner logos
types/              ambient globals (window.dataLayer)
```

## Differentiators (vs the Pennsylvania parent and Georgia sibling)

- **Same brand palette**; entirely different visual language.
- **Editorial 7/5 asymmetric hero** with a magazine-style "cover panel"
  rotating KPI ticker; form lives in its own dedicated band ~60% down
  the page (not in the hero).
- **Bricolage Grotesque** display type + **JetBrains Mono** indices
  ("[01] Apply Now", "C-01", "Q-02") throughout.
- **Pinned horizontal `Steps`** scrubbed by scroll (degrades to vertical
  on touch + reduced-motion).
- **Custom emerald cursor** (dot + ring) with magnetic interactions.
- **GSAP + ScrollTrigger** for every animation — no framer-motion.

## Accessibility

- Single `<h1>` per page, logical heading hierarchy.
- Skip-to-content link → `<main id="main-content" tabIndex={-1}>`.
- Visible focus rings (emerald, 2px / 2px offset).
- Custom cursor disabled on touch devices and `prefers-reduced-motion`.
- All GSAP timelines respect `gsap.matchMedia({ reduced })` — instant
  opacity fades only when reduced motion is requested.
- Form errors announced via `aria-live="polite"`.
- AggregateRating, MedicalOrganization, FAQPage, HowTo, WebSite, and
  MedicalBusiness JSON-LD blocks rendered on the homepage.

## Content notes

- Amendment 98 statutory qualifying conditions (18) used verbatim.
- 2.5 oz / 14-day purchase limit, $50 ADH state fee, 1-year card
  validity, 90-day visitor reciprocity.
- Pricing: $199 physician evaluation + $50 separate ADH fee.

## Forms

Lead capture and contact forms are fully client-side (no API). On
submit, the form simulates an `await sleep(900)` and then morphs into
a success state — replace with a real API in `components/landing/form.tsx`
and `components/contact/queryForm.tsx`.

GTM is wired in `app/layout.tsx` with a placeholder ID `GTM-XXXXXXXX`.
