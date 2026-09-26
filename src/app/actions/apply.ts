"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAllowedRequestOrigin } from "@/lib/security/origin-check";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { isTurnstileEnabled, verifyTurnstileToken } from "@/lib/security/turnstile";
import { applyFormSchema } from "@/lib/validation/apply-form";

const GENERIC_ERROR = "Something went wrong. Please try again.";

function getClientIp(headerStore: Headers): string {
  return (
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip") ||
    "unknown"
  );
}

export async function submitCoachingInquiry(
  raw: Record<string, unknown>
): Promise<{ error?: string }> {
  const headerStore = await headers();

  if (!isAllowedRequestOrigin(headerStore)) {
    return { error: GENERIC_ERROR };
  }

  const ip = getClientIp(headerStore);
  if (!checkRateLimit(`apply:${ip}`, 5, 60_000)) {
    return { error: GENERIC_ERROR };
  }

  // Honeypot — silent success path (no insert)
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    redirect("/thank-you");
  }

  const parsed = applyFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: GENERIC_ERROR };
  }

  const data = parsed.data;

  if (isTurnstileEnabled()) {
    const valid = await verifyTurnstileToken(data.turnstile_token ?? "");
    if (!valid) {
      return { error: GENERIC_ERROR };
    }
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("coaching_inquiries").insert({
      full_name: data.full_name,
      email: data.email,
      location: data.location,
      athlete_age: data.athlete_age,
      guardian_name: data.guardian_name || null,
      guardian_email: data.guardian_email || null,
      athlete_level: data.athlete_level,
      service_interest: data.service_interest,
      event_focus: data.event_focus,
      best_500m: data.best_500m,
      best_2000m: data.best_2000m,
      times_context: data.times_context,
      recent_result: data.recent_result,
      years_paddling: data.years_paddling,
      sessions_per_week: data.sessions_per_week,
      hours_per_week: data.hours_per_week,
      structured_plan: data.structured_plan === "yes",
      has_coach: data.has_coach === "yes",
      additional_support: data.additional_support || null,
      water_access: data.water_access,
      gym_access: data.gym_access === "yes",
      uses_device: data.uses_device === "yes",
      device_platform: data.device_platform || null,
      shares_data: data.shares_data === "yes",
      training_company: data.training_company || null,
      has_video: data.has_video ? data.has_video === "yes" : null,
      improvement_goal: data.improvement_goal,
      has_target_race: data.has_target_race === "yes",
      target_race: data.target_race || null,
      current_challenge: data.current_challenge,
      committed_sessions: data.committed_sessions,
      willing_feedback: data.willing_feedback === "yes",
      why_interested: data.why_interested,
      message: data.message || null,
      medical_disclaimer_accepted: true,
      privacy_consent: true,
      status: "new",
    });

    if (error) {
      console.error("coaching_inquiry insert failed", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return { error: GENERIC_ERROR };
    }
  } catch (err) {
    console.error("coaching_inquiry threw", {
      message: err instanceof Error ? err.message : String(err),
    });
    return { error: GENERIC_ERROR };
  }

  redirect("/thank-you");
}
