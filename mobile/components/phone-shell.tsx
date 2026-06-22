import { View, StyleSheet, useWindowDimensions, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/theme";

export function PhoneShell({ children }: { children: React.ReactNode }) {
  const { width } = useWindowDimensions();
  const showFrame = Platform.OS === "web" && width > 420;

  if (!showFrame) {
    return <View style={styles.full}>{children}</View>;
  }

  return (
    <View style={styles.canvas}>
      <View style={styles.phone}>{children}</View>
    </View>
  );
}

export function AuthBackground({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.authRoot}>
      <LinearGradient
        colors={["#eff6ff", "#ffffff", "#faf5ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.orbTop} />
      <View style={styles.orbBottom} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  phone: {
    width: 390,
    maxWidth: "100%",
    height: 844,
    maxHeight: "100%",
    backgroundColor: colors.white,
    borderRadius: 0,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 12,
  },
  full: {
    flex: 1,
    backgroundColor: colors.white,
  },
  authRoot: {
    flex: 1,
  },
  orbTop: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 256,
    height: 256,
    borderRadius: 128,
    backgroundColor: "rgba(96, 165, 250, 0.2)",
  },
  orbBottom: {
    position: "absolute",
    bottom: -48,
    left: -52,
    width: 288,
    height: 288,
    borderRadius: 144,
    backgroundColor: "rgba(192, 132, 252, 0.18)",
  },
});
