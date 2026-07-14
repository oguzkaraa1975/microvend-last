import Button from "../components/ui/Button";
import usePageTitle from "../hooks/usePageTitle";

function ContactPage() {
  usePageTitle("İletişim | Microvend");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-clay">
        İletişim
      </p>

      <h1 className="mb-6 font-display text-4xl tracking-tight text-ink sm:text-5xl">
        İletişim
      </h1>

      <p className="text-lg leading-8 text-muted">
        Microvend, bağımsız üreticileri ve küçük işletmeleri kullanıcılarla
        buluşturan açık bir keşif rehberidir. Görüş, öneri ve sorularını
        paylaşmak istersen aşağıdaki bilgiler yardımcı olur.
      </p>

      <section className="mt-12 border-t border-ink/10 pt-10">
        <h2 className="mb-3 font-display text-2xl text-ink">
          Kullanıcılar için
        </h2>

        <p className="leading-8 text-muted">
          Bir işletmeyle ilgili bilgi almak veya alışveriş yapmak için ilgili
          işletmenin profilindeki kendi kanallarını (web sitesi, Instagram,
          WhatsApp) kullanabilirsin. Microvend üzerinden satış veya sipariş
          alınmaz; işletmelerle iletişim doğrudan kendi kanalları üzerinden
          kurulur.
        </p>
      </section>

      <section className="mt-10 border-t border-ink/10 pt-10">
        <h2 className="mb-3 font-display text-2xl text-ink">
          Mikro işletmeler için
        </h2>

        <p className="mb-6 leading-8 text-muted">
          İşletmeni Microvend rehberine eklemek istiyorsan başvuru formunu
          kullanabilirsin. Temel profil ücretsizdir.
        </p>

        <Button to="/basvuru">İşletmeni Ekle</Button>
      </section>

      <section className="mt-10 border-t border-ink/10 pt-10">
        <h2 className="mb-3 font-display text-2xl text-ink">
          Genel iletişim
        </h2>

        <p className="leading-8 text-muted">
          Genel iletişim e-posta adresimiz, alan adı yayına alındığında bu
          sayfada paylaşılacaktır. Şu an pilot dönemde olduğumuz için işletme
          başvuruları ve iletişim, yukarıdaki başvuru formu üzerinden
          yürütülmektedir.
        </p>
      </section>
    </div>
  );
}

export default ContactPage;
