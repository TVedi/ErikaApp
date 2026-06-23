/**
 * Origin / host allowlist for public form submissions.
 */

export function isAllowedRequestOrigin(headers: Headers): boolean {
  const origin = headers.get("origin");
  const host = headers.get("x-forwarded-host") ?? headers.get("host");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

  const allowedOrigins = new Set<string>([
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ]);

  if (siteUrl) {
    allowedOrigins.add(siteUrl);
    try {
      const u = new URL(siteUrl);
      allowedOrigins.add(`${u.protocol}//${u.host}`);
    } catch {
      // ignore invalid site url
    }
  }

  if (host?.endsWith(".vercel.app")) {
    return !origin || origin.includes(host);
  }

  if (!origin) {
    return true;
  }

  return allowedOrigins.has(origin);
}
