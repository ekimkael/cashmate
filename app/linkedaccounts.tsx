import React from "react"
import { Stack, useRouter } from "expo-router"
import { CreditCard, Building, Trash2, Plus } from "lucide-react-native"
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native"

import Colors, { useThemeColors } from "@/constants/colors"
import Button from "@/components/ui/button"

const linkedAccounts = [
	{
		id: "1",
		type: "bank",
		name: "Chase Bank",
		accountType: "Checking",
		accountNumber: "•••• 5678",
		isDefault: true,
	},
	{
		id: "2",
		type: "card",
		name: "Visa Debit",
		accountNumber: "•••• 1234",
		expiry: "12/25",
		isDefault: false,
	},
]

export default function LinkedAccountsScreen() {
  const C = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: C.background,
  	},
  	scrollContent: {
  		padding: 20,
  	},
  	description: {
  		color: C.secondaryText,
  		fontSize: 16,
  		marginBottom: 24,
  	},
  	section: {
  		marginBottom: 24,
  	},
  	sectionTitle: {
  		color: C.text,
  		fontSize: 18,
  		fontWeight: "600",
  		marginBottom: 16,
  	},
  	accountCard: {
  		backgroundColor: C.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  	},
  	accountHeader: {
  		flexDirection: "row",
  		alignItems: "center",
  		marginBottom: 16,
  	},
  	accountIcon: {
  		width: 48,
  		height: 48,
  		borderRadius: 24,
  		backgroundColor: C.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 16,
  	},
  	accountInfo: {
  		flex: 1,
  	},
  	accountName: {
  		color: C.text,
  		fontSize: 16,
  		fontWeight: "500",
  		marginBottom: 4,
  	},
  	accountDetails: {
  		color: C.secondaryText,
  		fontSize: 14,
  	},
  	accountActions: {
  		flexDirection: "row",
  		justifyContent: "space-between",
  		alignItems: "center",
  	},
  	defaultBadge: {
  		backgroundColor: "rgba(0, 214, 50, 0.1)",
  		borderRadius: 12,
  		paddingVertical: 6,
  		paddingHorizontal: 12,
  	},
  	defaultText: {
  		color: C.primary,
  		fontSize: 14,
  		fontWeight: "500",
  	},
  	setDefaultButton: {
  		paddingVertical: 6,
  		paddingHorizontal: 12,
  	},
  	setDefaultText: {
  		color: C.primary,
  		fontSize: 14,
  		fontWeight: "500",
  	},
  	removeButton: {
  		width: 40,
  		height: 40,
  		borderRadius: 20,
  		backgroundColor: "rgba(255, 67, 42, 0.1)",
  		alignItems: "center",
  		justifyContent: "center",
  	},
  	addButton: {
  		flexDirection: "row",
  		alignItems: "center",
  		justifyContent: "center",
  		backgroundColor: C.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 24,
  		borderWidth: 1,
  		borderColor: C.border,
  		borderStyle: "dashed",
  	},
  	addButtonText: {
  		color: C.primary,
  		fontSize: 16,
  		fontWeight: "500",
  		marginLeft: 8,
  	},
  	securityNote: {
  		color: C.secondaryText,
  		fontSize: 14,
  		textAlign: "center",
  	},
  })
	const router = useRouter()

	const handleRemoveAccount = (account) => {
		// In a real app, this would remove the account
		console.log(`Removing account: ${account.name}`)
	}

	const handleSetDefault = (account) => {
		// In a real app, this would set the account as default
		console.log(`Setting ${account.name} as default`)
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Linked Accounts" }} />

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<Text style={styles.description}>
					Manage your linked bank accounts and cards for deposits and
					withdrawals.
				</Text>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Bank Accounts</Text>

					{linkedAccounts
						.filter((account) => account.type === "bank")
						.map((account) => (
							<View key={account.id} style={styles.accountCard}>
								<View style={styles.accountHeader}>
									<View style={styles.accountIcon}>
										<Building size={24} color={C.text} />
									</View>
									<View style={styles.accountInfo}>
										<Text style={styles.accountName}>{account.name}</Text>
										<Text style={styles.accountDetails}>
											{account.accountType} • {account.accountNumber}
										</Text>
									</View>
								</View>

								<View style={styles.accountActions}>
									{account.isDefault ? (
										<View style={styles.defaultBadge}>
											<Text style={styles.defaultText}>Default</Text>
										</View>
									) : (
										<Pressable
											style={styles.setDefaultButton}
											onPress={() => handleSetDefault(account)}>
											<Text style={styles.setDefaultText}>Set as Default</Text>
										</Pressable>
									)}

									<Pressable
										style={styles.removeButton}
										onPress={() => handleRemoveAccount(account)}>
										<Trash2 size={20} color={C.error} />
									</Pressable>
								</View>
							</View>
						))}
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Cards</Text>

					{linkedAccounts
						.filter((account) => account.type === "card")
						.map((account) => (
							<View key={account.id} style={styles.accountCard}>
								<View style={styles.accountHeader}>
									<View style={styles.accountIcon}>
										<CreditCard size={24} color={C.text} />
									</View>
									<View style={styles.accountInfo}>
										<Text style={styles.accountName}>{account.name}</Text>
										<Text style={styles.accountDetails}>
											{account.accountNumber} • Expires {account.expiry}
										</Text>
									</View>
								</View>

								<View style={styles.accountActions}>
									{account.isDefault ? (
										<View style={styles.defaultBadge}>
											<Text style={styles.defaultText}>Default</Text>
										</View>
									) : (
										<Pressable
											style={styles.setDefaultButton}
											onPress={() => handleSetDefault(account)}>
											<Text style={styles.setDefaultText}>Set as Default</Text>
										</Pressable>
									)}

									<Pressable
										style={styles.removeButton}
										onPress={() => handleRemoveAccount(account)}>
										<Trash2 size={20} color={C.error} />
									</Pressable>
								</View>
							</View>
						))}
				</View>

				<Pressable
					style={styles.addButton}
					onPress={() => router.push("/linkaccount")}>
					<Plus size={20} color={C.primary} />
					<Text style={styles.addButtonText}>Link a New Account</Text>
				</Pressable>

				<Text style={styles.securityNote}>
					Your financial information is encrypted and secure. We never store
					your full account details.
				</Text>
			</ScrollView>
		</View>
	)
}

