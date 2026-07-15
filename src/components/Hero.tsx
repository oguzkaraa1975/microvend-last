import { useMemo } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search } from "lucide-react";
import SellerImage from "./SellerImage";
import Button from "./ui/Button";
import { featuredStory, sellers } from "../data/mockData";
import { resolveCollectionSellers } from "../data/collections";

// Mozaikteki küçük görseller mevcut (doğrulanmış) işletme kapak görsellerinden
// gelir; büyük görsel featuredStory'den. Yeni haricî görsel URL'si eklenmez.
const mozaikIdleri = ["s5", "s8", "s9"];

function Hero() {
  const navigate = useNavigate();

  const sehirSecenekleri = useMemo(
    () =>
      [...new Set(sellers.map((isletme) => isletme.city))].sort((a, b) =>
        a.localeCompare(b, "tr")
      ),
    []
  );

  const mozaikIsletmeleri = useMemo(
    () => resolveCollectionSellers(mozaikIdleri),
    []
  );

  const gonder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const veri = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    const q = String(veri.get("q") ?? "").trim();
    const sehir = String(veri.get("sehir") ?? "");

    if (q) {
      params.set("q", q);
    }
    if (sehir) {
      params.set("sehir", sehir);
    }

    const sorgu = params.toString();
    navigate(sorgu ? `/kesfet?${sorgu}` : "/kesfet");
  };

  return (
    <section className="border-b border-ink/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-14 lg:py-16">
        <div>
          <p className="mb-5 text-sm font-medium uppercase tracking-widest text-clay">
            Bağımsız üreticiler, tek bir rehberde
          </p>

          <h1 className="font-display text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Aradığın küçük işletmeyi kolayca bul.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-muted">
            Sosyal medyanın kalabalığında kaybolan bağımsız üreticileri keşfet.
          </p>

          <form
            onSubmit={gonder}
            className="mt-8 flex flex-col gap-2 rounded-sm border border-ink/15 bg-paper p-2 sm:flex-row sm:items-center"
          >
            <div className="flex flex-1 items-center gap-2 px-2">
              <Search
                size={18}
                aria-hidden="true"
                className="shrink-0 text-muted"
              />
              <input
                id="hero-arama"
                name="q"
                type="text"
                placeholder="Ürün, işletme veya kategori ara"
                className="w-full bg-transparent py-2 text-sm text-ink outline-none placeholder:text-muted"
              />
            </div>

            <div className="flex items-center gap-2 border-t border-ink/10 px-2 pt-2 sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0">
              <MapPin
                size={18}
                aria-hidden="true"
                className="shrink-0 text-muted"
              />
              <select
                name="sehir"
                aria-label="Şehir"
                className="w-full bg-transparent py-2 text-sm text-ink outline-none sm:w-auto"
              >
                <option value="">Tüm Türkiye</option>
                {sehirSecenekleri.map((sehir) => (
                  <option key={sehir} value={sehir}>
                    {sehir}
                  </option>
                ))}
              </select>
            </div>

            <Button type="submit" className="sm:shrink-0">
              Keşfet
            </Button>
          </form>
        </div>

        <div className="grid h-[320px] grid-cols-3 grid-rows-3 gap-3 sm:h-[420px] lg:h-[480px]">
          <div className="col-span-2 row-span-3">
            <SellerImage
              src={featuredStory.image}
              alt="Atölyesinde çalışan bir üretici"
              label="Üretici atölyesi"
              loading="eager"
              className="h-full w-full rounded-sm border border-ink/10"
            />
          </div>

          {mozaikIsletmeleri.map((isletme) => (
            <SellerImage
              key={isletme.id}
              src={isletme.coverImage}
              alt={`${isletme.name} işletmesinden bir görsel`}
              label={isletme.name}
              className="h-full w-full rounded-sm border border-ink/10"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
