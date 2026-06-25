"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { SitePhoto } from "@/lib/marketing/site-photos";

type ParallaxPhotoProps = {
  photo: SitePhoto;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Light parallax on large section photos — transform only, disabled when motion is reduced.
 */
export function ParallaxPhoto({
  photo,
  className,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
}: ParallaxPhotoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = wrap.getBoundingClientRect();
      const viewport = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewport) return;
      const progress = (viewport - rect.top) / (viewport + rect.height);
      const offset = (progress - 0.5) * 28;
      img.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`;
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
    <div ref={wrapRef} className={cn("relative h-full w-full overflow-hidden", className)}>
      <div ref={imgRef} className="absolute inset-[-8%] will-change-transform">
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
    </div>
  );
}
