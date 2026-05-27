type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

const cx = (...classes: Array<string | false | undefined>) => {
  return classes.filter(Boolean).join(" ");
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  eyebrowClassName = "",
  titleClassName = "",
  descriptionClassName = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cx(
        isCenter && "mx-auto max-w-3xl text-center",
        !isCenter && "max-w-3xl",
        className,
      )}
    >
      <p
        className={cx(
          "text-sm font-bold uppercase tracking-[0.32em] text-case-gold",
          eyebrowClassName,
        )}
      >
        {eyebrow}
      </p>

      <h2
        className={cx(
          "mt-3 text-4xl font-black leading-tight md:text-5xl",
          titleClassName,
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cx(
            "mt-5 leading-8 text-case-muted",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}