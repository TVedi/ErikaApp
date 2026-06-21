import { useState } from "react";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { ScreenScroll, Card, Title, Body, Input, Button } from "../components/ui";
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
      email,
      password,
    });
    setLoading(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    router.replace("/dashboard");
  }

  return (
    <ScreenScroll>
      <Card>
        <Title>{auth.loginTitle}</Title>
        <Body>{auth.safetyDisclaimer}</Body>
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
        {error ? <Text style={{ color: "#dc2626", marginBottom: 8 }}>{error}</Text> : null}
        <Button label={auth.loginButton} onPress={handleLogin} disabled={loading} />
        <Button
          label={auth.signupLink}
          variant="ghost"
          onPress={() => router.push("/signup")}
        />
      </Card>
    </ScreenScroll>
  );
}
