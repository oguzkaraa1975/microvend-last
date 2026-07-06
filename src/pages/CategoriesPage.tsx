import { Link } from "react-router-dom";
import { categories } from "../data/mockData";

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#4e7bab]">
          Kategoriler
        </p>

        <h1 className="mb-6 text-5xl font-light tracking-tight">
          Mikro satıcı kategorilerini keşfedin.
        </h1>

        <p className="text-lg leading-8 text-gray-600">
          Microvend, küçük işletmeleri kategori bazlı görünür hale getirir.
          Ziyaretçiler ilgilendikleri alandaki bağımsız satıcılara hızlıca
          ulaşabilir.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/saticilar?category=${category.slug}`}
            className="group rounded-3xl border border-gray-200 bg-white p-7 transition hover:border-[#4e7bab]"
          >
            <div className="mb-6 h-16 w-16 rounded-2xl bg-[#edf3fa]" />

            <h2 className="mb-3 text-2xl font-light">{category.name}</h2>

            <p className="mb-6 leading-7 text-gray-600">
              {category.description}
            </p>

            <div className="flex items-center justify-between border-t border-gray-100 pt-5">
              <span className="text-sm text-gray-500">
                {category.sellerCount} satıcı
              </span>

              <span className="rounded-2xl border border-gray-300 px-4 py-2 text-sm transition group-hover:bg-gray-100">
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
