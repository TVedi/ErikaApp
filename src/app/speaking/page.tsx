import Image from "next/image";
import { PublicLayout } from "@/components/layout/public-layout";
import { PremiumSectionDivider } from "@/components/marketing/premium-section-divider";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { LinkButton } from "@/components/ui/link-button";
import { speaking } from "@/content/copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: speaking.metaTitle,
  description: speaking.metaDescription,
};

export default function SpeakingPage() {
  const [lead, ...supporting] = speaking.paragraphs;

  return (
    <PublicLayout>
      <section
        className="speaking-hero section-cream section-screen relative w-full"
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
            <p className="speaking-subheadline mt-5 sm:mt-6">{lead}</p>
            {supporting.map((paragraph) => (
              <p key={paragraph} className="speaking-supporting mt-4">
                {paragraph}
              </p>
            ))}
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
        <PremiumSectionDivider />
      </section>

      <section
        className="speaking-themes relative w-full"
        aria-labelledby="speaking-themes-heading"
      >
        <div className="speaking-themes-inner">
          <ScrollReveal>
            <h2 id="speaking-themes-heading" className="speaking-section-heading font-display">
              {speaking.themesTitle}
            </h2>
          </ScrollReveal>
          <ScrollReveal delayMs={80}>
            <ol className="speaking-themes-list">
              {speaking.themes.map((theme, i) => (
                <li key={theme.title} className="speaking-theme">
                  <span className="speaking-theme-index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="speaking-theme-text">
                    <h3 className="speaking-theme-title font-display">{theme.title}</h3>
                    <p className="speaking-theme-body">{theme.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
        <PremiumSectionDivider />
      </section>

      <section
        className="speaking-invite-band w-full"
        aria-labelledby="speaking-invite-heading"
      >
        <ScrollReveal className="speaking-invite-inner">
          <h2 id="speaking-invite-heading" className="speaking-section-heading font-display">
            {speaking.invite.title}
          </h2>
          <p className="speaking-invite-body">{speaking.invite.body}</p>
          <LinkButton href={speaking.invite.href} className="btn-cta-primary speaking-invite-cta">
            {speaking.invite.cta}
          </LinkButton>
        </ScrollReveal>
      </section>
    </PublicLayout>
  );
}
