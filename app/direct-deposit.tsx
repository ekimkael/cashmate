import React, { useState } from "react"
import { Stack, useRouter } from "expo-router"
import { Copy, Info } from "lucide-react-native"
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native"

import Colors, { useThemeColors } from "@/constants/colors"
import Button from "@/components/ui/button"

export default function DirectDepositScreen() {
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
  	section: {
  		marginBottom: 24,
  	},
  	sectionTitle: {
  		color: C.text,
  		fontSize: 18,
  		fontWeight: "600",
  		marginBottom: 16,
  	},
  	sectionDescription: {
  		color: C.secondaryText,
  		fontSize: 14,
  		marginBottom: 16,
  	},
  	accountInfoItem: {
  		backgroundColor: C.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  	},
  	accountInfoHeader: {
  		flexDirection: "row",
  		justifyContent: "space-between",
  		alignItems: "center",
  		marginBottom: 8,
  	},
  	accountInfoLabel: {
  		color: C.secondaryText,
  		fontSize: 14,
  	},
  	accountInfoValue: {
  		color: C.text,
  		fontSize: 18,
  		fontWeight: "500",
  	},
  	copyButton: {
  		padding: 4,
  	},
  	noteContainer: {
  		flexDirection: "row",
  		alignItems: "flex-start",
  		backgroundColor: C.card,
  		borderRadius: 12,
  		padding: 16,
  	},
  	noteText: {
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
	const [copied, setCopied] = useState(false)

	const accountInfo = {
		routingNumber: "123456789",
		accountNumber: "987654321",
		accountType: "Checking",
		bankName: "Cash Mate",
	}

	const handleCopy = (text) => {
		// In a real app, you would use Clipboard.setString(text)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const handleDownloadForm = () => {
		// In a real app, this would download a direct deposit form
		router.push("/direct-deposit/form")
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Direct Deposit" }} />

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.infoCard}>
					<Text style={styles.infoTitle}>Get paid up to 2 days early</Text>
					<Text style={styles.infoText}>
						Set up direct deposit with your employer to get your paycheck
						directly in your Cash App account.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Your Account Information</Text>

					<View style={styles.accountInfoItem}>
						<View style={styles.accountInfoHeader}>
							<Text style={styles.accountInfoLabel}>Routing Number</Text>
							<Pressable
								style={styles.copyButton}
								onPress={() => handleCopy(accountInfo.routingNumber)}>
								<Copy size={18} color={C.primary} />
							</Pressable>
						</View>
						<Text style={styles.accountInfoValue}>
							{accountInfo.routingNumber}
						</Text>
					</View>

					<View style={styles.accountInfoItem}>
						<View style={styles.accountInfoHeader}>
							<Text style={styles.accountInfoLabel}>Account Number</Text>
							<Pressable
								style={styles.copyButton}
								onPress={() => handleCopy(accountInfo.accountNumber)}>
								<Copy size={18} color={C.primary} />
							</Pressable>
						</View>
						<Text style={styles.accountInfoValue}>
							{accountInfo.accountNumber}
						</Text>
					</View>

					<View style={styles.accountInfoItem}>
						<Text style={styles.accountInfoLabel}>Account Type</Text>
						<Text style={styles.accountInfoValue}>
							{accountInfo.accountType}
						</Text>
					</View>

					<View style={styles.accountInfoItem}>
						<Text style={styles.accountInfoLabel}>Bank Name</Text>
						<Text style={styles.accountInfoValue}>{accountInfo.bankName}</Text>
					</View>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Direct Deposit Form</Text>
					<Text style={styles.sectionDescription}>
						Download and fill out this form to give to your employer.
					</Text>

					<Button label="Download Form" onPress={handleDownloadForm} />
				</View>

				<View style={styles.section}>
					<View style={styles.noteContainer}>
						<Info size={20} color={C.secondaryText} />
						<Text style={styles.noteText}>
							Your money is FDIC insured up to $250,000 through our banking
							partners.
						</Text>
					</View>
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

