import React from "react"
import { View, Text, StyleSheet, ScrollView, Pressable, type ComponentType } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import {
	CreditCard,
	DollarSign,
	Settings,
	Shield,
	Smartphone,
	type LucideProps,
} from "lucide-react-native"
import { useRequireUser } from "@/hooks/use-require-user"
import { useTransactionStore } from '@/store/transaction-store'
import TransactionItem from "@/components/ui/transaction-item"
import { useThemeColors } from "@/constants/colors"

const CARD_TRANSACTIONS_LIMIT = 5

interface CardFeatureItemProps {
	icon: ComponentType<LucideProps>
	title: string
	description: string
	onPress: () => void
}

/** Single card feature tile rendered in the features grid. */
function CardFeatureItem({ icon: Icon, title, description, onPress }: CardFeatureItemProps) {
	const colors = useThemeColors()
	return (
		<Pressable style={styles.featureItem} onPress={onPress}>
			<View style={[styles.featureIcon, { backgroundColor: colors.primaryMuted }]}>
				<Icon size={24} color={colors.primary} />
			</View>
			<Text style={[styles.featureTitle, { color: colors.text }]}>{title}</Text>
			<Text style={[styles.featureDescription, { color: colors.secondaryText }]}>{description}</Text>
		</Pressable>
	)
}

export default function CardScreen() {
	const colors = useThemeColors()
	const router = useRouter()
	const user = useRequireUser()
	const { transactions } = useTransactionStore()

	const cardTransactions = transactions
		.filter((tx) => tx.type === "payment" || tx.type === "withdrawal")
		.slice(0, CARD_TRANSACTIONS_LIMIT)

	if (!user) {
		return (
			<View style={[styles.container, { backgroundColor: colors.background }]}>
				<Text style={[styles.errorText, { color: colors.text }]}>User not found</Text>
			</View>
		)
	}

	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>
			<Stack.Screen options={{ title: "Cash Card" }} />

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.cardContainer}>
					<View style={[styles.card, { backgroundColor: colors.primary }]}>
						<View style={styles.cardHeader}>
							<CreditCard size={24} color={colors.background} />
							<Text style={[styles.cardName, { color: colors.background }]}>{user.name}</Text>
						</View>
						<View style={styles.cardFooter}>
							<Text style={[styles.cardNumber, { color: colors.background }]}>•••• 1234</Text>
						</View>
					</View>

					<Pressable
						style={[styles.cardDetailsButton, { backgroundColor: colors.card }]}
						onPress={() => router.push("/card-details")}
					>
						<Text style={[styles.cardDetailsText, { color: colors.text }]}>View Card Details</Text>
					</Pressable>
				</View>

				<View style={styles.section}>
					<Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
					<View style={styles.featuresGrid}>
						<CardFeatureItem
							icon={DollarSign}
							title="Boosts"
							description="Save up to 15% at your favorite places"
							onPress={() => router.push("/card-boost")}
						/>
						<CardFeatureItem
							icon={Settings}
							title="Card Settings"
							description="Manage your card preferences"
							onPress={() => router.push("/card-settings")}
						/>
						<CardFeatureItem
							icon={Shield}
							title="Security"
							description="Lock card, change PIN, report issues"
							onPress={() => router.push("/card-security")}
						/>
						<CardFeatureItem
							icon={Smartphone}
							title="Virtual Card"
							description="Use your card online before it arrives"
							onPress={() => router.push("/card-virtual")}
						/>
					</View>
				</View>

				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Transactions</Text>
						<Pressable onPress={() => router.push("/(tabs)/(activity)" as any)}>
							<Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
						</Pressable>
					</View>

					{cardTransactions.length > 0 ? (
						cardTransactions.map((transaction) => (
							<TransactionItem
								key={transaction.id}
								transaction={transaction}
								onPress={(tx) => router.push({ pathname: "/transaction/[id]", params: { id: tx.id } })}
							/>
						))
					) : (
						<View style={[styles.emptyTransactions, { backgroundColor: colors.card }]}>
							<Text style={[styles.emptyText, { color: colors.secondaryText }]}>No recent card transactions</Text>
						</View>
					)}
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContent: {
		padding: 20,
	},
	cardContainer: {
		marginBottom: 16,
	},
	card: {
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
		fontSize: 18,
		fontWeight: "600",
		marginLeft: 12,
	},
	cardFooter: {
		alignItems: "flex-end",
	},
	cardNumber: {
		fontSize: 16,
		fontWeight: "500",
	},
	cardDetailsButton: {
		borderRadius: 12,
		padding: 16,
		alignItems: "center",
		flex: 1,
	},
	cardDetailsText: {
		fontSize: 16,
		fontWeight: "500",
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
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 16,
	},
	viewAllText: {
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
		borderRadius: 12,
		padding: 16,
		marginBottom: 16,
	},
	featureIcon: {
		width: 48,
		height: 48,
		borderRadius: 24,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
	},
	featureTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 4,
	},
	featureDescription: {
		fontSize: 12,
	},
	emptyTransactions: {
		borderRadius: 12,
		padding: 20,
		alignItems: "center",
	},
	emptyText: {
		fontSize: 14,
	},
	errorText: {
		fontSize: 16,
		textAlign: "center",
	},
})
