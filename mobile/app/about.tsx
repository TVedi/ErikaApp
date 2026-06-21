import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScreenScroll, Card, Title, Body, Badge } from "../components/ui";
import { supabase, type CoachCredential } from "../lib/supabase";
import { about } from "../content/copy";
import { colors, spacing } from "../constants/theme";

export default function AboutScreen() {
  const [credentials, setCredentials] = useState<CoachCredential[]>([]);

  useEffect(() => {
    supabase
      .from("coach_credentials")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => setCredentials(data ?? []));
  }, []);

  return (
    <ScreenScroll>
      <Title>{about.title}</Title>
      <Body>{about.intro}</Body>

      <Card>
        <Text style={styles.sectionTitle}>Professional biography</Text>
        <Body>{about.biographyPlaceholder}</Body>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>{about.philosophyTitle}</Text>
        <Body>{about.philosophy}</Body>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Credentials</Text>
        {credentials.map((c) => (
          <View key={c.id} style={styles.credRow}>
            <Text style={styles.credLabel}>
              {c.label}
              {c.year ? ` (${c.year})` : ""}
            </Text>
            {c.detail ? <Text style={styles.credDetail}>{c.detail}</Text> : null}
          </View>
        ))}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>{about.focusAreasTitle}</Text>
        <View style={styles.tags}>
          {about.focusAreas.map((area) => (
            <Badge key={area}>{area}</Badge>
          ))}
        </View>
      </Card>
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.navy,
    marginBottom: spacing.sm,
  },
  credRow: { marginTop: spacing.sm },
  credLabel: { fontWeight: "600", color: colors.navy },
  credDetail: { color: colors.textMuted, fontSize: 14, marginTop: 4 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
});
