import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { launch } from "@/content/copy";
import { sitePhotos } from "@/lib/marketing/site-photos";

const photo = sitePhotos.howItWorks;

/**
 * Split-screen "How it works" — emerald left column + feathered photo right.
 */
export function HowItWorksSection() {
  return (
    <section
      className="section-navy-soft section-screen section-screen-center w-full"
      aria-labelledby="how-it-works-heading"
    >
      <div className="split-screen-grid">
        {/* Photo — top on mobile, right on desktop */}
        <div className="split-screen-photo-col order-1 lg:order-2">
          <div className="split-photo-mask absolute inset-0">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 38vw"
              className="object-cover"
              style={{ objectPosition: photo.objectPosition }}
            />
          </div>
        </div>

        {/* Content — below photo on mobile, left on desktop */}
        <div className="split-screen-content-col order-2 lg:order-1">
          <div className="-translate-y-8 sm:-translate-y-10">
            <ScrollReveal>
              <h2
                id="how-it-works-heading"
                className="text-2xl font-bold text-foreground sm:text-3xl"
              >
                {launch.howItWorks.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
                {launch.howItWorks.manualNote}
              </p>
            </ScrollReveal>
            <div className="mt-8 space-y-4 lg:mt-10">
              {launch.howItWorks.steps.map((step, i) => (
                <ScrollReveal key={step.title} delayMs={i * 90}>
                  <div className="program-card-glass rounded-xl p-4 sm:p-5">
                    <span className="text-xs font-bold uppercase tracking-wide text-water sm:text-sm">
                      Step {i + 1}
                    </span>
                    <h3 className="mt-2 font-semibold text-foreground text-base sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
