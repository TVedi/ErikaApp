"use client";

import { ParallaxPhotoLayer } from "@/components/motion/parallax-photo-layer";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import type { SitePhoto } from "@/lib/marketing/site-photos";
import { cn } from "@/lib/utils";

type PhotoBandProps = {
  photo: SitePhoto;
  headline: string;
  subheadline?: string;
  align?: "left" | "center";
  minHeightClass?: string;
  className?: string;
};

/**
 * Full-bleed edge-to-edge photo band with dark overlay and headline.
 */
export function PhotoBand({
  photo,
  headline,
  subheadline,
  align = "left",
  minHeightClass = "min-h-[min(52vh,520px)]",
  className,
}: PhotoBandProps) {
  return (
    <section
      className={cn(
        "photo-band-surface relative w-full overflow-hidden bg-[var(--hero-bg)]",
        minHeightClass,
        className
      )}
      aria-label={headline}
    >
      <ParallaxPhotoLayer photo={photo} sizes="100vw" />
      <div
        className="absolute inset-0 photo-band-overlay"
        aria-hidden="true"
      />
      <div
        className={cn(
          "relative z-10 flex h-full min-h-[inherit] items-center px-4 py-14 sm:px-6 sm:py-16",
          align === "center" && "justify-center text-center"
        )}
      >
        <ScrollReveal
          className={cn(
            "mx-auto w-full max-w-6xl",
            align === "left" && "max-w-2xl"
          )}
        >
          <h2
            className="font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl lg:text-4xl"
            style={{ color: "var(--hero-headline)" }}
          >
            {headline}
          </h2>
          {subheadline && (
            <p
              className="mt-4 text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--hero-subhead)" }}
            >
              {subheadline}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
