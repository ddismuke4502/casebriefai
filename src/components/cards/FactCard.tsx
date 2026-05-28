import { CaseFact } from "@/types/caseBrief";
import ProgressBar from "@/components/ui/ProgressBar";

type FactCardProps = {
  fact: CaseFact;
};

const confidenceTone = (confidence: number): "green" | "gold" | "red" => {
  if (confidence >= 90) return "green";
  if (confidence >= 80) return "gold";
  return "red";
};

export default function FactCard({ fact }: FactCardProps) {
  return (
    <article className="fact-card case-card rounded-[1.5rem] p-4 sm:rounded-3xl sm:p-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-case-gold">
            {fact.label}
          </p>

          <h4 className="mt-3 text-lg font-black leading-tight sm:text-xl">
            {fact.value}
          </h4>
        </div>

        <div className="w-fit rounded-full border border-case-border bg-black/35 px-3 py-1 text-sm font-bold text-case-gold">
          {fact.confidence}%
        </div>
      </div>

      <ProgressBar
        value={fact.confidence}
        label="Confidence"
        tone={confidenceTone(fact.confidence)}
        size="sm"
      />

      <div className="mt-5 rounded-2xl border border-case-border bg-black/35 p-3 sm:p-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-case-muted">
          Source
        </p>

        <p className="mt-2 text-sm text-case-parchment">{fact.source}</p>
      </div>
    </article>
  );
}