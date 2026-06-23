export type UserRole = "athlete" | "coach";

export type SubscriptionTier =
  | "starter"
  | "technique_review"
  | "elite_coaching";

export type SubscriptionStatus =
  | "mock_active"
  | "active"
  | "past_due"
  | "canceled";

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  date_of_birth: string;
  is_minor: boolean;
  parental_consent: boolean;
  guardian_email: string | null;
  created_at: string;
}

export interface CoachCredential {
  id: string;
  label: string;
  year: number | null;
  detail: string | null;
  sort_order: number;
  featured: boolean;
  created_at: string;
}

export interface Camp {
  id: string;
  title: string;
  location: string;
  start_date: string;
  end_date: string;
  price: number | null;
  capacity: number | null;
  description: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  profile_id: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  created_at: string;
}
