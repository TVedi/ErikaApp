import Image from "next/image";
import { Mountain, Waves, type LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { PremiumSectionDivider } from "@/components/marketing/premium-section-divider";
import { launch } from "@/content/copy";
import { sitePhotos } from "@/lib/marketing/site-photos";

const photo = sitePhotos.campsBackground;

const FEATURE_ICONS: LucideIcon[] = [Waves, Mountain];

function CampFeature({
  label,
  text,
  icon: Icon,
}: {
  label: string;
  text: string;
  icon: LucideIcon;
}) {
  return (
    <div className="camps-feature">
      <span className="camps-feature-icon" aria-hidden="true">
        <Icon strokeWidth={1.25} />
      </span>
      <div className="camps-feature-copy">
        <p className="camps-feature-label">{label}</p>
        <p className="camps-feature-text">{text}</p>
      </div>
    </div>
  );
}

/**
 * Gainesville Training Camps — premium split: camp.webp dissolve, no booking CTA.
 */
export function CampsSection() {
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
              <p className="camps-eyebrow">{launch.campsPreview.eyebrow}</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2
                id="camps-heading"
                className="camps-premium-heading font-display"
              >
                <span className="camps-heading-line1">Gainesville</span>
                <span className="camps-heading-line2">Training Camps</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal>
              <p className="camps-coming-soon">
                <span className="camps-coming-soon-rule" aria-hidden="true" />
                <span className="camps-coming-soon-text">
                  {launch.campsPreview.comingSoon}
                </span>
                <span className="camps-coming-soon-rule" aria-hidden="true" />
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <p className="camps-body">{launch.campsPreview.body}</p>
            </ScrollReveal>

            <ScrollReveal className="camps-feature-row" delayMs={70}>
              {launch.campsPreview.features.map((feature, i) => (
                <CampFeature
                  key={feature.label}
                  label={feature.label}
                  text={feature.text}
                  icon={FEATURE_ICONS[i]}
                />
              ))}
            </ScrollReveal>
          </div>
        </div>
      </div>
      <PremiumSectionDivider />
    </section>
  );
}
