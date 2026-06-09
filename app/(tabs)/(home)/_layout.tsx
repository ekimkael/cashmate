import { Stack } from "expo-router/stack"
import { PlatformColor } from "react-native"

export default function HomeStack() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerShadowVisible: false,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: { backgroundColor: "transparent" },
        headerTitleStyle: { color: PlatformColor("label") },
        headerLargeTitle: true,
        headerBlurEffect: "systemChromeMaterial",
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Dashboard" }} />
    </Stack>
  )
}
