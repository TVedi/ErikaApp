import type { Profile } from "@/types/database";

const MINOR_AGE_THRESHOLD = 18;

/**
 * Calculate whether a person is under 18 based on date of birth.
 */
export function calculateIsMinor(dateOfBirth: string | Date): boolean {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age < MINOR_AGE_THRESHOLD;
}

/**
 * Validate minor signup requirements.
 */
export function validateMinorSignup(data: {
  dateOfBirth: string;
  guardianEmail?: string;
  parentalConsent?: boolean;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const isMinor = calculateIsMinor(data.dateOfBirth);

  if (isMinor) {
    if (!data.guardianEmail?.trim()) {
      errors.push("Guardian email is required for athletes under 18.");
    }
    if (!data.parentalConsent) {
      errors.push("Parental consent is required for athletes under 18.");
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Minors without parental consent cannot access the dashboard.
 */
export function canAccessDashboard(profile: Pick<Profile, "is_minor" | "parental_consent">): boolean {
  if (!profile.is_minor) return true;
  return profile.parental_consent === true;
}

export function requiresGuardianFields(dateOfBirth: string): boolean {
  return calculateIsMinor(dateOfBirth);
}
