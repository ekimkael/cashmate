import React from "react"
import { Stack } from "expo-router"
import Colors, { useThemeColors } from "@/constants/colors"

export default function AuthLayout() {
  const colors = useThemeColors()
	return (
		<Stack
			screenOptions={{
				headerShadowVisible: false,
				headerTintColor: colors.text,
				headerTitleStyle: { fontWeight: "600" },
				headerStyle: { backgroundColor: colors.background },
				contentStyle: { backgroundColor: colors.background },
			}}
		/>
	)
}
