"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { Check } from "lucide-react";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { MarketingCtaReveal } from "@/components/motion/marketing-cta-reveal";
import { PremiumSectionDivider } from "@/components/marketing/premium-section-divider";
import { launch } from "@/content/copy";
import { sitePhotos } from "@/lib/marketing/site-photos";

const photo = sitePhotos.videoAnalysis1Kep;

function VideoAnalysisCheckRow({ text }: { text: string }) {
  return (
    <div className="video-analysis-check-row">
      <span className="video-analysis-check-icon" aria-hidden="true">
        <Check strokeWidth={1.25} />
      </span>
      <p className="video-analysis-check-text">{text}</p>
    </div>
  );
}

/**
 * Split-screen video analysis — replays slide-in on each viewport entry.
 * scroll-snap-stop: always + IntersectionObserver replay are intentionally preserved.
 */
export function VideoAnalysisSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.classList.add("video-analysis-assembled");
      return;
    }

    const resetEntrance = () => {
      section.classList.remove("video-analysis-assembled");
    };

    const startEntrance = () => {
      section.classList.remove("video-analysis-assembled");
      void section.offsetHeight;
      requestAnimationFrame(() => {
        section.classList.add("video-analysis-assembled");
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startEntrance();
        } else {
          resetEntrance();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);

    const rect = section.getBoundingClientRect();
    const initiallyInView =
      rect.top < window.innerHeight * 0.88 && rect.bottom > 0;

    if (initiallyInView) {
      startEntrance();
    } else {
      resetEntrance();
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-video-analysis section-cream section-atmo-glow-alt section-screen section-screen-center w-full"
      aria-labelledby="video-analysis-heading"
    >
      <div className="split-screen-grid">
        {/* Photo — top on mobile, right on desktop */}
        <div className="video-analysis-slide-right split-screen-photo-col order-1 lg:order-2">
          <div className="split-photo-mask absolute inset-0">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 66vw"
              className="video-analysis-photo img-pos-mobile object-cover"
              style={{
                objectPosition: photo.objectPosition,
                ["--op-mobile" as string]:
                  photo.objectPositionMobile ?? photo.objectPosition,
              }}
            />
          </div>
          {/* Layer B — canvas-tone grade above photo, below content */}
          <div className="video-analysis-emerge-grade" aria-hidden="true" />
        </div>

        {/* Content — below photo on mobile, left on desktop */}
        <div className="split-screen-content-col relative order-2 lg:order-1">
          <div className="video-analysis-slide-left w-full">
            <p className="video-analysis-eyebrow">{launch.videoSection.eyebrow}</p>

            <h2
              id="video-analysis-heading"
              className="video-analysis-premium-heading font-display"
            >
              {launch.videoSection.title}
            </h2>

            <p className="video-analysis-body">{launch.videoSection.body}</p>

            <div className="video-analysis-check-list">
              {launch.videoSection.points.map((text) => (
                <VideoAnalysisCheckRow key={text} text={text} />
              ))}
            </div>

            <MarketingCtaReveal className="video-analysis-cta flex justify-start">
              <StartCoachingButton
                size="lg"
                className="btn-cta-gold-outline w-full sm:w-auto"
              />
            </MarketingCtaReveal>
          </div>
        </div>
      </div>
      <PremiumSectionDivider />
    </section>
  );
}
