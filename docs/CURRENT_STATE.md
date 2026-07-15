# Microvend — Güncel Durum

## Proje durumu
Editoryal rehber pivotu uygulanıyor (bkz. CLAUDE.md). Aşamalar A0→A7, GM plan turu, A8 (GM gelir modeli dilimi + genel görsel/terminoloji cila süpürmesi) ve A9 (Supabase başvuruları) tamamen tamamlandı, commit edildi ve push edildi. Onaylı planlar: `C:\Users\oguz\.claude\plans\text-microvend-logical-tarjan.md` (A0–A11), `C:\Users\oguz\.claude\plans\microvend-i-in-gm-gelir-kind-sutherland.md` (GM gelir modeli). Sıradaki aşama: **A10 — kullanıcı auth ve favoriler**.

## Son tamamlanan iş: A9 — Supabase başvuruları
Supabase projesi kuruldu, `applications` migration'ı (`supabase/migrations/0001_applications.sql`) uygulandı. `/basvuru` artık gerçek insert yapıyor; kayıtlar `pending` statüsüyle oluşuyor. Entegrasyon testleriyle doğrulandı:
- Anon SELECT erişimi reddedildi (HTTP 401, `42501 permission denied`).
- CHECK sınırını aşan geçersiz insert reddedildi (`23514 check constraint violation`).
- Honeypot dolu gönderimde Supabase'e hiç istek gitmedi, kayıt oluşmadı.
- `.env` Git tarafından izlenmiyor (`.gitignore`'da, yalnızca `.env.example` istisna).

**Açık kalan üretim kapısı:** Turnstile + sunucu tarafı rate-limit eklenmeden anonim başvuru formu genel üretime açılmaz (honeypot tek başına yeterli değil).

## Değiştirilen temel dosyalar
- `src/pages/ApplyPage.tsx` (gerçek insert + honeypot)
- `src/lib/supabase.ts` (istemci, env eksikse `null`)
- `supabase/migrations/0001_applications.sql`
- `.gitignore`, `.env.example`, `CLAUDE.md`, bu dosya

## Doğrulanan testler
`tsc --noEmit`, `eslint .`, `npm run build`, `npm audit` (0 zafiyet), `git diff --check` temiz. Canlı Supabase projesine karşı: gerçek insert, anon SELECT reddi, CHECK ihlali reddi, honeypot no-op'u ve `.env` git-ignore durumu doğrulandı.

## Sıradaki görev
**A10 — Supabase auth + favoriler**: `/giris`, `/uye-ol`, `/favoriler` placeholder'larının gerçek sayfalarla değiştirilmesi; `favorites` tablosu ve RLS (bkz. CLAUDE.md B.6).

## Bilinen açık riskler
- **Üretim kapısı (bağlayıcı):** Turnstile + sunucu tarafı rate-limit eklenmeden anonim başvuru formu genel üretime açılmaz (A9'daki honeypot tek başına yeterli değil).
- Backend, auth, ödeme, abonelik ve gerçek kota mantığı henüz yok — Free/Pro sınırlamaları, deneme süresi ve istatistikler yalnızca ürün açıklaması olarak gösteriliyor (en erken A10+ ile gerçek yetkilendirme).
- Sponsorlu Vitrin fiyatı trafik verisi oluşana kadar açıklanmayacak.
- Ekran görüntüsü aracı bu ortamda tutarlı çalışmıyor; görsel doğrulamalar DOM ölçümü/erişilebilirlik ağacı ile yapıldı.
