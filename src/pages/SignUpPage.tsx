import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
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

const emailGecerliMi = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function SignUpPage() {
  usePageTitle(
    "Üye Ol | Microvend",
    "Microvend'e üye ol; favori işletmelerini kaydet, mikro işletmeleri takip et."
  );

  const { user, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [hataMesaji, setHataMesaji] = useState("");
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [kayitAlindi, setKayitAlindi] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setHataMesaji("E-posta alanı zorunludur.");
      return;
    }

    if (!emailGecerliMi(email.trim())) {
      setHataMesaji("Geçerli bir e-posta adresi girin.");
      return;
    }

    if (sifre.length < 8) {
      setHataMesaji("Şifre en az 8 karakter olmalıdır.");
      return;
    }

    if (!supabase) {
      setHataMesaji(
        "Üyelik şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin."
      );
      return;
    }

    if (TURNSTILE_SITE_KEY && !captchaToken) {
      setHataMesaji("Lütfen güvenlik doğrulamasını tamamla.");
      return;
    }

    setGonderiliyor(true);
    setHataMesaji("");

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password: sifre,
      options: {
        emailRedirectTo: `${window.location.origin}/giris?dogrulandi=1`,
        captchaToken: captchaToken || undefined,
      },
    });

    turnstileRef.current?.reset();
    setCaptchaToken("");

    if (error) {
      // Adresin kayıtlı olup olmadığını açığa çıkarmayan genel mesajlar.
      setHataMesaji(
        error.code === "over_email_send_rate_limit"
          ? "Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar dene."
          : error.code === "weak_password"
            ? "Şifre yeterince güçlü değil. En az 8 karakter kullan."
            : "Kayıt şu anda tamamlanamadı. Lütfen daha sonra tekrar deneyin."
      );
      setGonderiliyor(false);
      return;
    }

    setKayitAlindi(true);
    setGonderiliyor(false);
  }

  if (authLoading) {
    return (
      <AuthShell eyebrow="Üye Ol" title="Üyelik">
        <p role="status" className="text-muted">
          Oturum durumu kontrol ediliyor…
        </p>
      </AuthShell>
    );
  }

  if (user) {
    return (
      <AuthShell
        eyebrow="Üye Ol"
        title="Oturumun açık."
        description="Bu cihazda zaten giriş yapmış durumdasın; yeni bir üyelik oluşturman gerekmiyor."
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

  if (kayitAlindi) {
    return (
      <AuthShell
        eyebrow="Üye Ol"
        title="E-postanı kontrol et."
        description="Kayıt isteğin alındı. Adresine gönderilen doğrulama bağlantısına tıkladıktan sonra giriş yapabilirsin."
      >
        <FormMessage tone="info" className="mb-6">
          Doğrulama bağlantısı e-posta adresine gönderildi.
        </FormMessage>

        <Button to="/giris" variant="secondary" className="w-full">
          Giriş sayfasına dön
        </Button>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="Üye Ol"
      title="Ücretsiz üye ol."
      description="Üyelik tamamen ücretsiz. Beğendiğin işletmeleri favorilerine ekle, daha sonra kolayca bul."
    >
      <form className="grid gap-6" onSubmit={handleSubmit} noValidate>
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
          autoComplete="new-password"
          value={sifre}
          onChange={(deger) => {
            setSifre(deger);
            setHataMesaji("");
          }}
          hint="En az 8 karakter."
        />

        <TurnstileWidget ref={turnstileRef} onToken={setCaptchaToken} />

        {hataMesaji && <FormMessage tone="error">{hataMesaji}</FormMessage>}

        <Button type="submit" disabled={gonderiliyor}>
          {gonderiliyor ? "Kayıt gönderiliyor…" : "Ücretsiz Üye Ol"}
        </Button>

        <p className="border-t border-ink/10 pt-5 text-sm text-muted">
          Zaten hesabın var mı?{" "}
          <Link
            to="/giris"
            className="text-brand transition hover:text-brand-dark"
          >
            Giriş yap
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export default SignUpPage;
