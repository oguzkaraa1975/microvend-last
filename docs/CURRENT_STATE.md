# Microvend — Güncel Durum

## Proje durumu
Editoryal rehber pivotu uygulanıyor (bkz. CLAUDE.md). Aşamalar A0→A7 tamamlandı, commit edildi ve push edildi. Onaylı plan: `C:\Users\oguz\.claude\plans\text-microvend-logical-tarjan.md`.

## Son tamamlanan iş: A7 — İşletme Profili Aksiyonları
`SellerDetailPage.tsx` üzerindeki eski üç eşit-ağırlıklı link satırı (Instagram/WhatsApp/Web Sitesi) kaldırılıp yerine tek bir aksiyon şeridi getirildi: birincil harici aksiyon (`websiteUrl` → `instagramUrl` → `whatsappUrl` önceliğiyle, etiket gerçek hedefe göre değişir), Favorilere Ekle (gerçek favori kaydı yok — yalnızca üyeliğe yönlendiren `FavoriteDialog` açar) ve Paylaş (`navigator.share`, desteklenmiyorsa clipboard fallback + geçici geri bildirim). Sayfanın geri kalanı (hero, hikaye, galeri, CTA bandı) kapsam dışı bırakıldı, eski tasarım stiliyle kaldı.

## Değiştirilen temel dosyalar
- `src/pages/SellerDetailPage.tsx` (aksiyon şeridi yenilendi)
- Yeni: `src/components/seller/FavoriteDialog.tsx`

## Doğrulanan testler
`tsc --noEmit`, `eslint .`, `npm run build`, `git diff --check` temiz. Tarayıcıda: website mevcut işletmede doğru buton etiketi ve URL, `target="_blank"`/`rel="noopener noreferrer"`, favori dialogunun hiçbir favori kaydetmemesi, `/uye-ol`/`/giris` yönlendirmeleri, Escape/arka plan tıklaması/kapatma butonu ile kapanma, kapanışta odağın tetikleyici butona dönmesi, paylaşımda clipboard hata/başarı geri bildirimi, 320px/1280px'de taşma olmaması, konsolda hata olmaması doğrulandı. Instagram/WhatsApp-only fallback etiketleri mock veride her işletmenin `websiteUrl`'e sahip olması nedeniyle yalnızca kod incelemesiyle doğrulanabildi, canlı DOM'da gözlemlenemedi.

## Sıradaki görev
**GM — Gelir modeli geçiş plan turu** (plan-only, A8 öncesi zorunlu): ücretsiz temel + tek Pro üyelik için ücretlendirme sayfası tasarımı (varsayılan fiyat yok), `planType` → `"free" | "pro"` geçiş kararı, "Sponsorlu" tanıtım-yerleşimi taslağı. Tanıtım araçlarının inşası A0–A11 kapsamı dışında.

## Bilinen açık riskler
- Ekran görüntüsü aracı bu ortamda tutarlı çalışmıyor; görsel doğrulamalar DOM ölçümü/computed style ve konsol/network incelemesiyle yapıldı, piksel karşılaştırma yapılmadı.
- Eski mavi stil hâlâ şurada duruyor: Pricing, About, Apply, 404 sayfaları, `/kategoriler` kopyası ve `SellerDetailPage`'in hero/hikaye/galeri/CTA bölümleri — A8 kapı aşamasında temizlenecek.
- Instagram/WhatsApp-only birincil aksiyon fallback'i mock veri kısıtı nedeniyle yalnızca kod incelemesiyle doğrulandı.
