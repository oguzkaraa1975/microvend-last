import { useState } from "react";
import type { FormEvent } from "react";
import { kategoriler } from "../data/mockData";

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
  const [form, setForm] = useState<BasvuruFormu>(bosForm);
  const [hataMesaji, setHataMesaji] = useState("");
  const [basariMesaji, setBasariMesaji] = useState("");
  const [gonderiliyor, setGonderiliyor] = useState(false);

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

    await new Promise((resolve) => setTimeout(resolve, 900));

    setForm(bosForm);
    setBasariMesaji(
      "Başvurunuz alındı. Microvend ekibi en kısa sürede sizinle iletişime geçecek."
    );
    setGonderiliyor(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#4e7bab]">
          Satıcı Başvurusu
        </p>

        <h1 className="mb-6 text-5xl font-semibold tracking-tight">
          Microvend'e katılın.
        </h1>

        <p className="text-lg leading-8 text-gray-600">
          Küçük işletmenizi veya bağımsız markanızı platformda sergilemek için
          başvuru formunu doldurun.
        </p>
      </div>

      {basariMesaji && (
        <div className="card-soft mb-8 rounded-[2rem] border-[#dbe7f2] bg-[#edf3fa] px-6 py-5">
          <p className="font-light text-[#4e7bab]">{basariMesaji}</p>
        </div>
      )}

      {hataMesaji && (
        <div className="card-soft mb-8 rounded-[2rem] border-red-200 bg-red-50 px-6 py-5">
          <p className="font-light text-red-700">{hataMesaji}</p>
        </div>
      )}

      <div className="rounded-[2rem] border border-gray-200 bg-white p-8 md:p-10">
        <form className="grid gap-8" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="markaAdi"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Marka Adı
              </label>

              <input
                id="markaAdi"
                type="text"
                value={form.markaAdi}
                onChange={(event) =>
                  alaniGuncelle("markaAdi", event.target.value)
                }
                placeholder="Örn: Luna Atölye"
                className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none transition focus:border-[#4e7bab]"
              />
            </div>

            <div>
              <label
                htmlFor="adSoyad"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Ad Soyad
              </label>

              <input
                id="adSoyad"
                type="text"
                value={form.adSoyad}
                onChange={(event) =>
                  alaniGuncelle("adSoyad", event.target.value)
                }
                placeholder="Ad Soyad"
                className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none transition focus:border-[#4e7bab]"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                E-Posta
              </label>

              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => alaniGuncelle("email", event.target.value)}
                placeholder="ornek@mail.com"
                className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none transition focus:border-[#4e7bab]"
              />
            </div>

            <div>
              <label
                htmlFor="telefon"
                className="mb-2 block text-sm font-medium text-gray-700"
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
                className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none transition focus:border-[#4e7bab]"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="kategori"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Kategori
              </label>

              <select
                id="kategori"
                value={form.kategori}
                onChange={(event) =>
                  alaniGuncelle("kategori", event.target.value)
                }
                className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none transition focus:border-[#4e7bab]"
              >
                <option value="">Kategori seçin</option>
                {kategoriler.map((kategori) => (
                  <option key={kategori.slug} value={kategori.isim}>
                    {kategori.isim}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="sehir"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Şehir
              </label>

              <input
                id="sehir"
                type="text"
                value={form.sehir}
                onChange={(event) => alaniGuncelle("sehir", event.target.value)}
                placeholder="İstanbul"
                className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none transition focus:border-[#4e7bab]"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="instagram"
                className="mb-2 block text-sm font-medium text-gray-700"
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
                className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none transition focus:border-[#4e7bab]"
              />
            </div>

            <div>
              <label
                htmlFor="website"
                className="mb-2 block text-sm font-medium text-gray-700"
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
                className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none transition focus:border-[#4e7bab]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="aciklama"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Kısa Açıklama
            </label>

            <textarea
              id="aciklama"
              rows={5}
              value={form.aciklama}
              onChange={(event) =>
                alaniGuncelle("aciklama", event.target.value)
              }
              placeholder="İşletmenizi ve ürünlerinizi kısaca anlatın..."
              className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none transition focus:border-[#4e7bab]"
            />
          </div>

          <div className="flex flex-col gap-4 border-t border-gray-100 pt-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-sm leading-6 text-gray-500">
              Başvurular editör incelemesinden sonra yayınlanır. Microvend bir
              pazaryeri değildir; satış ve ödeme işlemleri platform dışında
              gerçekleşir.
            </p>

            <button
              type="submit"
              disabled={gonderiliyor}
              className="rounded-2xl bg-[#4e7bab] px-8 py-4 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {gonderiliyor ? "Gönderiliyor..." : "Başvuruyu Gönder"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyPage;
