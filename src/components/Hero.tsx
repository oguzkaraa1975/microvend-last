import { Link } from "react-router-dom";
import { sellers } from "../data/mockData";

function Hero() {
  const featuredSeller = sellers.find((seller) => seller.featured) ?? sellers[0];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#dfeaf5,transparent_35%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-28 lg:grid-cols-2 lg:items-center">
        {/* LEFT */}
        <div>
          <p className="mb-6 text-sm uppercase tracking-[0.25em] text-[#4e7bab]">
            Komisyonsuz Dijital Vitrin Platformu
          </p>

          <h1 className="mb-8 text-6xl font-light leading-tight tracking-tight text-gray-900 lg:text-7xl">
            Mikro işletmeleri görünür hale getirin.
          </h1>

          <p className="mb-10 max-w-2xl text-lg font-light leading-9 text-gray-600">
            Microvend; bağımsız üreticileri, butik markaları ve küçük
            işletmeleri modern bir dijital vitrin yapısıyla kullanıcılarla
            buluşturur.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/saticilar"
              className="inline-block rounded-2xl bg-[#4e7bab] px-7 py-4 text-sm text-white shadow-[0_10px_30px_rgba(78,123,171,0.20)] transition hover:bg-[#6b91b9]"
            >
              Satıcıları Keşfet
            </Link>

            <Link
              to="/basvuru"
              className="inline-block rounded-2xl border border-[#dbe7f2] bg-white px-7 py-4 text-sm text-[#4e7bab] transition hover:bg-[#edf3fa]"
            >
              Satıcı Başvurusu
            </Link>
          </div>

          <div className="mt-14 flex items-center gap-10 text-sm text-gray-500">
            <div>
              <p className="text-3xl font-light text-gray-900">500+</p>
              <p>Bağımsız Satıcı</p>
            </div>

            <div>
              <p className="text-3xl font-light text-gray-900">20+</p>
              <p>Kategori</p>
            </div>

            <div>
              <p className="text-3xl font-light text-gray-900">%0</p>
              <p>Komisyon</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="card-soft rounded-[2rem] bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Öne Çıkan Satıcı</p>

                <h3 className="mt-1 text-2xl font-light">
                  {featuredSeller.name}
                </h3>
              </div>

              <div className="rounded-2xl bg-[#edf3fa] px-4 py-2 text-sm text-[#4e7bab]">
                {featuredSeller.categoryName}
              </div>
            </div>

            <div className="mb-6 h-64 rounded-[1.5rem] bg-gradient-to-br from-[#edf3fa] to-[#dbe7f2]" />

            <p className="mb-6 leading-7 text-gray-600">
              {featuredSeller.shortDescription}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {featuredSeller.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#edf3fa] px-3 py-1 text-sm text-[#4e7bab]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to={`/saticilar/${featuredSeller.slug}`}
                className="inline-block rounded-xl border border-[#dbe7f2] px-4 py-2 text-sm text-[#4e7bab] transition hover:bg-[#edf3fa]"
              >
                İncele
              </Link>
            </div>
          </div>

          {/* FLOATING CARD */}
          <div className="card-soft absolute -bottom-10 -left-10 hidden rounded-3xl bg-white p-5 lg:block">
            <p className="mb-2 text-sm text-gray-500">
              Bu ay platforma katılan
            </p>

            <p className="text-4xl font-light text-gray-900">+128</p>

            <p className="mt-2 text-sm text-[#4e7bab]">
              Yeni mikro işletme
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
