"use server";

import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { openWaitlistInterests } from "@/lib/enrollment";
import { isAllowedRequestOrigin } from "@/lib/security/origin-check";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { isTurnstileEnabled, verifyTurnstileToken } from "@/lib/security/turnstile";
import { waitlistFormSchema } from "@/lib/validation/waitlist-form";
import { sendWaitlistEmails } from "@/lib/email/notify";
import type { WaitlistInterest } from "@/lib/waitlist-interests";

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
  // Honeypot: looks like success to a bot, nothing is saved. Logged so a
  // dropped sign-up is visible in the Vercel runtime logs.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    console.warn("waitlist honeypot filled, nothing saved", {
      length: raw.website.trim().length,
    });
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

    const openLists = openWaitlistInterests();
    if (!Object.values(openLists).some(Boolean)) {
      return { success: false, error: "closed" };
    }

    const parsed = waitlistFormSchema.safeParse(raw);
    if (!parsed.success) {
      return { success: false, error: "invalid" };
    }

    const data = parsed.data;

    // A list that was closed after the page loaded is refused on the server too.
    if (data.interests.some((interest) => !openLists[interest])) {
      return { success: false, error: "closed" };
    }

    if (isTurnstileEnabled()) {
      const valid = await verifyTurnstileToken(data.turnstile_token ?? "");
      if (!valid) {
        return { success: false, error: "server" };
      }
    }

    const isMinor = data.athlete_age < 18;
    const guardianName = isMinor ? data.guardian_name || null : null;
    const guardianEmail = isMinor ? data.guardian_email || null : null;

    // One row per list (column "interest"). A list the email is already on
    // is skipped (unique email + interest). The confirmation names every
    // ticked list the person is now on; Erika's note says which ones are new.
    const supabase = createAdminClient();
    const consentAt = new Date().toISOString();
    const added: WaitlistInterest[] = [];
    const alreadyOn: WaitlistInterest[] = [];

    for (const interest of data.interests) {
      const { error } = await supabase.from("waitlist").insert({
        email: data.email,
        full_name: data.full_name,
        athlete_age: data.athlete_age,
        guardian_name: guardianName,
        guardian_email: guardianEmail,
        privacy_consent: true,
        consent_at: consentAt,
        interest,
      });

      if (!error) {
        added.push(interest);
        continue;
      }
      if (error.code === "23505") {
        alreadyOn.push(interest);
        continue;
      }
      console.error("waitlist insert failed", {
        interest,
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      if (added.length === 0) {
        return { success: false, error: "server" };
      }
      break;
    }

    if (added.length === 0) {
      return { success: false, error: "duplicate" };
    }

    await sendWaitlistEmails({
      email: data.email,
      full_name: data.full_name,
      athlete_age: data.athlete_age,
      guardian_name: guardianName,
      guardian_email: guardianEmail,
      interests: data.interests.filter(
        (interest) => added.includes(interest) || alreadyOn.includes(interest)
      ),
      newInterests: added,
    });

    return { success: true };
  } catch (err) {
    console.error("waitlist threw", {
      message: err instanceof Error ? err.message : String(err),
    });
    return { success: false, error: "server" };
  }
}
