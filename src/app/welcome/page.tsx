import { PublicLayout } from "@/components/layout/public-layout";
import { LinkButton } from "@/components/ui/link-button";
import { welcome } from "@/content/copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome",
  description: "Post-checkout next steps for Elite Paddle Coaching Starter Guidance.",
};

export default function WelcomePage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <h1 className="text-3xl font-bold text-navy">{welcome.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{welcome.body}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Your app dashboard is not automatically unlocked at launch — Erika will onboard you
          personally.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <LinkButton href="/about" className="bg-navy hover:bg-navy-light">
            About Erika
          </LinkButton>
          <LinkButton href="/camps" variant="outline" className="border-navy text-navy">
            View Camps
          </LinkButton>
          <LinkButton href="/" variant="outline" className="border-navy text-navy">
            Back to homepage
          </LinkButton>
        </div>
      </div>
    </PublicLayout>
  );
}
