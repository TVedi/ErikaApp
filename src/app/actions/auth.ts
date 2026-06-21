"use server";

import { createClient } from "@/lib/supabase/server";
import {
  calculateIsMinor,
  validateMinorSignup,
} from "@/lib/auth/minor-consent";
import { redirect } from "next/navigation";

export async function signUp(formData: {
  fullName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  guardianEmail?: string;
  parentalConsent?: boolean;
}): Promise<{ error?: string }> {
  const validation = validateMinorSignup({
    dateOfBirth: formData.dateOfBirth,
    guardianEmail: formData.guardianEmail,
    parentalConsent: formData.parentalConsent,
  });

  if (!validation.valid) {
    return { error: validation.errors[0] };
  }

  const supabase = await createClient();
  const isMinor = calculateIsMinor(formData.dateOfBirth);

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if (authError) {
    return { error: authError.message };
  }

  if (!authData.user) {
    return { error: "Account creation failed. Please try again." };
  }

  const { error: profileError } = await supabase.from("profiles").insert({
    id: authData.user.id,
    full_name: formData.fullName.trim(),
    role: "athlete",
    date_of_birth: formData.dateOfBirth,
    is_minor: isMinor,
    parental_consent: isMinor ? formData.parentalConsent ?? false : false,
    guardian_email: isMinor ? formData.guardianEmail?.trim() : null,
  });

  if (profileError) {
    return { error: profileError.message };
  }

  redirect("/dashboard");
}

export async function signIn(formData: {
  email: string;
  password: string;
}): Promise<{ error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
