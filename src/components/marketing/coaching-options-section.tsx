import {
  BarChart3,
  Check,
  Compass,
  Star,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { MarketingCtaReveal } from "@/components/motion/marketing-cta-reveal";
import { cta, launch } from "@/content/copy";

const CARD_ICONS: LucideIcon[] = [Compass, BarChart3, Star];

type ProgramTier = "starter" | "technique" | "elite";

const TIERS: ProgramTier[] = ["starter", "technique", "elite"];

/** Clean arrow -- never paste raw unicode into CSS content */
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

function PremiumCheckRow({
  text,
  accent = false,
}: {
  text: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        accent
          ? "premium-card-check-row premium-card-check-row-accent"
          : "premium-card-check-row"
      }
    >
      <span className="premium-card-check-icon" aria-hidden="true">
        <Check strokeWidth={1.25} />
      </span>
      <p className="premium-card-check-text">{text}</p>
    </div>
  );
}

function PremiumProgramCard({
  tier,
  index,
}: {
  tier: ProgramTier;
  index: number;
}) {
  const program = launch.programs[tier];
  const Icon = CARD_ICONS[index];
  const accentFeature =
    "accentFeature" in program ? program.accentFeature : undefined;

  return (
    <article className="premium-card">
      <div className="premium-card-top">
        <span className="premium-card-number">{program.number}</span>
        <span className="premium-card-glyph" aria-hidden="true">
          <Icon strokeWidth={1.25} />
        </span>
      </div>

      <h3 className="premium-card-title">{program.name}</h3>
      <p className="premium-card-desc">{program.description}</p>

      <div className="premium-card-rule" aria-hidden="true" />

      <div className="premium-card-checks">
        {program.features.map((text) => (
          <PremiumCheckRow key={text} text={text} />
        ))}
        {accentFeature ? (
          <PremiumCheckRow text={accentFeature} accent />
        ) : null}
      </div>

      <MarketingCtaReveal className="premium-card-cta">
        {program.cta === "start" ? (
          <StartCoachingButton
            size="sm"
            className="btn-cta-primary w-full"
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
      </MarketingCtaReveal>
    </article>
  );
}

/**
 * Coaching Options — fixed-bg athlete photo + premium glass cards.
 * CTA targets and scroll-snap-stop: always are intentionally preserved.
 */
export function CoachingOptionsSection() {
  const { programs } = launch;

  return (
    <section
      className="section-coaching-options section-coaching-fixed-bg section-screen section-screen-center w-full"
      aria-labelledby="coaching-options-heading"
    >
      <div className="section-screen-inner coaching-options-inner mx-auto max-w-6xl px-4 sm:px-6">
        <div className="my-auto w-full">
          <ScrollReveal>
            <p className="coaching-options-eyebrow">{programs.eyebrow}</p>
          </ScrollReveal>

          <ScrollReveal>
            <h2
              id="coaching-options-heading"
              className="coaching-options-heading font-display"
            >
              {programs.title}
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <p className="coaching-options-intro">{programs.intro}</p>
          </ScrollReveal>

          <div className="coaching-options-grid">
            {TIERS.map((tier, i) => (
              <ScrollReveal key={tier} delayMs={i * 110}>
                <PremiumProgramCard tier={tier} index={i} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delayMs={280}>
            <div className="coaching-options-proof">
              <span className="coaching-options-proof-icon" aria-hidden="true">
                <Trophy strokeWidth={1.25} />
              </span>
              <p className="coaching-options-proof-lead">
                {programs.proofStrip.lead}
              </p>
              <span className="coaching-options-proof-sep" aria-hidden="true" />
              <ul className="coaching-options-proof-items">
                {programs.proofStrip.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
