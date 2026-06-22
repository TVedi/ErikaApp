import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { supabase, type Profile } from "./supabase";

export function useSession() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!data) {
        router.replace("/signup");
        return;
      }

      if (mounted) {
        setProfile(data as Profile);
        setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [router]);

  return { loading, profile };
}
