"use client";

import { useState } from "react";
import { FileLock2, Radar, ShieldAlert } from "lucide-react";

import UploadAnalyzer from "@/components/sections/UploadAnalyzer";
import AnalysisDashboard from "@/components/sections/AnalysisDashboard";
import TimelineSection from "@/components/sections/TimelineSection";
import IssueSpottingSection from "@/components/sections/IssueSpottingSection";
import EvidenceChecklist from "@/components/sections/EvidenceChecklist";
import ExportSummary from "@/components/sections/ExportSummary";

export default function CaseBriefExperience() {
  const [hasCompletedAnalysis, setHasCompletedAnalysis] = useState(false);
  const [hasStartedAnalysis, setHasStartedAnalysis] = useState(false);

  const handleAnalysisStart = () => {
    setHasStartedAnalysis(true);
    setHasCompletedAnalysis(false);
  };

  const handleAnalysisComplete = () => {
    setHasCompletedAnalysis(true);

    window.setTimeout(() => {
      document.getElementById("analysis")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 500);
  };

  const handleAnalysisReset = () => {
    setHasStartedAnalysis(false);
    setHasCompletedAnalysis(false);
  };

  return (
    <>
      <UploadAnalyzer
        onAnalysisStart={handleAnalysisStart}
        onAnalysisComplete={handleAnalysisComplete}
        onAnalysisReset={handleAnalysisReset}
      />

      {!hasCompletedAnalysis ? (
        <section id="analysis" className="px-6 py-20 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="case-card rounded-[2rem] p-6 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                <div>
                  <div className="flex size-14 items-center justify-center rounded-2xl border border-case-border bg-case-gunmetal">
                    {hasStartedAnalysis ? (
                      <Radar className="size-7 animate-spin text-case-gold" />
                    ) : (
                      <FileLock2 className="size-7 text-case-gold" />
                    )}
                  </div>

                  <p className="mt-6 text-sm font-bold uppercase tracking-[0.32em] text-case-gold">
                    Results Locked
                  </p>

                  <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
                    Run the analyzer to unlock the mock case intelligence.
                  </h2>

                  <p className="mt-5 max-w-xl leading-8 text-case-muted">
                    Once the simulated scan completes, CaseBrief AI will reveal
                    extracted facts, parties, timeline events, issue flags,
                    evidence checklist items, and the export summary workflow.
                  </p>

                  <a
                    href="#analyzer"
                    className="signal-button mt-8 inline-flex rounded-full px-6 py-3 text-sm font-black"
                  >
                    Go to Analyzer
                  </a>
                </div>

                <div className="rounded-[1.5rem] border border-case-border bg-black/40 p-5">
                  <div className="mb-5 flex items-center gap-3">
                    <ShieldAlert className="size-5 text-case-red-soft" />
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-case-red-soft">
                      Locked Preview
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      "Extracted case facts",
                      "Party identification",
                      "Timeline reconstruction",
                      "Possible issue spotting",
                      "Evidence checklist",
                      "Exportable review packet",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-2xl border border-case-border bg-case-gunmetal/40 p-4"
                      >
                        <p className="font-bold text-case-muted">{item}</p>
                        <span className="rounded-full border border-case-border bg-black/35 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-case-muted">
                          Locked
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <AnalysisDashboard />
          <TimelineSection />
          <IssueSpottingSection />
          <EvidenceChecklist />
          <ExportSummary />
        </>
      )}
    </>
  );
}