import { useState } from "react";
import { Text, Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenScroll, Card, Title, Body, Input, Button } from "../components/ui";
import { supabase } from "../lib/supabase";
import {
  calculateIsMinor,
  validateMinorSignup,
  requiresGuardianFields,
} from "../lib/minor-consent";
import { auth } from "../content/copy";
import { colors } from "../constants/theme";

export default function SignupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [parentalConsent, setParentalConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const showGuardian = dateOfBirth ? requiresGuardianFields(dateOfBirth) : false;

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
      email,
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

    router.replace("/dashboard");
  }

  return (
    <ScreenScroll>
      <Card>
        <Title>{auth.signupTitle}</Title>
        <Body>{auth.safetyDisclaimer}</Body>
        <Input label={auth.fullName} value={fullName} onChangeText={setFullName} />
        <Input
          label={auth.email}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label={auth.password}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Input
          label={auth.dateOfBirth}
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          placeholder="YYYY-MM-DD"
        />

        {showGuardian && (
          <>
            <Input
              label={auth.guardianEmail}
              value={guardianEmail}
              onChangeText={setGuardianEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={{ fontSize: 12, color: colors.textMuted, marginBottom: 8 }}>
              {auth.guardianEmailHint}
            </Text>
            <Pressable
              onPress={() => setParentalConsent(!parentalConsent)}
              style={{ flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 12 }}
            >
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderWidth: 2,
                  borderColor: colors.navy,
                  borderRadius: 4,
                  backgroundColor: parentalConsent ? colors.navy : colors.white,
                }}
              />
              <Text style={{ flex: 1, fontSize: 14, color: colors.textMuted }}>
                {auth.parentalConsent}
              </Text>
            </Pressable>
          </>
        )}

        {error ? <Text style={{ color: "#dc2626", marginBottom: 8 }}>{error}</Text> : null}
        <Button label={auth.signupButton} onPress={handleSignup} disabled={loading} />
        <Button
          label={auth.loginLink}
          variant="ghost"
          onPress={() => router.push("/login")}
        />
      </Card>
    </ScreenScroll>
  );
}
