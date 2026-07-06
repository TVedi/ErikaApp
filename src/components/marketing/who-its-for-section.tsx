import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { MarketingCtaReveal } from "@/components/motion/marketing-cta-reveal";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { launch } from "@/content/copy";
import { sitePhotos } from "@/lib/marketing/site-photos";

const photo = sitePhotos.whoItsFor;

function GoldCard({ text }: { text: string }) {
  return (
    <div className="achievement-card achievement-gold h-full rounded-xl p-4">
      <div className="flex items-center gap-3">
        <span className="achievement-medal-dot" aria-hidden="true" />
        <p className="font-display text-base font-medium leading-snug text-foreground sm:text-[1.05rem]">
          {text}
        </p>
      </div>
    </div>
  );
}

/**
 * Split-screen "Where Experience Comes From" — uniform-gold achievement cards:
 * featured Olympic card on top, then titles (left) + experience (right).
 */
export function WhoItsForSection() {
  return (
    <section
      className="section-cream section-screen section-screen-center w-full"
      aria-labelledby="who-its-for-heading"
    >
      <div className="split-screen-grid">
        {/* Photo — top on mobile, right on desktop */}
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

        {/* Content — below photo on mobile, left on desktop */}
        <div className="split-screen-content-col relative order-2 lg:order-1">
          <ScrollReveal>
            <h2
              id="who-its-for-heading"
              className="heading-aura-gold text-2xl font-bold text-foreground sm:text-3xl"
            >
              <span className="heading-sheen-text">{launch.whoItsFor.title}</span>
            </h2>
          </ScrollReveal>

          {/* Featured pinnacle — full width on top */}
          <ScrollReveal className="mt-8 lg:mt-10">
            <div className="achievement-card achievement-olympic rounded-xl p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="achievement-medal-dot" aria-hidden="true" />
                <p className="font-display text-lg font-medium leading-snug text-foreground sm:text-xl">
                  {launch.whoItsFor.featuredAchievement}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Two columns — titles left, experience right; stacks on mobile */}
          <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4">
            <div className="space-y-3 sm:space-y-4">
              {launch.whoItsFor.titleAchievements.map((text, i) => (
                <ScrollReveal key={text} delayMs={70 + i * 70}>
                  <GoldCard text={text} />
                </ScrollReveal>
              ))}
            </div>
            <div className="space-y-3 sm:space-y-4">
              {launch.whoItsFor.experienceAchievements.map((text, i) => (
                <ScrollReveal key={text} delayMs={140 + i * 70}>
                  <GoldCard text={text} />
                </ScrollReveal>
              ))}
            </div>
          </div>

          <MarketingCtaReveal className="mt-6 flex justify-center sm:mt-8">
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
