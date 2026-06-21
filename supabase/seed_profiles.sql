-- Template: seed mock user profiles and subscriptions after creating auth users
-- NEVER commit real passwords. Create users via Supabase Dashboard or signup UI first.
--
-- Steps:
-- 1. Run migrations and seed.sql (credentials + camps)
-- 2. Create auth users (see README)
-- 3. Replace the UUID placeholders below with actual auth.users IDs
-- 4. Run this script in Supabase SQL Editor or: psql -f supabase/seed_profiles.sql

-- Placeholder UUIDs — replace before running
-- Coach user ID:     00000000-0000-4000-8000-000000000001
-- Adult athlete ID:  00000000-0000-4000-8000-000000000002
-- Minor athlete ID:  00000000-0000-4000-8000-000000000003

insert into public.profiles (id, full_name, role, date_of_birth, is_minor, parental_consent, guardian_email)
values
  (
    '00000000-0000-4000-8000-000000000001',
    'Erika Medveczky',
    'coach',
    '1985-03-15',
    false,
    false,
    null
  ),
  (
    '00000000-0000-4000-8000-000000000002',
    'Adult Test Athlete',
    'athlete',
    '1995-08-20',
    false,
    false,
    null
  ),
  (
    '00000000-0000-4000-8000-000000000003',
    'Minor Test Athlete',
    'athlete',
    '2012-01-10',
    true,
    true,
    'guardian@example.com'
  )
on conflict (id) do nothing;

insert into public.subscriptions (profile_id, tier, status)
values
  ('00000000-0000-4000-8000-000000000002', 'technique_review', 'mock_active'),
  ('00000000-0000-4000-8000-000000000003', 'starter', 'mock_active')
on conflict do nothing;

-- Optional: minor WITHOUT consent (for testing blocked dashboard)
-- Create via signup UI with consent unchecked, or:
-- insert into public.profiles (id, full_name, role, date_of_birth, is_minor, parental_consent, guardian_email)
-- values ('00000000-0000-4000-8000-000000000004', 'Blocked Minor', 'athlete', '2014-05-01', true, false, 'guardian@example.com');
