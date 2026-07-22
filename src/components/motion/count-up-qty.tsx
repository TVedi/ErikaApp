"use client";

import { useEffect, useRef, useState } from "react";

type CountUpQtyProps = {
  /** Final qty string, byte-identical when settled (e.g. "8x", "30+", "20"). */
  finalText: string;
  className?: string;
};

function parseQty(finalText: string): { value: number; suffix: string } | null {
  const m = finalText.match(/^(\d+)(x|\+)?$/);
  if (!m) return null;
  return { value: Number(m[1]), suffix: m[2] ?? "" };
}

/**
 * One-shot count-up on first IntersectionObserver reveal.
 * prefers-reduced-motion → final text immediately. Replay-safe (fires once).
 */
export function CountUpQty({ finalText, className }: CountUpQtyProps) {
  const parsed = parseQty(finalText);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);
  const [display, setDisplay] = useState(finalText);

  useEffect(() => {
    const qty = parseQty(finalText);
    if (!qty) {
      setDisplay(finalText);
      return;
    }

    const el = ref.current;
    if (!el || startedRef.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(finalText);
      startedRef.current = true;
      return;
    }

    setDisplay(`0${qty.suffix}`);

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        obs.disconnect();

        const start = performance.now();
        // ~2s ease-out so final values settle visibly (one-shot; reduced-motion skips).
        const duration = 2000;
        const easeOut = (t: number) => 1 - (1 - t) ** 3;

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          if (t >= 1) {
            setDisplay(finalText);
            return;
          }
          const n = Math.round(easeOut(t) * qty.value);
          setDisplay(`${n}${qty.suffix}`);
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.35, rootMargin: "0px" },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [finalText]);

  if (!parsed) {
    return <span className={className}>{finalText}</span>;
  }

  return (
    <span
      ref={ref}
      className={className}
      style={{
        fontVariantNumeric: "tabular-nums",
        display: "inline-block",
        minWidth: `${finalText.length}ch`,
        textAlign: "left",
      }}
    >
      {display}
    </span>
  );
}
