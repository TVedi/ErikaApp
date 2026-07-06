"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarketingCtaRevealProps = {
  children: ReactNode;
  className?: string;
  /** Pause before the assemble animation starts (default 2000ms) */
  delayMs?: number;
};

/**
 * Delayed grain-assemble reveal for section CTAs — works inside split-screen columns
 * where ScrollReveal is intentionally disabled.
 */
export function MarketingCtaReveal({
  children,
  className,
  delayMs = 2000,
}: MarketingCtaRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("marketing-cta-reveal-visible");
      return;
    }

    el.classList.add("marketing-cta-reveal");

    let delayTimer: ReturnType<typeof setTimeout> | undefined;
    let observer: IntersectionObserver | undefined;

    const startAssemble = () => {
      delayTimer = setTimeout(() => {
        el.classList.add("marketing-cta-reveal-visible");
      }, delayMs);
    };

    const rect = el.getBoundingClientRect();
    const inView =
      rect.top < window.innerHeight * 0.92 && rect.bottom > 0;

    if (inView) {
      startAssemble();
    } else {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startAssemble();
            observer?.disconnect();
          }
        },
        { threshold: 0.01 }
      );
      observer.observe(el);
    }

    return () => {
      observer?.disconnect();
      if (delayTimer) clearTimeout(delayTimer);
    };
  }, [delayMs]);

  return (
    <div className={cn(className)}>
      <div ref={ref} className="marketing-cta-reveal-inner inline-flex">
        {children}
      </div>
    </div>
  );
}
