import React from "react"
import { Stack } from "expo-router"
import Colors from "@/constants/colors"

export default function AuthLayout() {
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: Colors.dark.background,
				},
				headerTintColor: Colors.dark.text,
				headerTitleStyle: {
					fontWeight: "600",
				},
				contentStyle: {
					backgroundColor: Colors.dark.background,
				},
			}}
		/>
	)
}
