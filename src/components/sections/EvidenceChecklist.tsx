"use client";

import EvidenceItem from "@/components/cards/EvidenceItem";
import SectionHeader from "@/components/ui/SectionHeader";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CheckCircle2,
  ClipboardCheck,
  FileQuestion,
  Filter,
  XCircle,
} from "lucide-react";

import { mockCaseAnalysis } from "@/data/mockCaseData";
import { EvidenceCategory, EvidenceStatus } from "@/types/caseBrief";

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
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasFilterAnimatedRef = useRef(false);

  const evidence = mockCaseAnalysis.evidenceChecklist;

  const [selectedCategory, setSelectedCategory] = useState<
    "All" | EvidenceCategory
  >("All");

  const [selectedStatus, setSelectedStatus] = useState<"All" | EvidenceStatus>(
    "All",
  );

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

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".evidence-header-item", {
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

      gsap.from(".evidence-metric-card", {
        y: 34,
        opacity: 0,
        scale: 0.985,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".evidence-metric-grid",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".evidence-filter-panel", {
        y: 32,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".evidence-filter-panel",
          start: "top 84%",
          once: true,
        },
      });

      gsap.from(".evidence-filter-button", {
        y: 14,
        opacity: 0,
        duration: 0.4,
        stagger: 0.025,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".evidence-filter-panel",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".evidence-item-card", {
        y: 34,
        opacity: 0,
        scale: 0.985,
        duration: 0.62,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".evidence-card-grid",
          start: "top 82%",
          once: true,
        },
      });

      gsap.to(".evidence-check-pulse", {
        scale: 1.1,
        opacity: 0.7,
        duration: 1.45,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (!hasFilterAnimatedRef.current) {
      hasFilterAnimatedRef.current = true;
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".evidence-item-card",
        {
          y: 18,
          opacity: 0,
          scale: 0.985,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.42,
          stagger: 0.05,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".evidence-visible-count",
        {
          scale: 0.94,
        },
        {
          scale: 1,
          duration: 0.32,
          ease: "back.out(1.7)",
        },
      );
    }, section);

    return () => ctx.revert();
  }, [selectedCategory, selectedStatus]);

  return (
    <section ref={sectionRef} id="evidence" className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
  <SectionHeader
    eyebrow="Evidence Checklist"
    title="Track what is available, missing, or needs review."
    eyebrowClassName="evidence-header-item"
    titleClassName="evidence-header-item"
  />

  <p className="evidence-header-item leading-8 text-case-muted">
    The checklist converts extracted case references into a structured review
    workflow. It helps identify what the mock packet contains, what appears
    absent, and what needs follow-up verification.
  </p>
</div>

        <div className="evidence-metric-grid grid gap-5 md:grid-cols-3">
          <article className="evidence-metric-card case-card rounded-3xl p-5">
            <div className="evidence-check-pulse mb-5 flex size-12 items-center justify-center rounded-2xl border border-case-green/35 bg-case-green/10">
              <CheckCircle2 className="size-6 text-case-green" />
            </div>

            <p className="text-4xl font-black text-case-green">
              {availableCount}
            </p>

            <p className="mt-2 text-sm text-case-muted">
              available evidence items
            </p>
          </article>

          <article className="evidence-metric-card case-card rounded-3xl p-5">
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

          <article className="evidence-metric-card case-card rounded-3xl p-5">
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

        <div className="evidence-filter-panel mt-8 rounded-[2rem] border border-case-border bg-case-gunmetal/40 p-5">
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

            <div className="evidence-visible-count rounded-full border border-case-border bg-black/35 px-4 py-2 text-sm font-bold text-case-gold">
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
                      className={`evidence-filter-button rounded-full border px-4 py-2 text-sm font-bold transition ${
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
                      className={`evidence-filter-button rounded-full border px-4 py-2 text-sm font-bold transition ${
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

        <div className="evidence-card-grid mt-8 grid gap-5 lg:grid-cols-2">
          {filteredEvidence.map((item) => (
            <EvidenceItem key={item.id} item={item} />
          ))}
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
