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
      <section className="relative overflow-hidden hero-surface">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-200/50 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="brand-label">{brand.tagline}</p>
          <h1 className="mt-4 max-w-2xl font-brand text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Train with Olympic-Level{" "}
            <span
              className="font-display italic brand-shimmer-text bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 bg-clip-text text-transparent"
            >
              Precision
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-gray-600">{hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton size="lg" href="/signup" gradient>
              {hero.ctaStart}
            </LinkButton>
            <LinkButton
              size="lg"
              variant="outline"
              href="/pricing"
              className="rounded-full border-gray-200 bg-white/70 text-gray-900 backdrop-blur-sm hover:bg-white"
            >
              {hero.ctaPlans}
            </LinkButton>
            <LinkButton
              size="lg"
              variant="ghost"
              href="#waitlist"
              className="rounded-full text-gray-700 hover:bg-white/60"
            >
              {hero.ctaWaitlist}
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="section-title">{valueProposition.title}</h2>
        <p className="mt-4 max-w-3xl text-lg text-gray-600">{valueProposition.body}</p>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="card-gradient p-6 sm:p-8">
            <h2 className="section-title">Verified credentials</h2>
            <p className="mt-2 text-gray-600">
              Competition and coaching credentials loaded from our database — editable without code changes.
            </p>
            <div className="mt-8">
              <CredentialsList credentials={(credentials as CoachCredential[]) ?? []} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="section-title">{howItWorks.title}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((step, i) => (
            <Card key={step.title} className="card-soft ring-0">
              <CardHeader>
                <span className="text-xs font-bold uppercase tracking-wider text-violet-600">
                  Step {i + 1}
                </span>
                <CardTitle className="font-brand text-gray-900">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="section-title">{plansOverview.title}</h2>
          <p className="mt-2 text-gray-600">{plansOverview.subtitle}</p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {plansOverview.tiers.map((tier) => (
              <Card key={tier.name} className="card-soft ring-0">
                <CardHeader>
                  <CardTitle className="font-brand text-gray-900">{tier.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{tier.description}</p>
                  <ul className="mt-4 space-y-2">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <LinkButton href="/pricing" gradient>View full pricing</LinkButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="section-title">{videoAnalysis.title}</h2>
            <p className="mt-4 text-gray-600">{videoAnalysis.body}</p>
          </div>
          <div className="card-soft p-8">
            <div className="flex h-40 items-center justify-center rounded-2xl bg-gray-50">
              <span className="text-sm text-gray-500">Video review preview — coming soon</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="section-title">{trainingPlans.title}</h2>
          <p className="mt-4 max-w-3xl text-gray-600">{trainingPlans.body}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="section-title">{trainingCamps.title}</h2>
        <p className="mt-4 max-w-3xl text-gray-600">{trainingCamps.body}</p>
        <LinkButton href="/camps" gradient className="mt-6">View camps</LinkButton>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="section-title">{faq.title}</h2>
          <div className="mt-8 space-y-4">
            {faq.items.map((item) => (
              <div key={item.question} className="card-soft p-6">
                <h3 className="font-brand font-semibold text-gray-900">{item.question}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="waitlist" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="glass-card mx-auto max-w-lg p-8 text-center">
          <h2 className="section-title">{waitlist.title}</h2>
          <p className="mt-2 text-gray-600">{waitlist.subtitle}</p>
          <div className="mt-6">
            <WaitlistForm />
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
