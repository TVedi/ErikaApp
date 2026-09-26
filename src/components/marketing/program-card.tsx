import { Check } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { cta, launch } from "@/content/copy";

type ProgramKey = "starter" | "technique" | "elite";

const SERVICE_PARAM: Record<string, string> = {
  starter: "technique_review",
  technique: "performance_coaching",
  elite: "high_performance_coaching",
};

/** Clean arrow — same mark used on Coaching Options gold CTAs */
function CtaArrow() {
  return (
    <svg
      className="btn-cta-arrow"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 8h9.2M8.8 4.2L12.8 8l-4 3.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PremiumCheckRow({ text }: { text: string }) {
  return (
    <div className="premium-card-check-row">
      <span className="premium-card-check-icon" aria-hidden="true">
        <Check strokeWidth={1.25} />
      </span>
      <p className="premium-card-check-text">{text}</p>
    </div>
  );
}

/**
 * /programs card — Coaching Options premium-card shell.
 * Copy + CTA targets match the prior ProgramCard (price line kept).
 */
export function ProgramCard({ tier }: { tier: ProgramKey }) {
  const program = launch.programs[tier];
  const badge = "badge" in program ? program.badge : undefined;
  const ctaLabel = "ctaLabel" in program ? program.ctaLabel : undefined;
  const accentFeature =
    "accentFeature" in program ? program.accentFeature : undefined;
  const serviceParam = SERVICE_PARAM[tier] ?? "";
  const priceLabel = (program as { priceNote?: string }).priceNote ?? "";

  return (
    <article className="premium-card">
      <div className="premium-card-top premium-card-top--priced">
        <span className="premium-card-number">{program.number}</span>
        {badge ? <span className="premium-card-badge">{badge}</span> : null}
        {priceLabel ? (
          <span className="premium-card-price-badge">{priceLabel}</span>
        ) : null}
      </div>

      <div className="premium-card-heading">
        <h3 className="premium-card-title">{program.name}</h3>
      </div>
      <p className="premium-card-desc">{program.description}</p>

      <div className="premium-card-rule" aria-hidden="true" />

      <div className="premium-card-checks">
        {program.features.map((text) => (
          <PremiumCheckRow key={text} text={text} />
        ))}
      </div>

      {accentFeature ? <p className="premium-card-note">{accentFeature}</p> : null}

      <div className="premium-card-cta">
        {program.cta === "start" ? (
          <StartCoachingButton
            size="sm"
            className="btn-cta-primary w-full"
            label={ctaLabel ?? cta.getStarted}
            service={serviceParam}
          />
        ) : (
          <LinkButton
            href={`/apply?service=${serviceParam}`}
            size="sm"
            className="btn-cta-primary w-full"
          >
            {ctaLabel ?? cta.requestEvaluation}
            <CtaArrow />
          </LinkButton>
        )}
      </div>
    </article>
  );
}
