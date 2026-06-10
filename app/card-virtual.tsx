import {
	Eye,
	Copy,
	Lock,
	EyeOff,
	RefreshCw,
	CreditCard,
} from "lucide-react-native"
import React, { useState } from "react"
import { Stack, useRouter } from "expo-router"
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native"

import Colors, { useThemeColors } from "@/constants/colors"

export default function CardVirtualScreen() {
  const C = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: C.background,
  	},
  	scrollContent: {
  		padding: 20,
  	},
  	infoCard: {
  		backgroundColor: C.card,
  		borderRadius: 16,
  		padding: 20,
  		marginBottom: 24,
  	},
  	infoTitle: {
  		color: C.text,
  		fontSize: 18,
  		fontWeight: "600",
  		marginBottom: 8,
  	},
  	infoText: {
  		color: C.secondaryText,
  		fontSize: 14,
  		lineHeight: 20,
  	},
  	virtualCardContainer: {
  		marginBottom: 24,
  	},
  	virtualCard: {
  		backgroundColor: C.primary,
  		borderRadius: 16,
  		padding: 20,
  		marginBottom: 16,
  	},
  	virtualCardHeader: {
  		flexDirection: "row",
  		alignItems: "center",
  		marginBottom: 24,
  	},
  	virtualCardName: {
  		color: C.background,
  		fontSize: 18,
  		fontWeight: "600",
  		marginLeft: 12,
  	},
  	virtualCardDetails: {
  		alignItems: "flex-start",
  	},
  	virtualCardNumber: {
  		color: C.background,
  		fontSize: 18,
  		fontWeight: "500",
  		marginBottom: 16,
  		letterSpacing: 2,
  	},
  	virtualCardExpiryContainer: {
  		marginBottom: 8,
  	},
  	virtualCardExpiryLabel: {
  		color: "rgba(255, 255, 255, 0.7)",
  		fontSize: 12,
  		marginBottom: 4,
  	},
  	virtualCardExpiry: {
  		color: C.background,
  		fontSize: 16,
  		fontWeight: "500",
  	},
  	virtualCardCvvContainer: {
  		marginBottom: 8,
  	},
  	virtualCardCvvLabel: {
  		color: "rgba(255, 255, 255, 0.7)",
  		fontSize: 12,
  		marginBottom: 4,
  	},
  	virtualCardCvv: {
  		color: C.background,
  		fontSize: 16,
  		fontWeight: "500",
  	},
  	showDetailsButton: {
  		flexDirection: "row",
  		alignItems: "center",
  		justifyContent: "center",
  		backgroundColor: C.card,
  		borderRadius: 12,
  		padding: 16,
  	},
  	showDetailsText: {
  		color: C.text,
  		fontSize: 16,
  		fontWeight: "500",
  		marginLeft: 8,
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
  	cardInfoItem: {
  		backgroundColor: C.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  	},
  	cardInfoHeader: {
  		flexDirection: "row",
  		justifyContent: "space-between",
  		alignItems: "center",
  		marginBottom: 8,
  	},
  	cardInfoLabel: {
  		color: C.secondaryText,
  		fontSize: 14,
  	},
  	cardInfoValue: {
  		color: C.text,
  		fontSize: 16,
  		fontWeight: "500",
  	},
  	copyButton: {
  		padding: 4,
  	},
  	actionButton: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: C.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  	},
  	actionIcon: {
  		width: 40,
  		height: 40,
  		borderRadius: 20,
  		backgroundColor: C.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 12,
  	},
  	lockButton: {
  		backgroundColor: "rgba(255, 67, 42, 0.05)",
  	},
  	lockIcon: {
  		width: 40,
  		height: 40,
  		borderRadius: 20,
  		backgroundColor: "rgba(255, 67, 42, 0.1)",
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 12,
  	},
  	actionText: {
  		color: C.text,
  		fontSize: 16,
  		fontWeight: "500",
  	},
  	securityNote: {
  		flexDirection: "row",
  		alignItems: "flex-start",
  		backgroundColor: C.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 24,
  	},
  	securityText: {
  		color: C.secondaryText,
  		fontSize: 14,
  		marginLeft: 12,
  		flex: 1,
  	},
  	copiedToast: {
  		position: "absolute",
  		bottom: 20,
  		left: 20,
  		right: 20,
  		backgroundColor: C.success,
  		borderRadius: 12,
  		padding: 16,
  		alignItems: "center",
  	},
  	copiedToastText: {
  		color: C.background,
  		fontSize: 16,
  		fontWeight: "500",
  	},
  })
	const router = useRouter()
	const [showCardDetails, setShowCardDetails] = useState(false)
	const [copied, setCopied] = useState(false)

	const virtualCard = {
		number: "4242 4242 4242 1234",
		expiry: "12/25",
		cvv: "123",
		name: "John Doe",
	}

	const handleCopy = (text) => {
		// In a real app, you would use Clipboard.setString(text)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const handleRegenerateCard = () => {
		// In a real app, this would regenerate the virtual card
		console.log("Regenerating virtual card")
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Virtual Card" }} />

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.infoCard}>
					<Text style={styles.infoTitle}>Virtual Card</Text>
					<Text style={styles.infoText}>
						Use your virtual card for online purchases. It works just like your
						physical card but with different numbers for added security.
					</Text>
				</View>

				<View style={styles.virtualCardContainer}>
					<View style={styles.virtualCard}>
						<View style={styles.virtualCardHeader}>
							<CreditCard size={24} color={C.background} />
							<Text style={styles.virtualCardName}>{virtualCard.name}</Text>
						</View>
						<View style={styles.virtualCardDetails}>
							<Text style={styles.virtualCardNumber}>
								{showCardDetails ? virtualCard.number : "•••• •••• •••• 1234"}
							</Text>
							<View style={styles.virtualCardExpiryContainer}>
								<Text style={styles.virtualCardExpiryLabel}>Expires</Text>
								<Text style={styles.virtualCardExpiry}>
									{showCardDetails ? virtualCard.expiry : "••/••"}
								</Text>
							</View>
							<View style={styles.virtualCardCvvContainer}>
								<Text style={styles.virtualCardCvvLabel}>CVV</Text>
								<Text style={styles.virtualCardCvv}>
									{showCardDetails ? virtualCard.cvv : "•••"}
								</Text>
							</View>
						</View>
					</View>

					<Pressable
						style={styles.showDetailsButton}
						onPress={() => setShowCardDetails(!showCardDetails)}>
						{showCardDetails ? (
							<EyeOff size={20} color={C.text} />
						) : (
							<Eye size={20} color={C.text} />
						)}
						<Text style={styles.showDetailsText}>
							{showCardDetails ? "Hide Card Details" : "Show Card Details"}
						</Text>
					</Pressable>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Card Information</Text>

					<View style={styles.cardInfoItem}>
						<View style={styles.cardInfoHeader}>
							<Text style={styles.cardInfoLabel}>Card Number</Text>
							<Pressable
								style={styles.copyButton}
								onPress={() => handleCopy(virtualCard.number)}>
								<Copy size={18} color={C.primary} />
							</Pressable>
						</View>
						<Text style={styles.cardInfoValue}>
							{showCardDetails ? virtualCard.number : "•••• •••• •••• 1234"}
						</Text>
					</View>

					<View style={styles.cardInfoItem}>
						<View style={styles.cardInfoHeader}>
							<Text style={styles.cardInfoLabel}>Expiration Date</Text>
							<Pressable
								style={styles.copyButton}
								onPress={() => handleCopy(virtualCard.expiry)}>
								<Copy size={18} color={C.primary} />
							</Pressable>
						</View>
						<Text style={styles.cardInfoValue}>
							{showCardDetails ? virtualCard.expiry : "••/••"}
						</Text>
					</View>

					<View style={styles.cardInfoItem}>
						<View style={styles.cardInfoHeader}>
							<Text style={styles.cardInfoLabel}>CVV</Text>
							<Pressable
								style={styles.copyButton}
								onPress={() => handleCopy(virtualCard.cvv)}>
								<Copy size={18} color={C.primary} />
							</Pressable>
						</View>
						<Text style={styles.cardInfoValue}>
							{showCardDetails ? virtualCard.cvv : "•••"}
						</Text>
					</View>

					<View style={styles.cardInfoItem}>
						<Text style={styles.cardInfoLabel}>Cardholder Name</Text>
						<Text style={styles.cardInfoValue}>{virtualCard.name}</Text>
					</View>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Card Management</Text>

					<Pressable style={styles.actionButton} onPress={handleRegenerateCard}>
						<View style={styles.actionIcon}>
							<RefreshCw size={20} color={C.text} />
						</View>
						<Text style={styles.actionText}>Regenerate Card</Text>
					</Pressable>

					<Pressable
						style={[styles.actionButton, styles.lockButton]}
						onPress={() => router.push("/card-security")}>
						<View style={styles.lockIcon}>
							<Lock size={20} color={C.text} />
						</View>
						<Text style={styles.actionText}>Lock Virtual Card</Text>
					</Pressable>
				</View>

				<View style={styles.securityNote}>
					<Lock size={16} color={C.secondaryText} />
					<Text style={styles.securityText}>
						Your virtual card details are encrypted and secure. We use
						bank-level security to protect your data.
					</Text>
				</View>

				{copied && (
					<View style={styles.copiedToast}>
						<Text style={styles.copiedToastText}>Copied to clipboard</Text>
					</View>
				)}
			</ScrollView>
		</View>
	)
}

