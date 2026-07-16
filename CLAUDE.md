# CLAUDE.md — Microvend Project Guide

Last updated: 2026-07-16 (A11 Slice 1 applied — fonts self-hosted, per-route SEO metadata added, see A.6; apply-form security hardening code-prep done but not deployed/live-tested, see A.7; A11 itself is not yet closed, see B.4).

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
* **Approved prices (GM plan, 2026-07-15) are the only prices allowed in the UI:** Pro at **₺899/month or ₺8.990/year**, with a 30-day free trial (no card details, no auto-renewal; unpaid trials revert to Free — the business picks the 1 gallery image and 1 sales channel that stay, nothing is deleted, Pro content goes inactive). Any other amount is forbidden. Sponsorlu Vitrin pricing is **not announced** until traffic data exists — use honest "fiyatlandırma yakında açıklanacak" copy.
* **Collection statement (binding, verbatim in UI):** "Microvend, işletmelerin müşterilerinden ödeme almasına aracılık etmez ve satış komisyonu kesmez. MVP'de Pro ve Sponsorlu Vitrin ücretleri platform dışında manuel olarak tahsil edilir."
* The free/pro transition was applied in the A8 GM slice: `Seller.planType` is now `"free" | "pro"` and the pricing page shows the Free/Pro model. Free–Pro limits (quotas, trial, expiry, stats) are **product description only** — no entitlement/quota/subscription logic exists until auth ships (A10+).
* Sponsorlu Vitrin is the **only** homepage sponsor product (a separate, always-"Sponsorlu"-labeled section); no second "homepage sponsored slot" product exists. Haftanın Seçkisi stays editorial.

---

# PART A — CURRENT IMPLEMENTED STATE (as of 2026-07-16, post-A10 close)

Stages A0, A1, SEC-1, A2, A3, A3.1, A4, A5, A6, A7, the GM plan turn, A8 (GM slice + polish sweep), A9 (Supabase applications), and A10 (Supabase Auth + favorites) are done. A11 Slice 1 (fonts self-host + SEO metadata, see A.6) is also applied, but A11 itself is not yet closed — remaining A11 scope is tracked in B.4. Outcomes are described below.

## A.1 Stack

* React 19, TypeScript, Vite 8 (`8.0.16`), Tailwind CSS 4 (`@tailwindcss/vite`), react-router-dom 7. Icons: `lucide-react` + hand-rolled brand icons.
* Package manager: **npm** (`package-lock.json`). Do not use pnpm.
* SEC-1: `vite` at `8.0.16`, `@babel/core` at `7.29.7`; `npm audit` reports 0 vulnerabilities.
* Sellers/categories/collections data is still mock, in `src/data/mockData.ts`. Real backend integrations so far: the apply form (A9) and auth + favorites (A10).
* A9: `/basvuru` inserts into a real Supabase `applications` table (`supabase/migrations/0001_applications.sql`) via `src/lib/supabase.ts` (anon publishable key, `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY`, no client without both). RLS: anon has column-level INSERT only on data columns; `id`/`status`/`created_at` are server-controlled and not grantable. `status` defaults to `pending`. `CHECK` constraints enforce required fields, lengths, and allowed category slugs. A hidden honeypot field silently no-ops the insert and shows a fake success to bots. Verified live: anon SELECT rejected (401/`42501`), a CHECK-violating insert rejected (`23514`), honeypot submissions never reach Supabase, real submissions land as `pending` rows. `.env` (not `.env.example`) holds the two keys and is git-ignored.
* A10: Supabase Auth (email+password) + favorites. `src/auth/AuthContext.ts` + `src/auth/AuthProvider.tsx` (plain React context; fully **synchronous** `onAuthStateChange` callback — no awaits/Supabase calls inside it, INITIAL_SESSION included, unsubscribed on cleanup; session persistence/refresh is supabase-js default). `supabase/migrations/0002_favorites.sql`: `favorites (user_id uuid default auth.uid() references auth.users on delete cascade, seller_id text, created_at, pk (user_id, seller_id))`; RLS select/insert/delete for `authenticated` only with `(select auth.uid()) = user_id`; **no UPDATE policy/grant, zero anon grants**; column-level `grant insert (seller_id)` — `user_id`/`created_at` are server-controlled. Email confirmation ON; signup `emailRedirectTo` → `/giris?dogrulandi=1`; password recovery → `/sifre-sifirlama?mode=update`, after update the app signs out and routes to `/giris?sifre-guncellendi=1`. Auth error copy never reveals whether an email is registered. Manual dashboard steps documented in `docs/SUPABASE_AUTH.md`.
* **A10 live verification passed (stage closed 2026-07-16):** `0002_favorites.sql` applied to the live project. Live tests passed with two dashboard-created, Auto-Confirm test accounts: login (both users), session refresh, signOut→re-login, favorite insert/list, duplicate insert reconciled as `23505`, two-user row isolation (RLS), explicit foreign `user_id` insert rejected (`42501`, column-level grant blocks it before RLS even runs), favorite delete + verified. Password recovery flow live-tested end-to-end: `resetPasswordForEmail` request → user updated password via `?mode=update` → app signed out → redirected to `/giris?sifre-guncellendi=1` → login with the new password succeeded. Dashboard email provider + Confirm email ON + min password length 8 + redirect allowlist all verified.
* **Production gate still open (code-prep done, see A.7; binding gate in B.7):** the apply form's Turnstile + server-side rate-limiting is now built (Edge Function + migrations), but not yet migrated/deployed/live-tested — the anonymous apply form cannot go to general production until that happens; honeypot alone is not sufficient. Auth endpoints additionally need custom SMTP + Auth CAPTCHA (Turnstile) before the public pilot (see `docs/SUPABASE_AUTH.md`) — this is a separate pilot-readiness gate, independent of A10 stage closure above.

