import Link from "next/link";
import { brand, nav } from "@/content/copy";
import { LinkButton } from "@/components/ui/link-button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-navy">
            {brand.name}
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <Link href="/about" className="hover:text-navy transition-colors">
            {nav.about}
          </Link>
          <Link href="/pricing" className="hover:text-navy transition-colors">
            {nav.pricing}
          </Link>
          <Link href="/camps" className="hover:text-navy transition-colors">
            {nav.camps}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <LinkButton variant="ghost" size="sm" href="/login">
            {nav.login}
          </LinkButton>
          <LinkButton size="sm" href="/signup" className="bg-navy hover:bg-navy-light">
            {nav.signup}
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
