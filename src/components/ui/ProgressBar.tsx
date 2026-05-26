type ProgressTone = "gold" | "red" | "green";

type ProgressBarProps = {
  value: number;
  label?: string;
  showValue?: boolean;
  tone?: ProgressTone;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const heightMap = {
  sm: "h-2",
  md: "h-3",
  lg: "h-4",
};

const toneMap: Record<ProgressTone, string> = {
  gold: "from-case-gold-soft via-case-gold to-case-amber",
  red: "from-case-red-soft via-case-red to-case-amber",
  green: "from-case-green via-case-gold to-case-amber",
};

export default function ProgressBar({
  value,
  label,
  showValue = true,
  tone = "gold",
  size = "md",
  className = "",
}: ProgressBarProps) {
  const normalizedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="mb-3 flex items-center justify-between gap-4 text-sm">
          {label && <p className="text-case-muted">{label}</p>}

          {showValue && (
            <p className="font-bold tabular-nums text-case-gold">
              {normalizedValue}%
            </p>
          )}
        </div>
      )}

      <div
        className={`${heightMap[size]} overflow-hidden rounded-full border border-case-border bg-black/70`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={normalizedValue}
      >
        <div
          className={`h-full rounded-full bg-gradient-to-r ${toneMap[tone]} transition-[width] duration-700 ease-out`}
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
    </div>
  );
}