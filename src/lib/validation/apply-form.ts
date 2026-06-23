import { z } from "zod";

export const athleteLevels = [
  "beginner",
  "club",
  "competitive_junior",
  "national_level",
  "masters",
  "coach",
  "parent",
] as const;

export const mainGoals = [
  "technique_improvement",
  "race_preparation",
  "training_plan",
  "video_review",
  "gainesville_camp",
  "other",
] as const;

export const eventFocuses = [
  "200m",
  "500m",
  "1000m",
  "marathon",
  "recreational",
  "other",
] as const;

export const interestOptions = [
  "online_coaching",
  "video_analysis",
  "training_plan",
  "gainesville_camp",
  "not_sure",
] as const;

export const applyFormSchema = z.object({
  full_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254).transform((v) => v.toLowerCase()),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  athlete_age: z.coerce.number().int().min(5).max(100),
  guardian_email: z
    .string()
    .trim()
    .email()
    .max(254)
    .optional()
    .or(z.literal("")),
  athlete_level: z.enum(athleteLevels),
  main_goal: z.enum(mainGoals),
  event_focus: z.enum(eventFocuses),
  has_video: z.enum(["yes", "no"]),
  interests: z.array(z.enum(interestOptions)).min(1),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  medical_disclaimer_accepted: z.literal(true),
  privacy_consent: z.literal(true),
  website: z.string().optional(),
  turnstile_token: z.string().optional(),
});

export type ApplyFormInput = z.infer<typeof applyFormSchema>;
