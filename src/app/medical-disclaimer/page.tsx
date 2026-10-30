import { PublicLayout } from "@/components/layout/public-layout";
import { TermlyEmbed } from "@/components/legal/termly-embed";
import { legal } from "@/content/copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: legal.medical.title,
};

export default function MedicalDisclaimerPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="sr-only">{legal.medical.title}</h1>
        <TermlyEmbed policyId="9dc6d0e9-7fba-41c8-a4d9-d8c5b1d704f0" />
      </div>
    </PublicLayout>
  );
}
