import React, { useState } from "react"
import { Stack, useRouter } from "expo-router"
import { Lock, Unlock, AlertTriangle } from "lucide-react-native"
import { View, Text, StyleSheet, Pressable, Alert } from "react-native"

import Colors from "@/constants/colors"

export default function CardLockScreen() {
	const router = useRouter()
	const [isLocked, setIsLocked] = useState(false)
	const [reason, setReason] = useState("temporary")

	const handleLockCard = () => {
		// In a real app, this would call an API to lock the card
		setIsLocked(true)
		Alert.alert(
			"Card Locked",
			"Your card has been locked. No purchases or withdrawals can be made.",
			[{ text: "OK" }]
		)
	}

	const handleUnlockCard = () => {
		// In a real app, this would call an API to unlock the card
		setIsLocked(false)
		Alert.alert(
			"Card Unlocked",
			"Your card has been unlocked and is now ready for use.",
			[{ text: "OK" }]
		)
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Lock Card" }} />

			<View style={styles.content}>
				<View
					style={[
						styles.statusContainer,
						isLocked ? styles.lockedContainer : styles.unlockedContainer,
					]}>
					<View
						style={[
							styles.statusIcon,
							isLocked ? styles.lockedIcon : styles.unlockedIcon,
						]}>
						{isLocked ? (
							<Lock size={32} color={Colors.dark.error} />
						) : (
							<Unlock size={32} color={Colors.dark.success} />
						)}
					</View>

					<Text style={styles.statusTitle}>
						{isLocked ? "Card Locked" : "Card Active"}
					</Text>

					<Text style={styles.statusDescription}>
						{isLocked
							? "Your card is locked. No purchases or withdrawals can be made."
							: "Your card is active and ready for use."}
					</Text>
				</View>

				{!isLocked && (
					<View style={styles.reasonSection}>
						<Text style={styles.sectionTitle}>
							Why are you locking your card?
						</Text>

						<Pressable
							style={[
								styles.reasonOption,
								reason === "temporary" && styles.selectedReason,
							]}
							onPress={() => setReason("temporary")}>
							<Text style={styles.reasonTitle}>Temporary Lock</Text>
							<Text style={styles.reasonDescription}>
								I want to temporarily disable my card
							</Text>
							{reason === "temporary" && (
								<View style={styles.selectedIndicator} />
							)}
						</Pressable>

						<Pressable
							style={[
								styles.reasonOption,
								reason === "suspicious" && styles.selectedReason,
							]}
							onPress={() => setReason("suspicious")}>
							<Text style={styles.reasonTitle}>Suspicious Activity</Text>
							<Text style={styles.reasonDescription}>
								I noticed suspicious transactions
							</Text>
							{reason === "suspicious" && (
								<View style={styles.selectedIndicator} />
							)}
						</Pressable>

						<Pressable
							style={[
								styles.reasonOption,
								reason === "lost" && styles.selectedReason,
							]}
							onPress={() => setReason("lost")}>
							<Text style={styles.reasonTitle}>Lost Card</Text>
							<Text style={styles.reasonDescription}>I can't find my card</Text>
							{reason === "lost" && <View style={styles.selectedIndicator} />}
						</Pressable>
					</View>
				)}

				<View style={styles.warningContainer}>
					<AlertTriangle size={20} color={Colors.dark.secondaryText} />
					<Text style={styles.warningText}>
						{isLocked
							? "Unlocking your card will allow transactions to be processed again."
							: "Locking your card will prevent all transactions until you unlock it."}
					</Text>
				</View>

				{isLocked ? (
					<Pressable style={styles.unlockButton} onPress={handleUnlockCard}>
						<Text style={styles.unlockButtonText}>Unlock Card</Text>
					</Pressable>
				) : (
					<Pressable style={styles.lockButton} onPress={handleLockCard}>
						<Text style={styles.lockButtonText}>Lock Card</Text>
					</Pressable>
				)}

				{reason === "lost" && !isLocked && (
					<Pressable
						style={styles.reportButton}
						onPress={() => router.push("/card-replace")}>
						<Text style={styles.reportButtonText}>Report Lost or Stolen</Text>
					</Pressable>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.dark.background,
	},
	content: {
		flex: 1,
		padding: 20,
	},
	statusContainer: {
		borderRadius: 16,
		padding: 24,
		alignItems: "center",
		marginBottom: 24,
	},
	lockedContainer: {
		backgroundColor: "rgba(255, 67, 42, 0.1)",
	},
	unlockedContainer: {
		backgroundColor: "rgba(0, 214, 50, 0.1)",
	},
	statusIcon: {
		width: 64,
		height: 64,
		borderRadius: 32,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
	},
	lockedIcon: {
		backgroundColor: "rgba(255, 67, 42, 0.2)",
	},
	unlockedIcon: {
		backgroundColor: "rgba(0, 214, 50, 0.2)",
	},
	statusTitle: {
		color: Colors.dark.text,
		fontSize: 20,
		fontWeight: "600",
		marginBottom: 8,
	},
	statusDescription: {
		color: Colors.dark.secondaryText,
		fontSize: 16,
		textAlign: "center",
	},
	reasonSection: {
		marginBottom: 24,
	},
	sectionTitle: {
		color: Colors.dark.text,
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 16,
	},
	reasonOption: {
		backgroundColor: Colors.dark.card,
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: "transparent",
	},
	selectedReason: {
		borderColor: Colors.dark.primary,
	},
	reasonTitle: {
		color: Colors.dark.text,
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 4,
	},
	reasonDescription: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
	},
	selectedIndicator: {
		position: "absolute",
		top: 16,
		right: 16,
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: Colors.dark.primary,
	},
	warningContainer: {
		flexDirection: "row",
		backgroundColor: Colors.dark.card,
		borderRadius: 12,
		padding: 16,
		marginBottom: 24,
	},
	warningText: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
		marginLeft: 12,
		flex: 1,
	},
	lockButton: {
		backgroundColor: Colors.dark.error,
		borderRadius: 12,
		padding: 16,
		alignItems: "center",
		marginBottom: 12,
	},
	lockButtonText: {
		color: Colors.dark.background,
		fontSize: 16,
		fontWeight: "600",
	},
	unlockButton: {
		backgroundColor: Colors.dark.success,
		borderRadius: 12,
		padding: 16,
		alignItems: "center",
		marginBottom: 12,
	},
	unlockButtonText: {
		color: Colors.dark.background,
		fontSize: 16,
		fontWeight: "600",
	},
	reportButton: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: Colors.dark.error,
		borderRadius: 12,
		padding: 16,
		alignItems: "center",
	},
	reportButtonText: {
		color: Colors.dark.error,
		fontSize: 16,
		fontWeight: "600",
	},
})
