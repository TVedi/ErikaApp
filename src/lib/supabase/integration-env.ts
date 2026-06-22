/**
 * Supabase RLS integration test environment.
 * Reads env at call time — never throws at import time.
 */
export function hasSupabaseIntegrationEnv(): boolean {
  return Boolean(
    process.env.SUPABASE_TEST_URL?.trim() &&
      process.env.SUPABASE_TEST_ANON_KEY?.trim() &&
      process.env.SUPABASE_TEST_SERVICE_ROLE_KEY?.trim()
  );
}

export function getSupabaseIntegrationEnv() {
  return {
    url: process.env.SUPABASE_TEST_URL!.trim(),
    anonKey: process.env.SUPABASE_TEST_ANON_KEY!.trim(),
    serviceRoleKey: process.env.SUPABASE_TEST_SERVICE_ROLE_KEY!.trim(),
  };
}
