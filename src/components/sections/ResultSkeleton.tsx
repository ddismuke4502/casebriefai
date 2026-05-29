import { Radar } from "lucide-react";

import Skeleton from "@/components/ui/Skeleton";

export default function ResultSkeleton() {
  return (
    <section id="analysis" className="px-4 py-16 sm:px-6 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="case-card rounded-[1.5rem] p-4 sm:rounded-[2rem] sm:p-6 md:p-10">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-case-border bg-case-gunmetal/80 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-case-gold">
                <Radar className="size-4 animate-spin" />
                Generating Case Intelligence
              </div>

              <h2 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
                Preparing extracted results.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-case-muted sm:text-base">
                CaseBrief AI is simulating fact extraction, timeline building,
                issue spotting, evidence review, and export packet generation.
              </p>
            </div>

            <Skeleton className="h-20 w-20 shrink-0 rounded-3xl" />
          </div>

          <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.5rem] border border-case-border bg-black/35 p-4 sm:p-5">
              <Skeleton className="mb-4 h-5 w-40" />
              <Skeleton className="mb-6 h-8 w-3/4" />

              <div className="grid gap-3 sm:grid-cols-2">
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-case-border bg-black/35 p-4 sm:p-5">
              <Skeleton className="mb-4 h-5 w-32" />
              <Skeleton className="mb-6 h-8 w-2/3" />

              <div className="space-y-3">
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <Skeleton className="h-44" />
            <Skeleton className="h-44" />
            <Skeleton className="h-44" />
          </div>
        </div>
      </div>
    </section>
  );
}