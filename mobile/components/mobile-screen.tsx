import { View, Text, Pressable, ScrollView, StyleSheet, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { colors, spacing } from "../constants/theme";

export function MobileScreen({
  children,
  title,
  subtitle,
  showBack,
  contentStyle,
  noPadding,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  contentStyle?: ViewStyle;
  noPadding?: boolean;
}) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        {showBack ? (
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
        ) : (
          <View style={styles.backPlaceholder} />
        )}
        {title ? (
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
        ) : null}
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          noPadding ? undefined : styles.content,
          contentStyle,
          { paddingBottom: insets.bottom + spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  backBtn: {
    paddingVertical: spacing.sm,
  },
  backPlaceholder: {
    height: 8,
  },
  backText: {
    fontSize: 15,
    color: colors.violet,
    fontFamily: "Manrope_600SemiBold",
  },
  titleBlock: {
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    fontFamily: "Manrope_700Bold",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textMuted,
    marginTop: 4,
    lineHeight: 22,
    fontFamily: "Manrope_400Regular",
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    gap: spacing.md,
  },
});
