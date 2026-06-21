import { describe, it, expect } from "vitest";
import {
  calculateIsMinor,
  canAccessDashboard,
  validateMinorSignup,
  requiresGuardianFields,
} from "@/lib/auth/minor-consent";

describe("calculateIsMinor", () => {
  it("returns true for someone under 18", () => {
    const today = new Date();
    const dob = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
    expect(calculateIsMinor(dob)).toBe(true);
  });

  it("returns false for someone 18 or older", () => {
    const today = new Date();
    const dob = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
    expect(calculateIsMinor(dob)).toBe(false);
  });

  it("returns true for 17-year-old on birthday eve", () => {
    const today = new Date();
    const dob = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate() + 1);
    expect(calculateIsMinor(dob)).toBe(true);
  });
});

describe("validateMinorSignup", () => {
  const adultDob = "1990-01-15";
  const minorDob = "2015-06-01";

  it("allows adult signup without guardian fields", () => {
    const result = validateMinorSignup({ dateOfBirth: adultDob });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("requires guardian email for minors", () => {
    const result = validateMinorSignup({ dateOfBirth: minorDob });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Guardian email is required for athletes under 18.");
  });

  it("requires parental consent for minors", () => {
    const result = validateMinorSignup({
      dateOfBirth: minorDob,
      guardianEmail: "parent@example.com",
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Parental consent is required for athletes under 18.");
  });

  it("accepts minor signup with guardian email and consent", () => {
    const result = validateMinorSignup({
      dateOfBirth: minorDob,
      guardianEmail: "parent@example.com",
      parentalConsent: true,
    });
    expect(result.valid).toBe(true);
  });
});

describe("canAccessDashboard", () => {
  it("allows adults regardless of consent", () => {
    expect(canAccessDashboard({ is_minor: false, parental_consent: false })).toBe(true);
  });

  it("blocks minors without parental consent", () => {
    expect(canAccessDashboard({ is_minor: true, parental_consent: false })).toBe(false);
  });

  it("allows minors with parental consent", () => {
    expect(canAccessDashboard({ is_minor: true, parental_consent: true })).toBe(true);
  });
});

describe("requiresGuardianFields", () => {
  it("returns true for minors", () => {
    const today = new Date();
    const minorDob = new Date(today.getFullYear() - 12, 0, 1).toISOString().split("T")[0];
    expect(requiresGuardianFields(minorDob)).toBe(true);
  });
});
