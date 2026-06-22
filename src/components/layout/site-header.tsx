import Link from "next/link";
import { brand, nav } from "@/content/copy";
import { LinkButton } from "@/components/ui/link-button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex flex-col gap-0.5">
          <span className="brand-label">{brand.tagline}</span>
          <span className="font-brand text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
            {brand.name}
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-500 md:flex">
          <Link href="/about" className="transition-colors hover:text-violet-700">
            {nav.about}
          </Link>
          <Link href="/pricing" className="transition-colors hover:text-violet-700">
            {nav.pricing}
          </Link>
          <Link href="/camps" className="transition-colors hover:text-violet-700">
            {nav.camps}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <LinkButton variant="ghost" size="sm" href="/login" className="text-gray-600">
            {nav.login}
          </LinkButton>
          <LinkButton size="sm" href="/signup" gradient>
            {nav.signup}
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
