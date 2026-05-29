"use client";

import { useState } from "react";
import { FileLock2, Radar, ShieldAlert } from "lucide-react";

import UploadAnalyzer from "@/components/sections/UploadAnalyzer";
import AnalysisDashboard from "@/components/sections/AnalysisDashboard";
import TimelineSection from "@/components/sections/TimelineSection";
import IssueSpottingSection from "@/components/sections/IssueSpottingSection";
import EvidenceChecklist from "@/components/sections/EvidenceChecklist";
import ExportSummary from "@/components/sections/ExportSummary";
import ResultSkeleton from "@/components/sections/ResultSkeleton";
import useGsapReveal from "@/hooks/useGsapReveal";

export default function CaseBriefExperience() {
  const [hasCompletedAnalysis, setHasCompletedAnalysis] = useState(false);
  const [hasStartedAnalysis, setHasStartedAnalysis] = useState(false);

  const lockedResultsRef = useGsapReveal<HTMLElement>({
    selector: ".locked-results-reveal",
    y: 30,
    duration: 0.75,
    stagger: 0.1,
  });

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

      {hasStartedAnalysis && !hasCompletedAnalysis ? (
        <ResultSkeleton />
      ) : !hasCompletedAnalysis ? (
        <section
          ref={lockedResultsRef}
          id="analysis"
          className="px-4 py-16 sm:px-6 md:px-10 md:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <div className="locked-results-reveal case-card rounded-[1.5rem] p-4 sm:rounded-[2rem] sm:p-6 md:p-10">
              <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr] xl:items-center">
                <div>
                  <div className="locked-results-reveal flex size-12 items-center justify-center rounded-2xl border border-case-border bg-case-gunmetal sm:size-14">
                    {hasStartedAnalysis ? (
                      <Radar className="size-7 animate-spin text-case-gold" />
                    ) : (
                      <FileLock2 className="size-7 text-case-gold" />
                    )}
                  </div>

                  <p className="locked-results-reveal mt-6 text-sm font-bold uppercase tracking-[0.32em] text-case-gold">
                    Results Locked
                  </p>

                  <h2 className="locked-results-reveal mt-3 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
                    Run the analyzer to unlock the mock case intelligence.
                  </h2>

                  <p className="locked-results-reveal mt-5 max-w-xl text-sm leading-7 text-case-muted sm:text-base sm:leading-8">
                    Once the simulated scan completes, CaseBrief AI will reveal
                    extracted facts, parties, timeline events, issue flags,
                    evidence checklist items, and the export summary workflow.
                  </p>

                  <a
                    href="#analyzer"
                    className="locked-results-reveal signal-button mt-8 inline-flex w-full justify-center rounded-full px-6 py-3 text-sm font-black sm:w-auto"
                  >
                    Go to Analyzer
                  </a>
                </div>

                <div className="locked-results-reveal rounded-[1.25rem] border border-case-border bg-black/40 p-4 sm:rounded-[1.5rem] sm:p-5">
                  <div className="mb-5 flex items-start gap-3 sm:items-center">
                    <ShieldAlert className="size-5 text-case-red-soft" />
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-case-red-soft sm:text-sm sm:tracking-[0.22em]">
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
                        className="locked-results-reveal flex flex-col gap-3 rounded-2xl border border-case-border bg-case-gunmetal/40 p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <p className="text-sm font-bold text-case-muted sm:text-base">
                          {item}
                        </p>
                        <span className="w-fit rounded-full border border-case-border bg-black/35 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-case-muted">
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
