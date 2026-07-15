import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SellerImage from "../SellerImage";
import { featuredStory, sellers } from "../../data/mockData";

function ProducerStory() {
  const isletme = sellers.find(
    (seller) => seller.id === featuredStory.sellerId
  );

  // Hikâyenin bağlı olduğu işletme veride yoksa bölüm hiç render edilmez
  // (kırık bağlantı veya çökme oluşmaz).
  if (!isletme) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <SellerImage
          src={featuredStory.image}
          alt={`${isletme.name} atölyesinden bir görsel`}
          label={isletme.name}
          className="aspect-[4/3] w-full rounded-sm border border-ink/10"
        />

        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-clay">
            Üreticinin hikâyesi
          </p>

          <h2 className="font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
            {featuredStory.title}
          </h2>

          <p className="mt-5 leading-8 text-muted">{featuredStory.excerpt}</p>

          {featuredStory.quote && (
            <blockquote className="mt-6 border-l-2 border-clay/40 pl-4 font-display text-lg italic leading-8 text-ink">
              {featuredStory.quote}
            </blockquote>
          )}

          <Link
            to={`/saticilar/${isletme.slug}`}
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-brand transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Hikâyesini oku
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProducerStory;
