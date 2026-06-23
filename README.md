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
- Tests for minor consent logic, role helpers, and RLS expectations

### Intentionally not built (later phases)

- Full Stripe Billing / checkout API / webhook integration (see Marketing launch for Payment Link only)
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

### 4. Seed mock users (safe — no passwords in repo)

**Never commit real passwords.** Create test users through the app or Supabase Dashboard.

#### Via signup UI (easiest)

1. **Adult athlete** — `/signup` with DOB making them 18+
2. **Minor with consent** — `/signup` with DOB under 18, guardian email, consent checked
3. **Minor without consent** — sign up as minor but do not check consent (dashboard will block)
4. **Coach** — sign up as adult, then in SQL Editor:

```sql
update public.profiles set role = 'coach' where email = 'your-coach-email@example.com';
-- Note: email is in auth.users, not profiles — use:
update public.profiles set role = 'coach'
where id = (select id from auth.users where email = 'coach@example.com');
```

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
| `npm test` | Run Vitest tests |
| `npm run test:watch` | Vitest watch mode |

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

- Under-18 athletes require guardian email and parental consent at signup
- `is_minor` is calculated from `date_of_birth`
- Minors without `parental_consent` cannot access dashboard features (blocked state)

## Acceptance checklist

1. Landing page loads with credentials from `coach_credentials`
2. About, Pricing, Camps, legal pages accessible
3. Waitlist form stores emails
4. Adult athlete signup works
5. Minor signup requires guardian email + consent
6. Minor without consent blocked on dashboard
7. Logged-in athlete sees dashboard shell
8. Camps loaded from `camps` table
9. App builds with `npm run build`
10. Tests pass with `npm test`

## Marketing launch (Stripe Payment Link)

Phase 1 core platform does **not** include Stripe Billing, SDK, webhooks, or automatic subscription unlock.

The **marketing launch** branch adds a public **Stripe Payment Link** URL only via `NEXT_PUBLIC_STRIPE_STARTER_PAYMENT_LINK`. This is manual checkout — not full Stripe integration. Full Stripe Billing/webhook integration remains a later phase.

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Required for public pages that fetch `coach_credentials` / `camps` at render time |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (public pages) |
| `NEXT_PUBLIC_STRIPE_STARTER_PAYMENT_LINK` | Public Stripe hosted checkout URL for “Start Coaching” |
| `NEXT_PUBLIC_STARTER_PRICE_LABEL` | Optional price display (e.g. `$99`) |
| `NEXT_PUBLIC_SITE_URL` | Production URL for Origin checks on `/apply` |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only — required for `/apply` coaching inquiry inserts |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Optional Cloudflare Turnstile |

**Important:** `NEXT_PUBLIC_*` values are baked at **build time** in Next.js. After setting the Stripe link in Vercel, **redeploy** for the CTA to update.

Configure the Stripe Payment Link success URL to:

`https://YOUR_DOMAIN/welcome`

`/welcome` is a post-checkout informational return page only — it does not verify payment, unlock the dashboard, or update subscriptions.

### Vercel preview readiness

**Public marketing pages** (home, about, pricing, camps) need `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` if credentials/camps are loaded from Supabase at render time.

**`/apply` submissions** require:

- Cloud Supabase migrations applied (`20250622000004`, `20250622000005`)
- `SUPABASE_SERVICE_ROLE_KEY` set server-side in Vercel
- Turnstile env vars only if captcha is enabled

Do not apply production migrations or configure Vercel in code — set env vars in the Vercel dashboard and redeploy.

### `/apply` coaching inquiries

- Table: `coaching_inquiries` (migration `20250622000004_coaching_inquiries.sql`)
- Coach credentials: migration `20250622000005_seed_coach_credentials.sql` adds `featured` column and verified CV data
- Submissions go through a server action — not direct browser-to-Supabase
- RLS at launch: **public INSERT only** with consent flags; no anon SELECT/UPDATE/DELETE
- **Coach/admin viewing of inquiries is intentionally deferred** until `security/rls-hardening` is merged and profile role escalation is fixed
- Server-side inserts use **service role** (bypasses RLS); coach-facing inquiry UI/policies come after the security PR

### Launch security protections

- Server-side Zod validation
- Honeypot field (silent success, no insert)
- Optional Cloudflare Turnstile
- In-memory per-IP rate limiting (technical debt — replace with durable limiter before serious traffic)
- Origin/Host allowlist on submissions
- Generic user-facing errors only
- Security headers via `next.config.ts` (conservative CSP allowing Turnstile + Stripe checkout frames)
- No file upload on `/apply`
- `/welcome` does not unlock dashboard or update subscriptions

### Legal pages

Terms, Privacy, Refund Policy, and Medical Disclaimer show **DRAFT** placeholders until reviewed by a human before live payments.

## License

Private — Elite Paddle Coaching / Erika Medveczky.
