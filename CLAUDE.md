# CLAUDE.md — Microvend Project Guide

Last updated: 2026-07-14 (revision brief applied — stage A0 of the approved plan).

This document has two parts:

* **PART A — CURRENT IMPLEMENTED STATE:** what actually exists in the repo today.
* **PART B — APPROVED TARGET & PENDING STAGES:** the approved revision direction; nothing in Part B is implemented unless Part A says so.

Never document unbuilt routes or features as if they exist. When a stage ships, move its items from Part B into Part A.

## 1. Project Identity (binding, permanent)

Microvend is an **open micro-business directory with an editorial discovery layer**.

It is not a marketplace.

Never build marketplace features unless explicitly requested:

* Cart
* Checkout
* Payment
* Order management
* Inventory management
* Commission logic

Core positioning:

> Accessible visibility for micro businesses, organized and trustworthy discovery for users.
> ("Mikro işletmeler için erişilebilir görünürlük, kullanıcılar için düzenli ve güvenilir keşif.")

Visitors are routed to the business's own website, Instagram, WhatsApp, or sales channel. Transactions happen outside Microvend.

## 2. Trust & Revenue Principles (binding — revenue model decided 2026-07-14)

* All user accounts are free. Basic business profile is free. No sales commission. No payments or orders inside Microvend.
* Business monetization: a **single paid Pro membership** offering broader features, plus optional paid promotion tools shown only as clearly **"Sponsorlu"-labeled** placements (homepage, category pages, other suitable areas). Nothing else is sold.
* Organic ranking is never sold. Paid membership or promotion never buys organic position.
* Trust labels are never sold: "Editörün seçimi", "Güvenilir işletme", "Editör onaylı" or similar. Editorial selection cannot be bought.
* Sponsored content is always explicitly labeled "Sponsorlu" and never mixes into organic results.
* **Prices are not final. Never write assumed prices anywhere** — use honest "pricing will be announced" copy until amounts are decided.
* **Do not change the current multi-tier package UI or `Seller.planType` ("silver"/"gold"/"premium") yet.** The transition to free/pro + promotion add-ons follows the GM transition plan, prepared as a plan-only turn before stage A8 (see B.4).

---

# PART A — CURRENT IMPLEMENTED STATE (as of 2026-07-14, post-A0)

## A.1 Stack

* React 19, TypeScript, Vite 8, Tailwind CSS 4 (`@tailwindcss/vite`), react-router-dom 7.
* Package manager: **npm** (`package-lock.json`). Do not use pnpm.
* No backend. All data is mock, in `src/data/mockData.ts`.
* The apply form simulates submission (no network call). This is development-only behavior — see release gates in B.7.

## A.2 Implemented routes

`/`, `/kategoriler`, `/saticilar`, `/saticilar/:slug`, `/ucretlendirme`, `/basvuru`, `/hakkimizda`, `*` (404).

## A.3 Implemented components & hooks

Header, Footer, Hero, SectionHeading, SellerImage (single image seam with initials fallback), CTA, Categories, FeaturedSellers, HowItWorks, Pricing (plan data hardcoded inside the component). Hook: `usePageTitle`.

## A.4 Implemented data model (`src/data/mockData.ts`)

* `Category { id, slug, name, description, image, sellerCount (computed), featured }`
* `Seller { id, slug, name, categoryId, categoryName, city, shortDescription, fullDescription, story, coverImage, logoImage, galleryImages: {url, alt}[], tags[], instagramUrl, whatsappUrl, websiteUrl, featured, planType, foundedYear, location }`
* 6 sellers, 6 categories (old taxonomy: El Yapımı / Ev Dekorasyonu / Moda / Takı / Organik Ürünler / Sanat & Tasarım).
* All images are Unsplash placeholders (localization is an A11 task).

## A.5 Visual state after A0 (transitional — intentional)

* Design tokens and fonts are live (see B.2): base is Manrope on paper `#F7F3EC` with ink text; the app shell uses `bg-paper text-ink`.
* Components still carry the old blue style (inline hexes like `#4e7bab`, `rounded-[2rem]` cards). This mixed look is deliberate: each pending stage converts only the files it touches, and stage A8 is the hard gate where old hexes/radii/copy must reach zero.
* `.card-soft` in `index.css` is **deprecated**: still consumed by old components, will be deleted in A8. Do not use it in new code.

---

