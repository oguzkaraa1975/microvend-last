function Pricing() {
  const paketler = [
    {
      ad: "Gümüş",
      fiyat: "$10",
      aciklama: "Ayda 1 dijital vitrin yayını",
      ozellikler: ["Satıcı profili", "1 vitrin yayını", "Kategori görünürlüğü"],
    },
    {
      ad: "Altın",
      fiyat: "$25",
      aciklama: "Haftada 1 dijital vitrin yayını",
      ozellikler: [
        "Satıcı profili",
        "Haftalık vitrin yayını",
        "Öne çıkarılma fırsatı",
      ],
    },
    {
      ad: "Premium",
      fiyat: "$100",
      aciklama: "Sınırsız vitrin yayını ve yüksek görünürlük",
      ozellikler: [
        "Sınırsız vitrin yayını",
        "Ana sayfada görünürlük",
        "Kategori içi öncelik",
      ],
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#4e7bab]">
          Ücretlendirme
        </p>

        <h3 className="text-4xl font-semibold tracking-tight">
          Küçük işletmeler için sade ve erişilebilir paketler.
        </h3>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {paketler.map((paket) => (
          <div
            key={paket.ad}
            className="rounded-3xl border border-gray-200 bg-white p-7"
          >
            <h4 className="mb-3 text-2xl font-semibold">{paket.ad}</h4>

            <div className="mb-4 flex items-end gap-2">
              <span className="text-5xl font-semibold">{paket.fiyat}</span>
              <span className="pb-2 text-gray-500">/ ay</span>
            </div>

            <p className="mb-7 leading-7 text-gray-600">{paket.aciklama}</p>

            <ul className="mb-8 space-y-3 text-gray-700">
              {paket.ozellikler.map((ozellik) => (
                <li key={ozellik}>• {ozellik}</li>
              ))}
            </ul>

            <button className="w-full rounded-2xl border border-gray-300 px-5 py-3 text-sm transition hover:bg-gray-100">
              Paketi İncele
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;