<div align="center">

# Psychologist Website (Static, TypeScript, GitHub Pages)

Strategic development plan & implementation guide. This document is the authoritative roadmap the agentic workflow will follow phase by phase.

![Deploy](https://github.com/heywood8/ducksandhorses-website/actions/workflows/deploy.yml/badge.svg)

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
ducksandhorses_website/
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
1. Merge / push to `main` triggers two workflows:
  * `CI` (`.github/workflows/ci.yml`) – typecheck, lint, build verification, artifact upload (for inspection).
  * `Deploy` (`.github/workflows/deploy.yml`) – rebuilds, uploads `dist/` as a Pages artifact, and calls `actions/deploy-pages`.
2. GitHub Pages is configured (Repository Settings → Pages) with Source = GitHub Actions (no branch selection needed with new Pages Actions flow).
3. The deployed static site is served from the Pages environment URL (should match `site` in `astro.config.mjs`).

Notes:
* Current `site` config: `https://heywood8.github.io/ducksandhorses_website` — ensure repository name alignment (rename repo or adjust `site` if changed to a vanity domain later).
* Custom Domain: After adding a custom domain in Pages settings, also update `site` in `astro.config.mjs` and add DNS records (CNAME / A as instructed by GitHub) plus a `CNAME` file (GitHub auto-injects when configured).
* Cache: Pages handles CDN caching; purge by redeploy (new commit) or updating domain settings.
* Project Path Base (`base`): Because this is a project (not user/org root) site, `astro.config.mjs` sets `base: '/ducksandhorses-website'`. All internal links now use `import.meta.env.BASE_URL` to avoid 404s when served from the subpath. If you later move to a custom apex or root (`username.github.io`), remove the `base` option and strip `BASE_URL` prefixes.

Secrets Needed: None for basic deployment. Add only if integrating analytics or external APIs later.

Rollback: Revert or cherry-pick fix onto `main`; new push triggers fresh deploy.

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
* [x] Pages scaffolded: About, Services (+ individual, couples, telehealth, modalities), Conditions (+ anxiety, depression, burnout), FAQ, Contact, Privacy & Terms, Emergency, 404.
* [x] Placeholder markdown directories & sample files (`src/content/services`, `src/content/conditions`, `src/content/faq`).
* [x] Navigation active states auto-applied via pathname logic (already from Phase 1 layout refactor).
* [x] Contact form placeholder with accessibility semantics, honeypot & consent checkbox (submit disabled pending Phase 3 integration).
* [x] Footer now includes Privacy & Terms and Emergency link.
* [x] 404 page implemented with helpful links.

Pending for later phases: dynamic collections wiring (Phase 4), structured data (Phase 3), form endpoint integration (Phase 3).

### Phase 3 Checklist
* [x] Site config centralization (`src/lib/siteConfig.ts`) with canonical builder.
* [x] Canonical URL auto-generation in `Layout.astro` + head slot for structured data.
* [x] Structured data component (`StructuredData.astro`).
* [x] JSON-LD: Person (About), Service (Individual Therapy), FAQPage (FAQ). (More services can reuse pattern later.)
* [x] Contact form enhancements: form endpoint placeholder, dwell-time activation, honeypot, time-on-page hidden field.
* [x] robots.txt added with sitemap reference.
* [x] Dynamic sitemap endpoint (`/sitemap.xml`).
* [x] 404 page explicitly marked `noindex`.

Pending (optional expansions):
- Add JSON-LD for additional service pages (couples, telehealth, modalities) if needed now or in Phase 4.

### Phase 4 Checklist
* [x] Content collection schemas (Zod) – Implemented in `src/content/config.ts` with validation of `title`, `description`, `publishDate`, optional `updatedDate`, `draft`, `tags`, optional `heroImage`, optional `canonical`.
* [x] Article list + detail layout – `src/pages/blog/index.astro` lists posts (drafts excluded, newest first). Detail pages use dynamic route `src/pages/blog/[slug].astro` + layout `src/layouts/BlogPost.astro` with Article JSON-LD, canonical, reading time, tags.
* [x] Reading time utility – Implemented in `src/lib/readingTime.ts` (200 wpm baseline) consumed by `BlogPost.astro`.
* [x] Tag filter & index page – Individual tag archives at `src/pages/blog/tags/[tag].astro` generated via `getStaticPaths`; tag chips link from index & post pages.
* [x] RSS feed generation – `src/pages/rss.xml.js` exports latest published posts (drafts excluded) for feed readers.

Additional Phase 4 Notes:
* Draft Handling: Any markdown file with `draft: true` is excluded from builds (lists, tag pages, RSS) and from generated static paths.
* Structured Data: Each post emits `Article` JSON-LD (author & site-level data can be extended later).
* Canonicals: Optional frontmatter `canonical` overrides are supported; otherwise canonical derived from slug.
* Imports & ESLint: Config updated so `astro:content` is treated as a core module (prevents false unresolved import errors). Import ordering rules enforced across new files.
* Legacy Catch-All Route: Removed obsolete `src/pages/blog/[...slug].astro` (was a neutralized placeholder once `[slug].astro` introduced).
* Build Output: Blog system increases total static pages (including tag archives, existing site pages, and XML endpoints) to 23.

How To Add A New Post:
1. Create a new markdown file in `src/content/blog/` (filename determines slug unless overridden by file name pattern, Astro uses file name automatically for slug).
2. Include frontmatter:
  ```yaml
  title: "Meaningful Title"
  description: "Short meta description (≤160 chars)."
  publishDate: 2025-02-01
  updatedDate: 2025-02-01 # optional
  draft: false
  tags: [anxiety, skills]
  heroImage: ../images/optional-hero.jpg # optional
  canonical: https://example.com/alternative-url # optional
  ```
3. Write markdown body content below frontmatter. Headings auto-render; ensure accessible alt text for images.
4. (Optional) Set `draft: true` to exclude until ready.
5. Run `npm run dev` or `npm run build` to validate schema & generation.

Planned Future Blog Enhancements (Phase 4+ Backlog):
* Pagination for index & tag pages once post count grows.
* Related posts section (simple shared-tag heuristic).
* Social/open graph image generation (build-time, e.g., `@vercel/og` or Satori) for richer link previews.
* Lightweight client-side search (precomputed JSON index or Fuse.js) – postponed to keep initial footprint minimal.

### Phase 5 Checklist
* [ ] Axe a11y audit pass
* [ ] Lighthouse budget integration
* [ ] Lazy-load images & prefetch nav
* [ ] Form usability manual test

Phase 5 Implementation (in progress):
* Added automated accessibility audit script: `npm run a11y` (builds then scans `dist/**/*.html` with axe-core for WCAG 2 A/AA violations; fails on any violation).
* Implemented lazy-loading (`loading="lazy" decoding="async"`) for blog hero images (extend to other images as added).
* Added lightweight hover prefetch script in `Layout.astro` (skips if user enables `prefers-reduced-data`). Uses `<link rel="prefetch">` for internal routes to reduce perceived latency.
* Introduced Lighthouse performance budget file `lighthouse-budget.json` with initial conservative thresholds (LCP ≤ 2500ms, FCP ≤ 1800ms, TTI ≤ 4000ms, total transferred ≤ 300KB, JS ≤ 80KB). Not yet wired into CI; will be enforced in a future workflow.
* Base path adjustments retained for GitHub Pages deployment (all internal links now rely on `import.meta.env.BASE_URL`).

Next Phase 5 Steps:
1. Expand lazy loading to any future non-critical imagery (services/conditions pages once media added).
2. Add CI job invoking Lighthouse CI (optional dependency) using `lighthouse-budget.json`.
3. Manual keyboard & screen reader spot check (document findings in a short `A11Y_REPORT.md`).
4. Consider extracting link prefetch logic into a separate module for testability.

Usage:
```
npm run a11y
```
Exit code non-zero => violations summary printed.

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
* `npm install` – install dependencies (TypeScript pinned to 5.5.4 for ESLint parser compatibility)
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

## 24. Stability Improvements Summary (Post Phase 3)

Implemented maintenance/stability adjustments:
* Pinned TypeScript to `5.5.4` to align with `@typescript-eslint` 7.x compatibility.
* Removed conflicting `eslint-import-resolver-typescript` (peer dependency clash with utils v8 requirement) – lean config retained.
* Added explicit `noindex` handling for 404 via `Layout` prop.
* Centralized canonical URL generation to avoid mismatches.
* Ensured `.nvmrc` (Node 20) present for reproducible local environment.
* Resolved Astro frontmatter parsing warnings by adding minimal frontmatter blocks to pages using script/JS.
* Eliminated lingering `any` usage in structured data component by switching to `unknown` and runtime safety.

All lint checks now pass with import ordering standardized. Post Phase 4 build produces 23 static HTML pages (including blog posts & tag archives) plus dynamic assets (`sitemap.xml`, `rss.xml`).

## 25. Next Immediate Action
Phase 4 complete (blog system shipped). Next: Phase 5 (Accessibility & Performance Hardening) – add audits, budgets, and image/performance optimizations.

---

Feel free to request a condensed version for onboarding or a generated checklist script when starting implementation.
