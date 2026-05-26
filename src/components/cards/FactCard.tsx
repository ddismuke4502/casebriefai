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
    <article className="fact-card case-card rounded-3xl p-5">
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

        <p className="mt-2 text-sm text-case-parchment">{fact.source}</p>
      </div>
    </article>
  );
}