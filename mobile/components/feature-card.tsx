import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors, spacing } from "../constants/theme";

export function FeatureCard({
  title,
  description,
  badge = "Coming soon",
  onPress,
  accent,
}: {
  title: string;
  description: string;
  badge?: string;
  onPress?: () => void;
  accent?: boolean;
}) {
  const content = (
    <View style={[styles.card, accent && styles.cardAccent]}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>
        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
        {content}
      </Pressable>
    );
  }

  return content;
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      {hint ? <Text style={styles.statHint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.md + 4,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  cardAccent: {
    borderColor: "#ddd6fe",
    backgroundColor: "#faf5ff",
  },
  pressed: {
    opacity: 0.92,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    fontFamily: "Manrope_700Bold",
    flex: 1,
  },
  badge: {
    backgroundColor: colors.violetLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.violet,
    fontFamily: "Manrope_600SemiBold",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    fontFamily: "Manrope_400Regular",
  },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textMuted,
    fontFamily: "Manrope_600SemiBold",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    fontFamily: "Manrope_700Bold",
  },
  statHint: {
    fontSize: 12,
    color: colors.violet,
    marginTop: 6,
    fontFamily: "Manrope_600SemiBold",
  },
});
