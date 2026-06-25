import { PublicLayout } from "@/components/layout/public-layout";
import { CredentialsList } from "@/components/credentials-list";
import { MarketingPhoto } from "@/components/marketing/marketing-photo";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { sitePhotos } from "@/lib/marketing/site-photos";
import { about } from "@/content/copy";
import type { CoachCredential } from "@/types/database";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Erika",
  description:
    "Olympic sprint kayaker and elite kayak coach Erika Medveczky — coaching from Gainesville, Georgia.",
};

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: credentials } = await supabase
    .from("coach_credentials")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <PublicLayout>
      <div className="section-cream mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <ScrollReveal>
            <div>
              <h1 className="text-3xl font-bold text-navy sm:text-4xl">{about.title}</h1>
              <p className="mt-4 max-w-3xl text-lg text-muted-foreground leading-relaxed">
                {about.intro}
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delayMs={120}>
            <MarketingPhoto photo={sitePhotos.aboutPortrait} variant="portrait" />
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-12">
          <section>
            <h2 className="text-xl font-semibold text-navy">{about.storyTitle}</h2>
            <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">{about.story}</p>
          </section>
        </ScrollReveal>

        <ScrollReveal className="mt-12" delayMs={80}>
          <section>
            <h2 className="text-xl font-semibold text-navy">{about.philosophyTitle}</h2>
            <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">
              {about.philosophy}
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal className="mt-12" delayMs={80}>
          <section>
            <h2 className="text-xl font-semibold text-navy">{about.videoTitle}</h2>
            <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">{about.videoBody}</p>
          </section>
        </ScrollReveal>

        <ScrollReveal className="mt-12" delayMs={80}>
          <section>
            <h2 className="text-xl font-semibold text-navy">{about.gainesvilleTitle}</h2>
            <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">
              {about.gainesvilleBody}
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal className="mt-12">
          <section>
            <h2 className="text-xl font-semibold text-navy">Credentials</h2>
            <p className="mt-2 text-xs text-muted-foreground">{about.credentialNote}</p>
            <div className="mt-6">
              <CredentialsList
                credentials={(credentials as CoachCredential[]) ?? []}
                variant="compact"
              />
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal className="mt-12" delayMs={80}>
          <section>
            <h2 className="text-xl font-semibold text-navy">{about.focusAreasTitle}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {about.focusAreas.map((area) => (
                <Badge key={area} variant="secondary" className="text-sm">
                  {area}
                </Badge>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </div>
    </PublicLayout>
  );
}
