import type { WaitlistInterest } from "@/lib/waitlist-interests";

/**
 * Enrollment switches, read from the server environment at build time.
 * To close one, set it to "false" in Vercel and redeploy. Any other value, or
 * no value at all, keeps it open.
 *   WAITLIST_OPEN      coaching waitlist
 *   COURSE_LIST_OPEN   video course list
 *   CAMP_LIST_OPEN     training camp list
 *   APPLICATIONS_OPEN  coaching application form
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

export function isCourseListOpen(): boolean {
  return isOpen(process.env.COURSE_LIST_OPEN);
}

export function isCampListOpen(): boolean {
  return isOpen(process.env.CAMP_LIST_OPEN);
}

/** Which "Stay connected" lists take sign-ups right now. */
export function openWaitlistInterests(): Record<WaitlistInterest, boolean> {
  return {
    coaching: isWaitlistOpen(),
    video_course: isCourseListOpen(),
    camp: isCampListOpen(),
  };
}
