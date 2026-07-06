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
import { ProgramCard } from "@/components/marketing/program-card";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { createClient } from "@/lib/supabase/server";
import {
  launch,
  faq,
  waitlist,
} from "@/content/copy";
import type { CoachCredential } from "@/types/database";
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

export default async function HomePage() {
  const supabase = await createClient();
  const { data: credentials } = await supabase
    .from("coach_credentials")
    .select("*")
    .order("sort_order", { ascending: true });

  const allCredentials = (credentials as CoachCredential[]) ?? [];

  return (
    <PublicLayout>
      <HomeHero />

      <WhoItsForSection />

      <HowItWorksSection />

      {/* Programs — Coaching options (fixed-bg reveal on desktop) */}
      <section
        className="section-coaching-options section-coaching-fixed-bg section-screen section-screen-center w-full"
        aria-labelledby="coaching-options-heading"
      >
        <div className="section-screen-inner mx-auto max-w-6xl px-4 sm:px-6">
          <div className="my-auto w-full">
            <ScrollReveal>
              <h2
                id="coaching-options-heading"
                className="text-2xl font-bold text-foreground sm:text-3xl"
              >
                {launch.programs.title}
              </h2>
            </ScrollReveal>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {(["starter", "technique", "elite"] as const).map((tier, i) => (
                <ScrollReveal key={tier} delayMs={i * 110}>
                  <ProgramCard tier={tier} variant="glass" />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Half-height photo bands removed — broke scroll-snap; restore as split-screen later
      <PhotoBand
        photo={sitePhotos.videoTechnique}
        headline={launch.videoSection.title}
      />
      */}

      <VideoAnalysisSection />

      {/* Half-height photo bands removed — broke scroll-snap; restore as split-screen later
      <PhotoBand
        photo={sitePhotos.campsRacing}
        headline={launch.campsPreview.title}
        subheadline={launch.campsPreview.body}
      />
      */}

      <AboutOlympicSection credentials={allCredentials} />

      <CampsSection />

      <VideoCourseLoadingSection />

      {/* Athlete stories — swapped from above final CTA slot */}
      <section className="section-emerald-surface section-screen section-screen-center section-pad w-full">
        <div className="section-screen-inner mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-foreground">{launch.testimonials.title}</h2>
            <p className="mt-4 text-muted-foreground">{launch.testimonials.placeholder}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-cream section-atmo-glow-none section-screen section-screen-center section-pad w-full">
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
