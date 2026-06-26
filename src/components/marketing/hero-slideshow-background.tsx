"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  HERO_CROSSFADE_MS,
  HERO_KEN_BURNS_PAN_X_END,
  HERO_KEN_BURNS_SCALE_END,
  HERO_KEN_BURNS_SCALE_START,
  HERO_SLIDE_INTERVAL_MS,
  HERO_SLIDESHOW_IMAGES,
  getHeroKenBurnsDurationMs,
} from "@/lib/marketing/hero-slideshow";

/**
 * Uniform opacity cross-fade: one activeIndex, all layers always mounted with always-on transitions.
 * Ken-Burns stays on outgoing slides until the crossfade finishes (transform reset while invisible).
 * prefers-reduced-motion: first image only, static.
 */
export function HeroSlideshowBackground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  /** Slides that keep Ken-Burns running (active + outgoing until fade completes). */
  const [kenBurnsIndices, setKenBurnsIndices] = useState<Set<number>>(
    () => new Set([0])
  );
  const activeIndexRef = useRef(0);
  const kenBurnsResetTimerRef = useRef<number | null>(null);

  const kenBurnsDurationMs = getHeroKenBurnsDurationMs();

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    let cancelled = false;

    async function preloadSlides() {
      await Promise.all(
        HERO_SLIDESHOW_IMAGES.map(async (slide) => {
          const img = new window.Image();
          img.src = slide.src;
          if (typeof img.decode === "function") {
            try {
              await img.decode();
            } catch {
              // decode() can fail for missing assets; still allow slideshow to start
            }
          } else {
            await new Promise<void>((resolve) => {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            });
          }
        })
      );

      if (!cancelled) {
        setImagesReady(true);
      }
    }

    preloadSlides();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || HERO_SLIDESHOW_IMAGES.length <= 1) {
      setMotionEnabled(false);
      setActiveIndex(0);
      setKenBurnsIndices(new Set([0]));
      return;
    }

    if (!imagesReady) {
      return;
    }

    setMotionEnabled(true);

    const interval = window.setInterval(() => {
      const next =
        (activeIndexRef.current + 1) % HERO_SLIDESHOW_IMAGES.length;
      setActiveIndex(next);
    }, HERO_SLIDE_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [imagesReady]);

  useEffect(() => {
    if (!motionEnabled) {
      setKenBurnsIndices(new Set([0]));
      return;
    }

    setKenBurnsIndices((prev) => {
      const next = new Set(prev);
      next.add(activeIndex);
      return next;
    });

    if (kenBurnsResetTimerRef.current !== null) {
      window.clearTimeout(kenBurnsResetTimerRef.current);
    }

    kenBurnsResetTimerRef.current = window.setTimeout(() => {
      setKenBurnsIndices(new Set([activeIndex]));
      kenBurnsResetTimerRef.current = null;
    }, HERO_CROSSFADE_MS);

    return () => {
      if (kenBurnsResetTimerRef.current !== null) {
        window.clearTimeout(kenBurnsResetTimerRef.current);
      }
    };
  }, [activeIndex, motionEnabled]);

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[var(--brand-base)]"
      aria-hidden="true"
    >
      {HERO_SLIDESHOW_IMAGES.map((slide, index) => {
        const isActive = motionEnabled ? index === activeIndex : index === 0;
        const layerOpacity = isActive ? 1 : 0;
        const kenBurnsOn =
          motionEnabled && kenBurnsIndices.has(index);

        return (
          <div
            key={slide.src}
            className="absolute inset-0 pointer-events-none transition-opacity ease-in-out"
            style={{
              opacity: layerOpacity,
              transitionDuration: motionEnabled ? `${HERO_CROSSFADE_MS}ms` : "0ms",
            }}
          >
            <div
              className={cn(
                "absolute inset-0",
                kenBurnsOn && "hero-slideshow-ken-burns"
              )}
              style={
                kenBurnsOn
                  ? {
                      ["--hero-ken-burns-scale-start" as string]: HERO_KEN_BURNS_SCALE_START,
                      ["--hero-ken-burns-scale-end" as string]: HERO_KEN_BURNS_SCALE_END,
                      ["--hero-ken-burns-pan-x-end" as string]: HERO_KEN_BURNS_PAN_X_END,
                      animationDuration: `${kenBurnsDurationMs}ms`,
                    }
                  : undefined
              }
            >
              <Image
                src={slide.src}
                alt=""
                fill
                loading="eager"
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
