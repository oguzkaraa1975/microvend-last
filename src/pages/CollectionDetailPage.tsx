import { Link, useParams } from "react-router-dom";
import BusinessCard from "../components/directory/BusinessCard";
import SellerImage from "../components/SellerImage";
import Button from "../components/ui/Button";
import { collections } from "../data/mockData";
import { resolveCollectionSellers } from "../data/collections";
import usePageTitle from "../hooks/usePageTitle";

function CollectionDetailPage() {
  const { slug } = useParams();
  const secki = collections.find((item) => item.slug === slug);

  usePageTitle(
    secki ? `${secki.title} | Microvend` : "Seçki bulunamadı | Microvend",
    secki
      ? `${secki.title} seçkisindeki işletmeleri keşfet.`
      : "Aradığınız seçki bulunamadı."
  );

  if (!secki) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="mb-4 font-display text-3xl text-ink">
          Seçki bulunamadı
        </h1>

        <p className="mb-8 leading-7 text-muted">
          Aradığın seçki kaldırılmış veya adresi değişmiş olabilir. Tüm
          seçkilere göz atabilir ya da keşfet sayfasından işletmeleri
          inceleyebilirsin.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button to="/seckiler" variant="secondary">
            Tüm seçkiler
          </Button>
          <Button to="/kesfet">Keşfete git</Button>
        </div>
      </div>
    );
  }

  const isletmeler = resolveCollectionSellers(secki.sellerIds);
  const yayinTarihi = new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(secki.publishedAt));

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <Link
        to="/seckiler"
        className="mb-10 inline-block text-sm text-muted transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        ← Tüm seçkilere dön
      </Link>

      <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <span
            className={`mb-4 inline-flex w-fit items-center rounded-sm border px-2 py-1 text-xs font-medium uppercase tracking-widest ${
              secki.sponsored
                ? "border-clay/50 text-clay"
                : "border-ink/15 text-muted"
            }`}
          >
            {secki.sponsored ? "Sponsorlu" : "Microvend Seçkisi"}
          </span>

          <h1 className="mb-5 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            {secki.title}
          </h1>

          <p className="text-lg leading-8 text-muted">{secki.description}</p>

          <p className="mt-4 text-sm text-muted">{yayinTarihi} · {isletmeler.length} işletme</p>
        </div>

        <SellerImage
          src={secki.coverImage}
          alt={`${secki.title} kapak görseli`}
          label={secki.title}
          loading="eager"
          className="aspect-[16/10] w-full rounded-sm border border-ink/10"
        />
      </div>

      <div className="mt-12 max-w-3xl border-t border-ink/10 pt-10">
        {secki.sponsored && (
          <p className="mb-6 rounded-sm border border-clay/40 px-4 py-3 text-sm leading-6 text-clay">
            Bu içerik sponsorlu tanıtım alanıdır; editoryal seçim değildir.
          </p>
        )}

        <p className="text-lg leading-8 text-muted">{secki.intro}</p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isletmeler.map((isletme) => (
          <BusinessCard key={isletme.id} seller={isletme} />
        ))}
      </div>

      <div className="mt-14 flex flex-wrap gap-3 border-t border-ink/10 pt-10">
        <Button to="/seckiler" variant="secondary">
          Tüm seçkilere dön
        </Button>
        <Button to="/kesfet">Tüm işletmeleri keşfet</Button>
      </div>
    </div>
  );
}

export default CollectionDetailPage;
