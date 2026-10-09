import { describe, expect, it } from "vitest";
import { waitlistFormSchema } from "@/lib/validation/waitlist-form";

const adult = {
  athlete_age: "24",
  full_name: "Test Athlete",
  email: "Athlete@Example.com",
  privacy_consent: true as const,
};

const minor = {
  ...adult,
  athlete_age: "15",
  guardian_name: "Test Parent",
  guardian_email: "parent@example.com",
};

describe("waitlistFormSchema", () => {
  it("accepts an adult", () => {
    expect(waitlistFormSchema.safeParse(adult).success).toBe(true);
  });

  it("lowercases the email", () => {
    const result = waitlistFormSchema.safeParse(adult);
    expect(result.success && result.data.email).toBe("athlete@example.com");
  });

  it("rejects an athlete under 13", () => {
    expect(waitlistFormSchema.safeParse({ ...minor, athlete_age: "12" }).success).toBe(false);
  });

  it("accepts an athlete aged 13 to 17 with a parent or guardian", () => {
    expect(waitlistFormSchema.safeParse(minor).success).toBe(true);
    expect(waitlistFormSchema.safeParse({ ...minor, athlete_age: "13" }).success).toBe(true);
  });

  it("rejects an athlete under 18 without a parent or guardian", () => {
    expect(
      waitlistFormSchema.safeParse({ ...minor, guardian_name: "", guardian_email: "" }).success
    ).toBe(false);
  });

  it("rejects a guardian email that matches the athlete's, ignoring case", () => {
    expect(
      waitlistFormSchema.safeParse({ ...minor, guardian_email: "ATHLETE@example.com" }).success
    ).toBe(false);
  });

  it("rejects a sign-up without privacy consent", () => {
    expect(waitlistFormSchema.safeParse({ ...adult, privacy_consent: false }).success).toBe(false);
  });

  it("rejects a missing name", () => {
    expect(waitlistFormSchema.safeParse({ ...adult, full_name: " " }).success).toBe(false);
  });
});
