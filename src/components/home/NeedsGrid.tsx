import { Link } from "react-router-dom";
import { ArrowRight, Gift, Leaf, MapPin, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Yol = {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
};

const aramaYolu = (q: string) => `/kesfet?${new URLSearchParams({ q })}`;

const yollar: Yol[] = [
  {
    icon: Gift,
    title: "Özgün bir hediye",
    description: "Sevdiklerin için anlamlı ve özel hediye fikirleri.",
    to: aramaYolu("hediye"),
  },
  {
    icon: MapPin,
    title: "Şehrindeki üreticiler",
    description: "Kendi şehrindeki üreticileri keşfet, yereli güçlendir.",
    to: "/kesfet?odak=sehir",
  },
  {
    icon: UserRound,
    title: "Kişiye özel",
    description: "İsme özel, sipariş üzerine hazırlanan ürünler bul.",
    to: aramaYolu("kişiye özel"),
  },
  {
    icon: Leaf,
    title: "Sürdürülebilir",
    description: "Doğaya duyarlı üreticilerden seçimler yap.",
    to: aramaYolu("sürdürülebilir"),
  },
];

function NeedsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
      <h2 className="mb-8 font-display text-3xl tracking-tight text-ink sm:text-4xl">
        İhtiyacına göre keşfet
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-ink/10">
        {yollar.map((yol) => {
          const Icon = yol.icon;

          return (
            <div
              key={yol.title}
              className="flex gap-4 lg:px-7 lg:first:pl-0 lg:last:pr-0"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink">
                <Icon size={18} aria-hidden="true" />
              </span>

              <div>
                <h3 className="text-base font-medium text-ink">{yol.title}</h3>

                <p className="mt-1 text-sm leading-6 text-muted">
                  {yol.description}
                </p>

                <Link
                  to={yol.to}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm text-brand transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  Keşfet
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default NeedsGrid;
