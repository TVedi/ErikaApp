import Image from "next/image";
import { ComingSoonButton } from "@/components/marketing/coming-soon-button";
import { PremiumSectionDivider } from "@/components/marketing/premium-section-divider";
import { camps, launch } from "@/content/copy";
import { sitePhotos } from "@/lib/marketing/site-photos";

const photo = sitePhotos.aboutPortrait;

/**
 * Video Course teaser — editorial copy + gold-framed portrait (speaking frame).
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
            </span>
            <span className="video-course-heading-line2">
              {copy.headingLine2}
            </span>
          </h2>

          <p className="video-course-body">{copy.body}</p>
          <p className="video-course-secondary">{copy.secondary}</p>

          <ComingSoonButton
            label={camps.ctaLabel}
            className="video-course-coming-soon"
          />
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
              style={{ objectPosition: "center 15%" }}
            />
          </div>
        </div>
      </div>
      <PremiumSectionDivider />
    </section>
  );
}
