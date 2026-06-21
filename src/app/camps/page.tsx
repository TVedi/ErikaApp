import { PublicLayout } from "@/components/layout/public-layout";
import { LinkButton } from "@/components/ui/link-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { camps } from "@/content/copy";
import type { Camp } from "@/types/database";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training Camps",
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
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold text-navy sm:text-4xl">{camps.title}</h1>
        <p className="mt-2 text-muted-foreground">{camps.subtitle}</p>

        {campsData.length === 0 ? (
          <p className="mt-10 text-muted-foreground">{camps.empty}</p>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {campsData.map((camp) => (
              <Card key={camp.id} className="border-border/60">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-navy">{camp.title}</CardTitle>
                    {camp.price != null && (
                      <Badge variant="secondary">${camp.price}</Badge>
                    )}
                  </div>
                  <CardDescription>{camp.location}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                  <LinkButton
                    variant="outline"
                    href="/login"
                    className="border-navy text-navy hover:bg-navy/5"
                  >
                    {camps.registerInterest}
                  </LinkButton>
                  <p className="text-xs text-muted-foreground">{camps.comingSoon}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
