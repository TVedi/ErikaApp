import Link from "next/link";
import { brand, cta, nav } from "@/content/copy";
import { LinkButton } from "@/components/ui/link-button";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";

export function SiteHeader() {
  return (
    <header className="site-header-premium sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="shrink-0">
          <span className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
            {brand.name}
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
          <Link href="/" className="transition-colors hover:text-accent-turquoise">
            {nav.home}
          </Link>
          <Link href="/about" className="transition-colors hover:text-accent-turquoise">
            {nav.about}
          </Link>
          <Link href="/pricing" className="transition-colors hover:text-accent-turquoise">
            {nav.programs}
          </Link>
          <Link href="/camps" className="transition-colors hover:text-accent-turquoise">
            {nav.camps}
          </Link>
          <Link href="/apply" className="transition-colors hover:text-accent-turquoise">
            {nav.apply}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <LinkButton
            variant="ghost"
            size="sm"
            href="/apply"
            className="hidden text-foreground sm:inline-flex"
          >
            {cta.requestEvaluation}
          </LinkButton>
          <StartCoachingButton size="sm" />
        </div>
      </div>
    </header>
  );
}
