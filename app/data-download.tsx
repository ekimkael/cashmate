import React, { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import {
	ArrowLeft,
	Download,
	FileText,
	CheckCircle,
	Clock,
} from "lucide-react-native"
import Colors, { useThemeColors } from "@/constants/colors"

export default function DataDownloadScreen() {
  const colors = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: colors.background,
  	},
  	scrollContent: {
  		padding: 20,
  	},
  	description: {
  		color: colors.secondaryText,
  		fontSize: 16,
  		marginBottom: 24,
  	},
  	section: {
  		marginBottom: 24,
  	},
  	sectionTitle: {
  		color: colors.text,
  		fontSize: 18,
  		fontWeight: "600",
  		marginBottom: 16,
  	},
  	dataItem: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  	},
  	dataIcon: {
  		width: 40,
  		height: 40,
  		borderRadius: 20,
  		backgroundColor: colors.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 12,
  	},
  	dataContent: {
  		flex: 1,
  	},
  	dataTitle: {
  		color: colors.text,
  		fontSize: 16,
  		fontWeight: "500",
  		marginBottom: 4,
  	},
  	dataDescription: {
  		color: colors.secondaryText,
  		fontSize: 14,
  	},
  	infoBox: {
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 24,
  	},
  	infoText: {
  		color: colors.secondaryText,
  		fontSize: 14,
  		lineHeight: 20,
  	},
  	requestButton: {
  		flexDirection: "row",
  		alignItems: "center",
  		justifyContent: "center",
  		backgroundColor: colors.primary,
  		borderRadius: 12,
  		padding: 16,
  	},
  	requestButtonText: {
  		color: colors.background,
  		fontSize: 16,
  		fontWeight: "600",
  		marginLeft: 8,
  	},
  	statusContainer: {
  		alignItems: "center",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 24,
  	},
  	statusTitle: {
  		color: colors.text,
  		fontSize: 18,
  		fontWeight: "600",
  		marginTop: 16,
  		marginBottom: 8,
  	},
  	statusDescription: {
  		color: colors.secondaryText,
  		fontSize: 14,
  		textAlign: "center",
  		lineHeight: 20,
  	},
  })
	const router = useRouter()

	const [requestStatus, setRequestStatus] = useState("none") // none, pending, complete

	const handleRequestData = () => {
		setRequestStatus("pending")
		// In a real app, this would make an API call to request the data
		setTimeout(() => {
			setRequestStatus("complete")
		}, 2000)
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Download Your Data" }} />

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<Text style={styles.description}>
					You can request a copy of your personal data. This includes your
					profile information, transaction history, and account activity.
				</Text>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Data Included</Text>

					<View style={styles.dataItem}>
						<View style={styles.dataIcon}>
							<FileText size={20} color={colors.text} />
						</View>
						<View style={styles.dataContent}>
							<Text style={styles.dataTitle}>Account Information</Text>
							<Text style={styles.dataDescription}>
								Your profile details, preferences, and settings
							</Text>
						</View>
					</View>

					<View style={styles.dataItem}>
						<View style={styles.dataIcon}>
							<FileText size={20} color={colors.text} />
						</View>
						<View style={styles.dataContent}>
							<Text style={styles.dataTitle}>Transaction History</Text>
							<Text style={styles.dataDescription}>
								Records of payments, transfers, and requests
							</Text>
						</View>
					</View>

					<View style={styles.dataItem}>
						<View style={styles.dataIcon}>
							<FileText size={20} color={colors.text} />
						</View>
						<View style={styles.dataContent}>
							<Text style={styles.dataTitle}>Payment Methods</Text>
							<Text style={styles.dataDescription}>
								Information about linked cards and bank accounts
							</Text>
						</View>
					</View>

					<View style={styles.dataItem}>
						<View style={styles.dataIcon}>
							<FileText size={20} color={colors.text} />
						</View>
						<View style={styles.dataContent}>
							<Text style={styles.dataTitle}>Login Activity</Text>
							<Text style={styles.dataDescription}>
								History of account access and devices used
							</Text>
						</View>
					</View>
				</View>

				<View style={styles.infoBox}>
					<Text style={styles.infoText}>
						Your data will be prepared as a downloadable ZIP file. This process
						may take up to 48 hours. You'll receive an email when your data is
						ready to download.
					</Text>
				</View>

				{requestStatus === "none" && (
					<Pressable style={styles.requestButton} onPress={handleRequestData}>
						<Download size={20} color={colors.background} />
						<Text style={styles.requestButtonText}>Request Data Download</Text>
					</Pressable>
				)}

				{requestStatus === "pending" && (
					<View style={styles.statusContainer}>
						<Clock size={24} color={colors.primary} />
						<Text style={styles.statusTitle}>Request Processing</Text>
						<Text style={styles.statusDescription}>
							We're preparing your data. This may take up to 48 hours. We'll
							notify you when it's ready.
						</Text>
					</View>
				)}

				{requestStatus === "complete" && (
					<View style={styles.statusContainer}>
						<CheckCircle size={24} color={colors.primary} />
						<Text style={styles.statusTitle}>Request Received</Text>
						<Text style={styles.statusDescription}>
							Your data request has been received. We'll email you when your
							data is ready to download.
						</Text>
					</View>
				)}
			</ScrollView>
		</View>
	)
}

