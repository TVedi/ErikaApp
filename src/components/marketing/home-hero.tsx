import { HeroSlideshowBackground } from "@/components/marketing/hero-slideshow-background";
import { LinkButton } from "@/components/ui/link-button";
import { HeroHeadline } from "@/components/marketing/hero-headline";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { brand, cta, hero } from "@/content/copy";

/**
 * Full-bleed homepage hero — single left-aligned column within the left ~55% of the photo.
 */
export function HomeHero() {
  return (
    <section
      className="home-hero section-screen relative w-full"
      aria-label="Hero"
    >
      <HeroSlideshowBackground />

      <div className="absolute inset-0 hero-text-overlay" aria-hidden="true" />

      <div className="section-screen relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pt-[11vh] pb-12 sm:pt-[12vh] sm:pb-14 lg:absolute lg:left-4 lg:top-0 lg:pt-[13vh] lg:pb-0 lg:max-w-[min(44%,36rem)] xl:left-6">
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
        </div>
      </div>
    </section>
  );
}
