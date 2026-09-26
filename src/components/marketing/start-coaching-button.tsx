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
  service,
}: {
  size?: "default" | "sm" | "lg";
  className?: string;
  /** Visible label from copy.ts — href/routing unchanged. */
  label?: string;
  /** Pass "outline" for gold-outline CTAs (avoids coral default fill). */
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
  /** Preselects the tier on /apply; ignored when a Stripe checkout link is set. */
  service?: string;
}) {
  const baseHref = getStartCoachingHref();
  const href =
    service && baseHref === "/apply" ? `/apply?service=${service}` : baseHref;
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
