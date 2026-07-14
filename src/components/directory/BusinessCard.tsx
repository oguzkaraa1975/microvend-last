import { Link } from "react-router-dom";
import type { Seller } from "../../data/mockData";
import SellerImage from "../SellerImage";

type BusinessCardProps = {
  seller: Seller;
};

function BusinessCard({ seller }: BusinessCardProps) {
  return (
    <Link
      to={`/saticilar/${seller.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-ink/10 transition-colors hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <SellerImage
        src={seller.coverImage}
        alt={`${seller.name} kapak görseli`}
        label={seller.name}
        className="aspect-[4/3] w-full"
      />

      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <p className="text-xs font-medium uppercase tracking-widest text-clay">
          {seller.categoryName}
        </p>

        <h3 className="font-display text-xl text-ink transition-colors group-hover:text-brand">
          {seller.name}
        </h3>

        <p className="text-sm text-muted">{seller.city}</p>

        <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted">
          {seller.shortDescription}
        </p>
      </div>
    </Link>
  );
}

export default BusinessCard;
