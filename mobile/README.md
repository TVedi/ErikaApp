# Elite Paddle Coaching — Mobile (Expo)

Companion mobile app for Phase 1 — **native-style mobile UX**, not a responsive website.

## App structure

- **Public landing** (`/`) — premium mobile hero + explore links
- **Auth** (`/signup`, `/login`) — step-by-step glass-card flow
- **Main app tabs** (after sign-in):
  - **Home** — coaching dashboard cards
  - **Plans** — coming soon
  - **Videos** — coming soon
  - **Progress** — coming soon
  - **Account** — profile, sign out, legal links

Bottom tab navigation matches the Family app philosophy: large touch targets, vertical flow, rounded cards.


```bash
cd mobile
npm install
cp .env.example .env
# Add your Supabase URL and anon key (same as web `.env.local`)
npm start
```

Then:

- **Phone**: Install [Expo Go](https://expo.dev/go), scan the QR code from the terminal
- **Android emulator**: Press `a` in the terminal
- **Web preview**: Press `w` (mobile-sized layout in browser)

## Environment variables

| Variable | Description |
|----------|-------------|
| `EXPO_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |

Use the **same values** as the web app (`NEXT_PUBLIC_SUPABASE_*`).

## Screens (Phase 1)

- Home with credentials, waitlist, navigation
- About, Pricing, Camps (from database)
- Sign in / Sign up (minor consent logic)
- Dashboard shell (mock tier, coming-soon cards)

## Not in Phase 1

Same as web: no Stripe, video upload, coach review, AI, or camp payments.

## Project relationship

- **Web** (`/`) — primary foundation, keep as source of truth for schema and copy
- **Mobile** (`/mobile`) — Expo app sharing Supabase backend
