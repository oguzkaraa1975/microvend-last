import SectionHeading from "./SectionHeading";

type CategoriesProps = {
  kategoriler: string[];
};

function Categories({ kategoriler }: CategoriesProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          label="Kategoriler"
          title="Bağımsız satıcıları kategori bazında keşfedin."
        />

        <a
          href="/kategoriler"
          className="pb-2 text-sm text-[#4e7bab] transition hover:text-[#6b91b9]"
        >
          Tüm kategorileri gör
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {kategoriler.map((kategori) => (
          <div
            key={kategori}
            className="card-soft group rounded-[2rem] bg-white p-7 transition hover:-translate-y-1 hover:border-[#a5bed6]"
          >
            <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf3fa] text-[#4e7bab] transition group-hover:bg-[#dbe7f2]">
              <div className="h-5 w-5 rounded-full bg-[#4e7bab]" />
            </div>

            <h3 className="mb-4 text-2xl font-light text-gray-900">
              {kategori}
            </h3>

            <p className="mb-7 font-light leading-7 text-gray-600">
              {kategori} alanındaki butik markaları, bağımsız üreticileri ve
              mikro ölçekli işletmeleri keşfedin.
            </p>

            <div className="border-t border-[#eef3f8] pt-5">
              <span className="text-sm text-[#4e7bab]">Kategoriye git →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;