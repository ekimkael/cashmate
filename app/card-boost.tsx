import {
	View,
	Text,
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
} from "react-native"
import React, { useState } from "react"
import { Stack, useRouter } from "expo-router"
import { Search, Tag, ChevronRight, Check } from "lucide-react-native"

import Colors, { useThemeColors } from "@/constants/colors"

export default function CardBoostScreen() {
  const C = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: C.background,
  	},
  	searchContainer: {
  		padding: 16,
  		borderBottomWidth: 1,
  		borderBottomColor: C.border,
  	},
  	searchBar: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: C.inputBackground,
  		borderRadius: 12,
  		padding: 12,
  	},
  	searchPlaceholder: {
  		color: C.secondaryText,
  		fontSize: 16,
  		marginLeft: 8,
  	},
  	tabContainer: {
  		flexDirection: "row",
  		borderBottomWidth: 1,
  		borderBottomColor: C.border,
  	},
  	tabButton: {
  		flex: 1,
  		paddingVertical: 16,
  		alignItems: "center",
  	},
  	activeTabButton: {
  		borderBottomWidth: 2,
  		borderBottomColor: C.primary,
  	},
  	tabText: {
  		color: C.secondaryText,
  		fontSize: 16,
  		fontWeight: "500",
  	},
  	activeTabText: {
  		color: C.primary,
  		fontWeight: "600",
  	},
  	scrollContent: {
  		padding: 16,
  	},
  	sectionTitle: {
  		color: C.text,
  		fontSize: 20,
  		fontWeight: "600",
  		marginBottom: 8,
  	},
  	sectionDescription: {
  		color: C.secondaryText,
  		fontSize: 14,
  		marginBottom: 16,
  	},
  	boostCard: {
  		backgroundColor: C.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  	},
  	boostHeader: {
  		flexDirection: "row",
  		alignItems: "center",
  		marginBottom: 12,
  	},
  	boostLogo: {
  		width: 48,
  		height: 48,
  		borderRadius: 24,
  		marginRight: 12,
  	},
  	boostInfo: {
  		flex: 1,
  	},
  	boostName: {
  		color: C.text,
  		fontSize: 16,
  		fontWeight: "500",
  		marginBottom: 4,
  	},
  	boostDiscount: {
  		color: C.primary,
  		fontSize: 14,
  		fontWeight: "600",
  	},
  	activateButton: {
  		backgroundColor: C.primary,
  		borderRadius: 12,
  		paddingVertical: 8,
  		paddingHorizontal: 12,
  	},
  	activateButtonText: {
  		color: C.background,
  		fontSize: 14,
  		fontWeight: "600",
  	},
  	boostDescription: {
  		color: C.secondaryText,
  		fontSize: 14,
  		marginBottom: 8,
  	},
  	expiryText: {
  		color: C.secondaryText,
  		fontSize: 12,
  		fontStyle: "italic",
  	},
  	activeIndicator: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: "rgba(0, 214, 50, 0.1)",
  		borderRadius: 12,
  		paddingVertical: 6,
  		paddingHorizontal: 10,
  	},
  	activeText: {
  		color: C.success,
  		fontSize: 14,
  		fontWeight: "500",
  		marginLeft: 4,
  	},
  	seeAllButton: {
  		flexDirection: "row",
  		alignItems: "center",
  		justifyContent: "center",
  		padding: 16,
  		marginTop: 8,
  	},
  	seeAllButtonText: {
  		color: C.primary,
  		fontSize: 16,
  		fontWeight: "500",
  		marginRight: 4,
  	},
  	emptyState: {
  		alignItems: "center",
  		justifyContent: "center",
  		padding: 32,
  	},
  	emptyStateTitle: {
  		color: C.text,
  		fontSize: 18,
  		fontWeight: "600",
  		marginTop: 16,
  		marginBottom: 8,
  	},
  	emptyStateText: {
  		color: C.secondaryText,
  		fontSize: 14,
  		textAlign: "center",
  	},
  })
	const router = useRouter()
	const [activeTab, setActiveTab] = useState("available")

	const availableBoosts = [
		{
			id: "1",
			name: "Coffee Shop",
			discount: "10% off",
			logo: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
			description: "Save 10% on your purchase, up to $5",
		},
		{
			id: "2",
			name: "Grocery Store",
			discount: "5% off",
			logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
			description: "Save 5% on your purchase, up to $10",
		},
		{
			id: "3",
			name: "Fast Food",
			discount: "15% off",
			logo: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
			description: "Save 15% on your purchase, up to $3",
		},
		{
			id: "4",
			name: "Gas Station",
			discount: "5¢ per gallon",
			logo: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
			description: "Save 5¢ per gallon, up to 20 gallons",
		},
	]

	const activeBoosts = [
		{
			id: "5",
			name: "Pizza Place",
			discount: "20% off",
			logo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
			description: "Save 20% on your purchase, up to $8",
			expiresIn: "5 days",
		},
	]

	const handleActivateBoost = (boost) => {
		// In a real app, this would activate the boost
		console.log(`Activating boost: ${boost.name}`)
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Card Boosts" }} />

			<View style={styles.searchContainer}>
				<View style={styles.searchBar}>
					<Search size={20} color={C.secondaryText} />
					<Text style={styles.searchPlaceholder}>Search for boosts</Text>
				</View>
			</View>

			<View style={styles.tabContainer}>
				<Pressable
					style={[
						styles.tabButton,
						activeTab === "available" && styles.activeTabButton,
					]}
					onPress={() => setActiveTab("available")}>
					<Text
						style={[
							styles.tabText,
							activeTab === "available" && styles.activeTabText,
						]}>
						Available
					</Text>
				</Pressable>

				<Pressable
					style={[
						styles.tabButton,
						activeTab === "active" && styles.activeTabButton,
					]}
					onPress={() => setActiveTab("active")}>
					<Text
						style={[
							styles.tabText,
							activeTab === "active" && styles.activeTabText,
						]}>
						Active
					</Text>
				</Pressable>
			</View>

			<ScrollView contentContainerStyle={styles.scrollContent}>
				{activeTab === "available" ? (
					<>
						<Text style={styles.sectionTitle}>Available Boosts</Text>
						<Text style={styles.sectionDescription}>
							Activate a boost to save money at your favorite places.
						</Text>

						{availableBoosts.map((boost) => (
							<View key={boost.id} style={styles.boostCard}>
								<View style={styles.boostHeader}>
									<Image
										source={{ uri: boost.logo }}
										style={styles.boostLogo}
									/>
									<View style={styles.boostInfo}>
										<Text style={styles.boostName}>{boost.name}</Text>
										<Text style={styles.boostDiscount}>{boost.discount}</Text>
									</View>
									<Pressable
										style={styles.activateButton}
										onPress={() => handleActivateBoost(boost)}>
										<Text style={styles.activateButtonText}>Activate</Text>
									</Pressable>
								</View>

								<Text style={styles.boostDescription}>{boost.description}</Text>
							</View>
						))}

						<Pressable
							style={styles.seeAllButton}
							onPress={() => router.push("/card-boost-all")}>
							<Text style={styles.seeAllButtonText}>See All Boosts</Text>
							<ChevronRight size={20} color={C.primary} />
						</Pressable>
					</>
				) : (
					<>
						<Text style={styles.sectionTitle}>Active Boosts</Text>
						<Text style={styles.sectionDescription}>
							Your active boosts are ready to use. Just pay with your Cash Card.
						</Text>

						{activeBoosts.map((boost) => (
							<View key={boost.id} style={styles.boostCard}>
								<View style={styles.boostHeader}>
									<Image
										source={{ uri: boost.logo }}
										style={styles.boostLogo}
									/>
									<View style={styles.boostInfo}>
										<Text style={styles.boostName}>{boost.name}</Text>
										<Text style={styles.boostDiscount}>{boost.discount}</Text>
									</View>
									<View style={styles.activeIndicator}>
										<Check size={16} color={C.success} />
										<Text style={styles.activeText}>Active</Text>
									</View>
								</View>

								<Text style={styles.boostDescription}>{boost.description}</Text>
								<Text style={styles.expiryText}>
									Expires in {boost.expiresIn}
								</Text>
							</View>
						))}

						{activeBoosts.length === 0 && (
							<View style={styles.emptyState}>
								<Tag size={48} color={C.secondaryText} />
								<Text style={styles.emptyStateTitle}>No Active Boosts</Text>
								<Text style={styles.emptyStateText}>
									You don't have any active boosts. Activate a boost to start
									saving.
								</Text>
							</View>
						)}
					</>
				)}
			</ScrollView>
		</View>
	)
}

