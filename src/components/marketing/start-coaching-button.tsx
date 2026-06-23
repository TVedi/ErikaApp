import { LinkButton } from "@/components/ui/link-button";
import {
  getStartCoachingHref,
  isExternalCheckout,
} from "@/lib/marketing/cta";
import { cta } from "@/content/copy";

export function StartCoachingButton({
  size = "default",
  className,
}: {
  size?: "default" | "sm" | "lg";
  className?: string;
}) {
  const href = getStartCoachingHref();
  const external = isExternalCheckout();

  return (
    <LinkButton
      href={href}
      size={size}
      external={external}
      className={className ?? "bg-navy hover:bg-navy-light"}
    >
      {cta.startCoaching}
    </LinkButton>
  );
}
