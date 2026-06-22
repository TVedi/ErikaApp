import { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { MobileScreen } from "../components/mobile-screen";
import { FeatureCard } from "../components/feature-card";
import { supabase, type Camp } from "../lib/supabase";
import { camps } from "../content/copy";
import { colors } from "../constants/theme";

function formatDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function CampsScreen() {
  const [campList, setCampList] = useState<Camp[]>([]);

  useEffect(() => {
    supabase
      .from("camps")
      .select("*")
      .order("start_date", { ascending: true })
      .then(({ data }) => setCampList(data ?? []));
  }, []);

  return (
    <MobileScreen title={camps.title} subtitle={camps.subtitle} showBack>
      {campList.length === 0 ? (
        <Text style={styles.empty}>{camps.empty}</Text>
      ) : (
        campList.map((camp) => (
          <FeatureCard
            key={camp.id}
            title={camp.title}
            description={`${camp.location}\n${formatDate(camp.start_date)} — ${formatDate(camp.end_date)}${camp.price != null ? `\n$${camp.price}` : ""}${camp.description ? `\n\n${camp.description}` : ""}`}
            badge={camps.registerInterest}
          />
        ))
      )}
      <Text style={styles.note}>{camps.comingSoon}</Text>
    </MobileScreen>
  );
}

const styles = StyleSheet.create({
  empty: {
    fontSize: 15,
    color: colors.textMuted,
    fontFamily: "Manrope_400Regular",
  },
  note: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 8,
    lineHeight: 20,
    fontFamily: "Manrope_400Regular",
  },
});
