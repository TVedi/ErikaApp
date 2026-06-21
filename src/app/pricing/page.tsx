import { PublicLayout } from "@/components/layout/public-layout";
import { LinkButton } from "@/components/ui/link-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { plansOverview, pricing } from "@/content/copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold text-navy sm:text-4xl">{pricing.title}</h1>
        <p className="mt-2 text-muted-foreground">{pricing.subtitle}</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {plansOverview.tiers.map((tier, i) => (
            <Card
              key={tier.name}
              className={`border-border/60 ${i === 2 ? "ring-2 ring-water/50" : ""}`}
            >
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

        <Card className="mt-10 border-border/60 bg-muted/30">
          <CardHeader>
            <CardTitle className="text-navy">{pricing.campsNote.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {pricing.campsNote.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-water" />
                  {item}
                </li>
              ))}
            </ul>
            <LinkButton href="/camps" className="mt-6 bg-navy hover:bg-navy-light">
              View camps
            </LinkButton>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
