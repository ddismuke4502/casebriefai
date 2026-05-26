import {
  BadgeCheck,
  Building2,
  FileText,
  Fingerprint,
  Landmark,
  UserRound,
} from "lucide-react";

import { mockCaseAnalysis } from "@/data/mockCaseData";
import ProgressBar from "@/components/ui/ProgressBar";

const confidenceTone = (confidence: number) => {
  if (confidence >= 90) return "green";
  if (confidence >= 80) return "gold";
  return "red";
};

export default function AnalysisDashboard() {
  const caseData = mockCaseAnalysis;

  return (
    <section id="analysis" className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-case-gold">
              Extracted Case Intelligence
            </p>

            <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
              Structured facts pulled from the mock case file.
            </h2>
          </div>

          <p className="leading-8 text-case-muted">
            This dashboard transforms an unstructured legal document packet into
            organized case data: parties, jurisdiction, facts, confidence
            scores, and source references.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">
          <article className="case-card rounded-3xl p-5 lg:col-span-2">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-case-gold">
                  Case File
                </p>
                <h3 className="mt-3 text-3xl font-black">
                  {caseData.caseTitle}
                </h3>
              </div>

              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-case-border bg-case-gunmetal">
                <Fingerprint className="size-6 text-case-gold" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-case-border bg-black/35 p-4">
                <div className="mb-3 flex items-center gap-2 text-case-gold">
                  <FileText className="size-4" />
                  <p className="text-xs font-bold uppercase tracking-[0.18em]">
                    Document
                  </p>
                </div>
                <p className="font-bold">{caseData.documentName}</p>
              </div>

              <div className="rounded-2xl border border-case-border bg-black/35 p-4">
                <div className="mb-3 flex items-center gap-2 text-case-gold">
                  <Building2 className="size-4" />
                  <p className="text-xs font-bold uppercase tracking-[0.18em]">
                    Case Type
                  </p>
                </div>
                <p className="font-bold">{caseData.caseType}</p>
              </div>

              <div className="rounded-2xl border border-case-border bg-black/35 p-4">
                <div className="mb-3 flex items-center gap-2 text-case-gold">
                  <Landmark className="size-4" />
                  <p className="text-xs font-bold uppercase tracking-[0.18em]">
                    Court
                  </p>
                </div>
                <p className="font-bold">{caseData.court}</p>
              </div>

              <div className="rounded-2xl border border-case-border bg-black/35 p-4">
                <div className="mb-3 flex items-center gap-2 text-case-gold">
                  <BadgeCheck className="size-4" />
                  <p className="text-xs font-bold uppercase tracking-[0.18em]">
                    Jurisdiction
                  </p>
                </div>
                <p className="font-bold">{caseData.jurisdiction}</p>
              </div>
            </div>
          </article>

          <article className="case-card rounded-3xl p-5 lg:col-span-2">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-case-gold">
                  Parties
                </p>
                <h3 className="mt-3 text-2xl font-black">
                  Identified Participants
                </h3>
              </div>

              <div className="rounded-full border border-case-border bg-black/35 px-3 py-1 text-sm font-bold text-case-gold">
                {caseData.parties.length} found
              </div>
            </div>

            <div className="space-y-3">
              {caseData.parties.map((party) => (
                <div
                  key={party.id}
                  className="rounded-2xl border border-case-border bg-black/35 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-case-gunmetal">
                      <UserRound className="size-5 text-case-gold" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-black">{party.name}</p>
                        <span className="rounded-full border border-case-border bg-case-gunmetal px-2 py-1 text-xs text-case-muted">
                          {party.role}
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-case-muted">
                        {party.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-8">
          <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-case-gold">
                Fact Extraction
              </p>
              <h3 className="mt-3 text-3xl font-black">Key facts detected</h3>
            </div>

            <p className="max-w-xl text-sm leading-6 text-case-muted">
              Each fact includes a mock confidence score and source reference to
              demonstrate AI explainability and review traceability.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {caseData.facts.map((fact) => (
              <article key={fact.id} className="case-card rounded-3xl p-5">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-case-gold">
                      {fact.label}
                    </p>
                    <h4 className="mt-3 text-xl font-black leading-tight">
                      {fact.value}
                    </h4>
                  </div>

                  <div className="rounded-full border border-case-border bg-black/35 px-3 py-1 text-sm font-bold text-case-gold">
                    {fact.confidence}%
                  </div>
                </div>

                <ProgressBar
                  value={fact.confidence}
                  label="Confidence"
                  tone={confidenceTone(fact.confidence)}
                  size="sm"
                />

                <div className="mt-5 rounded-2xl border border-case-border bg-black/35 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-case-muted">
                    Source
                  </p>
                  <p className="mt-2 text-sm text-case-parchment">
                    {fact.source}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}