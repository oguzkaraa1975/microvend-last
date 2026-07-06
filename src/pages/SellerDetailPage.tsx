import { Link, useParams } from "react-router-dom";
import SellerImage from "../components/SellerImage";
import { sellers } from "../data/mockData";
import usePageTitle from "../hooks/usePageTitle";

function SellerDetailPage() {
  const { slug } = useParams();

  const satici = sellers.find((item) => item.slug === slug);

  usePageTitle(
    satici ? `${satici.name} | Microvend` : "Satıcı bulunamadı | Microvend"
  );

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

      <div className="mb-16 flex flex-wrap items-center justify-center gap-3">
        <a
          href={satici.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-[#dbe7f2] px-5 py-3 text-sm text-[#4e7bab] transition hover:bg-[#edf3fa]"
        >
          Instagram
        </a>

        <a
          href={satici.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-[#dbe7f2] px-5 py-3 text-sm text-[#4e7bab] transition hover:bg-[#edf3fa]"
        >
          WhatsApp
        </a>

        <a
          href={satici.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-[#dbe7f2] px-5 py-3 text-sm text-[#4e7bab] transition hover:bg-[#edf3fa]"
        >
          Web Sitesi
        </a>
      </div>

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
