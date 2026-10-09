import { z } from "zod";

export const waitlistFormSchema = z
  .object({
    athlete_age: z.coerce.number().int().min(13).max(99),
    full_name: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(254).transform((v) => v.toLowerCase()),
    guardian_name: z.string().trim().max(120).optional().or(z.literal("")),
    guardian_email: z.string().trim().email().max(254).optional().or(z.literal("")),
    privacy_consent: z.literal(true),
    website: z.string().optional(),
    turnstile_token: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.athlete_age >= 18) return;

    if (!data.guardian_name) {
      ctx.addIssue({
        code: "custom",
        path: ["guardian_name"],
        message: "Guardian name is required when the athlete is under 18.",
      });
    }
    if (!data.guardian_email) {
      ctx.addIssue({
        code: "custom",
        path: ["guardian_email"],
        message: "Guardian email is required when the athlete is under 18.",
      });
    }
    if (
      data.guardian_email &&
      data.guardian_email.trim().toLowerCase() === data.email.trim().toLowerCase()
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["guardian_email"],
        message: "The parent or guardian email must be different from the athlete's.",
      });
    }
  });

export type WaitlistFormInput = z.infer<typeof waitlistFormSchema>;
