import { View, Text, StyleSheet } from "react-native";
import { brand } from "../content/copy";

export function StatusBarRow() {
  return (
    <View style={styles.row}>
      <Text style={styles.time}>9:41</Text>
      <View style={styles.icons}>
        <Text style={styles.icon}>▮▮▮</Text>
        <Text style={styles.icon}>⌁</Text>
        <View style={styles.battery}>
          <View style={styles.batteryFill} />
        </View>
      </View>
    </View>
  );
}

export function AuthHero() {
  return (
    <View style={styles.hero}>
      <View style={styles.glow} />
      <Text style={styles.label}>{brand.name}</Text>
      <View style={styles.headline}>
        <Text style={styles.lineLight}>Elite</Text>
        <View style={styles.lineBold}>
          <Text style={styles.onText}>Paddle </Text>
          <Text style={styles.gradientWord}>Coaching</Text>
        </View>
      </View>
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.star}>✦</Text>
        <View style={styles.dividerLine} />
      </View>
    </View>
  );
}

export function HomeIndicator() {
  return (
    <View style={styles.indicatorWrap}>
      <View style={styles.indicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  time: {
    fontSize: 15,
    fontWeight: "600",
    color: "#030712",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  icon: {
    fontSize: 12,
    color: "#111827",
  },
  battery: {
    width: 22,
    height: 11,
    borderWidth: 1.5,
    borderColor: "#111827",
    borderRadius: 3,
    padding: 1,
  },
  batteryFill: {
    flex: 1,
    backgroundColor: "#111827",
    borderRadius: 1,
  },
  hero: {
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 28,
    marginTop: 8,
  },
  glow: {
    position: "absolute",
    top: 40,
    width: 280,
    height: 112,
    borderRadius: 56,
    backgroundColor: "rgba(186, 230, 253, 0.45)",
  },
  label: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 4.2,
    textTransform: "uppercase",
    color: "rgba(100, 116, 139, 0.9)",
    marginBottom: 12,
  },
  headline: {
    alignItems: "center",
  },
  lineLight: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 38,
    fontWeight: "200",
    color: "#1e293b",
    letterSpacing: 0.5,
  },
  lineBold: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 4,
  },
  onText: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 48,
    fontWeight: "300",
    color: "#475569",
  },
  gradientWord: {
    fontFamily: "InstrumentSerif_400Regular_Italic",
    fontSize: 48,
    fontWeight: "600",
    color: "#6366f1",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 20,
  },
  dividerLine: {
    width: 48,
    height: 1,
    backgroundColor: "#cbd5e1",
  },
  star: {
    fontSize: 10,
    color: "#a78bfa",
  },
  indicatorWrap: {
    alignItems: "center",
    paddingBottom: 8,
    paddingTop: 4,
  },
  indicator: {
    width: 128,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(17, 24, 39, 0.9)",
  },
});
