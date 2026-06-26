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
      className="section-navy-soft w-full"
      aria-labelledby="how-it-works-heading"
    >
      <div className="lg:grid lg:grid-cols-2 lg:min-h-[min(840px,94vh)]">
        {/* Photo — top on mobile, right on desktop */}
        <div
          className="relative order-1 min-h-[min(48vh,400px)] w-full lg:order-2 lg:min-h-full"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            style={{ objectPosition: photo.objectPosition }}
          />
          <div className="split-photo-feather-mobile lg:hidden" aria-hidden="true" />
          <div className="split-photo-feather-desktop hidden lg:block" aria-hidden="true" />
        </div>

        {/* Content — below photo on mobile, left on desktop */}
        <div
          className="order-2 flex flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 lg:order-1 lg:px-8 lg:py-20 xl:px-10 xl:py-24"
        >
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
                <div className="rounded-xl border border-border/60 bg-card p-4 shadow-sm sm:p-5">
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
    </section>
  );
}
