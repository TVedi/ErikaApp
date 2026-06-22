import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { AuthBackground } from "../components/phone-shell";
import { StatusBarRow, AuthHero, HomeIndicator } from "../components/auth-hero";
import { GlassCard } from "../components/glass-card";
import { GradientButton } from "../components/gradient-button";
import { AuthInput } from "../components/auth-input";
import { supabase } from "../lib/supabase";
import { auth } from "../content/copy";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setError(null);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    router.replace("/(tabs)");
  }

  return (
    <AuthBackground>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <StatusBarRow />
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AuthHero />
          <GlassCard>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{auth.loginTitle}</Text>
              <Text style={styles.cardSubtitle}>{auth.safetyDisclaimer}</Text>
            </View>
            <AuthInput
              placeholder="email@domain.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <AuthInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <GradientButton
              label={loading ? "Signing in…" : "Continue"}
              onPress={handleLogin}
              disabled={loading}
            />
            <Pressable onPress={() => router.push("/signup")} style={styles.switch}>
              <Text style={styles.switchText}>
                {auth.noAccount}{" "}
                <Text style={styles.link}>{auth.signupLink}</Text>
              </Text>
            </Pressable>
          </GlassCard>
        </ScrollView>
        <HomeIndicator />
      </KeyboardAvoidingView>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  cardHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    fontFamily: "Manrope_700Bold",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 18,
    fontFamily: "Manrope_400Regular",
  },
  error: {
    color: "#dc2626",
    fontSize: 13,
    marginBottom: 8,
    textAlign: "center",
  },
  switch: {
    marginTop: 20,
    alignItems: "center",
  },
  switchText: {
    fontSize: 14,
    color: "#6b7280",
    fontFamily: "Manrope_400Regular",
  },
  link: {
    color: "#2563eb",
    fontWeight: "600",
  },
});
