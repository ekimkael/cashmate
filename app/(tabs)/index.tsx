import React from "react"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native"
import { ArrowUpRight, ArrowDownLeft, Scan, QrCode } from "lucide-react-native"

import Colors from "@/constants/colors"
import { useUserStore } from "@/store/userStore"

import BalanceCard from "@/components/BalanceCard"
import ActionButton from "@/components/ActionButton"

export default function HomeScreen() {
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
				<BalanceCard balance={user.balance} />

				<View style={styles.actionsContainer}>
					<View style={styles.actionsRow}>
						<ActionButton
							icon={ArrowUpRight}
							label="Send"
							onPress={() => router.push("/send")}
							style={styles.actionButton}
						/>
						<ActionButton
							icon={ArrowDownLeft}
							label="Request"
							onPress={() => router.push("/request")}
							style={styles.actionButton}
						/>
					</View>
					<View style={styles.actionsRow}>
						<ActionButton
							icon={Scan}
							label="Scan"
							onPress={() => router.push("/scan")}
							style={styles.actionButton}
							variant="secondary"
						/>
						<ActionButton
							icon={QrCode}
							label="QR Code"
							onPress={() => router.push("/qrcode")}
							style={styles.actionButton}
							variant="secondary"
						/>
					</View>
				</View>

				<View style={{ marginBottom: 16 }}>
					<Text style={styles.sectionTitle}>Instant Deposit</Text>
					<Pressable
						style={styles.depositCard}
						onPress={() => router.push("/deposit")}>
						<Text style={styles.depositCardTitle}>Add Cash</Text>
						<Text style={styles.depositCardDescription}>
							Instantly deposit money to your Cash App
						</Text>
					</Pressable>
				</View>

				{/* <View>
					<Text style={styles.sectionTitle}>Cash Card</Text>
					<Pressable
						style={styles.cardContainer}
						onPress={() => router.push("/card")}>
						<View style={styles.card}>
							<View style={styles.cardHeader}>
								<Text style={styles.cardName}>{user.name}</Text>
							</View>
							<View style={styles.cardFooter}>
								<Text style={styles.cardNumber}>•••• 1234</Text>
							</View>
						</View>
						<Text style={styles.cardDescription}>
							Use your Cash Card for online and in-store purchases
						</Text>
					</Pressable>
				</View> */}
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
	profileButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.dark.card,
		alignItems: "center",
		justifyContent: "center",
	},
	searchButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.dark.card,
		alignItems: "center",
		justifyContent: "center",
	},
	actionsContainer: { marginBottom: 24 },
	actionsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	actionButton: { width: "48%" },
	sectionTitle: {
		color: Colors.dark.text,
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 16,
	},
	depositCard: {
		backgroundColor: Colors.dark.card,
		borderRadius: 16,
		padding: 20,
	},
	depositCardTitle: {
		color: Colors.dark.text,
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 8,
	},
	depositCardDescription: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
	},
	cardContainer: {
		marginBottom: 16,
	},
	card: {
		backgroundColor: Colors.dark.primary,
		borderRadius: 16,
		padding: 20,
		height: 180,
		marginBottom: 12,
		justifyContent: "space-between",
	},
	cardHeader: {
		alignItems: "flex-start",
	},
	cardName: {
		color: Colors.dark.background,
		fontSize: 18,
		fontWeight: "600",
	},
	cardFooter: {
		alignItems: "flex-end",
	},
	cardNumber: {
		color: Colors.dark.background,
		fontSize: 16,
		fontWeight: "500",
	},
	cardDescription: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
	},
	errorText: {
		color: Colors.dark.text,
		fontSize: 16,
		textAlign: "center",
	},
})
