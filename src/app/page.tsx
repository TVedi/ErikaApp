import { PublicLayout } from "@/components/layout/public-layout";
import { CredentialsList } from "@/components/credentials-list";
import { WaitlistForm } from "@/components/waitlist-form";
import { LinkButton } from "@/components/ui/link-button";
import { MarketingPhoto } from "@/components/marketing/marketing-photo";
import { HomeHero } from "@/components/marketing/home-hero";
import { ProgramCard } from "@/components/marketing/program-card";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { createClient } from "@/lib/supabase/server";
import { sitePhotos } from "@/lib/marketing/site-photos";
import {
  cta,
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
  const featuredCredentials = allCredentials
    .filter((c) => c.featured)
    .sort((a, b) => a.sort_order - b.sort_order)
    .slice(0, 3);

  return (
    <PublicLayout>
      <HomeHero featuredCredentials={featuredCredentials} />

      {/* Who it's for */}
      <section className="section-cream mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">
            {launch.whoItsFor.title}
          </h2>
        </ScrollReveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {launch.whoItsFor.audiences.map((item, i) => (
            <ScrollReveal key={item} delayMs={i * 90}>
              <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                <p className="font-medium text-navy">{item}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="section-navy-soft py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">
              {launch.howItWorks.title}
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {launch.howItWorks.manualNote}
            </p>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {launch.howItWorks.steps.map((step, i) => (
              <ScrollReveal key={step.title} delayMs={i * 100}>
                <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                  <span className="text-sm font-bold text-water">Step {i + 1}</span>
                  <h3 className="mt-2 font-semibold text-navy">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">
            {launch.programs.title}
          </h2>
        </ScrollReveal>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {(["starter", "technique", "elite"] as const).map((tier, i) => (
            <ScrollReveal key={tier} delayMs={i * 110}>
              <ProgramCard tier={tier} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Video analysis */}
      <section className="section-cream py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <div>
              <h2 className="text-2xl font-bold text-navy sm:text-3xl">
                {launch.videoSection.title}
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {launch.videoSection.body}
              </p>
              <ul className="mt-6 space-y-2">
                {launch.videoSection.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delayMs={120}>
            <MarketingPhoto
              photo={sitePhotos.videoTechnique}
              variant="wide"
              parallax
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Camps preview */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <MarketingPhoto
              photo={sitePhotos.campsLake}
              variant="wide"
              parallax
            />
          </ScrollReveal>
          <ScrollReveal delayMs={100}>
            <div>
              <h2 className="text-2xl font-bold text-navy sm:text-3xl">
                {launch.campsPreview.title}
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {launch.campsPreview.body}
              </p>
              <LinkButton href="/apply" className="mt-6 bg-navy hover:bg-navy-light">
                {launch.campsPreview.cta}
              </LinkButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About preview + credentials */}
      <section className="section-navy-soft py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <ScrollReveal>
              <div>
                <h2 className="text-2xl font-bold text-navy sm:text-3xl">
                  {launch.aboutPreview.title}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {launch.aboutPreview.body}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {launch.aboutPreview.credentialNote}
                </p>
                <LinkButton href="/about" variant="outline" className="mt-6 border-navy text-navy">
                  About Erika
                </LinkButton>
              </div>
            </ScrollReveal>
            <ScrollReveal delayMs={120}>
              <MarketingPhoto photo={sitePhotos.aboutPortrait} variant="portrait" />
            </ScrollReveal>
          </div>
          <ScrollReveal className="mt-12">
            <CredentialsList credentials={allCredentials} />
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials placeholder */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 text-center">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-navy">{launch.testimonials.title}</h2>
          <p className="mt-4 text-muted-foreground">{launch.testimonials.placeholder}</p>
        </ScrollReveal>
      </section>

      {/* Final CTA */}
      <section className="bg-navy py-16 sm:py-20 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-bold sm:text-3xl text-balance">
              {launch.finalCta.title}
            </h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <StartCoachingButton
                size="lg"
                className="bg-white text-navy hover:bg-white/90 w-full sm:w-auto"
              />
              <LinkButton
                size="lg"
                variant="outline"
                href="/apply"
                className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto"
              >
                {cta.requestEvaluation}
              </LinkButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-cream mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">{faq.title}</h2>
        </ScrollReveal>
        <div className="mt-8 space-y-4">
          {faq.items.map((item, i) => (
            <ScrollReveal key={item.question} delayMs={i * 70}>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-navy">{item.question}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="section-navy-soft py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal className="text-center">
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">{waitlist.title}</h2>
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
