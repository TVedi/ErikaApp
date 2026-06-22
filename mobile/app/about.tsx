import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MobileScreen } from "../components/mobile-screen";
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
    <MobileScreen title={about.title} subtitle={about.intro} showBack>
      <Text style={styles.sectionTitle}>Biography</Text>
      <Text style={styles.body}>{about.biographyPlaceholder}</Text>

      <Text style={styles.sectionTitle}>{about.philosophyTitle}</Text>
      <Text style={styles.body}>{about.philosophy}</Text>

      <Text style={styles.sectionTitle}>Credentials</Text>
      {credentials.length === 0 ? (
        <Text style={styles.muted}>Credentials loading…</Text>
      ) : (
        credentials.map((c) => (
          <Text key={c.id} style={styles.credItem}>
            • {c.label}{c.year ? ` (${c.year})` : ""}
          </Text>
        ))
      )}

      <Text style={styles.sectionTitle}>{about.focusAreasTitle}</Text>
      <View style={styles.tags}>
        {about.focusAreas.map((area) => (
          <Text key={area} style={styles.tag}>{area}</Text>
        ))}
      </View>
    </MobileScreen>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
    fontFamily: "Manrope_700Bold",
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    fontFamily: "Manrope_400Regular",
  },
  credItem: {
    fontSize: 15,
    color: colors.text,
    marginBottom: 8,
    fontFamily: "Manrope_400Regular",
  },
  muted: {
    color: colors.textMuted,
    fontFamily: "Manrope_400Regular",
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: colors.violetLight,
    color: colors.violet,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 13,
    fontFamily: "Manrope_600SemiBold",
  },
});
