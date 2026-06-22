-- Seed data for Elite Paddle Coaching Phase 1
-- Auth users must be created separately (see README). This seeds public reference data.

-- Coach credentials (editable placeholders — replace with verified records in production)
insert into public.coach_credentials (label, year, detail, sort_order) values
  (
    'Example credential — replace with verified record',
    null,
    'Olympic athlete credential placeholder — edit in coach_credentials table',
    1
  ),
  (
    'World-level racing experience placeholder',
    null,
    'Example credential — replace with verified competition record',
    2
  ),
  (
    'Elite coaching credential placeholder',
    null,
    'Example credential — replace with verified coaching qualification',
    3
  );

-- Training camps in Gainesville, Georgia
insert into public.camps (title, location, start_date, end_date, price, capacity, description) values
  (
    'Spring Sprint Technique Camp',
    'Gainesville, Georgia',
    '2026-04-10',
    '2026-04-12',
    450.00,
    12,
    'Three-day intensive technique camp focused on catch, rotation, and race preparation. Limited capacity with direct coach feedback on the water and in video review sessions.'
  ),
  (
    'Summer Elite Performance Camp',
    'Gainesville, Georgia',
    '2026-07-15',
    '2026-07-19',
    750.00,
    10,
    'Five-day elite performance camp covering technique refinement, structured training sessions, boat stability work, and personalized coach consultation. Registration opening in a future phase.'
  );
