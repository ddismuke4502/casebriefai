import {
  CalendarClock,
  FileSearch,
  GitBranch,
  ShieldAlert,
} from "lucide-react";

import { mockCaseAnalysis } from "@/data/mockCaseData";
import ProgressBar from "@/components/ui/ProgressBar";

const formatDate = (date: string) => {
  const parsedDate = new Date(`${date}T12:00:00`);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
};

const confidenceTone = (confidence: number): "green" | "gold" | "red" => {
  if (confidence >= 90) return "green";
  if (confidence >= 80) return "gold";
  return "red";
};

export default function TimelineSection() {
  const timeline = mockCaseAnalysis.timeline;

  return (
    <section id="timeline" className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-case-gold">
              Timeline Builder
            </p>

            <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
              Reconstruct the case sequence from scattered document clues.
            </h2>
          </div>

          <p className="leading-8 text-case-muted">
            The timeline organizes extracted dates, reports, witness references,
            filings, and supporting document mentions into a chronological review
            path.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="case-card h-fit rounded-[2rem] p-6">
            <div className="flex size-14 items-center justify-center rounded-2xl border border-case-border bg-case-gunmetal">
              <GitBranch className="size-7 text-case-gold" />
            </div>

            <h3 className="mt-6 text-2xl font-black">Case chronology</h3>

            <p className="mt-4 leading-7 text-case-muted">
              A strong legal review workflow depends on knowing what happened,
              when it happened, what source supports it, and whether any dates
              appear incomplete or inconsistent.
            </p>

            <div className="case-divider my-6" />

            <div className="grid gap-4">
              <div className="rounded-2xl border border-case-border bg-black/35 p-4">
                <p className="text-3xl font-black text-case-gold">
                  {timeline.length}
                </p>
                <p className="mt-1 text-sm text-case-muted">
                  timeline events detected
                </p>
              </div>

              <div className="rounded-2xl border border-case-border bg-black/35 p-4">
                <p className="text-3xl font-black text-case-red-soft">2</p>
                <p className="mt-1 text-sm text-case-muted">
                  evidence gaps connected to dates
                </p>
              </div>

              <div className="rounded-2xl border border-case-border bg-black/35 p-4">
                <p className="text-3xl font-black text-case-green">High</p>
                <p className="mt-1 text-sm text-case-muted">
                  timeline usefulness score
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-case-red/40 bg-case-red/10 p-4">
              <div className="flex gap-3">
                <ShieldAlert className="mt-1 size-5 shrink-0 text-case-red-soft" />
                <p className="text-sm leading-6 text-case-muted">
                  Timeline reconstruction is for review assistance only. Dates
                  should be verified against official records.
                </p>
              </div>
            </div>
          </aside>

          <div className="relative">
            <div className="absolute bottom-8 left-5 top-8 hidden w-px bg-gradient-to-b from-case-gold/0 via-case-border-gold to-case-gold/0 md:block" />

            <div className="space-y-5">
              {timeline.map((event, index) => (
                <article
                  key={event.id}
                  className="case-card relative rounded-[1.75rem] p-5 md:ml-12"
                >
                  <div className="absolute -left-[3.25rem] top-8 hidden size-10 items-center justify-center rounded-full border border-case-border-gold bg-case-gunmetal text-sm font-black text-case-gold shadow-2xl md:flex">
                    {index + 1}
                  </div>

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-case-border bg-black/35 px-3 py-1 text-sm font-bold text-case-gold">
                          <CalendarClock className="size-4" />
                          {formatDate(event.date)}
                        </div>

                        <div className="rounded-full border border-case-border bg-case-gunmetal px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-case-muted">
                          Event {index + 1}
                        </div>
                      </div>

                      <h3 className="text-2xl font-black">{event.title}</h3>

                      <p className="mt-3 leading-7 text-case-muted">
                        {event.description}
                      </p>

                      <div className="mt-5 rounded-2xl border border-case-border bg-black/35 p-4">
                        <div className="flex items-start gap-3">
                          <FileSearch className="mt-1 size-5 shrink-0 text-case-gold" />
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-case-muted">
                              Source Reference
                            </p>
                            <p className="mt-2 text-sm font-bold text-case-parchment">
                              {event.source}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full shrink-0 rounded-2xl border border-case-border bg-black/35 p-4 lg:w-48">
                      <ProgressBar
                        value={event.confidence}
                        label="Confidence"
                        tone={confidenceTone(event.confidence)}
                        size="sm"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}