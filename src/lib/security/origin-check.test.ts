import { describe, it, expect } from "vitest";
import { isAllowedRequestOrigin } from "@/lib/security/origin-check";

function headers(init: Record<string, string>): Headers {
  return new Headers(init);
}

describe("isAllowedRequestOrigin", () => {
  it("allows exact localhost origin", () => {
    expect(
      isAllowedRequestOrigin(
        headers({ origin: "http://localhost:3000", host: "localhost:3000" })
      )
    ).toBe(true);
  });

  it("rejects substring spoof origin", () => {
    expect(
      isAllowedRequestOrigin(
        headers({
          origin: "http://evil.localhost:3000",
          host: "localhost:3000",
        })
      )
    ).toBe(false);
  });

  it("allows vercel preview when origin host matches request host", () => {
    expect(
      isAllowedRequestOrigin(
        headers({
          origin: "https://erika-app-preview.vercel.app",
          host: "erika-app-preview.vercel.app",
        })
      )
    ).toBe(true);
  });

  it("rejects vercel origin that does not match request host", () => {
    expect(
      isAllowedRequestOrigin(
        headers({
          origin: "https://other-preview.vercel.app",
          host: "erika-app-preview.vercel.app",
        })
      )
    ).toBe(false);
  });
});
