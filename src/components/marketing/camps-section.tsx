"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { launch } from "@/content/copy";
import { sitePhotos } from "@/lib/marketing/site-photos";
import {
  HERO_KEN_BURNS_SCALE_END,
  HERO_KEN_BURNS_SCALE_START,
  getHeroKenBurnsDurationMs,
} from "@/lib/marketing/hero-slideshow";

const photo = sitePhotos.campsBackground;
const kenBurnsDurationMs = getHeroKenBurnsDurationMs();

/**
 * Camps — full-bleed camp.jpg with hero-style Ken-Burns + heading + Coming soon.
 */
export function CampsSection() {
  const [kenBurnsOn, setKenBurnsOn] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setKenBurnsOn(!reduced);
  }, []);

  return (
    <section
      className="section-camps section-screen section-screen-center w-full"
      aria-labelledby="camps-heading"
    >
      <div
        className="absolute inset-0 overflow-hidden bg-[var(--hero-bg)]"
        aria-hidden="true"
      >
        <div
          className={
            kenBurnsOn
              ? "camps-ken-burns hero-slideshow-ken-burns absolute inset-0"
              : "absolute inset-0"
          }
          style={
            kenBurnsOn
              ? {
                  ["--hero-ken-burns-scale-start" as string]:
                    HERO_KEN_BURNS_SCALE_START,
                  ["--hero-ken-burns-scale-end" as string]:
                    HERO_KEN_BURNS_SCALE_END,
                  animationDuration: `${kenBurnsDurationMs}ms`,
                }
              : undefined
          }
        >
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: photo.objectPosition }}
          />
        </div>
      </div>

      <div className="absolute inset-0 hero-text-overlay" aria-hidden="true" />

      <div className="section-screen-inner relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="my-auto w-full">
          <h2
            id="camps-heading"
            className="font-display text-2xl font-bold sm:text-3xl"
            style={{ color: "var(--hero-headline)" }}
          >
            {launch.campsPreview.title}
          </h2>
          <p
            className="mt-4 font-display text-2xl font-bold sm:text-3xl"
            style={{ color: "var(--hero-headline)" }}
          >
            Coming soon...
          </p>
        </div>
      </div>
    </section>
  );
}
