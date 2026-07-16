import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CircleUser, Menu, Search, X } from "lucide-react";
import Button from "./ui/Button";
import { useAuth } from "../auth/AuthContext";

const navLinks = [
  { to: "/hakkimizda", label: "Hakkımızda" },
  { to: "/kesfet", label: "Keşfet" },
  { to: "/kategoriler", label: "Kategoriler" },
  { to: "/seckiler", label: "Seçkiler" },
  { to: "/ucretlendirme", label: "Ücretlendirme" },
  { to: "/iletisim", label: "İletişim" },
];

const araLink = "/kesfet?odak=ara";

function Header() {
  const { user, loading: authLoading, signOut } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [hesapMenuAcik, setHesapMenuAcik] = useState(false);

  const hesapMenuRef = useRef<HTMLDivElement>(null);
  const hesapTetikRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const kapat = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", kapat);
    return () => window.removeEventListener("keydown", kapat);
  }, [menuOpen]);

  useEffect(() => {
    if (!hesapMenuAcik) {
      return;
    }

    const klavyeIleKapat = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setHesapMenuAcik(false);
        hesapTetikRef.current?.focus();
      }
    };

    const disTikIleKapat = (event: PointerEvent) => {
      if (!hesapMenuRef.current?.contains(event.target as Node)) {
        setHesapMenuAcik(false);
      }
    };

    window.addEventListener("keydown", klavyeIleKapat);
    document.addEventListener("pointerdown", disTikIleKapat);

    return () => {
      window.removeEventListener("keydown", klavyeIleKapat);
      document.removeEventListener("pointerdown", disTikIleKapat);
    };
  }, [hesapMenuAcik]);

  const kapat = () => setMenuOpen(false);

  async function cikisYap() {
    setHesapMenuAcik(false);
    setMenuOpen(false);
    await signOut();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link
          to="/"
          onClick={kapat}
          className="font-display text-2xl tracking-tight text-ink transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          microvend
        </Link>

        <nav
          aria-label="Ana menü"
          className="hidden items-center gap-x-5 text-sm text-ink lg:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-x-3 lg:flex">
          <Link
            to={araLink}
            aria-label="Ara"
            className="inline-flex items-center text-ink transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <Search size={18} aria-hidden="true" />
          </Link>

          {/* authLoading sırasında girişsiz butonlar flash etmesin diye boş bırakılır. */}
          {!authLoading && user && (
            <div ref={hesapMenuRef} className="relative">
              <button
                type="button"
                ref={hesapTetikRef}
                onClick={() => setHesapMenuAcik((onceki) => !onceki)}
                aria-expanded={hesapMenuAcik}
                aria-controls="hesap-menu"
                aria-label="Hesap menüsü"
                className="inline-flex items-center rounded-sm border border-ink/15 p-2 text-ink transition-colors hover:border-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <CircleUser size={20} aria-hidden="true" />
              </button>

              {hesapMenuAcik && (
                <div
                  id="hesap-menu"
                  className="absolute right-0 top-full mt-2 w-48 rounded-sm border border-ink/10 bg-paper py-2 shadow-lg"
                >
                  <Link
                    to="/favoriler"
                    onClick={() => setHesapMenuAcik(false)}
                    className="block px-4 py-2 text-sm text-ink transition-colors hover:text-brand focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand"
                  >
                    Favorilerim
                  </Link>

                  <button
                    type="button"
                    onClick={cikisYap}
                    className="block w-full px-4 py-2 text-left text-sm text-ink transition-colors hover:text-brand focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand"
                  >
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          )}

          {!authLoading && !user && (
            <>
              <Button to="/giris" variant="secondary" size="sm">
                Giriş Yap
              </Button>

              <Button to="/uye-ol" variant="secondary" size="sm">
                Üye Ol
              </Button>
            </>
          )}

          <Button to="/basvuru" size="sm">
            İşletmeni Ekle
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((onceki) => !onceki)}
          aria-expanded={menuOpen}
          aria-controls="mobil-menu"
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          className="inline-flex items-center rounded-sm border border-ink/15 p-2 text-ink transition-colors hover:border-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:hidden"
        >
          {menuOpen ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <Menu size={22} aria-hidden="true" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobil-menu"
          className="border-t border-ink/10 bg-paper px-6 py-5 lg:hidden"
        >
          <nav
            aria-label="Mobil menü"
            className="flex flex-col gap-1 text-ink"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={kapat}
                className="rounded-sm py-2 transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                {link.label}
              </Link>
            ))}

            <Link
              to={araLink}
              onClick={kapat}
              className="inline-flex items-center gap-1.5 rounded-sm py-2 transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <Search size={18} aria-hidden="true" />
              Ara
            </Link>

            {!authLoading && user && (
              <>
                <Link
                  to="/favoriler"
                  onClick={kapat}
                  className="rounded-sm py-2 transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  Favorilerim
                </Link>

                <button
                  type="button"
                  onClick={cikisYap}
                  className="rounded-sm py-2 text-left transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  Çıkış Yap
                </button>
              </>
            )}

            {!authLoading && !user && (
              <Link
                to="/giris"
                onClick={kapat}
                className="rounded-sm py-2 transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Giriş Yap
              </Link>
            )}

            <div className="mt-3 flex flex-col gap-3">
              {!authLoading && !user && (
                <Button to="/uye-ol" variant="secondary" onClick={kapat}>
                  Üye Ol
                </Button>
              )}

              <Button to="/basvuru" onClick={kapat}>
                İşletmeni Ekle
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
