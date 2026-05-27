import type { ReactNode } from "react";

type BadgeTone = "gold" | "red" | "green" | "muted" | "gunmetal";
type BadgeSize = "sm" | "md";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  size?: BadgeSize;
  className?: string;
};

const toneClasses: Record<BadgeTone, string> = {
  gold: "border-case-border-gold bg-case-gold/10 text-case-gold",
  red: "border-case-red/45 bg-case-red/10 text-case-red-soft",
  green: "border-case-green/40 bg-case-green/10 text-case-green",
  muted: "border-case-border bg-black/35 text-case-muted",
  gunmetal: "border-case-border bg-case-gunmetal text-case-muted",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-2 text-sm",
};

const cx = (...classes: Array<string | false | undefined>) => {
  return classes.filter(Boolean).join(" ");
};

export default function Badge({
  children,
  tone = "muted",
  size = "sm",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center justify-center rounded-full border font-black uppercase tracking-[0.16em]",
        toneClasses[tone],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </span>
  );
}