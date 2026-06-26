"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  HERO_CROSSFADE_MS,
  HERO_SLIDE_INTERVAL_MS,
  HERO_SLIDESHOW_IMAGES,
} from "@/lib/marketing/hero-slideshow";

/**
 * Slow cross-fade hero background. prefers-reduced-motion: first image only, static.
 */
export function HeroSlideshowBackground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [motionEnabled, setMotionEnabled] = useState(false);

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
      {HERO_SLIDESHOW_IMAGES.map((slide, index) => (
        <div
          key={slide.src}
          className={cn(
            "absolute inset-0 transition-opacity ease-in-out",
            index === activeIndex ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDuration: `${HERO_CROSSFADE_MS}ms` }}
        >
          <div
            className={cn(
              "absolute inset-0",
              motionEnabled && index === activeIndex && "hero-ken-burns"
            )}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: slide.objectPosition }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
