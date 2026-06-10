import React from "react"
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Pressable,
	Switch,
} from "react-native"
import { Stack, useRouter } from "expo-router"
import {
	ArrowLeft,
	Globe,
	Moon,
	Smartphone,
	Bell,
	DollarSign,
	User,
	Shield,
} from "lucide-react-native"
import { useUserStore } from '@/store/user-store'
import Colors, { useThemeColors } from "@/constants/colors"

export default function SettingsScreen() {
  const C = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: C.background,
  	},
  	scrollContent: {
  		padding: 20,
  	},
  	section: {
  		marginBottom: 32,
  	},
  	sectionTitle: {
  		color: C.text,
  		fontSize: 18,
  		fontWeight: "600",
  		marginBottom: 16,
  	},
  	menuItem: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: C.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  	},
  	menuItemIcon: {
  		width: 40,
  		height: 40,
  		borderRadius: 20,
  		backgroundColor: C.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 12,
  	},
  	menuItemContent: {
  		flex: 1,
  	},
  	menuItemTitle: {
  		color: C.text,
  		fontSize: 16,
  		fontWeight: "500",
  		marginBottom: 4,
  	},
  	menuItemDescription: {
  		color: C.secondaryText,
  		fontSize: 14,
  	},
  	settingItem: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: C.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  	},
  	settingIcon: {
  		width: 40,
  		height: 40,
  		borderRadius: 20,
  		backgroundColor: C.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 12,
  	},
  	settingContent: {
  		flex: 1,
  	},
  	settingLabel: {
  		color: C.text,
  		fontSize: 16,
  		fontWeight: "500",
  		marginBottom: 4,
  	},
  	settingDescription: {
  		color: C.secondaryText,
  		fontSize: 14,
  	},
  	versionContainer: {
  		alignItems: "center",
  		marginTop: 16,
  	},
  	versionText: {
  		color: C.secondaryText,
  		fontSize: 14,
  	},
  	errorText: {
  		color: C.text,
  		fontSize: 16,
  		textAlign: "center",
  	},
  })
	const router = useRouter()
	const { user } = useUserStore()

	const [settings, setSettings] = React.useState({
		darkMode: true,
		notifications: true,
		soundEffects: true,
		hapticFeedback: true,
		autoLock: true,
	})

	const toggleSetting = (key) => {
		setSettings({ ...settings, [key]: !settings[key] })
	}

	if (!user) {
		return (
			<View style={styles.container}>
				<Text style={styles.errorText}>User not found</Text>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{
				title: "Settings",
				headerLargeTitle: true,
				headerTransparent: true,
				headerShadowVisible: false,
				headerLargeTitleShadowVisible: false,
				headerLargeStyle: { backgroundColor: "transparent" },
				headerBlurEffect: "systemChromeMaterial",
			}} />

			<ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.scrollContent}>
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Account</Text>

					<Pressable
						style={styles.menuItem}
						onPress={() => router.push("/profile-settings")}>
						<View style={styles.menuItemIcon}>
							<User size={20} color={C.text} />
						</View>
						<View style={styles.menuItemContent}>
							<Text style={styles.menuItemTitle}>Profile Information</Text>
							<Text style={styles.menuItemDescription}>
								Update your personal details
							</Text>
						</View>
						<ArrowLeft
							size={20}
							color={C.secondaryText}
							style={{ transform: [{ rotate: "180deg" }] }}
						/>
					</Pressable>

					<Pressable
						style={styles.menuItem}
						onPress={() => router.push("/payment-methods")}>
						<View style={styles.menuItemIcon}>
							<DollarSign size={20} color={C.text} />
						</View>
						<View style={styles.menuItemContent}>
							<Text style={styles.menuItemTitle}>Payment Methods</Text>
							<Text style={styles.menuItemDescription}>
								Manage your linked accounts
							</Text>
						</View>
						<ArrowLeft
							size={20}
							color={C.secondaryText}
							style={{ transform: [{ rotate: "180deg" }] }}
						/>
					</Pressable>

					<Pressable
						style={styles.menuItem}
						onPress={() => router.push("/notifications")}>
						<View style={styles.menuItemIcon}>
							<Bell size={20} color={C.text} />
						</View>
						<View style={styles.menuItemContent}>
							<Text style={styles.menuItemTitle}>Notifications</Text>
							<Text style={styles.menuItemDescription}>
								Manage notification preferences
							</Text>
						</View>
						<ArrowLeft
							size={20}
							color={C.secondaryText}
							style={{ transform: [{ rotate: "180deg" }] }}
						/>
					</Pressable>

					<Pressable
						style={styles.menuItem}
						onPress={() => router.push("/privacy")}>
						<View style={styles.menuItemIcon}>
							<Shield size={20} color={C.text} />
						</View>
						<View style={styles.menuItemContent}>
							<Text style={styles.menuItemTitle}>Privacy & Security</Text>
							<Text style={styles.menuItemDescription}>
								Manage security settings
							</Text>
						</View>
						<ArrowLeft
							size={20}
							color={C.secondaryText}
							style={{ transform: [{ rotate: "180deg" }] }}
						/>
					</Pressable>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Preferences</Text>

					<View style={styles.settingItem}>
						<View style={styles.settingIcon}>
							<Moon size={20} color={C.text} />
						</View>
						<View style={styles.settingContent}>
							<Text style={styles.settingLabel}>Dark Mode</Text>
							<Text style={styles.settingDescription}>Use dark theme</Text>
						</View>
						<Switch
							value={settings.darkMode}
							onValueChange={() => toggleSetting("darkMode")}
							trackColor={{
								false: C.border,
								true: C.primary,
							}}
							thumbColor={C.text}
						/>
					</View>

					<View style={styles.settingItem}>
						<View style={styles.settingIcon}>
							<Bell size={20} color={C.text} />
						</View>
						<View style={styles.settingContent}>
							<Text style={styles.settingLabel}>Sound Effects</Text>
							<Text style={styles.settingDescription}>
								Play sounds for actions
							</Text>
						</View>
						<Switch
							value={settings.soundEffects}
							onValueChange={() => toggleSetting("soundEffects")}
							trackColor={{
								false: C.border,
								true: C.primary,
							}}
							thumbColor={C.text}
						/>
					</View>

					<View style={styles.settingItem}>
						<View style={styles.settingIcon}>
							<Smartphone size={20} color={C.text} />
						</View>
						<View style={styles.settingContent}>
							<Text style={styles.settingLabel}>Haptic Feedback</Text>
							<Text style={styles.settingDescription}>
								Enable vibration feedback
							</Text>
						</View>
						<Switch
							value={settings.hapticFeedback}
							onValueChange={() => toggleSetting("hapticFeedback")}
							trackColor={{
								false: C.border,
								true: C.primary,
							}}
							thumbColor={C.text}
						/>
					</View>

					<Pressable
						style={styles.menuItem}
						onPress={() => router.push("/currency")}>
						<View style={styles.menuItemIcon}>
							<DollarSign size={20} color={C.text} />
						</View>
						<View style={styles.menuItemContent}>
							<Text style={styles.menuItemTitle}>Currency</Text>
							<Text style={styles.menuItemDescription}>
								USD - United States Dollar
							</Text>
						</View>
						<ArrowLeft
							size={20}
							color={C.secondaryText}
							style={{ transform: [{ rotate: "180deg" }] }}
						/>
					</Pressable>

					<Pressable
						style={styles.menuItem}
						onPress={() => router.push("/language")}>
						<View style={styles.menuItemIcon}>
							<Globe size={20} color={C.text} />
						</View>
						<View style={styles.menuItemContent}>
							<Text style={styles.menuItemTitle}>Language</Text>
							<Text style={styles.menuItemDescription}>English (US)</Text>
						</View>
						<ArrowLeft
							size={20}
							color={C.secondaryText}
							style={{ transform: [{ rotate: "180deg" }] }}
						/>
					</Pressable>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>About</Text>

					<Pressable
						style={styles.menuItem}
						onPress={() => router.push("/help")}>
						<View style={styles.menuItemContent}>
							<Text style={styles.menuItemTitle}>Help & Support</Text>
						</View>
						<ArrowLeft
							size={20}
							color={C.secondaryText}
							style={{ transform: [{ rotate: "180deg" }] }}
						/>
					</Pressable>

					<Pressable
						style={styles.menuItem}
						onPress={() => router.push("/terms")}>
						<View style={styles.menuItemContent}>
							<Text style={styles.menuItemTitle}>Terms of Service</Text>
						</View>
						<ArrowLeft
							size={20}
							color={C.secondaryText}
							style={{ transform: [{ rotate: "180deg" }] }}
						/>
					</Pressable>

					<Pressable
						style={styles.menuItem}
						onPress={() => router.push("/privacy-policy")}>
						<View style={styles.menuItemContent}>
							<Text style={styles.menuItemTitle}>Privacy Policy</Text>
						</View>
						<ArrowLeft
							size={20}
							color={C.secondaryText}
							style={{ transform: [{ rotate: "180deg" }] }}
						/>
					</Pressable>

					<View style={styles.versionContainer}>
						<Text style={styles.versionText}>Version 1.0.0</Text>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

