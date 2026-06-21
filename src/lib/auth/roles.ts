import type { UserRole } from "@/types/database";

export function isCoachRole(role: string): boolean {
  return role === "coach";
}

export function isAthleteRole(role: string): boolean {
  return role === "athlete";
}

export function getDashboardPath(_role: UserRole): string {
  // Coach/admin area comes in later phases; all roles use /dashboard in Phase 1
  return "/dashboard";
}

export const TIER_LABELS: Record<string, string> = {
  starter: "Starter",
  technique_review: "Technique Review",
  elite_coaching: "Elite Coaching",
};

export function formatTierLabel(tier: string): string {
  return TIER_LABELS[tier] ?? tier;
}