## A.2 Implemented routes

`/`, `/kesfet`, `/kategoriler`, `/kategoriler/:slug`, `/seckiler`, `/seckiler/:slug`, `/iletisim`, `/giris`, `/uye-ol`, `/sifre-sifirlama`, `/favoriler`, `/gizlilik`, `/kullanim-kosullari`, `/saticilar` (redirects to `/kesfet`, query preserved), `/saticilar/:slug`, `/ucretlendirme`, `/basvuru`, `/hakkimizda`, `*` (404).

`/kesfet` is the directory (A3): search + category/city/shipping/new filters and sort, **all URL-driven** (`q`, `category`, `sehir`, `gonderim`, `yeni`, `sort`); invalid values fall back safely. Search is Turkish accent-tolerant (A3.1). Category matching is by `categoryId`. `/kategoriler/:slug` reuses the directory with a locked category.

`/seckiler` + `/seckiler/:slug` (A4): editorial collections, newest-first by `publishedAt`. Sponsored collections show a "Sponsorlu" label (low-radius, not a pill) plus a transparency line on the detail page ("Bu içerik sponsorlu tanıtım alanıdır; editoryal seçim değildir."); non-sponsored show "Microvend Seçkisi". `/iletisim` (A4) is static and honest — no fake form, email, phone, or address (see B.7 for the A11 gate).

`/giris`, `/uye-ol`, `/sifre-sifirlama`, `/favoriler` (A10) are **real pages** on Supabase Auth: `LoginPage` (generic Turkish errors, `?dogrulandi=1` / `?sifre-guncellendi=1` status messages, returns to `location.state.from` only if it is a safe in-app path, shows a logged-in panel instead of the form when a session exists), `SignUpPage` (min 8 password, uniform "doğrulama e-postası gönderildi" success), `PasswordResetPage` (two views: request form, and `?mode=update` new-password form that requires a recovery session — otherwise an honest "bağlantı geçersiz" state), `FavoritesPage` (logged-out: login call; logged-in: loading/error+retry/empty/grid states, `seller_id`s resolved against mock sellers with missing ids dropped). If Supabase env is missing, all of them show honest "şu anda kullanılamıyor" errors — nothing is simulated. `/gizlilik` + `/kullanim-kosullari` (A5) are legal **drafts** with a visible "Taslak" label.

## A.3 Implemented components & hooks

