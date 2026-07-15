# Microvend — Güncel Durum

## Proje durumu
Editoryal rehber pivotu uygulanıyor (bkz. CLAUDE.md). Aşamalar A0→A7, GM plan turu ve A8 GM gelir modeli dilimi tamamlandı, commit edildi ve push edildi. Onaylı planlar: `C:\Users\oguz\.claude\plans\text-microvend-logical-tarjan.md` (A0–A11), `C:\Users\oguz\.claude\plans\microvend-i-in-gm-gelir-kind-sutherland.md` (GM gelir modeli).

## Son tamamlanan iş: A8 GM dilimi — Free/Pro Ücretlendirme Modeli
Free/Pro modeli ile Sponsorlu Vitrin kararları kesinleşti. `/ucretlendirme` sayfası yeni tasarım sistemiyle yeniden yapıldı: eski Gümüş/Altın/Premium paketleri ve görünürlük-satan vaatler silindi; Free (kalıcı ücretsiz: logo+kapak kota dışı, 1 galeri görseli, 1 seçilmiş satış kanalı, eşit organik görünürlük) ve Pro (₺899/ay veya ₺8.990/yıl: 12 görsel, çoklu kanal, profil içi vitrin, genişletilmiş hikâye, öncelikli destek, istatistikler "yakında") karşılaştırması, 30 gün ücretsiz deneme koşulları (kart bilgisi yok, otomatik yenileme yok, deneme sonunda Free'ye dönüş), Sponsorlu Vitrin bölümü (ayrı ürün, fiyat "yakında açıklanacak", CTA → `/iletisim`) ve birebir tahsilat açıklaması eklendi. Free/Pro CTA'ları → `/basvuru`. `planType` artık `free | pro` (s1–s3 `pro` test verisi, kalan 9 `free`).

## Değiştirilen temel dosyalar
- `src/components/Pricing.tsx` (tam yeniden yazım)
- `src/pages/PricingPage.tsx` (sarmalayıcı sadeleştirildi)
- `src/data/mockData.ts` (`planType` migrasyonu)
- `CLAUDE.md` (onaylı fiyatlar, tahsilat metni, A7+GM+A8-GM senkronizasyonu)

## Doğrulanan testler
`tsc --noEmit`, `eslint .`, `npm run build`, `git diff --check` temiz; `planType` bağlamında `silver|gold|premium` grep'i 0 sonuç. Tarayıcıda: tüm onaylı metinler (fiyatlar, deneme koşulları, "yakında" istatistik, Sponsorlu Vitrin fiyatsız, tahsilat metni birebir), CTA href'leri (`/basvuru` ×2, `/iletisim`), tek `h1`, 1280px'de iki sütun / 375px'de alt alta ve taşma yok, konsol temiz.

## Sıradaki görev
**A8 kalan iş — genel görsel ve terminoloji cila süpürmesi** (sert kapı): eski hex'ler, `rounded-[2*`, `.card-soft`, UI'daki "satıcı" sıfıra iner. Kapsam: About, Apply, 404, `/kategoriler` kopyası ve `SellerDetailPage`'in aksiyon şeridi dışındaki bölümleri.

## Bilinen açık riskler
- Backend, auth, ödeme, abonelik ve gerçek kota mantığı henüz yok — Free/Pro sınırlamaları, deneme süresi ve istatistikler yalnızca ürün açıklaması olarak gösteriliyor (en erken A10+ ile gerçek yetkilendirme).
- Sponsorlu Vitrin fiyatı trafik verisi oluşana kadar açıklanmayacak.
- Ekran görüntüsü aracı bu ortamda tutarlı çalışmıyor; görsel doğrulamalar DOM ölçümü/computed style ile yapıldı.
- Eski mavi stil hâlâ şurada duruyor: About, Apply, 404, `/kategoriler` kopyası ve `SellerDetailPage`'in aksiyon dışı bölümleri — A8 kalan süpürmede temizlenecek.
