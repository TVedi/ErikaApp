import Link from "next/link";
import { brand, footer } from "@/content/copy";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <p className="text-lg font-semibold text-navy">{brand.name}</p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {brand.positioning}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/terms" className="text-muted-foreground hover:text-navy">
              {footer.terms}
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-navy">
              {footer.privacy}
            </Link>
            <Link href="/refund-policy" className="text-muted-foreground hover:text-navy">
              {footer.refund}
            </Link>
            <Link href="/medical-disclaimer" className="text-muted-foreground hover:text-navy">
              {footer.medical}
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
