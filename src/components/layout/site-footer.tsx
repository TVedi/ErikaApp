import Link from "next/link";
import { brand, footer } from "@/content/copy";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <p className="brand-label">{brand.tagline}</p>
            <p className="mt-1 font-brand text-lg font-semibold text-gray-900">{brand.name}</p>
            <p className="mt-2 max-w-sm text-sm text-gray-500">{brand.positioning}</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/terms" className="text-gray-500 transition-colors hover:text-violet-700">
              {footer.terms}
            </Link>
            <Link href="/privacy" className="text-gray-500 transition-colors hover:text-violet-700">
              {footer.privacy}
            </Link>
            <Link href="/refund-policy" className="text-gray-500 transition-colors hover:text-violet-700">
              {footer.refund}
            </Link>
            <Link href="/medical-disclaimer" className="text-gray-500 transition-colors hover:text-violet-700">
              {footer.medical}
            </Link>
          </div>
        </div>
        <Separator className="my-8 bg-gray-100" />
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
