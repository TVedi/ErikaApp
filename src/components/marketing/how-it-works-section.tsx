import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { MarketingCtaReveal } from "@/components/motion/marketing-cta-reveal";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { launch } from "@/content/copy";
import { sitePhotos } from "@/lib/marketing/site-photos";

const photo = sitePhotos.howItWorks;

function AudienceRow({ text }: { text: string }) {
  return (
    <div className="audience-editorial-row">
      <span className="audience-editorial-marker" aria-hidden="true" />
      <p className="audience-editorial-text">{text}</p>
    </div>
  );
}

/**
 * Split-screen "Who This Is For" — editorial audience rows (coral accent, lighter
 * than the credentials proof section).
 */
export function HowItWorksSection() {
  return (
    <section
      className="section-navy-soft section-screen section-screen-center w-full"
      aria-labelledby="how-it-works-heading"
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

        <div className="split-screen-content-col order-2 lg:order-1 -mt-1 sm:-mt-2 lg:-mt-4">
          <ScrollReveal>
            <h2
              id="how-it-works-heading"
              className="heading-aura-coral text-2xl font-bold text-foreground sm:text-3xl"
            >
              <span className="heading-sheen-text">{launch.howItWorks.title}</span>
            </h2>
          </ScrollReveal>

          <div className="audience-editorial-list">
            {launch.howItWorks.audiences.map((text, i) => (
              <ScrollReveal key={text} delayMs={i * 55}>
                <AudienceRow text={text} />
              </ScrollReveal>
            ))}
          </div>

          <MarketingCtaReveal className="mt-7 flex justify-center sm:mt-8">
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
