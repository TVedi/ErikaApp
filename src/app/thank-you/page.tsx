import { PublicLayout } from "@/components/layout/public-layout";
import { LinkButton } from "@/components/ui/link-button";
import { thankYou } from "@/content/copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank you",
};

export default function ThankYouPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <h1 className="text-3xl font-bold text-navy">{thankYou.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{thankYou.body}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <LinkButton href="/" className="bg-navy hover:bg-navy-light">
            Back to homepage
          </LinkButton>
          <LinkButton href="/about" variant="outline" className="border-navy text-navy">
            About Erika
          </LinkButton>
          <LinkButton href="/camps" variant="outline" className="border-navy text-navy">
            View Camps
          </LinkButton>
        </div>
      </div>
    </PublicLayout>
  );
}
