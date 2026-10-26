import { z } from "zod";

export const eventFormats = ["in_person", "virtual", "not_confirmed"] as const;

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * The date picker sends YYYY-MM-DD. It must be a real calendar day, not in the
 * past (one day of slack for visitors in other time zones), and not more than
 * five years ahead.
 */
export function isValidEventDate(value: string, now: number = Date.now()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const day = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(day.getTime())) return false;
  if (day.toISOString().slice(0, 10) !== value) return false;
  const time = day.getTime();
  return time >= now - 2 * DAY_MS && time <= now + 5 * 366 * DAY_MS;
}

const text = (max: number) => z.string().trim().min(1).max(max);

export const speakingInquirySchema = z.object({
  full_name: text(120),
  organization: text(200),
  email: z.string().trim().email().max(254).transform((v) => v.toLowerCase()),
  event_name: text(200),
  event_date: z.string().trim().refine((v) => isValidEventDate(v)),
  location: text(200),
  audience_size: text(120),
  event_format: z.enum(eventFormats),
  looking_for: text(2000),
  details: z.string().trim().max(2000).optional().or(z.literal("")),
  privacy_consent: z.literal(true),
  website: z.string().optional(),
  turnstile_token: z.string().optional(),
});

export type SpeakingInquiry = z.infer<typeof speakingInquirySchema>;
