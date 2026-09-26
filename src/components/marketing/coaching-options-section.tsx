import Image from "next/image";
import { Check } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { PremiumSectionDivider } from "@/components/marketing/premium-section-divider";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { MarketingCtaReveal } from "@/components/motion/marketing-cta-reveal";
import { cta, launch } from "@/content/copy";

type ProgramTier = "starter" | "technique" | "elite";

const TIERS: ProgramTier[] = ["starter", "technique", "elite"];

const SERVICE_PARAM: Record<string, string> = {
  starter: "technique_review",
  technique: "performance_coaching",
  elite: "high_performance_coaching",
};

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

function PremiumProgramCard({ tier }: { tier: ProgramTier }) {
  const program = launch.programs[tier];
  const accentFeature =
    "accentFeature" in program ? program.accentFeature : undefined;
  const priceNote = "priceNote" in program ? program.priceNote : undefined;
  const badge = "badge" in program ? program.badge : undefined;
  const ctaLabel = "ctaLabel" in program ? program.ctaLabel : undefined;
  const serviceParam = SERVICE_PARAM[tier] ?? "";

  return (
    <article className="premium-card">
      <div
        className={
          priceNote ? "premium-card-top premium-card-top--priced" : "premium-card-top"
        }
      >
        <span className="premium-card-number">{program.number}</span>
        {badge ? <span className="premium-card-badge">{badge}</span> : null}
        {priceNote ? (
          <span className="premium-card-price-badge">{priceNote}</span>
        ) : null}
      </div>

      <div className="premium-card-title-row contents">
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

      <MarketingCtaReveal className="premium-card-cta">
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
      <div className="coaching-options-mobile-photo hidden" aria-hidden="true">
        <div className="coaching-options-mobile-photo-mask">
          <Image
            src="/steg-coaching.webp"
            alt=""
            fill
            sizes="100vw"
            className="coaching-options-mobile-photo-img object-cover"
          />
        </div>
      </div>
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
              <ScrollReveal
                key={tier}
                className="coaching-options-card-reveal"
                delayMs={i * 110}
              >
                <PremiumProgramCard tier={tier} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delayMs={280}>
            <div className="coaching-options-proof">
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
      <PremiumSectionDivider />
    </section>
  );
}
