import {
  BarChart3,
  Check,
  Compass,
  Star,
  type LucideIcon,
} from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { getStarterPriceLabel } from "@/lib/marketing/cta";
import { cta, launch, pricing } from "@/content/copy";

type ProgramKey = "starter" | "technique" | "elite";

const CARD_ICONS: Record<ProgramKey, LucideIcon> = {
  starter: Compass,
  technique: BarChart3,
  elite: Star,
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
 * Copy + CTA targets match the prior ProgramCard (price line kept; no accentFeature).
 */
export function ProgramCard({ tier }: { tier: ProgramKey }) {
  const program = launch.programs[tier];
  const Icon = CARD_ICONS[tier];
  const priceLabel =
    tier === "starter"
      ? getStarterPriceLabel()
      : (program as { priceNote?: string }).priceNote ?? pricing.manualReviewNote;

  return (
    <article className="premium-card">
      <div className="premium-card-top">
        <span className="premium-card-number">{program.number}</span>
        <span className="premium-card-glyph" aria-hidden="true">
          <Icon strokeWidth={1.25} />
        </span>
      </div>

      <h3 className="premium-card-title">{program.name}</h3>
      <p className="premium-card-price">{priceLabel}</p>
      <p className="premium-card-desc">{program.description}</p>

      <div className="premium-card-rule" aria-hidden="true" />

      <div className="premium-card-checks">
        {program.features.map((text) => (
          <PremiumCheckRow key={text} text={text} />
        ))}
      </div>

      <div className="premium-card-cta">
        {program.cta === "start" ? (
          <StartCoachingButton
            size="sm"
            className="btn-cta-primary w-full"
            label={cta.bookTechniqueReview}
          />
        ) : (
          <LinkButton
            href="/apply"
            size="sm"
            className="btn-cta-gold-outline w-full"
          >
            {cta.requestEvaluation}
            <CtaArrow />
          </LinkButton>
        )}
      </div>
    </article>
  );
}
