import Image from "next/image";
import { PublicLayout } from "@/components/layout/public-layout";
import { ProgramCard } from "@/components/marketing/program-card";
import { PremiumSectionDivider } from "@/components/marketing/premium-section-divider";
import { pricing } from "@/content/copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Technique Review, Performance Coaching, and High Performance Coaching programs with Olympic kayak coach Erika Medveczky.",
};

export default function PricingPage() {
  return (
    <PublicLayout>
      <section
        className="programs-page-section w-full"
        aria-labelledby="programs-heading"
      >
        <div className="programs-mobile-photo" aria-hidden="true">
          <div className="programs-mobile-photo-mask">
            <Image
              src="/Erika bajnok2-programs.webp"
              alt=""
              fill
              sizes="100vw"
              className="programs-mobile-photo-img object-cover"
            />
          </div>
        </div>
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
    </PublicLayout>
  );
}
