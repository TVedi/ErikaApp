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
  const [motionEnabled, setMotionEnabled] = useState(false);

  const kenBurnsCycleMs = getHeroKenBurnsCycleMs();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || HERO_SLIDESHOW_IMAGES.length <= 1) {
      setMotionEnabled(false);
      setActiveIndex(0);
      return;
    }

    setMotionEnabled(true);
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDESHOW_IMAGES.length);
    }, HERO_SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {HERO_SLIDESHOW_IMAGES.map((slide, index) => {
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
              motionEnabled && "transition-opacity ease-in-out",
              index === activeIndex ? "opacity-100" : "opacity-0"
            )}
            style={
              motionEnabled
                ? { transitionDuration: `${HERO_CROSSFADE_MS}ms` }
                : { opacity: index === 0 ? 1 : 0 }
            }
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
