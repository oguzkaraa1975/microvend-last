import { Link } from "react-router-dom";
import { categories } from "../data/mockData";
import usePageTitle from "../hooks/usePageTitle";

function CategoriesPage() {
  usePageTitle("Kategoriler | Microvend");

  const gorunurKategoriler = categories.filter(
    (kategori) => kategori.sellerCount > 0
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-clay">
          Kategoriler
        </p>

        <h1 className="mb-6 font-display text-5xl tracking-tight text-ink">
          Mikro işletme kategorilerini keşfedin.
        </h1>

        <p className="text-lg leading-8 text-muted">
          Microvend, küçük işletmeleri kategori bazlı görünür hale getirir.
          Ziyaretçiler ilgilendikleri alandaki bağımsız işletmelere hızlıca
          ulaşabilir.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {gorunurKategoriler.map((category) => (
          <Link
            key={category.id}
            to={`/kategoriler/${category.slug}`}
            className="group rounded-sm border border-ink/10 bg-white p-7 transition hover:border-brand"
          >
            <div className="mb-6 h-16 w-16 rounded-sm bg-paper" />

            <h2 className="mb-3 font-display text-2xl text-ink">
              {category.name}
            </h2>

            <p className="mb-6 leading-7 text-muted">
              {category.description}
            </p>

            <div className="flex items-center justify-between border-t border-ink/10 pt-5">
              <span className="text-sm text-muted">
                {category.sellerCount} işletme
              </span>

              <span className="rounded-sm border border-ink/20 px-4 py-2 text-sm transition group-hover:bg-ink/5">
                İncele
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
