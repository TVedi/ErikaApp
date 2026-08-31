import { PublicLayout } from "@/components/layout/public-layout";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { launch } from "@/content/copy";
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
        </div>
      </section>
    </PublicLayout>
  );
}
