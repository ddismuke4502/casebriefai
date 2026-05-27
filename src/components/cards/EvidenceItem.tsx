import type { ElementType } from "react";
import {
  CheckCircle2,
  FileQuestion,
  SearchCheck,
  XCircle,
} from "lucide-react";

import { EvidenceItem as EvidenceItemType, EvidenceStatus } from "@/types/caseBrief";

type EvidenceItemProps = {
  item: EvidenceItemType;
};

const statusStyles: Record<
  EvidenceStatus,
  {
    icon: ElementType;
    labelClass: string;
    iconClass: string;
    borderClass: string;
  }
> = {
  Available: {
    icon: CheckCircle2,
    labelClass: "border-case-green/40 bg-case-green/10 text-case-green",
    iconClass: "text-case-green",
    borderClass: "border-case-green/35",
  },
  Missing: {
    icon: XCircle,
    labelClass: "border-case-red/45 bg-case-red/10 text-case-red-soft",
    iconClass: "text-case-red-soft",
    borderClass: "border-case-red/40",
  },
  "Needs Review": {
    icon: FileQuestion,
    labelClass: "border-case-border-gold bg-case-gold/10 text-case-gold",
    iconClass: "text-case-gold",
    borderClass: "border-case-border-gold",
  },
};

export default function EvidenceItem({ item }: EvidenceItemProps) {
  const style = statusStyles[item.status];
  const StatusIcon = style.icon;

  return (
    <article
      className={`evidence-item-card case-card rounded-[2rem] border p-6 ${style.borderClass}`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-case-border bg-case-gunmetal">
            <StatusIcon className={`size-6 ${style.iconClass}`} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-case-muted">
              {item.category}
            </p>

            <h3 className="mt-2 text-2xl font-black">{item.label}</h3>
          </div>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ${style.labelClass}`}
        >
          {item.status}
        </span>
      </div>

      <div className="rounded-2xl border border-case-border bg-black/35 p-4">
        <div className="mb-3 flex items-center gap-2 text-case-gold">
          <SearchCheck className="size-4" />
          <p className="text-xs font-bold uppercase tracking-[0.18em]">
            Review Notes
          </p>
        </div>

        <p className="text-sm leading-6 text-case-muted">{item.notes}</p>
      </div>
    </article>
  );
}