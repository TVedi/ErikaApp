"use server";

import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { isWaitlistOpen } from "@/lib/enrollment";
import { isAllowedRequestOrigin } from "@/lib/security/origin-check";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { isTurnstileEnabled, verifyTurnstileToken } from "@/lib/security/turnstile";
import { waitlistFormSchema } from "@/lib/validation/waitlist-form";
import { sendWaitlistEmails } from "@/lib/email/notify";

export type WaitlistResult = {
  success: boolean;
  error?: "duplicate" | "invalid" | "closed" | "server";
};

function getClientIp(headerStore: Headers): string {
  return (
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip") ||
    "unknown"
  );
}

export async function joinWaitlist(
  raw: Record<string, unknown>
): Promise<WaitlistResult> {
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return { success: true };
  }

  try {
    const headerStore = await headers();

    if (!isAllowedRequestOrigin(headerStore)) {
      return { success: false, error: "server" };
    }

    const ip = getClientIp(headerStore);
    if (!checkRateLimit(`waitlist:${ip}`, 5, 60_000)) {
      return { success: false, error: "server" };
    }

    if (!isWaitlistOpen()) {
      return { success: false, error: "closed" };
    }

    const parsed = waitlistFormSchema.safeParse(raw);
    if (!parsed.success) {
      return { success: false, error: "invalid" };
    }

    const data = parsed.data;

    if (isTurnstileEnabled()) {
      const valid = await verifyTurnstileToken(data.turnstile_token ?? "");
      if (!valid) {
        return { success: false, error: "server" };
      }
    }

    const isMinor = data.athlete_age < 18;
    const guardianName = isMinor ? data.guardian_name || null : null;
    const guardianEmail = isMinor ? data.guardian_email || null : null;

    const supabase = createAdminClient();
    const { error } = await supabase.from("waitlist").insert({
      email: data.email,
      full_name: data.full_name,
      athlete_age: data.athlete_age,
      guardian_name: guardianName,
      guardian_email: guardianEmail,
      privacy_consent: true,
      consent_at: new Date().toISOString(),
    });

    if (error) {
      if (error.code === "23505") {
        return { success: false, error: "duplicate" };
      }
      console.error("waitlist insert failed", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return { success: false, error: "server" };
    }

    await sendWaitlistEmails({
      email: data.email,
      full_name: data.full_name,
      guardian_name: guardianName,
      guardian_email: guardianEmail,
    });

    return { success: true };
  } catch (err) {
    console.error("waitlist threw", {
      message: err instanceof Error ? err.message : String(err),
    });
    return { success: false, error: "server" };
  }
}
