/**
 * Launch CTA helpers — Stripe Payment Link (public URL only, no SDK).
 * NEXT_PUBLIC_* values are baked at build time in Next.js; redeploy after changes.
 */

export function getStripeStarterPaymentLink(): string | null {
  const link = process.env.NEXT_PUBLIC_STRIPE_STARTER_PAYMENT_LINK?.trim();
  return link && link.startsWith("https://") ? link : null;
}

export function getStarterPriceLabel(): string {
  const custom = process.env.NEXT_PUBLIC_STARTER_PRICE_LABEL?.trim();
  if (custom) return custom;
  if (getStripeStarterPaymentLink()) {
    return "See secure checkout for current price";
  }
  return "Secure checkout link coming soon";
}

export function getStartCoachingHref(): string {
  return getStripeStarterPaymentLink() ?? "/apply";
}

export function isExternalCheckout(): boolean {
  return getStripeStarterPaymentLink() !== null;
}
