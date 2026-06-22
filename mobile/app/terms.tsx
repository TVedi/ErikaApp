import { MobileScreen } from "../components/mobile-screen";
import { legal } from "../content/copy";
import { Text, StyleSheet } from "react-native";
import { colors } from "../constants/theme";

export default function TermsScreen() {
  return (
    <MobileScreen title={legal.terms.title} showBack>
      <Text style={styles.body}>{legal.terms.body}</Text>
    </MobileScreen>
  );
}

const styles = StyleSheet.create({
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    fontFamily: "Manrope_400Regular",
  },
});
