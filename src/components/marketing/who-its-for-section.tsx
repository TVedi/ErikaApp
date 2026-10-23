import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { MarketingCtaReveal } from "@/components/motion/marketing-cta-reveal";
import { CountUpQty } from "@/components/motion/count-up-qty";
import { PremiumSectionDivider } from "@/components/marketing/premium-section-divider";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { OlympicDiplomaBadge } from "@/components/marketing/diploma-lightbox";
import { launch } from "@/content/copy";
import { sitePhotos } from "@/lib/marketing/site-photos";

const photo = sitePhotos.whoItsFor;

function ProofAchievementText({ text }: { text: string }) {
  const match = text.match(/^(\d+[x×]|\d+\+|\d+)\s+(.+)$/);
  if (!match) {
    return <span className="proof-achievement-text">{text}</span>;
  }
  return (
    <span className="proof-achievement-text">
      <CountUpQty finalText={match[1]} className="proof-achievement-qty" />{" "}
      {match[2]}
    </span>
  );
}

function ProofAchievementRow({ text, num }: { text: string; num: string }) {
  return (
    <div className="proof-achievement-row">
      <span className="proof-achievement-num" aria-hidden="true">
        {num}
      </span>
      <ProofAchievementText text={text} />
    </div>
  );
}

/** Two-digit list number: 1 -> "01". */
function listNumber(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Split-screen "Where Experience Comes From" — editorial proof: a numbered
 * list (01-07). 01 is the Olympic statement; 02-07 are the achievement rows
 * (no card grid).
 */
export function WhoItsForSection() {
  return (
    <section
      className="section-cream section-screen section-screen-center w-full"
      aria-labelledby="who-its-for-heading"
    >
      <div className="split-screen-grid">
        {/*
          Mobile: content first so splash lift reveals PROVEN EXCELLENCE +
          heading (not the photo). Desktop grid order unchanged (content left).
        */}
        <div className="split-screen-photo-col order-2 lg:order-2">
          <div className="split-photo-mask absolute inset-0">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="img-pos-mobile object-cover"
              style={{
                objectPosition: photo.objectPosition,
                ["--op-mobile" as string]:
                  photo.objectPositionMobile ?? photo.objectPosition,
              }}
            />
          </div>
        </div>

        <div className="split-screen-content-col relative order-1 lg:order-1">
          <ScrollReveal>
            <p className="proof-eyebrow">PROVEN EXCELLENCE</p>
          </ScrollReveal>

          <ScrollReveal>
            <h2
              id="who-its-for-heading"
              className="proof-editorial-heading font-display font-bold"
            >
              <span className="proof-heading-line1">Where Experience</span>
              <span className="proof-heading-line2"> Comes From</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal className="proof-olympic-statement">
            <div className="proof-statement-row">
              <span className="proof-achievement-num" aria-hidden="true">
                {listNumber(1)}
              </span>
              <p className="proof-statement-text">
                {launch.whoItsFor.featuredAchievement}
                <OlympicDiplomaBadge />
              </p>
            </div>
          </ScrollReveal>

          <div className="proof-achievement-grid">
            <div className="proof-achievement-col">
              {launch.whoItsFor.titleAchievements.map((text, i) => (
                <ScrollReveal key={text} delayMs={70 + i * 60}>
                  <ProofAchievementRow text={text} num={listNumber(i + 2)} />
                </ScrollReveal>
              ))}
            </div>
            <div className="proof-achievement-col">
              {launch.whoItsFor.experienceAchievements.map((text, i) => (
                <ScrollReveal key={text} delayMs={140 + i * 60}>
                  <ProofAchievementRow text={text} num={listNumber(i + 5)} />
                </ScrollReveal>
              ))}
            </div>
          </div>

          <MarketingCtaReveal className="who-its-for-cta flex justify-center">
            <StartCoachingButton
              size="lg"
              className="btn-cta-primary w-full sm:w-auto"
            />
          </MarketingCtaReveal>
        </div>
      </div>
      <PremiumSectionDivider />
    </section>
  );
}
