import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="rounded-[2rem] bg-[#4e7bab] px-6 py-12 text-white md:px-10 md:py-16">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-blue-100">
            Microvend'e Katılın
          </p>

          <h3 className="mb-6 text-2xl font-light leading-tight sm:text-3xl md:text-4xl">
            Komisyon ödemeden görünürlüğünüzü artırın.
          </h3>

          <p className="mb-8 text-lg leading-8 text-blue-50">
            Kendi dijital vitrininizi oluşturun, ürünlerinizi sergileyin ve
            müşterileri kendi satış kanallarınıza yönlendirin.
          </p>

          <Link
            to="/basvuru"
            className="inline-block rounded-2xl bg-white px-7 py-4 text-[#4e7bab] transition hover:bg-gray-100"
          >
            Hemen Başvur
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTA;
