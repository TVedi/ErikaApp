"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import {
  HERO_CROSSFADE_MS,
  HERO_KEN_BURNS_PAN_X_END,
  HERO_KEN_BURNS_SCALE_END,
  HERO_KEN_BURNS_SCALE_START,
  HERO_SLIDE_INTERVAL_MS,
  HERO_SLIDESHOW_IMAGES,
  getHeroKenBurnsCycleMs,
} from "@/lib/marketing/hero-slideshow";

/**
 * Cross-fade hero background with a coordinated slow Ken-Burns drift across the full loop.
 * prefers-reduced-motion: first image only, static.
 */
export function HeroSlideshowBackground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const [motionEnabled, setMotionEnabled] = useState(false);

  const kenBurnsCycleMs = getHeroKenBurnsCycleMs();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || HERO_SLIDESHOW_IMAGES.length <= 1) {
      setMotionEnabled(false);
      setActiveIndex(0);
      setOutgoingIndex(null);
      return;
    }

    setMotionEnabled(true);

    for (const slide of HERO_SLIDESHOW_IMAGES) {
      const img = new window.Image();
      img.src = slide.src;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % HERO_SLIDESHOW_IMAGES.length;
        setOutgoingIndex(prev);
        return next;
      });
    }, HERO_SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (outgoingIndex === null || !motionEnabled) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setOutgoingIndex(null);
    }, HERO_CROSSFADE_MS);

    return () => window.clearTimeout(timeout);
  }, [outgoingIndex, activeIndex, motionEnabled]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {HERO_SLIDESHOW_IMAGES.map((slide, index) => {
        const isActive = index === activeIndex;
        const isOutgoing = outgoingIndex === index;
        const participates = isActive || isOutgoing;

        const kenBurnsStyle: CSSProperties | undefined = motionEnabled
          ? {
              ["--hero-ken-burns-scale-start" as string]: HERO_KEN_BURNS_SCALE_START,
              ["--hero-ken-burns-scale-end" as string]: HERO_KEN_BURNS_SCALE_END,
              ["--hero-ken-burns-pan-x-end" as string]: HERO_KEN_BURNS_PAN_X_END,
              animationDuration: `${kenBurnsCycleMs}ms`,
              animationDelay: `${-(index * HERO_SLIDE_INTERVAL_MS)}ms`,
            }
          : undefined;

        return (
          <div
            key={slide.src}
            className={cn(
              "absolute inset-0",
              motionEnabled && participates && "transition-opacity ease-in-out",
              isActive ? "opacity-100" : "opacity-0",
              !participates && "pointer-events-none"
            )}
            style={{
              zIndex: isActive ? 2 : isOutgoing ? 1 : 0,
              visibility: participates || !motionEnabled ? "visible" : "hidden",
              ...(motionEnabled && participates
                ? { transitionDuration: `${HERO_CROSSFADE_MS}ms` }
                : !motionEnabled
                  ? { opacity: index === 0 ? 1 : 0 }
                  : { transitionDuration: "0ms" }),
            }}
          >
            <div
              className={cn(
                "absolute inset-0",
                motionEnabled && "hero-slideshow-ken-burns"
              )}
              style={kenBurnsStyle}
            >
              <Image
                src={slide.src}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className={slide.objectFit === "contain" ? "object-contain" : "object-cover"}
                style={{ objectPosition: slide.objectPosition }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
