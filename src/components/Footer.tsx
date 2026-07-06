import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-[#eef3f8] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_0.8fr] md:items-start">
          <div>
            <Link
              to="/"
              className="text-xl font-light tracking-wide text-[#4e7bab] md:text-2xl"
            >
              microvend
            </Link>

            <p className="mt-3 max-w-md text-sm font-light leading-6 text-gray-500">
              Mikro işletmeler, butik markalar ve bağımsız üreticiler için
              komisyonsuz dijital vitrin platformu.
            </p>

            <p className="mt-3 text-sm font-light leading-6 text-gray-500">
              İletişim için başvuru formunu kullanabilirsiniz.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-4 text-sm font-light text-gray-600">
            <Link to="/" className="transition hover:text-[#4e7bab]">
              Keşfet
            </Link>

            <Link to="/saticilar" className="transition hover:text-[#4e7bab]">
              Satıcılar
            </Link>

            <Link to="/kategoriler" className="transition hover:text-[#4e7bab]">
              Kategoriler
            </Link>

            <Link
              to="/ucretlendirme"
              className="transition hover:text-[#4e7bab]"
            >
              Ücretlendirme
            </Link>

            <Link to="/basvuru" className="transition hover:text-[#4e7bab]">
              Başvuru
            </Link>

            <Link to="/hakkimizda" className="transition hover:text-[#4e7bab]">
              Hakkımızda
            </Link>
          </nav>

          <div className="rounded-2xl border border-[#eef3f8] bg-[#fcfcfc] p-5">
            <p className="text-sm font-light leading-6 text-gray-500">
              Satıcı başvuruları editör incelemesinden sonra yayına alınır.
            </p>

            <Link
              to="/basvuru"
              className="mt-4 inline-block rounded-xl bg-[#4e7bab] px-4 py-2 text-sm text-white transition hover:bg-[#6b91b9]"
            >
              Satıcı Ol
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-[#eef3f8] pt-6 text-sm font-light text-gray-400">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>© 2026 microvend · Tüm hakları saklıdır.</p>

            <p>Komisyonsuz keşif ve dijital vitrin platformu.</p>
          </div>

          <p className="mt-4">
            Başvuru bilgileri yalnızca değerlendirme amacıyla kullanılır ve
            üçüncü taraflarla paylaşılmaz.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;