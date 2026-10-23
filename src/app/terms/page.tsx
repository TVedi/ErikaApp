import { PublicLayout } from "@/components/layout/public-layout";
import { TermlyEmbed } from "@/components/legal/termly-embed";
import { legal } from "@/content/copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: legal.terms.title,
};

export default function TermsPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="sr-only">{legal.terms.title}</h1>
        <TermlyEmbed policyId="9934faf9-1661-4dce-8d67-b650c743f8d0" />
      </div>
    </PublicLayout>
  );
}
