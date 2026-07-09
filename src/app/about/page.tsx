import { Fragment } from "react";
import Image from "next/image";
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

type StoryPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  narrow?: boolean;
};

/** Keyed by the index of the story paragraph the photo belongs to (rendered after it). */
const storyPhotos: Record<number, StoryPhoto> = {
  2: {
    src: "/FB_IMG_1585573281651.jpg",
    width: 1079,
    height: 720,
    alt: "Erika Medveczky racing her sprint kayak in lane 5, MEDVECZKY marked on the boat",
    caption: "Mid-race in lane 5",
  },
  4: {
    src: "/Erika bajnok.jpg",
    width: 760,
    height: 506,
    alt: "Erika Medveczky celebrating her first world championship title moments after the finish",
    caption: "Duisburg, 2013 — the first world title",
    narrow: true,
  },
  5: {
    src: "/2017.1.jpg",
    width: 1300,
    height: 867,
    alt: "Erika Medveczky in the red Hungarian jersey, fully focused mid-stroke during a race",
    caption: "2017 — the selection race that became a turning point",
  },
  6: {
    src: "/Erika Rami.jpg",
    width: 900,
    height: 599,
    alt: "Erika Medveczky on the podium holding a gold medal alongside her teammate",
    caption: "Gold on the podium",
    narrow: true,
  },
};

function StoryFigure({ photo }: { photo: StoryPhoto }) {
  return (
    <figure className={photo.narrow ? "about-story-figure about-story-figure--narrow" : "about-story-figure"}>
      <Image
        src={photo.src}
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        loading="lazy"
        sizes={photo.narrow ? "(max-width: 640px) 100vw, 560px" : "(max-width: 767px) 100vw, 680px"}
        className="about-story-photo"
      />
      {photo.caption ? (
        <figcaption className="about-story-figcaption">{photo.caption}</figcaption>
      ) : null}
    </figure>
  );
}

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
            {aboutStory.paragraphs.map((paragraph, index) => (
              <Fragment key={paragraph}>
                <p>{paragraph}</p>
                {storyPhotos[index] ? <StoryFigure photo={storyPhotos[index]} /> : null}
              </Fragment>
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
