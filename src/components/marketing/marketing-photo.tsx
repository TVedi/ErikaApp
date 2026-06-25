import Image from "next/image";
import { cn } from "@/lib/utils";
import type { SitePhoto } from "@/lib/marketing/site-photos";

type MarketingPhotoProps = {
  photo: SitePhoto;
  variant?: "portrait" | "wide" | "card";
  className?: string;
  sizes?: string;
  priority?: boolean;
  overlay?: boolean;
};

const variantAspect = {
  portrait: "aspect-[2/3]",
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
  sizes,
  priority = false,
  overlay = false,
}: MarketingPhotoProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-border/40 bg-[var(--hero-bg)] shadow-sm",
        variantAspect[variant],
        variant === "portrait" && "max-h-[min(520px,70vh)]",
        className
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes ?? defaultSizes[variant]}
          priority={priority}
          className="object-cover"
          style={{ objectPosition: photo.objectPosition }}
        />
      </div>
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-[rgba(8,18,28,0.55)] to-transparent"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
