"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { joinWaitlist } from "@/app/actions/waitlist";
import { TurnstileWidget } from "@/components/apply/turnstile-widget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { waitlist } from "@/content/copy";
import {
  WAITLIST_INTERESTS,
  isWaitlistInterest,
  type WaitlistInterest,
} from "@/lib/waitlist-interests";

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

type OpenFormProps = {
  /** Which lists take sign-ups (WAITLIST_OPEN, COURSE_LIST_OPEN, CAMP_LIST_OPEN). */
  openLists: Record<WaitlistInterest, boolean>;
  applicationsOpen: boolean;
  turnstileSiteKey?: string;
};

export function WaitlistForm(props: OpenFormProps) {
  if (!WAITLIST_INTERESTS.some((interest) => props.openLists[interest])) {
    return <WaitlistClosed applicationsOpen={props.applicationsOpen} />;
  }
  // useSearchParams on a prerendered route must sit inside a Suspense
  // boundary; until it resolves the form shows with nothing pre-ticked.
  return (
    <Suspense fallback={<WaitlistOpenForm {...props} preset={null} />}>
      <WaitlistOpenFormWithPreset {...props} />
    </Suspense>
  );
}

/**
 * In-app browsers (Messenger, Instagram) shrink the whole page while the
 * keyboard is open, so the screen-height sections above the form shrink too,
 * and grow back when the keyboard closes. The form then jumped off the screen
 * towards the FAQ, typically when a checkbox was tapped right after typing.
 * When the screen gets taller with the same width (keyboard closing), the card
 * is put back where it was on the screen. Ordinary browsers do not resize the
 * page for the keyboard, so nothing changes there.
 */
function useStayPutWhenKeyboardCloses(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;
    let lastTop = card.getBoundingClientRect().top;

    const remember = () => {
      lastTop = card.getBoundingClientRect().top;
    };
    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const wasOnScreen = lastTop < lastHeight && lastTop + card.offsetHeight > 0;
      if (width === lastWidth && height > lastHeight && wasOnScreen) {
        const shift = card.getBoundingClientRect().top - lastTop;
        if (shift !== 0) window.scrollBy(0, shift);
      }
      lastWidth = width;
      lastHeight = height;
      remember();
    };

    window.addEventListener("scroll", remember, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", remember);
      window.removeEventListener("resize", onResize);
    };
  }, [ref]);
}

/** "/?interest=camp#waitlist" (Camps and Video Course buttons) pre-ticks that list. */
function WaitlistOpenFormWithPreset(props: OpenFormProps) {
  const value = useSearchParams().get("interest");
  return <WaitlistOpenForm {...props} preset={isWaitlistInterest(value) ? value : null} />;
}

function WaitlistOpenForm({
  openLists,
  applicationsOpen,
  turnstileSiteKey,
  preset,
}: OpenFormProps & { preset: WaitlistInterest | null }) {
  const cardRef = useRef<HTMLDivElement>(null);
  useStayPutWhenKeyboardCloses(cardRef);
  const presetOpen = preset !== null && openLists[preset];
  const [selected, setSelected] = useState<WaitlistInterest[]>(() =>
    preset !== null && presetOpen ? [preset] : []
  );
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

  // A Camps or Video Course button clicked while already on this page.
  useEffect(() => {
    if (preset === null || !presetOpen) return;
    setSelected((prev) => (prev.includes(preset) ? prev : [...prev, preset]));
  }, [preset, presetOpen]);

  function toggleInterest(interest: WaitlistInterest, checked: boolean) {
    setError(null);
    setSelected((prev) =>
      checked
        ? prev.includes(interest)
          ? prev
          : [...prev, interest]
        : prev.filter((item) => item !== interest)
    );
  }

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
    const interests = WAITLIST_INTERESTS.filter((interest) => selected.includes(interest));
    if (interests.length === 0) {
      setError(waitlist.interestRequired);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const form = new FormData(e.currentTarget);
      form.delete("interest");
      const result = await joinWaitlist({
        ...Object.fromEntries(form.entries()),
        interests,
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
    <div className="waitlist-card" ref={cardRef}>
      {step === "age" && (
        <form onSubmit={handleAgeContinue} className="waitlist-age-step">
          <label htmlFor="waitlist-age" className="apply-label">
            {waitlist.ageLabel}
          </label>
          <p id="waitlist-age-hint" className="waitlist-hint">
            {waitlist.ageHint.map((line) => (
              <span key={line} className="waitlist-hint-line">
                {line}
              </span>
            ))}
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

          <fieldset className="waitlist-interests">
            <legend className="apply-label">{waitlist.interestsLabel}</legend>
            <div className="waitlist-interest-options">
              {waitlist.interests.map((option) => {
                const isOpen = openLists[option.value];
                return (
                  <label
                    key={option.value}
                    className={
                      isOpen
                        ? "apply-check-row waitlist-interest"
                        : "apply-check-row waitlist-interest is-closed"
                    }
                  >
                    <input
                      type="checkbox"
                      name="interest"
                      value={option.value}
                      className="apply-checkbox"
                      checked={isOpen && selected.includes(option.value)}
                      disabled={!isOpen}
                      onChange={(e) => toggleInterest(option.value, e.currentTarget.checked)}
                    />
                    <span>
                      {option.label}
                      {!isOpen && (
                        <span className="waitlist-interest-closed"> · {waitlist.interestClosed}</span>
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
            {!openLists.coaching && applicationsOpen && (
              <p className="waitlist-interest-hint">
                {waitlist.coachingApplyHint}{" "}
                <Link href="/apply" className="apply-inline-link">
                  {waitlist.closed.applyLink}
                </Link>
              </p>
            )}
          </fieldset>

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

          {/* Honeypot for bots. Fully hidden (display: none), so browser
              autofill and password managers never fill it in for a person. */}
          <div hidden>
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="absolute -left-[9999px] opacity-0"
              aria-hidden="true"
            />
          </div>

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
        <p className="waitlist-hint">
          {waitlist.ageHint.map((line) => (
            <span key={line} className="waitlist-hint-line">
              {line}
            </span>
          ))}
        </p>
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
