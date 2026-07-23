"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Coral scroll cue — CSS fade-in + bob; JS only toggles hide-on-scroll class.
 * Navigation is the anchor href + CSS smooth scrolling (no imperative scroll APIs).
 */
export function AboutScrollCue({ href }: { href: string }) {
  const [hidden, setHidden] = useState(false);
  const armedRef = useRef(false);

  useEffect(() => {
    const cue = document.querySelector(".about-scroll-cue");

    const arm = () => {
      armedRef.current = true;
    };

    // Arm hide only after the fade-in animation finishes (not a fixed timer
    // that can race ahead of the CSS delay).
    const onAnimEnd = (e: Event) => {
      const ae = e as AnimationEvent;
      if (ae.animationName.includes("about-scroll-cue-in")) arm();
    };

    cue?.addEventListener("animationend", onAnimEnd);
    // Fallback if animationend is missed (reduced-motion / interrupted).
    const fallback = window.setTimeout(arm, 2500);

    const onScroll = () => {
      if (!armedRef.current) return;
      setHidden(window.scrollY > 32);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cue?.removeEventListener("animationend", onAnimEnd);
      window.clearTimeout(fallback);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <a
      href={href}
      className={hidden ? "about-scroll-cue is-hidden" : "about-scroll-cue"}
      aria-label="Scroll to story"
    >
      <svg
        className="about-scroll-cue-icon"
        width="40"
        height="40"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M14 5v15.5M8.5 15.5 14 21l5.5-5.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
