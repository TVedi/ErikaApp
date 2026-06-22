# Elite Paddle Coaching — Phase 1

World-class sprint kayak coaching platform for Erika Medveczky — Olympic athlete, World Champion, and elite coach. Phase 1 is a clickable, deployable foundation: public marketing pages, auth, athlete dashboard shell, and Supabase schema with RLS.

**This project is separate from any Family Assistance mobile app.**

## Phase 1 scope

### Built

- Public pages: landing, about, pricing, camps, terms, privacy, refund policy, medical disclaimer
- Email/password signup and login (Supabase Auth)
- Athlete dashboard shell with mock tier and coming-soon cards
- Minor safeguarding: guardian email + parental consent required for under-18 athletes
- Blocked dashboard state for minors without consent
- `coach_credentials` and `camps` loaded from database (not hardcoded in UI)
- Waitlist email capture
- Full database schema with RLS policies
- Private `videos` storage bucket (configured for future uploads, not used yet)
- Centralized marketing copy in `src/content/copy.ts` for future i18n
- Tests for minor consent logic, role helpers, RLS expectations, and opt-in Supabase RLS integration tests

### Intentionally not built (later phases)

- Stripe payments and checkout
- Real video upload and private storage usage
- Coach video review workflow
- AI analysis or automated coaching
- Sports watch integrations
- Live camp payments and registration
- Coach/admin dashboard UI
- Training plan UI, progress logging UI, feedback UI

## Tech stack

- Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui
- Supabase Auth, Postgres, Row Level Security, Storage
- **Mobile**: Expo (React Native) in `mobile/` — see [mobile/README.md](mobile/README.md)

## Mobile app (Expo)

Try the same Phase 1 experience on your phone:

```bash
cd mobile
npm install
cp .env.example .env
# Same Supabase URL + anon key as web `.env.local`
npm start
```

Scan the QR code with **Expo Go** on your phone, or press `w` for web preview.

## Prerequisites

