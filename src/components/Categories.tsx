import { Link } from "react-router-dom";
import type { Category } from "../data/mockData";
import SellerImage from "./SellerImage";

type CategoriesProps = {
  categories: Category[];
};

function Categories({ categories }: CategoriesProps) {
  const gorunurKategoriler = categories.filter(
    (kategori) => kategori.sellerCount > 0
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
          Kategorilerde keşfet
        </h2>

        <Link
          to="/kategoriler"
          className="text-sm text-brand transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Tüm kategorileri gör
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {gorunurKategoriler.map((kategori) => (
          <Link
            key={kategori.id}
            to={`/kategoriler/${kategori.slug}`}
            className="group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <SellerImage
              src={kategori.image}
              alt={`${kategori.name} kategorisinden bir görsel`}
              label={kategori.name}
              className="aspect-square w-full rounded-sm border border-ink/10 transition-colors group-hover:border-ink/30"
            />

            <p className="mt-3 text-sm text-ink transition-colors group-hover:text-brand">
              {kategori.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;
