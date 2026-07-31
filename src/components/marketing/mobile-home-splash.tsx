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
      <Image
        src="/egyeni.jpg"
        alt={hero.mobileOpeningImageAlt}
        fill
        priority
        sizes="100vw"
        className="mobile-home-splash-photo"
      />
      <div className="mobile-home-splash-veil" aria-hidden="true" />

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
          <svg
            className="mobile-home-splash-chevron"
            viewBox="0 0 56 16"
            width="48"
            height="14"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M2 5 L28 11 L54 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.85"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
