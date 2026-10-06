import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Content-Security-Policy",
    value:
      [
        "frame-ancestors 'none'",
        "default-src 'self'",
        // 'unsafe-inline' stays: Next inlines its bootstrap scripts, and
        // removing it needs a per-request nonce threaded through the
        // framework. 'unsafe-eval' is required by Termly's embedded policies.
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://app.termly.io",
        "style-src 'self' 'unsafe-inline' https://app.termly.io",
        "img-src 'self' data: blob: https://app.termly.io",
        "font-src 'self' data:",
        "frame-src https://challenges.cloudflare.com https://checkout.stripe.com https://app.termly.io",
        "connect-src 'self' https://challenges.cloudflare.com https://app.termly.io",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join("; "),
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
