import React from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { Eye, EyeOff } from "lucide-react-native"
import Colors from "@/constants/colors"

interface BalanceCardProps {
	balance: number
}

export default function BalanceCard({ balance }: BalanceCardProps) {
	const [hideBalance, setHideBalance] = React.useState(false)

	const toggleBalanceVisibility = () => {
		setHideBalance(!hideBalance)
	}

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Your Balance</Text>
			<View style={styles.balanceRow}>
				<Text style={styles.currencySymbol}>$</Text>
				<Text style={styles.balance}>
					{hideBalance ? "••••••" : balance.toFixed(2)}
				</Text>
				<Pressable onPress={toggleBalanceVisibility} style={styles.eyeButton}>
					{hideBalance ? (
						<EyeOff size={20} color={Colors.dark.secondaryText} />
					) : (
						<Eye size={20} color={Colors.dark.secondaryText} />
					)}
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.dark.card,
		borderRadius: 16,
		padding: 20,
		width: "100%",
		marginBottom: 24,
	},
	label: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
		marginBottom: 8,
	},
	balanceRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	currencySymbol: {
		color: Colors.dark.text,
		fontSize: 28,
		fontWeight: "600",
		marginRight: 4,
	},
	balance: {
		color: Colors.dark.text,
		fontSize: 36,
		fontWeight: "600",
		flex: 1,
	},
	eyeButton: {
		padding: 8,
	},
})
