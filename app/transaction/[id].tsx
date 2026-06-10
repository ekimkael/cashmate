import {
	Wallet,
	CreditCard,
	DollarSign,
	ArrowUpRight,
	ArrowDownLeft,
} from "lucide-react-native"
import React from "react"
import { Stack, useLocalSearchParams } from "expo-router"
import { View, Text, StyleSheet, Image, ScrollView } from "react-native"

import Colors, { useThemeColors } from "@/constants/colors"
import { useTransactionStore } from "@/store/transactionStore"

export default function TransactionDetailScreen() {
  const C = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: C.background,
  	},
  	content: {
  		padding: 20,
  	},
  	card: {
  		backgroundColor: C.card,
  		borderRadius: 16,
  		padding: 20,
  	},
  	userContainer: {
  		alignItems: "center",
  		marginBottom: 24,
  	},
  	avatar: {
  		width: 80,
  		height: 80,
  		borderRadius: 40,
  		marginBottom: 16,
  	},
  	iconContainer: {
  		width: 80,
  		height: 80,
  		borderRadius: 40,
  		backgroundColor: C.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginBottom: 16,
  	},
  	userName: {
  		color: C.text,
  		fontSize: 20,
  		fontWeight: "600",
  		marginBottom: 4,
  	},
  	userUsername: {
  		color: C.secondaryText,
  		fontSize: 16,
  	},
  	amountContainer: {
  		alignItems: "center",
  		marginBottom: 24,
  	},
  	amount: {
  		fontSize: 36,
  		fontWeight: "700",
  		marginBottom: 8,
  	},
  	status: {
  		color: C.secondaryText,
  		fontSize: 16,
  	},
  	noteContainer: {
  		backgroundColor: C.inputBackground,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 24,
  	},
  	noteLabel: {
  		color: C.secondaryText,
  		fontSize: 14,
  		marginBottom: 8,
  	},
  	note: {
  		color: C.text,
  		fontSize: 16,
  	},
  	detailsContainer: {
  		borderTopWidth: 1,
  		borderTopColor: C.border,
  		paddingTop: 16,
  	},
  	detailRow: {
  		flexDirection: "row",
  		justifyContent: "space-between",
  		marginBottom: 12,
  	},
  	detailLabel: {
  		color: C.secondaryText,
  		fontSize: 14,
  	},
  	detailValue: {
  		color: C.text,
  		fontSize: 14,
  	},
  	errorContainer: {
  		flex: 1,
  		alignItems: "center",
  		justifyContent: "center",
  		padding: 20,
  	},
  	errorText: {
  		color: C.text,
  		fontSize: 16,
  		textAlign: "center",
  	},
  })
	const { id } = useLocalSearchParams()
	const { transactions } = useTransactionStore()

	const transaction = transactions.find((tx) => tx.id === id)

	if (!transaction) {
		return (
			<View style={styles.container}>
				<Stack.Screen options={{ title: "Transaction" }} />

				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>Transaction not found</Text>
				</View>
			</View>
		)
	}

	const { type, amount, date, user, note, status } = transaction

	const formattedDate = new Date(date).toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	})

	const formattedTime = new Date(date).toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	})

	const getIcon = () => {
		switch (type) {
			case "send":
				return <ArrowUpRight size={24} color={C.error} />
			case "receive":
				return <ArrowDownLeft size={24} color={C.success} />
			case "payment":
				return <CreditCard size={24} color={C.secondaryText} />
			case "deposit":
				return <Wallet size={24} color={C.success} />
			case "withdrawal":
				return <DollarSign size={24} color={C.error} />
			default:
				return null
		}
	}

	const getAmountColor = () => {
		if (type === "send" || type === "payment" || type === "withdrawal") {
			return C.error
		}
		return C.success
	}

	const getAmountPrefix = () => {
		if (type === "send" || type === "payment" || type === "withdrawal") {
			return "-"
		}
		return "+"
	}

	const getTransactionTitle = () => {
		switch (type) {
			case "send":
				return `Sent to ${user.name}`
			case "receive":
				return `Received from ${user.name}`
			case "payment":
				return `Payment to ${user.name}`
			case "deposit":
				return "Deposit"
			case "withdrawal":
				return "Withdrawal"
			default:
				return "Transaction"
		}
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: getTransactionTitle() }} />

			<ScrollView contentContainerStyle={styles.content}>
				<View style={styles.card}>
					<View style={styles.userContainer}>
						{user.avatar ? (
							<Image source={{ uri: user.avatar }} style={styles.avatar} />
						) : (
							<View style={styles.iconContainer}>{getIcon()}</View>
						)}
						<Text style={styles.userName}>{user.name}</Text>
						{user.username && (
							<Text style={styles.userUsername}>@{user.username}</Text>
						)}
					</View>

					<View style={styles.amountContainer}>
						<Text style={[styles.amount, { color: getAmountColor() }]}>
							{getAmountPrefix()}${amount.toFixed(2)}
						</Text>
						<Text style={styles.status}>
							{status.charAt(0).toUpperCase() + status.slice(1)}
						</Text>
					</View>

					{note && (
						<View style={styles.noteContainer}>
							<Text style={styles.noteLabel}>Note</Text>
							<Text style={styles.note}>{note}</Text>
						</View>
					)}

					<View style={styles.detailsContainer}>
						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>Date</Text>
							<Text style={styles.detailValue}>{formattedDate}</Text>
						</View>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>Time</Text>
							<Text style={styles.detailValue}>{formattedTime}</Text>
						</View>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>Transaction ID</Text>
							<Text style={styles.detailValue}>{transaction.id}</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

