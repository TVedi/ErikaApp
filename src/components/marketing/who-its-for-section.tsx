import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { MarketingCtaReveal } from "@/components/motion/marketing-cta-reveal";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { launch } from "@/content/copy";
import { sitePhotos } from "@/lib/marketing/site-photos";

const photo = sitePhotos.whoItsFor;

function ProofStatRow({ text }: { text: string }) {
  return (
    <div className="proof-stat-row">
      <p className="proof-stat-row-text">{text}</p>
    </div>
  );
}

/**
 * Split-screen "Where Experience Comes From" — editorial proof: Olympic statement
 * + slim stat rows (no card grid).
 */
export function WhoItsForSection() {
  return (
    <section
      className="section-cream section-screen section-screen-center w-full"
      aria-labelledby="who-its-for-heading"
    >
      <div className="split-screen-grid">
        <div className="split-screen-photo-col order-1 lg:order-2">
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

        <div className="split-screen-content-col relative order-2 lg:order-1">
          <ScrollReveal>
            <h2
              id="who-its-for-heading"
              className="heading-aura-gold text-2xl font-bold text-foreground sm:text-3xl"
            >
              <span className="heading-sheen-text">{launch.whoItsFor.title}</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal className="proof-olympic-statement">
            <p className="proof-olympic-statement-text">
              {launch.whoItsFor.featuredAchievement}
            </p>
          </ScrollReveal>

          <div className="proof-stat-grid">
            <div>
              {launch.whoItsFor.titleAchievements.map((text, i) => (
                <ScrollReveal key={text} delayMs={70 + i * 60}>
                  <ProofStatRow text={text} />
                </ScrollReveal>
              ))}
            </div>
            <div>
              {launch.whoItsFor.experienceAchievements.map((text, i) => (
                <ScrollReveal key={text} delayMs={140 + i * 60}>
                  <ProofStatRow text={text} />
                </ScrollReveal>
              ))}
            </div>
          </div>

          <MarketingCtaReveal className="mt-8 flex justify-center sm:mt-10">
            <StartCoachingButton
              size="lg"
              className="btn-cta-primary w-full sm:w-auto"
            />
          </MarketingCtaReveal>
        </div>
      </div>
    </section>
  );
}
