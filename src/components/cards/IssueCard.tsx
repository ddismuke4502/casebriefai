import { AlertTriangle, Scale, ShieldAlert } from "lucide-react";

import { LegalIssue, RiskLevel } from "@/types/caseBrief";

type IssueCardProps = {
  issue: LegalIssue;
};

const riskStyles: Record<
  RiskLevel,
  {
    label: string;
    badgeClass: string;
    iconClass: string;
    borderClass: string;
  }
> = {
  High: {
    label: "High Review Priority",
    badgeClass: "border-case-red/50 bg-case-red/15 text-case-red-soft",
    iconClass: "text-case-red-soft",
    borderClass: "border-case-red/45",
  },
  Medium: {
    label: "Medium Review Priority",
    badgeClass: "border-case-border-gold bg-case-gold/10 text-case-gold",
    iconClass: "text-case-gold",
    borderClass: "border-case-border-gold",
  },
  Low: {
    label: "Low Review Priority",
    badgeClass: "border-case-green/40 bg-case-green/10 text-case-green",
    iconClass: "text-case-green",
    borderClass: "border-case-green/35",
  },
};

export default function IssueCard({ issue }: IssueCardProps) {
  const style = riskStyles[issue.riskLevel];

  return (
    <article
      className={`issue-card case-card rounded-[2rem] border p-6 ${style.borderClass}`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-case-border bg-case-gunmetal">
          <AlertTriangle className={`size-6 ${style.iconClass}`} />
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ${style.badgeClass}`}
        >
          {issue.riskLevel}
        </span>
      </div>

      <p className="text-xs font-bold uppercase tracking-[0.24em] text-case-muted">
        {style.label}
      </p>

      <h3 className="mt-3 text-2xl font-black">{issue.issue}</h3>

      <p className="mt-4 leading-7 text-case-muted">{issue.summary}</p>

      <div className="case-divider my-6" />

      <div className="rounded-2xl border border-case-border bg-black/35 p-4">
        <div className="mb-3 flex items-center gap-2 text-case-gold">
          <Scale className="size-4" />
          <p className="text-xs font-bold uppercase tracking-[0.18em]">
            Review Prompt
          </p>
        </div>

        <p className="text-sm leading-6 text-case-parchment">
          {issue.reviewPrompt}
        </p>
      </div>

      <div className="mt-4 rounded-2xl border border-case-red/35 bg-case-red/10 p-4">
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