* Primitives (A1): `ui/Button` (variants primary/secondary/ghost/inverted; `size` sm/md — `size` added in A5, `inverted` for brand-coloured surfaces in A6), `icons/BrandIcons` (WhatsApp/Instagram), `ScrollToTop` (mounted in `App.tsx`). `SectionHeading` and `SellerImage` refreshed to the new design system (flat fallback). `public/icons.svg` removed.
* Directory (A3): `directory/BusinessCard` (optional `badge` prop, added in A6), `directory/DirectoryResults`, `directory/newest` (`getNewestSellers` — newest 4 by `joinedAt`, reused by the homepage), `directory/normalize` (`normalizeSearch`), `RedirectWithQuery`. `SellersPage` removed (absorbed into `/kesfet`).
* Collections + contact (A4): `pages/CollectionsPage`, `pages/CollectionDetailPage`, `pages/ContactPage`; `data/collections.ts` (`resolveCollectionSellers` — resolves `sellerIds` to existing sellers, order preserved, missing ids dropped, count from resolved). Detail reuses `BusinessCard`/`Button`.
* Homepage (A6): section order = search hero → Kategorilerde keşfet → Yeni katılan işletmeler → membership band → Bu haftanın seçkisi → İhtiyacına göre keşfet → Üreticinin hikâyesi → business join CTA. Components: `Hero` (rewritten: eyebrow/h1/description + search form → `/kesfet?q=&sehir=` via URLSearchParams, empty params omitted; asymmetric photo mosaic from `featuredStory.image` + existing seller covers, no new image URLs), `Categories` (photo tiles → `/kategoriler/:slug`), `home/NewBusinesses` (`getNewestSellers`, "Yeni" badge, → `/kesfet?yeni=1`), `home/MembershipBand` (thin-bordered, secondary weight, → `/uye-ol` + `/giris`), `home/WeeklyPick` (newest collection by `publishedAt`, no hardcoded id; shows "Sponsorlu" label + transparency line if sponsored), `home/NeedsGrid` (4 paths with lucide icons; `?q=hediye`, `?odak=sehir`, `?q=kişiye özel`, `?q=sürdürülebilir`), `home/ProducerStory` (`featuredStory`; renders nothing if its seller is missing), `CTA` (brand band, "Temel profil ücretsiz. Komisyon yok."). Single `h1` (hero). `HowItWorks` and `FeaturedSellers` removed. `index.html` title/description/OG updated to the directory positioning.
* `odak` (A5/A6) is a **focus hint, not a filter**: `/kesfet?odak=ara` focuses the search input, `?odak=sehir` focuses the city select (`DirectoryResults focusTarget`); the param is stripped from the URL with `replace` after use and never affects results.
* Global chrome (A5): `Header` rebuilt on the design system — desktop single line at `lg`+ in the exact order microvend · Hakkımızda · Keşfet · Kategoriler · Seçkiler · İletişim · Ara · Giriş Yap · Üye Ol (outlined) · İşletmeni Ekle (filled); "Ara" is icon-only below `xl` and links to `/kesfet?odak=ara` (autofocuses the search input via `DirectoryResults autoFocusSearch`). Mobile: icon hamburger + full-width panel, `aria-expanded`/`aria-controls`, closes on Escape and on link click. `Footer` rebuilt with 5 link columns (Keşfet / Kategoriler / Hakkımızda / Kaynaklar / Yasal) — **only real routes are linked**; category links are generated from the data layer. `pages/AuthPlaceholderPage` (variant-driven) and `pages/LegalDraftPage` (variant-driven) added.
* Profile actions (A7): `seller/FavoriteDialog` (auth-prompt dialog — no real favorites, no storage; `role="dialog"`, Escape/backdrop/close-button dismissal, focus returned to trigger) and a new action strip on `SellerDetailPage`: primary external action picked as `websiteUrl` → `instagramUrl` → `whatsappUrl` with the label matching the actual target ("Web Sitesini Ziyaret Et" / "Instagram'da Gör" / "WhatsApp ile İletişime Geç", hidden if no channel), Favorilere Ekle (opens the dialog), Paylaş (`navigator.share`, cancel is silent; clipboard fallback with `aria-live` "Bağlantı kopyalandı"/"Kopyalanamadı" feedback). Only the action strip is on the new design system; the rest of the page stays old-style until the A8 sweep.
* Pricing (A8 GM slice): `Pricing.tsx` rebuilt on the design system — Free/Pro comparison (Free: logo+cover outside the gallery quota, 1 gallery image, 1 chosen sales channel, equal organic visibility; Pro: 12 images, multi-channel, in-profile showcase, extended story, priority support, stats marked "yakında"), approved prices ₺899/ay–₺8.990/yıl, 30-day trial terms, Sponsorlu Vitrin section (price "yakında açıklanacak", CTA → `/iletisim`), verbatim collection statement. Free/Pro CTAs → `/basvuru`. All limits are copy only — no quota/trial/subscription logic.
* Auth + favorites (A10): `auth/AuthContext.ts` (`useAuth`) + `auth/AuthProvider.tsx` (wraps the app in `App.tsx`), `components/auth/AuthShell` (shared narrow layout for the three auth pages), `hooks/useFavorite` (`setFavorite(desired)` — desired-state, **not** toggle; button locked while saving; duplicate-insert `23505` reconciled as success; fetch results keyed by `userId+sellerId` so loading is derived, no sync setState in effects). `Header`: logged-in users see an account menu (CircleUser icon; Favorilerim + Çıkış Yap; Escape/outside-click close, `aria-expanded`) instead of Giriş Yap/Üye Ol, in both desktop and mobile panels; while auth state loads neither variant renders (no flash). `SellerDetailPage`: Favorilere Ekle is a real toggle when logged in ("Favorilere Ekle" ⇄ "Favorilerden Çıkar", clay-filled heart, `aria-live` label, disabled while loading/saving); logged out it opens `FavoriteDialog`, which now carries the profile path as `state.from` into `/giris` and `/uye-ol`. `ui/Button` gained an optional `state` prop (react-router Link state). `pages/AuthPlaceholderPage` **removed**.
* Still on the old blue style until the A8 sweep: About, Apply, 404, the `/kategoriler` copy and the non-action sections of `SellerDetailPage`. Hook: `usePageTitle`.

