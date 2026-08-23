"use client";

import { useState } from "react";
import Link from "next/link";
import { submitCoachingInquiry } from "@/app/actions/apply";
import { TurnstileWidget } from "@/components/apply/turnstile-widget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apply as applyCopy } from "@/content/copy";

export function ApplyForm({ turnstileSiteKey }: { turnstileSiteKey?: string }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [showMinorNote, setShowMinorNote] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const interests = form.getAll("interests") as string[];
    if (interests.length === 0) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    const result = await submitCoachingInquiry({
      full_name: form.get("full_name"),
      email: form.get("email"),
      location: form.get("location"),
      athlete_age: form.get("athlete_age"),
      guardian_email: form.get("guardian_email"),
      athlete_level: form.get("athlete_level"),
      main_goal: form.get("main_goal"),
      event_focus: form.get("event_focus"),
      has_video: form.get("has_video"),
      interests,
      message: form.get("message"),
      medical_disclaimer_accepted: form.get("medical_disclaimer_accepted") === "on",
      privacy_consent: form.get("privacy_consent") === "on",
      website: form.get("website"),
      turnstile_token: turnstileToken,
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="apply-form space-y-6">
      {/* Honeypot — hidden from users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] opacity-0"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="full_name" className="apply-label">
            {applyCopy.fields.fullName}
          </Label>
          <Input
            id="full_name"
            name="full_name"
            required
            maxLength={120}
            className="apply-field"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="apply-label">
            {applyCopy.fields.email}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            className="apply-field"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="location" className="apply-label">
            {applyCopy.fields.location}
          </Label>
          <Input
            id="location"
            name="location"
            maxLength={120}
            className="apply-field"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="athlete_age" className="apply-label">
            {applyCopy.fields.athleteAge}
          </Label>
          <Input
            id="athlete_age"
            name="athlete_age"
            type="number"
            min={5}
            max={100}
            required
            className="apply-field"
            onChange={(e) => {
              const age = Number(e.target.value);
              setShowMinorNote(age > 0 && age < 18);
            }}
          />
        </div>
      </div>

      {showMinorNote && (
        <p className="apply-minor-note">
          {applyCopy.minorNote}
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="guardian_email" className="apply-label">
          {applyCopy.fields.guardianEmail}
        </Label>
        <Input
          id="guardian_email"
          name="guardian_email"
          type="email"
          maxLength={254}
          className="apply-field"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="athlete_level" className="apply-label">
            {applyCopy.fields.athleteLevel}
          </Label>
          <select
            id="athlete_level"
            name="athlete_level"
            required
            className="apply-select"
          >
            {applyCopy.athleteLevels.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="main_goal" className="apply-label">
            {applyCopy.fields.mainGoal}
          </Label>
          <select
            id="main_goal"
            name="main_goal"
            required
            className="apply-select"
          >
            {applyCopy.mainGoals.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="event_focus" className="apply-label">
            {applyCopy.fields.eventFocus}
          </Label>
          <select
            id="event_focus"
            name="event_focus"
            required
            className="apply-select"
          >
            {applyCopy.eventFocuses.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="has_video" className="apply-label">
            {applyCopy.fields.hasVideo}
          </Label>
          <select
            id="has_video"
            name="has_video"
            required
            className="apply-select"
          >
            <option value="yes">{applyCopy.hasVideoOptions.yes}</option>
            <option value="no">{applyCopy.hasVideoOptions.no}</option>
          </select>
        </div>
      </div>

      <fieldset className="apply-fieldset">
        <legend className="apply-label">{applyCopy.fields.interests}</legend>
        {applyCopy.interestOptions.map((opt) => (
          <label key={opt.value} className="apply-check-row">
            <input
              type="checkbox"
              name="interests"
              value={opt.value}
              className="apply-checkbox"
            />
            {opt.label}
          </label>
        ))}
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="message" className="apply-label">
          {applyCopy.fields.message}
        </Label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={2000}
          className="apply-field apply-textarea"
        />
      </div>

      <div className="apply-consent">
        <label className="apply-check-row apply-check-row-start">
          <input
            type="checkbox"
            name="medical_disclaimer_accepted"
            required
            className="apply-checkbox"
          />
          <span>{applyCopy.checkboxes.medical}</span>
        </label>
        <label className="apply-check-row apply-check-row-start">
          <input
            type="checkbox"
            name="privacy_consent"
            required
            className="apply-checkbox"
          />
          <span>
            {applyCopy.checkboxes.privacyPrefix}{" "}
            <Link href="/privacy" className="apply-inline-link">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
      </div>

      {turnstileSiteKey && (
        <TurnstileWidget siteKey={turnstileSiteKey} onToken={setTurnstileToken} />
      )}

      {error && <p className="apply-error">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full btn-cta-primary apply-submit">
        {loading ? applyCopy.submitting : applyCopy.submit}
      </Button>
    </form>
  );
}
