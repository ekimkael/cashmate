import React, { useEffect } from "react"
import { Redirect, Stack } from "expo-router"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"

import Colors from "@/constants/colors"
import { useUserStore } from "@/store/userStore"

export default function IndexScreen() {
	const { user } = useUserStore()
	const [isLoading, setIsLoading] = React.useState(true)

	useEffect(() => {
		// Simulate checking authentication status
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 1000)

		return () => clearTimeout(timer)
	}, [])

	if (isLoading) {
		return (
			<View style={styles.container}>
				<Stack.Screen options={{ title: "", headerShown: false }} />

				<ActivityIndicator size="large" color={Colors.dark.primary} />
				<Text style={styles.text}>Loading...</Text>
			</View>
		)
	}

	// If user is logged in, redirect to home
	// If not, redirect to login
	if (user) {
		return <Redirect href="/(tabs)" />
	} else {
		return <Redirect href="/auth/login" />
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.dark.background,
	},
	text: {
		marginTop: 16,
		fontSize: 16,
		color: Colors.dark.text,
	},
})
