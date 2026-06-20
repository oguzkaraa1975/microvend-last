import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#eef3f8] bg-[#fcfcfc]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          to="/"
          className="text-3xl font-light tracking-tight text-[#4e7bab]"
          onClick={() => setMenuOpen(false)}
        >
          microvend
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-light md:flex">
          <Link to="/" className="text-gray-700 transition hover:text-[#4e7bab]">
            Keşfet
          </Link>

          <Link
            to="/saticilar"
            className="text-gray-700 transition hover:text-[#4e7bab]"
          >
            Satıcılar
          </Link>

          <Link
            to="/kategoriler"
            className="text-gray-700 transition hover:text-[#4e7bab]"
          >
            Kategoriler
          </Link>

          <Link
            to="/ucretlendirme"
            className="text-gray-700 transition hover:text-[#4e7bab]"
          >
            Ücretlendirme
          </Link>

          <Link
            to="/hakkimizda"
            className="text-gray-700 transition hover:text-[#4e7bab]"
          >
            Hakkımızda
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/basvuru"
            className="rounded-xl border border-[#dbe7f2] px-5 py-3 text-sm text-[#4e7bab] transition hover:bg-[#edf3fa]"
          >
            Başvuru Yap
          </Link>

          <Link
            to="/basvuru"
            className="rounded-xl bg-[#4e7bab] px-5 py-3 text-sm text-white transition hover:bg-[#6b91b9]"
          >
            Satıcı Ol
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl border border-[#dbe7f2] px-4 py-3 text-sm text-[#4e7bab] md:hidden"
        >
          Menü
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-[#eef3f8] bg-white px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-4 text-sm font-light text-gray-700">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Keşfet
            </Link>

            <Link to="/saticilar" onClick={() => setMenuOpen(false)}>
              Satıcılar
            </Link>

            <Link to="/kategoriler" onClick={() => setMenuOpen(false)}>
              Kategoriler
            </Link>

            <Link to="/ucretlendirme" onClick={() => setMenuOpen(false)}>
              Ücretlendirme
            </Link>

            <Link to="/hakkimizda" onClick={() => setMenuOpen(false)}>
              Hakkımızda
            </Link>

            <Link
              to="/basvuru"
              onClick={() => setMenuOpen(false)}
              className="mt-3 rounded-xl bg-[#4e7bab] px-5 py-3 text-center text-white"
            >
              Satıcı Ol
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
