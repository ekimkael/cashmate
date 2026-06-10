import React, { useMemo } from "react"
import { Stack, useRouter } from "expo-router"
import { CreditCard } from "lucide-react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, StyleSheet, Pressable } from "react-native"

import NumPad from "@/components/ui/num-pad"
import { useThemeColors } from "@/constants/colors"
import Button from "@/components/ui/button"
import { useAmountInput } from "@/hooks/use-amount-input"
import { useTransactionStore } from '@/store/transaction-store'

export default function DepositScreen() {
	const colors = useThemeColors()
	const { addTransaction } = useTransactionStore()
	const { amount, handleNumberPress, handleDeletePress } = useAmountInput()
	const router = useRouter()

	const dynamic = useMemo(() => ({
		container: { backgroundColor: colors.background },
		sourceCard: { backgroundColor: colors.card },
		sourceName: { color: colors.text },
		sourceNumber: { color: colors.secondaryText },
		currencySymbol: { color: colors.text },
		amount: { color: colors.text },
		feeText: { color: colors.secondaryText },
	}), [colors])

	const handleAddCashPress = () => {
		const numericAmount = parseFloat(amount)
		if (isNaN(numericAmount) || numericAmount <= 0) return

		addTransaction({
			type: "deposit",
			amount: numericAmount,
			user: { id: "bank-1", name: "Bank Transfer", username: "bank" },
		})

		router.replace({ pathname: "/deposit/success", params: { amount } })
	}

	return (
		<SafeAreaView style={[styles.container, dynamic.container]}>
			<Stack.Screen options={{ title: "Add Cash" }} />

			<View style={styles.content}>
				<View style={styles.sourceContainer}>
					<View style={[styles.sourceCard, dynamic.sourceCard]}>
						<CreditCard size={24} color={colors.text} />
						<View style={styles.sourceDetails}>
							<Text style={[styles.sourceName, dynamic.sourceName]}>Bank Account</Text>
							<Text style={[styles.sourceNumber, dynamic.sourceNumber]}>•••• 5678</Text>
						</View>
					</View>
				</View>

				<View style={styles.amountContainer}>
					<Text style={[styles.currencySymbol, dynamic.currencySymbol]}>$</Text>
					<Text style={[styles.amount, dynamic.amount]}>{amount}</Text>
				</View>

				<Text style={[styles.feeText, dynamic.feeText]}>
					Instant deposits are subject to a 1.5% fee (min. $0.25)
				</Text>
			</View>

			<View style={styles.numPadContainer}>
				<NumPad onNumberPress={handleNumberPress} onDeletePress={handleDeletePress} />
				<Button
					label="Add Cash"
					onPress={handleAddCashPress}
					disabled={parseFloat(amount) <= 0}
					style={{ margin: 16 }}
				/>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
		borderRadius: 12,
		padding: 16,
	},
	sourceDetails: {
		marginLeft: 16,
	},
	sourceName: {
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 4,
	},
	sourceNumber: {
		fontSize: 14,
	},
	amountContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	currencySymbol: {
		fontSize: 36,
		fontWeight: "600",
		marginRight: 4,
	},
	amount: {
		fontSize: 48,
		fontWeight: "600",
	},
	feeText: {
		fontSize: 14,
		textAlign: "center",
		marginBottom: 32,
	},
	numPadContainer: {
		width: "100%",
	},
})
