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

      {/*
        Layer 2: left-weighted overlay — keeps Fraunces headline, gold eyebrow, and Inter
        subhead readable over the photo. Do not remove or significantly lighten this gradient.
      */}
      <div
        className="absolute inset-0 hero-text-overlay"
        aria-hidden="true"
      />

      {/* Layer 3: text content — left column, upper-third anchor, bold display scale */}
      <div
        className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl items-start px-4 pb-14 pt-[12vh] sm:px-6 sm:pb-16 sm:pt-[14vh] lg:min-h-[85vh] lg:pb-20 lg:pt-[15vh] xl:pt-[16vh]"
      >
        <div className="w-full max-w-[min(100%,38rem)]">
          <p className="eyebrow-label">{brand.tagline}</p>
          <h1
            className="mt-3 font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.025em] text-balance sm:mt-4 sm:text-4xl sm:leading-[1.07] lg:text-6xl lg:leading-[1.05] xl:text-7xl xl:leading-[1.04]"
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
          <p
            className="mt-5 max-w-[36rem] text-base leading-relaxed sm:text-lg lg:mt-6"
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
    </section>
  );
}
