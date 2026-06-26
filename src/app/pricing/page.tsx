import { PublicLayout } from "@/components/layout/public-layout";
import { ProgramCard } from "@/components/marketing/program-card";
import { LinkButton } from "@/components/ui/link-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pricing } from "@/content/copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Starter Guidance, Technique Review, and Elite Coaching programs with Olympic kayak coach Erika Medveczky.",
};

export default function PricingPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold text-navy sm:text-4xl">{pricing.title}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{pricing.subtitle}</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <ProgramCard tier="starter" />
          <ProgramCard tier="technique" />
          <ProgramCard tier="elite" />
        </div>

        <Card className="mt-10 border-border/60 bg-muted/30">
          <CardHeader>
            <CardTitle className="text-navy text-lg">Launch payment note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>{pricing.stripeNote}</p>
            <p>{pricing.manualReviewNote}</p>
          </CardContent>
        </Card>

        <Card className="mt-6 border-border/60">
          <CardHeader>
            <CardTitle className="text-navy">{pricing.campsNote.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {pricing.campsNote.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <LinkButton href="/camps" className="mt-6 btn-cta-primary">
              View camps
            </LinkButton>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
