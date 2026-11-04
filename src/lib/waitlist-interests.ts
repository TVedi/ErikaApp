/**
 * The lists a person can sign up for on the "Stay connected" form. Each one is
 * stored as its own row in the waitlist table (column "interest").
 */
export const WAITLIST_INTERESTS = ["coaching", "video_course", "camp"] as const;

export type WaitlistInterest = (typeof WAITLIST_INTERESTS)[number];

export function isWaitlistInterest(value: unknown): value is WaitlistInterest {
  return (
    typeof value === "string" &&
    (WAITLIST_INTERESTS as readonly string[]).includes(value)
  );
}
