-- coaching_inquiries — public marketing intake (launch)
-- Anon: INSERT only with required consent flags. No public readback.
--
-- Pre-launch safety: coach/admin read policies for coaching_inquiries are intentionally
-- deferred until security/rls-hardening is merged and profile role escalation is fixed.
-- Service role can still manage server-side (bypasses RLS).

create table public.coaching_inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  location text,
  athlete_age integer,
  guardian_email text,
  athlete_level text,
  main_goal text,
  event_focus text,
  has_video boolean,
  interests text[],
  message text,
  medical_disclaimer_accepted boolean not null default false,
  privacy_consent boolean not null default false,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.coaching_inquiries enable row level security;

-- Anonymous / authenticated users: insert only when required fields and consents present
create policy "Public insert coaching inquiries with consent"
  on public.coaching_inquiries for insert
  with check (
    full_name is not null
    and trim(full_name) <> ''
    and email is not null
    and trim(email) <> ''
    and medical_disclaimer_accepted = true
    and privacy_consent = true
  );

-- No SELECT, UPDATE, or DELETE policies for anon/authenticated users at launch.
-- Coach/admin inquiry management will be added after security/rls-hardening merges.
