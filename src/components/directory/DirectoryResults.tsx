import { useEffect, useMemo, useRef } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { categories, sellers } from "../../data/mockData";
import type { ShippingScope } from "../../data/mockData";
import Button from "../ui/Button";
import BusinessCard from "./BusinessCard";
import { getNewestSellers } from "./newest";
import { normalizeSearch } from "./normalize";

const gonderimSecenekleri: { value: ShippingScope; label: string }[] = [
  { value: "local", label: "Yerel teslimat" },
  { value: "regional", label: "Bölgesel gönderim" },
  { value: "nationwide", label: "Türkiye geneli gönderim" },
];

const siralamaDegerleri = ["az", "za", "newest"];

const alanSinifi =
  "w-full rounded-sm border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand";

type DirectoryResultsProps = {
  lockedCategoryId?: string;
  autoFocusSearch?: boolean;
};

function DirectoryResults({
  lockedCategoryId,
  autoFocusSearch,
}: DirectoryResultsProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Bütün filtre durumu URL'de yaşar; geçersiz değerler güvenli
  // varsayılana (filtre yok) düşer.
  const qParam = (searchParams.get("q") ?? "").trim();
  const kategoriSlug = searchParams.get("category") ?? "";
  const seciliKategori = lockedCategoryId
    ? categories.find((kategori) => kategori.id === lockedCategoryId)
    : categories.find((kategori) => kategori.slug === kategoriSlug);
  const seciliSehir = searchParams.get("sehir") ?? "";
  const gonderimParam = searchParams.get("gonderim") ?? "";
  const seciliGonderim = gonderimSecenekleri.some(
    (secenek) => secenek.value === gonderimParam
  )
    ? (gonderimParam as ShippingScope)
    : "";
  const yalnizYeniler = searchParams.get("yeni") === "1";
  const sortParam = searchParams.get("sort") ?? "";
  const seciliSiralama = siralamaDegerleri.includes(sortParam) ? sortParam : "";

  const sehirSecenekleri = useMemo(
    () =>
      [...new Set(sellers.map((isletme) => isletme.city))].sort((a, b) =>
        a.localeCompare(b, "tr")
      ),
    []
  );

  const gorunurKategoriler = useMemo(
    () =>
      categories.filter(
        (kategori) => kategori.sellerCount > 0 || kategori.slug === kategoriSlug
      ),
    [kategoriSlug]
  );

  const enYeniIdleri = useMemo(
    () => new Set(getNewestSellers(sellers).map((isletme) => isletme.id)),
    []
  );

  const paramGuncelle = (anahtar: string, deger: string) => {
    const sonraki = new URLSearchParams(searchParams);
    if (deger) {
      sonraki.set(anahtar, deger);
    } else {
      sonraki.delete(anahtar);
    }
    setSearchParams(sonraki);
  };

  const aramaGonder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const veri = new FormData(event.currentTarget);
    paramGuncelle("q", String(veri.get("q") ?? "").trim());
  };

  const aramaFormu = useRef<HTMLFormElement>(null);
  const aramaInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocusSearch) {
      aramaInput.current?.focus();
    }
  }, [autoFocusSearch]);

  const filtreleriTemizle = () => {
    aramaFormu.current?.reset();
    setSearchParams({});
  };

  const filtrelenmisIsletmeler = useMemo(() => {
    const arama = normalizeSearch(qParam);

    const sonuc = sellers.filter((isletme) => {
      if (seciliKategori && isletme.categoryId !== seciliKategori.id) {
        return false;
      }
      if (seciliSehir && isletme.city !== seciliSehir) {
        return false;
      }
      if (seciliGonderim && isletme.shippingScope !== seciliGonderim) {
        return false;
      }
      if (yalnizYeniler && !enYeniIdleri.has(isletme.id)) {
        return false;
      }
      if (!arama) {
        return true;
      }

      const aramaAlanlari = [
        isletme.name,
        isletme.shortDescription,
        isletme.fullDescription,
        isletme.categoryName,
        isletme.city,
        ...isletme.tags,
      ];

      return aramaAlanlari.some((alan) =>
        normalizeSearch(alan).includes(arama)
      );
    });

    if (seciliSiralama === "az") {
      sonuc.sort((a, b) => a.name.localeCompare(b.name, "tr"));
    } else if (seciliSiralama === "za") {
      sonuc.sort((a, b) => b.name.localeCompare(a.name, "tr"));
    } else if (seciliSiralama === "newest") {
      sonuc.sort((a, b) => Date.parse(b.joinedAt) - Date.parse(a.joinedAt));
    }

    return sonuc;
  }, [
    qParam,
    seciliKategori,
    seciliSehir,
    seciliGonderim,
    yalnizYeniler,
    seciliSiralama,
    enYeniIdleri,
  ]);

  const aktifFiltreVar =
    qParam !== "" ||
    (!lockedCategoryId && Boolean(seciliKategori)) ||
    seciliSehir !== "" ||
    seciliGonderim !== "" ||
    yalnizYeniler ||
    seciliSiralama !== "";

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="h-fit rounded-sm border border-ink/10 p-6">
        <h2 className="mb-5 font-display text-lg text-ink">Filtreler</h2>

        <form ref={aramaFormu} onSubmit={aramaGonder} className="mb-6">
          <label
            htmlFor="kesfet-arama"
            className="mb-2 block text-sm text-muted"
          >
            Arama
          </label>

          <input
            key={qParam}
            ref={aramaInput}
            id="kesfet-arama"
            name="q"
            type="text"
            defaultValue={qParam}
            placeholder="Ürün, işletme veya kategori"
            className={alanSinifi}
          />

          <button
            type="submit"
            className="mt-2 w-full rounded-sm border border-ink/15 px-4 py-2 text-sm text-ink transition-colors hover:border-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Ara
          </button>
        </form>

        {!lockedCategoryId && (
          <div className="mb-6">
            <label
              htmlFor="kesfet-kategori"
              className="mb-2 block text-sm text-muted"
            >
              Kategori
            </label>

            <select
              id="kesfet-kategori"
              value={seciliKategori?.slug ?? ""}
              onChange={(event) => paramGuncelle("category", event.target.value)}
              className={alanSinifi}
            >
              <option value="">Tüm kategoriler</option>
              {gorunurKategoriler.map((kategori) => (
                <option key={kategori.slug} value={kategori.slug}>
                  {kategori.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-6">
          <label
            htmlFor="kesfet-sehir"
            className="mb-2 block text-sm text-muted"
          >
            Şehir
          </label>

          <select
            id="kesfet-sehir"
            value={seciliSehir}
            onChange={(event) => paramGuncelle("sehir", event.target.value)}
            className={alanSinifi}
          >
            <option value="">Tüm şehirler</option>
            {sehirSecenekleri.map((sehir) => (
              <option key={sehir} value={sehir}>
                {sehir}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="kesfet-gonderim"
            className="mb-2 block text-sm text-muted"
          >
            Gönderim kapsamı
          </label>

          <select
            id="kesfet-gonderim"
            value={seciliGonderim}
            onChange={(event) => paramGuncelle("gonderim", event.target.value)}
            className={alanSinifi}
          >
            <option value="">Tüm gönderim seçenekleri</option>
            {gonderimSecenekleri.map((secenek) => (
              <option key={secenek.value} value={secenek.value}>
                {secenek.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-ink">
            <input
              type="checkbox"
              checked={yalnizYeniler}
              onChange={(event) =>
                paramGuncelle("yeni", event.target.checked ? "1" : "")
              }
              className="h-4 w-4 accent-brand"
            />
            Yalnızca yeni katılan işletmeler
          </label>
        </div>

        {aktifFiltreVar && (
          <Button variant="secondary" onClick={filtreleriTemizle} className="w-full">
            Filtreleri temizle
          </Button>
        )}
      </aside>

      <section>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-muted">
            {filtrelenmisIsletmeler.length} işletme listeleniyor
          </p>

          <select
            aria-label="Sıralama"
            value={seciliSiralama}
            onChange={(event) => paramGuncelle("sort", event.target.value)}
            className="rounded-sm border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand"
          >
            <option value="">Önerilen sıralama</option>
            <option value="az">Alfabetik A-Z</option>
            <option value="za">Alfabetik Z-A</option>
            <option value="newest">En yeni katılan</option>
          </select>
        </div>

        {filtrelenmisIsletmeler.length === 0 ? (
          <div className="rounded-sm border border-ink/10 px-8 py-16 text-center">
            <h2 className="mb-3 font-display text-2xl text-ink">
              Eşleşen işletme bulunamadı
            </h2>

            <p className="mx-auto mb-8 max-w-md leading-7 text-muted">
              Arama metnini veya filtre seçimlerini değiştirerek farklı
              işletmeleri keşfedebilirsin.
            </p>

            <Button variant="secondary" onClick={filtreleriTemizle}>
              Filtreleri temizle
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtrelenmisIsletmeler.map((isletme) => (
              <BusinessCard key={isletme.id} seller={isletme} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default DirectoryResults;
