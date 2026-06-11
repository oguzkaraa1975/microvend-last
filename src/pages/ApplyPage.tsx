function ApplyPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#4e7bab]">
          Satıcı Başvurusu
        </p>

        <h1 className="mb-6 text-5xl font-semibold tracking-tight">
          Microvend'e katılın.
        </h1>

        <p className="text-lg leading-8 text-gray-600">
          Küçük işletmenizi veya bağımsız markanızı platformda sergilemek için
          başvuru formunu doldurun.
        </p>
      </div>

      <div className="rounded-[2rem] border border-gray-200 bg-white p-8 md:p-10">
        <form className="grid gap-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                İşletme Adı
              </label>

              <input
                type="text"
                placeholder="Örn: Luna Atölye"
                className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none transition focus:border-[#4e7bab]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Yetkili Kişi
              </label>

              <input
                type="text"
                placeholder="Ad Soyad"
                className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none transition focus:border-[#4e7bab]"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                E-Posta
              </label>

              <input
                type="email"
                placeholder="ornek@mail.com"
                className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none transition focus:border-[#4e7bab]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Telefon
              </label>

              <input
                type="text"
                placeholder="+90..."
                className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none transition focus:border-[#4e7bab]"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Kategori
              </label>

              <select className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none transition focus:border-[#4e7bab]">
                <option>Kategori seçin</option>
                <option>El Yapımı</option>
                <option>Ev Dekorasyonu</option>
                <option>Moda</option>
                <option>Takı</option>
                <option>Organik Ürünler</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Şehir
              </label>

              <input
                type="text"
                placeholder="İstanbul"
                className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none transition focus:border-[#4e7bab]"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Website / Instagram
            </label>

            <input
              type="text"
              placeholder="https://"
              className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none transition focus:border-[#4e7bab]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Kısa Açıklama
            </label>

            <textarea
              rows={5}
              placeholder="İşletmenizi ve ürünlerinizi kısaca anlatın..."
              className="w-full rounded-2xl border border-gray-300 px-4 py-4 outline-none transition focus:border-[#4e7bab]"
            />
          </div>

          <div className="flex flex-col gap-4 border-t border-gray-100 pt-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-sm leading-6 text-gray-500">
              Başvurular editör incelemesinden sonra yayınlanır. Microvend bir
              pazaryeri değildir; satış ve ödeme işlemleri platform dışında
              gerçekleşir.
            </p>

            <button className="rounded-2xl bg-[#4e7bab] px-8 py-4 text-white transition hover:opacity-90">
              Başvuruyu Gönder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyPage;