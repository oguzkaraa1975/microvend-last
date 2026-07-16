# Supabase Auth — Manuel Yapılandırma (A10 + pilot güvenlik kapıları)

Kod tarafı `src/auth/` + `supabase/migrations/0002_favorites.sql` ile gelir; aşağıdaki
adımlar Supabase panelinden **elle** yapılır. A10 için yeni env değişkeni yoktur —
mevcut `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` yeterlidir. Pilot
güvenlik kapıları (SMTP + Turnstile) için `VITE_TURNSTILE_SITE_KEY` eklendi, bkz.
bölüm 4.

## 1. Migration

`supabase/migrations/0002_favorites.sql` dosyasını SQL Editor'de (veya CLI ile) çalıştır.
Tablo: `public.favorites` — yalnız `authenticated`, satır sahipliği RLS, UPDATE yüzeyi yok.

## 2. Authentication → Sign In / Up

- **Email provider: açık.**
- **Confirm email: AÇIK** (doğrulanmamış adresle giriş yapılamaz).
- **Minimum password length: 8.**

## 3. Authentication → URL Configuration

Geliştirme için:

- **Site URL:** `http://localhost:5173`
- **Redirect URLs** allowlist'ine ekle:
  - `http://localhost:5173/giris` (üyelik doğrulama dönüşü, `?dogrulandi=1` ile)
  - `http://localhost:5173/sifre-sifirlama` (recovery dönüşü, `?mode=update` ile)

Kodun kullandığı dönüş adresleri (bilgi için):

- `signUp` → `{origin}/giris?dogrulandi=1`
- `resetPasswordForEmail` → `{origin}/sifre-sifirlama?mode=update`

Üretim domain'i A11'de aynı listeye eklenecek.

## 4. Public pilot öncesi zorunlu (bağlayıcı, bkz. CLAUDE.md B.7)

**Durum: kod tarafı hazır, panel kurulumu ve canlı test henüz yapılmadı — bu kapı
kapanmış sayılmaz.**

- **Özel SMTP (Resend) — bloklu, üretim domaini bekleniyor:** Supabase'in yerleşik
  SMTP'si saatte birkaç e-postayla sınırlıdır ve üretim için değildir. Sağlayıcı
  olarak Resend kararlaştırıldı, ancak Resend'de gönderen domain doğrulaması
  (SPF/DKIM/DMARC) gerçek bir domain gerektirir; Microvend'in henüz bir üretim
  domaini yok. Bu yüzden Resend hesabı/domain kurulumu **şimdilik yapılmıyor** —
  sahte veya geçici domain/gönderen adresi eklenmeyecek. Domain netleşince:
  Resend'de domain doğrula → Authentication → Settings → SMTP Settings'e bağla.
  Kod tarafında hiçbir değişiklik gerekmez.
- **Auth CAPTCHA (Turnstile) — kod tarafı uygulandı:** `src/components/auth/TurnstileWidget.tsx`
  (npm paketi yok, Cloudflare'in `api.js` script'i runtime'da yüklenir) `LoginPage`,
  `SignUpPage` ve `PasswordResetPage`'in bağlantı isteği formunda (`baglantiIste`,
  şifre güncelleme formu değil) render edilir; `VITE_TURNSTILE_SITE_KEY` env
  değişkeni tanımlıysa widget görünür ve `captchaToken` olmadan gönderim
  engellenir, tanımlı değilse widget hiç render edilmez ve formlar captcha
  istemeden çalışmaya devam eder (mevcut davranış korunur). Panelde
  **Authentication → Attack Protection → Turnstile henüz açılmadı** — açılana ve
  site+secret key panelde girilene kadar bu kapı kapanmaz. Anonim başvuru formunun
  Turnstile + sunucu tarafı rate-limit kapısı (Edge Function gerektirir) ayrı bir
  sonraki turda ele alınacak, henüz açık.
- Auth uçlarındaki oran sınırlama şimdilik GoTrue yerleşik varsayılanlarıdır.

### Panelde yapılacaklar (kullanıcı tarafı, kod bunları değiştirmez)

1. **Bloklu — üretim domaini netleşince:** Resend'de domaini doğrula (SPF/DKIM/DMARC)
   → Supabase Authentication → Settings → SMTP Settings'e bağla.
2. Cloudflare Turnstile'da site oluştur, site key + secret key al.
3. Supabase Authentication → Attack Protection → Turnstile'ı aç, secret key'i gir.
4. `.env`'e `VITE_TURNSTILE_SITE_KEY` olarak site key'i ekle (secret key asla
   frontend'e veya repoya girmez).
5. Giriş / üye ol / şifre sıfırlama uçlarını canlıda test et, bu bölümdeki durumu
   güncelle.
