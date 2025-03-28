import React, { useState } from "react"
import { Stack, useRouter } from "expo-router"
import { CreditCard } from "lucide-react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, StyleSheet, Pressable } from "react-native"

import NumPad from "@/components/NumPad"

import Colors from "@/constants/colors"
import { useTransactionStore } from "@/store/transactionStore"

export default function DepositScreen() {
	const { addTransaction } = useTransactionStore()
	const [amount, setAmount] = useState("0")
	const router = useRouter()

	const handleNumberPress = (number: string) => {
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

	const handleAddCashPress = () => {
		const numericAmount = parseFloat(amount)
		if (isNaN(numericAmount) || numericAmount <= 0) return

		addTransaction({
			type: "deposit",
			amount: numericAmount,
			user: {
				id: "bank-1",
				name: "Bank Transfer",
				username: "bank",
			},
		})

		router.replace({
			pathname: "/deposit/success",
			params: { amount },
		})
	}

	return (
		<SafeAreaView style={styles.container}>
			<Stack.Screen options={{ title: "Add Cash" }} />

			<View style={styles.content}>
				<View style={styles.sourceContainer}>
					<View style={styles.sourceCard}>
						<CreditCard size={24} color={Colors.dark.text} />
						<View style={styles.sourceDetails}>
							<Text style={styles.sourceName}>Bank Account</Text>
							<Text style={styles.sourceNumber}>•••• 5678</Text>
						</View>
					</View>
				</View>

				<View style={styles.amountContainer}>
					<Text style={styles.currencySymbol}>$</Text>
					<Text style={styles.amount}>{amount}</Text>
				</View>

				<Text style={styles.feeText}>
					Instant deposits are subject to a 1.5% fee (min. $0.25)
				</Text>
			</View>

			<View style={styles.numPadContainer}>
				<NumPad
					onNumberPress={handleNumberPress}
					onDeletePress={handleDeletePress}
				/>

				<Pressable
					style={[
						styles.addButton,
						parseFloat(amount) <= 0 && styles.addButtonDisabled,
					]}
					onPress={handleAddCashPress}
					disabled={parseFloat(amount) <= 0}>
					<Text style={styles.addButtonText}>Add Cash</Text>
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
	sourceContainer: {
		width: "100%",
		marginBottom: 32,
	},
	sourceCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.dark.card,
		borderRadius: 12,
		padding: 16,
	},
	sourceDetails: {
		marginLeft: 16,
	},
	sourceName: {
		color: Colors.dark.text,
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 4,
	},
	sourceNumber: {
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
		marginBottom: 32,
	},
	numPadContainer: {
		width: "100%",
	},
	addButton: {
		backgroundColor: Colors.dark.primary,
		borderRadius: 12,
		padding: 16,
		alignItems: "center",
		justifyContent: "center",
		margin: 16,
	},
	addButtonDisabled: {
		opacity: 0.5,
	},
	addButtonText: {
		color: Colors.dark.background,
		fontSize: 18,
		fontWeight: "600",
	},
})
