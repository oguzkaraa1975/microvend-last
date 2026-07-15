import { Check } from "lucide-react";
import Button from "./ui/Button";

const freeFeatures = [
  "Logo ve kapak görseli",
  "1 galeri görseli",
  "İşletmenin seçtiği 1 satış kanalı (web sitesi, Instagram, WhatsApp, Etsy, Shopier veya desteklenen başka bir kanal)",
  "Organik arama, kategori ve keşif görünürlüğü",
];

const proFeatures = [
  "Free planındaki her şey",
  "12 galeri görseli",
  "Çoklu satış kanalı",
  "Profil içi ürün/koleksiyon vitrini",
  "Genişletilmiş işletme hikâyesi",
  "Öncelikli profil güncelleme desteği",
];

const trialTerms = [
  "30 gün ücretsiz deneme",
  "Kart bilgisi istenmez",
  "Otomatik yenileme yapılmaz",
  "Deneme sonunda ödeme yapılmazsa profil Free planına döner",
  "Pro sona erdiğinde Free planında kalacak 1 galeri görselini ve 1 satış kanalını işletme seçer; içerik silinmez, Pro içerikleri pasif hâle gelir",
];

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-sm leading-6 text-ink">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <Check size={16} aria-hidden="true" className="mt-1 shrink-0 text-clay" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Pricing() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="mb-14 max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-clay">
          Ücretlendirme
        </p>

        <h1 className="font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
          Temel profil ücretsiz. Komisyon yok.
        </h1>

        <p className="mt-6 leading-8 text-muted">
          Microvend'de yer almak için ödeme yapman gerekmez. Daha geniş bir
          profil isteyen işletmeler için tek bir ücretli plan var: Pro. Free ve
          Pro organik sıralamada eşittir; Pro görünürlük veya sıralama avantajı
          sağlamaz, editoryal seçkiler ve güven etiketleri satılmaz.
        </p>
      </div>

      <div className="mb-14 grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col rounded-sm border border-ink/15 bg-paper p-8">
          <h2 className="font-display text-2xl text-ink">Free</h2>

          <p className="mt-2 text-sm text-muted">Kalıcı olarak ücretsiz.</p>

          <div className="mt-6 mb-8 flex items-baseline gap-2">
            <span className="font-display text-4xl text-ink">₺0</span>
            <span className="text-sm text-muted">/ ay</span>
          </div>

          <div className="grow">
            <FeatureList items={freeFeatures} />
          </div>

          <div className="mt-8">
            <Button to="/basvuru" variant="secondary" className="w-full sm:w-auto">
              İşletmeni Ücretsiz Ekle
            </Button>
          </div>
        </div>

        <div className="flex flex-col rounded-sm border border-brand bg-paper p-8">
          <h2 className="font-display text-2xl text-ink">Pro</h2>

          <p className="mt-2 text-sm text-muted">
            Daha geniş profil, tek ücretli plan.
          </p>

          <div className="mt-6 mb-2 flex items-baseline gap-2">
            <span className="font-display text-4xl text-ink">₺899</span>
            <span className="text-sm text-muted">/ ay</span>
          </div>

          <p className="mb-8 text-sm text-muted">
            veya ₺8.990 / yıl
          </p>

          <div className="grow">
            <FeatureList items={proFeatures} />

            <ul className="mt-3 space-y-3 text-sm leading-6 text-ink">
              <li className="flex items-start gap-3">
                <Check size={16} aria-hidden="true" className="mt-1 shrink-0 text-clay" />
                <span>
                  Profil istatistikleri{" "}
                  <span className="text-muted">(yakında)</span>
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <Button to="/basvuru" className="w-full sm:w-auto">
              Pro'yu 30 Gün Ücretsiz Dene
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-14 rounded-sm border border-ink/15 bg-paper p-8">
        <h2 className="font-display text-xl text-ink">Deneme ve plan koşulları</h2>

        <ul className="mt-5 space-y-3 text-sm leading-6 text-ink">
          {trialTerms.map((term) => (
            <li key={term} className="flex items-start gap-3">
              <Check size={16} aria-hidden="true" className="mt-1 shrink-0 text-clay" />
              <span>{term}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-14 rounded-sm border border-ink/15 bg-paper p-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h2 className="font-display text-xl text-ink">Sponsorlu Vitrin</h2>

          <span className="rounded-sm border border-ink/15 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-muted">
            Sponsorlu
          </span>
        </div>

        <p className="max-w-3xl text-sm leading-6 text-muted">
          Sponsorlu Vitrin, ana sayfada ayrı bir bölüm olarak yer alan isteğe
          bağlı bir tanıtım ürünüdür. Her zaman açıkça "Sponsorlu" olarak
          etiketlenir; editoryal seçkilerden ayrıdır ve organik sıralamayı
          hiçbir koşulda etkilemez. Fiyatlandırma yakında açıklanacak.
        </p>

        <div className="mt-6">
          <Button to="/iletisim" variant="secondary" size="sm">
            Bilgi İçin İletişime Geç
          </Button>
        </div>
      </div>

      <p className="max-w-3xl text-sm leading-6 text-muted">
        Microvend, işletmelerin müşterilerinden ödeme almasına aracılık etmez
        ve satış komisyonu kesmez. MVP'de Pro ve Sponsorlu Vitrin ücretleri
        platform dışında manuel olarak tahsil edilir.
      </p>
    </section>
  );
}

export default Pricing;
