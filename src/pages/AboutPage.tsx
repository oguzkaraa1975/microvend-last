import Button from "../components/ui/Button";
import usePageTitle from "../hooks/usePageTitle";

function AboutPage() {
  usePageTitle(
    "Hakkımızda | Microvend",
    "Microvend'in misyonunu ve mikro işletmeler için erişilebilir görünürlük yaklaşımını öğren."
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <div className="mb-16 max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-clay">
          Hakkımızda
        </p>

        <h1 className="mb-6 font-display text-3xl tracking-tight text-ink sm:text-4xl md:text-5xl">
          Küçük işletmeler için sade bir dijital vitrin.
        </h1>

        <p className="text-lg leading-8 text-muted">
          Microvend, mikro ve küçük işletmelerin markalarını, ürünlerini ve
          iletişim kanallarını tek bir sade profilde sergilemesini sağlayan
          komisyonsuz bir keşif platformudur.
        </p>
      </div>

      <div className="max-w-3xl space-y-12">
        <section>
          <h2 className="mb-4 font-display text-2xl text-ink">
            Microvend nedir?
          </h2>

          <p className="leading-8 text-muted">
            Kendi web sitesi olmayan ya da Instagram'da dağınık görünen küçük
            markaların dijitalde güvenilir ve profesyonel bir yüz edinmesi için
            kurulmuş bir vitrin katmanıdır. Microvend bir pazaryeri değildir;
            işletme ile müşterisi arasına girmez, görünürlük ve yönlendirme
            sağlar.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl text-ink">
            Kimler için?
          </h2>

          <p className="leading-8 text-muted">
            Butik markalar, el yapımı ürün üreticileri, yerel gıda üreticileri,
            ev üretimi yapan işletmeler ve Instagram üzerinden satış yapan
            küçük işletmeler için tasarlandı. Teknik bilgi gerektirmez;
            profiller başvuru sonrası editör incelemesiyle yayına alınır.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl text-ink">
            Nasıl çalışır?
          </h2>

          <p className="leading-8 text-muted">
            Ziyaretçiler kategorilere göre bağımsız işletmeleri keşfeder,
            profillerini inceler ve WhatsApp, Instagram ya da web sitesi
            üzerinden işletmeyle doğrudan iletişime geçer. Satış, ödeme ve
            teslimat tamamen işletmenin kendi kanalında gerçekleşir.
          </p>
        </section>

        <section className="rounded-sm bg-ink/5 p-6 md:p-8">
          <h2 className="mb-4 font-display text-2xl text-ink">
            Neyi yapmaz?
          </h2>

          <p className="mb-5 leading-8 text-muted">
            Microvend'i tanımlayan, yapmadıklarıdır:
          </p>

          <ul className="space-y-3 text-muted">
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              Satış ve ödeme almaz.
            </li>

            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              Sipariş, kargo veya iade süreci yürütmez.
            </li>

            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              Komisyon kesmez.
            </li>

            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              İşletme ile müşteri arasındaki iletişime aracılık etmez.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl text-ink">
            Pilot dönem yaklaşımı
          </h2>

          <p className="mb-6 leading-8 text-muted">
            Microvend şu anda pilot aşamasındadır. Başvurular editör
            incelemesiyle değerlendirilir ve platform işletme geri
            bildirimleriyle şekillendirilir. Başvurular açıktır.
          </p>

          <Button to="/basvuru">İşletme Başvurusu</Button>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;
