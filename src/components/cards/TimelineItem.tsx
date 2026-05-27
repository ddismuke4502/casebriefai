import { CalendarClock, FileSearch } from "lucide-react";

import { TimelineEvent } from "@/types/caseBrief";
import ProgressBar from "@/components/ui/ProgressBar";

type TimelineItemProps = {
  event: TimelineEvent;
  index: number;
};

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

export default function TimelineItem({ event, index }: TimelineItemProps) {
  return (
    <article className="timeline-event-card case-card relative rounded-[1.75rem] p-5 md:ml-12">
      <div className="timeline-event-marker absolute -left-[3.25rem] top-8 hidden size-10 items-center justify-center rounded-full border border-case-border-gold bg-case-gunmetal text-sm font-black text-case-gold shadow-2xl md:flex">
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

          <p className="mt-3 leading-7 text-case-muted">{event.description}</p>

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
  );
}