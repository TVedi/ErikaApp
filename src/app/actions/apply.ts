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

  if (data.athlete_age < 18 && !data.guardian_email) {
    return { error: GENERIC_ERROR };
  }

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
      location: data.location || null,
      athlete_age: data.athlete_age,
      guardian_email: data.guardian_email || null,
      athlete_level: data.athlete_level,
      main_goal: data.main_goal,
      event_focus: data.event_focus,
      has_video: data.has_video === "yes",
      interests: data.interests,
      message: data.message || null,
      medical_disclaimer_accepted: true,
      privacy_consent: true,
      status: "new",
    });

    if (error) {
      console.error("coaching_inquiry insert failed");
      return { error: GENERIC_ERROR };
    }
  } catch {
    return { error: GENERIC_ERROR };
  }

  redirect("/thank-you");
}
