import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/ui/Button";
import AuthShell from "../components/auth/AuthShell";
import FormField from "../components/ui/FormField";
import FormMessage from "../components/ui/FormMessage";
import { supabase } from "../lib/supabase";
import { useAuth } from "../auth/AuthContext";
import usePageTitle from "../hooks/usePageTitle";

const emailGecerliMi = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Recovery e-postasındaki bağlantı bu adrese döner; supabase-js token'ı işleyip
// oturumu açar, form updateUser ile şifreyi değiştirir.
function PasswordResetPage() {
  usePageTitle(
    "Şifre Sıfırlama | Microvend",
    "Microvend hesabının şifresini e-posta ile sıfırla."
  );

  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const guncellemeModu = searchParams.get("mode") === "update";

  const [email, setEmail] = useState("");
  const [yeniSifre, setYeniSifre] = useState("");
  const [hataMesaji, setHataMesaji] = useState("");
  const [bilgiMesaji, setBilgiMesaji] = useState("");
  const [gonderiliyor, setGonderiliyor] = useState(false);

  async function baglantiIste(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !emailGecerliMi(email.trim())) {
      setHataMesaji("Geçerli bir e-posta adresi girin.");
      return;
    }

    if (!supabase) {
      setHataMesaji(
        "Şifre sıfırlama şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin."
      );
      return;
    }

    setGonderiliyor(true);
    setHataMesaji("");
    setBilgiMesaji("");

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/sifre-sifirlama?mode=update`,
    });

    if (error) {
      setHataMesaji(
        error.code === "over_email_send_rate_limit"
          ? "Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar dene."
          : "İstek şu anda gönderilemedi. Lütfen daha sonra tekrar deneyin."
      );
      setGonderiliyor(false);
      return;
    }

    // Adresin kayıtlı olup olmadığını açığa çıkarmayan tek tip mesaj.
    setBilgiMesaji(
      "Eğer bu adresle bir hesap varsa, şifre sıfırlama bağlantısı e-postana gönderildi."
    );
    setGonderiliyor(false);
  }

  async function sifreyiGuncelle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (yeniSifre.length < 8) {
      setHataMesaji("Şifre en az 8 karakter olmalıdır.");
      return;
    }

    if (!supabase) {
      setHataMesaji(
        "Şifre güncelleme şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin."
      );
      return;
    }

    setGonderiliyor(true);
    setHataMesaji("");

    const { error } = await supabase.auth.updateUser({ password: yeniSifre });

    if (error) {
      setHataMesaji(
        error.code === "same_password"
          ? "Yeni şifre, eski şifrenle aynı olamaz."
          : error.code === "weak_password"
            ? "Şifre yeterince güçlü değil. En az 8 karakter kullan."
            : "Şifre güncellenemedi. Lütfen daha sonra tekrar deneyin."
      );
      setGonderiliyor(false);
      return;
    }

    // Recovery oturumu kapatılır; kullanıcı yeni şifresiyle bilinçli giriş yapar.
    await signOut();
    navigate("/giris?sifre-guncellendi=1", { replace: true });
  }

  if (guncellemeModu) {
    if (authLoading) {
      return (
        <AuthShell eyebrow="Şifre Sıfırlama" title="Şifre güncelleme">
          <p role="status" className="text-muted">
            Bağlantı doğrulanıyor…
          </p>
        </AuthShell>
      );
    }

    if (!user) {
      return (
        <AuthShell
          eyebrow="Şifre Sıfırlama"
          title="Bağlantı geçersiz."
          description="Şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş. Yeni bir bağlantı isteyebilirsin."
        >
          <Button to="/sifre-sifirlama" className="w-full">
            Yeni bağlantı iste
          </Button>
        </AuthShell>
      );
    }

    return (
      <AuthShell
        eyebrow="Şifre Sıfırlama"
        title="Yeni şifreni belirle."
        description="Hesabın için yeni bir şifre oluştur. Güncelleme sonrası yeni şifrenle giriş yapman istenecek."
      >
        <form className="grid gap-6" onSubmit={sifreyiGuncelle} noValidate>
          <FormField
            id="yeni-sifre"
            label="Yeni Şifre"
            required
            type="password"
            autoComplete="new-password"
            value={yeniSifre}
            onChange={(deger) => {
              setYeniSifre(deger);
              setHataMesaji("");
            }}
            hint="En az 8 karakter."
          />

          {hataMesaji && <FormMessage tone="error">{hataMesaji}</FormMessage>}

          <Button type="submit" disabled={gonderiliyor}>
            {gonderiliyor ? "Güncelleniyor…" : "Şifreyi Güncelle"}
          </Button>
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="Şifre Sıfırlama"
      title="Şifreni sıfırla."
      description="Hesabına bağlı e-posta adresini gir; sana bir sıfırlama bağlantısı gönderelim."
    >
      <form className="grid gap-6" onSubmit={baglantiIste} noValidate>
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

        {hataMesaji && <FormMessage tone="error">{hataMesaji}</FormMessage>}

        <Button type="submit" disabled={gonderiliyor}>
          {gonderiliyor ? "Gönderiliyor…" : "Sıfırlama Bağlantısı Gönder"}
        </Button>

        <p className="border-t border-ink/10 pt-5 text-sm text-muted">
          Şifreni hatırladın mı?{" "}
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

export default PasswordResetPage;
