import Image from "next/image";
import { PublicLayout } from "@/components/layout/public-layout";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { speaking } from "@/content/copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: speaking.metaTitle,
  description: speaking.metaDescription,
};

export default function SpeakingPage() {
  return (
    <PublicLayout>
      <section
        className="speaking-hero section-cream section-screen w-full"
        aria-labelledby="speaking-headline"
      >
        <div className="speaking-hero-grid mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal className="speaking-hero-text">
            <p className="eyebrow-label">{speaking.eyebrow}</p>
            <h1
              id="speaking-headline"
              className="speaking-headline font-display text-gold-sweep mt-3 text-balance sm:mt-4"
            >
              {speaking.headline}
            </h1>
            <div className="mt-4 h-0.5 w-12 bg-accent-gold lg:mt-5" aria-hidden="true" />
            <p className="speaking-subheadline mt-5 sm:mt-6">{speaking.subheadline}</p>
            <p className="speaking-supporting mt-4">{speaking.supportingCopy}</p>
            <p className="speaking-coming-soon mt-6">{speaking.comingSoon}</p>
            <p className="speaking-cta-soft mt-6" role="status">
              {speaking.ctaLabel}
            </p>
          </ScrollReveal>

          <ScrollReveal className="speaking-hero-photo" delayMs={120}>
            <div className="speaking-portrait-frame">
              <Image
                src="/images/erika-speaking.jpg"
                width={983}
                height={1472}
                alt={speaking.imageAlt}
                priority
                sizes="(max-width: 1023px) 85vw, 440px"
                className="speaking-portrait"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  );
}
