import {
	View,
	Text,
	StyleSheet,
	Pressable,
	TextInput,
	ScrollView,
} from "react-native"
import React, { useState } from "react"
import { Stack, useRouter } from "expo-router"
import { CreditCard, Building, ChevronRight, Lock } from "lucide-react-native"

import Colors, { useThemeColors } from "@/constants/colors"
import Button from "@/components/ui/button"

export default function LinkAccountScreen() {
  const colors = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: colors.background,
  	},
  	methodContainer: {
  		flex: 1,
  		padding: 20,
  	},
  	scrollContent: {
  		padding: 20,
  	},
  	title: {
  		color: colors.text,
  		fontSize: 24,
  		fontWeight: "600",
  		marginBottom: 24,
  	},
  	methodCard: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 16,
  	},
  	methodIcon: {
  		width: 48,
  		height: 48,
  		borderRadius: 24,
  		backgroundColor: colors.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 16,
  	},
  	methodInfo: {
  		flex: 1,
  	},
  	methodTitle: {
  		color: colors.text,
  		fontSize: 16,
  		fontWeight: "500",
  		marginBottom: 4,
  	},
  	methodDescription: {
  		color: colors.secondaryText,
  		fontSize: 14,
  	},
  	securityNote: {
  		flexDirection: "row",
  		alignItems: "flex-start",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		marginTop: 24,
  	},
  	securityText: {
  		color: colors.secondaryText,
  		fontSize: 14,
  		marginLeft: 12,
  		flex: 1,
  	},
  	searchContainer: {
  		marginBottom: 24,
  	},
  	searchInput: {
  		backgroundColor: colors.inputBackground,
  		borderRadius: 12,
  		padding: 16,
  		color: colors.text,
  		fontSize: 16,
  	},
  	bankList: {
  		marginBottom: 24,
  	},
  	bankItem: {
  		flexDirection: "row",
  		justifyContent: "space-between",
  		alignItems: "center",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  	},
  	bankName: {
  		color: colors.text,
  		fontSize: 16,
  		fontWeight: "500",
  	},
  	manualButton: {
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		alignItems: "center",
  		justifyContent: "center",
  		borderWidth: 1,
  		borderColor: colors.border,
  		borderStyle: "dashed",
  	},
  	manualButtonText: {
  		color: colors.primary,
  		fontSize: 16,
  		fontWeight: "500",
  	},
  	cardForm: {
  		marginBottom: 24,
  	},
  	inputGroup: {
  		marginBottom: 16,
  	},
  	inputRow: {
  		flexDirection: "row",
  		justifyContent: "space-between",
  	},
  	inputLabel: {
  		color: colors.secondaryText,
  		fontSize: 14,
  		marginBottom: 8,
  	},
  	input: {
  		backgroundColor: colors.inputBackground,
  		borderRadius: 12,
  		padding: 16,
  		color: colors.text,
  		fontSize: 16,
  	},
  })
	const router = useRouter()
	const [linkMethod, setLinkMethod] = useState(null)

	const bankOptions = [
		{ id: "1", name: "Chase" },
		{ id: "2", name: "Bank of America" },
		{ id: "3", name: "Wells Fargo" },
		{ id: "4", name: "Citibank" },
		{ id: "5", name: "Capital One" },
		{ id: "6", name: "TD Bank" },
		{ id: "7", name: "US Bank" },
		{ id: "8", name: "PNC Bank" },
	]

	const handleSelectBank = (bank) => {
		// In a real app, this would navigate to the bank's login page
		router.push("/link-account/connect")
	}

	const handleManualEntry = () => {
		router.push("/link-account/manual")
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Link Account" }} />

			{!linkMethod ? (
				<View style={styles.methodContainer}>
					<Text style={styles.title}>Choose a link method</Text>

					<Pressable
						style={styles.methodCard}
						onPress={() => setLinkMethod("bank")}>
						<View style={styles.methodIcon}>
							<Building size={24} color={colors.text} />
						</View>
						<View style={styles.methodInfo}>
							<Text style={styles.methodTitle}>Link a Bank Account</Text>
							<Text style={styles.methodDescription}>
								Connect your checking or savings account
							</Text>
						</View>
						<ChevronRight size={20} color={colors.secondaryText} />
					</Pressable>

					<Pressable
						style={styles.methodCard}
						onPress={() => setLinkMethod("card")}>
						<View style={styles.methodIcon}>
							<CreditCard size={24} color={colors.text} />
						</View>
						<View style={styles.methodInfo}>
							<Text style={styles.methodTitle}>Link a Debit Card</Text>
							<Text style={styles.methodDescription}>
								Connect your debit card for instant transfers
							</Text>
						</View>
						<ChevronRight size={20} color={colors.secondaryText} />
					</Pressable>

					<View style={styles.securityNote}>
						<Lock size={16} color={colors.secondaryText} />
						<Text style={styles.securityText}>
							Your financial information is encrypted and secure. We use
							bank-level security to protect your data.
						</Text>
					</View>
				</View>
			) : linkMethod === "bank" ? (
				<ScrollView contentContainerStyle={styles.scrollContent}>
					<Text style={styles.title}>Select your bank</Text>

					<View style={styles.searchContainer}>
						<TextInput
							style={styles.searchInput}
							placeholder="Search for your bank"
							placeholderTextColor={colors.secondaryText}
						/>
					</View>

					<View style={styles.bankList}>
						{bankOptions.map((bank) => (
							<Pressable
								key={bank.id}
								style={styles.bankItem}
								onPress={() => handleSelectBank(bank)}>
								<Text style={styles.bankName}>{bank.name}</Text>
								<ChevronRight size={20} color={colors.secondaryText} />
							</Pressable>
						))}
					</View>

					<Pressable style={styles.manualButton} onPress={handleManualEntry}>
						<Text style={styles.manualButtonText}>
							Enter Account Details Manually
						</Text>
					</Pressable>
				</ScrollView>
			) : (
				<ScrollView contentContainerStyle={styles.scrollContent}>
					<Text style={styles.title}>Add a debit card</Text>

					<View style={styles.cardForm}>
						<View style={styles.inputGroup}>
							<Text style={styles.inputLabel}>Card Number</Text>
							<TextInput
								style={styles.input}
								placeholder="1234 5678 9012 3456"
								placeholderTextColor={colors.secondaryText}
								keyboardType="number-pad"
							/>
						</View>

						<View style={styles.inputRow}>
							<View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
								<Text style={styles.inputLabel}>Expiry Date</Text>
								<TextInput
									style={styles.input}
									placeholder="MM/YY"
									placeholderTextColor={colors.secondaryText}
									keyboardType="number-pad"
								/>
							</View>

							<View style={[styles.inputGroup, { flex: 1 }]}>
								<Text style={styles.inputLabel}>CVV</Text>
								<TextInput
									style={styles.input}
									placeholder="123"
									placeholderTextColor={colors.secondaryText}
									keyboardType="number-pad"
									secureTextEntry
								/>
							</View>
						</View>

						<View style={styles.inputGroup}>
							<Text style={styles.inputLabel}>Name on Card</Text>
							<TextInput
								style={styles.input}
								placeholder="John Doe"
								placeholderTextColor={colors.secondaryText}
							/>
						</View>

						<View style={styles.inputGroup}>
							<Text style={styles.inputLabel}>Billing Zip Code</Text>
							<TextInput
								style={styles.input}
								placeholder="12345"
								placeholderTextColor={colors.secondaryText}
								keyboardType="number-pad"
							/>
						</View>
					</View>

					<Button label="Add Card" onPress={() => router.push("/linked-accounts")} style={{ marginBottom: 24 }} />

					<View style={styles.securityNote}>
						<Lock size={16} color={colors.secondaryText} />
						<Text style={styles.securityText}>
							Your card information is encrypted and secure. We use bank-level
							security to protect your data.
						</Text>
					</View>
				</ScrollView>
			)}
		</View>
	)
}

