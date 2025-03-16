import React from "react"
import { Tabs } from "expo-router"
import { Home, BarChart2, CreditCard, User } from "lucide-react-native"
import Colors from "@/constants/colors"

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: Colors.dark.primary,
				tabBarInactiveTintColor: Colors.dark.secondaryText,
				tabBarStyle: {
					backgroundColor: Colors.dark.background,
					borderTopColor: Colors.dark.border,
				},
				tabBarLabelStyle: { fontSize: 12 },
				headerStyle: { backgroundColor: Colors.dark.background },
				headerTintColor: Colors.dark.text,
				headerTitleStyle: { fontWeight: "600" },
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => <Home size={24} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="activity"
				options={{
					title: "Activity",
					tabBarIcon: ({ color }) => <BarChart2 size={24} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="banking"
				options={{
					title: "Banking",
					tabBarIcon: ({ color }) => <CreditCard size={24} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => <User size={24} color={color} />,
				}}
			/>
		</Tabs>
	)
}
