<div align="center">

# Psychologist Website (Static, TypeScript, GitHub Pages)

Strategic development plan & implementation guide. This document is the authoritative roadmap the agentic workflow will follow phase by phase.

</div>

---

## 0. Executive Summary

Build a fast, accessible, trustworthy static website for a psychologist to:

* Establish professional credibility (credentials, approach, ethics).
* Enable prospective clients to understand services and decide to reach out.
* Provide clear, legally appropriate disclaimers (NOT an emergency resource; no therapeutic relationship established via site).
* Support SEO for local/intended specialties (e.g., anxiety, couples therapy, telehealth).
* Allow incremental evolution (start simple → add blog/resources → booking/newsletter/internationalization).

Core constraints:
* Static hosting on GitHub Pages (no server backend).
* Written in TypeScript.
* Privacy‑aware: avoid collecting Protected Health Information (PHI). Minimal user data.
* Content-change friendly (Markdown collections + structured frontmatter).

Primary recommended stack: **Astro + TypeScript + accessible component library (custom lightweight, optionally Tailwind CSS)**. Astro is chosen for performance (zero-JS by default), content focus, and simple GitHub Pages deployment.

Alternative fallback (if simplifying further): Vite + vanilla TS + static HTML templates (Not recommended long-term due to maintainability of content-heavy sections).

---

## 1. Personas & Value Proposition

| Persona | Needs / Questions | Site Response |
|---------|------------------|---------------|
| Prospective individual client | Am I a good fit? Can she help with my issue? Is she qualified? | Clear services, conditions treated, approach, credentials, tone conveying empathy & expertise. |
| Couples seeking therapy | Neutral, safe, nonjudgmental guidance? | Dedicated couples section with process overview & boundaries. |
| Referring professional | Qualifications, modalities, licensure scope. | Credentials page with license numbers, modalities, continuing education. |
| Returning visitor | Quick contact or resource lookup. | Prominent Contact & Resources navigation. |
| Search engine crawler | Structured semantic signals. | JSON-LD, clear headings, optimized metadata, performance. |

Value proposition statement (draft):
> Evidence-based, compassionate psychological care focused on sustainable change, delivered with clarity, confidentiality, and respect.

---

## 2. Information Architecture (Sitemap)

```
/
  ├─ About
  │    ├─ Approach & Philosophy
  │    └─ Qualifications / Credentials (licenses, education, affiliations)
  ├─ Services
  │    ├─ Individual Therapy
  │    ├─ Couples Therapy
  │    ├─ Telehealth (if applicable)
  │    └─ Modalities (CBT, ACT, etc.)
  ├─ Conditions Treated (anxiety, depression, burnout, etc.)
  ├─ Resources (articles / blog index)
  │    ├─ Article detail pages (Markdown)
  ├─ FAQ
  ├─ Contact
  │    ├─ Secure inquiry form (minimal fields)
  │    └─ Location / Timezone (if telehealth only, clarify)
  ├─ Privacy & Terms
  ├─ Emergency & Crisis Notice (linked sitewide)
  └─ (Future) Testimonials* / Booking / Newsletter / Language Switch
```

*Testimonials must comply with local regulations—some jurisdictions restrict psych professional testimonials; treat as optional configurable feature.

Navigation Model:
* Primary nav: About · Services · Conditions · Resources · FAQ · Contact
* Utility footer: Privacy · Terms · Emergency · (Optional) Newsletter Signup · Social/Professional profiles (LinkedIn, PsychologyToday, etc.)
* Persistent prominent crisis disclaimer (banner or footer microtext).

---

## 3. Content Model & Frontmatter Schemas

Standard frontmatter (YAML) for Markdown resources:

Article (`/content/articles/*.md`):
```yaml
title: "Understanding Cognitive Behavioral Therapy"
slug: understanding-cbt
description: "An overview of CBT principles and how they may apply in therapy sessions."
published: true
publishDate: 2025-01-12
updatedDate: 2025-01-20
tags: [therapy, cbt]
readingTime: 5 # minutes (computed fallback allowed)
schemaType: Article
featured: false
seo:
  noindex: false
```

Condition (`/content/conditions/*.md`):
```yaml
name: Anxiety Disorders
slug: anxiety
summary: "Support for generalized anxiety, panic, and related concerns."
seoKeywords: [anxiety therapy, coping strategies]
```

Service (`/content/services/*.md`):
```yaml
name: Individual Therapy
slug: individual-therapy
summary: "Personalized 1:1 sessions focusing on evidence-based approaches."
modalities: [CBT, ACT]
audience: adults
order: 1
```

