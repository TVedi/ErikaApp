import Image from "next/image";
import { PublicLayout } from "@/components/layout/public-layout";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { LinkButton } from "@/components/ui/link-button";
import { launch } from "@/content/copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Course | Medveczky Performance",
  description: launch.videoCourse.body,
};

/**
 * Video Course page: the same hero layout as /camps and /speaking - text on the
 * left, the framed portrait on the right on desktop; on phones the portrait
 * sits in the top-right corner beside the heading.
 */
export default function VideoCoursePage() {
  const copy = launch.videoCourse;

  return (
    <PublicLayout>
      <section
        className="camps-hero video-course-hero section-cream section-screen w-full"
        aria-labelledby="video-course-headline"
      >
        <div className="camps-hero-grid mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal className="camps-hero-text">
            <p className="eyebrow-label">{copy.eyebrow}</p>
            <h1
              id="video-course-headline"
              className="camps-headline font-display mt-3 text-balance sm:mt-4"
            >
              {copy.title}
            </h1>
            <div className="mt-4 h-0.5 w-12 bg-accent-gold lg:mt-5" aria-hidden="true" />
            <p className="camps-subheadline mt-5 sm:mt-6">{copy.body}</p>
            <p className="camps-supporting mt-4">{copy.secondary}</p>
            <LinkButton
              href={copy.ctaHref}
              size="lg"
              className="btn-cta-primary camps-page-cta mt-7 w-full sm:w-auto"
            >
              {copy.cta}
            </LinkButton>
          </ScrollReveal>

          <ScrollReveal className="camps-hero-photo" delayMs={120}>
            <div className="speaking-portrait-frame">
              <Image
                src="/DSC09930-videocourse.webp"
                width={933}
                height={1400}
                alt="Erika Medveczky with kayak paddle"
                priority
                sizes="(max-width: 1023px) 85vw, 440px"
                className="speaking-portrait"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  );
}
