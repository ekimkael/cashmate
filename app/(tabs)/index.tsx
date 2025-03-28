import {
	Scan,
	Bell,
	QrCode,
	ArrowUpRight,
	ArrowDownLeft,
} from "lucide-react-native"
import React from "react"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native"

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
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Dashboard</Text>

				<Pressable style={styles.notifcationButton}>
					<Bell size={20} color={Colors.dark.text} />
				</Pressable>
			</View>

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
							Instantly deposit money to your Cash Mate
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
	scrollContent: { padding: 20, paddingTop: 8 },
	header: {
		padding: 20,
		paddingBottom: 0,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: "700",
		color: Colors.dark.text,
	},
	notifcationButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.dark.card,
	},
	actionsContainer: { marginBottom: 24 },
	actionsRow: {
		marginBottom: 16,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	actionButton: { width: "48%" },
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 16,
		color: Colors.dark.text,
	},
	depositCard: {
		padding: 20,
		borderRadius: 16,
		backgroundColor: Colors.dark.card,
	},
	depositCardTitle: {
		fontSize: 18,
		marginBottom: 8,
		fontWeight: "600",
		color: Colors.dark.text,
	},
	depositCardDescription: {
		fontSize: 14,
		color: Colors.dark.secondaryText,
	},
	cardContainer: { marginBottom: 16 },
	card: {
		padding: 20,
		height: 180,
		borderRadius: 16,
		marginBottom: 12,
		justifyContent: "space-between",
		backgroundColor: Colors.dark.primary,
	},
	cardHeader: { alignItems: "flex-start" },
	cardName: {
		fontSize: 18,
		fontWeight: "600",
		color: Colors.dark.background,
	},
	cardFooter: { alignItems: "flex-end" },
	cardNumber: {
		fontSize: 16,
		fontWeight: "500",
		color: Colors.dark.background,
	},
	cardDescription: {
		fontSize: 14,
		color: Colors.dark.secondaryText,
	},
	errorText: {
		fontSize: 16,
		textAlign: "center",
		color: Colors.dark.text,
	},
})
