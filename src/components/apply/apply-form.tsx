"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { submitCoachingInquiry } from "@/app/actions/apply";
import { TurnstileWidget } from "@/components/apply/turnstile-widget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apply as applyCopy, applyV2 } from "@/content/copy";

const REQUIRED_FIELDS: ReadonlySet<string> = new Set(applyV2.requiredFields);

function isRequired(name: string) {
  return REQUIRED_FIELDS.has(name);
}

const SELECT_PLACEHOLDER = "Select an option";
const PRIVACY_LINK_TEXT = "Privacy Policy";
const privacyParts = applyV2.consents.privacy.split(PRIVACY_LINK_TEXT);

type Option = { readonly value: string; readonly label: string };

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

function TextField({ name, label }: { name: string; label: string }) {
  const required = isRequired(name);
  return (
    <div className="space-y-2">
      <FieldLabel htmlFor={name} required={required}>
        {label}
      </FieldLabel>
      <Input
        id={name}
        name={name}
        required={required}
        maxLength={200}
        className="apply-field"
      />
    </div>
  );
}

function TextareaField({
  name,
  label,
  rows = 4,
}: {
  name: string;
  label: string;
  rows?: number;
}) {
  const required = isRequired(name);
  return (
    <div className="space-y-2">
      <FieldLabel htmlFor={name} required={required}>
        {label}
      </FieldLabel>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        maxLength={2000}
        className="apply-field apply-textarea"
      />
    </div>
  );
}

