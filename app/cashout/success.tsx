import React, { useEffect } from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter, useLocalSearchParams } from "expo-router"
import { CheckCircle } from "lucide-react-native"
import Colors from "@/constants/colors"

export default function CashoutSuccessScreen() {
	const router = useRouter()
	const { amount } = useLocalSearchParams()

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
					<CheckCircle size={80} color={Colors.dark.success} />
				</View>

				<Text style={styles.title}>Cash Out Initiated!</Text>

				<View style={styles.detailsContainer}>
					<Text style={styles.amountText}>${amount}</Text>
					<Text style={styles.destinationText}>to Bank Account</Text>
				</View>

				<Text style={styles.message}>
					Your cash out has been initiated. Standard transfers arrive in 1-3
					business days.
				</Text>
			</View>

			<Pressable style={styles.doneButton} onPress={() => router.replace("/")}>
				<Text style={styles.doneButtonText}>Done</Text>
			</Pressable>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.dark.background,
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
		color: Colors.dark.text,
		fontSize: 28,
		fontWeight: "700",
		marginBottom: 24,
	},
	detailsContainer: {
		alignItems: "center",
		marginBottom: 24,
	},
	amountText: {
		color: Colors.dark.text,
		fontSize: 48,
		fontWeight: "600",
		marginBottom: 8,
	},
	destinationText: {
		color: Colors.dark.secondaryText,
		fontSize: 18,
	},
	message: {
		color: Colors.dark.secondaryText,
		fontSize: 16,
		textAlign: "center",
	},
	doneButton: {
		backgroundColor: Colors.dark.primary,
		borderRadius: 12,
		padding: 16,
		alignItems: "center",
		justifyContent: "center",
		margin: 16,
	},
	doneButtonText: {
		color: Colors.dark.background,
		fontSize: 18,
		fontWeight: "600",
	},
})
