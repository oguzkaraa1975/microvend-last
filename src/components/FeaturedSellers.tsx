import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import SellerImage from "./SellerImage";
import type { Seller } from "../data/mockData";

type FeaturedSellersProps = {
  sellers: Seller[];
};

function FeaturedSellers({ sellers }: FeaturedSellersProps) {
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
        {sellers
          .filter((seller) => seller.featured)
          .map((seller) => (
            <div
              key={seller.id}
              className="card-soft overflow-hidden rounded-[2rem] bg-white transition hover:-translate-y-1 hover:border-[#a5bed6]"
            >
              <SellerImage
                src={seller.coverImage}
                alt={`${seller.name} kapak görseli`}
                label={seller.name}
                className="h-48"
              />

              <div className="p-7">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-sm text-[#4e7bab]">
                      {seller.categoryName}
                    </p>

                    <h3 className="text-2xl font-light text-gray-900">
                      {seller.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {seller.city}
                    </p>
                  </div>

                  <SellerImage
                    src={seller.logoImage}
                    alt={`${seller.name} logo`}
                    label={seller.name}
                    variant="logo"
                    className="h-12 w-12 shrink-0 rounded-2xl border border-[#eef3f8]"
                  />
                </div>

                <p className="mb-6 font-light leading-7 text-gray-600">
                  {seller.shortDescription}
                </p>

                <div className="mb-7 flex flex-wrap gap-2">
                  {seller.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#edf3fa] px-3 py-1 text-sm text-[#4e7bab]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/saticilar/${seller.slug}`}
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
