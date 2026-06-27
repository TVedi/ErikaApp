import { LinkButton } from "@/components/ui/link-button";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStarterPriceLabel } from "@/lib/marketing/cta";
import { cn } from "@/lib/utils";
import { cta, launch, pricing } from "@/content/copy";

type ProgramKey = "starter" | "technique" | "elite";

const programMap: Record<ProgramKey, typeof launch.programs.starter> = {
  starter: launch.programs.starter,
  technique: launch.programs.technique,
  elite: launch.programs.elite,
};

export function ProgramCard({
  tier,
  variant = "default",
}: {
  tier: ProgramKey;
  variant?: "default" | "glass";
}) {
  const program = programMap[tier];
  const priceLabel =
    tier === "starter"
      ? getStarterPriceLabel()
      : (program as { priceNote?: string }).priceNote ?? pricing.manualReviewNote;

  return (
    <Card
      className={cn(
        "h-full",
        variant === "glass"
          ? "program-card-glass border-0 bg-transparent shadow-none ring-0"
          : "border-border/60"
      )}
    >
      <CardHeader>
        <CardTitle className="text-foreground">{program.name}</CardTitle>
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
            className="border-foreground/25 text-foreground hover:bg-foreground/10"
          >
            {cta.requestEvaluation}
          </LinkButton>
        )}
      </CardContent>
    </Card>
  );
}
