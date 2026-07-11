"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { MarketingCtaReveal } from "@/components/motion/marketing-cta-reveal";
import { launch } from "@/content/copy";
import { sitePhotos } from "@/lib/marketing/site-photos";

const photo = sitePhotos.videoAnalysis1Kep;

function VideoAnalysisRow({ text, index }: { text: string; index: number }) {
  const indexLabel = String(index + 1).padStart(2, "0");
  return (
    <div className="audience-editorial-row">
      <span className="audience-editorial-index" aria-hidden="true">
        {indexLabel}
      </span>
      <p className="audience-editorial-text">{text}</p>
    </div>
  );
}

/**
 * Split-screen video analysis — replays slide-in on each viewport entry.
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
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="img-pos-mobile object-cover"
              style={{
                objectPosition: photo.objectPosition,
                ["--op-mobile" as string]:
                  photo.objectPositionMobile ?? photo.objectPosition,
              }}
            />
          </div>
        </div>

        {/* Content — below photo on mobile, left on desktop */}
        <div className="split-screen-content-col order-2 lg:order-1">
          <div className="video-analysis-slide-left w-full max-w-xl">
            <h2
              id="video-analysis-heading"
              className="text-2xl font-bold text-foreground sm:text-3xl"
            >
              {launch.videoSection.title}
            </h2>
            <div className="audience-editorial-list video-analysis-editorial-list">
              {launch.videoSection.points.map((text, i) => (
                <VideoAnalysisRow key={text} text={text} index={i} />
              ))}
            </div>
            <MarketingCtaReveal className="mt-6 flex justify-center sm:mt-7">
              <StartCoachingButton
                size="lg"
                className="btn-cta-primary w-full sm:w-auto"
              />
            </MarketingCtaReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
