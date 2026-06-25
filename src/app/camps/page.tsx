import { PublicLayout } from "@/components/layout/public-layout";
import { MarketingPhoto } from "@/components/marketing/marketing-photo";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { LinkButton } from "@/components/ui/link-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { sitePhotos } from "@/lib/marketing/site-photos";
import { camps, cta } from "@/content/copy";
import type { Camp } from "@/types/database";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training Camps",
  description: "Kayak training camps in Gainesville, Georgia with Erika Medveczky.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function CampsPage() {
  const supabase = await createClient();
  const { data: campList } = await supabase
    .from("camps")
    .select("*")
    .order("start_date", { ascending: true });

  const campsData = (campList as Camp[]) ?? [];

  return (
    <PublicLayout>
      <div className="section-cream mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <div>
              <h1 className="text-3xl font-bold text-navy sm:text-4xl">{camps.title}</h1>
              <p className="mt-2 text-muted-foreground">{camps.subtitle}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delayMs={120}>
            <MarketingPhoto photo={sitePhotos.campsRacing} variant="wide" parallax />
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-12">
          <section className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold text-navy">{camps.whyTitle}</h2>
              <p className="mt-3 text-muted-foreground">{camps.whyBody}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-navy">{camps.whoTitle}</h2>
              <p className="mt-3 text-muted-foreground">{camps.whoBody}</p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal className="mt-12" delayMs={80}>
          <section>
            <h2 className="text-xl font-semibold text-navy">{camps.includesTitle}</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {camps.includes.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>

        <ScrollReveal className="mt-12" delayMs={80}>
          <section>
            <h2 className="text-xl font-semibold text-navy">{camps.locationTitle}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{camps.locationBody}</p>
          </section>
        </ScrollReveal>

        <ScrollReveal className="mt-12">
          <section>
            <h2 className="text-xl font-semibold text-navy">Upcoming dates</h2>
            {campsData.length === 0 ? (
              <p className="mt-4 text-muted-foreground">{camps.datesPlaceholder}</p>
            ) : (
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                {campsData.map((camp, i) => (
                  <ScrollReveal key={camp.id} delayMs={i * 90}>
                    <Card className="border-border/60">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <CardTitle className="text-navy">{camp.title}</CardTitle>
                          {camp.price != null && (
                            <Badge variant="secondary">${camp.price}</Badge>
                          )}
                        </div>
                        <CardDescription>{camp.location}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          {formatDate(camp.start_date)} — {formatDate(camp.end_date)}
                        </p>
                        {camp.capacity != null && (
                          <p className="text-sm text-muted-foreground">
                            Capacity: {camp.capacity} athletes
                          </p>
                        )}
                        {camp.description && (
                          <p className="text-sm leading-relaxed">{camp.description}</p>
                        )}
                        <p className="text-xs text-muted-foreground">{camps.comingSoon}</p>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal className="mt-12 text-center">
          <LinkButton href="/apply" size="lg" className="bg-navy hover:bg-navy-light">
            {camps.registerInterest}
          </LinkButton>
          <p className="mt-3 text-sm text-muted-foreground">
            Or {cta.requestEvaluation.toLowerCase()} for camp priority.
          </p>
        </ScrollReveal>
      </div>
    </PublicLayout>
  );
}
