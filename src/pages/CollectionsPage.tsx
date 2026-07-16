import { Link } from "react-router-dom";
import SellerImage from "../components/SellerImage";
import { collections } from "../data/mockData";
import { resolveCollectionSellers } from "../data/collections";
import usePageTitle from "../hooks/usePageTitle";

function CollectionsPage() {
  usePageTitle(
    "Seçkiler | Microvend",
    "Editoryal seçkilerle bağımsız üreticileri ve mikro işletmeleri keşfetmenin yeni bir yolu — Microvend Seçkiler."
  );

  const siraliSeckiler = [...collections].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-clay">
          Seçkiler
        </p>

        <h1 className="mb-6 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Temalı işletme seçkileri.
        </h1>

        <p className="text-lg leading-8 text-muted">
          Microvend editoryal ekibinin belirli bir tema etrafında bir araya
          getirdiği bağımsız işletme listeleri. Seçkiler yeni keşif yolları
          sunar; bir işletmenin platformda yer almasının koşulu değildir.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {siraliSeckiler.map((secki) => {
          const isletmeler = resolveCollectionSellers(secki.sellerIds);

          return (
            <Link
              key={secki.id}
              to={`/seckiler/${secki.slug}`}
              className="group flex flex-col overflow-hidden rounded-sm border border-ink/10 transition-colors hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <SellerImage
                src={secki.coverImage}
                alt={`${secki.title} kapak görseli`}
                label={secki.title}
                className="aspect-[16/9] w-full"
              />

              <div className="flex flex-1 flex-col gap-3 p-6">
                <span
                  className={`inline-flex w-fit items-center rounded-sm border px-2 py-1 text-xs font-medium uppercase tracking-widest ${
                    secki.sponsored
                      ? "border-clay/50 text-clay"
                      : "border-ink/15 text-muted"
                  }`}
                >
                  {secki.sponsored ? "Sponsorlu" : "Microvend Seçkisi"}
                </span>

                <h2 className="font-display text-2xl text-ink transition-colors group-hover:text-brand">
                  {secki.title}
                </h2>

                <p className="leading-7 text-muted">{secki.description}</p>

                <p className="mt-auto pt-2 text-sm text-muted">
                  {isletmeler.length} işletme
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default CollectionsPage;
