import { PublicLayout } from "@/components/layout/public-layout";
import { MarketingPhoto } from "@/components/marketing/marketing-photo";
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
          <header className="about-story-header">
            <h1 className="about-story-title">{aboutStory.title}</h1>
            <p className="about-story-lede">{aboutStory.lede}</p>
          </header>

          <div className="about-story-portrait">
            <MarketingPhoto
              photo={sitePhotos.aboutPortrait}
              variant="portrait"
              sizes="(max-width: 640px) 85vw, 280px"
            />
          </div>

          <div className="about-story-body">
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
