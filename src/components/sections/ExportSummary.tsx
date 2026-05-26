"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CheckCircle2,
  Clipboard,
  Download,
  FileText,
  LockKeyhole,
  Printer,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

import { mockCaseAnalysis } from "@/data/mockCaseData";

export default function ExportSummary() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [hasGenerated, setHasGenerated] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const summary = mockCaseAnalysis.exportSummary;

  const exportText = useMemo(() => {
    return [
      summary.title,
      "",
      "Overview:",
      summary.overview,
      "",
      "Key Findings:",
      ...summary.keyFindings.map((finding) => `- ${finding}`),
      "",
      "Recommended Review Areas:",
      ...summary.recommendedReviewAreas.map((area) => `- ${area}`),
      "",
      "Disclaimer:",
      summary.disclaimer,
    ].join("\n");
  }, [summary]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".export-header-item", {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(".export-control-panel", {
        x: -34,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".export-layout",
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(".export-preview-panel", {
        x: 34,
        opacity: 0,
        duration: 0.8,
        delay: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".export-layout",
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(".export-action-button", {
        y: 16,
        opacity: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".export-action-list",
          start: "top 84%",
          once: true,
        },
      });

      gsap.to(".export-lock-pulse", {
        scale: 1.1,
        opacity: 0.7,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !hasGenerated) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .fromTo(
          ".export-generated-shell",
          {
            y: 24,
            opacity: 0,
            scale: 0.985,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
          },
        )
        .from(
          ".export-summary-block",
          {
            y: 24,
            opacity: 0,
            duration: 0.55,
            stagger: 0.1,
          },
          "-=0.25",
        )
        .from(
          ".export-finding-row",
          {
            x: 18,
            opacity: 0,
            duration: 0.42,
            stagger: 0.06,
          },
          "-=0.2",
        )
        .from(
          ".export-review-area",
          {
            y: 16,
            opacity: 0,
            duration: 0.42,
            stagger: 0.06,
          },
          "-=0.15",
        );

      gsap.fromTo(
        ".export-success-icon",
        {
          scale: 0.4,
          rotate: -18,
          opacity: 0,
        },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.55,
          ease: "back.out(1.8)",
        },
      );
    }, section);

    return () => ctx.revert();
  }, [hasGenerated]);

  const handleGenerate = () => {
    setHasGenerated(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportText);
      setHasCopied(true);

      window.setTimeout(() => {
        setHasCopied(false);
      }, 1600);
    } catch {
      setHasCopied(false);
    }
  };

  return (
    <section ref={sectionRef} id="export" className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="export-header-item text-sm font-bold uppercase tracking-[0.32em] text-case-gold">
              Export Summary
            </p>

            <h2 className="export-header-item mt-3 text-4xl font-black leading-tight md:text-5xl">
              Turn the analysis into a clean review packet.
            </h2>
          </div>

          <p className="export-header-item leading-8 text-case-muted">
            The export flow simulates how CaseBrief AI would package extracted
            facts, issue flags, missing evidence, and review recommendations
            into a structured summary for human review.
          </p>
        </div>

        <div className="export-layout grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="export-control-panel case-card h-fit rounded-[2rem] p-6">
            <div className="export-lock-pulse flex size-14 items-center justify-center rounded-2xl border border-case-border bg-case-gunmetal">
              <FileText className="size-7 text-case-gold" />
            </div>

            <h3 className="mt-6 text-2xl font-black">Export Controls</h3>

            <p className="mt-4 leading-7 text-case-muted">
              Generate a mock case review packet from the structured analysis.
              This is designed to demonstrate product UX, not to produce real
              legal work product.
            </p>

            <div className="case-divider my-6" />

            <div className="export-action-list space-y-3">
              <button
                onClick={handleGenerate}
                className="export-action-button signal-button flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black"
              >
                <Sparkles className="size-5" />
                {hasGenerated ? "Regenerate Summary" : "Generate Summary"}
              </button>

              <button
                onClick={handleCopy}
                disabled={!hasGenerated}
                className="export-action-button redline-button flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
              >
                {hasCopied ? (
                  <>
                    <CheckCircle2 className="size-5 text-case-green" />
                    Copied
                  </>
                ) : (
                  <>
                    <Clipboard className="size-5" />
                    Copy Summary
                  </>
                )}
              </button>

              <button
                disabled={!hasGenerated}
                className="export-action-button redline-button flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download className="size-5" />
                Mock Export PDF
              </button>

              <button
                disabled={!hasGenerated}
                className="export-action-button redline-button flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Printer className="size-5" />
                Print Preview
              </button>
            </div>

            <div className="mt-6 rounded-3xl border border-case-red/40 bg-case-red/10 p-4">
              <div className="flex gap-3">
                <ShieldAlert className="mt-1 size-5 shrink-0 text-case-red-soft" />
                <p className="text-sm leading-6 text-case-muted">
                  Exported summaries are mock portfolio outputs. They are not
                  legal briefs, legal advice, or attorney-reviewed documents.
                </p>
              </div>
            </div>
          </aside>

          <div className="export-preview-panel case-card rounded-[2rem] p-5">
            <div className="rounded-[1.5rem] border border-case-border bg-black/45 p-5 md:p-7">
              <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-case-border bg-case-gunmetal/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-case-gold">
                    <LockKeyhole className="size-4" />
                    Generated Review Packet
                  </div>

                  <h3 className="mt-5 text-3xl font-black">
                    {hasGenerated
                      ? summary.title
                      : "Summary waiting to generate"}
                  </h3>

                  <p className="mt-3 max-w-2xl leading-7 text-case-muted">
                    {hasGenerated
                      ? "The mock export has been assembled from the analyzed case data."
                      : "Click Generate Summary to simulate the final AI export transition."}
                  </p>
                </div>

                <div
                  className={`flex size-14 shrink-0 items-center justify-center rounded-2xl border ${
                    hasGenerated
                      ? "border-case-green/40 bg-case-green/10"
                      : "border-case-border bg-case-gunmetal"
                  }`}
                >
                  {hasGenerated ? (
                    <CheckCircle2 className="export-success-icon size-7 text-case-green" />
                  ) : (
                    <FileText className="size-7 text-case-gold" />
                  )}
                </div>
              </div>

              {!hasGenerated ? (
                <div className="rounded-[1.5rem] border border-dashed border-case-border bg-case-gunmetal/35 p-8 text-center">
                  <Sparkles className="mx-auto size-10 text-case-gold" />
                  <h4 className="mt-4 text-2xl font-black">
                    Ready to generate export summary.
                  </h4>
                  <p className="mx-auto mt-3 max-w-xl leading-7 text-case-muted">
                    This final step will reveal a structured case review packet
                    containing overview, findings, review areas, and disclaimer.
                  </p>
                </div>
              ) : (
                <div className="export-generated-shell space-y-6">
                  <article className="export-summary-block rounded-[1.5rem] border border-case-border bg-case-gunmetal/40 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-case-gold">
                      Overview
                    </p>

                    <p className="mt-3 leading-7 text-case-muted">
                      {summary.overview}
                    </p>
                  </article>

                  <article className="export-summary-block rounded-[1.5rem] border border-case-border bg-case-gunmetal/40 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-case-gold">
                      Key Findings
                    </p>

                    <div className="mt-4 space-y-3">
                      {summary.keyFindings.map((finding) => (
                        <div
                          key={finding}
                          className="export-finding-row flex gap-3 rounded-2xl border border-case-border bg-black/35 p-4"
                        >
                          <CheckCircle2 className="mt-1 size-5 shrink-0 text-case-gold" />
                          <p className="text-sm leading-6 text-case-muted">
                            {finding}
                          </p>
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="export-summary-block rounded-[1.5rem] border border-case-border bg-case-gunmetal/40 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-case-gold">
                      Recommended Review Areas
                    </p>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {summary.recommendedReviewAreas.map((area) => (
                        <div
                          key={area}
                          className="export-review-area rounded-2xl border border-case-border bg-black/35 p-4"
                        >
                          <p className="text-sm leading-6 text-case-muted">
                            {area}
                          </p>
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="export-summary-block rounded-[1.5rem] border border-case-red/40 bg-case-red/10 p-5">
                    <div className="flex gap-3">
                      <ShieldAlert className="mt-1 size-5 shrink-0 text-case-red-soft" />

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-case-red-soft">
                          Disclaimer
                        </p>

                        <p className="mt-3 text-sm leading-6 text-case-muted">
                          {summary.disclaimer}
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}