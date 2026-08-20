import { HeroSlideshowBackground } from "@/components/marketing/hero-slideshow-background";
import { HeroHeadline } from "@/components/marketing/hero-headline";
import { MobileHomeSplash } from "@/components/marketing/mobile-home-splash";
import { PremiumSectionDivider } from "@/components/marketing/premium-section-divider";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { brand, hero } from "@/content/copy";

/**
 * Homepage hero — mobile opening splash (egyeni portrait) + desktop slideshow.
 */
export function HomeHero() {
  return (
    <>
      <MobileHomeSplash />

      {/*
        Mobile only: real PremiumSectionDivider sits in normal flow under the
        splash (tucked via splash margin-bottom). Splash lift reveals this —
        not a duplicated preview strip. Desktop hero keeps its own divider.
      */}
      <div className="mobile-splash-reveal-divider lg:hidden" aria-hidden="true">
        <PremiumSectionDivider />
      </div>

      <section
        className="home-hero section-screen relative hidden w-full lg:block"
        aria-label="Hero"
      >
        <HeroSlideshowBackground />

        <div className="absolute inset-0 hero-text-overlay" aria-hidden="true" />

        <div className="hero-text-shell section-screen relative z-10 w-full">
          <div className="hero-text-column pt-[11vh] pb-12 sm:pt-[12vh] sm:pb-14 lg:pt-[13vh] lg:pb-0 lg:max-w-[min(44%,36rem)]">
            <p className="eyebrow-label">{brand.tagline}</p>
            <h1
              className="mt-3 font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.025em] text-balance sm:mt-4 sm:text-4xl sm:leading-[1.07] lg:text-6xl lg:leading-[1.05] xl:text-7xl xl:leading-[1.04]"
              style={{ color: "var(--hero-headline)" }}
            >
              <HeroHeadline
                title={hero.title}
                accentWord={hero.titleAccentWord}
                sweepPhrase={hero.titleSweepPhrase}
              />
            </h1>
            <div
              className="mt-4 h-0.5 w-12 bg-accent-gold lg:mt-5"
              aria-hidden="true"
            />
            <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap">
              <StartCoachingButton
                size="lg"
                className="btn-cta-primary w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
        <PremiumSectionDivider />
      </section>
    </>
  );
}