FAQ (`/content/faq/*.md`):
```yaml
question: "How long is a session?"
slug: session-length
order: 3
```

Global site config (JSON / TS export): logo paths, contact emails (separate inbound alias), disclaimers, analytics toggle.

---

## 4. Design System (Foundations)

Principles: Empathetic, calm, readable, professional, inclusive.

Color Palette (accessible; aim for WCAG AA contrast):
* Primary: Teal 600 (#0F766E)
* Primary Light: Teal 100 (#CCFBF1)
* Accent: Lavender (#7C7BA3)
* Neutral Dark: Slate 900 (#0F172A)
* Neutral Mid: Slate 600 (#475569)
* Neutral Light: Slate 100 (#F1F5F9)
* Surface: White (#FFFFFF)
* Semantic Success / Info / Warning (as needed)

Typography:
* Headings: A humanist serif (e.g., "Merriweather" or system fallback). Fallback stack.
* Body: Sans-serif (e.g., "Inter", system ui, -apple-system).
* Line length target: 60–75 characters.
* Scale: Modular (1.125 step). h1–h6 tokens.

Spacing Scale (4-based): 0, 4, 8, 12, 16, 24, 32, 40, 56, 72.

Components (initial set):
* Layout primitives: `Container`, `Grid`, `Section`
* Navigation: `Header`, `Footer`, `SkipLink`, `Breadcrumb` (optional)
* Content: `Heading`, `Prose`, `Card`, `List`, `Tag`
* Interactive: `Button`, `Link`, `FormField`, `AlertBanner`
* Metadata: `MetaTags`, `StructuredData`
* A11y-only: `VisuallyHidden`

Dark Mode (optional Phase 5+): Prefers-color-scheme media query; ensure contrast.

Design Tokens: Expose as CSS variables (e.g., `--color-primary`, `--space-4`). Optionally generate via `tokens.ts` → `tokens.css` build step.

---

## 5. Technology Stack & Tooling

| Purpose | Choice | Rationale |
|---------|--------|-----------|
| Static framework | Astro | Content-centric, partial/zero JS, Markdown collections, easy TS. |
| Language | TypeScript (strict) | Safety & maintainability. |
| Styling | Option A: Tailwind CSS + tokens; Option B: CSS Modules + tokens | Rapid iteration + consistency. |
| Icons | Lucide or Heroicons (tree-shaken) | Lightweight, accessible. |
| Forms | Static → third-party endpoint (Formspree) or `mailto:` fallback | Avoid handling PHI; no backend required. |
| Analytics | Plausible (self-host optional) or Simple Analytics | Privacy-first. Deferred until Phase 4+. |
| Testing | Vitest (unit), Playwright (e2e), axe-core (a11y) | Quality gates. |
| Linting | ESLint + Prettier + Stylelint (if needed) | Consistency. |
| Deployment | GitHub Actions → `gh-pages` branch | Automatable. |
| Performance Budget | Lighthouse CI (optional) | Maintain speed regressions. |

Node Version: LTS (document exact version once initialized).

---

## 6. Project Structure (Proposed)

```
psychology_website/
  README.md
  package.json
  astro.config.mjs
  tsconfig.json
  public/
    favicon.svg
    social-card.png
  src/
    pages/              # Astro pages (routes)
    layouts/            # Page/layout shells
    components/         # Reusable UI
    content/            # Markdown (if using content collections)
      articles/
      services/
      conditions/
      faq/
    styles/             # Global + tokens
    lib/                # Utilities (seo, formatting)
    data/               # Static JSON/TS data sets
    hooks/              # (If React/Vue islands are needed)
    schema/             # Zod schemas for frontmatter validation
  tests/
    unit/
    e2e/
  .github/
    workflows/
      ci.yml
  scripts/
    generate-reading-time.ts
```

Conventions:
* Strict TypeScript (enable `noUncheckedIndexedAccess`, etc.).
* Absolute imports via `@/*` alias.
* Accessibility linting integrated into CI.

---

## 7. Accessibility (A11y) Standards

Targets: WCAG 2.1 AA.
* Color contrast ≥ 4.5:1 body text, 3:1 large text.
* Focus states clearly visible; no focus trapping.
* Landmarks: `header`, `nav`, `main`, `footer` + skip link.
* Form labels explicit; no placeholder-only fields.
* Semantic HTML first; ARIA only if needed.
* Motion-reduced animations respect `prefers-reduced-motion`.
* Automated checks (axe) + manual keyboard testing per release.

---

## 8. SEO & Structured Data Strategy

On-page fundamentals:
* Unique `<title>` + `<meta name="description">` per page.
* Canonical link tags.
* OpenGraph/Twitter cards.
* Alt text for all meaningful images.
* Sitemap.xml + robots.txt (auto via Astro integration or custom script).

Structured Data (JSON-LD):
* `@type: Person` (psychologist) on About with `sameAs` (LinkedIn, directories).
* `@type: Service` for key services.
* `@type: FAQPage` on FAQ (collapsible semantics + JSON-LD script).
* `@type: Article` for blog posts.

Performance & Core Web Vitals:
* Image optimization (Astro image integration, modern formats WebP/AVIF).
* Inline critical CSS (Astro handles minimal by default).
* Defer non-critical JS and analytics.

Keyword Strategy (ethical): Focus on accurate descriptions, avoid over-optimization (no symptom baiting).

---

## 9. Privacy, Ethics, Legal & Compliance

Key disclaimers (display on Contact + footer link):
* Not for emergencies: "If you are experiencing a crisis or emergency, call your local emergency number or a crisis hotline (e.g., 988 in the U.S.)."
* No therapist-client relationship established by viewing site.
* Do not submit detailed personal/medical information via the form.
* Data handling: minimal; form submissions forwarded via third-party provider adhering to privacy terms.

Jurisdiction-specific adjustments (to fill in): license numbers, state/province.

Cookies: Avoid non-essential tracking initially; if analytics added, provide a minimal privacy notice (no invasive logging; IP anonymization if supported).

GDPR/PHI Consideration: Because no health data is actively processed, keep forms minimal (Name (optional), Email, General Inquiry message). Provide checkbox acknowledgment of disclaimer before submission.

---

## 10. Phased Development Roadmap

Each phase has goals, scope, acceptance criteria (AC), and success metrics (SM). Phases are incremental—deploy after each.

### Phase 0 – Repository & Tooling Initialization
Scope: Repo creation, license (MIT or All Rights Reserved), baseline README (this), package.json, Astro init, TypeScript strict config, linting (ESLint + Prettier), GitHub Action scaffold (build only), initial commit.
AC: Build passes on CI; `npm run dev` starts successfully.
SM: Time-to-first-commit < 1 hour.

### Phase 1 – Design System & Layout Shell
Scope: Global layout, header/footer, tokens, typography, color variables, navigation skeleton, skip link, base SEO component, favicon & social image placeholder.
AC: Lighthouse Performance ≥ 95 (local), A11y ≥ 100 on scaffold pages.
SM: CSS bundle < 20KB initial (gzipped).

### Phase 2 – Core Pages (Content Drafts)
Scope: About, Services (index + detail), Conditions index (with per-condition pages), FAQ, Privacy & Terms, Emergency Notice, Contact (static form w/ placeholder action), 404 page.
AC: All pages render with placeholder/draft content; navigation active states work; no broken links.
SM: Build size stable; no a11y violations in automated scan.

### Phase 3 – Contact Form & SEO Enhancements
Scope: Integrate third-party form endpoint, anti-spam (honeypot + time-on-page), disclaimers + required consent checkbox, structured data injection (Person, Service, FAQ), sitemap + robots, canonical tags.
AC: Form submission test success; JSON-LD validates (Google Rich Results test); disclaimers visible.
SM: Zero console errors; < 200ms TTFB on GitHub Pages (network-dependent).

### Phase 4 – Resources / Blog System
Scope: Markdown content collection setup, article layout, reading time, tag filters, RSS feed, basic search (client-side fuzzy or prebuilt JSON index), `Article` structured data.
AC: Sample article builds correctly; RSS validates; tags filter subset accurately.
SM: Article page still ≤ ~100KB HTML + critical assets.

### Phase 5 – Accessibility & Performance Hardening
Scope: Manual keyboard review, color contrast audit, lazy-load non-critical images, prefetch nav links on hover, add Lighthouse CI budget.
AC: All a11y issues resolved; performance budgets enforced in CI.
SM: LCP < 2.5s (simulated slow 4G), CLS ~0.

### Phase 6 – Optional Enhancements
Scope: Analytics (privacy-friendly), newsletter signup, booking integration (Cal.com embed in modal or booking page), dark mode toggle, language internationalization (Astro i18n), structured microcopy improvements.
AC: Features toggleable; no regression in A11y or performance budgets.
SM: Bounce rate improvements (post analytics) – observational.

### Phase 7 – Continuous Improvement
Scope: Content expansion cadence, knowledge-base style resources, micro-schema refinements, internal link optimization.
AC: Editorial workflow documented; automated link checker in CI.
SM: Organic traffic growth (to be monitored externally).

---

## 11. Quality & Testing Strategy

| Layer | Tool | Scope |
|-------|------|-------|
| Type Safety | TypeScript | Strict typing, frontmatter schema validation (Zod). |
| Linting | ESLint, Prettier | Style & error prevention. |
| Unit | Vitest | Utilities (reading time, SEO builders). |
| Component | Astro + Testing Library (optional) | Critical UI (navigation, form). |
| E2E | Playwright | Core user flows: nav traversal, form submit. |
| Accessibility | axe-core script + manual | Fails build on violations (selected severity). |
| Performance | Lighthouse CI (optional) | Budget: LCP ≤2.5s, TBT ≤100ms, CLS ≤0.1. |
| Link Integrity | linkinator or custom script | Broken internal/external link detection. |

CI Workflow (stages): install → typecheck → lint → unit tests → build → a11y scan (static HTML) → (optional) Lighthouse → deploy (on main branch merge / tagged release).

---

## 12. Deployment & Branching

Branch Strategy:
* `main`: Production (auto-deployed to GitHub Pages).
* `feature/*`: Short-lived feature branches → PR → CI checks.

Deployment Flow:
1. Merge to `main` triggers GitHub Action.
2. Action builds Astro site → outputs `dist/`.
3. Deploy job publishes to `gh-pages` branch.
4. GitHub Pages serves from `gh-pages` root.

Secrets Needed: (Probably none unless analytics or form provider requires key). If needed, add via repo settings.

Rollback: Revert commit on `main` → redeploy.

---

## 13. Risk Register (Initial)

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Regulatory testimonial limits | Legal/ethical issues | Medium | Disable testimonials by default; feature flag. |
| Form collects PHI unintentionally | Privacy liability | Low-Med | Keep fields generic; disclaimers; no free text prompts for symptoms. |
| Over-customization early | Delays launch | Medium | Ship smallest viable content set (Phases 0–2) before embellishments. |
| Performance degradation (future JS) | Worse UX / SEO | Medium | JS budget → track total shipped JS < 70KB gzip. |
| Accessibility regressions | Exclusion / compliance risk | Low | CI a11y gate + manual review per release. |
| Content stagnation | SEO plateau | Medium | Schedule monthly content review; editorial checklist. |
| Third-party form service outage | Lost leads | Low | Provide direct email fallback (mailto link) on error. |

---

## 14. Backlog (Future Enhancements)

* Appointment booking (Cal.com/Calendly embed).
* Newsletter (Buttondown / Mailcoach) – double opt-in, minimal analytics.
* Internationalization (English + additional languages).
* Testimonials (if allowed) with consent logging doc.
* Client portal link (if external platform is adopted; never self-built here).
* Tag-driven resource recommender (related articles section using simple cosine similarity on tag vectors).
* Image CDN offload (Cloudinary) if many assets introduced.
* Offline support / PWA (maybe unnecessary, evaluate later).
* Automated semantic search across articles (lunr.js static index generation at build time).

---

## 15. Editorial & Content Workflow

Flow:
1. Draft Markdown locally (frontmatter validated via Zod schema).
2. Run `npm run content:lint` (custom script – checks required frontmatter fields & link integrity).
3. Open PR; CI validates build & accessibility.
4. Merge → auto deploy.

Content Guidelines:
* Plain-language explanations; avoid diagnosis language.
* Each article includes: summary paragraph, scannable subheadings, internal links (2–4), external authoritative sources (0–2, optional), clear call-to-action (CTA) to Contact.
* Keep reading level around grade 8–10 (optionally enforce with a readability script).

---

## 16. Implementation Checklists

### Phase 0 Checklist
* [ ] Initialize repo & Node version file (.nvmrc)
* [ ] `npm create astro@latest` (minimal template)
* [ ] Add TypeScript strict options
* [ ] Configure ESLint + Prettier
* [ ] Add GitHub Action (install, typecheck, build)
* [ ] Commit baseline

### Phase 1 Checklist
* [x] Add design tokens (CSS variables) – Implemented in `src/styles/tokens.css` with colors, spacing, typography scale, shadows, radii.
* [x] Global layout & navigation – `src/layouts/Layout.astro` now imports global styles, provides nav skeleton with active states.
* [x] Footer w/ year + disclaimer link – Added crisis disclaimer link to `/emergency` (page to be created Phase 2).
* [x] Meta component (title/description props) – Implemented as `src/components/Meta.astro` including basic OG/Twitter tags.
* [x] Accessibility baseline (skip link) – Skip link present, focus-visible styles added, semantic landmarks in layout.

### Phase 2 Checklist
* [ ] Pages: About / Services / Conditions / FAQ / Contact / Privacy / Emergency / 404
* [ ] Draft placeholder Markdown content collections
* [ ] Structured navigation active states
* [ ] Basic 404 with helpful links

### Phase 3 Checklist
* [ ] Contact form endpoint integration
* [ ] Honeypot + time threshold anti-spam
* [ ] Consent checkbox + disclaimers
* [ ] JSON-LD (Person, Services, FAQ)
* [ ] robots.txt & sitemap.xml

### Phase 4 Checklist
* [ ] Content collection schemas (Zod)
* [ ] Article list + detail layout
* [ ] Reading time utility
* [ ] Tag filter & index page
* [ ] RSS feed generation

### Phase 5 Checklist
* [ ] Axe a11y audit pass
* [ ] Lighthouse budget integration
* [ ] Lazy-load images & prefetch nav
* [ ] Form usability manual test

### Phase 6 Checklist (Optional)
* [ ] Analytics (privacy friendly) toggle
* [ ] Booking integration page
* [ ] Newsletter signup (double opt-in)
* [ ] Dark mode toggle
* [ ] i18n scaffolding

---

## 17. Developer Setup (When Implementation Begins)

Will be added concretely after Phase 0 initialization; expected commands:
Phase 0 now scaffolded. Current commands:
* `npm install` – install dependencies
* `npm run dev` – start Astro dev server
* `npm run build` – production build (outputs to `dist/`)
* `npm run preview` – preview production build locally
* `npm run lint` – run ESLint (TS + Astro)
* `npm run typecheck` – run TypeScript only
* `npm run test` – (placeholder; to be added Phase 4 when tests introduced)

Optional future scripts:
* `npm run a11y` – run axe on built HTML
* `npm run content:lint` – validate markdown frontmatter
* `npm run perf` – Lighthouse CI

---

## 18. Metrics & Continuous Improvement

Track (post-launch):
* Page views → contact form conversion.
* Top exit pages → refine CTAs.
* Average article scroll depth.
* Performance trend (Lighthouse CI history).
* Accessibility re-audit schedule (quarterly).

---

## 19. Adaptation & Governance

Change Management:
* New features require acceptance criteria + a11y review.
* Content changes require readability + internal link check.

Versioning:
* Use semantic version tags (e.g., `v1.0.0` for initial public milestone after Phase 3).

---

## 20. Quick Start TL;DR (For Agentic Execution)

1. Initialize Astro + strict TS.
2. Add design tokens + layout + navigation.
3. Implement core static pages & placeholder content.
4. Add form + SEO + structured data.
5. Add blog system + article templates.
6. Harden a11y + performance.
7. Layer optional enhancements (analytics, booking, newsletter, i18n).

Always maintain: accessibility, privacy, ethical compliance.

---

## 21. Open Questions (To Clarify Before Certain Phases)

| Topic | Question | Needed By Phase |
|-------|----------|-----------------|
| Licensure details | Which jurisdictions to list? | Phase 2 |
| Service scope | Telehealth only or in-person? | Phase 2 |
| Booking | Will third-party scheduling be used? | Phase 6 |
| Analytics | Is privacy-friendly tracking acceptable? | Phase 6 |
| Localization | Future languages? | Phase 6 |

If unanswered by the listed phase, implement defaults & mark assumptions in CHANGELOG.

---

## 22. Assumptions (Initial)
* Site language: English (en-US).
* No PHI intentionally collected.
* Minimal brand assets initially (logo can be placeholder text style).
* Single psychologist (not group practice) – adjust structured data if this changes.

---

## 23. License & Attribution

Pending decision. If open-sourcing, include MIT with note excluding proprietary branding/content. Otherwise mark repository private or All Rights Reserved.

---

## 24. Next Immediate Action

Proceed to Phase 1: implement design tokens expansion & layout refinement. Phase 0 scaffolding complete (repository structure, Astro config, linting, CI workflow).

---

Feel free to request a condensed version for onboarding or a generated checklist script when starting implementation.
