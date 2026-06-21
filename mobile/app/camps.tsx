import { useEffect, useState } from "react";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { ScreenScroll, Card, Title, Subtitle, Body, Button } from "../components/ui";
import { supabase, type Camp } from "../lib/supabase";
import { camps } from "../content/copy";

function formatDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function CampsScreen() {
  const router = useRouter();
  const [campList, setCampList] = useState<Camp[]>([]);

  useEffect(() => {
    supabase
      .from("camps")
      .select("*")
      .order("start_date", { ascending: true })
      .then(({ data }) => setCampList(data ?? []));
  }, []);

  return (
    <ScreenScroll>
      <Title>{camps.title}</Title>
      <Subtitle>{camps.subtitle}</Subtitle>

      {campList.length === 0 ? (
        <Body>{camps.empty}</Body>
      ) : (
        campList.map((camp) => (
          <Card key={camp.id}>
            <Text style={{ fontWeight: "700", fontSize: 18, color: "#1a2744" }}>{camp.title}</Text>
            <Body>{camp.location}</Body>
            <Text style={{ color: "#64748b", marginTop: 4 }}>
              {formatDate(camp.start_date)} — {formatDate(camp.end_date)}
            </Text>
            {camp.price != null && (
              <Text style={{ color: "#3d7ea6", fontWeight: "600", marginTop: 4 }}>
                ${camp.price}
              </Text>
            )}
            {camp.capacity != null && (
              <Text style={{ color: "#64748b", marginTop: 4 }}>Capacity: {camp.capacity}</Text>
            )}
            {camp.description ? <Body>{camp.description}</Body> : null}
            <Button
              label={camps.registerInterest}
              variant="outline"
              onPress={() => router.push("/login")}
            />
            <Text style={{ fontSize: 12, color: "#64748b", marginTop: 8 }}>{camps.comingSoon}</Text>
          </Card>
        ))
      )}
    </ScreenScroll>
  );
}
