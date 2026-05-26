"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  FileText,
  Loader2,
  Radar,
  RotateCcw,
  ShieldAlert,
  Upload,
} from "lucide-react";

import { scanSteps } from "@/data/mockCaseData";
import { ScanStatus } from "@/types/caseBrief";
import ProgressBar from "@/components/ui/ProgressBar";

const scanOrder: ScanStatus[] = [
  "idle",
  "uploading",
  "scanning",
  "extracting",
  "buildingTimeline",
  "spottingIssues",
  "complete",
];

const activeStatuses: ScanStatus[] = [
  "uploading",
  "scanning",
  "extracting",
  "buildingTimeline",
  "spottingIssues",
];

export default function UploadAnalyzer() {
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [isRunning, setIsRunning] = useState(false);

  const currentStep = useMemo(() => {
    return scanSteps.find((step) => step.id === status) ?? scanSteps[0];
  }, [status]);

  const currentIndex = scanOrder.indexOf(status);
  const isComplete = status === "complete";
  const isIdle = status === "idle";

  const runMockScan = async () => {
    if (isRunning) return;

    setIsRunning(true);

    for (const nextStatus of scanOrder.slice(1)) {
      setStatus(nextStatus);
      await new Promise((resolve) => setTimeout(resolve, 850));
    }

    setIsRunning(false);
  };

  const resetScan = () => {
    setStatus("idle");
    setIsRunning(false);
  };

  return (
    <section id="analyzer" className="px-6 py-20 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-case-gold">
            Mock Upload Flow
          </p>

          <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
            Upload a case file and simulate AI extraction.
          </h2>

          <p className="mt-5 max-w-xl leading-8 text-case-muted">
            This flow does not process real legal documents. It demonstrates how
            a production AI legal-tech product could guide users through upload,
            scan, extraction, timeline generation, issue spotting, and export.
          </p>

          <div className="mt-8 rounded-3xl border border-case-red/40 bg-case-red/10 p-5">
            <div className="flex gap-3">
              <ShieldAlert className="mt-1 size-5 shrink-0 text-case-red-soft" />
              <p className="text-sm leading-6 text-case-muted">
                Portfolio mockup only. Do not upload confidential or real legal
                documents. This product does not provide legal advice.
              </p>
            </div>
          </div>
        </div>

        <div className="case-card rounded-[2rem] p-5">
          <div className="rounded-[1.5rem] border border-case-border bg-black/45 p-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-case-border bg-case-gunmetal/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-case-gold">
                  <Radar className="size-4" />
                  AI Case Scanner
                </div>

                <h3 className="mt-4 text-2xl font-black">
                  demo-case-file.pdf
                </h3>

                <p className="mt-2 text-sm leading-6 text-case-muted">
                  Simulated legal packet containing incident notes, party
                  references, timeline dates, evidence mentions, and filing
                  details.
                </p>
              </div>

              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-case-border bg-case-gunmetal">
                {isComplete ? (
                  <CheckCircle2 className="size-7 text-case-green" />
                ) : isRunning ? (
                  <Loader2 className="size-7 animate-spin text-case-gold" />
                ) : (
                  <FileText className="size-7 text-case-gold" />
                )}
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-dashed border-case-border bg-case-gunmetal/35 p-5">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-black/50">
                    <Upload className="size-6 text-case-gold" />
                  </div>

                  <div>
                    <p className="font-bold text-case-parchment">
                      Mock document ready
                    </p>
                    <p className="mt-1 text-sm text-case-muted">
                      Click analyze to trigger the scanning workflow.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={runMockScan}
                    disabled={isRunning}
                    className="signal-button rounded-full px-5 py-3 text-sm font-black disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isIdle ? "Analyze File" : "Run Again"}
                  </button>

                  <button
                    onClick={resetScan}
                    disabled={isRunning && !isComplete}
                    className="redline-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <RotateCcw className="size-4" />
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-case-border bg-case-surface/70 p-5">
              <ProgressBar
                value={currentStep.progress}
                label={currentStep.label}
                tone={isComplete ? "green" : "gold"}
                size="lg"
              />

              <p className="mt-4 text-sm leading-6 text-case-muted">
                {currentStep.description}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {scanOrder.slice(1).map((stepStatus, index) => {
                const step = scanSteps.find((item) => item.id === stepStatus);
                const stepIndex = scanOrder.indexOf(stepStatus);
                const hasCompleted = currentIndex > stepIndex;
                const isActive = status === stepStatus;
                const shouldHighlight =
                  hasCompleted || isActive || status === "complete";

                return (
                  <div
                    key={stepStatus}
                    className={`flex items-center gap-4 rounded-2xl border p-4 transition duration-300 ${
                      shouldHighlight
                        ? "border-case-border-gold bg-case-gold/8"
                        : "border-case-border bg-black/30"
                    }`}
                  >
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                        hasCompleted || status === "complete"
                          ? "bg-case-green text-black"
                          : isActive
                            ? "bg-case-gold text-black"
                            : "bg-case-gunmetal text-case-muted"
                      }`}
                    >
                      {hasCompleted || status === "complete" ? (
                        <CheckCircle2 className="size-5" />
                      ) : (
                        index + 1
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`font-bold ${
                          shouldHighlight
                            ? "text-case-parchment"
                            : "text-case-muted"
                        }`}
                      >
                        {step?.label}
                      </p>

                      <p className="mt-1 text-sm text-case-muted">
                        {step?.description}
                      </p>
                    </div>

                    {isActive && activeStatuses.includes(status) && (
                      <Loader2 className="size-5 animate-spin text-case-gold" />
                    )}
                  </div>
                );
              })}
            </div>

            {isComplete && (
              <div className="mt-6 rounded-3xl border border-case-green/40 bg-case-green/10 p-5">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-1 size-5 shrink-0 text-case-green" />
                  <div>
                    <p className="font-black text-case-parchment">
                      Mock analysis complete
                    </p>
                    <p className="mt-2 text-sm leading-6 text-case-muted">
                      Extracted facts, timeline events, issue flags, evidence
                      checklist, and export summary are ready to render.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}