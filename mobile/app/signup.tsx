import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { AuthBackground } from "../components/phone-shell";
import { StatusBarRow, AuthHero, HomeIndicator } from "../components/auth-hero";
import { GlassCard } from "../components/glass-card";
import { GradientButton, OrDivider, SocialButton } from "../components/gradient-button";
import { AuthInput } from "../components/auth-input";
import { supabase } from "../lib/supabase";
import {
  calculateIsMinor,
  validateMinorSignup,
  requiresGuardianFields,
} from "../lib/minor-consent";
import { auth } from "../content/copy";

export default function SignupScreen() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "details">("email");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [parentalConsent, setParentalConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const showGuardian = dateOfBirth ? requiresGuardianFields(dateOfBirth) : false;

  function continueWithEmail() {
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    setError(null);
    setStep("details");
  }

  async function handleSignup() {
    const validation = validateMinorSignup({
      dateOfBirth,
      guardianEmail: showGuardian ? guardianEmail : undefined,
      parentalConsent: showGuardian ? parentalConsent : undefined,
    });
    if (!validation.valid) {
      setError(validation.errors[0]);
      return;
    }

    setLoading(true);
    setError(null);

    const isMinor = calculateIsMinor(dateOfBirth);
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    if (authError) {
      setLoading(false);
      setError(authError.message);
      return;
    }

    if (!authData.user) {
      setLoading(false);
      setError("Account creation failed.");
      return;
    }

    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      full_name: fullName.trim(),
      role: "athlete",
      date_of_birth: dateOfBirth,
      is_minor: isMinor,
      parental_consent: isMinor ? parentalConsent : false,
      guardian_email: isMinor ? guardianEmail.trim() : null,
    });

    setLoading(false);

    if (profileError) {
      setError(profileError.message);
      return;
    }

    router.replace("/(tabs)");
  }

  function socialComingSoon() {
    Alert.alert("Coming soon", "Social sign-in will be available in a later phase.");
  }

  return (
    <AuthBackground>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <StatusBarRow />
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AuthHero />

          <GlassCard>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>
                {step === "email" ? "Create an account" : auth.signupTitle}
              </Text>
              <Text style={styles.cardSubtitle}>
                {step === "email"
                  ? "Enter your email to get started"
                  : "Complete your athlete profile"}
              </Text>
            </View>

            {step === "email" ? (
              <AuthInput
                placeholder="email@domain.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            ) : (
              <>
                <AuthInput
                  label={auth.fullName}
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
                <AuthInput
                  label={auth.email}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <AuthInput
                  label={auth.password}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <AuthInput
                  label={auth.dateOfBirth}
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  placeholder="YYYY-MM-DD"
                />
                {showGuardian && (
                  <>
                    <AuthInput
                      label={auth.guardianEmail}
                      value={guardianEmail}
                      onChangeText={setGuardianEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    <Pressable
                      onPress={() => setParentalConsent(!parentalConsent)}
                      style={styles.consentRow}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          parentalConsent && styles.checkboxOn,
                        ]}
                      />
                      <Text style={styles.consentText}>{auth.parentalConsent}</Text>
                    </Pressable>
                  </>
                )}
              </>
            )}

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <GradientButton
              label={
                step === "email"
                  ? "Continue"
                  : loading
                    ? "Creating…"
                    : auth.signupButton
              }
              onPress={step === "email" ? continueWithEmail : handleSignup}
              disabled={loading}
            />

            {step === "email" && (
              <>
                <OrDivider />
                <View style={styles.socialRow}>
                  <SocialButton label="Google" onPress={socialComingSoon} />
                  <SocialButton label="Apple" onPress={socialComingSoon} />
                </View>
              </>
            )}

            <Text style={styles.legal}>
              By clicking continue, you agree to our{" "}
              <Text style={styles.link} onPress={() => router.push("/terms")}>
                Terms of Service
              </Text>
              {" "}and{" "}
              <Text style={styles.link} onPress={() => router.push("/privacy")}>
                Privacy Policy
              </Text>
              .
            </Text>

            <Pressable onPress={() => router.push("/login")} style={styles.switch}>
              <Text style={styles.switchText}>
                {auth.hasAccount}{" "}
                <Text style={styles.link}>{auth.loginLink}</Text>
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
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 8,
    textAlign: "center",
    fontFamily: "Manrope_400Regular",
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  legal: {
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    marginTop: 20,
    paddingTop: 16,
    fontSize: 11,
    lineHeight: 18,
    textAlign: "center",
    color: "#6b7280",
    fontFamily: "Manrope_400Regular",
  },
  link: {
    color: "#2563eb",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  switch: {
    marginTop: 16,
    alignItems: "center",
  },
  switchText: {
    fontSize: 14,
    color: "#6b7280",
    fontFamily: "Manrope_400Regular",
  },
  error: {
    color: "#dc2626",
    fontSize: 13,
    marginBottom: 8,
    textAlign: "center",
  },
  consentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#4f46e5",
    borderRadius: 4,
    marginTop: 2,
  },
  checkboxOn: {
    backgroundColor: "#4f46e5",
  },
  consentText: {
    flex: 1,
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 18,
    fontFamily: "Manrope_400Regular",
  },
});
