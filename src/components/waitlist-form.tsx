"use client";

import { useState } from "react";
import { joinWaitlist } from "@/app/actions/waitlist";
import { waitlist } from "@/content/copy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error" | "duplicate">("idle");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const form = new FormData(e.currentTarget);
      const website = form.get("website");
      const result = await joinWaitlist(
        email,
        typeof website === "string" ? website : ""
      );
      if (result.success) {
        setStatus("success");
        setEmail("");
      } else if (result.error === "duplicate") {
        setStatus("duplicate");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] opacity-0"
          aria-hidden="true"
        />
        <Input
          type="email"
          placeholder={waitlist.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" disabled={loading} className="btn-cta-primary">
          {waitlist.button}
        </Button>
      </form>
      {status === "success" && (
        <p className="mt-3 text-sm text-green-700">{waitlist.success}</p>
      )}
      {status === "duplicate" && (
        <p className="mt-3 text-sm text-muted-foreground">{waitlist.duplicate}</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-destructive">{waitlist.error}</p>
      )}
    </div>
  );
}
