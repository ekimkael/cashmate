import { Stack } from "expo-router/stack"
import { useThemeColors } from "@/constants/colors"

export default function ActivityStack() {
  const C = useThemeColors()
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerShadowVisible: false,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: { backgroundColor: "transparent" },
        headerTitleStyle: { color: C.text },
        headerLargeTitleStyle: { color: C.text },
        headerTintColor: C.primary,
        headerLargeTitle: true,
        headerBlurEffect: "systemChromeMaterial",
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Activity" }} />
    </Stack>
  )
}
