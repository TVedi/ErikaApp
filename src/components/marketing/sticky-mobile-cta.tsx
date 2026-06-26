import Link from "next/link";
import { StartCoachingButton } from "@/components/marketing/start-coaching-button";
import { cta } from "@/content/copy";

export function StickyMobileCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/80 bg-background/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <StartCoachingButton size="sm" className="flex-1 btn-cta-primary" />
        <Link
          href="/apply"
          className="inline-flex flex-1 items-center justify-center rounded-lg border border-foreground/25 px-3 text-sm font-medium text-foreground hover:bg-foreground/10"
        >
          {cta.requestEvaluation}
        </Link>
      </div>
    </div>
  );
}
