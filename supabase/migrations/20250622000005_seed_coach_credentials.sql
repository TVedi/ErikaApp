-- Pre-launch seed; once Erika edits live, manage via admin UI, not by re-running this.
-- Verified coach credentials from Erika Medveczky's official CV.

alter table public.coach_credentials
  add column if not exists featured boolean not null default false;

delete from public.coach_credentials;

insert into public.coach_credentials (label, detail, year, sort_order, featured) values
  ('Olympic Finalist', 'K2 500m — Tokyo 2020, 4th place', 2020, 1, true),
  ('8× World Champion', 'Sprint kayak', null, 2, true),
  ('6× European Champion', null, null, 3, true),
  ('3× World Championship Bronze', null, null, 4, false),
  ('4× European Silver, 1× Bronze', null, null, 5, false),
  ('21× Hungarian Champion', 'Youth & senior', null, 6, false),
  ('Lifetime Champion of Hungarian Canoe-Kayak', null, 2018, 7, false),
  ('27+ Years in the Sport', null, null, 8, false);
