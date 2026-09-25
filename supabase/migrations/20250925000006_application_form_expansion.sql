-- Records schema changes that were applied by hand to the live database.
-- Every statement is idempotent, so this is safe to run against a database
-- that already has them.
--
-- 1. service_role grants. RLS policies alone are not enough: PostgreSQL
--    checks table-level privileges first, and without these the server
--    actions fail with error 42501 even though the policies allow the write.
-- 2. The 26 columns the rebuilt application form writes to.
--
-- Columns are all nullable on purpose. Required-ness is enforced by the form
-- and by the zod schema, not by the database, so that a mismatch between code
-- and schema loses no data - an incomplete application is far better than a
-- rejected one.

grant select, insert, update on public.coaching_inquiries to service_role;
grant select, insert on public.waitlist to service_role;

alter table public.coaching_inquiries
  -- Contact
  add column if not exists guardian_name text,
  -- Coaching interest
  add column if not exists service_interest text,
  -- Performance snapshot
  add column if not exists best_500m text,
  add column if not exists best_2000m text,
  add column if not exists times_context text,
  add column if not exists recent_result text,
  -- Training background
  add column if not exists years_paddling text,
  add column if not exists sessions_per_week text,
  add column if not exists hours_per_week text,
  add column if not exists structured_plan boolean,
  add column if not exists has_coach boolean,
  add column if not exists additional_support text,
  -- Training environment
  add column if not exists water_access text,
  add column if not exists gym_access boolean,
  add column if not exists uses_device boolean,
  add column if not exists device_platform text,
  add column if not exists shares_data boolean,
  add column if not exists training_company text,
  -- Goals
  add column if not exists improvement_goal text,
  add column if not exists has_target_race boolean,
  add column if not exists target_race text,
  -- Challenge
  add column if not exists current_challenge text,
  -- Commitment
  add column if not exists committed_sessions text,
  add column if not exists willing_feedback boolean,
  -- Final
  add column if not exists why_interested text,
  add column if not exists no_guarantee_acknowledged boolean;
