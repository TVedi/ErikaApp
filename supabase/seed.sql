-- Seed data for Elite Paddle Coaching Phase 1
-- Auth users must be created separately (see README). This seeds public reference data.

-- Coach credentials — verified from Erika Medveczky's official CV (editable in coach_credentials table)
insert into public.coach_credentials (label, detail, year, sort_order, featured) values
  ('Olympic Finalist', 'K2 500m — Tokyo 2020, 4th place', 2020, 1, true),
  ('8× World Champion', 'Sprint kayak', null, 2, true),
  ('6× European Champion', null, null, 3, true),
  ('3× World Championship Bronze', null, null, 4, false),
  ('4× European Silver, 1× Bronze', null, null, 5, false),
  ('21× Hungarian Champion', 'Youth & senior', null, 6, false),
  ('Lifetime Champion of Hungarian Canoe-Kayak', null, 2018, 7, false),
  ('27+ Years in the Sport', null, null, 8, false);

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
