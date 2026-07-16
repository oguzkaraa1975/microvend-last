import type { ReactNode } from "react";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
};

// Giriş / üye ol / şifre sıfırlama sayfalarının ortak dar kabuğu.
function AuthShell({ eyebrow, title, description, children }: AuthShellProps) {
  return (
    <div className="mx-auto max-w-md px-6 py-20 md:py-28">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-clay">
        {eyebrow}
      </p>

      <h1 className="mb-4 font-display text-4xl tracking-tight text-ink">
        {title}
      </h1>

      {description && (
        <p className="mb-8 leading-7 text-muted">{description}</p>
      )}

      <div className="rounded-md border border-ink/10 bg-white p-8">
        {children}
      </div>
    </div>
  );
}

export default AuthShell;
