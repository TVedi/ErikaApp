import Image from "next/image";
import { MarketingCtaReveal } from "@/components/motion/marketing-cta-reveal";
import { PremiumSectionDivider } from "@/components/marketing/premium-section-divider";
import { LinkButton } from "@/components/ui/link-button";
import { launch } from "@/content/copy";

const photo = {
  src: "/DSC09930-videocourse.webp",
  alt: "Erika Medveczky with kayak paddle",
  width: 933,
  height: 1400,
};

/**
 * Video Course teaser — editorial copy + gold-framed portrait (speaking frame) + waitlist CTA.
 */
export function VideoCourseLoadingSection() {
  const copy = launch.videoCourse;

  return (
    <section
      className="section-navy-soft section-screen section-screen-center relative w-full"
      aria-labelledby="video-course-heading"
    >
      <div className="video-course-layout">
        <div className="video-course-text-wrap">
          <p className="video-course-eyebrow">{copy.eyebrow}</p>

          <h2
            id="video-course-heading"
            className="video-course-premium-heading font-display"
          >
            <span className="video-course-heading-line1">
              {copy.headingLine1}
            </span>{" "}
            <span className="video-course-heading-line2">
              {copy.headingLine2}
            </span>
          </h2>

          <p className="video-course-body">{copy.body}</p>
          <p className="video-course-secondary">{copy.secondary}</p>

          <MarketingCtaReveal className="video-course-cta">
            <LinkButton
              href={copy.ctaHref}
              size="lg"
              className="btn-cta-primary w-full sm:w-auto"
            >
              {copy.cta}
            </LinkButton>
          </MarketingCtaReveal>
        </div>

        <div className="video-course-image-wrap">
          <div className="video-course-portrait-card speaking-portrait-frame video-course-frame-shimmer relative overflow-hidden">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 1023px) min(88vw, 420px), min(620px, 75vh)"
              className="speaking-portrait h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      <PremiumSectionDivider />
    </section>
  );
}
