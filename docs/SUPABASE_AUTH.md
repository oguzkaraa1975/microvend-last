# Supabase Auth — Manuel Yapılandırma (A10)

Kod tarafı `src/auth/` + `supabase/migrations/0002_favorites.sql` ile gelir; aşağıdaki
adımlar Supabase panelinden **elle** yapılır. Yeni env değişkeni yoktur — mevcut
`VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` yeterlidir.

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

- **Özel SMTP:** Supabase'in yerleşik SMTP'si saatte birkaç e-postayla sınırlıdır ve
  üretim için değildir. Pilot açılmadan önce özel SMTP (ör. Resend/Postmark) bağlanmalı.
- **Auth CAPTCHA (Turnstile):** Authentication → Attack Protection altından Turnstile
  etkinleştirilmeli (üye ol / giriş / şifre sıfırlama uçları için). Anonim başvuru
  formunun Turnstile + sunucu tarafı rate-limit kapısı da ayrıca açık durumda.
- Auth uçlarındaki oran sınırlama şimdilik GoTrue yerleşik varsayılanlarıdır.
