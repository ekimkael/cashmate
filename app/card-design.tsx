import React, { useState } from "react"
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	ScrollView,
	Image,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import {
	ArrowLeft,
	CreditCard,
	Check,
	Palette,
	Upload,
	Camera,
} from "lucide-react-native"
import Colors from "@/constants/colors"

export default function CardDesignScreen() {
	const router = useRouter()
	const [selectedDesign, setSelectedDesign] = useState("default")

	const cardDesigns = [
		{
			id: "default",
			name: "Default Green",
			color: Colors.dark.primary,
			image: null,
		},
		{
			id: "black",
			name: "Sleek Black",
			color: "#000000",
			image: null,
		},
		{
			id: "gradient",
			name: "Sunset Gradient",
			color: "#FF8C00",
			gradient: true,
			image: null,
		},
		{
			id: "custom",
			name: "Custom Image",
			color: "#333333",
			image:
				"https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
		},
	]

	const handleSaveDesign = () => {
		// In a real app, this would save the design to the server
		router.back()
	}

	const handleUploadImage = () => {
		// In a real app, this would open the image picker
		console.log("Upload image")
	}

	const handleTakePhoto = () => {
		// In a real app, this would open the camera
		console.log("Take photo")
	}

	const renderCardPreview = (design) => {
		return (
			<View
				style={[
					styles.cardPreview,
					{ backgroundColor: design.color },
					design.gradient && styles.gradientCard,
				]}>
				{design.image && (
					<Image source={{ uri: design.image }} style={styles.cardImage} />
				)}
				<View style={styles.cardHeader}>
					<CreditCard
						size={24}
						color={design.id === "default" ? Colors.dark.background : "#FFFFFF"}
					/>
					<Text
						style={[
							styles.cardName,
							{
								color:
									design.id === "default" ? Colors.dark.background : "#FFFFFF",
							},
						]}>
						John Doe
					</Text>
				</View>
				<View style={styles.cardFooter}>
					<Text
						style={[
							styles.cardNumber,
							{
								color:
									design.id === "default" ? Colors.dark.background : "#FFFFFF",
							},
						]}>
						•••• 1234
					</Text>
				</View>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Card Design" }} />

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.previewSection}>
					{renderCardPreview(cardDesigns.find((d) => d.id === selectedDesign))}
				</View>

				<View style={styles.designsSection}>
					<Text style={styles.sectionTitle}>Choose a Design</Text>

					{cardDesigns.map((design) => (
						<Pressable
							key={design.id}
							style={[
								styles.designOption,
								selectedDesign === design.id && styles.selectedDesign,
							]}
							onPress={() => setSelectedDesign(design.id)}>
							<View style={styles.designPreview}>
								<View
									style={[
										styles.designColor,
										{ backgroundColor: design.color },
										design.gradient && styles.gradientDesign,
									]}>
									{design.image && (
										<Image
											source={{ uri: design.image }}
											style={styles.designImage}
										/>
									)}
								</View>
							</View>
							<View style={styles.designInfo}>
								<Text style={styles.designName}>{design.name}</Text>
								{design.id === "custom" ? (
									<Text style={styles.designDescription}>
										Your custom image
									</Text>
								) : (
									<Text style={styles.designDescription}>
										{design.gradient ? "Gradient design" : "Solid color design"}
									</Text>
								)}
							</View>
							{selectedDesign === design.id && (
								<View style={styles.checkIcon}>
									<Check size={20} color={Colors.dark.primary} />
								</View>
							)}
						</Pressable>
					))}
				</View>

				<View style={styles.customSection}>
					<Text style={styles.sectionTitle}>Custom Design</Text>
					<Text style={styles.customDescription}>
						Upload your own image to create a unique card design
					</Text>

					<View style={styles.customButtons}>
						<Pressable style={styles.customButton} onPress={handleUploadImage}>
							<View style={styles.customButtonIcon}>
								<Upload size={24} color={Colors.dark.text} />
							</View>
							<Text style={styles.customButtonText}>Upload Image</Text>
						</Pressable>

						<Pressable style={styles.customButton} onPress={handleTakePhoto}>
							<View style={styles.customButtonIcon}>
								<Camera size={24} color={Colors.dark.text} />
							</View>
							<Text style={styles.customButtonText}>Take Photo</Text>
						</Pressable>
					</View>
				</View>

				<View style={styles.infoSection}>
					<Palette size={20} color={Colors.dark.secondaryText} />
					<Text style={styles.infoText}>
						Your physical card will be updated with the new design. It may take
						7-10 business days to receive your new card.
					</Text>
				</View>

				<Pressable style={styles.saveButton} onPress={handleSaveDesign}>
					<Text style={styles.saveButtonText}>Save Design</Text>
				</Pressable>
			</ScrollView>
		</View>
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
	previewSection: {
		marginBottom: 24,
	},
	sectionTitle: {
		color: Colors.dark.text,
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 16,
	},
	cardPreview: {
		height: 180,
		borderRadius: 16,
		padding: 20,
		justifyContent: "space-between",
		overflow: "hidden",
	},
	gradientCard: {
		backgroundColor: "#FF8C00",
		// In a real app, you would use a LinearGradient component
	},
	cardImage: {
		...StyleSheet.absoluteFillObject,
		borderRadius: 16,
		opacity: 0.8,
	},
	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
		zIndex: 1,
	},
	cardName: {
		fontSize: 18,
		fontWeight: "600",
		marginLeft: 12,
	},
	cardFooter: {
		alignItems: "flex-end",
		zIndex: 1,
	},
	cardNumber: {
		fontSize: 16,
		fontWeight: "500",
	},
	designsSection: {
		marginBottom: 24,
	},
	designOption: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.dark.card,
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
	},
	selectedDesign: {
		borderWidth: 1,
		borderColor: Colors.dark.primary,
	},
	designPreview: {
		width: 60,
		height: 40,
		borderRadius: 8,
		overflow: "hidden",
		marginRight: 16,
	},
	designColor: {
		width: "100%",
		height: "100%",
		borderRadius: 8,
	},
	gradientDesign: {
		// In a real app, you would use a LinearGradient component
	},
	designImage: {
		width: "100%",
		height: "100%",
		borderRadius: 8,
	},
	designInfo: {
		flex: 1,
	},
	designName: {
		color: Colors.dark.text,
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 4,
	},
	designDescription: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
	},
	checkIcon: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: "rgba(0, 214, 50, 0.1)",
		alignItems: "center",
		justifyContent: "center",
	},
	customSection: {
		marginBottom: 24,
	},
	customDescription: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
		marginBottom: 16,
	},
	customButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	customButton: {
		flex: 1,
		alignItems: "center",
		backgroundColor: Colors.dark.card,
		borderRadius: 12,
		padding: 16,
		marginHorizontal: 6,
	},
	customButtonIcon: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: Colors.dark.inputBackground,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 8,
	},
	customButtonText: {
		color: Colors.dark.text,
		fontSize: 14,
		fontWeight: "500",
	},
	infoSection: {
		flexDirection: "row",
		backgroundColor: Colors.dark.card,
		borderRadius: 12,
		padding: 16,
		marginBottom: 24,
	},
	infoText: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
		marginLeft: 12,
		flex: 1,
	},
	saveButton: {
		backgroundColor: Colors.dark.primary,
		borderRadius: 12,
		padding: 16,
		alignItems: "center",
		marginBottom: 20,
	},
	saveButtonText: {
		color: Colors.dark.background,
		fontSize: 16,
		fontWeight: "600",
	},
})
