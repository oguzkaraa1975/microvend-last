import { Link } from "react-router-dom";
import { categories } from "../data/mockData";

type FooterLink = { to: string; label: string };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Keşfet",
    links: [
      { to: "/kesfet", label: "Tüm işletmeler" },
      { to: "/kesfet?yeni=1", label: "Yeni katılanlar" },
      { to: "/seckiler", label: "Seçkiler" },
    ],
  },
  {
    title: "Kategoriler",
    links: categories.map((kategori) => ({
      to: `/kategoriler/${kategori.slug}`,
      label: kategori.name,
    })),
  },
  {
    title: "Hakkımızda",
    links: [
      { to: "/hakkimizda", label: "Hakkımızda" },
      { to: "/iletisim", label: "İletişim" },
      { to: "/ucretlendirme", label: "Ücretlendirme" },
    ],
  },
  {
    title: "Kaynaklar",
    links: [
      { to: "/basvuru", label: "İşletmeni Ekle" },
      { to: "/seckiler", label: "Seçkiler" },
    ],
  },
  {
    title: "Yasal",
    links: [
      { to: "/gizlilik", label: "Gizlilik Politikası" },
      { to: "/kullanim-kosullari", label: "Kullanım Koşulları" },
    ],
  },
];

function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_3.5fr]">
          <div>
            <Link
              to="/"
              className="font-display text-2xl tracking-tight text-ink transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              microvend
            </Link>

            <p className="mt-4 max-w-xs leading-7 text-muted">
              Bağımsız üreticileri ve küçük işletmeleri buluşturan açık keşif
              rehberi.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="mb-4 text-sm font-medium text-ink">
                  {column.title}
                </p>

                <ul className="flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-muted transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ink/10 pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 microvend</p>

          <p>Komisyonsuz keşif rehberi. Microvend üzerinden satış yapılmaz.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
