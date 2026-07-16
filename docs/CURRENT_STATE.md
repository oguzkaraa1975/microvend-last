# Microvend — Güncel Durum

## Proje durumu
Editoryal rehber pivotu uygulanıyor (bkz. CLAUDE.md). Aşamalar A0→A10 tamamen tamamlandı; A10 canlı doğrulamadan geçti ve kapandı (2026-07-16). **A11 Slice 1 (fontlar + SEO metadata) uygulandı ama A11'in tamamı henüz kapanmadı** — aşağıda özet. Onaylı planlar: `text-microvend-logical-tarjan.md` (A0–A11), `microvend-i-in-gm-gelir-kind-sutherland.md` (GM), `microvend-de-a9-tamamland-ve-snappy-plum.md` (A10).

## Son iş: A11 Slice 1 — fontlar ve SEO metadata (devam ediyor, 2026-07-16)
- Fontlar self-host edildi: `public/fonts/` altında 6 WOFF2 dosyası (Newsreader 400 roman + italic, Manrope 400/500 — aynı variable dosya `font-weight: 400 500` ile iki ağırlığı da kapsıyor), her biri `latin` + `latin-ext` alt kümesiyle (Google'ın kendi `unicode-range` değerleri kullanılarak) Türkçe karakterler (ğ, ş, ı, İ, ç, ö, ü) doğru render ediliyor. `src/index.css`'e `@font-face` kuralları eklendi, `index.html`'den Google Fonts linkleri kaldırıldı. Lisans dosyaları `docs/licenses/` altında. Yeni npm bağımlılığı yok.
- `usePageTitle` artık opsiyonel ikinci parametre olarak açıklama alıyor, `<meta name="description">` rotaya göre güncelleniyor (tek `useEffect`, `[title, description]` bağımlılığı). 17 sayfanın hepsine gerçek açıklama eklendi.
- `public/robots.txt` eklendi (Sitemap satırı yok — gerçek domain gelene kadar ertelendi). `docs/SEO_ROUTES.md` eklendi: statik+dinamik rota envanteri, ileride sitemap için hazır.
- Tüm `collections[].sponsored` artık `false` (`dogadan-gelenler` test verisi `true`'dan çevrildi, artık geçersiz olan yorum silindi).
- Doğrulama: `tsc --noEmit`, `eslint`, `npm run build`, `git diff --check` temiz. Canlı dev-server kontrolleri: 6 font `/fonts/*.woff2`'den yükleniyor (fonts.googleapis.com/fonts.gstatic.com'a hiç istek yok), `document.fonts.check()` 4 yüz için Türkçe karakter kapsamını doğruluyor, rotaya göre başlık/açıklama güncelleniyor, `/saticilar?<query>` → `/kesfet?<query>` sorgu korunarak yönleniyor, `/robots.txt` doğru içerikle serviliyor, `/seckiler`'daki üç seçki de artık "Sponsorlu" etiketi olmadan "Microvend Seçkisi" gösteriyor.
- Görsel/alt-text/broken-image denetimi yapıldı, kod değişikliği gerekmedi: tüm görseller zaten `SellerImage` üzerinden geçiyor, bileşende zorunlu `alt` ve `onError` fallback zaten mevcuttu.

## Önceki iş: A10 — Supabase Auth + favoriler (kapandı)
- `supabase/migrations/0002_favorites.sql`: `favorites` tablosu — `user_id uuid default auth.uid()` (istemci göndermez, sütun grant edilmez), `seller_id text`, PK `(user_id, seller_id)`. RLS select/insert/delete yalnız `authenticated`, `(select auth.uid()) = user_id`; **UPDATE policy/grant yok, anon'a sıfır yetki**.
- `src/auth/AuthContext.ts` + `src/auth/AuthProvider.tsx`: plain React context; `onAuthStateChange` callback'i tamamen senkron (içinde await/Supabase çağrısı yok), INITIAL_SESSION dahil işlenir, cleanup'ta unsubscribe.
- Gerçek sayfalar: `LoginPage` (`?dogrulandi=1` / `?sifre-guncellendi=1` mesajları; `state.from` yalnız güvenli uygulama içi path ise kullanılır; oturum varsa form yerine "oturumun açık" paneli), `SignUpPage` (min 8 şifre, `emailRedirectTo` → `/giris?dogrulandi=1`, tek tip başarı mesajı), `PasswordResetPage` (istek formu + `?mode=update` recovery görünümü; güncelleme sonrası signOut → `/giris?sifre-guncellendi=1`), `FavoritesPage` (girişsiz: giriş çağrısı; girişli: loading/hata+tekrar dene/boş/grid). `AuthPlaceholderPage` silindi.
- `hooks/useFavorite`: `setFavorite(desiredState)` (toggle değil), işlem sürerken buton kilitli, `23505` duplicate insert "zaten favoride" olarak reconcile edilir, upsert/UPDATE kullanılmaz.
- `Header`: girişliyken hesap menüsü (Favorilerim + Çıkış Yap, Escape/dış tık kapatma); auth yüklenirken hiçbir varyant render edilmez (flash yok). `SellerDetailPage`: girişliyken gerçek favori toggle'ı, girişsizken `FavoriteDialog` (dönüş yolu `state.from` ile taşınır). `ui/Button`'a `state` prop'u eklendi.
- Hata mesajları Türkçe ve genel; hiçbir mesaj bir e-postanın sistemde kayıtlı olup olmadığını açığa çıkarmaz.
- Manuel Supabase panel adımları: `docs/SUPABASE_AUTH.md`.

## Doğrulanan testler
`tsc --noEmit`, `eslint .`, `npm run build` temiz. 375px + 1280px DOM kontrolleri: giriş/üye ol/şifre sıfırlama/favoriler sayfaları, boş form hata mesajı (`role="alert"`), `?mode=update` recovery'siz "bağlantı geçersiz" durumu, `?sifre-guncellendi=1` durum mesajı, girişsiz favori butonunun dialog açması, mobil menü girişsiz durumu, yatay taşma yok, konsol hatasız. Panel probu: e-posta sağlayıcı açık + **Confirm email AÇIK** (`/auth/v1/settings`, `mailer_autoconfirm:false`), signup açık, min şifre uzunluğu 8, redirect allowlist doğru.

Canlı Auth/favoriler testleri (iki Dashboard'da Auto Confirm ile oluşturulan test hesabıyla, `favorites` tablosu canlıda uygulandıktan sonra): anon SELECT/INSERT/DELETE reddi, authenticated INSERT sütun yetkileri, iki kullanıcıyla giriş, session refresh, signOut→yeniden giriş, favori ekleme, duplicate insert → `23505` (zaten favoride olarak reconcile), favori listeleme, iki kullanıcı arası RLS izolasyonu (user2, user1'in satırını göremiyor), başka kullanıcıya ait `user_id` ile insert reddi (`42501`, sütun grant'ı RLS'e ulaşmadan reddediyor), favori silme + doğrulama — hepsi geçti. Password recovery uçtan uca canlı test edildi: `resetPasswordForEmail` isteği → kullanıcı `?mode=update` ile yeni şifreyi girdi → uygulama signOut yaptı → `/giris?sifre-guncellendi=1`'e yönlendirdi → yeni şifreyle giriş başarılı.

## Bilinen açık riskler
- **A11 açık kalanlar:** Üretim domaini yok → `<link rel="canonical">` ve `sitemap.xml` eklenemedi. `/iletisim` için gerçek iletişim bilgisi yok → sayfa mevcut dürüst "yakında" metniyle değişmeden bırakıldı. Görsel yerelleştirme/optimizasyon henüz yapılmadı (Unsplash placeholder'lar duruyor).
- **Üretim kapıları (bağlayıcı, A10 kapanışından bağımsız):** Anonim başvuru formu için Turnstile + sunucu tarafı rate-limit (A9'dan beri açık). Auth uçları için public pilot öncesi özel SMTP + Auth CAPTCHA (Turnstile) — bkz. `docs/SUPABASE_AUTH.md`.
- Free/Pro kota-deneme-istatistik mantığı hâlâ yalnız ürün açıklaması; işletme hesabı/panel yok.
- Sponsorlu Vitrin fiyatı trafik verisi oluşana kadar açıklanmayacak.
- Ekran görüntüsü aracı bu ortamda tutarlı çalışmıyor; görsel doğrulamalar DOM ölçümü/erişilebilirlik ağacı ile yapıldı.

## Sıradaki görev
**A11'in kalanı:** görsel yerelleştirme/optimizasyon, `<link rel="canonical">` + `sitemap.xml` (üretim domaini gerekiyor), `/iletisim`'e gerçek iletişim bilgisi, işletme/seçki detay sayfaları için OG etiketleri. (Fontlar ve rota bazlı SEO metadata Slice 1'de tamamlandı — yukarıya bkz.) Public pilot öncesi ayrıca özel SMTP + Auth CAPTCHA (Turnstile) yapılandırması gerekiyor (A10'dan bağımsız, bkz. B.7).
