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
    <form onSubmit={handleSubmit} className="space-y-6">
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
          <Label htmlFor="full_name">{applyCopy.fields.fullName}</Label>
          <Input id="full_name" name="full_name" required maxLength={120} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{applyCopy.fields.email}</Label>
          <Input id="email" name="email" type="email" required maxLength={254} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="location">{applyCopy.fields.location}</Label>
          <Input id="location" name="location" maxLength={120} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="athlete_age">{applyCopy.fields.athleteAge}</Label>
          <Input
            id="athlete_age"
            name="athlete_age"
            type="number"
            min={5}
            max={100}
            required
            onChange={(e) => {
              const age = Number(e.target.value);
              setShowMinorNote(age > 0 && age < 18);
            }}
          />
        </div>
      </div>

      {showMinorNote && (
        <p className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          {applyCopy.minorNote}
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="guardian_email">{applyCopy.fields.guardianEmail}</Label>
        <Input id="guardian_email" name="guardian_email" type="email" maxLength={254} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="athlete_level">{applyCopy.fields.athleteLevel}</Label>
          <select
            id="athlete_level"
            name="athlete_level"
            required
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
          >
            {applyCopy.athleteLevels.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="main_goal">{applyCopy.fields.mainGoal}</Label>
          <select
            id="main_goal"
            name="main_goal"
            required
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
          >
            {applyCopy.mainGoals.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="event_focus">{applyCopy.fields.eventFocus}</Label>
          <select
            id="event_focus"
            name="event_focus"
            required
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
          >
            {applyCopy.eventFocuses.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="has_video">{applyCopy.fields.hasVideo}</Label>
          <select
            id="has_video"
            name="has_video"
            required
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
          >
            <option value="yes">{applyCopy.hasVideoOptions.yes}</option>
            <option value="no">{applyCopy.hasVideoOptions.no}</option>
          </select>
        </div>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">{applyCopy.fields.interests}</legend>
        {applyCopy.interestOptions.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="interests" value={opt.value} className="rounded border-input" />
            {opt.label}
          </label>
        ))}
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="message">{applyCopy.fields.message}</Label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={2000}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs"
        />
      </div>

      <div className="space-y-4 rounded-xl border border-border bg-muted/30 p-4">
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="medical_disclaimer_accepted"
            required
            className="mt-1 h-4 w-4 rounded border-input"
          />
          <span>{applyCopy.checkboxes.medical}</span>
        </label>
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="privacy_consent"
            required
            className="mt-1 h-4 w-4 rounded border-input"
          />
          <span>
            {applyCopy.checkboxes.privacyPrefix}{" "}
            <Link href="/privacy" className="text-link-coral font-medium text-foreground underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
      </div>

      {turnstileSiteKey && (
        <TurnstileWidget siteKey={turnstileSiteKey} onToken={setTurnstileToken} />
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full btn-cta-primary sm:w-auto">
        {loading ? applyCopy.submitting : applyCopy.submit}
      </Button>
    </form>
  );
}
