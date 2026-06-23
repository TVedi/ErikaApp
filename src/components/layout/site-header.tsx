import Link from "next/link";
import { brand, cta, nav } from "@/content/copy";
import { LinkButton } from "@/components/ui/link-button";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="shrink-0">
          <span className="text-base font-semibold tracking-tight text-navy sm:text-lg">
            {brand.name}
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
          <Link href="/" className="hover:text-navy transition-colors">
            {nav.home}
          </Link>
          <Link href="/about" className="hover:text-navy transition-colors">
            {nav.about}
          </Link>
          <Link href="/pricing" className="hover:text-navy transition-colors">
            {nav.programs}
          </Link>
          <Link href="/camps" className="hover:text-navy transition-colors">
            {nav.camps}
          </Link>
          <Link href="/apply" className="hover:text-navy transition-colors">
            {nav.apply}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <LinkButton
            variant="ghost"
            size="sm"
            href="/apply"
            className="hidden text-navy sm:inline-flex"
          >
            {cta.requestEvaluation}
          </LinkButton>
          <StartCoachingButton size="sm" className="bg-navy hover:bg-navy-light" />
        </div>
      </div>
    </header>
  );
}
