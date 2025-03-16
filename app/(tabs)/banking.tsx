import {
	Wallet,
	Building,
	DollarSign,
	CreditCard,
	ArrowDownToLine,
	ArrowUpFromLine,
} from "lucide-react-native"
import React from "react"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native"

import Colors from "@/constants/colors"
import { useUserStore } from "@/store/userStore"

export default function BankingScreen() {
	const router = useRouter()
	const { user } = useUserStore()

	if (!user) {
		return (
			<View style={styles.container}>
				<Text style={styles.errorText}>User not found</Text>
			</View>
		)
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.header}>
					<Text style={styles.headerTitle}>Banking</Text>
				</View>

				<View style={styles.section}>
					<Pressable style={styles.card} onPress={() => router.push("/card")}>
						<View style={styles.cardHeader}>
							<CreditCard size={24} color={Colors.dark.background} />
							<Text style={styles.cardName}>{user.name}</Text>
						</View>
						<View style={styles.cardFooter}>
							<Text style={styles.cardNumber}>•••• 1234</Text>
						</View>
					</Pressable>
				</View>

				<View style={styles.balanceCard}>
					<Text style={styles.balanceLabel}>Cash Balance</Text>
					<Text style={styles.balanceAmount}>${user.balance.toFixed(2)}</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Actions</Text>
					<View style={styles.actionsGrid}>
						<Pressable
							style={styles.actionItem}
							onPress={() => router.push("/deposit")}>
							<View style={styles.actionIcon}>
								<ArrowDownToLine size={24} color={Colors.dark.primary} />
							</View>
							<Text style={styles.actionLabel}>Add Cash</Text>
						</Pressable>

						<Pressable
							style={styles.actionItem}
							onPress={() => router.push("/cashout")}>
							<View style={styles.actionIcon}>
								<ArrowUpFromLine size={24} color={Colors.dark.primary} />
							</View>
							<Text style={styles.actionLabel}>Cash Out</Text>
						</Pressable>

						<Pressable
							style={styles.actionItem}
							onPress={() => router.push("/directdeposit")}>
							<View style={styles.actionIcon}>
								<Building size={24} color={Colors.dark.primary} />
							</View>
							<Text style={styles.actionLabel}>Direct Deposit</Text>
						</Pressable>

						<Pressable
							style={styles.actionItem}
							onPress={() => router.push("/statements")}>
							<View style={styles.actionIcon}>
								<DollarSign size={24} color={Colors.dark.primary} />
							</View>
							<Text style={styles.actionLabel}>Statements</Text>
						</Pressable>
					</View>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Linked Accounts</Text>
					<Pressable
						style={styles.linkedAccount}
						onPress={() => router.push("/linkedaccounts")}>
						<View style={styles.linkedAccountIcon}>
							<Wallet size={24} color={Colors.dark.text} />
						</View>
						<View style={styles.linkedAccountDetails}>
							<Text style={styles.linkedAccountName}>Bank Account</Text>
							<Text style={styles.linkedAccountNumber}>•••• 5678</Text>
						</View>
					</Pressable>

					<Pressable
						style={[styles.button, styles.addButton]}
						onPress={() => router.push("/linkaccount")}>
						<Text style={styles.addButtonText}>Link a Bank or Card</Text>
					</Pressable>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.dark.background,
	},
	scrollContent: {
		padding: 20,
	},
	header: {
		marginBottom: 24,
	},
	headerTitle: {
		color: Colors.dark.text,
		fontSize: 24,
		fontWeight: "700",
	},
	balanceCard: {
		backgroundColor: Colors.dark.card,
		borderRadius: 16,
		padding: 20,
		marginBottom: 24,
	},
	balanceLabel: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
		marginBottom: 8,
	},
	balanceAmount: {
		color: Colors.dark.text,
		fontSize: 32,
		fontWeight: "600",
	},
	section: {
		marginBottom: 32,
	},
	sectionTitle: {
		color: Colors.dark.text,
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 16,
	},
	card: {
		backgroundColor: Colors.dark.primary,
		borderRadius: 16,
		padding: 20,
		height: 180,
		justifyContent: "space-between",
	},
	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
	},
	cardName: {
		color: Colors.dark.background,
		fontSize: 18,
		fontWeight: "600",
		marginLeft: 12,
	},
	cardFooter: {
		alignItems: "flex-end",
	},
	cardNumber: {
		color: Colors.dark.background,
		fontSize: 16,
		fontWeight: "500",
	},
	actionsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	actionItem: {
		width: "48%",
		backgroundColor: Colors.dark.card,
		borderRadius: 12,
		padding: 16,
		marginBottom: 16,
	},
	actionIcon: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: "rgba(0, 214, 50, 0.1)",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
	},
	actionLabel: {
		color: Colors.dark.text,
		fontSize: 16,
		fontWeight: "500",
	},
	linkedAccount: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.dark.card,
		borderRadius: 12,
		padding: 16,
		marginBottom: 16,
	},
	linkedAccountIcon: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 16,
	},
	linkedAccountDetails: {
		flex: 1,
	},
	linkedAccountName: {
		color: Colors.dark.text,
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 4,
	},
	linkedAccountNumber: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
	},
	button: {
		borderRadius: 12,
		padding: 16,
		alignItems: "center",
		justifyContent: "center",
	},
	addButton: {
		backgroundColor: Colors.dark.card,
		borderWidth: 1,
		borderColor: Colors.dark.border,
	},
	addButtonText: {
		color: Colors.dark.primary,
		fontSize: 16,
		fontWeight: "600",
	},
	errorText: {
		color: Colors.dark.text,
		fontSize: 16,
		textAlign: "center",
	},
})
