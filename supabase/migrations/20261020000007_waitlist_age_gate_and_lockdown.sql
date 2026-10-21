-- Records schema changes that were applied by hand to the live database.
-- Every statement is idempotent, so this is safe to run against a database
-- that already has them.
--
-- 1. The waitlist columns for the age-first sign-up (name, age, parent or
--    guardian details, consent and its timestamp), and two checks so the
--    database itself refuses an athlete under 13, or an athlete under 18
--    without a parent or guardian.
-- 2. Lockdown of the two public intake tables. The site writes to them only
--    through the server with the service_role key, which bypasses RLS. The
--    anonymous insert policies were never needed and would let anyone skip
--    the age gate and bot protection if a grant to anon were ever issued, so
--    they are dropped and any anon/authenticated privileges are revoked.

alter table public.waitlist
  add column if not exists full_name text,
  add column if not exists athlete_age integer,
  add column if not exists guardian_name text,
  add column if not exists guardian_email text,
  add column if not exists privacy_consent boolean,
  add column if not exists consent_at timestamptz;

alter table public.waitlist drop constraint if exists waitlist_min_age;
alter table public.waitlist add constraint waitlist_min_age
  check (athlete_age is null or athlete_age >= 13);

alter table public.waitlist drop constraint if exists waitlist_minor_guardian;
alter table public.waitlist add constraint waitlist_minor_guardian
  check (athlete_age is null or athlete_age >= 18
         or (guardian_name is not null and guardian_email is not null));

drop policy if exists "Anyone can join waitlist" on public.waitlist;
drop policy if exists "Public insert coaching inquiries with consent" on public.coaching_inquiries;

revoke all on public.waitlist from anon, authenticated;
revoke all on public.coaching_inquiries from anon, authenticated;
