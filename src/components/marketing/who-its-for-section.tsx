import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { launch } from "@/content/copy";
import { sitePhotos } from "@/lib/marketing/site-photos";

const photo = sitePhotos.whoItsFor;

/**
 * Split-screen "Who this is for" — emerald left column + feathered photo right.
 */
export function WhoItsForSection() {
  return (
    <section
      className="section-cream w-full min-h-[min(52vh,560px)] lg:min-h-[82vh]"
      aria-labelledby="who-its-for-heading"
    >
      <div className="split-screen-grid min-h-full lg:min-h-[82vh]">
        {/* Photo — top on mobile, right on desktop */}
        <div className="split-screen-photo-col order-1 min-h-[min(48vh,400px)] lg:order-2 lg:min-h-full lg:h-full">
          <div className="split-photo-mask absolute inset-0">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              style={{ objectPosition: photo.objectPosition }}
            />
          </div>
        </div>

        {/* Content — below photo on mobile, left on desktop */}
        <div className="split-screen-content-col order-2 lg:order-1">
          <ScrollReveal>
            <h2
              id="who-its-for-heading"
              className="text-2xl font-bold text-foreground sm:text-3xl"
            >
              {launch.whoItsFor.title}
            </h2>
          </ScrollReveal>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-10">
            {launch.whoItsFor.audiences.map((item, i) => (
              <ScrollReveal key={item} delayMs={i * 70}>
                <div
                  className="who-its-for-card h-full rounded-xl border border-accent-turquoise/20 border-l-[3px] border-l-accent-turquoise bg-[color-mix(in_srgb,var(--accent-turquoise)_10%,var(--brand-base))] p-4 shadow-sm"
                >
                  <p className="font-display text-base font-medium leading-snug text-foreground sm:text-[1.05rem]">
                    {item}
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
