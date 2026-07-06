import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SellerImage from "../components/SellerImage";
import { categories, sellers } from "../data/mockData";
import usePageTitle from "../hooks/usePageTitle";

function slugdanKategoriIsim(slug: string | null) {
  if (!slug) {
    return "";
  }

  return categories.find((kategori) => kategori.slug === slug)?.name ?? "";
}

function SellersPage() {
  usePageTitle("Satıcılar | Microvend");

  const [searchParams, setSearchParams] = useSearchParams();
  const [aramaMetni, setAramaMetni] = useState("");
  const [seciliSehir, setSeciliSehir] = useState("");
  const [siralama, setSiralama] = useState("onerilen");

  const seciliKategori = slugdanKategoriIsim(searchParams.get("category"));

  const sehirSecenekleri = useMemo(
    () => [...new Set(sellers.map((satici) => satici.city))].sort(),
    []
  );

  const filtrelenmisSaticilar = useMemo(() => {
    const arama = aramaMetni.trim().toLowerCase();

    const sonuc = sellers.filter((satici) => {
      const kategoriEslesir =
        !seciliKategori || satici.categoryName === seciliKategori;
      const sehirEslesir = !seciliSehir || satici.city === seciliSehir;

      if (!kategoriEslesir || !sehirEslesir) {
        return false;
      }

      if (!arama) {
        return true;
      }

      const isimEslesir = satici.name.toLowerCase().includes(arama);
      const aciklamaEslesir = satici.shortDescription
        .toLowerCase()
        .includes(arama);
      const etiketEslesir = satici.tags.some((etiket) =>
        etiket.toLowerCase().includes(arama)
      );

      return isimEslesir || aciklamaEslesir || etiketEslesir;
    });

    if (siralama === "alfabetik-az") {
      sonuc.sort((a, b) => a.name.localeCompare(b.name, "tr"));
    } else if (siralama === "alfabetik-za") {
      sonuc.sort((a, b) => b.name.localeCompare(a.name, "tr"));
    }

    return sonuc;
  }, [aramaMetni, seciliKategori, seciliSehir, siralama]);

  const handleKategoriChange = (kategoriIsim: string) => {
    if (kategoriIsim) {
      const kategori = categories.find((item) => item.name === kategoriIsim);

      if (kategori) {
        setSearchParams({ category: kategori.slug });
        return;
      }
    }

    setSearchParams({});
  };

  const filtreleriTemizle = () => {
    setAramaMetni("");
    setSeciliSehir("");
    setSearchParams({});
  };

  const aktifFiltreVar =
    aramaMetni.trim() !== "" || seciliKategori !== "" || seciliSehir !== "";

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
            <label
              htmlFor="satici-arama"
              className="mb-2 block text-sm font-light text-gray-700"
            >
              Arama
            </label>

            <input
              id="satici-arama"
              type="text"
              value={aramaMetni}
              onChange={(event) => setAramaMetni(event.target.value)}
              placeholder="Satıcı veya ürün ara"
              className="w-full rounded-2xl border border-[#dbe7f2] px-4 py-3 font-light outline-none focus:border-[#4e7bab]"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="satici-kategori"
              className="mb-2 block text-sm font-light text-gray-700"
            >
              Kategori
            </label>

            <select
              id="satici-kategori"
              value={seciliKategori}
              onChange={(event) => handleKategoriChange(event.target.value)}
              className="w-full rounded-2xl border border-[#dbe7f2] px-4 py-3 font-light outline-none focus:border-[#4e7bab]"
            >
              <option value="">Tüm kategoriler</option>
              {categories.map((kategori) => (
                <option key={kategori.slug} value={kategori.name}>
                  {kategori.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="satici-sehir"
              className="mb-2 block text-sm font-light text-gray-700"
            >
              Şehir
            </label>

            <select
              id="satici-sehir"
              value={seciliSehir}
              onChange={(event) => setSeciliSehir(event.target.value)}
              className="w-full rounded-2xl border border-[#dbe7f2] px-4 py-3 font-light outline-none focus:border-[#4e7bab]"
            >
              <option value="">Tüm şehirler</option>
              {sehirSecenekleri.map((sehir) => (
                <option key={sehir} value={sehir}>
                  {sehir}
                </option>
              ))}
            </select>
          </div>

          {aktifFiltreVar && (
            <button
              type="button"
              onClick={filtreleriTemizle}
              className="w-full rounded-xl border border-[#dbe7f2] px-5 py-3 text-sm text-[#4e7bab] transition hover:bg-[#edf3fa]"
            >
              Filtreleri temizle
            </button>
          )}
        </aside>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <p className="font-light text-gray-600">
              {filtrelenmisSaticilar.length} satıcı listeleniyor
            </p>

            <select
              aria-label="Sıralama"
              value={siralama}
              onChange={(event) => setSiralama(event.target.value)}
              className="rounded-2xl border border-[#dbe7f2] bg-white px-4 py-3 text-sm font-light outline-none"
            >
              <option value="onerilen">Önerilen sıralama</option>
              <option value="alfabetik-az">Alfabetik A-Z</option>
              <option value="alfabetik-za">Alfabetik Z-A</option>
            </select>
          </div>

          {filtrelenmisSaticilar.length === 0 ? (
            <div className="card-soft rounded-[2rem] bg-white px-8 py-16 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#edf3fa]">
                <span className="text-2xl text-[#4e7bab]">∅</span>
              </div>

              <h2 className="mb-3 text-2xl font-light text-gray-900">
                Eşleşen satıcı bulunamadı
              </h2>

              <p className="mx-auto mb-8 max-w-md font-light leading-7 text-gray-600">
                Arama metninizi veya filtre seçimlerinizi değiştirerek farklı
                satıcıları keşfedebilirsiniz.
              </p>

              <button
                type="button"
                onClick={filtreleriTemizle}
                className="rounded-xl border border-[#dbe7f2] px-5 py-3 text-sm text-[#4e7bab] transition hover:bg-[#edf3fa]"
              >
                Filtreleri temizle
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filtrelenmisSaticilar.map((satici) => (
                <div
                  key={satici.slug}
                  className="card-soft rounded-[2rem] bg-white p-7 transition hover:-translate-y-1 hover:border-[#a5bed6]"
                >
                  <div className="mb-5 flex items-start gap-4">
                    <SellerImage
                      src={satici.logoImage}
                      alt={`${satici.name} logo`}
                      label={satici.name}
                      variant="logo"
                      className="h-16 w-16 shrink-0 rounded-2xl border border-[#eef3f8]"
                    />

                    <div>
                      <p className="mb-1 text-sm text-[#4e7bab]">
                        {satici.categoryName}
                      </p>

                      <h2 className="text-2xl font-light text-gray-900">
                        {satici.name}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {satici.city}
                      </p>
                    </div>
                  </div>

                  <p className="mb-5 font-light leading-7 text-gray-600">
                    {satici.shortDescription}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {satici.tags.map((etiket) => (
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
          )}
        </section>
      </div>
    </div>
  );
}

export default SellersPage;
