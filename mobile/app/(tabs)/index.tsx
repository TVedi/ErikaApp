import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MobileScreen } from "../../components/mobile-screen";
import { FeatureCard, StatCard } from "../../components/feature-card";
import { useSession } from "../../lib/use-session";
import { supabase, type Subscription } from "../../lib/supabase";
import { canAccessDashboard } from "../../lib/minor-consent";
import { formatTierLabel } from "../../lib/roles";
import { dashboard, brand } from "../../content/copy";
import { colors, spacing } from "../../constants/theme";

export default function HomeTab() {
  const router = useRouter();
  const { loading, profile } = useSession();
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    if (!profile) return;
    supabase
      .from("subscriptions")
      .select("*")
      .eq("profile_id", profile.id)
      .eq("status", "mock_active")
      .maybeSingle()
      .then(({ data }) => setSubscription(data as Subscription | null));
  }, [profile]);

  if (loading || !profile) {
    return (
      <MobileScreen title="Loading…">
        <Text style={styles.muted}>Preparing your coaching home…</Text>
      </MobileScreen>
    );
  }

  const hasAccess = canAccessDashboard(profile);

  return (
    <MobileScreen
      title={`${dashboard.welcome}, ${profile.full_name.split(" ")[0]}`}
      subtitle={brand.tagline}
    >
      {!hasAccess ? (
        <View style={styles.blocked}>
          <Text style={styles.blockedTitle}>{dashboard.minorConsentRequired}</Text>
          <Text style={styles.blockedBody}>{dashboard.minorConsentBody}</Text>
        </View>
      ) : (
        <>
          <StatCard
            label={dashboard.currentTier}
            value={
              subscription ? formatTierLabel(subscription.tier) : "No active plan"
            }
            hint={subscription?.status}
          />
          <StatCard
            label={dashboard.profileStatus}
            value={profile.is_minor ? dashboard.minor : dashboard.adult}
          />

          <Text style={styles.sectionLabel}>Your coaching</Text>

          <FeatureCard
            title={dashboard.cards.trainingPlan.title}
            description={dashboard.cards.trainingPlan.description}
          />
          <FeatureCard
            title={dashboard.cards.submitVideo.title}
            description={dashboard.cards.submitVideo.description}
            onPress={() => router.push("/(tabs)/videos")}
          />
          <FeatureCard
            title={dashboard.cards.latestFeedback.title}
            description={dashboard.cards.latestFeedback.description}
          />
          <FeatureCard
            title={dashboard.cards.progressTracking.title}
            description={dashboard.cards.progressTracking.description}
            onPress={() => router.push("/(tabs)/progress")}
            accent
          />
          <FeatureCard
            title={dashboard.cards.trainingCamps.title}
            description={dashboard.cards.trainingCamps.description}
            badge="View"
            onPress={() => router.push("/camps")}
          />
        </>
      )}
    </MobileScreen>
  );
}

const styles = StyleSheet.create({
  muted: {
    fontSize: 15,
    color: colors.textMuted,
    fontFamily: "Manrope_400Regular",
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: colors.textMuted,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
    fontFamily: "Manrope_700Bold",
  },
  blocked: {
    backgroundColor: "#fef2f2",
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  blockedTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.destructive,
    fontFamily: "Manrope_700Bold",
    marginBottom: spacing.sm,
  },
  blockedBody: {
    fontSize: 15,
    lineHeight: 22,
    color: "#7f1d1d",
    fontFamily: "Manrope_400Regular",
  },
});
