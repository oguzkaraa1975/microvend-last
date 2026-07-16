// Env eksikse undefined: widget render edilmez, formlar captcha istemeden çalışır
// (Supabase panelinde Turnstile açılana kadar mevcut davranış korunur).
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as
  | string
  | undefined;
