import { Stack } from "expo-router/stack"
import { useThemeColors } from "@/constants/colors"

export default function HomeStack() {
  const colors = useThemeColors()
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerShadowVisible: false,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: { backgroundColor: "transparent" },
        headerTitleStyle: { color: colors.text },
        headerLargeTitleStyle: { color: colors.text },
        headerTintColor: colors.primary,
        headerLargeTitle: true,
        headerBlurEffect: "systemChromeMaterial",
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Dashboard" }} />
    </Stack>
  )
}
