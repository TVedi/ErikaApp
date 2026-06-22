import { Pressable, Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function GradientButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [pressed && styles.pressed, disabled && styles.disabled]}
    >
      <LinearGradient
        colors={["#2563eb", "#4f46e5", "#9333ea"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function OrDivider() {
  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <Text style={styles.text}>or continue with</Text>
      <View style={styles.line} />
    </View>
  );
}

export function SocialButton({
  label,
  onPress,
}: {
  label: "Google" | "Apple";
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.social}>
      <Text
        style={[
          styles.socialIcon,
          { color: label === "Google" ? "#4285F4" : "#111827" },
        ]}
      >
        {label === "Google" ? "G" : ""}
      </Text>
      <Text style={styles.socialLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Manrope_600SemiBold",
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#d1d5db",
  },
  text: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "500",
    fontFamily: "Manrope_600SemiBold",
  },
  social: {
    flex: 1,
    minWidth: "45%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 16,
    paddingVertical: 14,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  socialIcon: {
    fontSize: 16,
    fontWeight: "700",
  },
  socialLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    fontFamily: "Manrope_600SemiBold",
  },
});
