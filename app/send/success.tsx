import React, { useEffect } from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter, useLocalSearchParams } from "expo-router"
import { CheckCircle } from "lucide-react-native"
import Colors, { useThemeColors } from "@/constants/colors"
import Button from "@/components/ui/button"

export default function SendSuccessScreen() {
  const colors = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: colors.background,
  	},
  	content: {
  		flex: 1,
  		alignItems: "center",
  		justifyContent: "center",
  		padding: 20,
  	},
  	iconContainer: {
  		marginBottom: 24,
  	},
  	title: {
  		color: colors.text,
  		fontSize: 28,
  		fontWeight: "700",
  		marginBottom: 24,
  	},
  	detailsContainer: {
  		alignItems: "center",
  		marginBottom: 24,
  	},
  	amountText: {
  		color: colors.text,
  		fontSize: 48,
  		fontWeight: "600",
  		marginBottom: 8,
  	},
  	recipientText: {
  		color: colors.secondaryText,
  		fontSize: 18,
  	},
  	message: {
  		color: colors.secondaryText,
  		fontSize: 16,
  		textAlign: "center",
  	},
  })
	const router = useRouter()
	const { amount, name } = useLocalSearchParams()

	useEffect(() => {
		const timer = setTimeout(() => {
			router.replace("/")
		}, 5000)

		return () => clearTimeout(timer)
	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<Stack.Screen
				options={{
					headerShown: false,
				}}
			/>

			<View style={styles.content}>
				<View style={styles.iconContainer}>
					<CheckCircle size={80} color={colors.success} />
				</View>

				<Text style={styles.title}>Money Sent!</Text>

				<View style={styles.detailsContainer}>
					<Text style={styles.amountText}>${amount}</Text>
					<Text style={styles.recipientText}>to {name}</Text>
				</View>

				<Text style={styles.message}>
					Your payment has been sent successfully.
				</Text>
			</View>

			<Button label="Done" onPress={() => router.replace("/")} style={{ margin: 16 }} />
		</SafeAreaView>
	)
}

