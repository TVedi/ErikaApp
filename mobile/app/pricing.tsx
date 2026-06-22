import { Text, StyleSheet } from "react-native";
import { MobileScreen } from "../components/mobile-screen";
import { FeatureCard } from "../components/feature-card";
import { pricing, plansOverview } from "../content/copy";
import { colors, spacing } from "../constants/theme";

export default function PricingScreen() {
  return (
    <MobileScreen title={pricing.title} subtitle={pricing.subtitle} showBack>
      {plansOverview.tiers.map((tier) => (
        <FeatureCard
          key={tier.name}
          title={tier.name}
          description={tier.description}
          badge="Info only"
        />
      ))}
      <Text style={styles.campsTitle}>{pricing.campsNote.title}</Text>
      {pricing.campsNote.items.map((item) => (
        <Text key={item} style={styles.campsItem}>• {item}</Text>
      ))}
    </MobileScreen>
  );
}

const styles = StyleSheet.create({
  campsTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    fontFamily: "Manrope_700Bold",
  },
  campsItem: {
    fontSize: 15,
    color: colors.textMuted,
    marginBottom: 8,
    lineHeight: 22,
    fontFamily: "Manrope_400Regular",
  },
});
