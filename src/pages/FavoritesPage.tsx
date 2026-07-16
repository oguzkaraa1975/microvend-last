import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import FormMessage from "../components/ui/FormMessage";
import BusinessCard from "../components/directory/BusinessCard";
import { sellers, type Seller } from "../data/mockData";
import { supabase } from "../lib/supabase";
import { useAuth } from "../auth/AuthContext";
import usePageTitle from "../hooks/usePageTitle";

// Sonuç, sorgu kimliğiyle (userId + deneme) saklanır; yükleniyor durumu
// render'da türetilir — effect gövdesinde senkron setState yok.
type ListeSonucu = {
  userId: string;
  deneme: number;
  durum: "hazir" | "hata";
  favoriler: Seller[];
};

function FavoritesPage() {
  usePageTitle(
    "Favorilerim | Microvend",
    "Favorilerine eklediğin mikro işletmeleri tek yerden gör ve yönet."
  );

  const { user, loading: authLoading } = useAuth();

  const [sonuc, setSonuc] = useState<ListeSonucu | null>(null);
  const [denemeSayaci, setDenemeSayaci] = useState(0);

  const userId = user?.id ?? "";

  const guncel =
    sonuc && sonuc.userId === userId && sonuc.deneme === denemeSayaci
      ? sonuc
      : null;

  const yukleniyor = Boolean(supabase && userId && !guncel);

  useEffect(() => {
    if (!supabase || !userId) return;

    let iptal = false;

    supabase
      .from("favorites")
      .select("seller_id")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (iptal) return;

        if (error) {
          setSonuc({
            userId,
            deneme: denemeSayaci,
            durum: "hata",
            favoriler: [],
          });
          return;
        }

        // Kanonik id'ler mock veriye çözülür; eksik id'ler sessizce düşer
        // (resolveCollectionSellers deseni).
        const cozulen = (data ?? [])
          .map((satir) => sellers.find((s) => s.id === satir.seller_id))
          .filter((s): s is Seller => Boolean(s));

        setSonuc({
          userId,
          deneme: denemeSayaci,
          durum: "hazir",
          favoriler: cozulen,
        });
      });

    return () => {
      iptal = true;
    };
  }, [userId, denemeSayaci]);

  const baslik = (
    <div className="mb-12 max-w-3xl">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-clay">
        Favoriler
      </p>

      <h1 className="mb-4 font-display text-5xl tracking-tight text-ink">
        Favorilerim
      </h1>
    </div>
  );

  if (authLoading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24">
        {baslik}
        <p role="status" className="text-muted">
          Oturum durumu kontrol ediliyor…
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center md:py-28">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-clay">
          Favoriler
        </p>

        <h1 className="mb-6 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Favorilerini görmek için giriş yap.
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-lg leading-8 text-muted">
          Beğendiğin işletmeleri favorilerine eklemek ve burada listelemek için
          ücretsiz üyelik yeterli.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button to="/giris" state={{ from: "/favoriler" }}>
            Giriş Yap
          </Button>
          <Button
            to="/uye-ol"
            state={{ from: "/favoriler" }}
            variant="secondary"
          >
            Ücretsiz Üye Ol
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      {baslik}

      {yukleniyor && (
        <p role="status" className="text-muted">
          Favorilerin yükleniyor…
        </p>
      )}

      {guncel?.durum === "hata" && (
        <div className="max-w-xl">
          <FormMessage tone="error" className="mb-6">
            Favorilerin yüklenemedi. Lütfen tekrar deneyin.
          </FormMessage>

          <Button
            type="button"
            variant="secondary"
            onClick={() => setDenemeSayaci((n) => n + 1)}
          >
            Tekrar dene
          </Button>
        </div>
      )}

      {guncel?.durum === "hazir" && guncel.favoriler.length === 0 && (
        <div className="max-w-xl">
          <p className="mb-8 text-lg leading-8 text-muted">
            Henüz favorin yok. İşletmeleri keşfet, beğendiklerini kalp
            simgesiyle buraya ekle.
          </p>

          <Button to="/kesfet">İşletmeleri keşfet</Button>
        </div>
      )}

      {guncel?.durum === "hazir" && guncel.favoriler.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guncel.favoriler.map((satici) => (
            <BusinessCard key={satici.id} seller={satici} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
