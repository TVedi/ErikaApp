const TIER_LABELS: Record<string, string> = {
  starter: "Starter",
  technique_review: "Technique Review",
  elite_coaching: "Elite Coaching",
};

export function formatTierLabel(tier: string): string {
  return TIER_LABELS[tier] ?? tier;
}
