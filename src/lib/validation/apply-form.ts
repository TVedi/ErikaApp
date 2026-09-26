import { z } from "zod";

export const athleteLevels = [
  "elite_international",
  "national",
  "senior",
  "u23",
  "junior",
  "masters",
  "club",
] as const;

export const serviceInterests = [
  "technique_review",
  "performance_coaching",
  "high_performance_coaching",
  "gainesville_camp",
] as const;

export const eventFocuses = [
  "200m",
  "500m",
  "1000m",
  "multiple_sprint",
  "long_distance",
  "marathon",
  "recreational",
  "other",
] as const;

export const waterAccessValues = ["yes", "no", "seasonal"] as const;

export const devicePlatforms = [
  "garmin",
  "polar",
  "coros",
  "suunto",
  "apple_watch",
  "wahoo",
  "trainingpeaks",
  "strava",
  "other",
] as const;

export const trainingCompanies = ["alone", "group", "both"] as const;

const shortText = () => z.string().trim().min(1).max(200);
const longText = () => z.string().trim().min(1).max(2000);
const yesNo = () => z.enum(["yes", "no"]);

export const applyFormSchema = z
  .object({
  full_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254).transform((v) => v.toLowerCase()),
  location: z.string().trim().min(1).max(120),
  athlete_age: z.coerce.number().int().min(5).max(99),
  guardian_name: z.string().trim().max(120).optional().or(z.literal("")),
  guardian_email: z.string().trim().email().max(254).optional().or(z.literal("")),
  athlete_level: z.enum(athleteLevels),
  service_interest: z.enum(serviceInterests),
  event_focus: z.enum(eventFocuses),
  best_500m: shortText(),
  best_2000m: shortText(),
  times_context: shortText(),
  recent_result: shortText(),
  years_paddling: shortText(),
  sessions_per_week: shortText(),
  hours_per_week: shortText(),
  structured_plan: yesNo(),
  has_coach: yesNo(),
  additional_support: z.string().trim().max(2000).optional().or(z.literal("")),
  water_access: z.enum(waterAccessValues),
  gym_access: yesNo(),
  uses_device: yesNo(),
  device_platform: z.enum(devicePlatforms).optional().or(z.literal("")),
  shares_data: yesNo(),
  training_company: z.enum(trainingCompanies).optional().or(z.literal("")),
  has_video: z.enum(["yes", "no"]).optional().or(z.literal("")),
  improvement_goal: longText(),
  has_target_race: yesNo(),
  target_race: z.string().trim().max(200).optional().or(z.literal("")),
  current_challenge: longText(),
  committed_sessions: shortText(),
  willing_feedback: yesNo(),
  why_interested: longText(),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  medical_disclaimer_accepted: z.literal(true),
  privacy_consent: z.literal(true),
  website: z.string().optional(),
  turnstile_token: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const isMinor = data.athlete_age < 18;

    if (isMinor && !data.guardian_name) {
      ctx.addIssue({
        code: "custom",
        path: ["guardian_name"],
        message: "Guardian name is required when the athlete is under 18.",
      });
    }
    if (isMinor && !data.guardian_email) {
      ctx.addIssue({
        code: "custom",
        path: ["guardian_email"],
        message: "Guardian email is required when the athlete is under 18.",
      });
    }
    if (data.has_coach === "yes" && !data.additional_support) {
      ctx.addIssue({
        code: "custom",
        path: ["additional_support"],
        message: "Please describe the support you are looking for.",
      });
    }
    if (data.uses_device === "yes" && !data.device_platform) {
      ctx.addIssue({
        code: "custom",
        path: ["device_platform"],
        message: "Please choose the device or platform you use.",
      });
    }
    if (data.has_target_race === "yes" && !data.target_race) {
      ctx.addIssue({
        code: "custom",
        path: ["target_race"],
        message: "Please give the event name and date.",
      });
    }
  });

export type ApplyFormInput = z.infer<typeof applyFormSchema>;
