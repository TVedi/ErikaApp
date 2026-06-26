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
 * Full-bleed homepage hero — diagonal mirror layout: headline top-left, support block bottom-right.
 */
export function HomeHero({ featuredCredentials }: HomeHeroProps) {
  return (
    <section
      className="section-screen relative w-full"
      aria-label="Hero"
    >
      <HeroSlideshowBackground />

      <div className="absolute inset-0 hero-text-overlay" aria-hidden="true" />

      <div className="section-screen relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top-left: eyebrow + headline + divider */}
        <div className="pt-[11vh] sm:pt-[12vh] lg:absolute lg:left-4 lg:top-0 lg:pt-[13vh] lg:max-w-[min(44%,36rem)] xl:left-6">
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
        </div>

        {/* Bottom-right mirror: subhead + CTAs + pill (localized scrim) */}
        <div
          className="mt-10 pb-12 sm:pb-14 lg:absolute lg:bottom-[7vh] lg:right-4 lg:mt-0 lg:max-w-[min(26rem,38vw)] lg:pb-0 xl:bottom-[8vh] xl:right-8 xl:max-w-[28rem]"
        >
          <div className="hero-support-scrim rounded-2xl p-5 sm:p-6">
            <p
              className="text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--hero-subhead)" }}
            >
              {hero.subtitle}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap">
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
            <div className="mt-5 sm:mt-6">
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
