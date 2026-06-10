import React from "react"
import { Stack } from "expo-router"
import Colors, { useThemeColors } from "@/constants/colors"

export default function AuthLayout() {
  const C = useThemeColors()
	return (
		<Stack
			screenOptions={{
				headerShadowVisible: false,
				headerTintColor: C.text,
				headerTitleStyle: { fontWeight: "600" },
				headerStyle: { backgroundColor: C.background },
				contentStyle: { backgroundColor: C.background },
			}}
		/>
	)
}
