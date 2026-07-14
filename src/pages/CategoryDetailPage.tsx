import { useParams } from "react-router-dom";
import DirectoryResults from "../components/directory/DirectoryResults";
import SellerImage from "../components/SellerImage";
import Button from "../components/ui/Button";
import { categories } from "../data/mockData";
import usePageTitle from "../hooks/usePageTitle";

function CategoryDetailPage() {
  const { slug } = useParams();
  const kategori = categories.find((item) => item.slug === slug);

  usePageTitle(
    kategori
      ? `${kategori.name} | Microvend`
      : "Kategori bulunamadı | Microvend"
  );

  if (!kategori) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="mb-4 font-display text-3xl text-ink">
          Kategori bulunamadı
        </h1>

        <p className="mb-8 leading-7 text-muted">
          Aradığın kategori kaldırılmış veya adresi değişmiş olabilir. Tüm
          kategorilere göz atabilir ya da keşfet sayfasından aramaya devam
          edebilirsin.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button to="/kategoriler" variant="secondary">
            Tüm kategoriler
          </Button>
          <Button to="/kesfet">Keşfete git</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="mb-12 grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-clay">
            Kategori
          </p>

          <h1 className="mb-6 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            {kategori.name}
          </h1>

          <p className="text-lg leading-8 text-muted">{kategori.description}</p>

          <p className="mt-4 text-sm text-muted">
            {kategori.sellerCount} işletme listede
          </p>
        </div>

        <SellerImage
          src={kategori.image}
          alt={`${kategori.name} kategorisinden bir görsel`}
          label={kategori.name}
          loading="eager"
          className="aspect-[16/10] w-full rounded-sm border border-ink/10"
        />
      </div>

      <DirectoryResults lockedCategoryId={kategori.id} />
    </div>
  );
}

export default CategoryDetailPage;
