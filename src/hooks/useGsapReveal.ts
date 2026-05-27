"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type UseGsapRevealOptions = {
  selector?: string;
  x?: number;
  y?: number;
  scale?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
  once?: boolean;
  ease?: string;
};

export default function useGsapReveal<T extends HTMLElement = HTMLElement>({
  selector = ".gsap-reveal",
  x = 0,
  y = 28,
  scale = 1,
  opacity = 0,
  duration = 0.7,
  stagger = 0.1,
  delay = 0,
  start = "top 82%",
  once = true,
  ease = "power3.out",
}: UseGsapRevealOptions = {}) {
  const scopeRef = useRef<T | null>(null);

  useEffect(() => {
    const scope = scopeRef.current;

    if (!scope) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(selector, {
        x,
        y,
        scale,
        opacity,
        duration,
        stagger,
        delay,
        ease,
        scrollTrigger: {
          trigger: scope,
          start,
          once,
          toggleActions: once
            ? "play none none none"
            : "play none none reverse",
        },
      });
    }, scope);

    return () => ctx.revert();
  }, [
    selector,
    x,
    y,
    scale,
    opacity,
    duration,
    stagger,
    delay,
    start,
    once,
    ease,
  ]);

  return scopeRef;
}