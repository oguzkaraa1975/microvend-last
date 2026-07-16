# SEO Route Inventory

Input list for a future `sitemap.xml` once a production origin exists (see CLAUDE.md B.7 — canonical/sitemap are deferred until then). Source of truth for the route list itself is `src/App.tsx`; update this doc if routes change there.

## Static routes

- `/`
- `/kesfet`
- `/kategoriler`
- `/seckiler`
- `/iletisim`
- `/giris`
- `/uye-ol`
- `/sifre-sifirlama`
- `/favoriler`
- `/gizlilik`
- `/kullanim-kosullari`
- `/ucretlendirme`
- `/basvuru`
- `/hakkimizda`

## Excluded from sitemap

- `/saticilar` — redirect only (`RedirectWithQuery` → `/kesfet`), not a real page.
- `/giris`, `/uye-ol`, `/sifre-sifirlama`, `/favoriler` — account-scoped/auth pages, not intended as public search-indexed content once the origin is set (mark `noindex` or omit at that time).
- `*` (404) — not a real route.

## Dynamic routes (slug source in `src/data/mockData.ts`)

- `/kategoriler/:slug` — one per `categories[].slug` (6 today).
- `/seckiler/:slug` — one per `collections[].slug` (3 today).
- `/saticilar/:slug` — one per `sellers[].slug` (12 today).

## Not yet decided

- Real production origin (needed for absolute URLs in `sitemap.xml` and `<link rel="canonical">`).
- Whether auth-scoped pages should be `noindex` vs. simply omitted from the sitemap.
