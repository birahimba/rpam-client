# SEO Architecture — RPAM
> Persistent SEO and technical reference for all development sessions.
> Keep this document up to date whenever pages, silos, or rules change.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [SEO Silo Structure](#2-seo-silo-structure)
3. [Mandatory SEO Rules](#3-mandatory-seo-rules)
4. [Next.js Technical Architecture](#4-nextjs-technical-architecture)
5. [Article Publication Checklist](#5-article-publication-checklist)
6. [E-E-A-T Strategy](#6-e-e-a-t-strategy)
7. [Internal Linking Architecture](#7-internal-linking-architecture)
8. [SEO Monitoring](#8-seo-monitoring)
9. [AI Content Guidelines](#9-ai-content-guidelines)
10. [Page Inventory & Sitemap Registry](#10-page-inventory--sitemap-registry)

---

## 1. Project Overview

### Mission

RPAM (Réseau Profès Arvy Motivation) is a French professional coaching firm that guides individuals through career clarity, skill development, and job placement. The platform serves students, career changers, active job seekers, and employees seeking advancement — primarily in France, with secondary reach to French-speaking Africa.

The company's upcoming product, **RPAM Connect**, is a HRTech platform combining AI and human coaching.

### Key Information

| Field | Value |
|---|---|
| Domain | `https://www.rpam.fr` |
| Canonical base | `https://www.rpam.fr` (always `www`, always `https`) |
| Primary locale | `fr_FR` |
| Contact | `contact@rpam.fr` |
| Booking CTA | `/booking` |
| OG fallback image | `/images/og-rpam.jpg` |
| Brand primary color | `#005153` |
| Brand accent color | `#ecab23` |

### SEO Positioning

RPAM targets **career-intent keywords** in French — people actively searching for professional transformation: career assessments, training, job coaching, CV optimization, LinkedIn strategy, and AI upskilling. The brand competes in a trust-driven market where E-E-A-T signals (expertise, experience, authority, trust) are decisive ranking factors.

### Long-Term Organic Strategy

- Dominate the three core service silos via pillar pages + blog cluster articles.
- Build topical authority in `bilan de compétences`, `reconversion professionnelle`, `formation IA`, `optimisation CV & LinkedIn`.
- Convert organic traffic to booking consultations (primary conversion goal).
- Grow blog as a long-tail traffic engine with FAQ-rich, schema-structured articles.
- Expand into Francophone Africa search markets over time.

---

## 2. SEO Silo Structure

The site is organized around **three topical silos**, each anchored by a service pillar page and supported by blog cluster articles.

```
Homepage (/)
├── Silo 1 — Guidance (/guidance)
│   ├── Pillar: /reconversion-professionnelle
│   └── Articles: /blog/reconversion-professionnelle-30-40-50-ans
│
├── Silo 2 — Up Training (/up-training)
│   ├── Pillar: /formation-ia
│   └── Articles: /blog/se-former-intelligence-artificielle-travail-2025
│
└── Silo 3 — Job Getting (/job-getting)
    ├── Pillar: /cv-ats
    ├── Pillar: /linkedin-recruteurs
    └── Articles: /blog/cv-ats-2025
                  /blog/optimiser-profil-linkedin-recruteurs-2025
```

---

### Silo 1 — Guidance

**Service page:** `/guidance`

**Goal:** Rank for career assessment and professional orientation queries. Convert visitors who do not yet have a clear career direction.

**Target audience:** Students finishing degrees, employees feeling stuck, people considering a career change.

**Primary keywords:**
- `bilan de compétences`
- `orientation professionnelle`
- `reconversion professionnelle`
- `projet professionnel`
- `coaching orientation carrière`
- `bilan de compétences CPF`

**Pillar page:** `/reconversion-professionnelle`
- Comprehensive guide: steps, eligibility, CPF funding, RPAM methodology
- Internal links: → `/guidance`, → `/booking`, → blog cluster articles

**Blog cluster topics:**
- Reconversion à 30, 40, 50 ans
- Comment réussir son bilan de compétences
- Financer sa reconversion via le CPF
- Changer de métier sans diplôme supplémentaire
- Témoignages de reconversion réussie

**Content strategy:** Long-form, FAQ-rich, schema-marked guides targeting informational + commercial intent. Structure each article around a central question a real person would search. Always close with a CTA to `/booking`.

---

### Silo 2 — Up Training

**Service page:** `/up-training`

**Goal:** Rank for upskilling and professional training queries, especially around AI, digital skills, and soft skills development.

**Target audience:** Employees who want to stay competitive, people who need to demonstrate new competencies for a promotion or career pivot.

**Primary keywords:**
- `formation professionnelle`
- `se former à l'intelligence artificielle`
- `développement des compétences`
- `soft skills formation`
- `formation sur mesure`
- `upskilling travail`
- `compétences numériques 2025`

**Pillar page:** `/formation-ia`
- Complete guide: what AI skills to develop, how to get started, which tools matter, how RPAM can help
- Internal links: → `/up-training`, → `/booking`, → blog cluster articles

**Blog cluster topics:**
- Guide pratique pour se former à l'IA au travail
- Les compétences les plus demandées en 2025
- Soft skills vs hard skills : lesquels développer en priorité
- Formations courtes pour changer de poste rapidement
- Comment l'IA transforme le marché du travail français

**Content strategy:** Timely, practical, tool-focused content. Update regularly to stay current with the AI landscape. Target both informational (awareness) and commercial (decision) intent in each article.

---

### Silo 3 — Job Getting

**Service page:** `/job-getting`

**Goal:** Rank for active job-search queries — CV writing, LinkedIn optimization, interview coaching.

**Target audience:** Active job seekers who are not getting callbacks despite applying, people re-entering the job market, recent graduates.

**Primary keywords:**
- `optimiser son CV`
- `CV ATS passé en revue`
- `profil LinkedIn recruteurs`
- `coaching entretien d'embauche`
- `stratégie recherche emploi`
- `lettre de motivation 2025`
- `optimiser profil LinkedIn`

**Pillar pages:**
- `/cv-ats` — Complete ATS CV guide: what ATS is, how it scores CVs, RPAM CV optimization methodology
- `/linkedin-recruteurs` — Complete LinkedIn guide: profile optimization, recruiter reach, keyword placement, RPAM LinkedIn coaching

**Blog cluster topics:**
- Réussir un CV qui passe les filtres ATS
- Optimiser son profil LinkedIn pour les recruteurs
- Préparer un entretien d'embauche en 7 étapes
- Les erreurs qui font rejeter votre candidature
- Comment relancer un recruteur sans paraître insistant

**Content strategy:** Highly actionable, checklist-driven content. Job seekers have urgent intent — deliver value immediately, then offer the booking CTA. Target very specific long-tail queries.

---

## 3. Mandatory SEO Rules

These rules apply to every page and article on `rpam.fr`. No exceptions.

### Canonical Rules

- Every page MUST have a self-referencing canonical tag via the `SEOHead` component.
- Canonical URL format: `https://www.rpam.fr/path` — no trailing slash, no query strings.
- Blog articles: `https://www.rpam.fr/blog/{slug}`.
- Never let two URLs serve identical content without a canonical pointing to the preferred version.
- Paginated content (if added): use `rel="prev"` / `rel="next"` and canonical the first page.

```jsx
// Correct usage — always pass the full absolute URL
<SEOHead canonical="https://www.rpam.fr/guidance" ... />
```

### Meta Titles

- Format: `[Primary Keyword] – [Secondary Context] | RPAM`
- Maximum length: **60 characters** (render-safe in Google SERPs).
- Must contain the primary keyword as close to the front as possible.
- Never duplicate titles across pages.

| Page | Title |
|---|---|
| Homepage | `RPAM – Coaching professionnel, bilan de compétences et orientation \| France` |
| Guidance | `Guidance – Bilan de compétences & orientation professionnelle \| RPAM` |
| Up Training | `Up Training – Formation sur mesure & développement de compétences \| RPAM` |
| Job Getting | `Job Getting – Coaching emploi & recherche d'emploi \| RPAM` |
| Blog article | `[Article title, max 50 chars] \| RPAM` |

### Meta Descriptions

- Length: **150–160 characters** (avoid truncation in SERPs).
- Must include the primary keyword naturally.
- Must contain a value proposition and a soft call-to-action.
- Never duplicate descriptions across pages.
- Write for humans — the description is the click driver.

### H1 Rules

- **One H1 per page, always.**
- The H1 must contain the primary keyword for that page.
- H1 must match the semantic intent of the page title (same topic, slight variation is acceptable).
- Never use the H1 as a decorative element — it is the topical signal for crawlers.

### Slug Rules

- Format: `kebab-case`, lowercase, French words, no accents, no stop words.
- Good: `/reconversion-professionnelle`, `/cv-ats-2025`
- Bad: `/mon-article`, `/page1`, `/Formation_IA`
- Blog slugs: `/blog/{topic}-{year}` — include year for time-sensitive content.
- Pillar page slugs: no date — they are evergreen.
- Never change a published slug without implementing a 301 redirect.

### Internal Linking

See [Section 7](#7-internal-linking-architecture) for the full internal linking matrix.

- Every blog article must link to at least **2 pillar pages** in its silo.
- Every pillar page must link to its service page and to `/booking`.
- Every service page must link to at least 2 related blog articles.
- Anchor text must be descriptive and keyword-relevant — never use "click here" or "lire la suite" as the sole anchor.

### Schema.org Requirements

The following JSON-LD schemas are required depending on page type:

| Page type | Required schemas |
|---|---|
| Homepage | `Organization` |
| Service pages (Guidance, Up Training, Job Getting) | `Service`, `FAQPage`, `BreadcrumbList` |
| Pillar pages | `Article` or `WebPage`, `FAQPage`, `BreadcrumbList` |
| Blog articles | `BlogPosting`, `BreadcrumbList`, `FAQPage` (if FAQ section present) |
| About page | `AboutPage`, `Person` or `Organization` |

Use the `buildArticleSchema()` function in `lib/seo.js` for all blog articles. Extend the function for new schema types if needed — do not write inline schema objects in page files when a utility function exists.

### Robots / Noindex Rules

- All public pages: `index, follow` (set in `SEOHead` component by default).
- Pages that must be `noindex, nofollow`: `/booking` confirmation screens (if created), admin paths, duplicate content pages, staging preview URLs.
- The `robots.txt` at `/public/robots.txt` explicitly allows all major crawlers including AI crawlers (GPTBot, ClaudeBot, Gemini, Perplexity, etc.) — do not restrict these unless legally required.
- Never add `noindex` to pillar pages, service pages, or published blog articles.

### Sitemap Rules

- Sitemap lives at `/public/sitemap.xml` — generated via `node generate-sitemap.js`.
- **Run the sitemap script after every page creation or article publication.**
- Priorities:
  - Homepage: `1.0`
  - About, Services: `0.9`
  - Service pages (Guidance, Up Training, Job Getting): `0.85`
  - Pillar pages (evergreen SEO guides): `0.9`
  - Blog index, News: `0.8`
  - Blog articles: `0.8`
  - Booking: `0.7`
- `changefreq`: `weekly` for homepage and blog index; `monthly` for service and pillar pages; `monthly` for articles (update `lastmod` when content is revised).
- Always update the `lastmod` date when a page is significantly updated.
- Submit the sitemap to Google Search Console after every major update.

---

## 4. Next.js Technical Architecture

### Router

The project uses the **Next.js Pages Router** (`/pages` directory), not the App Router. All routing, layouts, and metadata follow Pages Router conventions.

### Rendering Strategy

| Page type | Strategy | Rationale |
|---|---|---|
| Homepage (`/`) | SSG (static) | High-traffic, infrequently changed |
| Service pages | SSG (static) | Stable content, needs fast TTFB |
| Pillar pages | SSG (static) | Evergreen content, full crawlability |
| Blog article `[slug]` | SSG with `getStaticProps` + `getStaticPaths` | Pre-render all known slugs at build time |
| Blog index `/blogs` | SSG with ISR if article list grows | Static by default; add ISR (`revalidate`) if content updates frequently |
| Booking `/booking` | Client-side (CSR) | Dynamic form, no SEO value needed |

Do **not** use SSR (`getServerSideProps`) for content pages — it increases TTFB and disables Vercel's edge caching. Reserve SSR only for user-specific, authenticated content.

### Metadata Implementation

The project uses a **custom `SEOHead` component** (`components/SEOHead.jsx`) wrapping `next/head`. This is the single source of truth for all page metadata.

```jsx
// components/SEOHead.jsx — accepted props
<SEOHead
  title="..."           // required — 60 chars max
  description="..."     // required — 150–160 chars
  canonical="..."       // required — full absolute URL
  ogImage="..."         // optional — defaults to /images/og-rpam.jpg
  ogType="website"      // optional — use "article" for blog posts
  schema={schemaObject} // optional — JSON-LD object or array
/>
```

Every page file **must** call `<SEOHead>` as the first child of `<Layout>`.

**Do not** mix `next/head` calls directly in page files — always go through `SEOHead`.

### Open Graph

- `og:type`: `website` for service and pillar pages; `article` for blog posts.
- `og:image`: Always provide a specific image when possible. Fall back to `/images/og-rpam.jpg` (1200×630px minimum required).
- `og:locale`: Always `fr_FR`.
- `og:site_name`: Always `RPAM`.
- Blog article OG images: create unique cover images at `/public/images/blog/{slug}-cover.jpg` and pass via `coverImage` prop to `buildArticleSchema()`.

### Performance Rules

- **No CLS:** Set explicit `width` and `height` on all `<img>` tags, or use `next/image` with `layout="responsive"`.
- **Image format:** Use `.webp` for photographs, `.svg` for icons and logos. Convert legacy `.jpg`/`.png` to `.webp` when creating new assets.
- **Lazy loading:** Add `loading="lazy"` to all images below the fold. Never lazy-load the hero/LCP image.
- **Font loading:** Web fonts must be preloaded or served from `/public/fonts/` with `font-display: swap` in CSS.
- **Third-party scripts:** Defer all non-critical scripts. jQuery and vendors must not block the main thread.
- **Bundle size:** Do not add new npm dependencies without evaluating their bundle impact (`next build` output).

### Core Web Vitals Targets

| Metric | Target | Current risk area |
|---|---|---|
| LCP | < 2.5s | Hero slider images — ensure LCP image is not lazy-loaded |
| INP | < 200ms | Interactive elements, form submissions |
| CLS | < 0.1 | Images without dimensions, font swap shifts |

Measure Core Web Vitals in Google Search Console (field data) and via PageSpeed Insights (lab data) after every significant change.

### Image Optimization

- Store all images under `/public/images/`.
- Blog cover images: `/public/images/blog/{slug}-cover.jpg` (also create `@2x` variant for retina).
- All `<img>` tags must have a meaningful `alt` attribute — describe the image content, include the keyword when natural. Never use empty `alt=""` on content images (only on decorative images).
- Recommended dimensions: hero images 1440×900px; blog covers 1200×630px (also serves as OG image).

### Accessibility SEO

- Heading hierarchy must be correct: one `H1`, then `H2` for main sections, `H3` for subsections. Never skip levels.
- All interactive elements (buttons, links) must have accessible labels.
- Color contrast must meet WCAG AA (4.5:1 for body text). Brand dark `#0d2535` on white passes; verify accent combinations.
- All anchor links must have descriptive text — screen readers and crawlers both rely on anchor text for context.

---

## 5. Article Publication Checklist

Run through this checklist before merging or deploying any new blog article.

### Content Requirements

- [ ] **Minimum 1 200 words** of substantive, original content (aim for 1 500–2 500 words for pillar-adjacent articles).
- [ ] **Primary keyword** appears in: title, H1, first paragraph, at least one H2, meta description.
- [ ] **Secondary keywords** appear naturally throughout the body — no keyword stuffing.
- [ ] **FAQ section** included with at minimum 3 questions (enables FAQPage schema and rich results).
- [ ] **CTA** present at the end of the article linking to `/booking` or the relevant service page.
- [ ] **At least 2 internal links** to pillar pages or other articles in the same silo.
- [ ] **At least 1 internal link** to the relevant service page (Guidance, Up Training, or Job Getting).
- [ ] No duplicate content with existing pages — run a search before writing.

### Technical Requirements

- [ ] **Slug** follows the slug rules: `kebab-case`, French, no accents, includes year if time-sensitive.
- [ ] **Cover image** created at `/public/images/blog/{slug}-cover.jpg` (1200×630px minimum).
- [ ] **Alt text** written for the cover image (descriptive + keyword-inclusive).
- [ ] **SEOHead** called with correct `title`, `description`, `canonical`, `ogImage`, `ogType="article"`, and `schema`.
- [ ] **JSON-LD** generated via `buildArticleSchema()` in `lib/seo.js` with all required fields: `slug`, `title`, `description`, `coverImage`, `datePublished`, `keywords`, `faqs`.
- [ ] **FAQPage schema** populated with the same FAQ items present in the article body.
- [ ] **BreadcrumbList** schema included (it is generated automatically by `buildArticleSchema()`).
- [ ] Article added to `content/articles.js` with correct metadata.
- [ ] Sitemap regenerated: `node generate-sitemap.js`.
- [ ] Sitemap entry added to `generate-sitemap.js` `BLOG_ARTICLES` array with correct `lastmod`.

### Mobile & Accessibility

- [ ] Article renders correctly on mobile (375px viewport minimum).
- [ ] Images are responsive — no horizontal overflow.
- [ ] Heading hierarchy is correct: one H1, H2s for sections, H3s for subsections.
- [ ] All links have descriptive anchor text.
- [ ] Reading flow makes sense without styles (semantic HTML).

### SEO Validation

- [ ] Title is ≤ 60 characters.
- [ ] Meta description is 150–160 characters.
- [ ] Canonical URL is correct and self-referencing.
- [ ] No `noindex` tag accidentally applied.
- [ ] Test JSON-LD with [Google's Rich Results Test](https://search.google.com/test/rich-results).
- [ ] Test Open Graph rendering with [OpenGraph.xyz](https://www.opengraph.xyz) or Facebook Debugger.

---

## 6. E-E-A-T Strategy

Google's quality evaluator guidelines weight Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) heavily for health, financial, and career advice content. RPAM's coaching content falls in this category.

### Experience

- Reference real client situations (anonymized) and coaching scenarios to demonstrate lived experience.
- Include methodology descriptions — how RPAM conducts sessions, what the process looks like.
- Avoid generic advice that could come from any source; ground recommendations in the French job market context.

### Expertise

- Every article should reflect professional coaching knowledge: career assessment methods, labor market data, regulatory context (CPF funding, France Travail, etc.).
- Cite specific French institutions and frameworks when relevant (e.g., CPF, OPCO, France Compétences).
- Avoid vague statements like "improve your career" — be specific and actionable.

### Authoritativeness

- The `Organization` schema on the homepage establishes RPAM's identity to search engines.
- Add a consistent author attribution to blog articles (even if `"author": {"@type": "Organization", "name": "RPAM"}`) — this will be enhanced when individual coaches are profiled.
- Build backlinks from French career, HR, and education sites over time.
- Maintain a consistent editorial voice across all content.

### Trustworthiness

- The site already exposes privacy policy, terms & conditions, and copyright documents in `/public/docs/`.
- Always link to these legal pages from the footer.
- Contact information (`contact@rpam.fr`) must be visible and functional.
- HTTPS is enforced via Vercel — maintain this.
- Do not make unverifiable claims (e.g., "100% job placement rate") without data to back them up.

### Editorial Tone

- **Language:** French (contemporary, professional, warm but not informal).
- **Voice:** Second-person direct (`vous`) — engage the reader directly.
- **Stance:** Empowering, never condescending. Acknowledge the difficulty of career transitions before presenting solutions.
- **Specificity:** Always prefer concrete examples over abstract advice.
- **Neutrality:** Avoid political or divisive content. Career coaching content should be universally applicable.
- **Vocabulary:** Use the language job seekers actually use in searches — "trouver un emploi", "changer de métier", not internal HR jargon.

---

## 7. Internal Linking Architecture

### Mandatory Link Map

Every page must respect the following minimum internal linking rules:

| Source page | Must link to |
|---|---|
| Homepage (`/`) | `/guidance`, `/up-training`, `/job-getting`, `/blogs`, `/booking`, latest featured article |
| `/guidance` | `/reconversion-professionnelle`, `/booking`, `/up-training`, `/job-getting`, 2 related blog articles |
| `/up-training` | `/formation-ia`, `/booking`, `/guidance`, `/job-getting`, 2 related blog articles |
| `/job-getting` | `/cv-ats`, `/linkedin-recruteurs`, `/booking`, `/guidance`, 2 related blog articles |
| `/reconversion-professionnelle` | `/guidance`, `/booking`, `/blog/reconversion-professionnelle-30-40-50-ans` |
| `/formation-ia` | `/up-training`, `/booking`, `/blog/se-former-intelligence-artificielle-travail-2025` |
| `/cv-ats` | `/job-getting`, `/booking`, `/blog/cv-ats-2025`, `/linkedin-recruteurs` |
| `/linkedin-recruteurs` | `/job-getting`, `/booking`, `/blog/optimiser-profil-linkedin-recruteurs-2025`, `/cv-ats` |
| Blog articles (Guidance silo) | `/guidance`, `/reconversion-professionnelle`, `/booking` |
| Blog articles (Up Training silo) | `/up-training`, `/formation-ia`, `/booking` |
| Blog articles (Job Getting silo) | `/job-getting`, `/cv-ats` or `/linkedin-recruteurs`, `/booking` |

### Cluster Structure

Each silo has a hub-and-spoke structure:

```
Service page (hub)
    ↕ bidirectional links
Pillar page (spoke 1)
    ↕ bidirectional links
Blog articles (spoke 2, 3, N)
    → All spokes link back to hub and to sibling spokes
```

### Reinforcing Pillar Pages

Pillar pages (`/reconversion-professionnelle`, `/formation-ia`, `/cv-ats`, `/linkedin-recruteurs`) are the highest-priority non-homepage pages for link equity. Ensure they receive internal links from:
- Their respective service page
- Every blog article in their silo
- The homepage (at least a mention in the blog section or a direct widget if UX allows)

### Anchor Text Rules

| Anchor text type | Usage |
|---|---|
| Exact keyword | Use sparingly (1–2 per article max): e.g., "bilan de compétences" linking to `/guidance` |
| Partial keyword | Most common: "notre service Guidance", "reconversion professionnelle" |
| Branded | Acceptable: "accompagnement RPAM", "l'équipe RPAM" |
| Generic | Forbidden as standalone: "cliquez ici", "lire la suite", "en savoir plus" must be preceded by context |
| Descriptive phrase | Preferred for CTAs: "réservez votre consultation gratuite", "découvrir le service Up Training" |

---

## 8. SEO Monitoring

### Google Search Console

Monitor the following in Google Search Console (GSC) on a **weekly** basis:

- **Coverage report:** Zero `Excluded` pages that should be indexed. Investigate any `Crawled – currently not indexed` or `Discovered – currently not indexed` statuses.
- **Performance report:** Track impressions, clicks, CTR, and average position for top queries per silo. Flag any 20%+ week-over-week drops.
- **Core Web Vitals report:** Target all URLs in the "Good" band. Investigate any URLs in "Needs improvement" or "Poor".
- **Sitemap submission:** Confirm sitemap is accepted and all URLs are processed after each sitemap update.
- **Manual actions:** Check monthly — should always be "No issues detected".

### Indexation Checks

After publishing a new page or article:
1. Submit URL to GSC's URL Inspection tool for immediate indexing request.
2. Verify the URL is crawlable (no `noindex`, no robots block, no redirect chain).
3. Confirm the canonical in GSC matches the intended canonical.
4. Check that JSON-LD is parsed correctly in the URL Inspection "Enhancements" tab.

### Core Web Vitals Monitoring

- Use PageSpeed Insights for on-demand lab testing.
- Monitor GSC's Core Web Vitals report for field data (real user measurements).
- After any significant front-end change (new section, new script, new image), re-test the affected pages.
- LCP images (hero slide, article cover) must never be lazy-loaded.

### SEO Errors to Monitor

| Error type | Detection method | Resolution |
|---|---|---|
| Duplicate titles | GSC > Search results > Pages with issues | Rewrite affected titles |
| Missing meta descriptions | GSC > Enhancements | Add missing descriptions |
| Broken internal links | Regular `next build` check + Screaming Frog | Fix or redirect |
| 404 pages receiving links | GSC > Coverage | Implement 301 redirects |
| Slow LCP | PageSpeed Insights | Optimize hero image, preload LCP |
| Missing canonical | Manual audit | Add to `SEOHead` |
| Invalid JSON-LD | Google Rich Results Test | Fix schema errors in `lib/seo.js` |
| Soft 404 | GSC > Coverage | Ensure empty/thin pages return actual content |

### Monitoring Cadence

| Task | Frequency |
|---|---|
| GSC performance review | Weekly |
| GSC coverage review | Weekly |
| Core Web Vitals check | After each deployment |
| Rich results test on new articles | Before and after publication |
| Full link audit | Monthly |
| Sitemap validation | After every publication |
| Backlink check | Monthly (Ahrefs, Moz, or Google Search Console Links report) |

---

## 9. AI Content Guidelines

AI-assisted writing must meet the same quality bar as human-written content. The following rules prevent Google penalties and preserve RPAM's E-E-A-T signals.

### Prohibited Content Patterns

- **Generic advice:** Phrases like "it's important to have a good CV" or "networking is key" without specifics. Every claim must be actionable and grounded in the French market.
- **Keyword stuffing:** Do not repeat the primary keyword more than once every 200 words in body text.
- **Thin content:** No article under 1 200 words. No pages with fewer than 300 words of unique, meaningful content.
- **Duplicate paragraphs:** Never copy-paste from other pages on the site. Each page must be editorially unique.
- **Filler intros:** Do not open articles with "In this article, we will explore..." or "Are you looking for a way to...". Start with the answer, a surprising fact, or a direct statement of value.
- **Over-optimized headings:** H2s and H3s must read as natural section titles, not as keyword-stuffed banners.
- **Unverifiable statistics:** Do not include statistics without a source. If an exact figure cannot be verified, use qualitative framing instead.
- **Hallucinated French regulations:** Any reference to CPF rules, France Travail programs, or OPCO funding must be accurate and current. AI models may have outdated or incorrect information on these — verify before publishing.

### Content Quality Standards

- Every AI-drafted paragraph must be reviewed by a human editor before publication.
- Content must reflect real coaching scenarios — if a section reads as generic HR advice, rewrite it with RPAM's specific methodology.
- Maintain the editorial tone defined in [Section 6](#6-e-e-a-t-strategy): empowering, specific, direct, warm.
- Use concrete examples: "A 42-year-old nurse transitioning to project management" is better than "a professional considering a career change".

### Avoiding Unnecessary Pages

- Do not create new pages unless they target a distinct keyword cluster that is not already covered.
- Before creating a new page, check whether the topic could be covered as a section within an existing pillar page or as a blog article.
- "More pages" is not inherently better for SEO. Thin pages with minimal traffic dilute the domain's authority.

### Cannibalization Prevention

- Before targeting a new keyword, check existing pages via GSC or a site search: `site:rpam.fr keyword`.
- If two pages target the same keyword, consolidate them (301 the weaker page to the stronger) or differentiate their intent clearly (informational vs. commercial).

---

## 10. Page Inventory & Sitemap Registry

This section is the authoritative reference of all indexed pages. Update it whenever a page is created, removed, or significantly restructured.

### Static Pages

| Path | Title | Priority | Silo | Type |
|---|---|---|---|---|
| `/` | RPAM – Coaching professionnel... | 1.0 | All | Homepage |
| `/about` | À propos | 0.9 | Brand | About |
| `/services` | Nos services | 0.85 | All | Services hub |
| `/guidance` | Guidance – Bilan de compétences... | 0.85 | Guidance | Service page |
| `/up-training` | Up Training – Formation sur mesure... | 0.85 | Up Training | Service page |
| `/job-getting` | Job Getting – Coaching recherche d'emploi... | 0.85 | Job Getting | Service page |
| `/blogs` | Blog RPAM | 0.8 | All | Blog index |
| `/news` | Actualités | 0.8 | Brand | News |
| `/booking` | Consultation gratuite | 0.7 | All | CTA page |

### Pillar Pages (SEO)

| Path | Title | Priority | Silo | Type |
|---|---|---|---|---|
| `/reconversion-professionnelle` | Guide reconversion professionnelle | 0.9 | Guidance | Pillar |
| `/formation-ia` | Se former à l'IA au travail | 0.9 | Up Training | Pillar |
| `/cv-ats` | CV ATS : guide complet | 0.9 | Job Getting | Pillar |
| `/linkedin-recruteurs` | Optimiser LinkedIn pour les recruteurs | 0.9 | Job Getting | Pillar |

### Blog Articles

| Path | Slug | Silo | Status |
|---|---|---|---|
| `/blog/reconversion-professionnelle-30-40-50-ans` | reconversion-professionnelle-30-40-50-ans | Guidance | Published |
| `/blog/se-former-intelligence-artificielle-travail-2025` | se-former-intelligence-artificielle-travail-2025 | Up Training | Published |
| `/blog/cv-ats-2025` | cv-ats-2025 | Job Getting | Published |
| `/blog/optimiser-profil-linkedin-recruteurs-2025` | optimiser-profil-linkedin-recruteurs-2025 | Job Getting | Published |

### Noindex Pages

| Path | Reason |
|---|---|
| *(none currently)* | — |

> Add new entries to the appropriate table above as soon as a page is created. Never publish a page without registering it here.

---

## Component & File Reference

| File | Purpose |
|---|---|
| `components/SEOHead.jsx` | SEO metadata: title, description, canonical, OG, Twitter Card, JSON-LD |
| `lib/seo.js` | `buildArticleSchema()` — generates `BlogPosting` + `BreadcrumbList` + `FAQPage` schema |
| `generate-sitemap.js` | Generates `public/sitemap.xml` — run with `node generate-sitemap.js` after any page change |
| `public/sitemap.xml` | Submitted to Google Search Console |
| `public/robots.txt` | Allows all crawlers including major AI bots |
| `public/llms.txt` | AI crawler context file |
| `content/articles.js` | Article metadata registry — add each new article here |
| `content/blog/*.md` | Blog article source files (Markdown + gray-matter frontmatter) |
| `pages/blog/[slug].jsx` | Dynamic blog article renderer |

---

*Last updated: 2026-05-16*
*Maintained by: RPAM development team*
*Scope: https://www.rpam.fr — Next.js Pages Router, Vercel*
