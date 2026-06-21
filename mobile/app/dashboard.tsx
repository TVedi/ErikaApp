import { useEffect, useState } from "react";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import {
  ScreenScroll,
  Card,
  Title,
  Subtitle,
  Body,
  Badge,
  Button,
} from "../components/ui";
import { supabase, type Profile, type Subscription } from "../lib/supabase";
import { canAccessDashboard } from "../lib/minor-consent";
import { formatTierLabel } from "../lib/roles";
import { dashboard, nav } from "../content/copy";
import { colors } from "../constants/theme";

export default function DashboardScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!profileData) {
        router.replace("/signup");
        return;
      }

      setProfile(profileData as Profile);

      const { data: subData } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("profile_id", user.id)
        .eq("status", "mock_active")
        .maybeSingle();

      setSubscription(subData as Subscription | null);
      setLoading(false);
    }
    load();
  }, [router]);

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/");
  }

  if (loading || !profile) {
    return (
      <ScreenScroll>
        <Body>Loading…</Body>
      </ScreenScroll>
    );
  }

  const hasAccess = canAccessDashboard(profile);

  return (
    <ScreenScroll>
      <Title>{dashboard.welcome}, {profile.full_name}</Title>
      <Body>{dashboard.cards.trainingPlan.description}</Body>

      {!hasAccess ? (
        <Card>
          <Text style={{ fontWeight: "700", color: colors.destructive, fontSize: 18 }}>
            {dashboard.minorConsentRequired}
          </Text>
          <Body>{dashboard.minorConsentBody}</Body>
        </Card>
      ) : (
        <>
          <Card>
            <Text style={{ color: colors.textMuted, fontSize: 14 }}>{dashboard.currentTier}</Text>
            <Text style={{ fontSize: 20, fontWeight: "700", color: colors.navy }}>
              {subscription ? formatTierLabel(subscription.tier) : "No active plan"}
            </Text>
            {subscription && <Badge>{subscription.status}</Badge>}
          </Card>

          <Card>
            <Text style={{ color: colors.textMuted, fontSize: 14 }}>{dashboard.profileStatus}</Text>
            <Text style={{ fontSize: 18, fontWeight: "600", color: colors.navy }}>
              {profile.is_minor ? dashboard.minor : dashboard.adult}
            </Text>
          </Card>

          {[
            dashboard.cards.trainingPlan,
            dashboard.cards.submitVideo,
            dashboard.cards.latestFeedback,
            dashboard.cards.progressTracking,
          ].map((card) => (
            <Card key={card.title}>
              <Text style={{ fontWeight: "600", color: colors.navy, fontSize: 16 }}>{card.title}</Text>
              <Badge>{dashboard.comingSoon}</Badge>
              <Body>{card.description}</Body>
            </Card>
          ))}

          <Card>
            <Text style={{ fontWeight: "600", color: colors.navy, fontSize: 16 }}>
              {dashboard.cards.trainingCamps.title}
            </Text>
            <Body>{dashboard.cards.trainingCamps.description}</Body>
            <Button label={nav.camps} onPress={() => router.push("/camps")} />
          </Card>
        </>
      )}

      <Button label="Sign out" variant="outline" onPress={signOut} />
    </ScreenScroll>
  );
}
