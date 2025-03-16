import React from "react"
import { Stack } from "expo-router"
import Colors from "@/constants/colors"

export default function AuthLayout() {
	return (
		<Stack
			screenOptions={{
				headerShadowVisible: false,
				headerTintColor: Colors.dark.text,
				headerTitleStyle: { fontWeight: "600" },
				headerStyle: { backgroundColor: Colors.dark.background },
				contentStyle: { backgroundColor: Colors.dark.background },
			}}
		/>
	)
}
