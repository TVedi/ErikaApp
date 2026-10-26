"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAllowedRequestOrigin } from "@/lib/security/origin-check";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { isTurnstileEnabled, verifyTurnstileToken } from "@/lib/security/turnstile";
import { speakingInquirySchema } from "@/lib/validation/speaking-inquiry";
import { sendSpeakingInquiryEmails } from "@/lib/email/notify";

const GENERIC_ERROR = "Something went wrong. Please try again.";

function getClientIp(headerStore: Headers): string {
  return (
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * "Invite Erika to Speak" inquiry. Same path as the coaching application:
 * origin check, rate limit, honeypot, validation, bot check, saved by the
 * server (service role) into speaking_inquiries, then the emails, then the
 * thank-you page.
 */
export async function submitSpeakingInquiry(
  raw: Record<string, unknown>
): Promise<{ error?: string }> {
  const headerStore = await headers();

  if (!isAllowedRequestOrigin(headerStore)) {
    return { error: GENERIC_ERROR };
  }

  const ip = getClientIp(headerStore);
  if (!checkRateLimit(`speaking:${ip}`, 5, 60_000)) {
    return { error: GENERIC_ERROR };
  }

  // Honeypot — silent success path (no insert)
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    redirect("/thank-you");
  }

  const parsed = speakingInquirySchema.safeParse(raw);
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
    const { error } = await supabase.from("speaking_inquiries").insert({
      full_name: data.full_name,
      organization: data.organization,
      email: data.email,
      event_name: data.event_name,
      event_date: data.event_date,
      location: data.location,
      audience_size: data.audience_size,
      event_format: data.event_format,
      looking_for: data.looking_for,
      details: data.details || null,
      privacy_consent: true,
      status: "new",
    });

    if (error) {
      console.error("speaking_inquiry insert failed", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return { error: GENERIC_ERROR };
    }

    await sendSpeakingInquiryEmails(data);
  } catch (err) {
    console.error("speaking_inquiry threw", {
      message: err instanceof Error ? err.message : String(err),
    });
    return { error: GENERIC_ERROR };
  }

  redirect("/thank-you");
}
