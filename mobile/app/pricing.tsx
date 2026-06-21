import { Text } from "react-native";
import { ScreenScroll, Card, Title, Subtitle, Body } from "../components/ui";
import { pricing, plansOverview } from "../content/copy";
import { spacing } from "../constants/theme";

export default function PricingScreen() {
  return (
    <ScreenScroll>
      <Title>{pricing.title}</Title>
      <Subtitle>{pricing.subtitle}</Subtitle>

      {plansOverview.tiers.map((tier) => (
        <Card key={tier.name}>
          <Text style={{ fontWeight: "700", fontSize: 18, color: "#1a2744" }}>{tier.name}</Text>
          <Body>{tier.description}</Body>
          {tier.features.map((f) => (
            <Text key={f} style={{ color: "#64748b", marginTop: 6, fontSize: 14 }}>• {f}</Text>
          ))}
        </Card>
      ))}

      <Card>
        <Text style={{ fontWeight: "700", fontSize: 18, color: "#1a2744", marginBottom: spacing.sm }}>
          {pricing.campsNote.title}
        </Text>
        {pricing.campsNote.items.map((item) => (
          <Text key={item} style={{ color: "#64748b", marginTop: 6, fontSize: 14 }}>• {item}</Text>
        ))}
      </Card>
    </ScreenScroll>
  );
}
