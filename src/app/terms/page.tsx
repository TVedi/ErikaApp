import { PublicLayout } from "@/components/layout/public-layout";
import { legal } from "@/content/copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: legal.terms.title,
};

export default function TermsPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="section-title">{legal.terms.title}</h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">{legal.terms.body}</p>
      </div>
    </PublicLayout>
  );
}
