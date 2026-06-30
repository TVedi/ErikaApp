import Image from "next/image";
import { LinkButton } from "@/components/ui/link-button";
import { CredentialsList } from "@/components/credentials-list";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { launch } from "@/content/copy";
import { sitePhotos } from "@/lib/marketing/site-photos";
import {
  HERO_KEN_BURNS_SCALE_END,
  HERO_KEN_BURNS_SCALE_START,
  getHeroKenBurnsDurationMs,
} from "@/lib/marketing/hero-slideshow";
import type { CoachCredential } from "@/types/database";

const photo = sitePhotos.coachedByOlympicBackground;
const kenBurnsDurationMs = getHeroKenBurnsDurationMs();

/**
 * Coached by Olympic experience — full-bleed gyerek.png with bright Ken-Burns +
 * localized scrim + single coral About Erika CTA over the water.
 */
export function AboutOlympicSection({
  credentials,
}: {
  credentials: CoachCredential[];
}) {
  return (
    <section
      className="section-about-olympic section-screen section-screen-center section-pad w-full"
      aria-labelledby="about-olympic-heading"
    >
      <div
        className="absolute inset-0 overflow-hidden bg-[var(--hero-bg)]"
        aria-hidden="true"
      >
        <div
          className="camps-ken-burns hero-slideshow-ken-burns absolute inset-0"
          style={{
            ["--hero-ken-burns-scale-start" as string]:
              HERO_KEN_BURNS_SCALE_START,
            ["--hero-ken-burns-scale-end" as string]:
              HERO_KEN_BURNS_SCALE_END,
            animationDuration: `${kenBurnsDurationMs}ms`,
          }}
        >
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="100vw"
            className="about-olympic-photo object-cover"
            style={{ objectPosition: photo.objectPosition }}
          />
        </div>
      </div>

      <div
        className="about-olympic-text-scrim absolute inset-0"
        aria-hidden="true"
      />

      <LinkButton
        href="/about"
        size="lg"
        className="about-olympic-cta btn-cta-primary"
      >
        About Erika
      </LinkButton>

      <div className="section-screen-inner relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <div className="about-olympic-heading-wrap max-w-xl">
            <h2
              id="about-olympic-heading"
              className="font-display text-2xl font-bold sm:text-3xl lg:text-4xl"
              style={{ color: "var(--hero-headline)" }}
            >
              {launch.aboutPreview.title}
            </h2>
            <p
              className="mt-4 text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--hero-subhead)" }}
            >
              {launch.aboutPreview.body}
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal className="mt-12" delayMs={120}>
          <CredentialsList credentials={credentials} />
        </ScrollReveal>
      </div>
    </section>
  );
}
