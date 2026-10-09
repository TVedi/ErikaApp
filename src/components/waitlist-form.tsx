"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { joinWaitlist } from "@/app/actions/waitlist";
import { TurnstileWidget } from "@/components/apply/turnstile-widget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { waitlist } from "@/content/copy";

const PRIVACY_LINK_TEXT = "Privacy Policy";
const consentParts = waitlist.consent.split(PRIVACY_LINK_TEXT);

/**
 * Once an age under 13 is entered, the gate stays closed for the rest of the
 * browser session, so the age cannot simply be changed and resubmitted.
 */
const AGE_GATE_KEY = "mp-waitlist-age-gate";

type Step = "age" | "details" | "under13" | "done";

function readAgeGateLock(): boolean {
  try {
    return window.sessionStorage.getItem(AGE_GATE_KEY) === "under13";
  } catch {
    return false;
  }
}

function writeAgeGateLock(): void {
  try {
    window.sessionStorage.setItem(AGE_GATE_KEY, "under13");
  } catch {
    // Storage can be unavailable in private modes; the gate still closes.
  }
}

function englishPrompt(message: string) {
  return {
    onInvalid: (e: React.InvalidEvent<HTMLInputElement>) =>
      e.currentTarget.setCustomValidity(message),
    onInput: (e: React.FormEvent<HTMLInputElement>) =>
      e.currentTarget.setCustomValidity(""),
  };
}

export function WaitlistForm({
  isOpen,
  applicationsOpen,
  turnstileSiteKey,
}: {
  isOpen: boolean;
  applicationsOpen: boolean;
  turnstileSiteKey?: string;
}) {
  if (!isOpen) {
    return <WaitlistClosed applicationsOpen={applicationsOpen} />;
  }
  return <WaitlistOpenForm turnstileSiteKey={turnstileSiteKey} />;
}

