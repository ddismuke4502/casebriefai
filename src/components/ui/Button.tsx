import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant = "signal" | "redline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type SharedButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

type ButtonProps = SharedButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

type LinkButtonProps = SharedButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const variantClasses: Record<ButtonVariant, string> = {
  signal: "signal-button font-black",
  redline: "redline-button font-bold",
  ghost:
    "border border-case-border bg-black/30 text-case-muted transition hover:border-case-border-gold hover:text-case-gold",
  danger:
    "border border-case-red/45 bg-case-red/10 text-case-red-soft transition hover:border-case-red-soft hover:bg-case-red/15",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3 text-base",
};

const cx = (...classes: Array<string | false | undefined>) => {
  return classes.filter(Boolean).join(" ");
};

export function Button({
  children,
  variant = "signal",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-full disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  variant = "signal",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-full",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}