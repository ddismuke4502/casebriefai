import { AlertTriangle, Scale, ShieldAlert } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { LegalIssue, RiskLevel } from "@/types/caseBrief";

type IssueCardProps = {
  issue: LegalIssue;
};

const riskStyles: Record<
  RiskLevel,
  {
    label: string;
    badgeTone: "red" | "gold" | "green";
    iconClass: string;
    borderClass: string;
  }
> = {
  High: {
    label: "High Review Priority",
    badgeTone: "red",
    iconClass: "text-case-red-soft",
    borderClass: "border-case-red/45",
  },
  Medium: {
    label: "Medium Review Priority",
    badgeTone: "gold",
    iconClass: "text-case-gold",
    borderClass: "border-case-border-gold",
  },
  Low: {
    label: "Low Review Priority",
    badgeTone: "green",
    iconClass: "text-case-green",
    borderClass: "border-case-green/35",
  },
};

export default function IssueCard({ issue }: IssueCardProps) {
  const style = riskStyles[issue.riskLevel];

  return (
    <article
      className={`issue-card case-card rounded-[1.5rem] border p-4 sm:rounded-[2rem] sm:p-6 ${style.borderClass}`}
    >
      <div className="mb-5 flex items-start justify-between gap-3 sm:gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-case-border bg-case-gunmetal sm:size-12">
          <AlertTriangle className={`size-6 ${style.iconClass}`} />
        </div>

        <Badge tone={style.badgeTone}>{issue.riskLevel}</Badge>
      </div>

      <p className="text-xs font-bold uppercase tracking-[0.24em] text-case-muted">
        {style.label}
      </p>

      <h3 className="mt-3 text-xl font-black sm:text-2xl">{issue.issue}</h3>

      <p className="mt-4 text-sm leading-7 text-case-muted sm:text-base">
        {issue.summary}
      </p>

      <div className="case-divider my-6" />

      <div className="rounded-2xl border border-case-border bg-black/35 p-3 sm:p-4">
        <div className="mb-3 flex items-center gap-2 text-case-gold">
          <Scale className="size-4" />
          <p className="text-xs font-bold uppercase tracking-[0.18em]">
            Review Prompt
          </p>
        </div>

        <p className="text-xs leading-6 text-case-parchment sm:text-sm">
          {issue.reviewPrompt}
        </p>
      </div>

      <div className="mt-4 rounded-2xl border border-case-red/35 bg-case-red/10 p-3 sm:p-4">
        <div className="flex gap-3">
          <ShieldAlert className="mt-1 size-4 shrink-0 text-case-red-soft" />
          <p className="text-xs leading-5 text-case-muted">
            {issue.disclaimer}
          </p>
        </div>
      </div>
    </article>
  );
}
