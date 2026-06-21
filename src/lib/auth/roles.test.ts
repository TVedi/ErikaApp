import { describe, it, expect } from "vitest";
import {
  isCoachRole,
  isAthleteRole,
  formatTierLabel,
  getDashboardPath,
} from "@/lib/auth/roles";

describe("role helpers", () => {
  it("identifies coach role", () => {
    expect(isCoachRole("coach")).toBe(true);
    expect(isCoachRole("athlete")).toBe(false);
  });

  it("identifies athlete role", () => {
    expect(isAthleteRole("athlete")).toBe(true);
    expect(isAthleteRole("coach")).toBe(false);
  });

  it("formats tier labels", () => {
    expect(formatTierLabel("starter")).toBe("Starter");
    expect(formatTierLabel("technique_review")).toBe("Technique Review");
    expect(formatTierLabel("elite_coaching")).toBe("Elite Coaching");
  });

  it("returns dashboard path for all roles in Phase 1", () => {
    expect(getDashboardPath("athlete")).toBe("/dashboard");
    expect(getDashboardPath("coach")).toBe("/dashboard");
  });
});
