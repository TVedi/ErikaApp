import type { CoachCredential } from "@/types/database";
import { hero } from "@/content/copy";

export function CredibilityStrip({
  featuredCredentials,
  variant = "hero",
}: {
  featuredCredentials: CoachCredential[];
  variant?: "hero" | "default";
}) {
  const pillClass =
    variant === "hero"
      ? "rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white/90"
      : "rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-navy";

  return (
    <div className="flex flex-wrap gap-2">
      {featuredCredentials.map((cred) => (
        <span key={cred.id} className={pillClass}>
          {cred.label}
        </span>
      ))}
      <span className={pillClass}>{hero.locationLabel}</span>
    </div>
  );
}
