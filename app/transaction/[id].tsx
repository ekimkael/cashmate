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

import { useThemeColors } from "@/constants/colors"
import { useTransactionStore } from '@/store/transaction-store'

export default function TransactionDetailScreen() {
  const colors = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: colors.background,
  	},
  	content: {
  		padding: 20,
  	},
  	card: {
  		backgroundColor: colors.card,
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
  		backgroundColor: colors.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginBottom: 16,
  	},
  	userName: {
  		color: colors.text,
  		fontSize: 20,
  		fontWeight: "600",
  		marginBottom: 4,
  	},
  	userUsername: {
  		color: colors.secondaryText,
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
  		color: colors.secondaryText,
  		fontSize: 16,
  	},
  	noteContainer: {
  		backgroundColor: colors.inputBackground,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 24,
  	},
  	noteLabel: {
  		color: colors.secondaryText,
  		fontSize: 14,
  		marginBottom: 8,
  	},
  	note: {
  		color: colors.text,
  		fontSize: 16,
  	},
  	detailsContainer: {
  		borderTopWidth: 1,
  		borderTopColor: colors.border,
  		paddingTop: 16,
  	},
  	detailRow: {
  		flexDirection: "row",
  		justifyContent: "space-between",
  		marginBottom: 12,
  	},
  	detailLabel: {
  		color: colors.secondaryText,
  		fontSize: 14,
  	},
  	detailValue: {
  		color: colors.text,
  		fontSize: 14,
  	},
  	errorContainer: {
  		flex: 1,
  		alignItems: "center",
  		justifyContent: "center",
  		padding: 20,
  	},
  	errorText: {
  		color: colors.text,
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
				return <ArrowUpRight size={24} color={colors.error} />
			case "receive":
				return <ArrowDownLeft size={24} color={colors.success} />
			case "payment":
				return <CreditCard size={24} color={colors.secondaryText} />
			case "deposit":
				return <Wallet size={24} color={colors.success} />
			case "withdrawal":
				return <DollarSign size={24} color={colors.error} />
			default:
				return null
		}
	}

	const getAmountColor = () => {
		if (type === "send" || type === "payment" || type === "withdrawal") {
			return colors.error
		}
		return colors.success
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

