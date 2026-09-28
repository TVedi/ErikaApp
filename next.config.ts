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
        // framework. 'unsafe-eval' is development-only.
        `script-src 'self' 'unsafe-inline'${
          process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""
        } https://challenges.cloudflare.com`,
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: blob:",
        "font-src 'self' data:",
        "frame-src https://challenges.cloudflare.com https://checkout.stripe.com",
        "connect-src 'self' https://challenges.cloudflare.com",
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