- Node.js 20+
- npm
- [Supabase CLI](https://supabase.com/docs/guides/cli) (recommended for local dev) **or** a hosted Supabase project

## Local setup

### 1. Clone and install

```bash
cd elite-paddle-coaching
npm install
```

### 2. Environment variables

Copy the example file and fill in your Supabase values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |

For local Supabase after `supabase start`, run `supabase status` to get the URL and anon key.

### 3. Supabase setup

**Option A — Local (recommended)**

```bash
# Install Supabase CLI, then:
supabase start
supabase db reset   # runs migrations + seed.sql
```

**Option B — Hosted project**

1. Create a project at [supabase.com](https://supabase.com)
2. Run migrations via SQL Editor or `supabase db push`
3. Run `supabase/seed.sql` for credentials and camps

Migrations live in `supabase/migrations/`:

- `20250620000001_initial_schema.sql` — tables, helpers, storage bucket
- `20250620000002_rls_policies.sql` — Row Level Security

Migrations live in `supabase/migrations/`:

- `20250620000001_initial_schema.sql` — tables, helpers, storage bucket
- `20250620000002_rls_policies.sql` — Row Level Security
- `20250621000003_security_rls_hardening.sql` — profile trigger guard + camp application policy hardening

### 4. Seed mock users (safe — no passwords in repo)

**Never commit real passwords.** Create test users through the app or Supabase Dashboard.

#### Via signup UI (easiest)

1. **Adult athlete** — `/signup` with DOB making them 18+
2. **Minor with consent** — `/signup` with DOB under 18, guardian email, and parental consent checked

**Minor signup note:** Phase 1 requires `guardian_email` and `parental_consent` during signup for minors. A pending-consent signup UI flow is **not** implemented. The app blocks dashboard access when consent is missing, but minors cannot complete signup without checking consent in the current UI.

3. **Minor without consent (SQL-only test row)** — for testing blocked dashboard access, insert via SQL or `seed_profiles.sql` comment template. This row exists only to test blocked access behavior, not normal signup.

4. **Coach** — create via service role (athletes cannot self-promote to coach):

```sql
-- After creating auth user in Dashboard, insert profile with service role / SQL Editor:
insert into public.profiles (id, full_name, role, date_of_birth, is_minor, parental_consent)
values (
  (select id from auth.users where email = 'coach@example.com'),
  'Coach Name',
  'coach',
  '1985-03-15',
  false,
  false
);
```

Direct `update profiles set role = 'coach'` by a normal athlete is blocked by a database trigger.

#### Mock subscriptions

After creating athlete accounts, add mock subscriptions:

```sql
insert into public.subscriptions (profile_id, tier, status)
values ('<athlete-user-uuid>', 'technique_review', 'mock_active');
```

Or use `supabase/seed_profiles.sql` after replacing placeholder UUIDs (see file comments).

### 5. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm test` | Run Vitest unit tests (integration tests skip if env not set) |
| `npm run test:watch` | Vitest watch mode |
| `npm run test:integration` | Run Supabase RLS integration tests (requires env below) |

### RLS integration tests (opt-in)

Unit tests (`npm test`) always run and skip integration tests when env is missing.

To run real Supabase RLS integration tests:

1. Start local Supabase and apply migrations:

```bash
supabase start
supabase db reset
```

2. Export test credentials (from `supabase status`):

```bash
export SUPABASE_TEST_URL=http://127.0.0.1:54321
export SUPABASE_TEST_ANON_KEY=<anon-key>
export SUPABASE_TEST_SERVICE_ROLE_KEY=<service-role-key>
```

On PowerShell:

```powershell
$env:SUPABASE_TEST_URL="http://127.0.0.1:54321"
$env:SUPABASE_TEST_ANON_KEY="<anon-key>"
$env:SUPABASE_TEST_SERVICE_ROLE_KEY="<service-role-key>"
```

3. Run:

```bash
npm run test:integration
```

Integration tests use attack → re-read → assert final state for profile role escalation, `is_minor` derivation, camp application self-approval, subscription tier regression, plan assignment, athlete isolation, and coach access.

## Project structure

```
src/
  app/              # Next.js App Router pages and server actions
  components/       # UI components (layout, auth, shadcn)
  content/copy.ts   # Marketing copy (i18n-ready)
  lib/
    auth/           # Minor consent, role helpers
    supabase/       # Client, server, middleware
  types/            # TypeScript types
mobile/             # Expo React Native app (Phase 1 companion)
supabase/
  migrations/     # SQL migrations
  seed.sql          # Credentials + camps seed data
  seed_profiles.sql # Profile/subscription template (manual UUIDs)
```

## Video upload (future)

Phase 1 does **not** implement video upload. The schema reserves `video_submissions.storage_path` and a private `videos` storage bucket.

Future implementation should support:

- Private Supabase Storage (or provider-based upload)
- Signed URLs for coach/athlete access
- Maximum file size and video length limits
- Resumable uploads (TUS or provider-native)
- Provider options: Mux, Bunny Stream, S3-compatible storage

## Medical / safety

- Footer links to Terms, Privacy, Refund Policy, Medical Disclaimer
- Signup and dashboard show sport-coaching disclaimer (not medical advice)
- Medical disclaimer page states the platform does not provide medical advice, injury diagnosis, physical therapy, or emergency care

## Minor safeguarding

- Under-18 athletes require guardian email and parental consent at signup (self-attested in Phase 1 — full guardian verification is not implemented)
- `is_minor` is derived server-side from `date_of_birth` via a database trigger on profile insert/update (write-time snapshot — see technical debt)
- Minors without `parental_consent` cannot access dashboard features (blocked state)
- Pending-consent minor signup via UI is not implemented in Phase 1

## Security (Phase 1)

- Profile `role` cannot be self-escalated to `coach` by authenticated athletes (trigger + RLS)
- `is_minor` is server-derived; client-supplied values are ignored on write
- `service_role` and null-JWT paths can still create coach profiles (trigger carve-out)
- Athletes cannot update `camp_applications.status` (coach-only update policy)
- `subscriptions.tier` and `athlete_assigned_plans` writes remain coach-only (regression-tested)

## Technical debt

- **`payment_audit_events`** — should become service-role append-only before real Stripe/payment integration
- **`is_minor`** — write-time snapshot in Phase 1; a 17-year-old will not automatically become non-minor in the stored field without a future refresh/recalculation job
- **Guardian verification** — Phase 1 uses self-attested parental consent only; no verified guardian email flow
- **Next.js middleware** — Next 16 `middleware` → `proxy` deprecation warning is non-blocking
- **Google Fonts** — `next/font` Google-hosted fonts may fail in offline/no-network CI builds; consider local/system fonts later

## Acceptance checklist

1. Landing page loads with credentials from `coach_credentials`
2. About, Pricing, Camps, legal pages accessible
3. Waitlist form stores emails
4. Adult athlete signup works
5. Minor signup requires guardian email + consent
6. Minor without consent blocked on dashboard (SQL-only test row or seed_profiles comment)
7. Logged-in athlete sees dashboard shell
8. Camps loaded from `camps` table
9. App builds with `npm run build`
10. Tests pass with `npm test`

## License

Private — Elite Paddle Coaching / Erika Medveczky.
