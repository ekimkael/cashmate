import React, { useEffect } from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter, useLocalSearchParams } from "expo-router"
import { CheckCircle } from "lucide-react-native"
import Colors, { useThemeColors } from "@/constants/colors"
import Button from "@/components/ui/button"

export default function DepositSuccessScreen() {
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
  	sourceText: {
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
	const { amount } = useLocalSearchParams()

	useEffect(() => {
		const timer = setTimeout(() => {
			router.back()
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

				<Text style={styles.title}>Cash Added!</Text>

				<View style={styles.detailsContainer}>
					<Text style={styles.amountText}>${amount}</Text>
					<Text style={styles.sourceText}>from Bank Account</Text>
				</View>

				<Text style={styles.message}>
					Your cash has been added to your balance and is available immediately.
				</Text>
			</View>

			<Button label="Done" onPress={() => router.back()} style={{ margin: 16 }} />
		</SafeAreaView>
	)
}

