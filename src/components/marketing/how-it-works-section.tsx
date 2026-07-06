import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { MarketingCtaReveal } from "@/components/motion/marketing-cta-reveal";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { launch } from "@/content/copy";
import { sitePhotos } from "@/lib/marketing/site-photos";

const photo = sitePhotos.howItWorks;

/**
 * Split-screen "Who This Is For" — coral achievement-style audience cards on
 * the emerald left column + feathered photo right.
 */
export function HowItWorksSection() {
  return (
    <section
      className="section-navy-soft section-screen section-screen-center w-full"
      aria-labelledby="how-it-works-heading"
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
        <div className="split-screen-content-col order-2 lg:order-1 -mt-1 sm:-mt-2 lg:-mt-4">
          <ScrollReveal>
            <h2
              id="how-it-works-heading"
              className="heading-aura-coral text-2xl font-bold text-foreground sm:text-3xl"
            >
              <span className="heading-sheen-text">{launch.howItWorks.title}</span>
            </h2>
          </ScrollReveal>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-7">
            {launch.howItWorks.audiences.map((text, i) => (
              <ScrollReveal key={text} delayMs={i * 70}>
                <div className="achievement-card achievement-coral h-full rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <span className="achievement-medal-dot" aria-hidden="true" />
                    <p className="font-display text-base font-medium leading-snug text-foreground sm:text-[1.05rem]">
                      {text}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <MarketingCtaReveal className="mt-6 flex justify-center sm:mt-7">
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
