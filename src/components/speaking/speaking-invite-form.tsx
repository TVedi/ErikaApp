"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { submitSpeakingInquiry } from "@/app/actions/speaking";
import { TurnstileWidget } from "@/components/apply/turnstile-widget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { applyV2, speakingInvite } from "@/content/copy";

const SELECT_PLACEHOLDER = "Select an option";
const PRIVACY_LINK_TEXT = "Privacy Policy";
const privacyParts = applyV2.consents.privacy.split(PRIVACY_LINK_TEXT);
const GENERIC_ERROR = "Something went wrong. Please try again.";
const f = speakingInvite.fields;

/** Today in the visitor's own time zone, as YYYY-MM-DD for the date picker. */
function localToday(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <Label htmlFor={htmlFor} className="apply-label">
      {children}
      {required && <span className="apply-required" aria-hidden="true">*</span>}
    </Label>
  );
}

function TextField({
  name,
  label,
  type = "text",
  autoComplete,
  inputMode,
  min,
  hint,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  min?: string;
  hint?: string;
}) {
  const hintId = hint ? `${name}-hint` : undefined;
  return (
    <div className="space-y-2">
      <FieldLabel htmlFor={name} required>
        {label}
      </FieldLabel>
      <Input
        id={name}
        name={name}
        type={type}
        required
        maxLength={type === "date" ? undefined : 200}
        autoComplete={autoComplete}
        inputMode={inputMode}
        min={min}
        aria-describedby={hintId}
        className="apply-field"
      />
      {hint && (
        <p id={hintId} className="speaking-invite-hint">
          {hint}
        </p>
      )}
    </div>
  );
}

function TextareaField({
  name,
  label,
  required,
}: {
  name: string;
  label: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <FieldLabel htmlFor={name} required={required}>
        {label}
      </FieldLabel>
      <textarea
        id={name}
        name={name}
        rows={4}
        required={required}
        maxLength={2000}
        className="apply-field apply-textarea"
      />
    </div>
  );
}

/**
 * "Invite Erika to Speak" inquiry form. Same field styling, consent, bot check
 * and submit flow as the coaching application.
 */
export function SpeakingInviteForm({ turnstileSiteKey }: { turnstileSiteKey?: string }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  // Set after mount so the server and the browser render the same markup.
  const [minDate, setMinDate] = useState<string | undefined>(undefined);

  useEffect(() => {
    setMinDate(localToday());
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const form = new FormData(e.currentTarget);
      const result = await submitSpeakingInquiry({
        ...Object.fromEntries(form.entries()),
        privacy_consent: form.get("privacy_consent") === "on",
        turnstile_token: turnstileToken,
      });
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } catch {
      setError(GENERIC_ERROR);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="apply-form speaking-invite-form space-y-6">
      <p className="apply-required-note">{speakingInvite.requiredNote}</p>

      <TextField name="full_name" label={f.fullName} autoComplete="name" />
      <TextField
        name="organization"
        label={f.organization}
        autoComplete="organization"
        hint={speakingInvite.organizationHint}
      />
      <TextField name="email" label={f.email} type="email" autoComplete="email" />
      <TextField name="event_name" label={f.eventName} />
      <TextField name="event_date" label={f.eventDate} type="date" min={minDate} />
      <TextField name="location" label={f.location} />
      <TextField name="audience_size" label={f.audienceSize} />

      <div className="space-y-2">
        <FieldLabel htmlFor="event_format" required>
          {f.format}
        </FieldLabel>
        <select id="event_format" name="event_format" required className="apply-select">
          <option value="">{SELECT_PLACEHOLDER}</option>
          {speakingInvite.formatOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <TextareaField name="looking_for" label={f.lookingFor} required />
      <TextareaField name="details" label={f.details} />

      <div className="apply-consent">
        <label className="apply-check-row apply-check-row-start">
          <input type="checkbox" name="privacy_consent" required className="apply-checkbox" />
          <span>
            {privacyParts[0]}
            <Link href="/privacy" className="apply-inline-link">
              {PRIVACY_LINK_TEXT}
            </Link>
            {privacyParts.slice(1).join(PRIVACY_LINK_TEXT)}
          </span>
        </label>
      </div>

      {/* Honeypot — hidden from users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] opacity-0"
        aria-hidden="true"
      />

      {turnstileSiteKey && (
        <TurnstileWidget siteKey={turnstileSiteKey} onToken={setTurnstileToken} />
      )}

      <div role="alert" aria-live="assertive">
        {error && <p className="apply-error">{error}</p>}
      </div>

      <Button type="submit" disabled={loading} className="w-full btn-cta-primary apply-submit">
        {loading ? speakingInvite.submitting : speakingInvite.submit}
      </Button>

      <p className="apply-no-guarantee speaking-invite-notice">{speakingInvite.notice}</p>
    </form>
  );
}
