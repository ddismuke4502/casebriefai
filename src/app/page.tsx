import ProgressBar from "@/components/ui/ProgressBar";
import AnalysisDashboard from "@/components/sections/AnalysisDashboard";
import EvidenceChecklist from "@/components/sections/EvidenceChecklist";
import ExportSummary from "@/components/sections/ExportSummary";
import IssueSpottingSection from "@/components/sections/IssueSpottingSection";
import TimelineSection from "@/components/sections/TimelineSection";
import UploadAnalyzer from "@/components/sections/UploadAnalyzer";

import {
  ArrowRight,
  FileSearch,
  Fingerprint,
  Gavel,
  LockKeyhole,
  Scale,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

const analysisSteps = [
  "Upload mock case file",
  "Extract parties and facts",
  "Build timeline",
  "Spot possible issues",
  "Prepare evidence checklist",
];

const featureCards = [
  {
    icon: FileSearch,
    title: "Document Intelligence",
    description:
      "Simulates reviewing legal documents and extracting structured case facts from dense text.",
  },
  {
    icon: Gavel,
    title: "Issue Spotting",
    description:
      "Highlights possible legal issues, risk areas, and review priorities for attorney-side analysis.",
  },
  {
    icon: Scale,
    title: "Timeline Builder",
    description:
      "Turns scattered dates and events into a clean chronological case timeline.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-case-black text-case-parchment">
      <section className="case-grid-bg relative min-h-screen px-6 py-6 md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,185,66,0.16),transparent_36rem)]" />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-case-border bg-black/35 px-5 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl border border-case-border bg-case-surface case-glow">
              <Scale className="size-5 text-case-gold" />
            </div>

            <div>
              <p className="text-sm font-bold tracking-[0.28em] text-case-gold">
                CASEBRIEF AI
              </p>
              <p className="text-xs text-case-muted">Noir Legal Intelligence</p>
            </div>
          </div>

          <div className="hidden items-center gap-6 text-sm text-case-muted md:flex">
            <a href="#analysis" className="transition hover:text-case-gold">
              Analyzer
            </a>
            <a href="#workflow" className="transition hover:text-case-gold">
              Workflow
            </a>
            <a href="#disclaimer" className="transition hover:text-case-gold">
              Disclaimer
            </a>
          </div>

          <button className="redline-button rounded-full px-4 py-2 text-sm font-semibold">
            View Demo
          </button>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 py-20 md:grid-cols-[1.05fr_0.95fr] md:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-case-border bg-case-surface/80 px-4 py-2 text-sm text-case-muted">
              <Sparkles className="size-4 text-case-gold" />
              AI-assisted mock case review platform
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Analyze case files like a{" "}
              <span className="noir-text-gradient">detective-grade</span> legal
              AI system.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-case-muted">
              CaseBrief AI is a portfolio-grade legal document analyzer mockup
              that simulates document upload, extracted case facts, timeline
              generation, issue spotting, evidence checklists, and exportable
              summaries.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#analysis"
                className="signal-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold"
              >
                Analyze Mock Case File
                <ArrowRight className="size-5" />
              </a>

              <a
                href="#disclaimer"
                className="redline-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold"
              >
                Read Disclaimer
                <ShieldAlert className="size-5" />
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              <div className="case-card rounded-2xl p-4">
                <p className="text-2xl font-black text-case-gold">92%</p>
                <p className="mt-1 text-xs text-case-muted">
                  Mock extraction confidence
                </p>
              </div>

              <div className="case-card rounded-2xl p-4">
                <p className="text-2xl font-black text-case-gold">14</p>
                <p className="mt-1 text-xs text-case-muted">
                  Timeline events detected
                </p>
              </div>

              <div className="case-card rounded-2xl p-4">
                <p className="text-2xl font-black text-case-red-soft">3</p>
                <p className="mt-1 text-xs text-case-muted">
                  Issues flagged for review
                </p>
              </div>
            </div>
          </div>

          <div className="case-card relative rounded-[2rem] p-5">
            <div className="absolute -right-10 -top-10 size-40 rounded-full bg-case-gold/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-case-red/10 blur-3xl" />

            <div className="relative rounded-[1.5rem] border border-case-border bg-black/45 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-case-gold">
                    Active Review
                  </p>
                  <h2 className="mt-2 text-2xl font-black">
                    State v. Demo Client
                  </h2>
                </div>

                <div className="flex size-12 items-center justify-center rounded-2xl border border-case-border bg-case-surface">
                  <Fingerprint className="size-6 text-case-gold" />
                </div>
              </div>

              <div className="rounded-2xl border border-case-border bg-case-surface/80 p-4">
                <ProgressBar value={68} label="AI scan progress" tone="gold" />
              </div>

              <div className="mt-5 space-y-3">
                {analysisSteps.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-3 rounded-2xl border border-case-border bg-black/35 p-4"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-case-gold text-sm font-black text-black">
                      {index + 1}
                    </div>
                    <p className="text-sm text-case-parchment">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-case-red/40 bg-case-red/10 p-4">
                <div className="flex items-start gap-3">
                  <LockKeyhole className="mt-1 size-5 shrink-0 text-case-red-soft" />
                  <p className="text-sm leading-6 text-case-muted">
                    Mock analysis only. This interface is designed for portfolio
                    demonstration and does not provide legal advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <UploadAnalyzer />

      <AnalysisDashboard />

      <TimelineSection />

      <IssueSpottingSection />

      <EvidenceChecklist />

      <ExportSummary />

      <section id="workflow" className="px-6 pb-20 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-case-border bg-case-surface/70 p-6 md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-case-gold">
            Build Roadmap
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            Next, we turn this shell into a real interactive mock analyzer.
          </h2>

          <div className="case-divider my-8" />

          <div className="grid gap-4 md:grid-cols-5">
            {analysisSteps.map((step, index) => (
              <div key={step} className="rounded-2xl bg-black/35 p-4">
                <p className="mb-3 text-3xl font-black text-case-gold">
                  0{index + 1}
                </p>
                <p className="text-sm leading-6 text-case-muted">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="disclaimer" className="px-6 pb-20 md:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-case-red/45 bg-case-red/10 p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <ShieldAlert className="size-7 shrink-0 text-case-red-soft" />
            <div>
              <h2 className="text-xl font-black">
                Non-Legal-Advice Disclaimer
              </h2>
              <p className="mt-3 max-w-5xl leading-7 text-case-muted">
                CaseBrief AI is a portfolio mockup created to demonstrate
                product design, AI-assisted workflow UX, frontend engineering,
                structured data modeling, and animation. It does not provide
                legal advice, legal representation, case strategy, or
                attorney-client services.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
