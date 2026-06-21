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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const result = await joinWaitlist(email);
    if (result.success) {
      setStatus("success");
      setEmail("");
    } else if (result.error === "duplicate") {
      setStatus("duplicate");
    } else {
      setStatus("error");
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="email"
          placeholder={waitlist.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" disabled={loading} className="bg-navy hover:bg-navy-light">
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
