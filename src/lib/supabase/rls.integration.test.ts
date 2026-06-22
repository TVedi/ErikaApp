/**
 * Supabase RLS integration tests — opt-in via environment variables.
 *
 * Required env:
 *   SUPABASE_TEST_URL
 *   SUPABASE_TEST_ANON_KEY
 *   SUPABASE_TEST_SERVICE_ROLE_KEY
 *
 * Run: npm run test:integration
 * (Requires local Supabase with migrations applied: supabase db reset)
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  getSupabaseIntegrationEnv,
  hasSupabaseIntegrationEnv,
} from "./integration-env";

const describeIntegration = hasSupabaseIntegrationEnv()
  ? describe
  : describe.skip;

function deriveIsMinor(dob: string): boolean {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age < 18;
}

function randomEmail(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@rls-test.local`;
}

const TEST_PASSWORD = "TestPassword123!";

describeIntegration("Supabase RLS integration", () => {
  let service: SupabaseClient;
  let campId: string;
  let trainingPlanId: string;

  const createdUserIds: string[] = [];

  beforeAll(async () => {
    const env = getSupabaseIntegrationEnv();
    service = createClient(env.url, env.serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: camp, error: campError } = await service
      .from("camps")
      .select("id")
      .limit(1)
      .single();
    if (campError || !camp) {
      throw new Error(
        `Integration setup failed: no camp row found. Run supabase db reset. ${campError?.message ?? ""}`
      );
    }
    campId = camp.id;

    const { data: plan, error: planError } = await service
      .from("training_plans")
      .insert({ title: "RLS test plan", description: "integration fixture" })
      .select("id")
      .single();
    if (planError || !plan) {
      throw new Error(
        `Integration setup failed: could not create training plan. ${planError?.message ?? ""}`
      );
    }
    trainingPlanId = plan.id;
  });

  afterAll(async () => {
    for (const id of createdUserIds) {
      await service.auth.admin.deleteUser(id);
    }
    if (trainingPlanId) {
      await service.from("training_plans").delete().eq("id", trainingPlanId);
    }
  });

  async function createAuthUser(prefix: string) {
    const email = randomEmail(prefix);
    const { data, error } = await service.auth.admin.createUser({
      email,
      password: TEST_PASSWORD,
      email_confirm: true,
    });
    if (error || !data.user) {
      throw new Error(`Failed to create auth user: ${error?.message}`);
    }
    createdUserIds.push(data.user.id);
    return { id: data.user.id, email };
  }

  async function createProfileAsService(
    userId: string,
    profile: {
      full_name: string;
      role: "athlete" | "coach";
      date_of_birth: string;
      parental_consent?: boolean;
      guardian_email?: string | null;
    }
  ) {
    const isMinor = deriveIsMinor(profile.date_of_birth);
    const { error } = await service.from("profiles").insert({
      id: userId,
      full_name: profile.full_name,
      role: profile.role,
      date_of_birth: profile.date_of_birth,
      is_minor: isMinor,
      parental_consent: profile.parental_consent ?? false,
      guardian_email: profile.guardian_email ?? null,
    });
    if (error) {
      throw new Error(`Failed to create profile: ${error.message}`);
    }
  }

  async function signInAs(email: string): Promise<SupabaseClient> {
    const env = getSupabaseIntegrationEnv();
    const client = createClient(env.url, env.anonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { error } = await client.auth.signInWithPassword({
      email,
      password: TEST_PASSWORD,
    });
    if (error) {
      throw new Error(`Sign in failed for ${email}: ${error.message}`);
    }
    return client;
  }

  it("blocks profile role escalation — re-read shows athlete", async () => {
    const athlete = await createAuthUser("athlete-escalation");
    await createProfileAsService(athlete.id, {
      full_name: "Escalation Athlete",
      role: "athlete",
      date_of_birth: "1995-01-15",
    });

    const client = await signInAs(athlete.email);
    const { error: updateError } = await client
      .from("profiles")
      .update({ role: "coach" })
      .eq("id", athlete.id);

    // Update may succeed but trigger neutralizes role; or RLS may block — re-read is authoritative
    expect(updateError).toBeNull();

    const { data: profile } = await client
      .from("profiles")
      .select("role")
      .eq("id", athlete.id)
      .single();

    expect(profile?.role).toBe("athlete");
  });

  it("coerces profile insert role to athlete on re-read", async () => {
    const user = await createAuthUser("athlete-insert");
    const client = await signInAs(user.email);

    const dob = "1992-06-01";
    const { error: insertError } = await client.from("profiles").insert({
      id: user.id,
      full_name: "Insert Coercion Athlete",
      role: "coach",
      date_of_birth: dob,
      is_minor: true,
      parental_consent: false,
      guardian_email: null,
    });

    expect(insertError).toBeNull();

    const { data: profile } = await client
      .from("profiles")
      .select("role, is_minor, date_of_birth")
      .eq("id", user.id)
      .single();

    expect(profile?.role).toBe("athlete");
    expect(profile?.is_minor).toBe(deriveIsMinor(dob));
  });

  it("derives is_minor server-side — client value ignored on re-read", async () => {
    const athlete = await createAuthUser("athlete-minor");
    await createProfileAsService(athlete.id, {
      full_name: "Minor Derivation Athlete",
      role: "athlete",
      date_of_birth: "1995-01-15",
    });

    const client = await signInAs(athlete.email);
    const newDob = "2015-06-01";

    const { error: updateError } = await client
      .from("profiles")
      .update({ date_of_birth: newDob, is_minor: false })
      .eq("id", athlete.id);

    expect(updateError).toBeNull();

    const { data: profile } = await client
      .from("profiles")
      .select("is_minor, date_of_birth")
      .eq("id", athlete.id)
      .single();

    expect(profile?.date_of_birth).toBe(newDob);
    expect(profile?.is_minor).toBe(deriveIsMinor(newDob));
    expect(profile?.is_minor).toBe(true);
  });

  it("allows service_role to create coach profile", async () => {
    const coach = await createAuthUser("coach-service");
    const { error } = await service.from("profiles").insert({
      id: coach.id,
      full_name: "Service Coach",
      role: "coach",
      date_of_birth: "1985-03-15",
      is_minor: false,
      parental_consent: false,
      guardian_email: null,
    });
    expect(error).toBeNull();

    const { data: profile } = await service
      .from("profiles")
      .select("role")
      .eq("id", coach.id)
      .single();

    expect(profile?.role).toBe("coach");
  });

  it("blocks camp application self-approval — status stays interested", async () => {
    const athlete = await createAuthUser("athlete-camp");
    await createProfileAsService(athlete.id, {
      full_name: "Camp Athlete",
      role: "athlete",
      date_of_birth: "1994-04-04",
    });

    const client = await signInAs(athlete.email);
    const { data: application, error: insertError } = await client
      .from("camp_applications")
      .insert({ camp_id: campId, profile_id: athlete.id, status: "interested" })
      .select("id, status")
      .single();

    expect(insertError).toBeNull();
    expect(application?.status).toBe("interested");

    const { error: updateError } = await client
      .from("camp_applications")
      .update({ status: "approved" })
      .eq("id", application!.id);

    expect(updateError).not.toBeNull();

    const { data: reread } = await client
      .from("camp_applications")
      .select("status")
      .eq("id", application!.id)
      .single();

    expect(reread?.status).toBe("interested");
  });

  it("blocks athlete subscription tier self-grant — tier unchanged on re-read", async () => {
    const athlete = await createAuthUser("athlete-sub");
    await createProfileAsService(athlete.id, {
      full_name: "Sub Athlete",
      role: "athlete",
      date_of_birth: "1993-03-03",
    });

    await service.from("subscriptions").insert({
      profile_id: athlete.id,
      tier: "starter",
      status: "mock_active",
    });

    const client = await signInAs(athlete.email);
    const { error: updateError } = await client
      .from("subscriptions")
      .update({ tier: "elite_coaching" })
      .eq("profile_id", athlete.id);

    expect(updateError).not.toBeNull();

    const { data: sub } = await client
      .from("subscriptions")
      .select("tier")
      .eq("profile_id", athlete.id)
      .single();

    expect(sub?.tier).toBe("starter");
  });

  it("blocks athlete self-assigning training plan", async () => {
    const athlete = await createAuthUser("athlete-plan");
    await createProfileAsService(athlete.id, {
      full_name: "Plan Athlete",
      role: "athlete",
      date_of_birth: "1991-11-11",
    });

    const client = await signInAs(athlete.email);
    const { error: insertError } = await client
      .from("athlete_assigned_plans")
      .insert({
        athlete_id: athlete.id,
        training_plan_id: trainingPlanId,
        status: "active",
      });

    expect(insertError).not.toBeNull();

    const { data: rows } = await client
      .from("athlete_assigned_plans")
      .select("id")
      .eq("athlete_id", athlete.id);

    expect(rows ?? []).toHaveLength(0);
  });

  it("isolates athletes — Athlete A cannot read Athlete B session logs", async () => {
    const athleteA = await createAuthUser("athlete-a");
    const athleteB = await createAuthUser("athlete-b");
    await createProfileAsService(athleteA.id, {
      full_name: "Athlete A",
      role: "athlete",
      date_of_birth: "1990-01-01",
    });
    await createProfileAsService(athleteB.id, {
      full_name: "Athlete B",
      role: "athlete",
      date_of_birth: "1990-02-02",
    });

    await service.from("session_logs").insert({
      athlete_id: athleteB.id,
      notes: "private log B",
    });

    const clientA = await signInAs(athleteA.email);
    const { data: logs } = await clientA
      .from("session_logs")
      .select("id, notes")
      .eq("athlete_id", athleteB.id);

    expect(logs ?? []).toHaveLength(0);
  });

  it("allows coach to read and update camp applications", async () => {
    const coach = await createAuthUser("coach-manage");
    await createProfileAsService(coach.id, {
      full_name: "Coach Manager",
      role: "coach",
      date_of_birth: "1980-05-05",
    });

    const athlete = await createAuthUser("athlete-coach-read");
    await createProfileAsService(athlete.id, {
      full_name: "Athlete For Coach",
      role: "athlete",
      date_of_birth: "1996-07-07",
    });

    const { data: application } = await service
      .from("camp_applications")
      .insert({
        camp_id: campId,
        profile_id: athlete.id,
        status: "interested",
      })
      .select("id")
      .single();

    const coachClient = await signInAs(coach.email);
    const { data: apps, error: readError } = await coachClient
      .from("camp_applications")
      .select("id, status")
      .eq("id", application!.id);

    expect(readError).toBeNull();
    expect(apps?.length).toBe(1);

    const { error: updateError } = await coachClient
      .from("camp_applications")
      .update({ status: "approved" })
      .eq("id", application!.id);

    expect(updateError).toBeNull();

    const { data: updated } = await coachClient
      .from("camp_applications")
      .select("status")
      .eq("id", application!.id)
      .single();

    expect(updated?.status).toBe("approved");
  });
});
