import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export type Profile = {
  id: string;
  full_name: string;
  role: "athlete" | "coach";
  date_of_birth: string;
  is_minor: boolean;
  parental_consent: boolean;
  guardian_email: string | null;
};

export type CoachCredential = {
  id: string;
  label: string;
  year: number | null;
  detail: string | null;
  sort_order: number;
};

export type Camp = {
  id: string;
  title: string;
  location: string;
  start_date: string;
  end_date: string;
  price: number | null;
  capacity: number | null;
  description: string | null;
};

export type Subscription = {
  id: string;
  profile_id: string;
  tier: string;
  status: string;
};
