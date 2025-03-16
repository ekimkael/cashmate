import React from "react"
import { View, Text, StyleSheet, Pressable, Image } from "react-native"
import {
	ArrowDownLeft,
	ArrowUpRight,
	CreditCard,
	Wallet,
	DollarSign,
} from "lucide-react-native"
import { Transaction } from "@/types"
import Colors from "@/constants/colors"

interface TransactionItemProps {
	transaction: Transaction
	onPress?: (transaction: Transaction) => void
}

export default function TransactionItem({
	transaction,
	onPress,
}: TransactionItemProps) {
	const { type, amount, date, user, note, status } = transaction

	const formattedDate = new Date(date).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	})

	const getIcon = () => {
		switch (type) {
			case "send":
				return <ArrowUpRight size={20} color={Colors.dark.error} />
			case "receive":
				return <ArrowDownLeft size={20} color={Colors.dark.success} />
			case "payment":
				return <CreditCard size={20} color={Colors.dark.secondaryText} />
			case "deposit":
				return <Wallet size={20} color={Colors.dark.success} />
			case "withdrawal":
				return <DollarSign size={20} color={Colors.dark.error} />
			default:
				return null
		}
	}

	const getAmountColor = () => {
		if (type === "send" || type === "payment" || type === "withdrawal") {
			return Colors.dark.error
		}
		return Colors.dark.success
	}

	const getAmountPrefix = () => {
		if (type === "send" || type === "payment" || type === "withdrawal") {
			return "-"
		}
		return "+"
	}

	return (
		<Pressable
			style={({ pressed }) => [styles.container, pressed && styles.pressed]}
			onPress={() => onPress && onPress(transaction)}>
			<View style={styles.avatarContainer}>
				{user.avatar ? (
					<Image source={{ uri: user.avatar }} style={styles.avatar} />
				) : (
					<View style={styles.iconContainer}>{getIcon()}</View>
				)}
			</View>

			<View style={styles.details}>
				<Text style={styles.name}>{user.name}</Text>
				{note && <Text style={styles.note}>{note}</Text>}
				<Text style={styles.date}>{formattedDate}</Text>
			</View>

			<View style={styles.amountContainer}>
				<Text style={[styles.amount, { color: getAmountColor() }]}>
					{getAmountPrefix()}${amount.toFixed(2)}
				</Text>
				{status === "pending" && <Text style={styles.pending}>Pending</Text>}
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 16,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: Colors.dark.border,
	},
	pressed: {
		backgroundColor: Colors.dark.card,
	},
	avatarContainer: {
		marginRight: 16,
	},
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
	},
	iconContainer: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: Colors.dark.card,
		alignItems: "center",
		justifyContent: "center",
	},
	details: {
		flex: 1,
	},
	name: {
		color: Colors.dark.text,
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 4,
	},
	note: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
		marginBottom: 4,
	},
	date: {
		color: Colors.dark.secondaryText,
		fontSize: 12,
	},
	amountContainer: {
		alignItems: "flex-end",
	},
	amount: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 4,
	},
	pending: {
		color: Colors.dark.secondaryText,
		fontSize: 12,
	},
})
