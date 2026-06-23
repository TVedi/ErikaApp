import { describe, it, expect } from "vitest";
import { applyFormSchema } from "@/lib/validation/apply-form";

describe("applyFormSchema", () => {
  const validBase = {
    full_name: "Test Athlete",
    email: "athlete@example.com",
    location: "Georgia, USA",
    athlete_age: 16,
    guardian_email: "parent@example.com",
    athlete_level: "competitive_junior" as const,
    main_goal: "technique_improvement" as const,
    event_focus: "500m" as const,
    has_video: "yes" as const,
    interests: ["video_analysis"] as const,
    message: "Hello",
    medical_disclaimer_accepted: true as const,
    privacy_consent: true as const,
  };

  it("accepts valid application data", () => {
    const result = applyFormSchema.safeParse(validBase);
    expect(result.success).toBe(true);
  });

  it("rejects missing privacy consent", () => {
    const result = applyFormSchema.safeParse({
      ...validBase,
      privacy_consent: false,
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = applyFormSchema.safeParse({
      ...validBase,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });
});
