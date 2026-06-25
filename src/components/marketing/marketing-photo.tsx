import Image from "next/image";
import { cn } from "@/lib/utils";
import type { SitePhoto } from "@/lib/marketing/site-photos";
import { ParallaxPhoto } from "@/components/motion/parallax-photo";

type MarketingPhotoProps = {
  photo: SitePhoto;
  variant?: "portrait" | "wide" | "card";
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  parallax?: boolean;
  /** Subtle scrim when text may sit over the image */
  overlay?: boolean;
};

const variantAspect = {
  portrait: "aspect-[2/3] max-h-[520px]",
  wide: "aspect-[3/2]",
  card: "aspect-[4/3]",
};

const defaultSizes = {
  portrait: "(max-width: 1024px) 100vw, 480px",
  wide: "(max-width: 1024px) 100vw, 640px",
  card: "(max-width: 640px) 100vw, 400px",
};

export function MarketingPhoto({
  photo,
  variant = "wide",
  className,
  imageClassName,
  sizes,
  priority = false,
  parallax = false,
  overlay = false,
}: MarketingPhotoProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/40 bg-[var(--hero-bg)]/5 shadow-sm",
        variantAspect[variant],
        className
      )}
    >
      {parallax ? (
        <ParallaxPhoto
          photo={photo}
          sizes={sizes ?? defaultSizes[variant]}
          priority={priority}
          className={imageClassName}
        />
      ) : (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes ?? defaultSizes[variant]}
          priority={priority}
          className={cn("object-cover", imageClassName)}
          style={{ objectPosition: photo.objectPosition }}
        />
      )}
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-[rgba(8,18,28,0.55)] to-transparent"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
