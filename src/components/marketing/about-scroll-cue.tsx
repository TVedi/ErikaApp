"use client";

import { useEffect, useState } from "react";

/**
 * Coral scroll cue — CSS fade-in + bob; JS only toggles hide on scroll
 * (no scrollTo / scrollIntoView — navigation is the anchor href).
 */
export function AboutScrollCue({ href }: { href: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Cleaner: hide on first meaningful scroll away from top
      setHidden(window.scrollY > 32);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={href}
      className={hidden ? "about-scroll-cue is-hidden" : "about-scroll-cue"}
      aria-label="Scroll to story"
    >
      <svg
        className="about-scroll-cue-icon"
        width="28"
        height="28"
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
