# Microvend — Güncel Durum

## Proje durumu
Editoryal rehber pivotu uygulanıyor (bkz. CLAUDE.md). Aşamalar A0→A6 tamamlandı, henüz commit edilmedi. Onaylı plan: `C:\Users\oguz\.claude\plans\text-microvend-logical-tarjan.md`.

## Son tamamlanan iş: A6 — Ana Sayfa Yeniden Yapımı
Ana sayfa eski mavi SaaS görünümünden çıkarılıp 8 bölümlü rehber modeline geçirildi: arama odaklı hero → kategorilerde keşfet → yeni katılan işletmeler → üyelik bandı → haftanın seçkisi → ihtiyaca göre keşfet → üreticinin hikâyesi → işletme katılım CTA'sı. `odak` URL parametresi filtre değil, odak-ipucu olarak yeniden tanımlandı (kullanıldıktan sonra `replace` ile temizleniyor).

## Değiştirilen temel dosyalar
- `src/pages/HomePage.tsx`, `src/components/Hero.tsx`, `Categories.tsx`, `CTA.tsx`
- Yeni: `src/components/home/{NewBusinesses,MembershipBand,WeeklyPick,NeedsGrid,ProducerStory}.tsx`
- Silindi: `HowItWorks.tsx`, `FeaturedSellers.tsx`
- `src/components/directory/{BusinessCard,DirectoryResults}.tsx` (badge prop, focusTarget)
- `src/components/ui/Button.tsx` (`inverted` varyantı)
- `src/pages/DiscoverPage.tsx`, `index.html` (meta/OG rehber konumlandırması)
- `CLAUDE.md` (A6 done olarak senkronize edildi)

## Doğrulanan testler
`tsc --noEmit`, `eslint .`, `npm run build` temiz. Tarayıcıda: bölüm sırası, tek H1, hero arama (q/şehir/ikisi/boş/Enter), 6 kategori rotası, en yeni 4 işletme, üyelik bandı 2 rota, haftanın seçkisi (en yeni `publishedAt`), 4 ihtiyaç yolu sonuç veriyor, `odak=sehir` select'e odaklanıp param temizleniyor, üretici hikâyesi doğru işletmeye gidiyor, CTA `/basvuru`'ya gidiyor, 13/13 görsel yükleniyor, 0 eksik alt metin, CLS 0.0000, 375/768/1024/1280/1440 taşma yok, focus-visible 24/24, konsol temiz, "satıcı" kelimesi yok. `git diff --check` temiz.

## Sıradaki görev
**A7 — İşletme profili aksiyonları**: Favorilere Ekle (auth dialog), Paylaş (Web Share + fallback), Mağazayı Ziyaret Et.

## Bilinen açık riskler
- Değişiklikler henüz commit edilmedi — çalışma alanı temiz değil.
- Ekran görüntüsü aracı bu ortamda tutarlı çalışmıyor; görsel doğrulamalar DOM ölçümü/computed style ile yapıldı, piksel karşılaştırma yapılmadı.
- Eski mavi stil hâlâ şurada duruyor: Pricing, About, Apply, 404 sayfaları ve `/kategoriler` kopyası — A8 kapı aşamasında temizlenecek.
- Enter ile form submit otomasyon ortamında sentetik olarak tetiklenmiyor (tarayıcı sürücüsü sınırı); yapısal olarak spec-uyumlu, gerçek tarayıcıda çalışması bekleniyor ama bu oturumda gerçek klavye ile doğrulanamadı.
