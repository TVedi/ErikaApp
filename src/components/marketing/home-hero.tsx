import { HeroSlideshowBackground } from "@/components/marketing/hero-slideshow-background";
import { LinkButton } from "@/components/ui/link-button";
import { CredibilityStrip } from "@/components/marketing/credibility-strip";
import { HeroHeadline } from "@/components/marketing/hero-headline";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { isExternalCheckout } from "@/lib/marketing/cta";
import { brand, cta, hero, launch } from "@/content/copy";
import type { CoachCredential } from "@/types/database";

type HomeHeroProps = {
  featuredCredentials: CoachCredential[];
};

/**
 * Full-bleed homepage hero — text overlaid on a photo layer with a left-weighted dark
 * gradient so headline, eyebrow, and subhead stay WCAG-readable over any image.
 */
export function HomeHero({ featuredCredentials }: HomeHeroProps) {
  return (
    <section
      className="relative w-full min-h-[70vh] lg:min-h-[85vh]"
      aria-label="Hero"
    >
      <HeroSlideshowBackground />

      <div
        className="absolute inset-0 hero-text-overlay"
        aria-hidden="true"
      />

      {/* Two-area text layout: headline top-left; subhead + CTAs lower-right (left ~55%) */}
      <div className="relative z-10 mx-auto min-h-[70vh] max-w-6xl px-4 sm:px-6 lg:min-h-[85vh]">
        <div
          className="flex min-h-[70vh] w-full flex-col lg:min-h-[85vh] lg:w-[55%] lg:max-w-none lg:justify-between"
        >
          {/* Top-left: eyebrow + headline + divider */}
          <div className="pt-[11vh] sm:pt-[12vh] lg:pt-[13vh] lg:pr-6">
            <p className="eyebrow-label">{brand.tagline}</p>
            <h1
              className="mt-3 max-w-[36rem] font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.025em] text-balance sm:mt-4 sm:text-4xl sm:leading-[1.07] lg:text-6xl lg:leading-[1.05] xl:text-7xl xl:leading-[1.04]"
              style={{ color: "var(--hero-headline)" }}
            >
              <HeroHeadline
                title={hero.title}
                accentWord={hero.titleAccentWord}
              />
            </h1>
            <div
              className="mt-4 h-0.5 w-12 bg-accent-gold lg:mt-5"
              aria-hidden="true"
            />
          </div>

          {/* Lower-right block: subhead + CTAs + pill (offset right on desktop) */}
          <div
            className="mt-10 pb-12 sm:pb-14 lg:mb-[9vh] lg:ml-[14%] lg:mt-0 lg:max-w-[92%] lg:pb-0 xl:ml-[18%]"
          >
            <p
              className="max-w-[34rem] text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--hero-subhead)" }}
            >
              {hero.subtitle}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap lg:mt-8">
              <StartCoachingButton
                size="lg"
                className="btn-cta-primary w-full sm:w-auto"
              />
              <LinkButton
                size="lg"
                variant="outline"
                href="/apply"
                className="w-full border-2 border-[color-mix(in_srgb,var(--accent-turquoise)_70%,var(--hero-headline))] bg-[rgba(255,255,255,0.1)] text-[var(--hero-headline)] shadow-sm hover:bg-[color-mix(in_srgb,var(--accent-turquoise)_18%,transparent)] sm:w-auto"
              >
                {cta.requestEvaluation}
              </LinkButton>
            </div>
            {!isExternalCheckout() && (
              <p className="mt-3 text-sm text-[color-mix(in_srgb,var(--hero-subhead)_85%,transparent)]">
                {launch.checkoutNote}
              </p>
            )}
            <div className="mt-6 lg:mt-7">
              <CredibilityStrip
                featuredCredentials={featuredCredentials}
                variant="hero"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
