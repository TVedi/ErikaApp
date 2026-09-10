import Image from "next/image";
import { PublicLayout } from "@/components/layout/public-layout";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ComingSoonButton } from "@/components/marketing/coming-soon-button";
import { camps, launch } from "@/content/copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Course | Elite Paddle Coaching",
  description: launch.videoCourse.body,
};

export default function VideoCoursePage() {
  return (
    <PublicLayout>
      <section
        className="section-cream section-screen section-screen-center section-pad w-full"
        aria-labelledby="video-course-headline"
      >
        <div className="section-screen-inner mx-auto max-w-3xl px-4 sm:px-6">
          <ScrollReveal>
            <p className="eyebrow-label">{launch.videoCourse.eyebrow}</p>
            <h1
              id="video-course-headline"
              className="font-display text-gold-sweep mt-3 text-balance text-4xl sm:mt-4 sm:text-5xl"
            >
              {launch.videoCourse.headingLine1}{" "}
              {launch.videoCourse.headingLine2}
            </h1>
            <div
              className="mt-4 h-0.5 w-12 bg-accent-gold lg:mt-5"
              aria-hidden="true"
            />
            <p className="mt-5 text-lg sm:mt-6">{launch.videoCourse.body}</p>
            <p className="mt-4 opacity-80">{launch.videoCourse.secondary}</p>
          </ScrollReveal>

          <ScrollReveal className="lg:hidden" delayMs={120}>
            <ComingSoonButton label={camps.ctaLabel} className="mt-6" />
            <div className="mt-8 flex justify-start">
              <div className="speaking-portrait-frame">
                <Image
                  src="/DSC09930-videocourse.webp"
                  width={933}
                  height={1400}
                  alt="Erika Medveczky with kayak paddle"
                  sizes="(max-width: 1023px) 85vw, 440px"
                  className="speaking-portrait"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  );
}
