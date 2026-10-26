import Image from "next/image";
import { PublicLayout } from "@/components/layout/public-layout";
import { SpeakingInviteForm } from "@/components/speaking/speaking-invite-form";
import { speakingInvite } from "@/content/copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: speakingInvite.metaTitle,
  description: speakingInvite.metaDescription,
};

/**
 * Speaking inquiry page. Same layout and styling as /apply (apply-* classes),
 * with the speaking portrait in the photo column.
 */
export default function SpeakingInvitePage() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

  return (
    <PublicLayout>
      <section className="apply-page speaking-invite-page" aria-labelledby="speaking-invite-page-heading">
        <div className="apply-split">
          <div className="apply-content">
            <p className="apply-eyebrow">{speakingInvite.eyebrow}</p>
            <h1 id="speaking-invite-page-heading" className="apply-heading">
              <span className="speaking-invite-title-line">{speakingInvite.titleLine1}</span>{" "}
              <span className="speaking-invite-title-line">{speakingInvite.titleLine2}</span>
            </h1>
            <p className="apply-intro">{speakingInvite.intro}</p>
            <div className="premium-card apply-form-card">
              <SpeakingInviteForm turnstileSiteKey={turnstileSiteKey || undefined} />
            </div>
          </div>

          <div className="apply-photo-col">
            <div className="split-photo-mask apply-photo-mask">
              <Image
                src="/images/erika-speaking.jpg"
                alt={speakingInvite.imageAlt}
                fill
                sizes="50vw"
                className="object-cover apply-photo"
                style={{ objectPosition: "50% 40%" }}
              />
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
