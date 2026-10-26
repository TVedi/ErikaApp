import { describe, expect, it } from "vitest";
import { isValidEventDate, speakingInquirySchema } from "@/lib/validation/speaking-inquiry";

const NOW = Date.parse("2026-10-25T12:00:00Z");

function inDays(days: number): string {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

const inquiry = {
  full_name: "Test Organizer",
  organization: "Example Company",
  email: "Organizer@Example.com",
  event_name: "Leadership Summit",
  event_date: inDays(60),
  location: "Atlanta, Georgia",
  audience_size: "200-300",
  event_format: "in_person",
  looking_for: "A keynote on performance under pressure.",
  details: "",
  privacy_consent: true as const,
};

describe("isValidEventDate", () => {
  it("accepts a real future day", () => {
    expect(isValidEventDate("2027-03-14", NOW)).toBe(true);
  });

  it("accepts today and tolerates time zones by a day", () => {
    expect(isValidEventDate("2026-10-25", NOW)).toBe(true);
    expect(isValidEventDate("2026-10-24", NOW)).toBe(true);
  });

  it("rejects the past", () => {
    expect(isValidEventDate("2026-10-01", NOW)).toBe(false);
  });

  it("rejects a day that does not exist and other formats", () => {
    expect(isValidEventDate("2027-02-31", NOW)).toBe(false);
    expect(isValidEventDate("03/14/2027", NOW)).toBe(false);
    expect(isValidEventDate("", NOW)).toBe(false);
  });

  it("rejects a date more than five years ahead", () => {
    expect(isValidEventDate("2033-01-01", NOW)).toBe(false);
  });
});

describe("speakingInquirySchema", () => {
  it("accepts a complete inquiry and lowercases the email", () => {
    const result = speakingInquirySchema.safeParse(inquiry);
    expect(result.success).toBe(true);
    expect(result.success && result.data.email).toBe("organizer@example.com");
  });

  it("accepts any wording for the audience size", () => {
    expect(speakingInquirySchema.safeParse({ ...inquiry, audience_size: "about 150" }).success).toBe(
      true
    );
  });

  it("requires the organization, the format and the privacy consent", () => {
    expect(speakingInquirySchema.safeParse({ ...inquiry, organization: " " }).success).toBe(false);
    expect(speakingInquirySchema.safeParse({ ...inquiry, event_format: "zoom" }).success).toBe(false);
    expect(speakingInquirySchema.safeParse({ ...inquiry, privacy_consent: false }).success).toBe(
      false
    );
  });

  it("rejects a past event date", () => {
    expect(speakingInquirySchema.safeParse({ ...inquiry, event_date: inDays(-10) }).success).toBe(
      false
    );
  });
});
