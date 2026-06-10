import React, { useState } from "react"
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	ScrollView,
	Alert,
} from "react-native"

import { Stack, useRouter } from "expo-router"
import {
	AlertTriangle,
	CreditCard,
	MapPin,
	Home,
	Truck,
} from "lucide-react-native"
import Colors, { useThemeColors } from "@/constants/colors"

export default function CardReplaceScreen() {
  const colors = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: colors.background,
  	},
  	scrollContent: {
  		padding: 20,
  	},
  	alertContainer: {
  		backgroundColor: "rgba(255, 67, 42, 0.1)",
  		borderRadius: 16,
  		padding: 20,
  		alignItems: "center",
  		marginBottom: 24,
  	},
  	alertTitle: {
  		color: colors.text,
  		fontSize: 18,
  		fontWeight: "600",
  		marginTop: 12,
  		marginBottom: 8,
  	},
  	alertDescription: {
  		color: colors.secondaryText,
  		fontSize: 14,
  		textAlign: "center",
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
  	reasonOption: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  		borderWidth: 1,
  		borderColor: "transparent",
  	},
  	selectedReason: {
  		borderColor: colors.primary,
  	},
  	reasonIcon: {
  		width: 40,
  		height: 40,
  		borderRadius: 20,
  		backgroundColor: colors.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 12,
  	},
  	reasonContent: {
  		flex: 1,
  	},
  	reasonTitle: {
  		color: colors.text,
  		fontSize: 16,
  		fontWeight: "500",
  		marginBottom: 4,
  	},
  	reasonDescription: {
  		color: colors.secondaryText,
  		fontSize: 14,
  	},
  	selectedIndicator: {
  		width: 20,
  		height: 20,
  		borderRadius: 10,
  		backgroundColor: colors.primary,
  	},
  	addressOption: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  		borderWidth: 1,
  		borderColor: "transparent",
  	},
  	selectedAddress: {
  		borderColor: colors.primary,
  	},
  	addressIcon: {
  		width: 40,
  		height: 40,
  		borderRadius: 20,
  		backgroundColor: colors.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 12,
  	},
  	addressContent: {
  		flex: 1,
  	},
  	addressTitle: {
  		color: colors.text,
  		fontSize: 16,
  		fontWeight: "500",
  		marginBottom: 4,
  	},
  	addressDescription: {
  		color: colors.secondaryText,
  		fontSize: 14,
  	},
  	infoSection: {
  		flexDirection: "row",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 24,
  	},
  	infoText: {
  		color: colors.secondaryText,
  		fontSize: 14,
  		marginLeft: 12,
  		flex: 1,
  	},
  	requestButton: {
  		backgroundColor: colors.primary,
  		borderRadius: 12,
  		padding: 16,
  		alignItems: "center",
  		marginBottom: 12,
  	},
  	requestButtonText: {
  		color: colors.background,
  		fontSize: 16,
  		fontWeight: "600",
  	},
  	cancelButton: {
  		backgroundColor: "transparent",
  		borderRadius: 12,
  		padding: 16,
  		alignItems: "center",
  	},
  	cancelButtonText: {
  		color: colors.secondaryText,
  		fontSize: 16,
  		fontWeight: "500",
  	},
  })
	const router = useRouter()
	const [reason, setReason] = useState("lost")
	const [address, setAddress] = useState("current")

	const handleRequestReplacement = () => {
		// In a real app, this would call an API to request a replacement card
		Alert.alert(
			"Card Replacement Requested",
			"Your card has been locked and a replacement has been requested. You should receive your new card within 7-10 business days.",
			[{ text: "OK", onPress: () => router.push("/card") }]
		)
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Replace Card" }} />

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.alertContainer}>
					<AlertTriangle size={24} color={colors.error} />
					<Text style={styles.alertTitle}>Report Lost or Stolen Card</Text>
					<Text style={styles.alertDescription}>
						Your card will be immediately locked and a replacement will be sent
						to you.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>What happened to your card?</Text>

					<Pressable
						style={[
							styles.reasonOption,
							reason === "lost" && styles.selectedReason,
						]}
						onPress={() => setReason("lost")}>
						<View style={styles.reasonIcon}>
							<MapPin size={20} color={colors.text} />
						</View>
						<View style={styles.reasonContent}>
							<Text style={styles.reasonTitle}>Lost Card</Text>
							<Text style={styles.reasonDescription}>I can't find my card</Text>
						</View>
						{reason === "lost" && <View style={styles.selectedIndicator} />}
					</Pressable>

					<Pressable
						style={[
							styles.reasonOption,
							reason === "stolen" && styles.selectedReason,
						]}
						onPress={() => setReason("stolen")}>
						<View style={styles.reasonIcon}>
							<AlertTriangle size={20} color={colors.text} />
						</View>
						<View style={styles.reasonContent}>
							<Text style={styles.reasonTitle}>Stolen Card</Text>
							<Text style={styles.reasonDescription}>My card was stolen</Text>
						</View>
						{reason === "stolen" && <View style={styles.selectedIndicator} />}
					</Pressable>

					<Pressable
						style={[
							styles.reasonOption,
							reason === "damaged" && styles.selectedReason,
						]}
						onPress={() => setReason("damaged")}>
						<View style={styles.reasonIcon}>
							<CreditCard size={20} color={colors.text} />
						</View>
						<View style={styles.reasonContent}>
							<Text style={styles.reasonTitle}>Damaged Card</Text>
							<Text style={styles.reasonDescription}>
								My card is damaged or not working
							</Text>
						</View>
						{reason === "damaged" && <View style={styles.selectedIndicator} />}
					</Pressable>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>
						Where should we send your new card?
					</Text>

					<Pressable
						style={[
							styles.addressOption,
							address === "current" && styles.selectedAddress,
						]}
						onPress={() => setAddress("current")}>
						<View style={styles.addressIcon}>
							<Home size={20} color={colors.text} />
						</View>
						<View style={styles.addressContent}>
							<Text style={styles.addressTitle}>Current Address</Text>
							<Text style={styles.addressDescription}>
								123 Main St, City, State 12345
							</Text>
						</View>
						{address === "current" && <View style={styles.selectedIndicator} />}
					</Pressable>

					<Pressable
						style={[
							styles.addressOption,
							address === "new" && styles.selectedAddress,
						]}
						onPress={() => setAddress("new")}>
						<View style={styles.addressIcon}>
							<MapPin size={20} color={colors.text} />
						</View>
						<View style={styles.addressContent}>
							<Text style={styles.addressTitle}>New Address</Text>
							<Text style={styles.addressDescription}>
								Enter a different shipping address
							</Text>
						</View>
						{address === "new" && <View style={styles.selectedIndicator} />}
					</Pressable>
				</View>

				<View style={styles.infoSection}>
					<Truck size={20} color={colors.secondaryText} />
					<Text style={styles.infoText}>
						Your replacement card should arrive within 7-10 business days. You
						can use your virtual card for online purchases in the meantime.
					</Text>
				</View>

				<Pressable
					style={styles.requestButton}
					onPress={handleRequestReplacement}>
					<Text style={styles.requestButtonText}>Request Replacement</Text>
				</Pressable>

				<Pressable style={styles.cancelButton} onPress={() => router.back()}>
					<Text style={styles.cancelButtonText}>Cancel</Text>
				</Pressable>
			</ScrollView>
		</View>
	)
}

