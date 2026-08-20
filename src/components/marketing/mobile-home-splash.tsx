import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "@/components/layout/brand-mark";
import { hero } from "@/content/copy";

/**
 * Mobile-only homepage opening screen — full-bleed portrait, gold brand mark,
 * cream motto, coral scroll chevron (anchor only; no JS scroll controller).
 */
export function MobileHomeSplash() {
  return (
    <div className="mobile-home-splash lg:hidden" data-mobile-home-splash="">
      {/*
        Source is landscape (1466×978). Height-based object-fit:cover over-zooms
        the face on tall phones — size by width instead (see CSS).
      */}
      <div className="mobile-home-splash-photo-slot" aria-hidden="false">
        <Image
          src="/egyeni.jpg"
          alt={hero.mobileOpeningImageAlt}
          width={1466}
          height={978}
          priority
          sizes="200vw"
          className="mobile-home-splash-photo"
        />
      </div>
      <div className="mobile-home-splash-veil" aria-hidden="true" />
      {/* Low-opacity noise over melt only — breaks 8-bit banding (normal blend). */}
      <div className="mobile-home-splash-dither" aria-hidden="true" />

      <Link
        href="/"
        className="mobile-home-splash-logo"
        aria-label="Erika Medveczky OLY — Home"
      >
        <BrandMark className="mobile-home-splash-mark" aria-hidden="true" />
      </Link>

      <div className="mobile-home-splash-bottom">
        <span className="mobile-home-splash-rule" aria-hidden="true" />
        <p className="mobile-home-splash-slogan">{hero.mobileOpeningSlogan}</p>
        <a
          href="#who-its-for-heading"
          className="mobile-home-splash-scroll"
          aria-label={hero.mobileOpeningScrollLabel}
        >
          {/* Wide shallow open chevron (~150°), 48×12, stroke 2, coral */}
          <svg
            className="mobile-home-splash-chevron"
            viewBox="0 0 48 12"
            width="48"
            height="12"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M2 3 L24 9 L46 3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
