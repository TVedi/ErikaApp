import { PublicLayout } from "@/components/layout/public-layout";
import { BrandMark } from "@/components/layout/brand-mark";
import { MarketingPhoto } from "@/components/marketing/marketing-photo";
import { AboutMedalStack } from "@/components/marketing/about-medal-stack";
import { AboutScrollCue } from "@/components/marketing/about-scroll-cue";
import { sitePhotos } from "@/lib/marketing/site-photos";
import { aboutStory } from "@/content/copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Erika",
  description:
    "Erika Medveczky — coach, entrepreneur, former elite athlete and Olympian. Her personal story from kayaking to coaching in Gainesville, Georgia.",
};

export default function AboutPage() {
  return (
    <PublicLayout>
      <article className="about-story-page section-cream">
        <div className="about-story-inner">
          <header className="about-story-opening" id="about-story-opening">
            <h1 className="about-brand-lockup">
              <BrandMark className="about-brand-mark" aria-hidden="true" />
              <span className="brand-gold-flow about-brand-wordmark">
                Erika Medveczky OLY
              </span>
            </h1>

            <div className="about-opening-stage">
              <div className="about-opening-visuals">
                <div className="about-story-portrait">
                  <MarketingPhoto
                    photo={sitePhotos.aboutPortrait}
                    variant="portrait"
                    sizes="(max-width: 640px) 85vw, 280px"
                  />
                </div>
                <AboutMedalStack />
              </div>

              <AboutScrollCue href="#about-story-body" />
            </div>
          </header>

          <div className="about-story-body" id="about-story-body">
            {aboutStory.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <hr className="about-story-divider" aria-hidden="true" />

            <p className="about-story-pullquote-lead">{aboutStory.pullQuoteLead}</p>
            <blockquote className="about-story-pullquote">{aboutStory.pullQuote}</blockquote>
            <p className="about-story-pullquote-follow">{aboutStory.pullQuoteFollow}</p>
          </div>
        </div>
      </article>
    </PublicLayout>
  );
}
