import { applyV2, brand, emails, speakingInvite, waitlist } from "@/content/copy";
import { confirmationHtml } from "@/lib/email/confirmation-html";
import type { WaitlistInterest } from "@/lib/waitlist-interests";

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

/** The words of one confirmation email, shared by its text and HTML versions. */
type Message = { greeting: string; paragraphs: readonly string[] };

function messageText({ greeting, paragraphs }: Message): string {
  const { signOff, signOffTitle } = emails.applicant;
  return [greeting, "", paragraphs.join("\n\n"), "", signOff, signOffTitle].join("\n");
}

/** Same words, with Erika's signature band (name, titles, portrait) at the bottom. */
function messageHtml({ greeting, paragraphs }: Message): string {
  return confirmationHtml({
    greeting,
    paragraphs,
    signOff: emails.applicant.signOff,
    titleLines: [brand.tagline, brand.taglineLine2],
  });
}

function applicantMessage(fullName: string): Message {
  return {
    greeting: emails.applicant.greeting.replace("{name}", fullName),
    paragraphs: emails.applicant.body,
  };
}

function guardianMessage(guardianName: string, athleteName: string): Message {
  return {
    greeting: guardianName
      ? emails.guardian.greeting.replace("{name}", guardianName)
      : "Hello,",
    paragraphs: emails.guardian.body.map((paragraph) =>
      paragraph.replace("{athlete}", athleteName)
    ),
  };
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
  /** Confirmations to the public also get an HTML version with Erika's picture. */
  html?: string;
  replyTo: string;
};

