import {
  AlertTriangle,
  BrainCircuit,
  FileWarning,
  Scale,
  ShieldAlert,
} from "lucide-react";

import { mockCaseAnalysis } from "@/data/mockCaseData";
import { RiskLevel } from "@/types/caseBrief";

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

export default function IssueSpottingSection() {
  const issues = mockCaseAnalysis.issues;

  const highRiskCount = issues.filter(
    (issue) => issue.riskLevel === "High",
  ).length;

  const mediumRiskCount = issues.filter(
    (issue) => issue.riskLevel === "Medium",
  ).length;

  return (
    <section id="issues" className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-case-gold">
              Issue Spotting
            </p>

            <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
              Flag possible review areas without pretending to give legal advice.
            </h2>
          </div>

          <p className="leading-8 text-case-muted">
            CaseBrief AI frames issue spotting as review assistance. It surfaces
            incomplete records, missing evidence, timeline inconsistencies, and
            attorney-review prompts while keeping disclaimers visible.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <article className="case-card rounded-3xl p-5">
            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl border border-case-border bg-case-gunmetal">
              <FileWarning className="size-6 text-case-gold" />
            </div>

            <p className="text-4xl font-black text-case-gold">
              {issues.length}
            </p>

            <p className="mt-2 text-sm text-case-muted">
              possible review issues detected
            </p>
          </article>

          <article className="case-card rounded-3xl p-5">
            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl border border-case-red/45 bg-case-red/10">
              <AlertTriangle className="size-6 text-case-red-soft" />
            </div>

            <p className="text-4xl font-black text-case-red-soft">
              {highRiskCount}
            </p>

            <p className="mt-2 text-sm text-case-muted">
              high-priority issue requiring review
            </p>
          </article>

          <article className="case-card rounded-3xl p-5">
            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl border border-case-border-gold bg-case-gold/10">
              <BrainCircuit className="size-6 text-case-gold" />
            </div>

            <p className="text-4xl font-black text-case-gold">
              {mediumRiskCount}
            </p>

            <p className="mt-2 text-sm text-case-muted">
              medium-priority issues for follow-up
            </p>
          </article>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {issues.map((issue) => {
            const style = riskStyles[issue.riskLevel];

            return (
              <article
                key={issue.id}
                className={`case-card rounded-[2rem] border p-6 ${style.borderClass}`}
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

                <p className="mt-4 leading-7 text-case-muted">
                  {issue.summary}
                </p>

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
          })}
        </div>

        <div className="mt-8 rounded-[2rem] border border-case-border bg-case-gunmetal/40 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-case-gold">
                Product Safety Pattern
              </p>

              <h3 className="mt-3 text-2xl font-black">
                The AI suggests review areas. It does not decide legal strategy.
              </h3>
            </div>

            <p className="max-w-2xl leading-7 text-case-muted">
              This distinction is important for a credible legal-tech product.
              The interface helps organize information, but it keeps the final
              interpretation, legal judgment, and case strategy with qualified
              professionals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}