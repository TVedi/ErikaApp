import { PublicLayout } from "@/components/layout/public-layout";
import { TermlyEmbed } from "@/components/legal/termly-embed";
import { legal } from "@/content/copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: legal.privacy.title,
};

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="sr-only">{legal.privacy.title}</h1>
        <TermlyEmbed policyId="888b889d-50c2-4cd9-96d1-9adfe8c2b2b2" />
      </div>
    </PublicLayout>
  );
}
