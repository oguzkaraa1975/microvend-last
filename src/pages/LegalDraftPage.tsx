import usePageTitle from "../hooks/usePageTitle";

type LegalVariant = "gizlilik" | "kullanim-kosullari";

type VariantContent = {
  title: string;
  intro: string;
};

const icerik: Record<LegalVariant, VariantContent> = {
  gizlilik: {
    title: "Gizlilik Politikası",
    intro:
      "Bu sayfa, Microvend'in kişisel verileri nasıl işlediğini açıklayan gizlilik politikasının hazırlık metnidir.",
  },
  "kullanim-kosullari": {
    title: "Kullanım Koşulları",
    intro:
      "Bu sayfa, Microvend'in kullanım koşullarının hazırlık metnidir.",
  },
};

type LegalDraftPageProps = {
  variant: LegalVariant;
};

function LegalDraftPage({ variant }: LegalDraftPageProps) {
  const { title, intro } = icerik[variant];

  usePageTitle(`${title} (Taslak) | Microvend`);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <span className="mb-6 inline-flex w-fit items-center rounded-sm border border-clay/50 px-2 py-1 text-xs font-medium uppercase tracking-widest text-clay">
        Taslak
      </span>

      <h1 className="mb-6 font-display text-4xl tracking-tight text-ink sm:text-5xl">
        {title}
      </h1>

      <p className="text-lg leading-8 text-muted">{intro}</p>

      <div className="mt-10 border-t border-ink/10 pt-8">
        <p className="leading-8 text-muted">
          Bu metin henüz taslaktır ve nihai hukuki metin sayılmaz. Veri işleme
          süreçleri, altyapı (veritabanı) kararları, analitik ve çerez
          tercihleri kesinleşmeden yayına alınmayacaktır. Nihai metin, public
          pilot öncesinde bu sayfada paylaşılacaktır.
        </p>
      </div>
    </div>
  );
}

export default LegalDraftPage;
