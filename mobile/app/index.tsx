import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { AuthHero, HomeIndicator, StatusBarRow } from "../components/auth-hero";
import { GradientButton } from "../components/gradient-button";
import { brand, hero, nav, valueProposition } from "../content/copy";
import { colors, spacing } from "../constants/theme";

export default function LandingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#eff6ff", "#ffffff", "#faf5ff"]}
        style={StyleSheet.absoluteFill}
      />
      <StatusBarRow />
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + spacing.lg },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <AuthHero />

        <View style={styles.introCard}>
          <Text style={styles.introTitle}>{valueProposition.title}</Text>
          <Text style={styles.introBody}>{valueProposition.body}</Text>
        </View>

        <GradientButton
          label={hero.ctaStart}
          onPress={() => router.push("/signup")}
        />
        <Pressable
          style={styles.secondaryBtn}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.secondaryBtnText}>{nav.login}</Text>
        </Pressable>

        <Text style={styles.exploreLabel}>Explore</Text>
        {[
          { label: nav.about, href: "/about" as const },
          { label: nav.pricing, href: "/pricing" as const },
          { label: nav.camps, href: "/camps" as const },
        ].map((item) => (
          <Pressable
            key={item.href}
            style={styles.linkRow}
            onPress={() => router.push(item.href)}
          >
            <Text style={styles.linkText}>{item.label}</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}

        <Text style={styles.footerNote}>{brand.positioning}</Text>
      </ScrollView>
      <HomeIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    paddingHorizontal: spacing.md + 4,
  },
  introCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
    fontFamily: "Manrope_700Bold",
  },
  introBody: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    fontFamily: "Manrope_400Regular",
  },
  secondaryBtn: {
    marginTop: spacing.sm,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    fontFamily: "Manrope_600SemiBold",
  },
  exploreLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: colors.textMuted,
    marginBottom: spacing.sm,
    fontFamily: "Manrope_700Bold",
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  linkText: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.text,
    fontFamily: "Manrope_600SemiBold",
  },
  chevron: {
    fontSize: 22,
    color: colors.textMuted,
  },
  footerNote: {
    marginTop: spacing.lg,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textMuted,
    textAlign: "center",
    fontFamily: "Manrope_400Regular",
  },
});
