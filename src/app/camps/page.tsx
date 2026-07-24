import Image from "next/image";
import { PublicLayout } from "@/components/layout/public-layout";
import { ComingSoonButton } from "@/components/marketing/coming-soon-button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { camps } from "@/content/copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: camps.metaTitle,
  description: camps.metaDescription,
};

export default function CampsPage() {
  return (
    <PublicLayout>
      <section
        className="camps-hero section-cream section-screen w-full"
        aria-labelledby="camps-headline"
      >
        <div className="camps-hero-grid mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal className="camps-hero-text">
            <p className="eyebrow-label">{camps.eyebrow}</p>
            <h1
              id="camps-headline"
              className="camps-headline font-display mt-3 text-balance sm:mt-4"
            >
              {camps.headline}
            </h1>
            <div className="mt-4 h-0.5 w-12 bg-accent-gold lg:mt-5" aria-hidden="true" />
            <p className="camps-subheadline mt-5 sm:mt-6">{camps.subheadline}</p>
            <p className="camps-supporting mt-4">{camps.supportingCopy}</p>
            <p className="camps-status mt-6">{camps.statusLabel}</p>
            <ComingSoonButton label={camps.ctaLabel} className="mt-6" />
          </ScrollReveal>

          <ScrollReveal className="camps-hero-photo" delayMs={120}>
            <div className="camps-photo-frame">
              <Image
                src="/Africa.png"
                width={1672}
                height={941}
                alt={camps.imageAlt}
                priority
                sizes="(max-width: 1023px) 92vw, 600px"
                className="camps-photo"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  );
}
