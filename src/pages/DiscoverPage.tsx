import { useSearchParams } from "react-router-dom";
import DirectoryResults from "../components/directory/DirectoryResults";
import usePageTitle from "../hooks/usePageTitle";

function DiscoverPage() {
  usePageTitle("Keşfet | Microvend");

  const [searchParams] = useSearchParams();
  const odakAra = searchParams.get("odak") === "ara";

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-clay">
          Keşfet
        </p>

        <h1 className="mb-6 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Bağımsız işletmeleri keşfet.
        </h1>

        <p className="text-lg leading-8 text-muted">
          Türkiye'nin dört bir yanından üreticileri ve mikro işletmeleri
          arama, kategori, şehir ve gönderim kapsamına göre keşfet.
        </p>
      </div>

      <DirectoryResults autoFocusSearch={odakAra} />
    </div>
  );
}

export default DiscoverPage;
