import {
	View,
	Text,
	StyleSheet,
	Pressable,
	ScrollView,
	Switch,
} from "react-native"
import React, { useState } from "react"
import { Stack, useRouter } from "expo-router"
import {
	Lock,
	ShieldAlert,
	CreditCard,
	AlertTriangle,
	Smartphone,
} from "lucide-react-native"
import Colors from "@/constants/colors"

export default function CardSecurityScreen() {
	const router = useRouter()
	const [isCardLocked, setIsCardLocked] = useState(false)
	const [locationBasedSecurity, setLocationBasedSecurity] = useState(true)
	const [internationalTransactions, setInternationalTransactions] =
		useState(false)
	const [atmWithdrawals, setAtmWithdrawals] = useState(true)

	const handleLockCard = () => {
		setIsCardLocked(!isCardLocked)
		// In a real app, this would call an API to lock/unlock the card
	}

	const handleReportLost = () => {
		router.push("/card-replace")
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Card Security" }} />

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.lockCard}>
					<View style={styles.lockCardContent}>
						<View
							style={[
								styles.lockIcon,
								isCardLocked ? styles.lockedIcon : styles.unlockedIcon,
							]}>
							<Lock
								size={24}
								color={isCardLocked ? Colors.dark.error : Colors.dark.success}
							/>
						</View>
						<View style={styles.lockInfo}>
							<Text style={styles.lockTitle}>
								{isCardLocked ? "Card Locked" : "Card Active"}
							</Text>
							<Text style={styles.lockDescription}>
								{isCardLocked
									? "Your card is locked. No purchases or withdrawals can be made."
									: "Your card is active and ready for use."}
							</Text>
						</View>
					</View>

					<Pressable
						style={[
							styles.lockButton,
							isCardLocked ? styles.unlockButton : styles.lockButtonRed,
						]}
						onPress={handleLockCard}>
						<Text style={styles.lockButtonText}>
							{isCardLocked ? "Unlock Card" : "Lock Card"}
						</Text>
					</Pressable>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Security Settings</Text>

					<View style={styles.settingItem}>
						<View style={styles.settingIcon}>
							<Smartphone size={20} color={Colors.dark.text} />
						</View>
						<View style={styles.settingContent}>
							<Text style={styles.settingLabel}>Location-Based Security</Text>
							<Text style={styles.settingDescription}>
								Prevent transactions far from your phone's location
							</Text>
						</View>
						<Switch
							value={locationBasedSecurity}
							onValueChange={setLocationBasedSecurity}
							trackColor={{
								false: Colors.dark.border,
								true: Colors.dark.primary,
							}}
							thumbColor={Colors.dark.text}
						/>
					</View>

					<View style={styles.settingItem}>
						<View style={styles.settingIcon}>
							<CreditCard size={20} color={Colors.dark.text} />
						</View>
						<View style={styles.settingContent}>
							<Text style={styles.settingLabel}>
								International Transactions
							</Text>
							<Text style={styles.settingDescription}>
								Allow purchases outside your country
							</Text>
						</View>
						<Switch
							value={internationalTransactions}
							onValueChange={setInternationalTransactions}
							trackColor={{
								false: Colors.dark.border,
								true: Colors.dark.primary,
							}}
							thumbColor={Colors.dark.text}
						/>
					</View>

					<View style={styles.settingItem}>
						<View style={styles.settingIcon}>
							<ShieldAlert size={20} color={Colors.dark.text} />
						</View>
						<View style={styles.settingContent}>
							<Text style={styles.settingLabel}>ATM Withdrawals</Text>
							<Text style={styles.settingDescription}>
								Allow cash withdrawals at ATMs
							</Text>
						</View>
						<Switch
							value={atmWithdrawals}
							onValueChange={setAtmWithdrawals}
							trackColor={{
								false: Colors.dark.border,
								true: Colors.dark.primary,
							}}
							thumbColor={Colors.dark.text}
						/>
					</View>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Card Management</Text>

					<Pressable
						style={styles.actionButton}
						onPress={() => router.push("/card-pin")}>
						<View style={styles.actionIcon}>
							<Lock size={20} color={Colors.dark.text} />
						</View>
						<Text style={styles.actionText}>Change PIN</Text>
					</Pressable>

					<Pressable
						style={styles.actionButton}
						onPress={() => router.push("/card-limits")}>
						<View style={styles.actionIcon}>
							<ShieldAlert size={20} color={Colors.dark.text} />
						</View>
						<Text style={styles.actionText}>Set Spending Limits</Text>
					</Pressable>

					<Pressable
						style={[styles.actionButton, styles.dangerButton]}
						onPress={handleReportLost}>
						<View style={styles.dangerIcon}>
							<AlertTriangle size={20} color={Colors.dark.error} />
						</View>
						<Text style={styles.dangerText}>Report Lost or Stolen</Text>
					</Pressable>
				</View>

				<Text style={styles.securityNote}>
					If you notice any suspicious activity on your account, please contact
					customer support immediately.
				</Text>
			</ScrollView>
		</View>
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
	lockCard: {
		backgroundColor: Colors.dark.card,
		borderRadius: 16,
		padding: 20,
		marginBottom: 24,
	},
	lockCardContent: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	lockIcon: {
		width: 48,
		height: 48,
		borderRadius: 24,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 16,
	},
	lockedIcon: {
		backgroundColor: "rgba(255, 67, 42, 0.1)",
	},
	unlockedIcon: {
		backgroundColor: "rgba(0, 214, 50, 0.1)",
	},
	lockInfo: {
		flex: 1,
	},
	lockTitle: {
		color: Colors.dark.text,
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 4,
	},
	lockDescription: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
	},
	lockButton: {
		borderRadius: 12,
		padding: 16,
		alignItems: "center",
		justifyContent: "center",
	},
	lockButtonRed: {
		backgroundColor: "rgba(255, 67, 42, 0.1)",
	},
	unlockButton: {
		backgroundColor: "rgba(0, 214, 50, 0.1)",
	},
	lockButtonText: {
		color: Colors.dark.error,
		fontSize: 16,
		fontWeight: "600",
	},
	section: {
		marginBottom: 24,
	},
	sectionTitle: {
		color: Colors.dark.text,
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 16,
	},
	settingItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.dark.card,
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
	},
	settingIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.dark.inputBackground,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
	settingContent: {
		flex: 1,
	},
	settingLabel: {
		color: Colors.dark.text,
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 4,
	},
	settingDescription: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
	},
	actionButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.dark.card,
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
	},
	actionIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.dark.inputBackground,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
	actionText: {
		color: Colors.dark.text,
		fontSize: 16,
		fontWeight: "500",
	},
	dangerButton: {
		backgroundColor: "rgba(255, 67, 42, 0.05)",
	},
	dangerIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "rgba(255, 67, 42, 0.1)",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
	dangerText: {
		color: Colors.dark.error,
		fontSize: 16,
		fontWeight: "500",
	},
	securityNote: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
		textAlign: "center",
		marginBottom: 24,
	},
})
