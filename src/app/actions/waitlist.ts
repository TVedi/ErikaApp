"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function joinWaitlist(email: string): Promise<{
  success: boolean;
  error?: "duplicate" | "invalid" | "server";
}> {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { success: false, error: "invalid" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("waitlist").insert({ email: trimmed });

  if (error) {
    if (error.code === "23505") {
      return { success: false, error: "duplicate" };
    }
    return { success: false, error: "server" };
  }

  revalidatePath("/");
  return { success: true };
}
