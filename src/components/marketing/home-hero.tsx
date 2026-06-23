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
      {/* Layer 1: hero photo (next/image) — TODO: Erika action photo — hero paddling image */}
      <div
        className="absolute inset-0 bg-[var(--hero-bg)]"
        data-hero-photo="TODO: Erika action photo — hero paddling image"
        aria-hidden="true"
      />

      {/*
        Layer 2: left-weighted overlay — keeps Fraunces headline, gold eyebrow, and Inter
        subhead readable over the photo. Do not remove or significantly lighten this gradient.
      */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[rgba(8,18,28,0.85)] to-[rgba(8,18,28,0.35)]"
        aria-hidden="true"
      />

      {/* Layer 3: text content */}
      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl items-center px-4 py-16 sm:px-6 sm:py-20 lg:min-h-[85vh] lg:py-24">
        <div className="w-full max-w-[640px]">
          <p className="eyebrow-label">{brand.tagline}</p>
          <h1
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            style={{ color: "var(--hero-headline)" }}
          >
            <HeroHeadline
              title={hero.title}
              accentWord={hero.titleAccentWord}
            />
          </h1>
          <div
            className="mt-5 h-0.5 w-12 bg-accent-gold"
            aria-hidden="true"
          />
          <p
            className="mt-6 text-lg leading-relaxed"
            style={{ color: "var(--hero-subhead)" }}
          >
            {hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <StartCoachingButton
              size="lg"
              className="w-full bg-[var(--hero-headline)] text-[var(--hero-bg)] hover:bg-[color-mix(in_srgb,var(--hero-headline)_90%,white)] sm:w-auto"
            />
            <LinkButton
              size="lg"
              variant="outline"
              href="/apply"
              className="w-full border-2 border-[color-mix(in_srgb,var(--hero-headline)_50%,transparent)] bg-[rgba(255,255,255,0.1)] text-[var(--hero-headline)] shadow-sm hover:bg-[rgba(255,255,255,0.18)] sm:w-auto"
            >
              {cta.requestEvaluation}
            </LinkButton>
          </div>
          {!isExternalCheckout() && (
            <p className="mt-3 text-sm text-[color-mix(in_srgb,var(--hero-subhead)_85%,transparent)]">
              {launch.checkoutNote}
            </p>
          )}
          <div className="mt-8">
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
