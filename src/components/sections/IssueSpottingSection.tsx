"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle, BrainCircuit, FileWarning } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { mockCaseAnalysis } from "@/data/mockCaseData";
import IssueCard from "@/components/cards/IssueCard";

export default function IssueSpottingSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const issues = mockCaseAnalysis.issues;

  const highRiskCount = issues.filter(
    (issue) => issue.riskLevel === "High",
  ).length;

  const mediumRiskCount = issues.filter(
    (issue) => issue.riskLevel === "Medium",
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
      gsap.from(".issue-header-item", {
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

      gsap.from(".issue-metric-card", {
        y: 34,
        opacity: 0,
        scale: 0.985,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".issue-metric-grid",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".issue-card", {
        y: 42,
        opacity: 0,
        rotateX: 6,
        transformOrigin: "center bottom",
        duration: 0.75,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".issue-card-grid",
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(".issue-review-box", {
        y: 26,
        opacity: 0,
        duration: 0.65,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".issue-review-box",
          start: "top 85%",
          once: true,
        },
      });

      gsap.to(".issue-warning-pulse", {
        scale: 1.12,
        opacity: 0.72,
        duration: 1.35,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="issues" className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <SectionHeader
            eyebrow="Issue Spotting"
            title="Flag possible review areas without pretending to give legal advice."
            eyebrowClassName="issue-header-item"
            titleClassName="issue-header-item"
          />

          <p className="issue-header-item leading-8 text-case-muted">
            CaseBrief AI frames issue spotting as review assistance. It surfaces
            incomplete records, missing evidence, timeline inconsistencies, and
            attorney-review prompts while keeping disclaimers visible.
          </p>
        </div>

        <div className="issue-metric-grid grid gap-5 md:grid-cols-3">
          <article className="issue-metric-card case-card rounded-3xl p-5">
            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl border border-case-border bg-case-gunmetal">
              <FileWarning className="size-6 text-case-gold" />
            </div>

            <p className="text-4xl font-black text-case-gold">
              {issues.length}
            </p>

            <p className="mt-2 text-sm text-case-muted">
              possible review issues detected
            </p>
          </article>

          <article className="issue-metric-card case-card rounded-3xl p-5">
            <div className="issue-warning-pulse mb-5 flex size-12 items-center justify-center rounded-2xl border border-case-red/45 bg-case-red/10">
              <AlertTriangle className="size-6 text-case-red-soft" />
            </div>

            <p className="text-4xl font-black text-case-red-soft">
              {highRiskCount}
            </p>

            <p className="mt-2 text-sm text-case-muted">
              high-priority issue requiring review
            </p>
          </article>

          <article className="issue-metric-card case-card rounded-3xl p-5">
            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl border border-case-border-gold bg-case-gold/10">
              <BrainCircuit className="size-6 text-case-gold" />
            </div>

            <p className="text-4xl font-black text-case-gold">
              {mediumRiskCount}
            </p>

            <p className="mt-2 text-sm text-case-muted">
              medium-priority issues for follow-up
            </p>
          </article>
        </div>

        <div className="issue-card-grid mt-8 grid gap-5 lg:grid-cols-3">
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>

        <div className="issue-review-box mt-8 rounded-[2rem] border border-case-border bg-case-gunmetal/40 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-case-gold">
                Product Safety Pattern
              </p>

              <h3 className="mt-3 text-2xl font-black">
                The AI suggests review areas. It does not decide legal strategy.
              </h3>
            </div>

            <p className="max-w-2xl leading-7 text-case-muted">
              This distinction is important for a credible legal-tech product.
              The interface helps organize information, but it keeps the final
              interpretation, legal judgment, and case strategy with qualified
              professionals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
