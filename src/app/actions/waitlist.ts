"use server";

import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAllowedRequestOrigin } from "@/lib/security/origin-check";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { revalidatePath } from "next/cache";

function getClientIp(headerStore: Headers): string {
  return (
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip") ||
    "unknown"
  );
}

export async function joinWaitlist(email: string, website?: string): Promise<{
  success: boolean;
  error?: "duplicate" | "invalid" | "server";
}> {
  if (typeof website === "string" && website.trim() !== "") {
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

    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return { success: false, error: "invalid" };
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("waitlist").insert({ email: trimmed });

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

    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("waitlist threw", {
      message: err instanceof Error ? err.message : String(err),
    });
    return { success: false, error: "server" };
  }
}
