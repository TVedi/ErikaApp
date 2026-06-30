import Link from "next/link";
import { brand, footer } from "@/content/copy";
import { Separator } from "@/components/ui/separator";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <p className="text-lg font-semibold text-foreground">{brand.name}</p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {brand.positioning}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <StartCoachingButton size="sm" />
              <Link
                href="/apply"
                className="inline-flex h-8 items-center rounded-lg border border-foreground/25 px-3 text-sm font-medium text-foreground hover:bg-foreground/10"
              >
                {footer.apply}
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/camps" className="text-link-coral text-muted-foreground">
              {footer.camps}
            </Link>
            <Link href="/medical-disclaimer" className="text-link-coral text-muted-foreground">
              {footer.medical}
            </Link>
            <Link href="/privacy" className="text-link-coral text-muted-foreground">
              {footer.privacy}
            </Link>
            <Link href="/terms" className="text-link-coral text-muted-foreground">
              {footer.terms}
            </Link>
            <Link href="/refund-policy" className="text-link-coral text-muted-foreground">
              {footer.refund}
            </Link>
          </div>
        </div>
        <Separator className="my-8" />
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