## A.4 Implemented data model (`src/data/mockData.ts`)

* `Category { id, slug, name, description, image, sellerCount (computed), featured }`
* `Seller { …, joinedAt: string (ISO), shippingScope: "local" | "regional" | "nationwide", planType: "free" | "pro", … }` (all prior fields kept; `planType` migrated from silver/gold/premium in the A8 GM slice — s1/s2/s3 are `pro` as Pro-only UI test data, the other 9 are `free`).
* `Collection { id, slug, title, description, intro, coverImage, sellerIds[], sponsored, publishedAt }`, `FeaturedStory { sellerId, title, excerpt, quote?, image }`.
* 12 sellers, 6 categories (new taxonomy: Seramik / Ev & Yaşam / Tekstil / Takı / Doğal Ürünler / Kırtasiye). The original 6 seller `id`/`slug` values are preserved.
* 3 collections (all `sponsored: false` as of A11 Slice 1 — see A.6; the B.5/B.7 production requirement is now satisfied) and one `featuredStory`.
* All images are Unsplash placeholders (localization is an A11 task).

## A.5 Visual state (transitional — intentional)

* Design tokens and fonts are live (see B.2): base is Manrope on paper `#F7F3EC` with ink text; the app shell uses `bg-paper text-ink`.
* Converted to the new design system: primitives, directory (`/kesfet`, `/kategoriler/:slug`), collections, contact, header/footer, the real auth/favorites pages (A10), legal placeholders, the homepage, the pricing page and the profile action strip. Still carrying the old blue style: About, Apply, 404, the `/kategoriler` copy and the non-action sections of `SellerDetailPage`. This mixed look is deliberate: each pending stage converts only the files it touches, and the remaining A8 sweep is the hard gate where old hexes/radii/copy must reach zero.
* `.card-soft` in `index.css` is **deprecated**: still consumed by old components, will be deleted in A8. Do not use it in new code.

## A.6 A11 Slice 1 — fonts & SEO metadata (applied 2026-07-16; A11 itself not yet closed)