/** The single Resend request every message goes through. */
function createSender(apiKey: string, from: string) {
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
        html: payload.html,
        reply_to: payload.replyTo,
        // Transactional mail only: no List-Unsubscribe header, which marks
        // newsletters and pushes a message into Gmail's Promotions tab.
        headers: {
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

    const send = createSender(apiKey, from);

    const fullName = String(data.full_name ?? "").trim();
    const applicantEmail = typeof data.email === "string" ? data.email.trim() : "";
    const serviceField = FIELDS.find((field) => field.name === "service_interest");
    const service =
      (serviceField && displayValue(serviceField, data.service_interest)) ??
      String(data.service_interest ?? "");

    await Promise.all([
      attempt("applicant confirmation", async () => {
        if (!applicantEmail) return;
        const message = applicantMessage(fullName);
        await send({
          to: applicantEmail,
          subject: emails.applicant.subject,
          text: messageText(message),
          html: messageHtml(message),
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

    const guardianEmail =
      typeof data.guardian_email === "string" ? data.guardian_email.trim() : "";
    const guardianName =
      typeof data.guardian_name === "string" ? data.guardian_name.trim() : "";

    if (guardianEmail) {
      await attempt("guardian notification", async () => {
        const message = guardianMessage(guardianName, String(data.full_name ?? ""));
        await send({
          to: guardianEmail,
          subject: emails.guardian.subject.replace(
            "{athlete}",
            String(data.full_name ?? "")
          ),
          text: messageText(message),
          html: messageHtml(message),
          replyTo: notifyEmail,
        });
      });
    }
  } catch (err) {
    console.error("application emails failed", {
      message: err instanceof Error ? err.message : String(err),
    });
  }
}

/** "Coaching places, Training camps": the names shown on the form. */
function listNames(interests: readonly WaitlistInterest[]): string {
  return interests
    .map(
      (interest) =>
        waitlist.interests.find((option) => option.value === interest)?.label ?? interest
    )
    .join(", ");
}

function waitlistMessage(fullName: string, interests: readonly WaitlistInterest[]): Message {
  return {
    greeting: emails.waitlist.greeting.replace("{name}", fullName),
    paragraphs: [
      emails.waitlist.intro,
      ...interests.map((interest) => emails.waitlist.lists[interest]),
      emails.waitlist.outro,
    ],
  };
}

function waitlistGuardianMessage(
  guardianName: string,
  athleteName: string,
  interests: readonly WaitlistInterest[]
): Message {
  const { greeting, signedUp, guardianNote, coachingNote, outro } = emails.waitlistGuardian;
  return {
    greeting: guardianName ? greeting.replace("{name}", guardianName) : "Hello,",
    paragraphs: [
      signedUp.replace("{athlete}", athleteName).replace("{lists}", listNames(interests)),
      interests.includes("coaching") ? `${guardianNote} ${coachingNote}` : guardianNote,
      outro,
    ],
  };
}

type WaitlistEmailData = {
  email: string;
  full_name: string;
  athlete_age: number;
  guardian_name: string | null;
  guardian_email: string | null;
  /** The lists this sign-up added (not the ones the person was already on). */
  interests: readonly WaitlistInterest[];
};

function waitlistCoachText(data: WaitlistEmailData): string {
  const lines = [
    `${waitlist.fullName}: ${data.full_name}`,
    `${waitlist.email}: ${data.email}`,
    `${waitlist.ageLabel}: ${data.athlete_age}`,
    ...(data.guardian_name ? [`${waitlist.guardianName}: ${data.guardian_name}`] : []),
    ...(data.guardian_email ? [`${waitlist.guardianEmail}: ${data.guardian_email}`] : []),
    `${emails.waitlistCoach.listsLabel}: ${listNames(data.interests)}`,
  ];
  return [emails.waitlistCoach.intro, "", ...lines, "", emails.waitlistCoach.replyHint].join(
    "\n"
  );
}

/**
 * Confirms a "Stay connected" sign-up to the athlete, tells the named parent
 * or guardian for an athlete under 18, and sends Erika the details.
 * Never throws: the sign-up is already saved when this runs.
 */
export async function sendWaitlistEmails(data: WaitlistEmailData): Promise<void> {
  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const notifyEmail = process.env.NOTIFY_EMAIL?.trim();
    if (!apiKey || !notifyEmail) {
      console.warn("waitlist emails skipped: RESEND_API_KEY or NOTIFY_EMAIL is not set");
      return;
    }

    const from = senderAddress();
    if (!from) {
      console.warn("waitlist emails skipped: NEXT_PUBLIC_SITE_URL is missing or invalid");
      return;
    }

    const send = createSender(apiKey, from);

    const message = waitlistMessage(data.full_name, data.interests);
    await Promise.all([
      attempt("waitlist confirmation", () =>
        send({
          to: data.email,
          subject: emails.waitlist.subject,
          text: messageText(message),
          html: messageHtml(message),
          replyTo: notifyEmail,
        })
      ),
      attempt("waitlist notification", () =>
        send({
          to: notifyEmail,
          subject: `${emails.waitlistCoach.subjectPrefix} - ${data.full_name}: ${listNames(data.interests)}`,
          text: waitlistCoachText(data),
          replyTo: data.email,
        })
      ),
    ]);

    const guardianEmail = data.guardian_email?.trim() ?? "";
    if (guardianEmail) {
      const guardianNote = waitlistGuardianMessage(
        data.guardian_name?.trim() ?? "",
        data.full_name,
        data.interests
      );
      await attempt("waitlist guardian notification", () =>
        send({
          to: guardianEmail,
          subject: emails.waitlistGuardian.subject.replace("{athlete}", data.full_name),
          text: messageText(guardianNote),
          html: messageHtml(guardianNote),
          replyTo: notifyEmail,
        })
      );
    }
  } catch (err) {
    console.error("waitlist emails failed", {
      message: err instanceof Error ? err.message : String(err),
    });
  }
}

/** Speaking inquiry, in form order. Every label is read from speakingInvite. */
const SPEAKING_FIELDS: readonly FieldSpec[] = [
  { name: "full_name", label: speakingInvite.fields.fullName },
  { name: "organization", label: speakingInvite.fields.organization },
  { name: "email", label: speakingInvite.fields.email },
  { name: "event_name", label: speakingInvite.fields.eventName },
  { name: "event_date", label: speakingInvite.fields.eventDate },
  { name: "location", label: speakingInvite.fields.location },
  { name: "audience_size", label: speakingInvite.fields.audienceSize },
  {
    name: "event_format",
    label: speakingInvite.fields.format,
    options: speakingInvite.formatOptions,
  },
  { name: "looking_for", label: speakingInvite.fields.lookingFor },
  { name: "details", label: speakingInvite.fields.details },
];

function speakingCoachText(data: Record<string, unknown>): string {
  const lines = SPEAKING_FIELDS.flatMap((field) => {
    const value = displayValue(field, data[field.name]);
    return value === null ? [] : [`${field.label}: ${value}`];
  });
  return [emails.speakingCoach.intro, "", ...lines, "", emails.speakingCoach.replyHint].join(
    "\n"
  );
}

function speakingSenderMessage(fullName: string, eventName: string): Message {
  return {
    greeting: emails.speakingSender.greeting.replace("{name}", fullName),
    paragraphs: emails.speakingSender.body.map((paragraph) =>
      paragraph.replace("{event}", eventName)
    ),
  };
}

/**
 * Sends the person who asked a confirmation of the speaking inquiry, and Erika
 * the full inquiry.
 * Never throws: the inquiry is already saved when this runs.
 */
export async function sendSpeakingInquiryEmails(
  data: Record<string, unknown>
): Promise<void> {
  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const notifyEmail = process.env.NOTIFY_EMAIL?.trim();
    if (!apiKey || !notifyEmail) {
      console.warn("speaking emails skipped: RESEND_API_KEY or NOTIFY_EMAIL is not set");
      return;
    }

    const from = senderAddress();
    if (!from) {
      console.warn("speaking emails skipped: NEXT_PUBLIC_SITE_URL is missing or invalid");
      return;
    }

    const send = createSender(apiKey, from);

    const fullName = String(data.full_name ?? "").trim();
    const organization = String(data.organization ?? "").trim();
    const eventName = String(data.event_name ?? "").trim();
    const senderEmail = typeof data.email === "string" ? data.email.trim() : "";

    await Promise.all([
      attempt("speaking confirmation", async () => {
        if (!senderEmail) return;
        const message = speakingSenderMessage(fullName, eventName);
        await send({
          to: senderEmail,
          subject: emails.speakingSender.subject,
          text: messageText(message),
          html: messageHtml(message),
          replyTo: notifyEmail,
        });
      }),
      attempt("speaking notification", () =>
        send({
          to: notifyEmail,
          subject: `${emails.speakingCoach.subjectPrefix} - ${fullName}, ${organization}`,
          text: speakingCoachText(data),
          replyTo: senderEmail || notifyEmail,
        })
      ),
    ]);
  } catch (err) {
    console.error("speaking emails failed", {
      message: err instanceof Error ? err.message : String(err),
    });
  }
}
