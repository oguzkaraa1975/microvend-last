import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

function AboutPage() {
  usePageTitle("Hakkımızda | Microvend");

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <div className="mb-16 max-w-3xl">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#4e7bab]">
          Hakkımızda
        </p>

        <h1 className="mb-6 text-3xl font-light tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          Küçük işletmeler için sade bir dijital vitrin.
        </h1>

        <p className="text-lg font-light leading-8 text-gray-600">
          Microvend, mikro ve küçük işletmelerin markalarını, ürünlerini ve
          iletişim kanallarını tek bir sade profilde sergilemesini sağlayan
          komisyonsuz bir keşif platformudur.
        </p>
      </div>

      <div className="max-w-3xl space-y-12">
        <section>
          <h2 className="mb-4 text-2xl font-light text-gray-900">
            Microvend nedir?
          </h2>

          <p className="font-light leading-8 text-gray-600">
            Kendi web sitesi olmayan ya da Instagram'da dağınık görünen küçük
            markaların dijitalde güvenilir ve profesyonel bir yüz edinmesi için
            kurulmuş bir vitrin katmanıdır. Microvend bir pazaryeri değildir;
            işletme ile müşterisi arasına girmez, görünürlük ve yönlendirme
            sağlar.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-light text-gray-900">
            Kimler için?
          </h2>

          <p className="font-light leading-8 text-gray-600">
            Butik markalar, el yapımı ürün üreticileri, yerel gıda üreticileri,
            ev üretimi yapan satıcılar ve Instagram üzerinden satış yapan küçük
            işletmeler için tasarlandı. Teknik bilgi gerektirmez; profiller
            başvuru sonrası editör incelemesiyle yayına alınır.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-light text-gray-900">
            Nasıl çalışır?
          </h2>

          <p className="font-light leading-8 text-gray-600">
            Ziyaretçiler kategorilere göre bağımsız satıcıları keşfeder,
            profillerini inceler ve WhatsApp, Instagram ya da web sitesi
            üzerinden işletmeyle doğrudan iletişime geçer. Satış, ödeme ve
            teslimat tamamen işletmenin kendi kanalında gerçekleşir.
          </p>
        </section>

        <section className="rounded-[2rem] bg-[#edf3fa] p-6 md:p-8">
          <h2 className="mb-4 text-2xl font-light text-gray-900">
            Neyi yapmaz?
          </h2>

          <p className="mb-5 font-light leading-8 text-gray-600">
            Microvend'i tanımlayan, yapmadıklarıdır:
          </p>

          <ul className="space-y-3 font-light text-gray-600">
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4e7bab]" />
              Satış ve ödeme almaz.
            </li>

            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4e7bab]" />
              Sipariş, kargo veya iade süreci yürütmez.
            </li>

            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4e7bab]" />
              Komisyon kesmez.
            </li>

            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4e7bab]" />
              Satıcı ile müşteri arasındaki iletişime aracılık etmez.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-light text-gray-900">
            Pilot dönem yaklaşımı
          </h2>

          <p className="mb-6 font-light leading-8 text-gray-600">
            Microvend şu anda pilot aşamasındadır. Başvurular editör
            incelemesiyle değerlendirilir ve platform satıcı geri
            bildirimleriyle şekillendirilir. Başvurular açıktır.
          </p>

          <Link
            to="/basvuru"
            className="inline-block rounded-2xl bg-[#4e7bab] px-7 py-4 text-sm text-white transition hover:bg-[#6b91b9]"
          >
            Satıcı Başvurusu
          </Link>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;
