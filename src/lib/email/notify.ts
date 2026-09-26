import { applyV2, emails } from "@/content/copy";

type Option = { readonly value: string; readonly label: string };
type FieldSpec = { name: string; label: string; options?: readonly Option[] };

const {
  contact,
  athleteLevel,
  coachingInterest,
  eventDistance,
  performance,
  trainingBackground,
  trainingEnvironment,
  goals,
  challenge,
  commitment,
  finalQuestions,
  yesNo,
} = applyV2;

/** Form order. Every label and option label is read from applyV2. */
const FIELDS: readonly FieldSpec[] = [
  { name: "full_name", label: contact.fields.fullName },
  { name: "email", label: contact.fields.email },
  { name: "location", label: contact.fields.country },
  { name: "athlete_age", label: contact.fields.age },
  { name: "guardian_name", label: contact.fields.guardianName },
  { name: "guardian_email", label: contact.fields.guardianEmail },
  { name: "athlete_level", label: athleteLevel.question, options: athleteLevel.options },
  {
    name: "service_interest",
    label: coachingInterest.question,
    options: coachingInterest.options,
  },
  { name: "event_focus", label: eventDistance.question, options: eventDistance.options },
  { name: "best_500m", label: performance.fields.best500m },
  { name: "best_2000m", label: performance.fields.best2000m },
  { name: "times_context", label: performance.fields.timesContext },
  { name: "recent_result", label: performance.fields.recentResult },
  { name: "years_paddling", label: trainingBackground.fields.yearsPaddling },
  { name: "sessions_per_week", label: trainingBackground.fields.sessionsPerWeek },
  { name: "hours_per_week", label: trainingBackground.fields.hoursPerWeek },
  {
    name: "structured_plan",
    label: trainingBackground.fields.structuredPlan,
    options: yesNo,
  },
  { name: "has_coach", label: trainingBackground.fields.hasCoach, options: yesNo },
  { name: "additional_support", label: trainingBackground.fields.additionalSupport },
  {
    name: "water_access",
    label: trainingEnvironment.fields.waterAccess,
    options: trainingEnvironment.waterAccessOptions,
  },
  { name: "gym_access", label: trainingEnvironment.fields.gymAccess, options: yesNo },
  { name: "uses_device", label: trainingEnvironment.fields.usesDevice, options: yesNo },
  {
    name: "device_platform",
    label: trainingEnvironment.fields.devicePlatform,
    options: trainingEnvironment.deviceOptions,
  },
  { name: "shares_data", label: trainingEnvironment.fields.sharesData, options: yesNo },
  {
    name: "training_company",
    label: trainingEnvironment.fields.trainingCompany,
    options: trainingEnvironment.companyOptions,
  },
  { name: "has_video", label: trainingEnvironment.fields.hasVideo, options: yesNo },
  { name: "improvement_goal", label: goals.fields.improvementGoal },
  { name: "has_target_race", label: goals.fields.hasTargetRace, options: yesNo },
  { name: "target_race", label: goals.fields.targetRace },
  { name: "current_challenge", label: challenge.fields.currentChallenge },
  { name: "committed_sessions", label: commitment.fields.committedSessions },
  { name: "willing_feedback", label: commitment.fields.willingFeedback, options: yesNo },
  { name: "why_interested", label: finalQuestions.fields.whyInterested },
  { name: "message", label: finalQuestions.fields.anythingElse },
];

/**
 * The action awaits these emails before redirecting, and the serverless
 * function has a time limit. A hung request must not outlive it after the
 * application has already been saved.
 */
const SEND_TIMEOUT_MS = 8000;

/** Human-readable value, or null when the field was empty or not asked. */
function displayValue(field: FieldSpec, raw: unknown): string | null {
  if (raw === undefined || raw === null) return null;
  const value = String(raw).trim();
  if (value === "") return null;
  return field.options?.find((opt) => opt.value === value)?.label ?? value;
}

function senderAddress(): string | null {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!siteUrl) return null;
  try {
    const host = new URL(siteUrl).host.replace(/^www\./, "");
    return host ? `Erika Medveczky OLY <hello@${host}>` : null;
  } catch {
    return null;
  }
}

