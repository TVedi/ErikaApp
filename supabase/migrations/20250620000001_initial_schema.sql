-- Elite Paddle Coaching — Phase 1 schema
-- Video upload: future private storage, signed URLs, max size/length, resumable (TUS).
-- Future providers: Mux, Bunny Stream, S3-compatible storage.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Helper functions
-- ---------------------------------------------------------------------------

create or replace function public.is_coach(user_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = user_id and role = 'coach'
  );
$$;

create or replace function public.is_current_user(profile_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select profile_id = auth.uid();
$$;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'athlete' check (role in ('athlete', 'coach')),
  date_of_birth date not null,
  is_minor boolean not null,
  parental_consent boolean not null default false,
  guardian_email text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- coach_credentials (editable marketing credentials)
-- ---------------------------------------------------------------------------

create table public.coach_credentials (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  year integer,
  detail text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- camps
-- ---------------------------------------------------------------------------

create table public.camps (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  location text not null,
  start_date date not null,
  end_date date not null,
  price numeric,
  capacity integer,
  description text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- waitlist
-- ---------------------------------------------------------------------------

create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- subscriptions (schema only — no Stripe in Phase 1)
-- ---------------------------------------------------------------------------

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  tier text not null check (tier in ('starter', 'technique_review', 'elite_coaching')),
  status text not null check (status in ('mock_active', 'active', 'past_due', 'canceled')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- training plans (schema for future phases)
-- ---------------------------------------------------------------------------

create table public.training_plans (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  level text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.training_plan_weeks (
  id uuid primary key default gen_random_uuid(),
  training_plan_id uuid references public.training_plans(id) on delete cascade not null,
  week_number integer not null,
  focus text,
  created_at timestamptz not null default now()
);

create table public.training_sessions (
  id uuid primary key default gen_random_uuid(),
  training_plan_week_id uuid references public.training_plan_weeks(id) on delete cascade not null,
  title text not null,
  description text,
  session_type text,
  target_distance_meters integer,
  target_duration_minutes integer,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.athlete_assigned_plans (
  id uuid primary key default gen_random_uuid(),
  athlete_id uuid references public.profiles(id) on delete cascade not null,
  training_plan_id uuid references public.training_plans(id) on delete cascade not null,
  assigned_by uuid references public.profiles(id),
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table public.session_logs (
  id uuid primary key default gen_random_uuid(),
  athlete_id uuid references public.profiles(id) on delete cascade not null,
  training_session_id uuid references public.training_sessions(id) on delete set null,
  completed_at timestamptz,
  notes text,
  rpe integer,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- video_submissions — storage_path reserved for future private upload
-- ---------------------------------------------------------------------------

create table public.video_submissions (
  id uuid primary key default gen_random_uuid(),
  athlete_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  boat_type text,
  event_focus text,
  description text,
  athlete_question text,
  status text not null default 'submitted' check (status in ('submitted', 'in_review', 'reviewed')),
  storage_path text, -- TODO: future private storage path for uploaded video
  created_at timestamptz not null default now()
);

create table public.video_feedback (
  id uuid primary key default gen_random_uuid(),
  video_submission_id uuid references public.video_submissions(id) on delete cascade not null,
  coach_id uuid references public.profiles(id),
  overall_summary text,
  technical_strengths text,
  technical_corrections text,
  priority_drills text,
  next_training_focus text,
  created_at timestamptz not null default now()
);

create table public.timecoded_comments (
  id uuid primary key default gen_random_uuid(),
  video_feedback_id uuid references public.video_feedback(id) on delete cascade not null,
  timestamp_seconds integer not null,
  category text,
  comment text not null,
  created_at timestamptz not null default now()
);

create table public.progress_metrics (
  id uuid primary key default gen_random_uuid(),
  athlete_id uuid references public.profiles(id) on delete cascade not null,
  training_date date not null,
  session_type text,
  distance_meters integer,
  duration_seconds integer,
  average_heart_rate integer,
  max_heart_rate integer,
  stroke_rate integer,
  rpe integer,
  notes text,
  created_at timestamptz not null default now()
);

create table public.camp_applications (
  id uuid primary key default gen_random_uuid(),
  camp_id uuid references public.camps(id) on delete cascade not null,
  profile_id uuid references public.profiles(id) on delete cascade,
  status text not null default 'interested',
  created_at timestamptz not null default now()
);

create table public.payment_audit_events (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  event_type text not null,
  provider text not null default 'mock',
  raw_payload jsonb,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Private storage bucket for future video uploads (not used in Phase 1)
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'videos',
  'videos',
  false,
  524288000, -- 500 MB — TODO: configure max file size for production
  array['video/mp4', 'video/quicktime', 'video/webm']
)
on conflict (id) do nothing;
