import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { categories } from "../data/mockData";
import Button from "../components/ui/Button";
import { supabase } from "../lib/supabase";
import usePageTitle from "../hooks/usePageTitle";

type BasvuruFormu = {
  adSoyad: string;
  markaAdi: string;
  kategori: string;
  sehir: string;
  email: string;
  telefon: string;
  instagram: string;
  website: string;
  aciklama: string;
};

const bosForm: BasvuruFormu = {
  adSoyad: "",
  markaAdi: "",
  kategori: "",
  sehir: "",
  email: "",
  telefon: "",
  instagram: "",
  website: "",
  aciklama: "",
};

const emailGecerliMi = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function ApplyPage() {
  usePageTitle("İşletme Başvurusu | Microvend");

  const [form, setForm] = useState<BasvuruFormu>(bosForm);
  const [honeypot, setHoneypot] = useState("");
  const [hataMesaji, setHataMesaji] = useState("");
  const [basariMesaji, setBasariMesaji] = useState("");
  const [gonderiliyor, setGonderiliyor] = useState(false);

  const mesajRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (hataMesaji || basariMesaji) {
      mesajRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [hataMesaji, basariMesaji]);

  const alaniGuncelle = (
    alan: keyof BasvuruFormu,
    deger: string
  ) => {
    setForm((onceki) => ({ ...onceki, [alan]: deger }));
    setHataMesaji("");
    setBasariMesaji("");
  };

  const formuDogrula = () => {
    if (!form.adSoyad.trim()) {
      return "Ad soyad alanı zorunludur.";
    }

    if (!form.markaAdi.trim()) {
      return "Marka adı alanı zorunludur.";
    }

    if (!form.kategori) {
      return "Lütfen bir kategori seçin.";
    }

    if (!form.sehir.trim()) {
      return "Şehir alanı zorunludur.";
    }

    if (!form.email.trim()) {
      return "E-posta alanı zorunludur.";
    }

    if (!emailGecerliMi(form.email.trim())) {
      return "Geçerli bir e-posta adresi girin.";
    }

    if (!form.aciklama.trim()) {
      return "Açıklama alanı zorunludur.";
    }

    return "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dogrulamaHatasi = formuDogrula();

    if (dogrulamaHatasi) {
      setHataMesaji(dogrulamaHatasi);
      setBasariMesaji("");
      return;
    }

    setGonderiliyor(true);
    setHataMesaji("");
    setBasariMesaji("");

    // Honeypot doluysa bot: kayıt atılmaz, bota "başarılı" gösterilir.
    if (honeypot.trim()) {
      setForm(bosForm);
      setBasariMesaji(
        "Başvurunuz alındı. Microvend ekibi en kısa sürede sizinle iletişime geçecek."
      );
      setGonderiliyor(false);
      return;
    }

    if (!supabase) {
      setHataMesaji(
        "Başvuru şu anda gönderilemiyor. Lütfen daha sonra tekrar deneyin."
      );
      setGonderiliyor(false);
      return;
    }

    const { error } = await supabase.from("applications").insert({
      full_name: form.adSoyad.trim(),
      brand_name: form.markaAdi.trim(),
      category_slug: form.kategori,
      city: form.sehir.trim(),
      email: form.email.trim(),
      phone: form.telefon.trim() || null,
      instagram: form.instagram.trim() || null,
      website: form.website.trim() || null,
      description: form.aciklama.trim(),
    });

    if (error) {
      setHataMesaji(
        "Başvuru gönderilirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin."
      );
      setGonderiliyor(false);
      return;
    }

    setForm(bosForm);
    setBasariMesaji(
      "Başvurunuz alındı. Microvend ekibi en kısa sürede sizinle iletişime geçecek."
    );
    setGonderiliyor(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-clay">
          İşletme Başvurusu
        </p>

        <h1 className="mb-6 font-display text-5xl tracking-tight text-ink">
          Microvend'e katılın.
        </h1>

        <p className="text-lg leading-8 text-muted">
          Küçük işletmenizi veya bağımsız markanızı platformda sergilemek için
          başvuru formunu doldurun.
        </p>
      </div>

      <div className="rounded-md border border-ink/10 bg-white p-8 md:p-10">
        <form className="grid gap-8" onSubmit={handleSubmit} noValidate>
          {/* Honeypot: kullanıcıya görünmez, botlar doldurur */}
          <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
            <label htmlFor="firma-web">Bu alanı boş bırakın</label>
            <input
              id="firma-web"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="markaAdi"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Marka Adı <span className="text-clay">*</span>
              </label>

              <input
                id="markaAdi"
                type="text"
                value={form.markaAdi}
                onChange={(event) =>
                  alaniGuncelle("markaAdi", event.target.value)
                }
                placeholder="Örn: Luna Atölye"
                className="w-full rounded-sm border border-ink/20 px-4 py-4 outline-none transition focus:border-brand"
              />
            </div>

            <div>
              <label
                htmlFor="adSoyad"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Ad Soyad <span className="text-clay">*</span>
              </label>

              <input
                id="adSoyad"
                type="text"
                value={form.adSoyad}
                onChange={(event) =>
                  alaniGuncelle("adSoyad", event.target.value)
                }
                placeholder="Ad Soyad"
                className="w-full rounded-sm border border-ink/20 px-4 py-4 outline-none transition focus:border-brand"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-ink"
              >
                E-Posta <span className="text-clay">*</span>
              </label>

              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => alaniGuncelle("email", event.target.value)}
                placeholder="ornek@mail.com"
                className="w-full rounded-sm border border-ink/20 px-4 py-4 outline-none transition focus:border-brand"
              />
            </div>

            <div>
              <label
                htmlFor="telefon"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Telefon
              </label>

              <input
                id="telefon"
                type="text"
                value={form.telefon}
                onChange={(event) =>
                  alaniGuncelle("telefon", event.target.value)
                }
                placeholder="+90..."
                className="w-full rounded-sm border border-ink/20 px-4 py-4 outline-none transition focus:border-brand"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="kategori"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Kategori <span className="text-clay">*</span>
              </label>

              <select
                id="kategori"
                value={form.kategori}
                onChange={(event) =>
                  alaniGuncelle("kategori", event.target.value)
                }
                className="w-full rounded-sm border border-ink/20 px-4 py-4 outline-none transition focus:border-brand"
              >
                <option value="">Kategori seçin</option>
                {categories.map((kategori) => (
                  <option key={kategori.slug} value={kategori.slug}>
                    {kategori.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="sehir"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Şehir <span className="text-clay">*</span>
              </label>

              <input
                id="sehir"
                type="text"
                value={form.sehir}
                onChange={(event) => alaniGuncelle("sehir", event.target.value)}
                placeholder="İstanbul"
                className="w-full rounded-sm border border-ink/20 px-4 py-4 outline-none transition focus:border-brand"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="instagram"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Instagram
              </label>

              <input
                id="instagram"
                type="text"
                value={form.instagram}
                onChange={(event) =>
                  alaniGuncelle("instagram", event.target.value)
                }
                placeholder="@kullaniciadi"
                className="w-full rounded-sm border border-ink/20 px-4 py-4 outline-none transition focus:border-brand"
              />
            </div>

            <div>
              <label
                htmlFor="website"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Web Sitesi
              </label>

              <input
                id="website"
                type="text"
                value={form.website}
                onChange={(event) =>
                  alaniGuncelle("website", event.target.value)
                }
                placeholder="https://"
                className="w-full rounded-sm border border-ink/20 px-4 py-4 outline-none transition focus:border-brand"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="aciklama"
              className="mb-2 block text-sm font-medium text-ink"
            >
              Kısa Açıklama <span className="text-clay">*</span>
            </label>

            <textarea
              id="aciklama"
              rows={5}
              value={form.aciklama}
              onChange={(event) =>
                alaniGuncelle("aciklama", event.target.value)
              }
              placeholder="İşletmenizi ve ürünlerinizi kısaca anlatın..."
              className="w-full rounded-sm border border-ink/20 px-4 py-4 outline-none transition focus:border-brand"
            />
          </div>

          {basariMesaji && (
            <div
              ref={mesajRef}
              role="status"
              className="rounded-sm border border-brand/20 bg-brand/5 px-5 py-4"
            >
              <p className="text-brand">{basariMesaji}</p>
            </div>
          )}

          {hataMesaji && (
            <div
              ref={mesajRef}
              role="alert"
              className="rounded-sm border border-red-200 bg-red-50 px-5 py-4"
            >
              <p className="text-red-700">{hataMesaji}</p>
            </div>
          )}

          <div className="flex flex-col gap-4 border-t border-ink/10 pt-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-sm leading-6 text-muted">
              Başvurular editör incelemesinden sonra yayınlanır. Microvend bir
              pazaryeri değildir; satış ve ödeme işlemleri platform dışında
              gerçekleşir.
            </p>

            <Button type="submit" disabled={gonderiliyor}>
              {gonderiliyor ? "Gönderiliyor..." : "Başvuruyu Gönder"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyPage;