# PART B — APPROVED TARGET & PENDING STAGES

## B.1 Target product definition

"Open micro-business directory + editorial discovery layer." The searchable open directory is the backbone. Editorial content (Seçkiler) is a secondary discovery layer — it offers users new discovery paths and is **never** an acceptance gate for businesses being on the platform.

## B.2 Design system (IN FORCE from A0 — all new or edited UI code must follow)

Colors — use tokens only; **raw hexes are forbidden in new code** (validation/warning/accessibility states exempt). Tokens are defined in `src/index.css` `@theme`:

| Token | Value | Role | Utility |
| --- | --- | --- | --- |
| paper | `#F7F3EC` | warm background | `bg-paper` |
| ink | `#1D211F` | primary text | `text-ink` |
| brand | `#315E7D` | deep matte blue, primary CTA | `bg-brand` |
| brand-dark | `#27506C` | CTA hover | `bg-brand-dark` |
| muted | `#626A65` | stone gray, secondary text | `text-muted` |
| clay | `#B85C42` | terracotta accent, eyebrows | `text-clay` |

Typography: **Newsreader** (`font-display`) for large/editorial headings; **Manrope** (`font-sans`) for body, navigation, buttons. Loaded from Google Fonts for now; WOFF2 self-hosting is an A11 task.

Feel: editorial, calm, warm, trustworthy. Strong typographic hierarchy, thin divider lines (e.g. `border-ink/10`), **low border radii** (`rounded-sm`/`rounded-md` max), image-heavy business cards, functional whitespace, real producer/atelier photography direction.

Forbidden: generic blue SaaS look, oversized rounded cards (`rounded-[2rem]`), pill-shaped buttons, gradients, glassmorphism, dashboard aesthetics, popups/blinking ads, tracking ads, paid content presented as organic.

## B.3 Terminology & naming (binding)

* UI copy uses **"işletme"** (or "üretici" where fitting) — not "satıcı".
* Data layer and field names stay seller-based: `Seller`, `sellers`, `sellerIds`, `seller_id`.
* URLs are frozen: `/saticilar/:slug` keeps working; the `/saticilar` list route will redirect to `/kesfet` (A3). Bulk renames of fields or URLs are a separate migration decision — never do them implicitly.

## B.4 Target IA and stages (pending — route → stage that builds it)

* A1 — UI primitives: `ui/Button`, icon system (lucide-react + hand-rolled brand icons), refreshed SectionHeading/SellerImage, ScrollToTop.
* A2 — Mock data: new taxonomy, ~12 businesses, `joinedAt`/`shippingScope`, collections, featured story.
* A3 — `/kesfet` (absorbs `/saticilar` list; all filters URL-driven), `/kategoriler/:slug`, redirect.
* A4 — `/seckiler`, `/seckiler/:slug`, `/iletisim` (no fake contact form).
* A5 — Header/Footer rebuild; `/giris`, `/uye-ol`, `/sifre-sifirlama`, `/favoriler` as honest placeholders (dev/preview only); `/gizlilik`, `/kullanim-kosullari` as visible DRAFTs.
* A6 — New homepage (search hero → categories → new businesses → membership band → weekly collection → needs grid → producer story → join CTA).
* A7 — Business profile actions: Favorilere Ekle (auth dialog), Paylaş (Web Share + fallback), Mağazayı Ziyaret Et.
* GM — revenue-model transition plan (plan-only turn, required before A8): pricing page redesign to free basic + single Pro (no assumed prices), `planType` → `"free" | "pro"` migration decision, "Sponsorlu" promotion-placement surface draft. Building promotion tools is outside the A0–A11 scope.
* A8 — Copy/polish sweep, hard gate: old hexes, `rounded-[2*`, `.card-soft`, UI "satıcı" all reach zero. Pricing page converts per the approved GM plan.
* A9 — Supabase applications (see B.6).
* A10 — Supabase auth + favorites; placeholders replaced with real pages.
* A11 — Final release prep (fonts self-host, image localization/optimization/alt/broken-check, SEO: per-route titles+meta, robots.txt, sitemap.xml, canonical, OG for business/collection pages, redirect check).

Target header (A5, desktop single line, exact order): microvend · Hakkımızda · Keşfet · Kategoriler · Seçkiler · İletişim · Ara · Giriş Yap · Üye Ol (outlined) · İşletmeni Ekle (filled brand CTA). Ücretlendirme is **not** in the header (reachable via footer / apply flow).