function WaitlistOpenForm({ turnstileSiteKey }: { turnstileSiteKey?: string }) {
  const [step, setStep] = useState<Step>("age");
  const [age, setAge] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (readAgeGateLock()) setStep("under13");
  }, []);

  const isMinor = step === "details" && Number(age) < 18;
  const guardianEmailClashes =
    isMinor &&
    guardianEmail.trim() !== "" &&
    guardianEmail.trim().toLowerCase() === applicantEmail.trim().toLowerCase();

  function handleAgeContinue(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = Number(age);
    if (!Number.isInteger(value)) return;
    if (value < 13) {
      writeAgeGateLock();
      setStep("under13");
      return;
    }
    setError(null);
    setStep("details");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (guardianEmailClashes) return;
    setLoading(true);
    setError(null);
    try {
      const form = new FormData(e.currentTarget);
      const result = await joinWaitlist({
        ...Object.fromEntries(form.entries()),
        athlete_age: age,
        privacy_consent: form.get("privacy_consent") === "on",
        turnstile_token: turnstileToken,
      });
      if (result.success) {
        setStep("done");
        return;
      }
      setError(
        result.error === "duplicate"
          ? waitlist.duplicate
          : result.error === "closed"
            ? waitlist.closedError
            : waitlist.error
      );
    } catch {
      setError(waitlist.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="waitlist-card">
      {step === "age" && (
        <form onSubmit={handleAgeContinue} className="waitlist-age-step">
          <label htmlFor="waitlist-age" className="apply-label">
            {waitlist.ageLabel}
          </label>
          <p id="waitlist-age-hint" className="waitlist-hint">
            {waitlist.ageHint}
          </p>
          <div className="waitlist-age-row">
            <Input
              id="waitlist-age"
              name="athlete_age"
              type="number"
              inputMode="numeric"
              min={5}
              max={99}
              step={1}
              required
              value={age}
              aria-describedby="waitlist-age-hint"
              className="waitlist-field waitlist-age-input"
              {...englishPrompt("Please enter the athlete's age.")}
              onChange={(e) => {
                e.currentTarget.setCustomValidity("");
                setAge(e.currentTarget.value);
              }}
            />
            <Button type="submit" className="btn-cta-primary waitlist-continue">
              {waitlist.continue}
            </Button>
          </div>
        </form>
      )}

      {step === "under13" && (
        <div className="waitlist-notice" role="status" aria-live="polite">
          <h3 className="waitlist-notice-heading">{waitlist.underThirteen.heading}</h3>
          <p className="waitlist-notice-body">{waitlist.underThirteen.body}</p>
          <p className="waitlist-notice-email">{waitlist.underThirteen.email}</p>
        </div>
      )}

      {step === "details" && (
        <form onSubmit={handleSubmit} className="waitlist-details">
          <div className="waitlist-age-summary">
            <span className="apply-label waitlist-age-summary-label">
              {waitlist.ageLabel}
            </span>
            <span className="waitlist-age-summary-value">{age}</span>
            <button
              type="button"
              className="waitlist-edit"
              onClick={() => {
                setError(null);
                setStep("age");
              }}
            >
              {waitlist.editAge}
            </button>
          </div>

          <div className="waitlist-grid">
            <div className="waitlist-field-group">
              <label htmlFor="waitlist-full-name" className="apply-label">
                {waitlist.fullName}
              </label>
              <Input
                id="waitlist-full-name"
                name="full_name"
                autoComplete="name"
                required
                maxLength={120}
                className="waitlist-field"
                {...englishPrompt("Please enter your full name.")}
              />
            </div>
            <div className="waitlist-field-group">
              <label htmlFor="waitlist-email" className="apply-label">
                {waitlist.email}
              </label>
              <Input
                id="waitlist-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                className="waitlist-field"
                {...englishPrompt("Please enter a valid email address.")}
                onChange={(e) => {
                  e.currentTarget.setCustomValidity("");
                  setApplicantEmail(e.currentTarget.value);
                }}
              />
            </div>
          </div>

          {isMinor && (
            <>
              <p className="waitlist-minor-note">{waitlist.minorNote}</p>
              <div className="waitlist-grid" role="group" aria-live="polite">
                <div className="waitlist-field-group">
                  <label htmlFor="waitlist-guardian-name" className="apply-label">
                    {waitlist.guardianName}
                  </label>
                  <Input
                    id="waitlist-guardian-name"
                    name="guardian_name"
                    required
                    maxLength={120}
                    className="waitlist-field"
                    {...englishPrompt("Please enter a parent or guardian's name.")}
                  />
                </div>
                <div className="waitlist-field-group">
                  <label htmlFor="waitlist-guardian-email" className="apply-label">
                    {waitlist.guardianEmail}
                  </label>
                  <Input
                    id="waitlist-guardian-email"
                    name="guardian_email"
                    type="email"
                    required
                    maxLength={254}
                    className="waitlist-field"
                    {...englishPrompt(
                      "A parent or guardian email is required for athletes under 18."
                    )}
                    onChange={(e) => {
                      e.currentTarget.setCustomValidity("");
                      setGuardianEmail(e.currentTarget.value);
                    }}
                  />
                  {guardianEmailClashes && (
                    <p className="apply-field-error" role="alert">
                      {waitlist.guardianEmailMustDiffer}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          <label className="apply-check-row apply-check-row-start waitlist-consent">
            <input
              type="checkbox"
              name="privacy_consent"
              required
              className="apply-checkbox"
              {...englishPrompt("Please agree before joining the waitlist.")}
            />
            <span>
              {consentParts[0]}
              <Link href="/privacy" className="apply-inline-link">
                {PRIVACY_LINK_TEXT}
              </Link>
              {consentParts.slice(1).join(PRIVACY_LINK_TEXT)}
            </span>
          </label>

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

          <Button
            type="submit"
            disabled={loading || guardianEmailClashes}
            className="btn-cta-primary waitlist-submit"
          >
            {loading ? waitlist.submitting : waitlist.button}
          </Button>
        </form>
      )}

      {step === "done" && (
        <div className="waitlist-success" role="status" aria-live="polite">
          <span className="waitlist-success-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
              <path
                d="M5 12.5l4.5 4.5L19 7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h3 className="waitlist-success-title">{waitlist.successTitle}</h3>
          <p className="waitlist-success-body">{waitlist.successBody}</p>
        </div>
      )}
    </div>
  );
}

function WaitlistClosed({ applicationsOpen }: { applicationsOpen: boolean }) {
  return (
    <div className="waitlist-card waitlist-card-closed">
      <div className="waitlist-closed-status" role="status">
        <span className="waitlist-closed-badge">{waitlist.closed.badge}</span>
        <p className="waitlist-closed-text">
          {applicationsOpen ? waitlist.closed.applicationsOpen : waitlist.closed.allClosed}
          {applicationsOpen && (
            <>
              {" "}
              <Link href="/apply" className="apply-inline-link">
                {waitlist.closed.applyLink}
              </Link>
            </>
          )}
        </p>
      </div>
      <fieldset className="waitlist-preview" disabled aria-hidden="true" inert>
        <span className="apply-label">{waitlist.ageLabel}</span>
        <p className="waitlist-hint">{waitlist.ageHint}</p>
        <div className="waitlist-age-row">
          <Input type="number" tabIndex={-1} className="waitlist-field waitlist-age-input" />
          <Button type="button" tabIndex={-1} className="btn-cta-primary waitlist-continue">
            {waitlist.closed.button}
          </Button>
        </div>
      </fieldset>
    </div>
  );
}
