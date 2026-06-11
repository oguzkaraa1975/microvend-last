function HowItWorks() {
  const adimlar = [
    {
      baslik: "Satıcılar dijital vitrin oluşturur",
      aciklama:
        "Küçük işletmeler ürünlerini, markalarını ve satış kanallarını tanıtan sade bir profil sayfası oluşturur.",
    },
    {
      baslik: "Kullanıcılar kategorilere göre keşfeder",
      aciklama:
        "Ziyaretçiler kategorilere, şehirlere ve ürün alanlarına göre bağımsız satıcıları kolayca inceler.",
    },
    {
      baslik: "Satış satıcının kendi kanalında yapılır",
      aciklama:
        "Microvend ödeme almaz, komisyon kesmez; kullanıcıyı satıcının web sitesine veya iletişim kanalına yönlendirir.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="rounded-[2.5rem] bg-[#edf3fa] px-10 py-16 md:px-14 md:py-20">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#4e7bab]">
            Nasıl Çalışır?
          </p>

          <h2 className="mb-6 text-5xl font-light leading-tight tracking-tight text-gray-900">
            Komisyonsuz, sade ve şeffaf model.
          </h2>

          <p className="font-light leading-8 text-gray-600">
            Microvend klasik bir pazaryeri değildir. Satış sürecini kendi
            üzerinde tutmaz; küçük işletmeler için görünürlük ve yönlendirme
            katmanı olarak çalışır.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {adimlar.map((adim, index) => (
            <div
              key={adim.baslik}
              className="flex h-full flex-col rounded-[2rem] border border-[#dbe7f2] bg-white p-8 shadow-[0_8px_30px_rgba(78,123,171,0.05)]"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf3fa] text-sm text-[#4e7bab]">
                {index + 1}
              </div>

              <h3 className="mb-5 text-2xl font-light leading-tight text-gray-900">
                {adim.baslik}
              </h3>

              <p className="font-light leading-7 text-gray-600">
                {adim.aciklama}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;