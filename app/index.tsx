import React, { useEffect } from "react"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import { Redirect } from "expo-router"
import { useUserStore } from "@/store/userStore"
import Colors from "@/constants/colors"

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
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={Colors.dark.primary} />
				<Text style={styles.loadingText}>Loading...</Text>
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
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.dark.background,
	},
	loadingText: {
		color: Colors.dark.text,
		marginTop: 16,
		fontSize: 16,
	},
})
