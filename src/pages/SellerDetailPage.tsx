import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Share2 } from "lucide-react";
import SellerImage from "../components/SellerImage";
import Button from "../components/ui/Button";
import FavoriteDialog from "../components/seller/FavoriteDialog";
import { sellers, type Seller } from "../data/mockData";
import usePageTitle from "../hooks/usePageTitle";

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
    satici ? `${satici.name} | Microvend` : "Satıcı bulunamadı | Microvend"
  );

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
        <h1 className="mb-4 text-4xl font-light text-gray-900">
          Satıcı bulunamadı.
        </h1>

        <Link
          to="/saticilar"
          className="text-[#4e7bab] transition hover:text-[#6b91b9]"
        >
          ← Satıcılara dön
        </Link>
      </div>
    );
  }

  const primaryAction = getPrimaryAction(satici);

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <Link
        to="/saticilar"
        className="mb-10 inline-block text-sm text-[#4e7bab] transition hover:text-[#6b91b9]"
      >
        ← Satıcılara dön
      </Link>

      <div className="relative mb-16">
        <SellerImage
          src={satici.coverImage}
          alt={`${satici.name} kapak görseli`}
          label={satici.name}
          loading="eager"
          className="h-72 w-full rounded-[2.5rem] md:h-96"
        />

        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <SellerImage
            src={satici.logoImage}
            alt={`${satici.name} logo`}
            label={satici.name}
            variant="logo"
            loading="eager"
            className="card-soft h-24 w-24 rounded-2xl border-4 border-white bg-white md:h-28 md:w-28"
          />
        </div>
      </div>

      <div className="mx-auto mb-12 max-w-3xl pt-6 text-center">
        <span className="mb-4 inline-block rounded-full bg-[#edf3fa] px-4 py-1.5 text-sm text-[#4e7bab]">
          {satici.categoryName}
        </span>

        <h1 className="mb-3 text-5xl font-light tracking-tight text-gray-900 md:text-6xl">
          {satici.name}
        </h1>

        <p className="mb-6 text-sm text-gray-500">{satici.city}</p>

        <p className="text-lg font-light leading-9 text-gray-600">
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
            onClick={() => setFavoriteDialogOpen(true)}
            className="w-full sm:w-auto"
          >
            <Heart size={16} aria-hidden="true" />
            Favorilere Ekle
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

      <FavoriteDialog open={isFavoriteDialogOpen} onClose={closeFavoriteDialog} />

      <div className="mb-16 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="card-soft rounded-[2rem] bg-white p-8 md:p-10">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#4e7bab]">
            Hikaye
          </p>

          <h2 className="mb-6 text-3xl font-light text-gray-900">
            Markanın arkasındaki yolculuk
          </h2>

          <p className="font-light leading-8 text-gray-600">{satici.story}</p>
        </div>

        <aside className="card-soft h-fit rounded-[2rem] bg-white p-8">
          <h2 className="mb-6 text-2xl font-light text-gray-900">
            Satıcı Bilgileri
          </h2>

          <div className="space-y-5 text-sm">
            <div>
              <p className="mb-1 text-gray-400">Konum</p>
              <p className="text-gray-700">{satici.location}</p>
            </div>

            <div>
              <p className="mb-1 text-gray-400">Şehir</p>
              <p className="text-gray-700">{satici.city}</p>
            </div>

            <div>
              <p className="mb-1 text-gray-400">Kuruluş Yılı</p>
              <p className="text-gray-700">{satici.foundedYear}</p>
            </div>

            <div>
              <p className="mb-1 text-gray-400">Kategori</p>
              <p className="text-gray-700">{satici.categoryName}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 border-t border-[#eef3f8] pt-6">
            {satici.tags.map((etiket) => (
              <span
                key={etiket}
                className="rounded-full bg-[#edf3fa] px-3 py-1 text-sm text-[#4e7bab]"
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
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#4e7bab]">
              Vitrin
            </p>

            <h2 className="text-3xl font-light text-gray-900">
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
                className="aspect-[4/3] rounded-[1.5rem]"
              />
            ))}
          </div>
        </div>
      )}

      <div className="card-soft overflow-hidden rounded-[2rem] bg-[#4e7bab] px-10 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-blue-100">
            Doğrudan Satıcıya Ulaşın
          </p>

          <h2 className="mb-6 text-4xl font-light leading-tight">
            {satici.name} ile tanışmaya hazır mısınız?
          </h2>

          <p className="mb-8 text-lg font-light leading-8 text-blue-50">
            Ürünleri inceleyin, koleksiyonları keşfedin ve satıcının resmi
            kanalına tek tıkla geçiş yapın.
          </p>

          <a
            href={satici.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-2xl bg-white px-8 py-4 text-[#4e7bab] transition hover:bg-gray-100"
          >
            Satıcının kanalına git
          </a>
        </div>
      </div>
    </div>
  );
}

export default SellerDetailPage;
