import { Text, StyleSheet, TextInput, type TextInputProps } from "react-native";

export function AuthInput({
  label,
  ...props
}: TextInputProps & { label?: string }) {
  return (
    <>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor="#9ca3af"
        style={styles.input}
        {...props}
      />
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
    fontFamily: "Manrope_600SemiBold",
  },
  input: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 16,
    backgroundColor: "rgba(249, 250, 251, 0.6)",
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111827",
    fontFamily: "Manrope_400Regular",
    marginBottom: 12,
  },
});
