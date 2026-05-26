"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ClipboardCheck,
  FileQuestion,
  Filter,
  SearchCheck,
  XCircle,
} from "lucide-react";

import { mockCaseAnalysis } from "@/data/mockCaseData";
import {
  EvidenceCategory,
  EvidenceStatus,
} from "@/types/caseBrief";

const statusStyles: Record<
  EvidenceStatus,
  {
    icon: typeof CheckCircle2;
    labelClass: string;
    iconClass: string;
    borderClass: string;
  }
> = {
  Available: {
    icon: CheckCircle2,
    labelClass: "border-case-green/40 bg-case-green/10 text-case-green",
    iconClass: "text-case-green",
    borderClass: "border-case-green/35",
  },
  Missing: {
    icon: XCircle,
    labelClass: "border-case-red/45 bg-case-red/10 text-case-red-soft",
    iconClass: "text-case-red-soft",
    borderClass: "border-case-red/40",
  },
  "Needs Review": {
    icon: FileQuestion,
    labelClass: "border-case-border-gold bg-case-gold/10 text-case-gold",
    iconClass: "text-case-gold",
    borderClass: "border-case-border-gold",
  },
};

const categories: Array<"All" | EvidenceCategory> = [
  "All",
  "Court",
  "Timeline",
  "Medical",
  "Witness",
  "Communication",
  "Identity",
  "Financial",
];

const statuses: Array<"All" | EvidenceStatus> = [
  "All",
  "Available",
  "Missing",
  "Needs Review",
];

export default function EvidenceChecklist() {
  const evidence = mockCaseAnalysis.evidenceChecklist;

  const [selectedCategory, setSelectedCategory] =
    useState<"All" | EvidenceCategory>("All");

  const [selectedStatus, setSelectedStatus] =
    useState<"All" | EvidenceStatus>("All");

  const filteredEvidence = useMemo(() => {
    return evidence.filter((item) => {
      const categoryMatches =
        selectedCategory === "All" || item.category === selectedCategory;

      const statusMatches =
        selectedStatus === "All" || item.status === selectedStatus;

      return categoryMatches && statusMatches;
    });
  }, [evidence, selectedCategory, selectedStatus]);

  const availableCount = evidence.filter(
    (item) => item.status === "Available",
  ).length;

  const missingCount = evidence.filter(
    (item) => item.status === "Missing",
  ).length;

  const needsReviewCount = evidence.filter(
    (item) => item.status === "Needs Review",
  ).length;

  return (
    <section id="evidence" className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-case-gold">
              Evidence Checklist
            </p>

            <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
              Track what is available, missing, or needs review.
            </h2>
          </div>

          <p className="leading-8 text-case-muted">
            The checklist converts extracted case references into a structured
            review workflow. It helps identify what the mock packet contains,
            what appears absent, and what needs follow-up verification.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <article className="case-card rounded-3xl p-5">
            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl border border-case-green/35 bg-case-green/10">
              <CheckCircle2 className="size-6 text-case-green" />
            </div>

            <p className="text-4xl font-black text-case-green">
              {availableCount}
            </p>

            <p className="mt-2 text-sm text-case-muted">
              available evidence items
            </p>
          </article>

          <article className="case-card rounded-3xl p-5">
            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl border border-case-red/40 bg-case-red/10">
              <XCircle className="size-6 text-case-red-soft" />
            </div>

            <p className="text-4xl font-black text-case-red-soft">
              {missingCount}
            </p>

            <p className="mt-2 text-sm text-case-muted">
              missing evidence items
            </p>
          </article>

          <article className="case-card rounded-3xl p-5">
            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl border border-case-border-gold bg-case-gold/10">
              <FileQuestion className="size-6 text-case-gold" />
            </div>

            <p className="text-4xl font-black text-case-gold">
              {needsReviewCount}
            </p>

            <p className="mt-2 text-sm text-case-muted">
              items requiring review
            </p>
          </article>
        </div>

        <div className="mt-8 rounded-[2rem] border border-case-border bg-case-gunmetal/40 p-5">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl border border-case-border bg-black/40">
                <Filter className="size-5 text-case-gold" />
              </div>

              <div>
                <p className="font-black">Checklist Filters</p>
                <p className="mt-1 text-sm text-case-muted">
                  Narrow evidence by category or review status.
                </p>
              </div>
            </div>

            <div className="rounded-full border border-case-border bg-black/35 px-4 py-2 text-sm font-bold text-case-gold">
              {filteredEvidence.length} visible
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-case-muted">
                Category
              </p>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isActive = selectedCategory === category;

                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                        isActive
                          ? "border-case-border-gold bg-case-gold/15 text-case-gold"
                          : "border-case-border bg-black/35 text-case-muted hover:text-case-parchment"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-case-muted">
                Status
              </p>

              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => {
                  const isActive = selectedStatus === status;

                  return (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                        isActive
                          ? "border-case-border-gold bg-case-gold/15 text-case-gold"
                          : "border-case-border bg-black/35 text-case-muted hover:text-case-parchment"
                      }`}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {filteredEvidence.map((item) => {
            const style = statusStyles[item.status];
            const StatusIcon = style.icon;

            return (
              <article
                key={item.id}
                className={`case-card rounded-[2rem] border p-6 ${style.borderClass}`}
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-case-border bg-case-gunmetal">
                      <StatusIcon className={`size-6 ${style.iconClass}`} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-case-muted">
                        {item.category}
                      </p>

                      <h3 className="mt-2 text-2xl font-black">
                        {item.label}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ${style.labelClass}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="rounded-2xl border border-case-border bg-black/35 p-4">
                  <div className="mb-3 flex items-center gap-2 text-case-gold">
                    <SearchCheck className="size-4" />
                    <p className="text-xs font-bold uppercase tracking-[0.18em]">
                      Review Notes
                    </p>
                  </div>

                  <p className="text-sm leading-6 text-case-muted">
                    {item.notes}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {filteredEvidence.length === 0 && (
          <div className="mt-8 rounded-[2rem] border border-case-border bg-black/35 p-8 text-center">
            <ClipboardCheck className="mx-auto size-10 text-case-gold" />
            <h3 className="mt-4 text-2xl font-black">
              No evidence items match these filters.
            </h3>
            <p className="mt-3 text-case-muted">
              Adjust the category or status filters to continue reviewing the
              mock evidence checklist.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}