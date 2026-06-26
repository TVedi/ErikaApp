"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "@/app/actions/auth";
import { auth } from "@/content/copy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const result = await signIn({
      email: form.get("email") as string,
      password: form.get("password") as string,
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle className="text-navy">{auth.loginTitle}</CardTitle>
        <CardDescription>{auth.safetyDisclaimer}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{auth.email}</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{auth.password}</Label>
            <Input id="password" name="password" type="password" required autoComplete="current-password" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full btn-cta-primary">
            {auth.loginButton}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {auth.noAccount}{" "}
          <Link href="/signup" className="font-medium text-navy hover:underline">
            {auth.signupLink}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
