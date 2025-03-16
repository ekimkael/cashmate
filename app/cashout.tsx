import React, { useState } from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import { ArrowLeft, Building } from "lucide-react-native"
import { useTransactionStore } from "@/store/transactionStore"
import NumPad from "@/components/NumPad"
import Colors from "@/constants/colors"

export default function CashoutScreen() {
	const router = useRouter()
	const { addTransaction } = useTransactionStore()
	const [amount, setAmount] = useState("0")

	const handleNumberPress = (number) => {
		if (amount === "0" && number !== ".") {
			setAmount(number)
		} else if (number === "." && amount.includes(".")) {
			// Don't add another decimal point
			return
		} else {
			setAmount(amount + number)
		}
	}

	const handleDeletePress = () => {
		if (amount.length > 1) {
			setAmount(amount.slice(0, -1))
		} else {
			setAmount("0")
		}
	}

	const handleCashOutPress = () => {
		const numericAmount = parseFloat(amount)
		if (isNaN(numericAmount) || numericAmount <= 0) return

		addTransaction({
			type: "withdrawal",
			amount: numericAmount,
			user: {
				id: "bank-1",
				name: "Bank Transfer",
				username: "bank",
			},
		})

		router.push({
			pathname: "/cashout/success",
			params: { amount },
		})
	}

	return (
		<SafeAreaView style={styles.container}>
			<Stack.Screen options={{ title: "Cash Out" }} />

			<View style={styles.content}>
				<View style={styles.destinationContainer}>
					<View style={styles.destinationCard}>
						<Building size={24} color={Colors.dark.text} />
						<View style={styles.destinationDetails}>
							<Text style={styles.destinationName}>Bank Account</Text>
							<Text style={styles.destinationNumber}>•••• 5678</Text>
						</View>
					</View>
				</View>

				<View style={styles.amountContainer}>
					<Text style={styles.currencySymbol}>$</Text>
					<Text style={styles.amount}>{amount}</Text>
				</View>

				<Text style={styles.feeText}>
					Standard transfers arrive in 1-3 business days (free)
				</Text>
				<Text style={styles.instantText}>
					Instant transfers arrive immediately (1% fee)
				</Text>
			</View>

			<View style={styles.numPadContainer}>
				<NumPad
					onNumberPress={handleNumberPress}
					onDeletePress={handleDeletePress}
				/>

				<Pressable
					style={[
						styles.cashOutButton,
						parseFloat(amount) <= 0 && styles.cashOutButtonDisabled,
					]}
					onPress={handleCashOutPress}
					disabled={parseFloat(amount) <= 0}>
					<Text style={styles.cashOutButtonText}>Cash Out</Text>
				</Pressable>
			</View>
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
	destinationContainer: {
		width: "100%",
		marginBottom: 32,
	},
	destinationCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.dark.card,
		borderRadius: 12,
		padding: 16,
	},
	destinationDetails: {
		marginLeft: 16,
	},
	destinationName: {
		color: Colors.dark.text,
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 4,
	},
	destinationNumber: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
	},
	amountContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	currencySymbol: {
		color: Colors.dark.text,
		fontSize: 36,
		fontWeight: "600",
		marginRight: 4,
	},
	amount: {
		color: Colors.dark.text,
		fontSize: 48,
		fontWeight: "600",
	},
	feeText: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
		textAlign: "center",
		marginBottom: 8,
	},
	instantText: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
		textAlign: "center",
		marginBottom: 32,
	},
	numPadContainer: {
		width: "100%",
	},
	cashOutButton: {
		backgroundColor: Colors.dark.primary,
		borderRadius: 12,
		padding: 16,
		alignItems: "center",
		justifyContent: "center",
		margin: 16,
	},
	cashOutButtonDisabled: {
		opacity: 0.5,
	},
	cashOutButtonText: {
		color: Colors.dark.background,
		fontSize: 18,
		fontWeight: "600",
	},
})
