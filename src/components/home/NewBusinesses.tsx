import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BusinessCard from "../directory/BusinessCard";
import { getNewestSellers } from "../directory/newest";
import { sellers } from "../../data/mockData";

function NewBusinesses() {
  const yeniIsletmeler = getNewestSellers(sellers);

  if (yeniIsletmeler.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Yeni katılan işletmeler
          </h2>

          <p className="mt-2 text-muted">Yeni keşiflere yer açıyoruz.</p>
        </div>

        <Link
          to="/kesfet?yeni=1"
          className="inline-flex items-center gap-1.5 text-sm text-brand transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Tüm işletmeleri gör
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {yeniIsletmeler.map((isletme) => (
          <BusinessCard key={isletme.id} seller={isletme} badge="Yeni" />
        ))}
      </div>
    </section>
  );
}

export default NewBusinesses;
