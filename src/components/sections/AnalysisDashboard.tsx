"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BadgeCheck,
  Building2,
  FileText,
  Fingerprint,
  Landmark,
  UserRound,
} from "lucide-react";

import { mockCaseAnalysis } from "@/data/mockCaseData";
import FactCard from "@/components/cards/FactCard";
import SectionHeader from "@/components/ui/SectionHeader";

export default function AnalysisDashboard() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const caseData = mockCaseAnalysis;

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".analysis-header-item", {
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

      gsap.from(".case-file-card", {
        y: 34,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".analysis-card-grid",
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(".party-panel", {
        y: 34,
        opacity: 0,
        duration: 0.8,
        delay: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".analysis-card-grid",
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(".analysis-meta-card", {
        y: 22,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".analysis-meta-grid",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".party-card", {
        x: 22,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".party-list",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".fact-heading-item", {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".fact-heading",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".fact-card", {
        y: 34,
        opacity: 0,
        scale: 0.985,
        duration: 0.65,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".fact-grid",
          start: "top 82%",
          once: true,
        },
      });

      gsap.to(".analysis-orb", {
        scale: 1.08,
        opacity: 0.65,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
  ref={sectionRef}
  id="analysis"
  className="px-4 py-16 sm:px-6 md:px-10 md:py-20"
>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 xl:grid-cols-[0.9fr_1.1fr] xl:items-end">
          <SectionHeader
            eyebrow="Extracted Case Intelligence"
            title="Structured facts pulled from the mock case file."
            eyebrowClassName="analysis-header-item"
            titleClassName="analysis-header-item"
          />

          <p className="analysis-header-item leading-8 text-case-muted">
            This dashboard transforms an unstructured legal document packet into
            organized case data: parties, jurisdiction, facts, confidence
            scores, and source references.
          </p>
        </div>

        <div className="analysis-card-grid grid gap-5 xl:grid-cols-4">
          <article className="case-file-card case-card relative overflow-hidden rounded-[1.5rem] p-4 sm:rounded-3xl sm:p-5 xl:col-span-2">
            <div className="analysis-orb pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-case-gold/8 blur-3xl" />

            <div className="relative">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-case-gold">
                    Case File
                  </p>
                  <h3 className="mt-3 text-2xl font-black sm:text-3xl">
                    {caseData.caseTitle}
                  </h3>
                </div>

                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-case-border bg-case-gunmetal">
                  <Fingerprint className="size-6 text-case-gold" />
                </div>
              </div>

              <div className="analysis-meta-grid grid gap-3 sm:grid-cols-2 sm:gap-4">
                <div className="analysis-meta-card rounded-2xl border border-case-border bg-black/35 p-3 sm:p-4">
                  <div className="mb-3 flex items-center gap-2 text-case-gold">
                    <FileText className="size-4" />
                    <p className="text-xs font-bold uppercase tracking-[0.18em]">
                      Document
                    </p>
                  </div>
                  <p className="font-bold">{caseData.documentName}</p>
                </div>

                <div className="analysis-meta-card rounded-2xl border border-case-border bg-black/35 p-3 sm:p-4">
                  <div className="mb-3 flex items-center gap-2 text-case-gold">
                    <Building2 className="size-4" />
                    <p className="text-xs font-bold uppercase tracking-[0.18em]">
                      Case Type
                    </p>
                  </div>
                  <p className="font-bold">{caseData.caseType}</p>
                </div>

                <div className="analysis-meta-card rounded-2xl border border-case-border bg-black/35 p-3 sm:p-4">
                  <div className="mb-3 flex items-center gap-2 text-case-gold">
                    <Landmark className="size-4" />
                    <p className="text-xs font-bold uppercase tracking-[0.18em]">
                      Court
                    </p>
                  </div>
                  <p className="font-bold">{caseData.court}</p>
                </div>

                <div className="analysis-meta-card rounded-2xl border border-case-border bg-black/35 p-3 sm:p-4">
                  <div className="mb-3 flex items-center gap-2 text-case-gold">
                    <BadgeCheck className="size-4" />
                    <p className="text-xs font-bold uppercase tracking-[0.18em]">
                      Jurisdiction
                    </p>
                  </div>
                  <p className="font-bold">{caseData.jurisdiction}</p>
                </div>
              </div>
            </div>
          </article>

          <article className="party-panel case-card rounded-[1.5rem] p-4 sm:rounded-3xl sm:p-5 xl:col-span-2">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-case-gold">
                  Parties
                </p>
                <h3 className="mt-3 text-2xl font-black">
                  Identified Participants
                </h3>
              </div>

              <div className="w-fit rounded-full border border-case-border bg-black/35 px-3 py-1 text-sm font-bold text-case-gold">
                {caseData.parties.length} found
              </div>
            </div>

            <div className="party-list space-y-3">
              {caseData.parties.map((party) => (
                <div
                  key={party.id}
                  className="party-card rounded-2xl border border-case-border bg-black/35 p-3 sm:p-4"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-case-gunmetal">
                      <UserRound className="size-5 text-case-gold" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-black">{party.name}</p>
                        <span className="rounded-full border border-case-border bg-case-gunmetal px-2 py-1 text-xs text-case-muted">
                          {party.role}
                        </span>
                      </div>

                      <p className="mt-2 text-xs leading-5 text-case-muted sm:text-sm sm:leading-6">
                        {party.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-8">
          <div className="fact-heading mb-5 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
            <SectionHeader
              eyebrow="Fact Extraction"
              title="Key facts detected"
              eyebrowClassName="fact-heading-item"
              titleClassName="fact-heading-item text-3xl md:text-3xl"
            />

            <p className="fact-heading-item max-w-xl text-sm leading-6 text-case-muted">
              Each fact includes a mock confidence score and source reference to
              demonstrate AI explainability and review traceability.
            </p>
          </div>

          <div className="fact-grid grid gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
            {caseData.facts.map((fact) => (
              <FactCard key={fact.id} fact={fact} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
