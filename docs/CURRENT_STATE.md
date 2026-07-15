# Microvend — Güncel Durum

## Proje durumu
Editoryal rehber pivotu uygulanıyor (bkz. CLAUDE.md). Aşamalar A0→A7, GM plan turu ve A8 (GM gelir modeli dilimi + genel görsel/terminoloji cila süpürmesi) tamamen tamamlandı, commit edildi ve push edildi. Onaylı planlar: `C:\Users\oguz\.claude\plans\text-microvend-logical-tarjan.md` (A0–A11), `C:\Users\oguz\.claude\plans\microvend-i-in-gm-gelir-kind-sutherland.md` (GM gelir modeli). Sıradaki aşama: **A9**.

## Son tamamlanan iş: A8 kapanışı — genel cila süpürmesi
Gelir modeli dilimi ve genel cila turu push edildi. `ApplyPage`, `AboutPage`, `NotFoundPage`, `CategoriesPage`, `SellerDetailPage` (aksiyon şeridi dışındaki bölümler) tasarım sistemine (`bg-paper`/`text-ink`/`text-muted`/`text-clay`, `font-display`, `rounded-sm`/`rounded-md`, `Button` bileşeni) geçirildi. Eski görünür "Satıcı" terminolojisi kullanıcıya görünen tüm metinlerden temizlendi (veri katmanındaki `satici` değişken adı ve dondurulmuş `/saticilar/:slug` URL'si kasıtlı olarak korundu). Eski mavi hex'ler, `rounded-[2rem]`/`rounded-[2.5rem]` gibi büyük radiuslar ve `.card-soft` sıfıra indi; `.card-soft` tanımı `index.css`'ten silindi.

## Değiştirilen temel dosyalar
- `src/pages/ApplyPage.tsx`, `src/pages/AboutPage.tsx`, `src/pages/NotFoundPage.tsx`, `src/pages/CategoriesPage.tsx`, `src/pages/SellerDetailPage.tsx`
- `src/index.css` (`.card-soft` silindi)

## Doğrulanan testler
`tsc --noEmit`, `eslint .`, `npm run build`, `git diff --check` temiz. Grep: eski hex'ler/`rounded-[2*`/`card-soft`/görünür "satıcı" 0 sonuç. Tarayıcıda `/basvuru`, `/kategoriler`, `/saticilar/luna-atolye` 1280px ve 375px'de doğrulandı; mobilde hamburger menüye düzgün geçiyor, konsol temiz, A7 favori/paylaş aksiyonlarında regresyon yok.

## Sıradaki görev
**A9 — Supabase başvuruları** (bkz. CLAUDE.md B.6): anon için yalnızca insert, sütun bazlı `GRANT INSERT`, `CHECK` kısıtları, sunucu kontrollü `status`, honeypot + genel pilottan önce Turnstile/Edge Function/rate-limit'ten biri.

## Bilinen açık riskler
- Backend, auth, ödeme, abonelik ve gerçek kota mantığı henüz yok — Free/Pro sınırlamaları, deneme süresi ve istatistikler yalnızca ürün açıklaması olarak gösteriliyor (en erken A10+ ile gerçek yetkilendirme).
- Sponsorlu Vitrin fiyatı trafik verisi oluşana kadar açıklanmayacak.
- Ekran görüntüsü aracı bu ortamda tutarlı çalışmıyor; görsel doğrulamalar DOM ölçümü/erişilebilirlik ağacı ile yapıldı.
