"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { launch } from "@/content/copy";
import { sitePhotos } from "@/lib/marketing/site-photos";

const photo = sitePhotos.videoAnalysis1Kep;

/** Matches CSS: 1.1s transition + 150ms delay on the right slide. */
const SLIDE_IN_MS = 1250;

/**
 * Split-screen video analysis — replays slide-in on each viewport entry;
 * hybrid snap (off during animation, on after complete).
 */
export function VideoAnalysisSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.classList.add("video-analysis-assembled");
      return;
    }

    let snapTimer: number | null = null;

    const clearSnapTimer = () => {
      if (snapTimer !== null) {
        window.clearTimeout(snapTimer);
        snapTimer = null;
      }
    };

    const enableSnapAfterAnimation = () => {
      clearSnapTimer();
      snapTimer = window.setTimeout(() => {
        section.classList.remove("video-analysis-snap-off");
        snapTimer = null;
      }, SLIDE_IN_MS);
    };

    const resetEntrance = () => {
      clearSnapTimer();
      section.classList.remove("video-analysis-assembled");
      section.classList.add("video-analysis-snap-off");
    };

    const startEntrance = () => {
      section.classList.add("video-analysis-snap-off");
      section.classList.remove("video-analysis-assembled");
      void section.offsetHeight;
      requestAnimationFrame(() => {
        section.classList.add("video-analysis-assembled");
        enableSnapAfterAnimation();
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startEntrance();
        } else {
          resetEntrance();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);

    const rect = section.getBoundingClientRect();
    const initiallyInView =
      rect.top < window.innerHeight * 0.88 && rect.bottom > 0;

    if (initiallyInView) {
      startEntrance();
    } else {
      resetEntrance();
    }

    return () => {
      observer.disconnect();
      clearSnapTimer();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-video-analysis section-cream section-atmo-glow-alt section-screen section-screen-center video-analysis-snap-off w-full"
      aria-labelledby="video-analysis-heading"
    >
      <div className="split-screen-grid">
        {/* Photo — top on mobile, right on desktop */}
        <div className="video-analysis-slide-right split-screen-photo-col order-1 lg:order-2">
          <div className="split-photo-mask absolute inset-0">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              style={{ objectPosition: photo.objectPosition }}
            />
          </div>
        </div>

        {/* Content — below photo on mobile, left on desktop */}
        <div className="split-screen-content-col order-2 lg:order-1">
          <div className="video-analysis-slide-left w-full max-w-xl">
            <div className="program-card-glass w-full rounded-xl p-5 sm:p-6 lg:p-7">
              <h2
                id="video-analysis-heading"
                className="text-2xl font-bold text-foreground sm:text-3xl"
              >
                {launch.videoSection.title}
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {launch.videoSection.body}
              </p>
              <ul className="mt-6 space-y-2">
                {launch.videoSection.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
