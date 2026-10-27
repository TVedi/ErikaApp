import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { MarketingCtaReveal } from "@/components/motion/marketing-cta-reveal";
import { PremiumSectionDivider } from "@/components/marketing/premium-section-divider";
import { LinkButton } from "@/components/ui/link-button";
import { launch } from "@/content/copy";
import { sitePhotos } from "@/lib/marketing/site-photos";

const photo = sitePhotos.campsBackground;

/**
 * Gainesville Training Camps — premium split: camp.webp dissolve + interest-list CTA.
 */
export function CampsSection() {
  const copy = launch.campsPreview;

  return (
    <section
      className="section-camps section-cream section-screen section-screen-center w-full"
      aria-labelledby="camps-heading"
    >
      <div className="split-screen-grid">
        <div className="camps-photo-col split-screen-photo-col order-1 lg:order-2">
          <div className="split-photo-mask absolute inset-0">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 66vw"
              className="camps-photo img-pos-mobile object-cover"
              style={{
                objectPosition: photo.objectPosition,
                ["--op-mobile" as string]:
                  photo.objectPositionMobile ?? photo.objectPosition,
              }}
            />
          </div>
        </div>

        <div className="split-screen-content-col relative order-2 lg:order-1">
          <div className="camps-content w-full">
            <ScrollReveal>
              <p className="camps-eyebrow">{copy.eyebrow}</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2
                id="camps-heading"
                className="camps-premium-heading font-display"
              >
                <span className="camps-heading-line1">{copy.titleLine1}</span>{" "}
                <span className="camps-heading-line2">{copy.titleLine2}</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal>
              <p className="camps-body">{copy.body}</p>
              <p className="camps-body">{copy.body2}</p>
            </ScrollReveal>

            <MarketingCtaReveal className="camps-home-cta">
              <LinkButton
                href={copy.ctaHref}
                size="lg"
                className="btn-cta-primary w-full sm:w-auto"
              >
                {copy.cta}
              </LinkButton>
            </MarketingCtaReveal>
          </div>
        </div>
      </div>
      <PremiumSectionDivider />
    </section>
  );
}
