"use client";

import { useState } from "react";
import Link from "next/link";
import { signUp } from "@/app/actions/auth";
import { requiresGuardianFields } from "@/lib/auth/minor-consent";
import { auth } from "@/content/copy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [parentalConsent, setParentalConsent] = useState(false);
  const showGuardianFields = dateOfBirth ? requiresGuardianFields(dateOfBirth) : false;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const result = await signUp({
      fullName: form.get("fullName") as string,
      email: form.get("email") as string,
      password: form.get("password") as string,
      dateOfBirth: form.get("dateOfBirth") as string,
      guardianEmail: form.get("guardianEmail") as string | undefined,
      parentalConsent: showGuardianFields ? parentalConsent : undefined,
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <Card className="glass-card w-full max-w-md ring-0">
      <CardHeader>
        <CardTitle className="font-brand text-gray-900">{auth.signupTitle}</CardTitle>
        <CardDescription className="text-gray-600">{auth.safetyDisclaimer}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">{auth.fullName}</Label>
            <Input id="fullName" name="fullName" required autoComplete="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{auth.email}</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{auth.password}</Label>
            <Input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">{auth.dateOfBirth}</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              required
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>

          {showGuardianFields && (
            <>
              <div className="space-y-2">
                <Label htmlFor="guardianEmail">{auth.guardianEmail}</Label>
                <Input
                  id="guardianEmail"
                  name="guardianEmail"
                  type="email"
                  required
                  autoComplete="email"
                />
                <p className="text-xs text-muted-foreground">{auth.guardianEmailHint}</p>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="parentalConsent"
                  checked={parentalConsent}
                  onCheckedChange={(checked) => setParentalConsent(checked === true)}
                  required
                />
                <Label htmlFor="parentalConsent" className="text-sm leading-relaxed">
                  {auth.parentalConsent}
                </Label>
              </div>
            </>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={loading} className="btn-gradient w-full rounded-2xl border-0">
            {auth.signupButton}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          {auth.hasAccount}{" "}
          <Link href="/login" className="font-medium text-violet-700 hover:underline">
            {auth.loginLink}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
