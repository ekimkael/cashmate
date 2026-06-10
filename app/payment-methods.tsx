import React from "react"
import { Stack, useRouter } from "expo-router"
import { CreditCard, Plus, Trash2, Building } from "lucide-react-native"
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native"

import { useThemeColors } from "@/constants/colors"
import Button from "@/components/ui/button"

export default function PaymentMethodsScreen() {
  const colors = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: colors.background,
  	},
  	scrollContent: {
  		padding: 20,
  	},
  	section: {
  		marginBottom: 32,
  	},
  	sectionTitle: {
  		color: colors.text,
  		fontSize: 18,
  		fontWeight: "600",
  		marginBottom: 16,
  	},
  	paymentMethod: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  	},
  	paymentMethodIcon: {
  		width: 48,
  		height: 48,
  		borderRadius: 24,
  		backgroundColor: colors.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 16,
  	},
  	paymentMethodDetails: {
  		flex: 1,
  	},
  	paymentMethodName: {
  		color: colors.text,
  		fontSize: 16,
  		fontWeight: "500",
  		marginBottom: 4,
  	},
  	paymentMethodNumber: {
  		color: colors.secondaryText,
  		fontSize: 14,
  	},
  	deleteButton: {
  		padding: 8,
  	},
  	addButton: {
  		flexDirection: "row",
  		alignItems: "center",
  		justifyContent: "center",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		borderWidth: 1,
  		borderColor: colors.border,
  		borderStyle: "dashed",
  	},
  	addButtonText: {
  		color: colors.primary,
  		fontSize: 16,
  		fontWeight: "500",
  		marginLeft: 8,
  	},
  	securityNote: {
  		color: colors.secondaryText,
  		fontSize: 14,
  		textAlign: "center",
  		marginTop: 16,
  	},
  })
	const router = useRouter()

	const paymentMethods = [
		{
			id: "1",
			type: "card",
			name: "Visa Debit",
			number: "•••• 4567",
			expiry: "12/25",
		},
		{
			id: "2",
			type: "bank",
			name: "Chase Bank",
			number: "•••• 7890",
			accountType: "Checking",
		},
	]

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Payment Methods" }} />

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Cards</Text>

					{paymentMethods
						.filter((method) => method.type === "card")
						.map((card) => (
							<Pressable
								key={card.id}
								style={styles.paymentMethod}
								onPress={() =>
									router.push({
										pathname: "/payment-methods",
										params: { id: card.id },
									})
								}>
								<View style={styles.paymentMethodIcon}>
									<CreditCard size={24} color={colors.text} />
								</View>
								<View style={styles.paymentMethodDetails}>
									<Text style={styles.paymentMethodName}>{card.name}</Text>
									<Text style={styles.paymentMethodNumber}>
										{card.number} • Expires {card.expiry}
									</Text>
								</View>
								<Pressable style={styles.deleteButton}>
									<Trash2 size={20} color={colors.secondaryText} />
								</Pressable>
							</Pressable>
						))}

					<Pressable
						style={styles.addButton}
						onPress={() => router.push("/add-card")}>
						<Plus size={20} color={colors.primary} />
						<Text style={styles.addButtonText}>Add New Card</Text>
					</Pressable>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Bank Accounts</Text>

					{paymentMethods
						.filter((method) => method.type === "bank")
						.map((bank) => (
							<Pressable
								key={bank.id}
								style={styles.paymentMethod}
								onPress={() => router.push(`/payment-method/${bank.id}`)}>
								<View style={styles.paymentMethodIcon}>
									<Building size={24} color={colors.text} />
								</View>
								<View style={styles.paymentMethodDetails}>
									<Text style={styles.paymentMethodName}>{bank.name}</Text>
									<Text style={styles.paymentMethodNumber}>
										{bank.number} • {bank.accountType}
									</Text>
								</View>
								<Pressable style={styles.deleteButton}>
									<Trash2 size={20} color={colors.secondaryText} />
								</Pressable>
							</Pressable>
						))}

					<Pressable
						style={styles.addButton}
						onPress={() => router.push("/add-bank")}>
						<Plus size={20} color={colors.primary} />
						<Text style={styles.addButtonText}>Add Bank Account</Text>
					</Pressable>
				</View>

				<Text style={styles.securityNote}>
					Your payment information is encrypted and securely stored. We never
					share your financial details with merchants.
				</Text>
			</ScrollView>
		</View>
	)
}