## B.5 Target data model additions (A2)

* New taxonomy: Seramik (`seramik`), Ev & Yaşam (`ev-yasam`), Tekstil (`tekstil`), Takı (`taki`), Doğal Ürünler (`dogal-urunler`), Kırtasiye (`kirtasiye`).
* `Seller` += `joinedAt: string` (ISO), `shippingScope: "local" | "regional" | "nationwide"`.
* New types: `Collection { id, slug, title, description, intro, coverImage, sellerIds: string[], sponsored: boolean, publishedAt }`, `FeaturedStory { sellerId, title, excerpt, quote?, image }`.
* The sponsored mock collection is dev/test-only (label render testing). Production data starts with **all** collections `sponsored: false` until a real sponsor exists.
* Seller ids (`s1`…) are canonical stable ids: the future `sellers` table must keep them (`id text primary key`).

## B.6 Supabase plan (build each part only in its stage)

Order: (1) **A9 applications** — insert-only for anon; column-level `GRANT INSERT (allowed columns…)` so `id`/`status`/`created_at`/admin columns are never grantable to anon; `CHECK` constraints for max lengths and allowed category slugs; `status` server-controlled (`DEFAULT 'pending'`); honeypot **plus**, before public pilot, one of Turnstile / Edge Function validation / rate-limit; (2) **A10 auth + favorites** — `favorites (user_id uuid references auth.users on delete cascade, seller_id text, created_at, primary key (user_id, seller_id))`, RLS `user_id = auth.uid()` for select/insert/delete; (3) sellers/categories/gallery data layer with mock fallback; (4) storage/admin — explicit request only.

* RLS from day one on every table.
* `service_role` key never in frontend code, env vars shipped to the client, or the repo.
* `.env` added to `.gitignore` in A9.
* **No fake backend behavior:** never simulate login or favorites; forms that pretend to save must never reach a public release.

## B.7 Release gates (binding)

* **Technical preview:** allowed at any stage; membership CTAs may be hidden or shown as honest placeholders; never announce an interim design as the final version.
* **Public pilot:** requires A9 **and** A10 complete. No CTA-hiding exemption. The simulated apply form must not be public.
* **Final launch:** full A11 checklist (fonts self-hosted, images localized/optimized with alt texts and broken-image check, SEO tasks done, all collections `sponsored: false`, legal drafts reviewed).
* Legal pages (`/gizlilik`, `/kullanim-kosullari`) ship with a visible "Taslak" notice until data processing, Supabase, analytics, and cookie decisions are final.

---

## Working Rules (binding, unchanged in spirit)

### Coding

* Use TypeScript properly. Keep components small, readable, focused. Clear prop names. Avoid overengineering.
* No Redux/Zustand or similar state tools (plain React context is allowed where the plan says so).
* Preserve existing working logic unless a change is necessary. Smallest effective change when editing existing files.
* Approved dependency exceptions: `lucide-react` (A1), `@supabase/supabase-js` (A9). Anything else needs explicit approval.

### Styling

* Tailwind CSS consistently; use B.2 tokens, never new raw hexes. Generous spacing, credible cards, clear (not aggressive) buttons, responsive mobile+desktop. Avoid inline styles without strong reason.

### Routing

* Use the existing react-router setup. Slugs in URLs. Navigation links must match actual routes; no broken routes. Do not replace routing architecture.

### Forms

* Apply form collects: full name, brand name, category, city, email, phone, Instagram, website, short description. Simple validation: required fields, basic email check, clear error and success messages (Turkish).

### Accessibility

* Semantic HTML. Buttons are buttons, links are links. Images have alt text. Readable contrast. Visible hover/focus states.

### Performance

* Keep the app lightweight. No unnecessary packages, large images, or heavy animation libraries. Reuse components.

### Git

* Do not create commits unless explicitly requested — the user commits. Do not change remotes. Do not overwrite user work. Do not delete files unless clearly obsolete and confirmed.

### Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

Verification chain after every stage: `npx tsc --noEmit -p tsconfig.app.json` → `npx eslint .` → `npm run build`, then preview DOM checks at 375px and 1280px.

### Workflow

* Plan first, apply after approval; each stage is one review/apply turn with an explicit file list.
* After changes: report what changed, changed files, known limitations, next practical step.
* No broad unrelated changes; no whole-project refactors without explicit request.
