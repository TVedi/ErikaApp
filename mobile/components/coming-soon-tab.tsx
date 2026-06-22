import { View, Text, StyleSheet } from "react-native";
import { MobileScreen } from "./mobile-screen";
import { FeatureCard } from "./feature-card";
import { colors, spacing } from "../constants/theme";

export function ComingSoonTab({
  title,
  description,
  details,
}: {
  title: string;
  description: string;
  details?: string[];
}) {
  return (
    <MobileScreen title={title} subtitle={description}>
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>◎</Text>
        <Text style={styles.heroTitle}>Coming in a later phase</Text>
        <Text style={styles.heroBody}>
          This area is part of the coaching app structure. Phase 1 shows the navigation and layout only.
        </Text>
      </View>
      {details?.map((item) => (
        <FeatureCard key={item} title={item} description="Structured coach workflow — coming soon." />
      ))}
    </MobileScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  heroEmoji: {
    fontSize: 40,
    color: colors.violet,
    marginBottom: spacing.sm,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    fontFamily: "Manrope_700Bold",
    marginBottom: spacing.sm,
  },
  heroBody: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    textAlign: "center",
    fontFamily: "Manrope_400Regular",
  },
});
