import React, { useMemo } from "react"
import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import { Building } from "lucide-react-native"
import { useTransactionStore } from '@/store/transaction-store'
import NumPad from "@/components/ui/num-pad"
import { useThemeColors } from "@/constants/colors"
import Button from "@/components/ui/button"
import { useAmountInput } from "@/hooks/use-amount-input"

export default function CashoutScreen() {
	const colors = useThemeColors()
	const router = useRouter()
	const { addTransaction } = useTransactionStore()
	const { amount, handleNumberPress, handleDeletePress } = useAmountInput()

	const dynamic = useMemo(() => ({
		container: { backgroundColor: colors.background },
		destinationCard: { backgroundColor: colors.card },
		destinationName: { color: colors.text },
		destinationNumber: { color: colors.secondaryText },
		currencySymbol: { color: colors.text },
		amount: { color: colors.text },
		feeText: { color: colors.secondaryText },
	}), [colors])

	const handleCashOutPress = () => {
		const numericAmount = parseFloat(amount)
		if (isNaN(numericAmount) || numericAmount <= 0) return

		addTransaction({
			type: "withdrawal",
			amount: numericAmount,
			user: { id: "bank-1", name: "Bank Transfer", username: "bank" },
		})

		router.replace({ pathname: "/cashout/success", params: { amount } })
	}

	return (
		<SafeAreaView style={[styles.container, dynamic.container]}>
			<Stack.Screen options={{ title: "Cash Out" }} />

			<View style={styles.content}>
				<View style={styles.destinationContainer}>
					<View style={[styles.destinationCard, dynamic.destinationCard]}>
						<Building size={24} color={colors.text} />
						<View style={styles.destinationDetails}>
							<Text style={[styles.destinationName, dynamic.destinationName]}>Bank Account</Text>
							<Text style={[styles.destinationNumber, dynamic.destinationNumber]}>•••• 5678</Text>
						</View>
					</View>
				</View>

				<View style={styles.amountContainer}>
					<Text style={[styles.currencySymbol, dynamic.currencySymbol]}>$</Text>
					<Text style={[styles.amount, dynamic.amount]}>{amount}</Text>
				</View>

				<Text style={[styles.feeText, dynamic.feeText]}>
					Standard transfers arrive in 1-3 business days (free)
				</Text>
				<Text style={[styles.feeText, dynamic.feeText]}>
					Instant transfers arrive immediately (1% fee)
				</Text>
			</View>

			<View style={styles.numPadContainer}>
				<NumPad onNumberPress={handleNumberPress} onDeletePress={handleDeletePress} />
				<Button
					label="Cash Out"
					onPress={handleCashOutPress}
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
	destinationContainer: {
		width: "100%",
		marginBottom: 32,
	},
	destinationCard: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 12,
		padding: 16,
	},
	destinationDetails: {
		marginLeft: 16,
	},
	destinationName: {
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 4,
	},
	destinationNumber: {
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
		marginBottom: 8,
	},
	numPadContainer: {
		width: "100%",
	},
})
