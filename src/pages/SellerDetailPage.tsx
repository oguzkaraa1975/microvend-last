import { Link, useParams } from "react-router-dom";
import { saticilar } from "../data/mockData";

function SellerDetailPage() {
  const { slug } = useParams();

  const satici = saticilar.find((item) => item.slug === slug);

  if (!satici) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24">
        <h1 className="mb-4 text-4xl font-light text-gray-900">
          Satıcı bulunamadı.
        </h1>

        <Link
          to="/saticilar"
          className="text-[#4e7bab] transition hover:text-[#6b91b9]"
        >
          ← Satıcılara dön
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <Link
        to="/saticilar"
        className="mb-10 inline-block text-sm text-[#4e7bab] transition hover:text-[#6b91b9]"
      >
        ← Satıcılara dön
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT */}
        <div>
          <div className="mb-8 h-80 rounded-[2.5rem] bg-gradient-to-br from-[#edf3fa] to-[#dbe7f2]" />

          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#4e7bab]">
            {satici.kategori}
          </p>

          <h1 className="mb-6 text-6xl font-light tracking-tight text-gray-900">
            {satici.isim}
          </h1>

          <p className="mb-8 text-lg font-light leading-9 text-gray-600">
            {satici.aciklama}
          </p>

          <div className="flex flex-wrap gap-2">
            {satici.etiketler.map((etiket) => (
              <span
                key={etiket}
                className="rounded-full bg-[#edf3fa] px-4 py-2 text-sm text-[#4e7bab]"
              >
                {etiket}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <aside className="card-soft h-fit rounded-[2rem] bg-white p-8">
          <h2 className="mb-6 text-2xl font-light text-gray-900">
            Satıcı Bilgileri
          </h2>

          <div className="space-y-5 text-sm">
            <div>
              <p className="mb-1 text-gray-400">Şehir</p>

              <p className="text-gray-700">{satici.sehir}</p>
            </div>

            <div>
              <p className="mb-1 text-gray-400">Kategori</p>

              <p className="text-gray-700">{satici.kategori}</p>
            </div>

            <div>
              <p className="mb-1 text-gray-400">Platform Modeli</p>

              <p className="text-gray-700">
                Komisyonsuz yönlendirme sistemi
              </p>
            </div>
          </div>

          <button className="mt-8 w-full rounded-2xl bg-[#4e7bab] px-6 py-4 text-white transition hover:bg-[#6b91b9]">
            Satıcının Kanalına Git
          </button>
        </aside>
      </div>
    </div>
  );
}

export default SellerDetailPage;