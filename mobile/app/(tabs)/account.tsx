import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MobileScreen } from "../../components/mobile-screen";
import { StatCard } from "../../components/feature-card";
import { GradientButton } from "../../components/gradient-button";
import { useSession } from "../../lib/use-session";
import { supabase } from "../../lib/supabase";
import { canAccessDashboard } from "../../lib/minor-consent";
import { auth, dashboard, footer } from "../../content/copy";
import { colors, spacing } from "../../constants/theme";

export default function AccountTab() {
  const router = useRouter();
  const { loading, profile } = useSession();

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/");
  }

  if (loading || !profile) {
    return (
      <MobileScreen title="Account">
        <Text style={styles.muted}>Loading profile…</Text>
      </MobileScreen>
    );
  }

  return (
    <MobileScreen title="Account" subtitle="Profile and app settings">
      <StatCard label="Athlete" value={profile.full_name} />
      <StatCard
        label={dashboard.profileStatus}
        value={profile.is_minor ? dashboard.minor : dashboard.adult}
      />
      {profile.is_minor && (
        <StatCard
          label="Parental consent"
          value={
            profile.parental_consent
              ? dashboard.consentGiven
              : dashboard.consentMissing
          }
        />
      )}

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>{auth.safetyDisclaimer}</Text>
      </View>

      <GradientButton label="Sign out" onPress={signOut} />

      <View style={styles.links}>
        <Pressable onPress={() => router.push("/terms")}>
          <Text style={styles.link}>{footer.terms}</Text>
        </Pressable>
        <Pressable onPress={() => router.push("/privacy")}>
          <Text style={styles.link}>{footer.privacy}</Text>
        </Pressable>
        <Pressable onPress={() => router.push("/about")}>
          <Text style={styles.link}>About coaching</Text>
        </Pressable>
      </View>

      {!canAccessDashboard(profile) && (
        <View style={styles.blocked}>
          <Text style={styles.blockedTitle}>{dashboard.minorConsentRequired}</Text>
          <Text style={styles.blockedBody}>{dashboard.minorConsentBody}</Text>
        </View>
      )}
    </MobileScreen>
  );
}

const styles = StyleSheet.create({
  muted: {
    color: colors.textMuted,
    fontFamily: "Manrope_400Regular",
  },
  disclaimer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  disclaimerText: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textMuted,
    fontFamily: "Manrope_400Regular",
  },
  links: {
    gap: spacing.md,
    marginTop: spacing.lg,
    alignItems: "center",
  },
  link: {
    fontSize: 15,
    color: colors.violet,
    fontFamily: "Manrope_600SemiBold",
  },
  blocked: {
    marginTop: spacing.lg,
    backgroundColor: "#fef2f2",
    borderRadius: 16,
    padding: spacing.md,
  },
  blockedTitle: {
    fontWeight: "700",
    color: colors.destructive,
    marginBottom: 8,
    fontFamily: "Manrope_700Bold",
  },
  blockedBody: {
    fontSize: 14,
    color: "#7f1d1d",
    lineHeight: 20,
    fontFamily: "Manrope_400Regular",
  },
});
