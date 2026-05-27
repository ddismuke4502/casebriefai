"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  CheckCircle2,
  FileSearch,
  Fingerprint,
  Gavel,
  LockKeyhole,
  Radar,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

import ProgressBar from "@/components/ui/ProgressBar";
import { LinkButton } from "@/components/ui/Button";

const analysisSteps = [
  "Upload mock case file",
  "Extract parties and facts",
  "Build timeline",
  "Spot possible issues",
  "Prepare evidence checklist",
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.8,
        },
      });

      timeline
        .from(
          ".hero-eyebrow",
          {
            y: 20,
            opacity: 0,
          },
          "-=0.35",
        )
        .from(
          ".hero-title",
          {
            y: 34,
            opacity: 0,
          },
          "-=0.45",
        )
        .from(
          ".hero-copy",
          {
            y: 24,
            opacity: 0,
          },
          "-=0.5",
        )
        .from(
          ".hero-actions a",
          {
            y: 18,
            opacity: 0,
            stagger: 0.12,
          },
          "-=0.45",
        )
        .from(
          ".hero-stat",
          {
            y: 24,
            opacity: 0,
            stagger: 0.12,
          },
          "-=0.35",
        )
        .from(
          ".hero-panel",
          {
            x: 48,
            opacity: 0,
            rotate: 1.5,
            duration: 1,
          },
          "-=0.85",
        )
        .from(
          ".hero-scan-step",
          {
            x: 22,
            opacity: 0,
            stagger: 0.08,
          },
          "-=0.45",
        );

      gsap.to(".hero-signal", {
        scale: 1.08,
        opacity: 0.55,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-file-icon", {
        y: -8,
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
      className="case-grid-bg relative overflow-hidden px-4 py-12 sm:px-6 md:min-h-screen md:px-10 md:py-6"
    >
      <div className="hero-signal pointer-events-none absolute left-1/2 top-16 size-[20rem] -translate-x-1/2 rounded-full bg-case-gold/5 blur-3xl sm:size-[26rem] md:top-20 md:size-[32rem]" />
      <div className="pointer-events-none absolute right-0 top-0 size-[24rem] rounded-full bg-case-red/5 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 py-8 sm:py-12 md:grid-cols-[1.05fr_0.95fr] md:gap-12 md:py-24">
        <div>
          <div className="hero-eyebrow mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-case-border bg-case-gunmetal/80 px-3 py-2 text-xs text-case-muted sm:px-4 sm:text-sm">
            <Sparkles className="size-4 text-case-gold" />
            AI-assisted mock case review platform
          </div>

          <h1 className="hero-title max-w-4xl text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl md:text-7xl md:leading-[0.95]">
            Analyze case files like a{" "}
            <span className="noir-text-gradient">detective-grade</span> legal AI
            system.
          </h1>

          <p className="hero-copy mt-5 max-w-2xl text-base leading-7 text-case-muted sm:text-lg sm:leading-8">
            CaseBrief AI is a portfolio-grade legal document analyzer mockup
            that simulates document upload, extracted case facts, timeline
            generation, issue spotting, evidence checklists, and exportable
            summaries.
          </p>

          <div className="hero-actions mt-8 flex flex-col gap-4 sm:flex-row">
            <LinkButton
              href="#analyzer"
              variant="signal"
              size="lg"
              className="w-full sm:w-auto"
            >
              Analyze Mock Case File
              <ArrowRight className="size-5" />
            </LinkButton>

            <LinkButton
              href="#disclaimer"
              variant="redline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Read Disclaimer
              <ShieldAlert className="size-5" />
            </LinkButton>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3 md:mt-10">
            <div className="hero-stat case-card rounded-2xl p-4">
              <p className="text-2xl font-black text-case-gold">92%</p>
              <p className="mt-1 text-xs text-case-muted">
                Mock extraction confidence
              </p>
            </div>

            <div className="hero-stat case-card rounded-2xl p-4">
              <p className="text-2xl font-black text-case-gold">14</p>
              <p className="mt-1 text-xs text-case-muted">
                Timeline events detected
              </p>
            </div>

            <div className="hero-stat case-card rounded-2xl p-4">
              <p className="text-2xl font-black text-case-red-soft">3</p>
              <p className="mt-1 text-xs text-case-muted">
                Issues flagged for review
              </p>
            </div>
          </div>
        </div>

        <div className="hero-panel case-card relative rounded-[1.5rem] p-4 sm:rounded-[2rem] sm:p-5">
          <div className="absolute -right-10 -top-10 size-40 rounded-full bg-case-gold/5 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-case-red/5 blur-3xl" />

          <div className="relative rounded-[1.25rem] border border-case-border bg-black/55 p-4 sm:rounded-[1.5rem] sm:p-5">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-case-gold">
                  Active Review
                </p>
                <h2 className="mt-2 text-xl font-black sm:text-2xl">
                  State v. Demo Client
                </h2>
              </div>

              <div className="hero-file-icon flex size-12 items-center justify-center rounded-2xl border border-case-border bg-case-gunmetal">
                <Fingerprint className="size-6 text-case-gold" />
              </div>
            </div>

            <div className="rounded-2xl border border-case-border bg-case-surface/80 p-4">
              <ProgressBar value={68} label="AI scan progress" tone="gold" />
            </div>

            <div className="mt-5 space-y-3">
              {analysisSteps.map((step, index) => (
                <div
                  key={step}
                  className="hero-scan-step flex items-center gap-3 rounded-2xl border border-case-border bg-black/35 p-4"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-case-gold text-sm font-black text-black">
                    {index < 2 ? (
                      <CheckCircle2 className="size-4" />
                    ) : (
                      index + 1
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-case-parchment">{step}</p>
                  </div>

                  {index === 2 && <Radar className="size-4 text-case-gold" />}
                  {index === 3 && (
                    <FileSearch className="size-4 text-case-red-soft" />
                  )}
                  {index === 4 && <Gavel className="size-4 text-case-muted" />}
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-case-red/40 bg-case-red/10 p-4">
              <div className="flex items-start gap-3">
                <LockKeyhole className="mt-1 size-5 shrink-0 text-case-red-soft" />
                <p className="text-sm leading-6 text-case-muted">
                  Mock analysis only. This interface is designed for portfolio
                  demonstration and does not provide legal advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