function SelectField({
  name,
  label,
  options,
  onChange,
}: {
  name: string;
  label: string;
  options: readonly Option[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const required = isRequired(name);
  return (
    <div className="space-y-2">
      <FieldLabel htmlFor={name} required={required}>
        {label}
      </FieldLabel>
      <select
        id={name}
        name={name}
        required={required}
        className="apply-select"
        onChange={onChange}
      >
        <option value="">{SELECT_PLACEHOLDER}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * useSearchParams on a prerendered route must sit inside a Suspense boundary,
 * otherwise `next build` fails on /apply.
 */
export function ApplyForm(props: { turnstileSiteKey?: string }) {
  return (
    <Suspense fallback={null}>
      <ApplyFormInner {...props} />
    </Suspense>
  );
}

function ApplyFormInner({ turnstileSiteKey }: { turnstileSiteKey?: string }) {
  const searchParams = useSearchParams();
  const presetService = searchParams.get("service") ?? "";
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState("");
  const [hasCoach, setHasCoach] = useState("");
  const [usesDevice, setUsesDevice] = useState("");
  const [hasTargetRace, setHasTargetRace] = useState("");
  const [guardianFilled, setGuardianFilled] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const isMinor = age !== "" && Number(age) < 18;

  function englishPrompt(message: string) {
    return {
      onInvalid: (e: React.InvalidEvent<HTMLInputElement>) =>
        e.currentTarget.setCustomValidity(message),
      onInput: (e: React.FormEvent<HTMLInputElement>) =>
        e.currentTarget.setCustomValidity(""),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        e.currentTarget.setCustomValidity(""),
    };
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const form = new FormData(e.currentTarget);
      const result = await submitCoachingInquiry({
        ...Object.fromEntries(form.entries()),
        medical_disclaimer_accepted:
          form.get("medical_disclaimer_accepted") === "on",
        privacy_consent: form.get("privacy_consent") === "on",
        turnstile_token: turnstileToken,
      });
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const { contact, performance, trainingBackground, trainingEnvironment } = applyV2;

  return (
    <form onSubmit={handleSubmit} className="apply-form space-y-6">
      <p className="apply-required-note">{applyV2.requiredNote}</p>

      <section className="apply-section">
        <h2 className="apply-section-title">{contact.title}</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel htmlFor="full_name" required={isRequired("full_name")}>
              {contact.fields.fullName}
            </FieldLabel>
            <Input
              id="full_name"
              name="full_name"
              required={isRequired("full_name")}
              maxLength={120}
              className="apply-field"
              {...englishPrompt("Please enter your full name.")}
            />
          </div>
          <div className="space-y-2">
            <FieldLabel htmlFor="email" required={isRequired("email")}>
              {contact.fields.email}
            </FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              required={isRequired("email")}
              maxLength={254}
              className="apply-field"
              {...englishPrompt("Please enter a valid email address.")}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel htmlFor="location" required={isRequired("location")}>
              {contact.fields.country}
            </FieldLabel>
            <Input
              id="location"
              name="location"
              required={isRequired("location")}
              maxLength={120}
              className="apply-field"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel htmlFor="athlete_age" required={isRequired("athlete_age")}>
              {contact.fields.age}
            </FieldLabel>
            <Input
              id="athlete_age"
              name="athlete_age"
              type="number"
              min={5}
              max={99}
              required={isRequired("athlete_age")}
              className="apply-field"
              {...englishPrompt("Please enter the athlete's age.")}
              onChange={(e) => {
                e.currentTarget.setCustomValidity("");
                const next = e.currentTarget.value;
                setAge(next);
                if (next === "" || Number(next) >= 18) {
                  setGuardianFilled(false);
                }
              }}
            />
          </div>
        </div>

        {isMinor && !guardianFilled && (
          <p className="apply-minor-note">{applyCopy.minorNote}</p>
        )}

        {isMinor && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel htmlFor="guardian_name" required={isRequired("guardian_name")}>
                {contact.fields.guardianName}
              </FieldLabel>
              <Input
                id="guardian_name"
                name="guardian_name"
                required={isRequired("guardian_name")}
                maxLength={120}
                className="apply-field"
              />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="guardian_email" required={isRequired("guardian_email")}>
                {contact.fields.guardianEmail}
              </FieldLabel>
              <Input
                id="guardian_email"
                name="guardian_email"
                type="email"
                required={isRequired("guardian_email")}
                maxLength={254}
                className="apply-field"
                {...englishPrompt("A parent or guardian email is required for athletes under 18.")}
                onChange={(e) => {
                  e.currentTarget.setCustomValidity("");
                  setGuardianFilled(e.currentTarget.value.trim() !== "");
                }}
              />
            </div>
          </div>
        )}
      </section>

      <section className="apply-section">
        <h2 className="apply-section-title">{applyV2.athleteLevel.title}</h2>
        <SelectField
          name="athlete_level"
          label={applyV2.athleteLevel.question}
          options={applyV2.athleteLevel.options}
        />
      </section>

      <section className="apply-section">
        <h2 className="apply-section-title">{applyV2.coachingInterest.title}</h2>
        <div className="space-y-2">
          <FieldLabel htmlFor="service_interest" required={isRequired("service_interest")}>
            {applyV2.coachingInterest.question}
          </FieldLabel>
          <select
            id="service_interest"
            name="service_interest"
            required={isRequired("service_interest")}
            className="apply-select"
            defaultValue={applyV2.coachingInterest.options.some((o) => o.value === presetService) ? presetService : ""}
          >
            <option value="">{SELECT_PLACEHOLDER}</option>
            {applyV2.coachingInterest.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="apply-section">
        <h2 className="apply-section-title">{applyV2.eventDistance.title}</h2>
        <SelectField
          name="event_focus"
          label={applyV2.eventDistance.question}
          options={applyV2.eventDistance.options}
        />
      </section>

      <section className="apply-section">
        <h2 className="apply-section-title">{performance.title}</h2>
        <TextField name="best_500m" label={performance.fields.best500m} />
        <TextField name="best_2000m" label={performance.fields.best2000m} />
        <TextField name="times_context" label={performance.fields.timesContext} />
        <TextField name="recent_result" label={performance.fields.recentResult} />
      </section>

      <section className="apply-section">
        <h2 className="apply-section-title">{trainingBackground.title}</h2>
        <TextField name="years_paddling" label={trainingBackground.fields.yearsPaddling} />
        <TextField
          name="sessions_per_week"
          label={trainingBackground.fields.sessionsPerWeek}
        />
        <TextField name="hours_per_week" label={trainingBackground.fields.hoursPerWeek} />
        <SelectField
          name="structured_plan"
          label={trainingBackground.fields.structuredPlan}
          options={applyV2.yesNo}
        />
        <SelectField
          name="has_coach"
          label={trainingBackground.fields.hasCoach}
          options={applyV2.yesNo}
          onChange={(e) => setHasCoach(e.target.value)}
        />
        {hasCoach === "yes" && (
          <TextareaField
            name="additional_support"
            label={trainingBackground.fields.additionalSupport}
          />
        )}
      </section>

      <section className="apply-section">
        <h2 className="apply-section-title">{trainingEnvironment.title}</h2>
        <SelectField
          name="water_access"
          label={trainingEnvironment.fields.waterAccess}
          options={trainingEnvironment.waterAccessOptions}
        />
        <SelectField
          name="gym_access"
          label={trainingEnvironment.fields.gymAccess}
          options={applyV2.yesNo}
        />
        <SelectField
          name="uses_device"
          label={trainingEnvironment.fields.usesDevice}
          options={applyV2.yesNo}
          onChange={(e) => setUsesDevice(e.target.value)}
        />
        {usesDevice === "yes" && (
          <SelectField
            name="device_platform"
            label={trainingEnvironment.fields.devicePlatform}
            options={trainingEnvironment.deviceOptions}
          />
        )}
        <SelectField
          name="shares_data"
          label={trainingEnvironment.fields.sharesData}
          options={applyV2.yesNo}
        />
        <SelectField
          name="training_company"
          label={trainingEnvironment.fields.trainingCompany}
          options={trainingEnvironment.companyOptions}
        />
        <SelectField
          name="has_video"
          label={trainingEnvironment.fields.hasVideo}
          options={applyV2.yesNo}
        />
      </section>

      <section className="apply-section">
        <h2 className="apply-section-title">{applyV2.goals.title}</h2>
        <TextareaField
          name="improvement_goal"
          label={applyV2.goals.fields.improvementGoal}
        />
        <SelectField
          name="has_target_race"
          label={applyV2.goals.fields.hasTargetRace}
          options={applyV2.yesNo}
          onChange={(e) => setHasTargetRace(e.target.value)}
        />
        {hasTargetRace === "yes" && (
          <TextField name="target_race" label={applyV2.goals.fields.targetRace} />
        )}
      </section>

      <section className="apply-section">
        <h2 className="apply-section-title">{applyV2.challenge.title}</h2>
        <TextareaField
          name="current_challenge"
          label={applyV2.challenge.fields.currentChallenge}
        />
      </section>

      <section className="apply-section">
        <h2 className="apply-section-title">{applyV2.commitment.title}</h2>
        <TextField
          name="committed_sessions"
          label={applyV2.commitment.fields.committedSessions}
        />
        <SelectField
          name="willing_feedback"
          label={applyV2.commitment.fields.willingFeedback}
          options={applyV2.yesNo}
        />
      </section>

      <section className="apply-section">
        <h2 className="apply-section-title">{applyV2.finalQuestions.title}</h2>
        <TextareaField
          name="why_interested"
          label={applyV2.finalQuestions.fields.whyInterested}
          rows={5}
        />
        <TextareaField
          name="message"
          label={applyV2.finalQuestions.fields.anythingElse}
          rows={4}
        />
      </section>

      <div className="apply-consent">
        <label className="apply-check-row apply-check-row-start">
          <input
            type="checkbox"
            name="medical_disclaimer_accepted"
            required={isRequired("medical_disclaimer_accepted")}
            className="apply-checkbox"
            {...englishPrompt("Please confirm you understand this is a coaching inquiry.")}
          />
          <span>{applyV2.consents.medical}</span>
        </label>
        <label className="apply-check-row apply-check-row-start">
          <input
            type="checkbox"
            name="privacy_consent"
            required={isRequired("privacy_consent")}
            className="apply-checkbox"
            {...englishPrompt("Please consent to us processing your information.")}
          />
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

      <p className="apply-no-guarantee">{applyV2.noGuaranteeNotice}</p>

      <Button type="submit" disabled={loading} className="w-full btn-cta-primary apply-submit">
        {loading ? applyCopy.submitting : applyCopy.submit}
      </Button>

      {error && <p className="apply-error">{error}</p>}
    </form>
  );
}
