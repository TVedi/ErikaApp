import { PublicLayout } from "@/components/layout/public-layout";
import { ApplyForm } from "@/components/apply/apply-form";
import { apply } from "@/content/copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply",
  description: "Request an evaluation for Elite Paddle Coaching with Erika Medveczky.",
};

export default function ApplyPage() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

  return (
    <PublicLayout>
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold text-navy sm:text-4xl">{apply.title}</h1>
        <p className="mt-3 text-muted-foreground">{apply.subtitle}</p>
        <div className="mt-10 rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8">
          <ApplyForm turnstileSiteKey={turnstileSiteKey || undefined} />
        </div>
      </div>
    </PublicLayout>
  );
}
