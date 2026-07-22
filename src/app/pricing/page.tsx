import { PublicLayout } from "@/components/layout/public-layout";
import { ProgramCard } from "@/components/marketing/program-card";
import { PremiumSectionDivider } from "@/components/marketing/premium-section-divider";
import { LinkButton } from "@/components/ui/link-button";
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
      <section
        className="programs-page-section w-full"
        aria-labelledby="programs-heading"
      >
        <div className="programs-page-inner">
          {/* No pricing.eyebrow in copy.ts — champagne eyebrow omitted (no new copy). */}
          <h1
            id="programs-heading"
            className="programs-page-heading font-display"
          >
            {pricing.title}
          </h1>
          <p className="programs-page-intro">{pricing.subtitle}</p>

          <div className="programs-page-grid">
            <ProgramCard tier="starter" />
            <ProgramCard tier="technique" />
            <ProgramCard tier="elite" />
          </div>
        </div>
        <PremiumSectionDivider />
      </section>

      <section
        className="programs-notes-section w-full"
        aria-label="Program notes"
      >
        <div className="programs-page-inner programs-notes-inner">
          <div className="programs-note-block">
            <h2 className="programs-note-title">Launch payment note</h2>
            <p className="programs-note-body">{pricing.stripeNote}</p>
            <p className="programs-note-body">{pricing.manualReviewNote}</p>
          </div>

          <div className="programs-note-block">
            <h2 className="programs-note-title">{pricing.campsNote.title}</h2>
            <ul className="programs-note-list">
              {pricing.campsNote.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <LinkButton href="/camps" className="mt-6 btn-cta-primary">
              View camps
            </LinkButton>
          </div>
        </div>
        <PremiumSectionDivider />
      </section>
    </PublicLayout>
  );
}
