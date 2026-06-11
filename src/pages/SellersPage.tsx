import { Link } from "react-router-dom";
import { kategoriler, saticilar } from "../data/mockData";

function SellersPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#4e7bab]">
          Satıcılar
        </p>

        <h1 className="mb-6 text-5xl font-light tracking-tight">
          Bağımsız satıcıları keşfedin.
        </h1>

        <p className="text-lg font-light leading-8 text-gray-600">
          Microvend üzerindeki küçük işletmeleri, butik markaları ve bağımsız
          üreticileri kategori, şehir ve ürün alanlarına göre inceleyin.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="card-soft h-fit rounded-[2rem] bg-white p-6">
          <h2 className="mb-5 text-lg font-light">Filtreler</h2>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-light text-gray-700">
              Arama
            </label>

            <input
              type="text"
              placeholder="Satıcı veya ürün ara"
              className="w-full rounded-2xl border border-[#dbe7f2] px-4 py-3 font-light outline-none focus:border-[#4e7bab]"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-light text-gray-700">
              Kategori
            </label>

            <select className="w-full rounded-2xl border border-[#dbe7f2] px-4 py-3 font-light outline-none focus:border-[#4e7bab]">
              <option>Tüm kategoriler</option>
              {kategoriler.map((kategori) => (
                <option key={kategori}>{kategori}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-light text-gray-700">
              Şehir
            </label>

            <select className="w-full rounded-2xl border border-[#dbe7f2] px-4 py-3 font-light outline-none focus:border-[#4e7bab]">
              <option>Tüm şehirler</option>
              <option>İstanbul</option>
              <option>Ankara</option>
              <option>İzmir</option>
              <option>Muğla</option>
              <option>Eskişehir</option>
            </select>
          </div>
        </aside>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <p className="font-light text-gray-600">
              {saticilar.length} satıcı listeleniyor
            </p>

            <select className="rounded-2xl border border-[#dbe7f2] bg-white px-4 py-3 text-sm font-light outline-none">
              <option>Önerilen sıralama</option>
              <option>En yeni</option>
              <option>Alfabetik</option>
            </select>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {saticilar.map((satici) => (
              <div
                key={satici.isim}
                className="card-soft rounded-[2rem] bg-white p-7 transition hover:-translate-y-1 hover:border-[#a5bed6]"
              >
                <div className="mb-5 flex items-start gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-[#edf3fa]" />

                  <div>
                    <p className="mb-1 text-sm text-[#4e7bab]">
                      {satici.kategori}
                    </p>

                    <h2 className="text-2xl font-light text-gray-900">
                      {satici.isim}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {satici.sehir}
                    </p>
                  </div>
                </div>

                <p className="mb-5 font-light leading-7 text-gray-600">
                  {satici.aciklama}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {satici.etiketler.map((etiket) => (
                    <span
                      key={etiket}
                      className="rounded-full bg-[#edf3fa] px-3 py-1 text-sm text-[#4e7bab]"
                    >
                      {etiket}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/saticilar/${satici.slug}`}
                  className="block rounded-xl border border-[#dbe7f2] px-5 py-3 text-center text-sm text-[#4e7bab] transition hover:bg-[#edf3fa]"
                >
                  Profili İncele
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default SellersPage;