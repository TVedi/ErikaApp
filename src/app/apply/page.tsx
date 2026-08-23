import Image from "next/image";
import { PublicLayout } from "@/components/layout/public-layout";
import { ApplyForm } from "@/components/apply/apply-form";
import { apply, nav } from "@/content/copy";
import { sitePhotos } from "@/lib/marketing/site-photos";
import type { Metadata } from "next";

const photo = sitePhotos.aboutPortrait;

export const metadata: Metadata = {
  title: "Apply",
  description: "Request an evaluation for Elite Paddle Coaching with Erika Medveczky.",
};

export default function ApplyPage() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

  return (
    <PublicLayout>
      <section className="apply-page" aria-labelledby="apply-heading">
        <div className="apply-split">
          <div className="apply-content">
            <p className="apply-eyebrow">{nav.apply}</p>
            <h1 id="apply-heading" className="apply-heading">
              {apply.title}
            </h1>
            <p className="apply-intro">{apply.subtitle}</p>
            <div className="premium-card apply-form-card">
              <ApplyForm turnstileSiteKey={turnstileSiteKey || undefined} />
            </div>
          </div>

          <div className="apply-photo-col">
            <div className="split-photo-mask apply-photo-mask">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="50vw"
                className="object-cover apply-photo"
                style={{ objectPosition: photo.objectPosition }}
              />
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
