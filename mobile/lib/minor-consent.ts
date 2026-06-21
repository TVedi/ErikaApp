export function calculateIsMinor(dateOfBirth: string | Date): boolean {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age < 18;
}

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

export function canAccessDashboard(profile: {
  is_minor: boolean;
  parental_consent: boolean;
}): boolean {
  if (!profile.is_minor) return true;
  return profile.parental_consent === true;
}

export function requiresGuardianFields(dateOfBirth: string): boolean {
  return calculateIsMinor(dateOfBirth);
}
