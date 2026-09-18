"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

/**
 * Scroll-reveal via DOM classes (useLayoutEffect) so content is never stuck hidden.
 * Without JS or with reduced motion: no classes added — fully visible.
 */
export function ScrollReveal({ children, className, delayMs = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    /* Split-screen columns: always visible — opacity reveal here caused wheel-scroll jumps */
    if (el.closest(".split-screen-content-col")) {
      return;
    }

    el.classList.add("scroll-reveal");
    if (delayMs > 0) {
      el.style.transitionDelay = `${delayMs}ms`;
    }

    /*
     * Document-absolute, not viewport-relative: this effect runs before the
     * router resets the scroll position on a client-side navigation, so a
     * viewport-relative measurement would reflect the previous page's offset
     * and misclassify the sections near the top of this page.
     */
    const absoluteTop = el.getBoundingClientRect().top + window.scrollY;
    const inView = absoluteTop < window.innerHeight * 0.92;

    if (inView) {
      el.classList.add("scroll-reveal-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("scroll-reveal-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
