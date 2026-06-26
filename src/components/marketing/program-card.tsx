import { LinkButton } from "@/components/ui/link-button";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStarterPriceLabel } from "@/lib/marketing/cta";
import { cta, launch, pricing } from "@/content/copy";

type ProgramKey = "starter" | "technique" | "elite";

const programMap: Record<ProgramKey, typeof launch.programs.starter> = {
  starter: launch.programs.starter,
  technique: launch.programs.technique,
  elite: launch.programs.elite,
};

export function ProgramCard({ tier }: { tier: ProgramKey }) {
  const program = programMap[tier];
  const priceLabel =
    tier === "starter"
      ? getStarterPriceLabel()
      : (program as { priceNote?: string }).priceNote ?? pricing.manualReviewNote;

  return (
    <Card className="border-border/60 h-full">
      <CardHeader>
        <CardTitle className="text-navy">{program.name}</CardTitle>
        <p className="text-sm font-medium text-water">{priceLabel}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{program.description}</p>
        <ul className="space-y-2">
          {program.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {f}
            </li>
          ))}
        </ul>
        {program.cta === "start" ? (
          <StartCoachingButton size="sm" />
        ) : (
          <LinkButton
            href="/apply"
            size="sm"
            variant="outline"
            className="border-navy text-navy hover:bg-navy/5"
          >
            {cta.requestEvaluation}
          </LinkButton>
        )}
      </CardContent>
    </Card>
  );
}
