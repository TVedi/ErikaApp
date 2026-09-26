/**
 * Origin / host allowlist for public form submissions.
 * Uses exact host matching — no substring checks.
 */

const DEV_HOSTS = [
  "localhost:3000",
  "127.0.0.1:3000",
  "localhost:3001",
  "127.0.0.1:3001",
];

function getRequestHost(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-host");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? null;
  }
  return headers.get("host");
}

function buildAllowedHosts(headers: Headers): Set<string> {
  const allowed = new Set<string>(DEV_HOSTS);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (siteUrl) {
    try {
      const host = new URL(siteUrl).host;
      allowed.add(host);
      // The apex and the www host are the same site and both resolve to this
      // project. A page opened at one spelling must not be rejected because
      // NEXT_PUBLIC_SITE_URL names the other.
      if (host.startsWith("www.")) {
        allowed.add(host.slice(4));
      } else {
        allowed.add(`www.${host}`);
      }
    } catch {
      // ignore invalid NEXT_PUBLIC_SITE_URL
    }
  }

  const requestHost = getRequestHost(headers);
  if (requestHost?.endsWith(".vercel.app")) {
    allowed.add(requestHost);
  }

  return allowed;
}

/**
 * Validates that a browser form submission originated from an allowed host.
 * Missing Origin is allowed only when the request Host matches the allowlist
 * (typical same-origin Next.js server action from the app itself).
 */
export function isAllowedRequestOrigin(headers: Headers): boolean {
  const allowedHosts = buildAllowedHosts(headers);
  const requestHost = getRequestHost(headers);
  const origin = headers.get("origin");

  if (!origin) {
    return requestHost !== null && allowedHosts.has(requestHost);
  }

  try {
    const originHost = new URL(origin).host;
    return allowedHosts.has(originHost);
  } catch {
    return false;
  }
}
