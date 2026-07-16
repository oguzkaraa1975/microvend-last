import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import Button from "../ui/Button";

type FavoriteDialogProps = {
  open: boolean;
  onClose: () => void;
  /** Giriş/üyelik sonrası dönülecek uygulama içi path (örn. işletme profili). */
  from: string;
};

function FavoriteDialog({ open, onClose, from }: FavoriteDialogProps) {
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    actionsRef.current?.querySelector("a")?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="favorite-dialog-title"
        aria-describedby="favorite-dialog-description"
        className="relative w-full max-w-sm rounded-sm bg-paper p-6 shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Kapat"
          className="absolute right-4 top-4 text-muted transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <h2
          id="favorite-dialog-title"
          className="mb-3 pr-8 font-display text-xl text-ink"
        >
          Ücretsiz üyelik gerekiyor
        </h2>

        <p id="favorite-dialog-description" className="mb-6 text-sm leading-6 text-muted">
          Favorilere eklemek için ücretsiz üyelik gerekiyor.
        </p>

        <div ref={actionsRef} className="flex flex-col gap-3 sm:flex-row">
          <Button to="/uye-ol" state={{ from }} onClick={onClose} className="flex-1">
            Ücretsiz Üye Ol
          </Button>
          <Button
            to="/giris"
            state={{ from }}
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Giriş Yap
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FavoriteDialog;
