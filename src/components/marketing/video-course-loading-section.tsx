import Image from "next/image";
import { launch } from "@/content/copy";
import { sitePhotos } from "@/lib/marketing/site-photos";

const photo = sitePhotos.aboutPortrait;

/**
 * Video course teaser — pulsing accent text (hero “experience” kin) + portrait card.
 */
export function VideoCourseLoadingSection() {
  return (
    <section
      className="section-navy-soft section-screen section-screen-center w-full"
      aria-label={launch.videoCourseLoading}
    >
      <div className="video-course-layout">
        <div className="video-course-text-wrap">
          <p className="video-course-loading-pulse text-center font-display text-2xl font-medium italic text-accent-coral sm:text-3xl lg:text-left lg:text-4xl">
            {launch.videoCourseLoading}
          </p>
        </div>

        <div className="video-course-image-wrap">
          <div className="video-course-portrait-card relative overflow-hidden rounded-xl">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 1023px) min(88vw, 420px), min(620px, 75vh)"
              className="h-full w-full object-cover"
              style={{ objectPosition: "center 15%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
