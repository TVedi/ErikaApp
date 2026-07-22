import { LinkButton } from "@/components/ui/link-button";
import {
  getStartCoachingHref,
  isExternalCheckout,
} from "@/lib/marketing/cta";
import { cta } from "@/content/copy";

export function StartCoachingButton({
  size = "default",
  className,
  label = cta.startCoaching,
  variant = "default",
}: {
  size?: "default" | "sm" | "lg";
  className?: string;
  /** Visible label from copy.ts — href/routing unchanged. */
  label?: string;
  /** Pass "outline" for gold-outline CTAs (avoids coral default fill). */
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
}) {
  const href = getStartCoachingHref();
  const external = isExternalCheckout();

  return (
    <LinkButton
      href={href}
      size={size}
      variant={variant}
      external={external}
      className={className ?? "btn-cta-primary"}
    >
      {label}
    </LinkButton>
  );
}
