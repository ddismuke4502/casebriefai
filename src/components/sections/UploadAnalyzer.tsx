"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

type UploadAnalyzerProps = {
  onAnalysisStart?: () => void;
  onAnalysisComplete?: () => void;
  onAnalysisReset?: () => void;
};

export default function UploadAnalyzer({
  onAnalysisStart,
  onAnalysisComplete,
  onAnalysisReset,
}: UploadAnalyzerProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [status, setStatus] = useState<ScanStatus>("idle");
  const [isRunning, setIsRunning] = useState(false);

  const currentStep = useMemo(() => {
    return scanSteps.find((step) => step.id === status) ?? scanSteps[0];
  }, [status]);

  const currentIndex = scanOrder.indexOf(status);
  const isComplete = status === "complete";
  const isIdle = status === "idle";

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      timeline
        .from(".upload-copy", {
          y: 28,
          opacity: 0,
          duration: 0.75,
          stagger: 0.12,
        })
        .from(
          ".upload-card",
          {
            y: 36,
            opacity: 0,
            duration: 0.85,
          },
          "-=0.45",
        )
        .from(
          ".scan-step-row",
          {
            x: 24,
            opacity: 0,
            duration: 0.5,
            stagger: 0.06,
          },
          "-=0.35",
        );

      gsap.to(".scanner-orb", {
        scale: 1.12,
        opacity: 0.75,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play pause resume pause",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || status === "idle") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".scanner-progress-panel",
        {
          scale: 0.985,
          opacity: 0.86,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        },
      );

      gsap.fromTo(
        `[data-scan-status="${status}"]`,
        {
          x: 18,
          opacity: 0.65,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
        },
      );

      if (status === "complete") {
        gsap.fromTo(
          ".scan-complete-panel",
          {
            y: 18,
            opacity: 0,
            scale: 0.98,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: "back.out(1.5)",
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, [status]);

  const runMockScan = async () => {
    if (isRunning) return;

    onAnalysisStart?.();
    setIsRunning(true);

    for (const nextStatus of scanOrder.slice(1)) {
      setStatus(nextStatus);
      await new Promise((resolve) => setTimeout(resolve, 850));
    }

    setIsRunning(false);
    onAnalysisComplete?.();
  };

  const resetScan = () => {
    setStatus("idle");
    setIsRunning(false);
    onAnalysisReset?.();
  };

  return (
    <section ref={sectionRef} id="analyzer" className="px-6 py-20 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="upload-copy text-sm font-bold uppercase tracking-[0.32em] text-case-gold">
            Mock Upload Flow
          </p>

          <h2 className="upload-copy mt-3 text-4xl font-black leading-tight md:text-5xl">
            Upload a case file and simulate AI extraction.
          </h2>

          <p className="upload-copy mt-5 max-w-xl leading-8 text-case-muted">
            This flow does not process real legal documents. It demonstrates how
            a production AI legal-tech product could guide users through upload,
            scan, extraction, timeline generation, issue spotting, and export.
          </p>

          <div className="upload-copy mt-8 rounded-3xl border border-case-red/40 bg-case-red/10 p-5">
            <div className="flex gap-3">
              <ShieldAlert className="mt-1 size-5 shrink-0 text-case-red-soft" />
              <p className="text-sm leading-6 text-case-muted">
                Portfolio mockup only. Do not upload confidential or real legal
                documents. This product does not provide legal advice.
              </p>
            </div>
          </div>
        </div>

        <div className="upload-card case-card relative overflow-hidden rounded-[2rem] p-5">
          <div className="scanner-orb pointer-events-none absolute right-8 top-8 size-32 rounded-full bg-case-gold/8 blur-3xl" />

          <div className="relative rounded-[1.5rem] border border-case-border bg-black/45 p-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-case-border bg-case-gunmetal/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-case-gold">
                  <Radar className="size-4" />
                  AI Case Scanner
                </div>

                <h3 className="mt-4 text-2xl font-black">demo-case-file.pdf</h3>

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

            <div className="scanner-progress-panel mt-6 rounded-3xl border border-case-border bg-case-surface/70 p-5">
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
                    data-scan-status={stepStatus}
                    className={`scan-step-row flex items-center gap-4 rounded-2xl border p-4 transition duration-300 ${
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
              <div className="scan-complete-panel mt-6 rounded-3xl border border-case-green/40 bg-case-green/10 p-5">
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
