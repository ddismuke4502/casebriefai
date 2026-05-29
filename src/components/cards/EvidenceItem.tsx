import type { ElementType } from "react";
import { CheckCircle2, FileQuestion, SearchCheck, XCircle } from "lucide-react";

import {
  EvidenceItem as EvidenceItemType,
  EvidenceStatus,
} from "@/types/caseBrief";
import Badge from "@/components/ui/Badge";

type EvidenceItemProps = {
  item: EvidenceItemType;
};

const statusStyles: Record<
  EvidenceStatus,
  {
    icon: ElementType;
    badgeTone: "green" | "red" | "gold";
    iconClass: string;
    borderClass: string;
  }
> = {
  Available: {
    icon: CheckCircle2,
    badgeTone: "green",
    iconClass: "text-case-green",
    borderClass: "border-case-green/35",
  },
  Missing: {
    icon: XCircle,
    badgeTone: "red",
    iconClass: "text-case-red-soft",
    borderClass: "border-case-red/40",
  },
  "Needs Review": {
    icon: FileQuestion,
    badgeTone: "gold",
    iconClass: "text-case-gold",
    borderClass: "border-case-border-gold",
  },
};

export default function EvidenceItem({ item }: EvidenceItemProps) {
  const style = statusStyles[item.status];
  const StatusIcon = style.icon;

  return (
    <article
      className={`evidence-item-card case-card rounded-[1.5rem] border p-4 sm:rounded-[2rem] sm:p-6 ${style.borderClass}`}
    >
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-case-border bg-case-gunmetal sm:size-12">
            <StatusIcon className={`size-6 ${style.iconClass}`} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-case-muted">
              {item.category}
            </p>

            <h3 className="mt-2 text-xl font-black sm:text-2xl">
              {item.label}
            </h3>
          </div>
        </div>

        <Badge tone={style.badgeTone}>{item.status}</Badge>
      </div>

      <div className="rounded-2xl border border-case-border bg-black/35 p-3 sm:p-4">
        <div className="mb-3 flex items-center gap-2 text-case-gold">
          <SearchCheck className="size-4" />
          <p className="text-xs font-bold uppercase tracking-[0.18em]">
            Review Notes
          </p>
        </div>

        <p className="text-xs leading-6 text-case-muted sm:text-sm">
          {item.notes}
        </p>
      </div>
    </article>
  );
}
