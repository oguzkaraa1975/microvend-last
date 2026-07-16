import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import FormMessage from "../ui/FormMessage";
import { TURNSTILE_SITE_KEY } from "../../lib/turnstile";

type RenderOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: RenderOptions) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise: Promise<void> | null = null;

function turnstileScriptYukle(): Promise<void> {
  if (window.turnstile) {
    return Promise.resolve();
  }

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Turnstile script yüklenemedi"));
      document.head.appendChild(script);
    });
  }

  return scriptPromise;
}

export type TurnstileWidgetHandle = {
  reset: () => void;
};

type TurnstileWidgetProps = {
  onToken: (token: string) => void;
};

// captchaToken yokken form gönderimi engellenir; sayfalar bunu bu widget'ın
// varlığına (TURNSTILE_SITE_KEY tanımlı mı) bakarak kontrol eder.
const TurnstileWidget = forwardRef<TurnstileWidgetHandle, TurnstileWidgetProps>(
  function TurnstileWidget({ onToken }, ref) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const widgetIdRef = useRef<string | undefined>(undefined);
    const [durum, setDurum] = useState<"yukleniyor" | "hazir" | "hata">(
      "yukleniyor"
    );

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
      },
    }));

    useEffect(() => {
      const siteKey = TURNSTILE_SITE_KEY;

      if (!siteKey) {
        return;
      }

      let iptal = false;

      turnstileScriptYukle()
        .then(() => {
          if (iptal || !containerRef.current || !window.turnstile) {
            return;
          }

          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token) => {
              setDurum("hazir");
              onToken(token);
            },
            "error-callback": () => {
              setDurum("hata");
              onToken("");
            },
            "expired-callback": () => {
              onToken("");
            },
          });
        })
        .catch(() => {
          if (!iptal) {
            setDurum("hata");
          }
        });

      return () => {
        iptal = true;
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
        }
      };
    }, [onToken]);

    if (!TURNSTILE_SITE_KEY) {
      return null;
    }

    return (
      <div>
        <div ref={containerRef} />

        {durum === "yukleniyor" && (
          <p role="status" className="text-sm text-muted">
            Güvenlik doğrulaması yükleniyor…
          </p>
        )}

        {durum === "hata" && (
          <FormMessage tone="error">
            Güvenlik doğrulaması yüklenemedi. Sayfayı yenileyip tekrar dene.
          </FormMessage>
        )}
      </div>
    );
  }
);

export default TurnstileWidget;
