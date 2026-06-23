import { PublicLayout } from "@/components/layout/public-layout";
import { CredentialsList } from "@/components/credentials-list";
import { WaitlistForm } from "@/components/waitlist-form";
import { LinkButton } from "@/components/ui/link-button";
import { PhotoPlaceholder } from "@/components/marketing/photo-placeholder";
import { HomeHero } from "@/components/marketing/home-hero";
import { ProgramCard } from "@/components/marketing/program-card";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { createClient } from "@/lib/supabase/server";
import { isExternalCheckout } from "@/lib/marketing/cta";
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
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">
          {launch.whoItsFor.title}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {launch.whoItsFor.audiences.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm"
            >
              <p className="font-medium text-navy">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">
            {launch.howItWorks.title}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {launch.howItWorks.manualNote}
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {launch.howItWorks.steps.map((step, i) => (
              <div key={step.title} className="rounded-2xl border border-border/60 bg-card p-6">
                <span className="text-sm font-bold text-water">Step {i + 1}</span>
                <h3 className="mt-2 font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">
          {launch.programs.title}
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <ProgramCard tier="starter" />
          <ProgramCard tier="technique" />
          <ProgramCard tier="elite" />
        </div>
      </section>

      {/* Video analysis */}
      <section className="bg-muted/40 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
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
          <PhotoPlaceholder
            variant="wide"
            label="TODO: Video review / technique analysis visual"
          />
        </div>
      </section>

      {/* Camps preview */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <PhotoPlaceholder
            variant="wide"
            label="TODO: Gainesville lake / training camp image"
          />
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
        </div>
      </section>

      {/* About preview + credentials */}
      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
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
            <PhotoPlaceholder variant="portrait" label="TODO: Erika portrait photo" />
          </div>
          <div className="mt-12">
            <CredentialsList credentials={allCredentials} />
          </div>
        </div>
      </section>

      {/* Testimonials placeholder */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 text-center">
        <h2 className="text-2xl font-bold text-navy">{launch.testimonials.title}</h2>
        <p className="mt-4 text-muted-foreground">{launch.testimonials.placeholder}</p>
      </section>

      {/* Final CTA */}
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
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
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">{faq.title}</h2>
        <div className="mt-8 space-y-4">
          {faq.items.map((item) => (
            <div key={item.question} className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-navy">{item.question}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="bg-muted/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">{waitlist.title}</h2>
            <p className="mt-2 text-muted-foreground">{waitlist.subtitle}</p>
          </div>
          <div className="mt-8">
            <WaitlistForm />
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
