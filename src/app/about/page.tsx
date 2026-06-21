import { PublicLayout } from "@/components/layout/public-layout";
import { CredentialsList } from "@/components/credentials-list";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { about } from "@/content/copy";
import type { CoachCredential } from "@/types/database";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: credentials } = await supabase
    .from("coach_credentials")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold text-navy sm:text-4xl">{about.title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{about.intro}</p>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-navy">Professional biography</h2>
          <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">
            {about.biographyPlaceholder}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-navy">{about.philosophyTitle}</h2>
          <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">
            {about.philosophy}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-navy">Credentials</h2>
          <div className="mt-6">
            <CredentialsList
              credentials={(credentials as CoachCredential[]) ?? []}
              variant="compact"
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-navy">{about.focusAreasTitle}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {about.focusAreas.map((area) => (
              <Badge key={area} variant="secondary" className="text-sm">
                {area}
              </Badge>
            ))}
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
