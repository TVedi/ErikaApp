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
    <section className="section-cream w-full" aria-labelledby="who-its-for-heading">
      <div className="lg:grid lg:grid-cols-2 lg:min-h-[min(720px,88vh)]">
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
          {/* Mobile: feather photo bottom into emerald below */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[var(--brand-base)] lg:hidden"
            aria-hidden="true"
          />
          {/* Desktop: feather photo left edge into emerald column */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-[min(28%,120px)] bg-gradient-to-r from-[var(--brand-base)] to-transparent lg:block"
            aria-hidden="true"
          />
        </div>

        {/* Content — below photo on mobile, left on desktop */}
        <div
          className="order-2 flex flex-col justify-center px-4 py-10 sm:px-6 sm:py-12 lg:order-1 lg:px-8 lg:py-14 xl:px-10"
        >
          <ScrollReveal>
            <h2
              id="who-its-for-heading"
              className="text-2xl font-bold text-foreground sm:text-3xl"
            >
              {launch.whoItsFor.title}
            </h2>
          </ScrollReveal>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-8">
            {launch.whoItsFor.audiences.map((item, i) => (
              <ScrollReveal key={item} delayMs={i * 70}>
                <div
                  className="h-full rounded-xl border border-accent-turquoise/20 border-l-[3px] border-l-accent-turquoise bg-[color-mix(in_srgb,var(--accent-turquoise)_10%,var(--brand-base))] p-4 shadow-sm"
                >
                  <p className="text-sm font-medium leading-snug text-foreground sm:text-base">
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
