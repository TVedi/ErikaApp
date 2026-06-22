-- Phase 1 security hardening: profile privilege escalation + camp application self-approval
-- Adds server-derived is_minor and role coercion trigger; tightens camp_applications RLS.

-- ---------------------------------------------------------------------------
-- Helper: derive is_minor from date_of_birth (write-time snapshot, Phase 1)
-- ---------------------------------------------------------------------------

create or replace function public.derive_is_minor(dob date)
returns boolean
language sql
stable
set search_path = public
as $$
  select extract(year from age(current_date, dob)) < 18;
$$;

-- ---------------------------------------------------------------------------
-- profiles: BEFORE INSERT OR UPDATE trigger — block role escalation + client is_minor
-- ---------------------------------------------------------------------------

create or replace function public.profiles_guard_privileged_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Trusted path: seed/psql/admin scripts without an end-user JWT
  if auth.uid() is null then
    return NEW;
  end if;

  -- Trusted path: service_role bypasses RLS but triggers still fire
  if auth.role() = 'service_role' then
    return NEW;
  end if;

  if TG_OP = 'INSERT' then
    NEW.role := 'athlete';
  elsif TG_OP = 'UPDATE' then
    NEW.role := OLD.role;
  end if;

  NEW.is_minor := public.derive_is_minor(NEW.date_of_birth);

  return NEW;
end;
$$;

drop trigger if exists profiles_guard_privileged_fields on public.profiles;

create trigger profiles_guard_privileged_fields
  before insert or update on public.profiles
  for each row
  execute function public.profiles_guard_privileged_fields();

-- ---------------------------------------------------------------------------
-- camp_applications: remove broad athlete manage policy; split by operation
-- ---------------------------------------------------------------------------

drop policy if exists "Users manage own camp applications" on public.camp_applications;

create policy "Users read own or coach reads all camp applications"
  on public.camp_applications for select
  using (profile_id = auth.uid() or public.is_coach(auth.uid()));

create policy "Athletes insert own camp applications as interested"
  on public.camp_applications for insert
  with check (profile_id = auth.uid() and status = 'interested');

create policy "Coaches insert camp applications"
  on public.camp_applications for insert
  with check (public.is_coach(auth.uid()));

create policy "Coaches update camp applications"
  on public.camp_applications for update
  using (public.is_coach(auth.uid()))
  with check (public.is_coach(auth.uid()));

create policy "Coaches delete camp applications"
  on public.camp_applications for delete
  using (public.is_coach(auth.uid()));
