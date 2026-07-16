import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Share2 } from "lucide-react";
import SellerImage from "../components/SellerImage";
import Button from "../components/ui/Button";
import FavoriteDialog from "../components/seller/FavoriteDialog";
import { sellers, type Seller } from "../data/mockData";
import usePageTitle from "../hooks/usePageTitle";
import { useAuth } from "../auth/AuthContext";
import { useFavorite } from "../hooks/useFavorite";

type PrimaryAction = { label: string; href: string } | null;

function getPrimaryAction(satici: Seller): PrimaryAction {
  if (satici.websiteUrl) {
    return { label: "Web Sitesini Ziyaret Et", href: satici.websiteUrl };
  }

  if (satici.instagramUrl) {
    return { label: "Instagram'da Gör", href: satici.instagramUrl };
  }

  if (satici.whatsappUrl) {
    return { label: "WhatsApp ile İletişime Geç", href: satici.whatsappUrl };
  }

  return null;
}

type ShareStatus = "idle" | "copied" | "error";

function SellerDetailPage() {
  const { slug } = useParams();

  const satici = sellers.find((item) => item.slug === slug);

  usePageTitle(
    satici ? `${satici.name} | Microvend` : "İşletme bulunamadı | Microvend",
    satici
      ? `${satici.name} işletmesinin profilini incele; web sitesi, Instagram veya WhatsApp üzerinden iletişime geç.`
      : "Aradığınız işletme bulunamadı."
  );

  const { user, loading: authLoading } = useAuth();
  const favori = useFavorite(satici?.id ?? "");

  const [isFavoriteDialogOpen, setFavoriteDialogOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState<ShareStatus>("idle");
  const favoriteTriggerWrapperRef = useRef<HTMLDivElement>(null);
  const shareResetTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(shareResetTimeoutRef.current);
  }, []);

  function closeFavoriteDialog() {
    setFavoriteDialogOpen(false);
    favoriteTriggerWrapperRef.current?.querySelector("button")?.focus();
  }

  // Girişsizken üyelik daveti (dialog); girişliyken hedef duruma getirme.
  function handleFavoriteClick() {
    if (!user) {
      setFavoriteDialogOpen(true);
      return;
    }

    void favori.setFavorite(!favori.isFavorite);
  }

  async function handleShare() {
    if (!satici) return;

    const shareData = { title: satici.name, url: window.location.href };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus("copied");
    } catch {
      setShareStatus("error");
    }

    window.clearTimeout(shareResetTimeoutRef.current);
    shareResetTimeoutRef.current = window.setTimeout(() => setShareStatus("idle"), 2000);
  }

  if (!satici) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24">
        <h1 className="mb-4 font-display text-4xl text-ink">
          İşletme bulunamadı.
        </h1>

        <Link to="/kesfet" className="text-brand transition hover:text-brand-dark">
          ← İşletmelere dön
        </Link>
      </div>
    );
  }

  const primaryAction = getPrimaryAction(satici);

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <Link
        to="/kesfet"
        className="mb-10 inline-block text-sm text-brand transition hover:text-brand-dark"
      >
        ← İşletmelere dön
      </Link>

      <div className="relative mb-16">
        <SellerImage
          src={satici.coverImage}
          alt={`${satici.name} kapak görseli`}
          label={satici.name}
          loading="eager"
          className="h-72 w-full rounded-md md:h-96"
        />

        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <SellerImage
            src={satici.logoImage}
            alt={`${satici.name} logo`}
            label={satici.name}
            variant="logo"
            loading="eager"
            className="h-24 w-24 rounded-sm border-4 border-paper bg-white shadow-sm md:h-28 md:w-28"
          />
        </div>
      </div>

      <div className="mx-auto mb-12 max-w-3xl pt-6 text-center">
        <span className="mb-4 inline-block rounded-sm bg-ink/5 px-4 py-1.5 text-sm text-brand">
          {satici.categoryName}
        </span>

        <h1 className="mb-3 font-display text-5xl tracking-tight text-ink md:text-6xl">
          {satici.name}
        </h1>

        <p className="mb-6 text-sm text-muted">{satici.city}</p>

        <p className="text-lg leading-9 text-muted">
          {satici.shortDescription}
        </p>
      </div>

      <div className="mb-16 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
        {primaryAction && (
          <Button
            href={primaryAction.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            {primaryAction.label}
          </Button>
        )}

        <div ref={favoriteTriggerWrapperRef} className="contents">
          <Button
            type="button"
            variant="secondary"
            onClick={handleFavoriteClick}
            disabled={authLoading || favori.loading || favori.saving}
            className="w-full sm:w-auto"
          >
            <Heart
              size={16}
              aria-hidden="true"
              className={
                user && favori.isFavorite ? "fill-clay text-clay" : undefined
              }
            />
            <span aria-live="polite">
              {user && favori.isFavorite
                ? "Favorilerden Çıkar"
                : "Favorilere Ekle"}
            </span>
          </Button>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={handleShare}
          className="w-full sm:w-auto"
        >
          <Share2 size={16} aria-hidden="true" />
          <span aria-live="polite">
            {shareStatus === "copied"
              ? "Bağlantı kopyalandı"
              : shareStatus === "error"
                ? "Kopyalanamadı"
                : "Paylaş"}
          </span>
        </Button>
      </div>

      {user && favori.error && (
        <p role="alert" className="-mt-12 mb-16 text-center text-sm text-red-700">
          {favori.error}
        </p>
      )}

      <FavoriteDialog
        open={isFavoriteDialogOpen}
        onClose={closeFavoriteDialog}
        from={`/saticilar/${satici.slug}`}
      />

      <div className="mb-16 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-md border border-ink/10 bg-white p-8 md:p-10">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-clay">
            Hikaye
          </p>

          <h2 className="mb-6 font-display text-3xl text-ink">
            Markanın arkasındaki yolculuk
          </h2>

          <p className="leading-8 text-muted">{satici.story}</p>
        </div>

        <aside className="h-fit rounded-md border border-ink/10 bg-white p-8">
          <h2 className="mb-6 font-display text-2xl text-ink">
            İşletme Bilgileri
          </h2>

          <div className="space-y-5 text-sm">
            <div>
              <p className="mb-1 text-muted">Konum</p>
              <p className="text-ink">{satici.location}</p>
            </div>

            <div>
              <p className="mb-1 text-muted">Şehir</p>
              <p className="text-ink">{satici.city}</p>
            </div>

            <div>
              <p className="mb-1 text-muted">Kuruluş Yılı</p>
              <p className="text-ink">{satici.foundedYear}</p>
            </div>

            <div>
              <p className="mb-1 text-muted">Kategori</p>
              <p className="text-ink">{satici.categoryName}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 border-t border-ink/10 pt-6">
            {satici.tags.map((etiket) => (
              <span
                key={etiket}
                className="rounded-sm bg-ink/5 px-3 py-1 text-sm text-brand"
              >
                {etiket}
              </span>
            ))}
          </div>
        </aside>
      </div>

      {satici.galleryImages.length > 0 && (
        <div className="mb-16">
          <div className="mb-8">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-clay">
              Vitrin
            </p>

            <h2 className="font-display text-3xl text-ink">
              Vitrinden seçkiler.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {satici.galleryImages.map((gorsel) => (
              <SellerImage
                key={gorsel.url}
                src={gorsel.url}
                alt={gorsel.alt}
                label={satici.name}
                className="aspect-[4/3] rounded-sm"
              />
            ))}
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-md bg-brand px-10 py-16 text-paper">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-paper/70">
            Doğrudan İşletmeye Ulaşın
          </p>

          <h2 className="mb-6 font-display text-4xl leading-tight">
            {satici.name} ile tanışmaya hazır mısınız?
          </h2>

          <p className="mb-8 text-lg leading-8 text-paper/80">
            Ürünleri inceleyin, koleksiyonları keşfedin ve işletmenin resmi
            kanalına tek tıkla geçiş yapın.
          </p>

          <Button href={satici.websiteUrl} target="_blank" rel="noopener noreferrer" variant="inverted">
            İşletmenin kanalına git
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SellerDetailPage;
