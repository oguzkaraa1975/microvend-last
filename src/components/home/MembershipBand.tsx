import { Heart } from "lucide-react";
import Button from "../ui/Button";

function MembershipBand() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-6">
      <div className="flex flex-col gap-5 rounded-sm border border-ink/15 bg-paper px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <Heart
            size={20}
            aria-hidden="true"
            className="mt-1 shrink-0 text-clay"
          />

          <div>
            <h2 className="font-display text-xl text-ink">
              Beğendiğin işletmeleri kaybetme.
            </h2>

            <p className="mt-1 text-sm leading-6 text-muted">
              Favorilerine ekle ve dilediğin zaman yeniden bul.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <Button to="/uye-ol" size="sm">
            Ücretsiz Üye Ol
          </Button>
        </div>
      </div>
    </section>
  );
}

export default MembershipBand;
