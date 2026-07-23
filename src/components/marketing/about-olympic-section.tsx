import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { LinkButton } from "@/components/ui/link-button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { MarketingCtaReveal } from "@/components/motion/marketing-cta-reveal";
import { CountUpQty } from "@/components/motion/count-up-qty";
import { PremiumSectionDivider } from "@/components/marketing/premium-section-divider";
import {
  PremiumCrown,
  PremiumGlobe,
  PremiumMedal,
  PremiumTrophy,
} from "@/components/marketing/premium-icons";
import { launch } from "@/content/copy";
import { sitePhotos } from "@/lib/marketing/site-photos";

const photo = sitePhotos.coachedByOlympicBackground;

type PremiumIcon = ComponentType<SVGProps<SVGSVGElement>>;

/* Trophy / Medal / Crown / Globe — engraved chip glyphs */
const CHIP_ICONS: PremiumIcon[] = [
  PremiumTrophy,
  PremiumMedal,
  PremiumCrown,
  PremiumGlobe,
];

function ProofChipLine1({ line1 }: { line1: string }) {
  /* Animate clear counts only (8x / 21x / 20+). "Olympic 4th Place" stays static. */
  const match = line1.match(/^(\d+x|\d+\+)\s+(.+)$/);
  if (!match) {
    return <span className="about-olympic-chip-line1">{line1}</span>;
  }
  return (
    <span className="about-olympic-chip-line1">
      <CountUpQty finalText={match[1]} /> {match[2]}
    </span>
  );
}

function ProofChip({
  line1,
  line2,
  icon: Icon,
}: {
  line1: string;
  line2: string;
  icon: PremiumIcon;
}) {
  return (
    <div className="about-olympic-chip">
      <span className="about-olympic-chip-icon" aria-hidden="true">
        <Icon />
      </span>
      <span className="about-olympic-chip-label">
        <ProofChipLine1 line1={line1} />
        <span className="about-olympic-chip-line2">{line2}</span>
      </span>
    </div>
  );
}

/**
 * Coached by Olympic Experience — premium split: gyerek.webp dissolve + proof chips.
 */
export function AboutOlympicSection() {
  return (
    <section
      className="section-about-olympic section-cream section-screen section-screen-center w-full"
      aria-labelledby="about-olympic-heading"
    >
      <div className="split-screen-grid">
        <div className="about-olympic-photo-col split-screen-photo-col order-1 lg:order-2">
          <div className="split-photo-mask absolute inset-0">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 66vw"
              className="about-olympic-photo img-pos-mobile object-cover"
              style={{
                objectPosition: photo.objectPosition,
                ["--op-mobile" as string]:
                  photo.objectPositionMobile ?? photo.objectPosition,
              }}
            />
          </div>
        </div>

        <div className="split-screen-content-col relative order-2 lg:order-1">
          <div className="about-olympic-content w-full">
            <ScrollReveal>
              <p className="about-olympic-eyebrow">
                {launch.aboutPreview.eyebrow}
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2
                id="about-olympic-heading"
                className="about-olympic-premium-heading font-display"
              >
                <span className="about-olympic-heading-line1">Coached by</span>
                <span className="about-olympic-heading-line2">
                  Olympic Experience
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal>
              <p className="about-olympic-body">{launch.aboutPreview.body}</p>
            </ScrollReveal>

            <ScrollReveal className="about-olympic-chip-row" delayMs={80}>
              {launch.aboutPreview.proofChips.map((chip, i) => (
                <ProofChip
                  key={`${chip.line1}-${chip.line2}`}
                  line1={chip.line1}
                  line2={chip.line2}
                  icon={CHIP_ICONS[i]}
                />
              ))}
            </ScrollReveal>

            <MarketingCtaReveal className="about-olympic-cta-row">
              <LinkButton
                href="/about"
                size="lg"
                className="btn-cta-primary w-full sm:w-auto"
              >
                {launch.aboutPreview.cta}
              </LinkButton>
            </MarketingCtaReveal>
          </div>
        </div>
      </div>
      <PremiumSectionDivider />
    </section>
  );
}
