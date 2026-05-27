"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle, FileLock2, Scale, ShieldAlert } from "lucide-react";

const disclaimerPoints = [
  {
    icon: ShieldAlert,
    label: "Non-Legal Advice",
    text: "This mockup organizes information but does not provide legal advice or case strategy.",
  },
  {
    icon: FileLock2,
    label: "No Real Uploads",
    text: "The analyzer uses mock data only. Do not upload confidential or real legal documents.",
  },
  {
    icon: Scale,
    label: "Human Review Required",
    text: "All findings are framed as review prompts for qualified professional evaluation.",
  },
];

export default function DisclaimerStrip() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".disclaimer-shell", {
          y: 22,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".disclaimer-alert-icon",
          {
            scale: 0.4,
            opacity: 0,
            rotate: -12,
            duration: 0.45,
            ease: "back.out(1.8)",
          },
          "-=0.25",
        )
        .from(
          ".disclaimer-copy",
          {
            y: 18,
            opacity: 0,
            duration: 0.55,
            stagger: 0.08,
          },
          "-=0.2",
        )
        .from(
          ".disclaimer-point",
          {
            y: 18,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
          },
          "-=0.2",
        );

      gsap.to(".disclaimer-alert-icon", {
        scale: 1.08,
        opacity: 0.82,
        duration: 1.25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".disclaimer-shell", {
        borderColor: "rgba(212, 71, 79, 0.48)",
        duration: 0.11,
        repeat: 5,
        yoyo: true,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-4 py-8 sm:px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="disclaimer-shell relative overflow-hidden rounded-[1.5rem] border border-case-red/35 bg-case-red/10 p-4 sm:rounded-[2rem] sm:p-5 md:p-6">
          <div className="disclaimer-scanline" />

          <div className="relative grid gap-5 xl:grid-cols-[0.8fr_1.2fr] xl:items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="disclaimer-alert-icon flex size-11 shrink-0 items-center justify-center rounded-2xl border border-case-red/40 bg-black/35 sm:size-12">
                <AlertTriangle className="size-6 text-case-red-soft" />
              </div>

              <div>
                <p className="disclaimer-copy text-sm font-bold uppercase tracking-[0.28em] text-case-red-soft">
                  Safety Notice
                </p>

                <h2
  className="disclaimer-copy glitch-text mt-2 text-xl font-black leading-tight sm:text-2xl md:text-3xl"
  data-text="Portfolio mockup. Not legal advice."
>
                  Portfolio mockup. Not legal advice.
                </h2>

                <p className="disclaimer-copy mt-3 text-sm leading-7 text-case-muted sm:text-base">
                  CaseBrief AI demonstrates legal-tech product design,
                  structured data modeling, AI workflow UX, and frontend
                  engineering patterns.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {disclaimerPoints.map((point) => {
                const Icon = point.icon;

                return (
                  <article
                    key={point.label}
                    className="disclaimer-point rounded-2xl border border-case-border bg-black/35 p-4 sm:min-h-37.5"
                  >
                    <div className="mb-3 flex items-center gap-2 text-case-gold">
                      <Icon className="size-4" />
                      <p className="text-xs font-black uppercase tracking-[0.18em]">
                        {point.label}
                      </p>
                    </div>

                    <p className="text-sm leading-6 text-case-muted">
                      {point.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}