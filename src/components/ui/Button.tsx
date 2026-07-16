import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverted";
type ButtonSize = "sm" | "md";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  to?: string;
  /** to ile birlikte react-router Link state'i (örn. giriş sonrası dönüş yolu). */
  state?: unknown;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-sm text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2",
  md: "px-5 py-3",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand text-paper hover:bg-brand-dark",
  secondary: "border border-ink/20 text-ink hover:border-ink/40",
  ghost: "text-ink underline-offset-4 hover:text-brand",
  // koyu/brand zemin üzerinde birincil eylem
  inverted: "bg-paper text-brand hover:bg-paper/90",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  state,
  href,
  target,
  rel,
  type = "button",
  onClick,
  disabled,
  className = "",
}: ButtonProps) {
  const classes =
    `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} state={state} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

export default Button;
