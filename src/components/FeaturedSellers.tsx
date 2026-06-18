import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import SellerImage from "./SellerImage";

type Seller = {
  isim: string;
  slug: string;
  kategori: string;
  sehir: string;
  aciklama: string;
  etiketler: string[];
  kapakGorseli: string;
  logo: string;
};

type FeaturedSellersProps = {
  saticilar: Seller[];
};

function FeaturedSellers({ saticilar }: FeaturedSellersProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          label="Öne Çıkan Satıcılar"
          title="Kendi alanında seçilmiş mikro markalar."
        />

        <Link
          to="/saticilar"
          className="pb-2 text-sm text-[#4e7bab] transition hover:text-[#6b91b9]"
        >
          Tüm satıcıları gör
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {saticilar.slice(0, 3).map((satici) => (
          <div
            key={satici.isim}
            className="card-soft overflow-hidden rounded-[2rem] bg-white transition hover:-translate-y-1 hover:border-[#a5bed6]"
          >
            <SellerImage
              src={satici.kapakGorseli}
              alt={`${satici.isim} kapak görseli`}
              label={satici.isim}
              className="h-48"
            />

            <div className="p-7">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-sm text-[#4e7bab]">
                    {satici.kategori}
                  </p>

                  <h3 className="text-2xl font-light text-gray-900">
                    {satici.isim}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {satici.sehir}
                  </p>
                </div>

                <SellerImage
                  src={satici.logo}
                  alt={`${satici.isim} logo`}
                  label={satici.isim}
                  variant="logo"
                  className="h-12 w-12 shrink-0 rounded-2xl border border-[#eef3f8]"
                />
              </div>

              <p className="mb-6 font-light leading-7 text-gray-600">
                {satici.aciklama}
              </p>

              <div className="mb-7 flex flex-wrap gap-2">
                {satici.etiketler.slice(0, 3).map((etiket) => (
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
                className="block w-full rounded-xl border border-[#dbe7f2] px-5 py-3 text-center text-sm text-[#4e7bab] transition hover:bg-[#edf3fa]"
              >
                Profili İncele
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedSellers;
