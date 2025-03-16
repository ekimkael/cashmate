import {
	View,
	Text,
	Switch,
	Pressable,
	StyleSheet,
	ScrollView,
} from "react-native"
import React from "react"
import { Stack, useRouter } from "expo-router"
import {
	Lock,
	Eye,
	Bell,
	User,
	Shield,
	ArrowLeft,
	Fingerprint,
} from "lucide-react-native"

import Colors from "@/constants/colors"

export default function PrivacySecurityScreen() {
	const router = useRouter()

	const [privacySettings, setPrivacySettings] = React.useState({
		biometricLogin: true,
		activityPrivate: true,
		contactsAccess: false,
		locationTracking: false,
		dataCollection: true,
	})

	const toggleSetting = (key) => {
		setPrivacySettings({
			...privacySettings,
			[key]: !privacySettings[key],
		})
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Privacy & Security" }} />

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Security</Text>

					<Pressable
						style={styles.menuItem}
						onPress={() => router.push("/change-password")}>
						<View style={styles.menuItemIcon}>
							<Lock size={20} color={Colors.dark.text} />
						</View>
						<View style={styles.menuItemContent}>
							<Text style={styles.menuItemTitle}>Change Password</Text>
							<Text style={styles.menuItemDescription}>
								Update your account password
							</Text>
						</View>
						<ArrowLeft
							size={20}
							color={Colors.dark.secondaryText}
							style={{ transform: [{ rotate: "180deg" }] }}
						/>
					</Pressable>

					<View style={styles.settingItem}>
						<View style={styles.settingIcon}>
							<Fingerprint size={20} color={Colors.dark.text} />
						</View>
						<View style={styles.settingContent}>
							<Text style={styles.settingLabel}>Biometric Login</Text>
							<Text style={styles.settingDescription}>
								Use fingerprint or face ID to log in
							</Text>
						</View>
						<Switch
							value={privacySettings.biometricLogin}
							onValueChange={() => toggleSetting("biometricLogin")}
							trackColor={{
								false: Colors.dark.border,
								true: Colors.dark.primary,
							}}
							thumbColor={Colors.dark.text}
						/>
					</View>

					<Pressable
						style={styles.menuItem}
						onPress={() => router.push("/security-alerts")}>
						<View style={styles.menuItemIcon}>
							<Bell size={20} color={Colors.dark.text} />
						</View>
						<View style={styles.menuItemContent}>
							<Text style={styles.menuItemTitle}>Security Alerts</Text>
							<Text style={styles.menuItemDescription}>
								Manage security notifications
							</Text>
						</View>
						<ArrowLeft
							size={20}
							color={Colors.dark.secondaryText}
							style={{ transform: [{ rotate: "180deg" }] }}
						/>
					</Pressable>

					<Pressable
						style={styles.menuItem}
						onPress={() => router.push("/login-history")}>
						<View style={styles.menuItemIcon}>
							<Shield size={20} color={Colors.dark.text} />
						</View>
						<View style={styles.menuItemContent}>
							<Text style={styles.menuItemTitle}>Login History</Text>
							<Text style={styles.menuItemDescription}>
								View recent account access
							</Text>
						</View>
						<ArrowLeft
							size={20}
							color={Colors.dark.secondaryText}
							style={{ transform: [{ rotate: "180deg" }] }}
						/>
					</Pressable>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Privacy</Text>

					<View style={styles.settingItem}>
						<View style={styles.settingIcon}>
							<Eye size={20} color={Colors.dark.text} />
						</View>
						<View style={styles.settingContent}>
							<Text style={styles.settingLabel}>Private Activity</Text>
							<Text style={styles.settingDescription}>
								Hide your activity from other users
							</Text>
						</View>
						<Switch
							value={privacySettings.activityPrivate}
							onValueChange={() => toggleSetting("activityPrivate")}
							trackColor={{
								false: Colors.dark.border,
								true: Colors.dark.primary,
							}}
							thumbColor={Colors.dark.text}
						/>
					</View>

					<View style={styles.settingItem}>
						<View style={styles.settingIcon}>
							<User size={20} color={Colors.dark.text} />
						</View>
						<View style={styles.settingContent}>
							<Text style={styles.settingLabel}>Contacts Access</Text>
							<Text style={styles.settingDescription}>
								Allow access to your contacts
							</Text>
						</View>
						<Switch
							value={privacySettings.contactsAccess}
							onValueChange={() => toggleSetting("contactsAccess")}
							trackColor={{
								false: Colors.dark.border,
								true: Colors.dark.primary,
							}}
							thumbColor={Colors.dark.text}
						/>
					</View>

					<Pressable
						style={styles.menuItem}
						onPress={() => router.push("/blocked-users")}>
						<View style={styles.menuItemIcon}>
							<User size={20} color={Colors.dark.text} />
						</View>
						<View style={styles.menuItemContent}>
							<Text style={styles.menuItemTitle}>Blocked Users</Text>
							<Text style={styles.menuItemDescription}>
								Manage blocked accounts
							</Text>
						</View>
						<ArrowLeft
							size={20}
							color={Colors.dark.secondaryText}
							style={{ transform: [{ rotate: "180deg" }] }}
						/>
					</Pressable>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Data</Text>

					<View style={styles.settingItem}>
						<View style={styles.settingIcon}>
							<Shield size={20} color={Colors.dark.text} />
						</View>
						<View style={styles.settingContent}>
							<Text style={styles.settingLabel}>Data Collection</Text>
							<Text style={styles.settingDescription}>
								Allow usage data collection
							</Text>
						</View>
						<Switch
							value={privacySettings.dataCollection}
							onValueChange={() => toggleSetting("dataCollection")}
							trackColor={{
								false: Colors.dark.border,
								true: Colors.dark.primary,
							}}
							thumbColor={Colors.dark.text}
						/>
					</View>

					<Pressable
						style={styles.menuItem}
						onPress={() => router.push("/data-download")}>
						<View style={styles.menuItemIcon}>
							<Shield size={20} color={Colors.dark.text} />
						</View>
						<View style={styles.menuItemContent}>
							<Text style={styles.menuItemTitle}>Download Your Data</Text>
							<Text style={styles.menuItemDescription}>
								Request a copy of your data
							</Text>
						</View>
						<ArrowLeft
							size={20}
							color={Colors.dark.secondaryText}
							style={{ transform: [{ rotate: "180deg" }] }}
						/>
					</Pressable>

					<Pressable
						style={[styles.menuItem, styles.dangerItem]}
						onPress={() => router.push("/delete-account")}>
						<Text style={styles.dangerText}>Delete Account</Text>
					</Pressable>
				</View>
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
	section: {
		marginBottom: 32,
	},
	sectionTitle: {
		color: Colors.dark.text,
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 16,
	},
	menuItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.dark.card,
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
	},
	menuItemIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.dark.inputBackground,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
	menuItemContent: {
		flex: 1,
	},
	menuItemTitle: {
		color: Colors.dark.text,
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 4,
	},
	menuItemDescription: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
	},
	settingItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.dark.card,
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
	},
	settingIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.dark.inputBackground,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
	settingContent: {
		flex: 1,
	},
	settingLabel: {
		color: Colors.dark.text,
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 4,
	},
	settingDescription: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
	},
	dangerItem: {
		justifyContent: "center",
		backgroundColor: "rgba(255, 67, 42, 0.1)",
	},
	dangerText: {
		color: Colors.dark.error,
		fontSize: 16,
		fontWeight: "600",
	},
})
