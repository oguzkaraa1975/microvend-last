import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/ui/Button";
import AuthShell from "../components/auth/AuthShell";
import FormField from "../components/ui/FormField";
import FormMessage from "../components/ui/FormMessage";
import TurnstileWidget from "../components/auth/TurnstileWidget";
import type { TurnstileWidgetHandle } from "../components/auth/TurnstileWidget";
import { supabase } from "../lib/supabase";
import { TURNSTILE_SITE_KEY } from "../lib/turnstile";
import { useAuth } from "../auth/AuthContext";
import usePageTitle from "../hooks/usePageTitle";

// Yalnız uygulama içi güvenli path kabul edilir ("//host" ve tam URL'ler elenir).
function guvenliDonusYolu(aday: unknown): string {
  if (typeof aday === "string" && aday.startsWith("/") && !aday.startsWith("//")) {
    return aday;
  }
  return "/";
}

function LoginPage() {
  usePageTitle(
    "Giriş Yap | Microvend",
    "Microvend hesabına giriş yap; favori işletmelerine ve hesap ayarlarına eriş."
  );

  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [hataMesaji, setHataMesaji] = useState("");
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  const donusYolu = guvenliDonusYolu(
    (location.state as { from?: unknown } | null)?.from
  );

  const dogrulandi = searchParams.has("dogrulandi");

  const bilgiMesaji = dogrulandi
    ? "E-posta adresin doğrulandı."
    : searchParams.has("sifre-guncellendi")
      ? "Şifren güncellendi. Yeni şifrenle giriş yapabilirsin."
      : "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !sifre) {
      setHataMesaji("E-posta ve şifre alanları zorunludur.");
      return;
    }

    if (!supabase) {
      setHataMesaji(
        "Giriş şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin."
      );
      return;
    }

    if (TURNSTILE_SITE_KEY && !captchaToken) {
      setHataMesaji("Lütfen güvenlik doğrulamasını tamamla.");
      return;
    }

    setGonderiliyor(true);
    setHataMesaji("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: sifre,
      options: { captchaToken: captchaToken || undefined },
    });

    turnstileRef.current?.reset();
    setCaptchaToken("");

    if (error) {
      if (error.code === "email_not_confirmed") {
        setHataMesaji(
          "Giriş için önce e-posta adresini doğrulaman gerekiyor. Gelen kutundaki doğrulama bağlantısını kontrol et."
        );
      } else if (error.code === "invalid_credentials") {
        setHataMesaji("E-posta veya şifre hatalı.");
      } else {
        setHataMesaji("Giriş yapılamadı. Lütfen daha sonra tekrar deneyin.");
      }
      setGonderiliyor(false);
      return;
    }

    navigate(donusYolu, { replace: true });
  }

  if (authLoading) {
    return (
      <AuthShell eyebrow="Giriş Yap" title="Giriş">
        <p role="status" className="text-muted">
          Oturum durumu kontrol ediliyor…
        </p>
      </AuthShell>
    );
  }

  // Doğrulama bağlantısından gelindiğinde oturum çoktan açılmış olabilir:
  // login formu tekrar gösterilmez.
  if (user) {
    return (
      <AuthShell
        eyebrow="Giriş Yap"
        title="Oturumun açık."
        description={
          dogrulandi
            ? "E-posta adresin doğrulandı ve oturumun açıldı. Artık işletmeleri favorilerine ekleyebilirsin."
            : "Bu cihazda zaten giriş yapmış durumdasın."
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/kesfet" className="flex-1">
            İşletmeleri keşfet
          </Button>
          <Button to="/favoriler" variant="secondary" className="flex-1">
            Favorilerim
          </Button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="Giriş Yap"
      title="Tekrar hoş geldin."
      description="Microvend hesabınla giriş yap; favori işletmelerin seni bekliyor."
    >
      <form className="grid gap-6" onSubmit={handleSubmit} noValidate>
        {bilgiMesaji && <FormMessage tone="info">{bilgiMesaji}</FormMessage>}

        <FormField
          id="email"
          label="E-Posta"
          required
          type="email"
          autoComplete="email"
          value={email}
          onChange={(deger) => {
            setEmail(deger);
            setHataMesaji("");
          }}
          placeholder="ornek@mail.com"
        />

        <FormField
          id="sifre"
          label="Şifre"
          required
          type="password"
          autoComplete="current-password"
          value={sifre}
          onChange={(deger) => {
            setSifre(deger);
            setHataMesaji("");
          }}
        />

        <TurnstileWidget ref={turnstileRef} onToken={setCaptchaToken} />

        {hataMesaji && <FormMessage tone="error">{hataMesaji}</FormMessage>}

        <Button type="submit" disabled={gonderiliyor}>
          {gonderiliyor ? "Giriş yapılıyor…" : "Giriş Yap"}
        </Button>

        <div className="flex flex-col gap-2 border-t border-ink/10 pt-5 text-sm text-muted">
          <Link
            to="/sifre-sifirlama"
            className="text-brand transition hover:text-brand-dark"
          >
            Şifreni mi unuttun?
          </Link>

          <p>
            Hesabın yok mu?{" "}
            <Link
              to="/uye-ol"
              state={{ from: donusYolu }}
              className="text-brand transition hover:text-brand-dark"
            >
              Ücretsiz üye ol
            </Link>
          </p>
        </div>
      </form>
    </AuthShell>
  );
}

export default LoginPage;
