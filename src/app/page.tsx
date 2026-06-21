import { PublicLayout } from "@/components/layout/public-layout";
import { CredentialsList } from "@/components/credentials-list";
import { WaitlistForm } from "@/components/waitlist-form";
import { LinkButton } from "@/components/ui/link-button";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  brand,
  hero,
  valueProposition,
  howItWorks,
  plansOverview,
  videoAnalysis,
  trainingPlans,
  trainingCamps,
  faq,
  waitlist,
} from "@/content/copy";
import type { CoachCredential } from "@/types/database";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: credentials } = await supabase
    .from("coach_credentials")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.45_0.12_220/0.3),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-medium tracking-wide text-water/90 uppercase">
            {brand.tagline}
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">{hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton size="lg" href="/signup" className="bg-white text-navy hover:bg-white/90">
              {hero.ctaStart}
            </LinkButton>
            <LinkButton
              size="lg"
              variant="outline"
              href="/pricing"
              className="border-white/30 text-white hover:bg-white/10"
            >
              {hero.ctaPlans}
            </LinkButton>
            <LinkButton
              size="lg"
              variant="ghost"
              href="#waitlist"
              className="text-white hover:bg-white/10"
            >
              {hero.ctaWaitlist}
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Value proposition */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">
          {valueProposition.title}
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          {valueProposition.body}
        </p>
      </section>

      {/* Credibility */}
      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">
            Verified credentials
          </h2>
          <p className="mt-2 text-muted-foreground">
            Competition and coaching credentials loaded from our database — editable without code changes.
          </p>
          <div className="mt-8">
            <CredentialsList credentials={(credentials as CoachCredential[]) ?? []} />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">{howItWorks.title}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((step, i) => (
            <Card key={step.title} className="border-border/60">
              <CardHeader>
                <span className="text-sm font-bold text-water">Step {i + 1}</span>
                <CardTitle className="text-navy">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Plans overview */}
      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">{plansOverview.title}</h2>
          <p className="mt-2 text-muted-foreground">{plansOverview.subtitle}</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {plansOverview.tiers.map((tier) => (
              <Card key={tier.name} className="border-border/60">
                <CardHeader>
                  <CardTitle className="text-navy">{tier.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                  <ul className="mt-4 space-y-2">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-water" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <LinkButton href="/pricing" className="bg-navy hover:bg-navy-light">
              View full pricing
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Video analysis */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">{videoAnalysis.title}</h2>
            <p className="mt-4 text-muted-foreground">{videoAnalysis.body}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex h-40 items-center justify-center rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Video review preview — coming soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* Training plans */}
      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">{trainingPlans.title}</h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">{trainingPlans.body}</p>
        </div>
      </section>

      {/* Training camps */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">{trainingCamps.title}</h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">{trainingCamps.body}</p>
        <LinkButton href="/camps" className="mt-6 bg-navy hover:bg-navy-light">
          View camps
        </LinkButton>
      </section>

      {/* FAQ */}
      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">{faq.title}</h2>
          <div className="mt-8 space-y-6">
            {faq.items.map((item) => (
              <div key={item.question} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold text-navy">{item.question}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">{waitlist.title}</h2>
          <p className="mt-2 text-muted-foreground">{waitlist.subtitle}</p>
        </div>
        <div className="mt-8">
          <WaitlistForm />
        </div>
      </section>
    </PublicLayout>
  );
}
