import Button from "./ui/Button";

function CTA() {
  return (
    <section className="bg-brand text-paper">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <h2 className="max-w-xs font-display text-2xl leading-tight tracking-tight sm:text-3xl">
          İşletmen görünür olmayı hak ediyor.
        </h2>

        <p className="max-w-sm leading-7 text-paper/80 lg:border-l lg:border-paper/25 lg:pl-10">
          Temel profil ücretsiz. Komisyon yok.
          <br />
          Daha fazla kişiye ulaş, emeğini paylaş.
        </p>

        <Button to="/basvuru" variant="inverted" className="w-fit shrink-0">
          İşletmeni Ekle
        </Button>
      </div>
    </section>
  );
}

export default CTA;
