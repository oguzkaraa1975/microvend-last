import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

function NotFoundPage() {
  usePageTitle("Sayfa bulunamadı | Microvend");

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#4e7bab]">
          404
        </p>

        <h1 className="mb-6 text-5xl font-light tracking-tight text-gray-900">
          Sayfa bulunamadı.
        </h1>

        <p className="mb-8 text-lg font-light leading-8 text-gray-600">
          Aradığınız sayfa taşınmış, kaldırılmış veya hiç oluşturulmamış
          olabilir.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/"
            className="rounded-2xl bg-[#4e7bab] px-7 py-4 text-sm text-white transition hover:bg-[#6b91b9]"
          >
            Ana sayfaya dön
          </Link>

          <Link
            to="/saticilar"
            className="rounded-2xl border border-[#dbe7f2] bg-white px-7 py-4 text-sm text-[#4e7bab] transition hover:bg-[#edf3fa]"
          >
            Satıcıları gör
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
