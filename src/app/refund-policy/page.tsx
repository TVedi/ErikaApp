import { PublicLayout } from "@/components/layout/public-layout";
import { LegalDocument } from "@/components/legal/legal-document";
import { legal } from "@/content/copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: legal.refund.title,
};

export default function RefundPolicyPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <LegalDocument {...legal.refund} selfHref="/refund-policy" />
      </div>
    </PublicLayout>
  );
}
