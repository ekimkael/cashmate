import React, { useState } from "react"
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	ScrollView,
	Switch,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import {
	ArrowLeft,
	Bell,
	DollarSign,
	CreditCard,
	Smartphone,
	Settings,
} from "lucide-react-native"
import { useThemeColors } from "@/constants/colors"

export default function CardSettingsScreen() {
  const colors = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: colors.background,
  	},
  	scrollContent: {
  		padding: 20,
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
  	settingItem: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  	},
  	settingIcon: {
  		width: 40,
  		height: 40,
  		borderRadius: 20,
  		backgroundColor: colors.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 12,
  	},
  	settingContent: {
  		flex: 1,
  	},
  	settingLabel: {
  		color: colors.text,
  		fontSize: 16,
  		fontWeight: "500",
  		marginBottom: 4,
  	},
  	settingDescription: {
  		color: colors.secondaryText,
  		fontSize: 14,
  	},
  	actionButton: {
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		alignItems: "center",
  		justifyContent: "center",
  	},
  	actionText: {
  		color: colors.primary,
  		fontSize: 16,
  		fontWeight: "500",
  	},
  	managementItem: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  	},
  	managementIcon: {
  		width: 40,
  		height: 40,
  		borderRadius: 20,
  		backgroundColor: colors.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 12,
  	},
  	managementContent: {
  		flex: 1,
  	},
  	managementLabel: {
  		color: colors.text,
  		fontSize: 16,
  		fontWeight: "500",
  		marginBottom: 4,
  	},
  	managementDescription: {
  		color: colors.secondaryText,
  		fontSize: 14,
  	},
  })
	const router = useRouter()
	const [notificationsEnabled, setNotificationsEnabled] = useState(true)
	const [autoReloadEnabled, setAutoReloadEnabled] = useState(false)
	const [roundUpEnabled, setRoundUpEnabled] = useState(true)

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Card Settings" }} />

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Notifications</Text>

					<View style={styles.settingItem}>
						<View style={styles.settingIcon}>
							<Bell size={20} color={colors.text} />
						</View>
						<View style={styles.settingContent}>
							<Text style={styles.settingLabel}>Transaction Notifications</Text>
							<Text style={styles.settingDescription}>
								Receive notifications for all card transactions
							</Text>
						</View>
						<Switch
							value={notificationsEnabled}
							onValueChange={setNotificationsEnabled}
							trackColor={{
								false: colors.border,
								true: colors.primary,
							}}
							thumbColor={colors.text}
						/>
					</View>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Auto-Reload</Text>

					<View style={styles.settingItem}>
						<View style={styles.settingIcon}>
							<DollarSign size={20} color={colors.text} />
						</View>
						<View style={styles.settingContent}>
							<Text style={styles.settingLabel}>Auto-Reload</Text>
							<Text style={styles.settingDescription}>
								Automatically reload your card when balance is low
							</Text>
						</View>
						<Switch
							value={autoReloadEnabled}
							onValueChange={setAutoReloadEnabled}
							trackColor={{
								false: colors.border,
								true: colors.primary,
							}}
							thumbColor={colors.text}
						/>
					</View>

					{autoReloadEnabled && (
						<Pressable
							style={styles.actionButton}
							onPress={() => router.push("/card-auto-reload")}>
							<Text style={styles.actionText}>Configure Auto-Reload</Text>
						</Pressable>
					)}
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Round Up & Save</Text>

					<View style={styles.settingItem}>
						<View style={styles.settingIcon}>
							<CreditCard size={20} color={colors.text} />
						</View>
						<View style={styles.settingContent}>
							<Text style={styles.settingLabel}>Round Up Purchases</Text>
							<Text style={styles.settingDescription}>
								Round up purchases to the nearest dollar and save the difference
							</Text>
						</View>
						<Switch
							value={roundUpEnabled}
							onValueChange={setRoundUpEnabled}
							trackColor={{
								false: colors.border,
								true: colors.primary,
							}}
							thumbColor={colors.text}
						/>
					</View>

					{roundUpEnabled && (
						<Pressable
							style={styles.actionButton}
							onPress={() => router.push("/card-round-up")}>
							<Text style={styles.actionText}>Configure Round Up</Text>
						</Pressable>
					)}
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Card Management</Text>

					<Pressable
						style={styles.managementItem}
						onPress={() => router.push("/card-design")}>
						<View style={styles.managementIcon}>
							<Settings size={20} color={colors.text} />
						</View>
						<View style={styles.managementContent}>
							<Text style={styles.managementLabel}>Customize Card Design</Text>
							<Text style={styles.managementDescription}>
								Change the appearance of your physical card
							</Text>
						</View>
						<ArrowLeft
							size={20}
							color={colors.secondaryText}
							style={{ transform: [{ rotate: "180deg" }] }}
						/>
					</Pressable>

					<Pressable
						style={styles.managementItem}
						onPress={() => router.push("/card-virtual")}>
						<View style={styles.managementIcon}>
							<Smartphone size={20} color={colors.text} />
						</View>
						<View style={styles.managementContent}>
							<Text style={styles.managementLabel}>Virtual Card</Text>
							<Text style={styles.managementDescription}>
								Manage your virtual card for online purchases
							</Text>
						</View>
						<ArrowLeft
							size={20}
							color={colors.secondaryText}
							style={{ transform: [{ rotate: "180deg" }] }}
						/>
					</Pressable>

					<Pressable
						style={styles.managementItem}
						onPress={() => router.push("/card-security")}>
						<View style={styles.managementIcon}>
							<CreditCard size={20} color={colors.text} />
						</View>
						<View style={styles.managementContent}>
							<Text style={styles.managementLabel}>Card Security</Text>
							<Text style={styles.managementDescription}>
								Manage security settings for your card
							</Text>
						</View>
						<ArrowLeft
							size={20}
							color={colors.secondaryText}
							style={{ transform: [{ rotate: "180deg" }] }}
						/>
					</Pressable>
				</View>
			</ScrollView>
		</View>
	)
}

