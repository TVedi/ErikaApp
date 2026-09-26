import { describe, it, expect } from "vitest";
import { applyFormSchema } from "@/lib/validation/apply-form";

/**
 * A complete adult application with every conditional answered "no", so the
 * conditional branches are off. Individual cases switch one thing at a time.
 */
const adult = {
  full_name: "Test Athlete",
  email: "Athlete@Example.com",
  location: "Georgia, USA",
  athlete_age: 24,
  athlete_level: "senior" as const,
  service_interest: "performance_coaching" as const,
  event_focus: "500m" as const,
  best_500m: "1:52",
  best_2000m: "8:40",
  times_context: "National championship, June 2025",
  recent_result: "3rd, national final",
  years_paddling: "9",
  sessions_per_week: "6",
  hours_per_week: "10",
  structured_plan: "yes" as const,
  has_coach: "no" as const,
  water_access: "yes" as const,
  gym_access: "yes" as const,
  uses_device: "no" as const,
  shares_data: "yes" as const,
  improvement_goal: "Start speed and the first twenty strokes.",
  has_target_race: "no" as const,
  current_challenge: "Inconsistent catch under fatigue.",
  committed_sessions: "6",
  willing_feedback: "yes" as const,
  why_interested: "I want technical guidance from an Olympian.",
  medical_disclaimer_accepted: true as const,
  privacy_consent: true as const,
};

describe("applyFormSchema", () => {
  it("accepts a complete adult application", () => {
    expect(applyFormSchema.safeParse(adult).success).toBe(true);
  });

  it("lowercases the email", () => {
    const result = applyFormSchema.safeParse(adult);
    expect(result.success && result.data.email).toBe("athlete@example.com");
  });

  it("rejects an invalid email", () => {
    expect(
      applyFormSchema.safeParse({ ...adult, email: "not-an-email" }).success
    ).toBe(false);
  });

  it("rejects a missing privacy consent", () => {
    expect(
      applyFormSchema.safeParse({ ...adult, privacy_consent: false }).success
    ).toBe(false);
  });

  it("rejects a missing medical disclaimer", () => {
    expect(
      applyFormSchema.safeParse({
        ...adult,
        medical_disclaimer_accepted: false,
      }).success
    ).toBe(false);
  });

  it("rejects an unknown athlete level", () => {
    expect(
      applyFormSchema.safeParse({ ...adult, athlete_level: "competitive_junior" })
        .success
    ).toBe(false);
  });

  it("requires a guardian name and email under 18", () => {
    const minor = { ...adult, athlete_age: 15 };
    expect(applyFormSchema.safeParse(minor).success).toBe(false);

    const withGuardian = {
      ...minor,
      guardian_name: "Test Parent",
      guardian_email: "parent@example.com",
    };
    expect(applyFormSchema.safeParse(withGuardian).success).toBe(true);
  });

  it("requires the support answer when the athlete has a coach", () => {
    const withCoach = { ...adult, has_coach: "yes" as const };
    expect(applyFormSchema.safeParse(withCoach).success).toBe(false);

    expect(
      applyFormSchema.safeParse({
        ...withCoach,
        additional_support: "Technical feedback alongside my club coach.",
      }).success
    ).toBe(true);
  });

  it("requires the platform when a device is used", () => {
    const withDevice = { ...adult, uses_device: "yes" as const };
    expect(applyFormSchema.safeParse(withDevice).success).toBe(false);

    expect(
      applyFormSchema.safeParse({ ...withDevice, device_platform: "garmin" })
        .success
    ).toBe(true);
  });

  it("requires the race details when a race is named", () => {
    const withRace = { ...adult, has_target_race: "yes" as const };
    expect(applyFormSchema.safeParse(withRace).success).toBe(false);

    expect(
      applyFormSchema.safeParse({
        ...withRace,
        target_race: "World Championships, August 2026",
      }).success
    ).toBe(true);
  });

  it("accepts an application without the optional fields", () => {
    const result = applyFormSchema.safeParse(adult);
    expect(result.success).toBe(true);
  });
});
