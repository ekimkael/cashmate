import React from "react"
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import {
	ArrowLeft,
	CreditCard,
	DollarSign,
	Settings,
	Shield,
	Smartphone,
} from "lucide-react-native"
import { useUserStore } from '@/store/user-store'
import { useTransactionStore } from '@/store/transaction-store'
import TransactionItem from "@/components/ui/transaction-item"
import Colors, { useThemeColors } from "@/constants/colors"

export default function CardScreen() {
  const C = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: C.background,
  	},
  	scrollContent: {
  		padding: 20,
  	},
  	cardContainer: {
  		marginBottom: 16,
  	},
  	card: {
  		backgroundColor: C.primary,
  		borderRadius: 16,
  		padding: 20,
  		height: 180,
  		justifyContent: "space-between",
  		marginBottom: 16,
  	},
  	cardHeader: {
  		flexDirection: "row",
  		alignItems: "center",
  	},
  	cardName: {
  		color: C.background,
  		fontSize: 18,
  		fontWeight: "600",
  		marginLeft: 12,
  	},
  	cardFooter: {
  		alignItems: "flex-end",
  	},
  	cardNumber: {
  		color: C.background,
  		fontSize: 16,
  		fontWeight: "500",
  	},
  	cardDetailsButton: {
  		backgroundColor: C.card,
  		borderRadius: 12,
  		padding: 16,
  		alignItems: "center",
  		flex: 1,
  	},
  	cardDetailsText: {
  		color: C.text,
  		fontSize: 16,
  		fontWeight: "500",
  	},
  	balanceContainer: {
  		backgroundColor: C.card,
  		borderRadius: 16,
  		padding: 20,
  		marginBottom: 24,
  		alignItems: "center",
  	},
  	balanceLabel: {
  		color: C.secondaryText,
  		fontSize: 14,
  		marginBottom: 8,
  	},
  	balanceAmount: {
  		color: C.text,
  		fontSize: 32,
  		fontWeight: "600",
  		marginBottom: 16,
  	},
  	addCashButton: {
  		backgroundColor: C.primary,
  		borderRadius: 12,
  		padding: 16,
  	},
  	addCashText: {
  		color: C.background,
  		fontSize: 16,
  		fontWeight: "600",
  	},
  	section: {
  		marginBottom: 24,
  	},
  	sectionHeader: {
  		flexDirection: "row",
  		justifyContent: "space-between",
  		alignItems: "center",
  		marginBottom: 16,
  	},
  	sectionTitle: {
  		color: C.text,
  		fontSize: 18,
  		fontWeight: "600",
  		marginBottom: 16,
  	},
  	viewAllText: {
  		color: C.primary,
  		fontSize: 14,
  		fontWeight: "500",
  	},
  	featuresGrid: {
  		flexDirection: "row",
  		flexWrap: "wrap",
  		justifyContent: "space-between",
  	},
  	featureItem: {
  		width: "48%",
  		backgroundColor: C.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 16,
  	},
  	featureIcon: {
  		width: 48,
  		height: 48,
  		borderRadius: 24,
  		backgroundColor: "rgba(0, 214, 50, 0.1)",
  		alignItems: "center",
  		justifyContent: "center",
  		marginBottom: 12,
  	},
  	featureTitle: {
  		color: C.text,
  		fontSize: 16,
  		fontWeight: "600",
  		marginBottom: 4,
  	},
  	featureDescription: {
  		color: C.secondaryText,
  		fontSize: 12,
  	},
  	emptyTransactions: {
  		backgroundColor: C.card,
  		borderRadius: 12,
  		padding: 20,
  		alignItems: "center",
  	},
  	emptyText: {
  		color: C.secondaryText,
  		fontSize: 14,
  	},
  	errorText: {
  		color: C.text,
  		fontSize: 16,
  		textAlign: "center",
  	},
  })
	const router = useRouter()
	const { user } = useUserStore()
	const { transactions } = useTransactionStore()

	// Filter transactions related to the card
	const cardTransactions = transactions
		.filter((tx) => tx.type === "payment" || tx.type === "withdrawal")
		.slice(0, 5) // Show only the most recent 5 transactions

	if (!user) {
		return (
			<View style={styles.container}>
				<Text style={styles.errorText}>User not found</Text>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Cash Card" }} />

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.cardContainer}>
					<View style={styles.card}>
						<View style={styles.cardHeader}>
							<CreditCard size={24} color={C.background} />
							<Text style={styles.cardName}>{user.name}</Text>
						</View>
						<View style={styles.cardFooter}>
							<Text style={styles.cardNumber}>•••• 1234</Text>
						</View>
					</View>

					<Pressable
						style={styles.cardDetailsButton}
						onPress={() => router.push("/card-details")}>
						<Text style={styles.cardDetailsText}>View Card Details</Text>
					</Pressable>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Features</Text>

					<View style={styles.featuresGrid}>
						<Pressable
							style={styles.featureItem}
							onPress={() => router.push("/card-boost")}>
							<View style={styles.featureIcon}>
								<DollarSign size={24} color={C.primary} />
							</View>
							<Text style={styles.featureTitle}>Boosts</Text>
							<Text style={styles.featureDescription}>
								Save up to 15% at your favorite places
							</Text>
						</Pressable>

						<Pressable
							style={styles.featureItem}
							onPress={() => router.push("/card-settings")}>
							<View style={styles.featureIcon}>
								<Settings size={24} color={C.primary} />
							</View>
							<Text style={styles.featureTitle}>Card Settings</Text>
							<Text style={styles.featureDescription}>
								Manage your card preferences
							</Text>
						</Pressable>

						<Pressable
							style={styles.featureItem}
							onPress={() => router.push("/card-security")}>
							<View style={styles.featureIcon}>
								<Shield size={24} color={C.primary} />
							</View>
							<Text style={styles.featureTitle}>Security</Text>
							<Text style={styles.featureDescription}>
								Lock card, change PIN, report issues
							</Text>
						</Pressable>

						<Pressable
							style={styles.featureItem}
							onPress={() => router.push("/card-virtual")}>
							<View style={styles.featureIcon}>
								<Smartphone size={24} color={C.primary} />
							</View>
							<Text style={styles.featureTitle}>Virtual Card</Text>
							<Text style={styles.featureDescription}>
								Use your card online before it arrives
							</Text>
						</Pressable>
					</View>
				</View>

				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Recent Transactions</Text>
						<Pressable onPress={() => router.push("/activity")}>
							<Text style={styles.viewAllText}>View All</Text>
						</Pressable>
					</View>

					{cardTransactions.length > 0 ? (
						cardTransactions.map((transaction) => (
							<TransactionItem
								key={transaction.id}
								transaction={transaction}
								onPress={(tx) =>
									router.push({
										pathname: "/transaction/[id]",
										params: { id: tx.id },
									})
								}
							/>
						))
					) : (
						<View style={styles.emptyTransactions}>
							<Text style={styles.emptyText}>No recent card transactions</Text>
						</View>
					)}
				</View>
			</ScrollView>
		</View>
	)
}

