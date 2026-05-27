"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TimelineItem from "@/components/cards/TimelineItem";
import { GitBranch, ShieldAlert } from "lucide-react";

import { mockCaseAnalysis } from "@/data/mockCaseData";

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timeline = mockCaseAnalysis.timeline;

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".timeline-header-item", {
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

      gsap.from(".timeline-summary-card", {
        x: -36,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".timeline-layout",
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(".timeline-summary-stat", {
        y: 22,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".timeline-summary-stats",
          start: "top 82%",
          once: true,
        },
      });

      gsap.fromTo(
        ".timeline-spine",
        {
          scaleY: 0,
          transformOrigin: "top center",
        },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".timeline-events",
            start: "top 80%",
            once: true,
          },
        },
      );

      gsap.from(".timeline-event-marker", {
        scale: 0,
        opacity: 0,
        duration: 0.45,
        stagger: 0.12,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".timeline-events",
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(".timeline-event-card", {
        x: 42,
        opacity: 0,
        scale: 0.985,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".timeline-events",
          start: "top 78%",
          once: true,
        },
      });

      gsap.to(".timeline-pulse", {
        scale: 1.1,
        opacity: 0.65,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="timeline" className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="timeline-header-item text-sm font-bold uppercase tracking-[0.32em] text-case-gold">
              Timeline Builder
            </p>

            <h2 className="timeline-header-item mt-3 text-4xl font-black leading-tight md:text-5xl">
              Reconstruct the case sequence from scattered document clues.
            </h2>
          </div>

          <p className="timeline-header-item leading-8 text-case-muted">
            The timeline organizes extracted dates, reports, witness references,
            filings, and supporting document mentions into a chronological
            review path.
          </p>
        </div>

        <div className="timeline-layout grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="timeline-summary-card case-card h-fit rounded-[2rem] p-6">
            <div className="timeline-pulse flex size-14 items-center justify-center rounded-2xl border border-case-border bg-case-gunmetal">
              <GitBranch className="size-7 text-case-gold" />
            </div>

            <h3 className="mt-6 text-2xl font-black">Case chronology</h3>

            <p className="mt-4 leading-7 text-case-muted">
              A strong legal review workflow depends on knowing what happened,
              when it happened, what source supports it, and whether any dates
              appear incomplete or inconsistent.
            </p>

            <div className="case-divider my-6" />

            <div className="timeline-summary-stats grid gap-4">
              <div className="timeline-summary-stat rounded-2xl border border-case-border bg-black/35 p-4">
                <p className="text-3xl font-black text-case-gold">
                  {timeline.length}
                </p>
                <p className="mt-1 text-sm text-case-muted">
                  timeline events detected
                </p>
              </div>

              <div className="timeline-summary-stat rounded-2xl border border-case-border bg-black/35 p-4">
                <p className="text-3xl font-black text-case-red-soft">2</p>
                <p className="mt-1 text-sm text-case-muted">
                  evidence gaps connected to dates
                </p>
              </div>

              <div className="timeline-summary-stat rounded-2xl border border-case-border bg-black/35 p-4">
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

          <div className="timeline-events relative">
            <div className="timeline-spine absolute bottom-8 left-5 top-8 hidden w-px bg-gradient-to-b from-case-gold/0 via-case-border-gold to-case-gold/0 md:block" />

            <div className="space-y-5">
              {timeline.map((event, index) => (
                <TimelineItem key={event.id} event={event} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
