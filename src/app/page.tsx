import { PublicLayout } from "@/components/layout/public-layout";
import { WaitlistForm } from "@/components/waitlist-form";
// import { PhotoBand } from "@/components/marketing/photo-band";
import { HomeHero } from "@/components/marketing/home-hero";
import { AboutOlympicSection } from "@/components/marketing/about-olympic-section";
import { CampsSection } from "@/components/marketing/camps-section";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { VideoAnalysisSection } from "@/components/marketing/video-analysis-section";
import { WhoItsForSection } from "@/components/marketing/who-its-for-section";
import { VideoCourseLoadingSection } from "@/components/marketing/video-course-loading-section";
import { CoachingOptionsSection } from "@/components/marketing/coaching-options-section";
import { PremiumSectionDivider } from "@/components/marketing/premium-section-divider";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import {
  launch,
  faq,
  waitlist,
} from "@/content/copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elite Paddle Coaching | Olympic Kayak Coaching by Erika Medveczky",
  description:
    "Online kayak coaching, expert video technique analysis, and training camp opportunities with Olympic sprint kayaker and World Champion Erika Medveczky.",
  openGraph: {
    title: "Elite Paddle Coaching | Olympic Kayak Coaching by Erika Medveczky",
    description:
      "Online kayak coaching, expert video technique analysis, and training camps in Gainesville, Georgia with Erika Medveczky.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <PublicLayout>
      <HomeHero />

      <WhoItsForSection />

      <HowItWorksSection />

      <VideoAnalysisSection />

      <CoachingOptionsSection />

      {/* Half-height photo bands removed — broke scroll-snap; restore as split-screen later
      <PhotoBand
        photo={sitePhotos.videoTechnique}
        headline={launch.videoSection.title}
      />
      */}

      <AboutOlympicSection />

      <CampsSection />

      <VideoCourseLoadingSection />

      {/* Athlete stories — swapped from above final CTA slot */}
      <section
        data-home-section="stories"
        className="section-emerald-surface section-screen section-screen-center section-pad relative w-full"
      >
        <div className="section-screen-inner mx-auto flex max-w-6xl flex-col items-center justify-center px-4 text-center sm:px-6">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-medium italic text-accent-coral sm:text-3xl lg:text-4xl">
              {launch.testimonials.title}
            </h2>
          </ScrollReveal>
        </div>
        <PremiumSectionDivider />
      </section>

      {/* FAQ */}
      <section
        data-home-section="faq"
        className="section-cream section-atmo-glow-none section-screen section-screen-center section-pad w-full"
      >
        <div className="section-screen-inner mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{faq.title}</h2>
          </ScrollReveal>
          <div className="mt-8 space-y-4">
            {faq.items.map((item, i) => (
              <ScrollReveal key={item.question} delayMs={i * 70}>
                <div className="program-card-glass rounded-xl p-6">
                  <h3 className="font-semibold text-foreground">{item.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="section-navy-soft section-screen section-screen-center section-pad w-full">
        <div className="section-screen-inner mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal className="text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{waitlist.title}</h2>
            <p className="mt-2 text-muted-foreground">{waitlist.subtitle}</p>
          </ScrollReveal>
          <ScrollReveal className="mt-8" delayMs={100}>
            <WaitlistForm />
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  );
}