* Fonts are self-hosted: `public/fonts/` holds 6 WOFF2 files — Newsreader 400 roman + 400 italic, Manrope 400/500 (one variable-range file per subset, `font-weight: 400 500`), each split into `latin` + `latin-ext` subsets (Google's own `unicode-range` values reused) so Turkish characters (ğ, ş, ı, İ, ç, ö, ü) render correctly alongside plain Latin. `src/index.css` declares the matching `@font-face` rules (`font-display: swap`); `index.html`'s Google Fonts `<link>`/`preconnect` tags are removed. SIL OFL license files are kept in `docs/licenses/`. No new npm dependency.
* `usePageTitle` (`src/hooks/usePageTitle.ts`) takes an optional second `description` argument and updates `<meta name="description">` per route (single `useEffect`, `[title, description]` deps). All 17 pages that call it now pass a real per-page description.
* `public/robots.txt` added (`Allow: /`, no `Sitemap:` line — deferred until a production domain exists). `docs/SEO_ROUTES.md` added: static + dynamic route inventory, ready as sitemap input once that domain exists.
* All `collections[].sponsored` are now `false` (the `dogadan-gelenler` dev/test collection was flipped from `true`; its explanatory comment was removed as no longer applicable).
* Verified: `tsc --noEmit`, `eslint`, `npm run build`, `git diff --check` all clean. Live dev-server checks: all 6 fonts load from `/fonts/*.woff2` (zero requests to `fonts.googleapis.com`/`fonts.gstatic.com`), `document.fonts.check()` confirms Turkish glyph coverage for all 4 faces, per-route `document.title`/meta description update correctly, `/saticilar?<query>` → `/kesfet?<query>` redirect preserves the query string, `/robots.txt` serves the expected content, `/seckiler` shows "Microvend Seçkisi" (no stray "Sponsorlu") on all three collections.
* Image/alt/broken-image audit done, no code change needed: every image already goes through `SellerImage`, which already had a required `alt` prop and an `onError` fallback; no bare `<img>` exists elsewhere in `src/`.
* **A11 remaining (open, tracked in B.4):** image localization/optimization (Unsplash placeholders still in use), `<link rel="canonical">` + `sitemap.xml` (need a real production domain), a real contact address on `/iletisim`, OG tags for business/collection detail pages.

## A.7 Apply-form security hardening — code ready, not deployed (2026-07-16)

* `/basvuru` no longer inserts into `applications` directly; `ApplyPage.tsx` calls `supabase.functions.invoke("submit-application", …)`. Form layout, honeypot, and existing Turkish validation/messages are unchanged; a `TurnstileWidget` (same component as the auth pages, `action="submit_application"`) was added to the form.
* `supabase/migrations/0003_applications_revoke_anon.sql`: drops the `applications_anon_insert` policy and revokes all grants from `anon`/`authenticated` — the Edge Function's service_role client is now the only write path.
* `supabase/migrations/0004_application_rate_limit.sql`: Postgres-based, atomic IP-hash rate-limit. `private.application_rate_limit` table (RLS on, zero grants to `anon`/`authenticated`) + `public.check_application_rate_limit` SECURITY DEFINER RPC (`search_path = ''`, EXECUTE granted only to `service_role`). The window/time is computed entirely with Postgres `now()` — the client never supplies a time value. Raw IPs are never stored: the Edge Function hashes with HMAC-SHA256(ip, `RATE_LIMIT_SALT`) and sends only the hash.
* `supabase/functions/submit-application/index.ts`: explicit field allowlist + type/trim/length/category/email validation (DB `CHECK` constraints remain the last line of defense), Turnstile `siteverify` checked for `success` + `action === "submit_application"` + `remoteip` + an allowed `hostname`, CORS origin allowlist from the `ALLOWED_ORIGINS` secret (treated as hygiene, not a security boundary), POST/OPTIONS only. `supabase/config.toml` sets `verify_jwt = false` explicitly — security rests on these layers, not on JWT identity. The service_role client never receives the caller's `Authorization` header.
* Code checks are clean: `tsc --noEmit`, `eslint`, `npm run build`, `git diff --check`.
* **Not live / not closed:** migrations 0003/0004 have not been applied to the live project; the `TURNSTILE_SECRET_KEY` / `RATE_LIMIT_SALT` / `ALLOWED_ORIGINS` secrets have not been created; the function has not been deployed; no live test has run. The B.7 "Anonim başvuru formu üretim kapısı" stays **closed** until all of that is done.

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

Typography: **Newsreader** (`font-display`) for large/editorial headings; **Manrope** (`font-sans`) for body, navigation, buttons. Self-hosted as of A11 Slice 1 (see A.6) — WOFF2 files in `public/fonts/`, no Google Fonts requests.

Feel: editorial, calm, warm, trustworthy. Strong typographic hierarchy, thin divider lines (e.g. `border-ink/10`), **low border radii** (`rounded-sm`/`rounded-md` max), image-heavy business cards, functional whitespace, real producer/atelier photography direction.

Forbidden: generic blue SaaS look, oversized rounded cards (`rounded-[2rem]`), pill-shaped buttons, gradients, glassmorphism, dashboard aesthetics, popups/blinking ads, tracking ads, paid content presented as organic.

## B.3 Terminology & naming (binding)

* UI copy uses **"işletme"** (or "üretici" where fitting) — not "satıcı".
* Data layer and field names stay seller-based: `Seller`, `sellers`, `sellerIds`, `seller_id`.
* URLs are frozen: `/saticilar/:slug` keeps working; the `/saticilar` list route redirects to `/kesfet` (A3, done). Bulk renames of fields or URLs are a separate migration decision — never do them implicitly.

## B.4 Target IA and stages (pending — route → stage that builds it)

A1, A2, A3, A3.1, A4, A5, A6, A7, GM, A8 (GM slice + polish sweep), A9 (Supabase applications), and A10 (Supabase auth + favorites) are done — see Part A. The approved GM plan lives at `C:\Users\oguz\.claude\plans\microvend-i-in-gm-gelir-kind-sutherland.md` (MVP = Free + Pro + Sponsorlu Vitrin only; paid badge product rejected; category sponsorship / search boost / first-100 campaign deferred as separate decisions). Remaining stages:

* A11 — Final release prep. **Slice 1 done** (fonts self-host, per-route meta description, `robots.txt`, route inventory doc, redirect check, all collections `sponsored: false` — see A.6). **Apply-form security hardening: code done, not deployed** (Edge Function + migrations — see A.7). **Remaining:** image localization/optimization/broken-check (alt-text + fallback audit already passed, no code change needed there), `<link rel="canonical">` + `sitemap.xml` (blocked on a real production domain), real contact address on `/iletisim`, OG tags for business/collection pages.

Header spec (A5, done — see A.3): Ücretlendirme is **not** in the header; it stays reachable via the footer / apply flow. The A10 account menu for logged-in users is built (see A.3).

## B.5 Data model notes (A2 done — see A.4; these constraints remain binding)

* The sponsored mock collection is dev/test-only (label render testing). Production data starts with **all** collections `sponsored: false` until a real sponsor exists.
* Seller ids (`s1`…) are canonical stable ids: the future `sellers` table must keep them (`id text primary key`).

## B.6 Supabase plan (build each part only in its stage)

Order: (1) **A9 applications — done**, see Part A for the shipped shape; (2) **A10 auth + favorites — done**, see Part A; (3) sellers/categories/gallery data layer with mock fallback; (4) storage/admin — explicit request only.

* RLS from day one on every table.
* `service_role` key never in frontend code, env vars shipped to the client, or the repo.
* `.env` added to `.gitignore` in A9.
* **No fake backend behavior:** never simulate login or favorites; forms that pretend to save must never reach a public release.

## B.7 Release gates (binding)

* **Technical preview:** allowed at any stage; membership CTAs may be hidden or shown as honest placeholders; never announce an interim design as the final version.
* **Public pilot:** requires A9 (done) **and** A10 (done, see A.1) **and** custom SMTP + Auth CAPTCHA (Turnstile) configured for the auth endpoints (see `docs/SUPABASE_AUTH.md`) — the SMTP/Turnstile condition is still open. No CTA-hiding exemption.
* **Anonim başvuru formu üretim kapısı (binding):** Turnstile + sunucu tarafı rate-limit eklenmeden anonim başvuru formu genel üretime açılmaz (honeypot tek başına yeterli değildir). Kod tarafı hazır (Edge Function + migration'lar, bkz. A.7); canlı migration/secret/deploy/test tamamlanana kadar bu kapı kapalı kalır.
* **Final launch:** full A11 checklist — fonts self-hosted (done, see A.6), images localized/optimized with alt texts and broken-image check (alt/fallback audit passed; localization/optimization still open), SEO tasks (per-route meta done; canonical/sitemap open pending a production domain), all collections `sponsored: false` (done), `/iletisim` has a real contact address (open), legal drafts reviewed.
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
