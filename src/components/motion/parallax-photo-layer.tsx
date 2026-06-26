"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { SitePhoto } from "@/lib/marketing/site-photos";

type ParallaxPhotoLayerProps = {
  photo: SitePhoto;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Full-bleed photo layer with light parallax — parent must be position:relative with height.
 */
export function ParallaxPhotoLayer({
  photo,
  className,
  sizes = "100vw",
  priority = false,
}: ParallaxPhotoLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const layer = layerRef.current;
    if (!layer) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const section = layer.parentElement;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewport) return;
      const progress = (viewport - rect.top) / (viewport + rect.height);
      const offset = (progress - 0.5) * 16;
      layer.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={layerRef}
      className={cn(
        "absolute inset-0 will-change-transform motion-reduce:transform-none",
        className
      )}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: photo.objectPosition }}
      />
    </div>
  );
}
