import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { colors } from "../../constants/theme";

function TabIcon({
  name,
  focused,
}: {
  name: keyof typeof Ionicons.glyphMap;
  focused: boolean;
}) {
  return (
    <View style={styles.iconWrap}>
      {focused ? <View style={styles.activePill} /> : null}
      <Ionicons
        name={name}
        size={26}
        color={focused ? colors.text : "#d1d5db"}
      />
    </View>
  );
}

export default function AppTabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: "#d1d5db",
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? "home" : "home-outline"} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="plans"
        options={{
          title: "Plans",
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? "clipboard" : "clipboard-outline"} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          title: "Videos",
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? "videocam" : "videocam-outline"} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? "stats-chart" : "stats-chart-outline"} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? "person" : "person-outline"} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopColor: "#f3f4f6",
    borderTopWidth: 1,
    height: 72,
    paddingTop: 8,
    paddingBottom: 12,
  },
  tabLabel: {
    fontSize: 11,
    fontFamily: "Manrope_600SemiBold",
    marginTop: 2,
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
    height: 32,
  },
  activePill: {
    position: "absolute",
    top: -10,
    width: 32,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.text,
  },
});
