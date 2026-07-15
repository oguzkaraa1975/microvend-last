import SellerImage from "../SellerImage";
import Button from "../ui/Button";
import { collections } from "../../data/mockData";
import { resolveCollectionSellers } from "../../data/collections";

function WeeklyPick() {
  // Sabit id yok: her zaman publishedAt'e göre en yeni seçki.
  const secki = [...collections].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)
  )[0];

  if (!secki) {
    return null;
  }

  const isletmeler = resolveCollectionSellers(secki.sellerIds);

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
      <div className="grid overflow-hidden rounded-sm border border-ink/10 lg:grid-cols-[1fr_1.25fr]">
        <div className="flex flex-col justify-center gap-4 p-8 lg:p-10">
          <p className="text-sm font-medium uppercase tracking-widest text-clay">
            Bu haftanın seçkisi
          </p>

          {secki.sponsored && (
            <span className="inline-flex w-fit items-center rounded-sm border border-clay/50 px-2 py-1 text-xs font-medium uppercase tracking-widest text-clay">
              Sponsorlu
            </span>
          )}

          <h2 className="font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
            {secki.title}
          </h2>

          <p className="leading-8 text-muted">{secki.description}</p>

          <p className="text-sm text-muted">{isletmeler.length} işletme</p>

          {secki.sponsored && (
            <p className="text-sm leading-6 text-clay">
              Bu içerik sponsorlu tanıtım alanıdır; editoryal seçim değildir.
            </p>
          )}

          <Button to={`/seckiler/${secki.slug}`} className="mt-2 w-fit">
            Seçkiyi incele
          </Button>
        </div>

        <SellerImage
          src={secki.coverImage}
          alt={`${secki.title} seçkisinin kapak görseli`}
          label={secki.title}
          className="aspect-[16/10] w-full lg:aspect-auto lg:h-full"
        />
      </div>
    </section>
  );
}

export default WeeklyPick;
