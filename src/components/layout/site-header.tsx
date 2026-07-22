import Link from "next/link";
import { nav } from "@/content/copy";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { BrandMark } from "@/components/layout/brand-mark";

export function SiteHeader() {
  return (
    <header className="site-header-premium sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="site-brand-lockup shrink-0">
          <BrandMark className="site-brand-mark" aria-hidden="true" />
          <span className="brand-gold-flow font-display text-base font-semibold tracking-tight sm:text-lg">
            Erika Medveczky OLY
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
          <Link href="/" className="text-link-coral">
            {nav.home}
          </Link>
          <Link href="/about" className="text-link-coral">
            {nav.about}
          </Link>
          <Link href="/pricing" className="text-link-coral">
            {nav.programs}
          </Link>
          <Link href="/camps" className="text-link-coral">
            {nav.camps}
          </Link>
          <Link href="/speaking" className="text-link-coral">
            {nav.speaking}
          </Link>
        </nav>
        <div className="flex shrink-0 items-center">
          <StartCoachingButton size="sm" />
        </div>
      </div>
    </header>
  );
}
