/**
 * Enrollment switches, read from the server environment at build time.
 * To close one, set WAITLIST_OPEN or APPLICATIONS_OPEN to "false" in Vercel
 * and redeploy. Any other value, or no value at all, keeps it open.
 */
function isOpen(value: string | undefined): boolean {
  return value?.trim().toLowerCase() !== "false";
}

export function isWaitlistOpen(): boolean {
  return isOpen(process.env.WAITLIST_OPEN);
}

export function areApplicationsOpen(): boolean {
  return isOpen(process.env.APPLICATIONS_OPEN);
}
