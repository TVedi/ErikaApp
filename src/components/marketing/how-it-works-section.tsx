import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { MarketingCtaReveal } from "@/components/motion/marketing-cta-reveal";
import { PremiumSectionDivider } from "@/components/marketing/premium-section-divider";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { launch } from "@/content/copy";
import { sitePhotos } from "@/lib/marketing/site-photos";

const photo = sitePhotos.howItWorks;

function AudienceRow({ text, index }: { text: string; index: number }) {
  const indexLabel = String(index + 1).padStart(2, "0");
  return (
    <div className="audience-editorial-row">
      <span className="audience-editorial-index" aria-hidden="true">
        {indexLabel}
      </span>
      <p className="audience-editorial-text">{text}</p>
    </div>
  );
}

/**
 * Split-screen "Who This Is For" — premium editorial audience rows with seated
 * studio portrait and champagne index accents.
 */
export function HowItWorksSection() {
  return (
    <section
      className="section-cream section-screen section-screen-center w-full"
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

        <div className="split-screen-content-col relative order-2 lg:order-1">
          <ScrollReveal>
            <p className="audience-premium-eyebrow">{launch.howItWorks.eyebrow}</p>
          </ScrollReveal>

          <ScrollReveal>
            <h2
              id="how-it-works-heading"
              className="audience-premium-heading font-display"
            >
              {launch.howItWorks.title}
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <p className="audience-premium-intro">{launch.howItWorks.intro}</p>
          </ScrollReveal>

          <div className="audience-editorial-list">
            {launch.howItWorks.audiences.map((text, i) => (
              <ScrollReveal key={text} delayMs={55 + i * 50}>
                <AudienceRow text={text} index={i} />
              </ScrollReveal>
            ))}
          </div>

          <MarketingCtaReveal className="how-it-works-cta flex justify-start">
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
