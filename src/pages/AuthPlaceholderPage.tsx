import Button from "../components/ui/Button";
import usePageTitle from "../hooks/usePageTitle";

type AuthVariant = "giris" | "uye-ol" | "sifre-sifirlama" | "favoriler";

type VariantContent = {
  eyebrow: string;
  title: string;
  description: string;
};

const icerik: Record<AuthVariant, VariantContent> = {
  giris: {
    eyebrow: "Giriş Yap",
    title: "Giriş yakında açılıyor.",
    description:
      "Kullanıcı ve işletme girişi pilot dönemde yakında kullanıma açılacak. Şu an için işletmeleri keşfetmek ve profillere ulaşmak için hesaba ihtiyacın yok.",
  },
  "uye-ol": {
    eyebrow: "Üye Ol",
    title: "Ücretsiz üyelik yakında.",
    description:
      "Ücretsiz kullanıcı üyeliği pilot dönemde açılıyor. Üyelikle beğendiğin işletmeleri favorilerine ekleyip daha sonra kolayca bulabileceksin.",
  },
  "sifre-sifirlama": {
    eyebrow: "Şifre Sıfırlama",
    title: "Şifre sıfırlama yakında.",
    description:
      "Şifre sıfırlama, üyelik sistemi pilot dönemde açıldığında kullanılabilir olacak.",
  },
  favoriler: {
    eyebrow: "Favoriler",
    title: "Favoriler yakında açılıyor.",
    description:
      "Favoriler özelliği, ücretsiz üyelikle birlikte pilot dönemde kullanıma açılacak. O zamana kadar işletmeleri keşfet sayfasından inceleyebilirsin.",
  },
};

type AuthPlaceholderPageProps = {
  variant: AuthVariant;
};

function AuthPlaceholderPage({ variant }: AuthPlaceholderPageProps) {
  const { eyebrow, title, description } = icerik[variant];

  usePageTitle(`${eyebrow} | Microvend`);

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center md:py-28">
      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-clay">
        {eyebrow}
      </p>

      <h1 className="mb-6 font-display text-4xl tracking-tight text-ink sm:text-5xl">
        {title}
      </h1>

      <p className="mx-auto mb-10 max-w-xl text-lg leading-8 text-muted">
        {description}
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Button to="/kesfet">İşletmeleri keşfet</Button>
        <Button to="/basvuru" variant="secondary">
          İşletmeni Ekle
        </Button>
      </div>
    </div>
  );
}

export default AuthPlaceholderPage;
