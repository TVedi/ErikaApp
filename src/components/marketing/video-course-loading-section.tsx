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
      className="section-navy-soft section-screen section-screen-center section-pad w-full"
      aria-label={launch.videoCourseLoading}
    >
      <div className="section-screen-inner mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
          <div className="flex w-full flex-1 justify-center lg:justify-start">
            <p className="video-course-loading-pulse text-center font-display text-2xl font-medium italic text-accent-coral sm:text-3xl lg:text-left lg:text-4xl">
              {launch.videoCourseLoading}
            </p>
          </div>

          <div className="flex shrink-0 justify-center lg:justify-end">
            <div className="video-course-portrait-card relative overflow-hidden rounded-xl">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 1023px) min(92vw, 560px), 520px"
                className="h-full w-full object-cover"
                style={{ objectPosition: photo.objectPosition }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
