/**
 * In-memory per-IP rate limiting for launch.
 * Technical debt: does not persist across serverless instances — replace with durable limiter before serious traffic.
 */

const store = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000
): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count += 1;
  return true;
}
