import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import {
  ScreenScroll,
  Card,
  Title,
  Subtitle,
  Body,
  Button,
  LinkRow,
} from "../components/ui";
import { supabase, type CoachCredential } from "../lib/supabase";
import {
  brand,
  hero,
  nav,
  valueProposition,
  waitlist,
} from "../content/copy";
import { colors, spacing } from "../constants/theme";

export default function HomeScreen() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<CoachCredential[]>([]);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState<"idle" | "ok" | "dup" | "err">("idle");

  useEffect(() => {
    supabase
      .from("coach_credentials")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => setCredentials(data ?? []));
  }, []);

  async function joinWaitlist() {
    const email = waitlistEmail.trim().toLowerCase();
    if (!email) return;
    const { error } = await supabase.from("waitlist").insert({ email });
    if (!error) {
      setWaitlistStatus("ok");
      setWaitlistEmail("");
    } else if (error.code === "23505") {
      setWaitlistStatus("dup");
    } else {
      setWaitlistStatus("err");
    }
  }

  return (
    <ScreenScroll>
      <View style={styles.hero}>
        <Text style={styles.heroTag}>{brand.tagline}</Text>
        <Text style={styles.heroTitle}>{hero.title}</Text>
        <Text style={styles.heroSub}>{hero.subtitle}</Text>
        <Button label={hero.ctaStart} onPress={() => router.push("/signup")} />
        <Button
          label={hero.ctaPlans}
          variant="outline"
          onPress={() => router.push("/pricing")}
        />
      </View>

      <Card>
        <Title>{valueProposition.title}</Title>
        <Body>{valueProposition.body}</Body>
      </Card>

      <Card>
        <Title>Verified credentials</Title>
        {credentials.length === 0 ? (
          <Body>Connect Supabase to load credentials.</Body>
        ) : (
          credentials.map((c) => (
            <View key={c.id} style={styles.credRow}>
              <Text style={styles.credLabel}>
                {c.label}
                {c.year ? ` (${c.year})` : ""}
              </Text>
              {c.detail ? <Text style={styles.credDetail}>{c.detail}</Text> : null}
            </View>
          ))
        )}
      </Card>

      <Card>
        <Title>{waitlist.title}</Title>
        <Subtitle>{waitlist.subtitle}</Subtitle>
        <TextInput
          style={styles.waitlistInput}
          placeholder={waitlist.placeholder}
          placeholderTextColor={colors.textMuted}
          value={waitlistEmail}
          onChangeText={setWaitlistEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button label={waitlist.button} onPress={joinWaitlist} />
        {waitlistStatus === "ok" && <Text style={styles.ok}>{waitlist.success}</Text>}
        {waitlistStatus === "dup" && <Text style={styles.muted}>{waitlist.duplicate}</Text>}
        {waitlistStatus === "err" && <Text style={styles.err}>{waitlist.error}</Text>}
      </Card>

      <Card>
        <Title>Explore</Title>
        <LinkRow label={nav.about} onPress={() => router.push("/about")} />
        <LinkRow label={nav.pricing} onPress={() => router.push("/pricing")} />
        <LinkRow label={nav.camps} onPress={() => router.push("/camps")} />
        <LinkRow label={nav.login} onPress={() => router.push("/login")} />
        <LinkRow label={nav.signup} onPress={() => router.push("/signup")} />
        <LinkRow label={nav.dashboard} onPress={() => router.push("/dashboard")} />
      </Card>
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.navy,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  heroTag: {
    color: colors.water,
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: spacing.sm,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 26,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  heroSub: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  credRow: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  credLabel: {
    fontWeight: "600",
    color: colors.navy,
    fontSize: 15,
  },
  credDetail: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
  waitlistInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: colors.white,
    marginBottom: spacing.sm,
  },
  ok: { color: "#15803d", marginTop: spacing.sm },
  muted: { color: colors.textMuted, marginTop: spacing.sm },
  err: { color: colors.destructive, marginTop: spacing.sm },
});