function applicantText(fullName: string): string {
  const { greeting, body, signOff, signOffTitle } = emails.applicant;
  return [
    greeting.replace("{name}", fullName),
    "",
    body.join("\n\n"),
    "",
    signOff,
    signOffTitle,
  ].join("\n");
}

function coachText(data: Record<string, unknown>): string {
  const lines = FIELDS.flatMap((field) => {
    const value = displayValue(field, data[field.name]);
    return value === null ? [] : [`${field.label}: ${value}`];
  });
  return [emails.coach.intro, "", ...lines, "", emails.coach.replyHint].join("\n");
}

type EmailPayload = {
  to: string;
  subject: string;
  text: string;
  replyTo: string;
};

/** The single Resend request every message goes through. */
function createSender(apiKey: string, from: string, notifyEmail: string) {
  return async (payload: EmailPayload): Promise<void> => {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [payload.to],
        subject: payload.subject,
        text: payload.text,
        reply_to: payload.replyTo,
        headers: {
          "List-Unsubscribe": `<mailto:${notifyEmail}>`,
          "Auto-Submitted": "auto-generated",
        },
      }),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error("resend send failed", {
        status: res.status,
        body: await res.text(),
      });
    }
  };
}

async function attempt(label: string, task: () => Promise<void>): Promise<void> {
  try {
    await task();
  } catch (err) {
    console.error(`${label} failed`, {
      message: err instanceof Error ? err.message : String(err),
    });
  }
}

/**
 * Sends the applicant a short confirmation and Erika the full application.
 * Never throws: by the time this runs the application is already saved, so an
 * email problem is logged and the applicant still reaches the thank-you page.
 */
export async function sendApplicationEmails(
  data: Record<string, unknown>
): Promise<void> {
  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const notifyEmail = process.env.NOTIFY_EMAIL?.trim();
    if (!apiKey || !notifyEmail) {
      console.warn("application emails skipped: RESEND_API_KEY or NOTIFY_EMAIL is not set");
      return;
    }

    const from = senderAddress();
    if (!from) {
      console.warn("application emails skipped: NEXT_PUBLIC_SITE_URL is missing or invalid");
      return;
    }

    const send = createSender(apiKey, from, notifyEmail);

    const fullName = String(data.full_name ?? "").trim();
    const applicantEmail = typeof data.email === "string" ? data.email.trim() : "";
    const serviceField = FIELDS.find((field) => field.name === "service_interest");
    const service =
      (serviceField && displayValue(serviceField, data.service_interest)) ??
      String(data.service_interest ?? "");

    await Promise.all([
      attempt("applicant confirmation", async () => {
        if (!applicantEmail) return;
        await send({
          to: applicantEmail,
          subject: emails.applicant.subject,
          text: applicantText(fullName),
          replyTo: notifyEmail,
        });
      }),
      attempt("coach notification", () =>
        send({
          to: notifyEmail,
          subject: `${emails.coach.subjectPrefix} - ${fullName}, ${service}`,
          text: coachText(data),
          replyTo: applicantEmail || notifyEmail,
        })
      ),
    ]);
  } catch (err) {
    console.error("application emails failed", {
      message: err instanceof Error ? err.message : String(err),
    });
  }
}

function waitlistText(): string {
  const { signOff, signOffTitle } = emails.applicant;
  return [emails.waitlist.body.join("\n\n"), "", signOff, signOffTitle].join("\n");
}

/**
 * Confirms a waitlist join to the subscriber only; Erika is not notified.
 * Never throws: the address is already saved when this runs.
 */
export async function sendWaitlistEmail(to: string): Promise<void> {
  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const notifyEmail = process.env.NOTIFY_EMAIL?.trim();
    if (!apiKey || !notifyEmail) {
      console.warn("waitlist email skipped: RESEND_API_KEY or NOTIFY_EMAIL is not set");
      return;
    }

    const from = senderAddress();
    if (!from) {
      console.warn("waitlist email skipped: NEXT_PUBLIC_SITE_URL is missing or invalid");
      return;
    }

    const send = createSender(apiKey, from, notifyEmail);
    await send({
      to,
      subject: emails.waitlist.subject,
      text: waitlistText(),
      replyTo: notifyEmail,
    });
  } catch (err) {
    console.error("waitlist email failed", {
      message: err instanceof Error ? err.message : String(err),
    });
  }
}
