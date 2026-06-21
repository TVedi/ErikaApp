-- Row Level Security policies — Elite Paddle Coaching Phase 1

alter table public.profiles enable row level security;
alter table public.coach_credentials enable row level security;
alter table public.camps enable row level security;
alter table public.waitlist enable row level security;
alter table public.subscriptions enable row level security;
alter table public.training_plans enable row level security;
alter table public.training_plan_weeks enable row level security;
alter table public.training_sessions enable row level security;
alter table public.athlete_assigned_plans enable row level security;
alter table public.session_logs enable row level security;
alter table public.video_submissions enable row level security;
alter table public.video_feedback enable row level security;
alter table public.timecoded_comments enable row level security;
alter table public.progress_metrics enable row level security;
alter table public.camp_applications enable row level security;
alter table public.payment_audit_events enable row level security;

-- profiles
create policy "Athletes read own profile"
  on public.profiles for select
  using (auth.uid() = id or public.is_coach(auth.uid()));

create policy "Athletes update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users insert own profile on signup"
  on public.profiles for insert
  with check (auth.uid() = id);

-- coach_credentials — public read, coach manage
create policy "Anyone can read coach credentials"
  on public.coach_credentials for select
  using (true);

create policy "Coaches manage coach credentials"
  on public.coach_credentials for all
  using (public.is_coach(auth.uid()))
  with check (public.is_coach(auth.uid()));

-- camps — public read, coach manage
create policy "Anyone can read camps"
  on public.camps for select
  using (true);

create policy "Coaches manage camps"
  on public.camps for all
  using (public.is_coach(auth.uid()))
  with check (public.is_coach(auth.uid()));

-- waitlist — anyone can insert
create policy "Anyone can join waitlist"
  on public.waitlist for insert
  with check (true);

create policy "Coaches read waitlist"
  on public.waitlist for select
  using (public.is_coach(auth.uid()));

-- subscriptions
create policy "Athletes read own subscription"
  on public.subscriptions for select
  using (profile_id = auth.uid() or public.is_coach(auth.uid()));

create policy "Coaches manage subscriptions"
  on public.subscriptions for all
  using (public.is_coach(auth.uid()))
  with check (public.is_coach(auth.uid()));

-- training_plans — coach manage, athletes read assigned (future)
create policy "Coaches manage training plans"
  on public.training_plans for all
  using (public.is_coach(auth.uid()))
  with check (public.is_coach(auth.uid()));

create policy "Athletes read training plans"
  on public.training_plans for select
  using (
    public.is_coach(auth.uid())
    or exists (
      select 1 from public.athlete_assigned_plans aap
      where aap.training_plan_id = training_plans.id
        and aap.athlete_id = auth.uid()
    )
  );

-- training_plan_weeks
create policy "Coaches manage training plan weeks"
  on public.training_plan_weeks for all
  using (public.is_coach(auth.uid()))
  with check (public.is_coach(auth.uid()));

create policy "Athletes read assigned plan weeks"
  on public.training_plan_weeks for select
  using (
    public.is_coach(auth.uid())
    or exists (
      select 1 from public.athlete_assigned_plans aap
      where aap.training_plan_id = training_plan_weeks.training_plan_id
        and aap.athlete_id = auth.uid()
    )
  );

-- training_sessions
create policy "Coaches manage training sessions"
  on public.training_sessions for all
  using (public.is_coach(auth.uid()))
  with check (public.is_coach(auth.uid()));

create policy "Athletes read assigned sessions"
  on public.training_sessions for select
  using (
    public.is_coach(auth.uid())
    or exists (
      select 1 from public.training_plan_weeks tpw
      join public.athlete_assigned_plans aap on aap.training_plan_id = tpw.training_plan_id
      where tpw.id = training_sessions.training_plan_week_id
        and aap.athlete_id = auth.uid()
    )
  );

-- athlete_assigned_plans
create policy "Athletes read own assigned plans"
  on public.athlete_assigned_plans for select
  using (athlete_id = auth.uid() or public.is_coach(auth.uid()));

create policy "Coaches manage assigned plans"
  on public.athlete_assigned_plans for all
  using (public.is_coach(auth.uid()))
  with check (public.is_coach(auth.uid()));

-- session_logs
create policy "Athletes manage own session logs"
  on public.session_logs for all
  using (athlete_id = auth.uid() or public.is_coach(auth.uid()))
  with check (athlete_id = auth.uid() or public.is_coach(auth.uid()));

-- video_submissions
create policy "Athletes manage own video submissions"
  on public.video_submissions for all
  using (athlete_id = auth.uid() or public.is_coach(auth.uid()))
  with check (athlete_id = auth.uid() or public.is_coach(auth.uid()));

-- video_feedback
create policy "Athletes read feedback on own submissions"
  on public.video_feedback for select
  using (
    public.is_coach(auth.uid())
    or exists (
      select 1 from public.video_submissions vs
      where vs.id = video_feedback.video_submission_id
        and vs.athlete_id = auth.uid()
    )
  );

create policy "Coaches manage video feedback"
  on public.video_feedback for all
  using (public.is_coach(auth.uid()))
  with check (public.is_coach(auth.uid()));

-- timecoded_comments
create policy "Athletes read comments on own feedback"
  on public.timecoded_comments for select
  using (
    public.is_coach(auth.uid())
    or exists (
      select 1 from public.video_feedback vf
      join public.video_submissions vs on vs.id = vf.video_submission_id
      where vf.id = timecoded_comments.video_feedback_id
        and vs.athlete_id = auth.uid()
    )
  );

create policy "Coaches manage timecoded comments"
  on public.timecoded_comments for all
  using (public.is_coach(auth.uid()))
  with check (public.is_coach(auth.uid()));

-- progress_metrics
create policy "Athletes manage own progress metrics"
  on public.progress_metrics for all
  using (athlete_id = auth.uid() or public.is_coach(auth.uid()))
  with check (athlete_id = auth.uid() or public.is_coach(auth.uid()));

-- camp_applications
create policy "Users manage own camp applications"
  on public.camp_applications for all
  using (profile_id = auth.uid() or public.is_coach(auth.uid()))
  with check (profile_id = auth.uid() or public.is_coach(auth.uid()));

-- payment_audit_events
create policy "Users read own payment events"
  on public.payment_audit_events for select
  using (profile_id = auth.uid() or public.is_coach(auth.uid()));

create policy "Coaches manage payment events"
  on public.payment_audit_events for all
  using (public.is_coach(auth.uid()))
  with check (public.is_coach(auth.uid()));

-- Storage: videos bucket — private, coach read, athlete upload own (future)
create policy "Athletes upload own videos"
  on storage.objects for insert
  with check (
    bucket_id = 'videos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Athletes read own videos"
  on storage.objects for select
  using (
    bucket_id = 'videos'
    and (
      auth.uid()::text = (storage.foldername(name))[1]
      or public.is_coach(auth.uid())
    )
  );

create policy "Coaches read all videos"
  on storage.objects for select
  using (
    bucket_id = 'videos'
    and public.is_coach(auth.uid())
  );
