import { cn } from "@/lib/utils";

type PhotoPlaceholderProps = {
  label: string;
  variant?: "hero" | "portrait" | "wide" | "card";
  className?: string;
  /** Applies reusable dark overlay for readable text when a real photo is added */
  withDarkOverlay?: boolean;
};

/**
 * Elegant placeholder for professional photography.
 * TODO: Replace with final Erika action/portrait/camp photos before production launch.
 */
export function PhotoPlaceholder({
  label,
  variant = "card",
  className,
  withDarkOverlay = false,
}: PhotoPlaceholderProps) {
  const heights = {
    hero: "min-h-[280px] sm:min-h-[360px]",
    portrait: "min-h-[320px]",
    wide: "min-h-[200px] sm:min-h-[240px]",
    card: "min-h-[180px]",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-black/10 via-water/[0.08] to-gold/[0.08]",
        heights[variant],
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.55_0.12_220/0.12),transparent_55%)]" />
      {withDarkOverlay && (
        <div className="photo-dark-overlay absolute inset-0" aria-hidden="true" />
      )}
      <div className="relative flex h-full items-center justify-center p-6">
        <p
          className={cn(
            "max-w-xs text-center text-sm",
            withDarkOverlay ? "text-[var(--hero-subhead)]" : "text-muted-foreground"
          )}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
