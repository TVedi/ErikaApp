"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
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

type SlideState = {
  active: number;
  /** Slide fading out during cross-fade; null when idle. */
  outgoing: number | null;
};

/**
 * Cross-fade hero background with a coordinated slow Ken-Burns drift across the full loop.
 * prefers-reduced-motion: first image only, static.
 */
export function HeroSlideshowBackground() {
  const [slideState, setSlideState] = useState<SlideState>({ active: 0, outgoing: null });
  const [motionEnabled, setMotionEnabled] = useState(false);
  const slideStateRef = useRef(slideState);
  const fadeTimerRef = useRef<number | null>(null);

  const kenBurnsCycleMs = getHeroKenBurnsCycleMs();

  useEffect(() => {
    slideStateRef.current = slideState;
  }, [slideState]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || HERO_SLIDESHOW_IMAGES.length <= 1) {
      setMotionEnabled(false);
      setSlideState({ active: 0, outgoing: null });
      return;
    }

    setMotionEnabled(true);

    for (const slide of HERO_SLIDESHOW_IMAGES) {
      const img = new window.Image();
      img.src = slide.src;
    }

    const interval = window.setInterval(() => {
      const { active, outgoing } = slideStateRef.current;
      if (outgoing !== null) {
        return;
      }

      const next = (active + 1) % HERO_SLIDESHOW_IMAGES.length;
      setSlideState({ active: next, outgoing: active });

      if (fadeTimerRef.current !== null) {
        window.clearTimeout(fadeTimerRef.current);
      }
      fadeTimerRef.current = window.setTimeout(() => {
        setSlideState((prev) => ({ active: prev.active, outgoing: null }));
        fadeTimerRef.current = null;
      }, HERO_CROSSFADE_MS);
    }, HERO_SLIDE_INTERVAL_MS);

    return () => {
      window.clearInterval(interval);
      if (fadeTimerRef.current !== null) {
        window.clearTimeout(fadeTimerRef.current);
      }
    };
  }, []);

  const { active, outgoing } = slideState;

  return (
    <div className="absolute inset-0 overflow-hidden isolate" aria-hidden="true">
      {HERO_SLIDESHOW_IMAGES.map((slide, index) => {
        const isActive = index === active;
        const isOutgoing = outgoing === index;
        const participates = isActive || isOutgoing;

        const kenBurnsStyle: CSSProperties | undefined =
          motionEnabled && participates
            ? {
                ["--hero-ken-burns-scale-start" as string]: HERO_KEN_BURNS_SCALE_START,
                ["--hero-ken-burns-scale-end" as string]: HERO_KEN_BURNS_SCALE_END,
                ["--hero-ken-burns-pan-x-end" as string]: HERO_KEN_BURNS_PAN_X_END,
                animationDuration: `${kenBurnsCycleMs}ms`,
                animationDelay: `${-(index * HERO_SLIDE_INTERVAL_MS)}ms`,
              }
            : undefined;

        const layerOpacity = !motionEnabled
          ? index === 0
            ? 1
            : 0
          : isActive
            ? 1
            : isOutgoing
              ? 0
              : 0;

        const layerStyle: CSSProperties = {
          opacity: layerOpacity,
          zIndex: isActive ? 2 : isOutgoing ? 1 : -1,
          visibility: participates || !motionEnabled ? "visible" : "hidden",
          transitionProperty: motionEnabled && participates ? "opacity" : "none",
          transitionDuration:
            motionEnabled && participates ? `${HERO_CROSSFADE_MS}ms` : "0ms",
          transitionTimingFunction: "ease-in-out",
        };

        return (
          <div
            key={slide.src}
            className="absolute inset-0 pointer-events-none"
            style={layerStyle}
          >
            <div
              className={cn(
                "absolute inset-0",
                motionEnabled && participates && "hero-slideshow-ken-burns"
              )}
              style={kenBurnsStyle}
            >
              <Image
                src={slide.src}
                alt=""
                fill
                loading="eager"
                priority={index === 0}
                sizes="100vw"
                className={
                  slide.objectFit === "contain" ? "object-contain" : "object-cover"
                }
                style={{ objectPosition: slide.objectPosition }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
