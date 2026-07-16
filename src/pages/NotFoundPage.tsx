import Button from "../components/ui/Button";
import usePageTitle from "../hooks/usePageTitle";

function NotFoundPage() {
  usePageTitle(
    "Sayfa bulunamadı | Microvend",
    "Aradığınız sayfa bulunamadı."
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-clay">
          404
        </p>

        <h1 className="mb-6 font-display text-5xl tracking-tight text-ink">
          Sayfa bulunamadı.
        </h1>

        <p className="mb-8 text-lg leading-8 text-muted">
          Aradığınız sayfa taşınmış, kaldırılmış veya hiç oluşturulmamış
          olabilir.
        </p>

        <div className="flex flex-wrap gap-4">
          <Button to="/">Ana sayfaya dön</Button>
          <Button to="/kesfet" variant="secondary">
            İşletmeleri gör
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
