import React from "react"
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	ScrollView,
	Switch,
} from "react-native"
import { Stack, useRouter } from "expo-router"
import {
	CreditCard,
	Lock,
	Eye,
	EyeOff,
	Smartphone,
	DollarSign,
	Settings,
} from "lucide-react-native"
import { useUserStore } from '@/store/user-store'
import { useThemeColors } from "@/constants/colors"

export default function CardDetailsScreen() {
  const colors = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: colors.background,
  	},
  	scrollContent: {
  		padding: 20,
  	},
  	cardContainer: {
  		marginBottom: 24,
  	},
  	card: {
  		backgroundColor: colors.primary,
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
  		color: colors.background,
  		fontSize: 18,
  		fontWeight: "600",
  		marginLeft: 12,
  	},
  	cardFooter: {
  		alignItems: "flex-end",
  	},
  	cardNumber: {
  		color: colors.background,
  		fontSize: 16,
  		fontWeight: "500",
  	},
  	showNumberButton: {
  		flexDirection: "row",
  		alignItems: "center",
  		justifyContent: "center",
  		padding: 12,
  		backgroundColor: colors.card,
  		borderRadius: 12,
  	},
  	showNumberText: {
  		color: colors.text,
  		fontSize: 16,
  		fontWeight: "500",
  		marginLeft: 8,
  	},
  	section: {
  		marginBottom: 24,
  	},
  	sectionTitle: {
  		color: colors.text,
  		fontSize: 18,
  		fontWeight: "600",
  		marginBottom: 16,
  	},
  	detailItem: {
  		flexDirection: "row",
  		justifyContent: "space-between",
  		paddingVertical: 12,
  		borderBottomWidth: 1,
  		borderBottomColor: colors.border,
  	},
  	detailLabel: {
  		color: colors.secondaryText,
  		fontSize: 16,
  	},
  	detailValue: {
  		color: colors.text,
  		fontSize: 16,
  		fontWeight: "500",
  	},
  	settingItem: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  	},
  	settingIcon: {
  		width: 40,
  		height: 40,
  		borderRadius: 20,
  		backgroundColor: colors.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 12,
  	},
  	settingContent: {
  		flex: 1,
  	},
  	settingLabel: {
  		color: colors.text,
  		fontSize: 16,
  		fontWeight: "500",
  		marginBottom: 4,
  	},
  	settingDescription: {
  		color: colors.secondaryText,
  		fontSize: 14,
  	},
  	actionButton: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  	},
  	actionIcon: {
  		width: 40,
  		height: 40,
  		borderRadius: 20,
  		backgroundColor: colors.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 12,
  	},
  	actionText: {
  		color: colors.text,
  		fontSize: 16,
  		fontWeight: "500",
  	},
  	dangerButton: {
  		justifyContent: "center",
  		backgroundColor: "rgba(255, 67, 42, 0.1)",
  	},
  	dangerText: {
  		color: colors.error,
  		fontSize: 16,
  		fontWeight: "600",
  	},
  	errorText: {
  		color: colors.text,
  		fontSize: 16,
  		textAlign: "center",
  	},
  })
	const router = useRouter()
	const { user } = useUserStore()
	const [showCardNumber, setShowCardNumber] = React.useState(false)
	const [contactlessEnabled, setContactlessEnabled] = React.useState(true)
	const [onlineTransactionsEnabled, setOnlineTransactionsEnabled] =
		React.useState(true)

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
							<CreditCard size={24} color={colors.background} />
							<Text style={styles.cardName}>{user.name}</Text>
						</View>
						<View style={styles.cardFooter}>
							<Text style={styles.cardNumber}>
								{showCardNumber ? "4242 4242 4242 1234" : "•••• •••• •••• 1234"}
							</Text>
						</View>
					</View>

					<Pressable
						style={styles.showNumberButton}
						onPress={() => setShowCardNumber(!showCardNumber)}>
						{showCardNumber ? (
							<EyeOff size={20} color={colors.text} />
						) : (
							<Eye size={20} color={colors.text} />
						)}
						<Text style={styles.showNumberText}>
							{showCardNumber ? "Hide Card Number" : "Show Card Number"}
						</Text>
					</Pressable>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Card Details</Text>

					<View style={styles.detailItem}>
						<Text style={styles.detailLabel}>Card Number</Text>
						<Text style={styles.detailValue}>
							{showCardNumber ? "4242 4242 4242 1234" : "•••• •••• •••• 1234"}
						</Text>
					</View>

					<View style={styles.detailItem}>
						<Text style={styles.detailLabel}>Expiration Date</Text>
						<Text style={styles.detailValue}>12/25</Text>
					</View>

					<View style={styles.detailItem}>
						<Text style={styles.detailLabel}>CVV</Text>
						<Text style={styles.detailValue}>
							{showCardNumber ? "123" : "•••"}
						</Text>
					</View>

					<View style={styles.detailItem}>
						<Text style={styles.detailLabel}>Billing Address</Text>
						<Text style={styles.detailValue}>
							123 Main St, City, State 12345
						</Text>
					</View>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Card Settings</Text>

					<View style={styles.settingItem}>
						<View style={styles.settingIcon}>
							<Smartphone size={20} color={colors.text} />
						</View>
						<View style={styles.settingContent}>
							<Text style={styles.settingLabel}>Contactless Payments</Text>
							<Text style={styles.settingDescription}>
								Enable tap-to-pay functionality
							</Text>
						</View>
						<Switch
							value={contactlessEnabled}
							onValueChange={setContactlessEnabled}
							trackColor={{
								false: colors.border,
								true: colors.primary,
							}}
							thumbColor={colors.text}
						/>
					</View>

					<View style={styles.settingItem}>
						<View style={styles.settingIcon}>
							<DollarSign size={20} color={colors.text} />
						</View>
						<View style={styles.settingContent}>
							<Text style={styles.settingLabel}>Online Transactions</Text>
							<Text style={styles.settingDescription}>
								Allow online purchases with this card
							</Text>
						</View>
						<Switch
							value={onlineTransactionsEnabled}
							onValueChange={setOnlineTransactionsEnabled}
							trackColor={{
								false: colors.border,
								true: colors.primary,
							}}
							thumbColor={colors.text}
						/>
					</View>

					<Pressable
						style={styles.actionButton}
						onPress={() => router.push("/card-pin")}>
						<View style={styles.actionIcon}>
							<Lock size={20} color={colors.text} />
						</View>
						<Text style={styles.actionText}>Change PIN</Text>
					</Pressable>

					<Pressable
						style={styles.actionButton}
						onPress={() => router.push("/card-design")}>
						<View style={styles.actionIcon}>
							<Settings size={20} color={colors.text} />
						</View>
						<Text style={styles.actionText}>Customize Card Design</Text>
					</Pressable>

					<Pressable
						style={[styles.actionButton, styles.dangerButton]}
						onPress={() => router.push("/card-lock")}>
						<Text style={styles.dangerText}>Lock Card</Text>
					</Pressable>

					<Pressable
						style={[styles.actionButton, styles.dangerButton]}
						onPress={() => router.push("/card-replace")}>
						<Text style={styles.dangerText}>Report Lost or Stolen</Text>
					</Pressable>
				</View>
			</ScrollView>
		</View>
	)
}

