import React from "react"
import { Stack, useRouter } from "expo-router"
import { Share2, Download } from "lucide-react-native"
import { View, Text, StyleSheet, Pressable, Image } from "react-native"

import Colors from "@/constants/colors"
import { useUserStore } from "@/store/userStore"

export default function QRCodeScreen() {
	const router = useRouter()
	const { user } = useUserStore()

	if (!user) {
		return (
			<View style={styles.container}>
				<Text style={styles.errorText}>User not found</Text>
			</View>
		)
	}

	// In a real app, we would generate a QR code based on the user's cashtag
	// For now, we'll use a placeholder image
	const qrCodeUrl =
		"https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=$" +
		user.username

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Your QR Code" }} />

			<View style={styles.content}>
				<View style={styles.qrContainer}>
					<Image
						source={{ uri: qrCodeUrl }}
						style={styles.qrCode}
						resizeMode="contain"
					/>
				</View>

				<Text style={styles.username}>${user.username}</Text>
				<Text style={styles.description}>
					Share your QR code to receive payments from other Cash App users
				</Text>

				<View style={styles.actionsContainer}>
					<Pressable style={styles.actionButton}>
						<Share2 size={24} color={Colors.dark.text} />
						<Text style={styles.actionText}>Share</Text>
					</Pressable>

					<Pressable style={styles.actionButton}>
						<Download size={24} color={Colors.dark.text} />
						<Text style={styles.actionText}>Save</Text>
					</Pressable>
				</View>
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
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	qrContainer: {
		backgroundColor: Colors.dark.card,
		borderRadius: 16,
		padding: 24,
		marginBottom: 24,
	},
	qrCode: {
		width: 250,
		height: 250,
		backgroundColor: "#FFFFFF",
		borderRadius: 8,
	},
	username: {
		color: Colors.dark.text,
		fontSize: 24,
		fontWeight: "700",
		marginBottom: 12,
	},
	description: {
		color: Colors.dark.secondaryText,
		fontSize: 16,
		textAlign: "center",
		marginBottom: 32,
		paddingHorizontal: 20,
	},
	actionsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
	},
	actionButton: {
		alignItems: "center",
		backgroundColor: Colors.dark.card,
		borderRadius: 12,
		padding: 16,
		width: "45%",
	},
	actionText: {
		color: Colors.dark.text,
		fontSize: 16,
		fontWeight: "500",
		marginTop: 8,
	},
	errorText: {
		color: Colors.dark.text,
		fontSize: 16,
		textAlign: "center",
	},
})
