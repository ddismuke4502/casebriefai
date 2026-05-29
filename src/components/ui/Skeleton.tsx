type SkeletonProps = {
  className?: string;
};

const cx = (...classes: Array<string | false | undefined>) => {
  return classes.filter(Boolean).join(" ");
};

export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cx("case-skeleton rounded-2xl", className)}
    />
  );
}