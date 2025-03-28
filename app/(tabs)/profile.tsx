import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import React from "react"
import {
	View,
	Text,
	Image,
	Switch,
	Pressable,
	StyleSheet,
	ScrollView,
} from "react-native"
import {
	Globe,
	Moon,
	Bell,
	Shield,
	LogOut,
	QrCode,
	Smartphone,
	DollarSign,
	ArrowRight,
	UserRound,
} from "lucide-react-native"

import Colors from "@/constants/colors"
import { useUserStore } from "@/store/userStore"

import HStack from "@/components/hstack"

export default function ProfileScreen() {
	const router = useRouter()
	const { user, logout } = useUserStore()

	const [settings, setSettings] = React.useState({
		darkMode: true,
		notifications: true,
		soundEffects: true,
		hapticFeedback: true,
		autoLock: true,
	})

	const toggleSetting = (key: string) => {
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
		<SafeAreaView style={styles.screen}>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerTitle}>Profile</Text>

					<HStack style={styles.profileCard} justify="space-between">
						<HStack gap={12}>
							{user.avatar ? (
								<Image source={{ uri: user.avatar }} style={styles.avatar} />
							) : (
								<View style={styles.defaultAvatar}>
									<UserRound size={32} color={Colors.dark.text} />
								</View>
							)}

							<View>
								<Text style={styles.profileName}>{user.name}</Text>
								<Text style={styles.username}>@{user.username}</Text>
							</View>
						</HStack>

						<Pressable
							style={styles.qrcode}
							onPress={() => router.push("/qrcode")}>
							<QrCode size={20} color={Colors.dark.text} />
						</Pressable>
					</HStack>
				</View>

				<View style={styles.main}>
					<View style={styles.section}>
						<Text style={styles.heading}>Account</Text>

						<View style={styles.group}>
							<Pressable
								style={styles.menuItem}
								onPress={() => router.push("/profile-settings")}>
								<View style={styles.menuItemIcon}>
									<UserRound size={20} color={Colors.dark.text} />
								</View>
								<View style={styles.menuItemContent}>
									<Text style={styles.menuItemTitle}>Profile Information</Text>
									<Text style={styles.menuItemDescription}>
										Update your personal details
									</Text>
								</View>
								<ArrowRight size={20} color={Colors.dark.secondaryText} />
							</Pressable>

							<Pressable
								style={styles.menuItem}
								onPress={() => router.push("/payment-methods")}>
								<View style={styles.menuItemIcon}>
									<DollarSign size={20} color={Colors.dark.text} />
								</View>
								<View style={styles.menuItemContent}>
									<Text style={styles.menuItemTitle}>Payment Methods</Text>
									<Text style={styles.menuItemDescription}>
										Manage your linked accounts
									</Text>
								</View>
								<ArrowRight size={20} color={Colors.dark.secondaryText} />
							</Pressable>

							<Pressable
								style={styles.menuItem}
								onPress={() => router.push("/notifications")}>
								<View style={styles.menuItemIcon}>
									<Bell size={20} color={Colors.dark.text} />
								</View>
								<View style={styles.menuItemContent}>
									<Text style={styles.menuItemTitle}>Notifications</Text>
									<Text style={styles.menuItemDescription}>
										Manage notification preferences
									</Text>
								</View>
								<ArrowRight size={20} color={Colors.dark.secondaryText} />
							</Pressable>

							<Pressable
								style={styles.menuItem}
								onPress={() => router.push("/privacy")}>
								<View style={styles.menuItemIcon}>
									<Shield size={20} color={Colors.dark.text} />
								</View>
								<View style={styles.menuItemContent}>
									<Text style={styles.menuItemTitle}>Privacy & Security</Text>
									<Text style={styles.menuItemDescription}>
										Manage security settings
									</Text>
								</View>
								<ArrowRight size={20} color={Colors.dark.secondaryText} />
							</Pressable>
						</View>
					</View>

					<View style={styles.section}>
						<Text style={styles.heading}>Preferences</Text>

						<View style={styles.group}>
							<View style={styles.menuItem}>
								<View style={styles.menuItemIcon}>
									<Moon size={20} color={Colors.dark.text} />
								</View>
								<View style={styles.menuItemContent}>
									<Text style={styles.menuItemTitle}>Dark Mode</Text>
									<Text style={styles.menuItemDescription}>Use dark theme</Text>
								</View>
								<Switch
									value={settings.darkMode}
									onValueChange={() => toggleSetting("darkMode")}
									trackColor={{
										false: Colors.dark.border,
										true: Colors.dark.primary,
									}}
									thumbColor={Colors.dark.text}
								/>
							</View>

							<View style={styles.menuItem}>
								<View style={styles.menuItemIcon}>
									<Bell size={20} color={Colors.dark.text} />
								</View>
								<View style={styles.menuItemContent}>
									<Text style={styles.menuItemTitle}>Sound Effects</Text>
									<Text style={styles.menuItemDescription}>
										Play sounds for actions
									</Text>
								</View>
								<Switch
									value={settings.soundEffects}
									onValueChange={() => toggleSetting("soundEffects")}
									trackColor={{
										false: Colors.dark.border,
										true: Colors.dark.primary,
									}}
									thumbColor={Colors.dark.text}
								/>
							</View>

							<View style={styles.menuItem}>
								<View style={styles.menuItemIcon}>
									<Smartphone size={20} color={Colors.dark.text} />
								</View>
								<View style={styles.menuItemContent}>
									<Text style={styles.menuItemTitle}>Haptic Feedback</Text>
									<Text style={styles.menuItemDescription}>
										Enable vibration feedback
									</Text>
								</View>
								<Switch
									value={settings.hapticFeedback}
									onValueChange={() => toggleSetting("hapticFeedback")}
									trackColor={{
										false: Colors.dark.border,
										true: Colors.dark.primary,
									}}
									thumbColor={Colors.dark.text}
								/>
							</View>

							<Pressable
								style={styles.menuItem}
								onPress={() => router.push("/currency")}>
								<View style={styles.menuItemIcon}>
									<DollarSign size={20} color={Colors.dark.text} />
								</View>
								<View style={styles.menuItemContent}>
									<Text style={styles.menuItemTitle}>Currency</Text>
									<Text style={styles.menuItemDescription}>
										USD - United States Dollar
									</Text>
								</View>
								<ArrowRight size={20} color={Colors.dark.secondaryText} />
							</Pressable>

							<Pressable
								style={styles.menuItem}
								onPress={() => router.push("/language")}>
								<View style={styles.menuItemIcon}>
									<Globe size={20} color={Colors.dark.text} />
								</View>
								<View style={styles.menuItemContent}>
									<Text style={styles.menuItemTitle}>Language</Text>
									<Text style={styles.menuItemDescription}>English (US)</Text>
								</View>
								<ArrowRight size={20} color={Colors.dark.secondaryText} />
							</Pressable>
						</View>
					</View>

					<View style={styles.section}>
						<Text style={styles.heading}>About</Text>

						<View style={styles.group}>
							<Pressable
								style={styles.menuItem}
								onPress={() => router.push("/help")}>
								<View style={styles.menuItemContent}>
									<Text style={styles.menuItemTitle}>Help & Support</Text>
								</View>
								<ArrowRight size={20} color={Colors.dark.secondaryText} />
							</Pressable>

							<Pressable
								style={styles.menuItem}
								onPress={() => router.push("/terms")}>
								<View style={styles.menuItemContent}>
									<Text style={styles.menuItemTitle}>Terms of Service</Text>
								</View>
								<ArrowRight size={20} color={Colors.dark.secondaryText} />
							</Pressable>

							<Pressable
								style={styles.menuItem}
								onPress={() => router.push("/privacy-policy")}>
								<View style={styles.menuItemContent}>
									<Text style={styles.menuItemTitle}>Privacy Policy</Text>
								</View>
								<ArrowRight size={20} color={Colors.dark.secondaryText} />
							</Pressable>
						</View>
					</View>

					<View style={styles.section}>
						<Pressable
							style={styles.logoutButton}
							onPress={() => {
								logout()
								router.replace("/auth/login")
							}}>
							<LogOut size={20} color={Colors.dark.error} />
							<Text style={styles.logoutText}>Log Out</Text>
						</Pressable>
					</View>

					<Text style={styles.version}>Version 1.0.0</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: Colors.dark.background },
	container: { paddingHorizontal: 16, gap: 16 },
	header: { gap: 16 },
	headerTitle: {
		fontSize: 24,
		fontWeight: "700",
		color: Colors.dark.text,
	},
	profileCard: {
		padding: 16,
		borderRadius: 16,
		backgroundColor: Colors.dark.card,
	},
	profileLeftSide: { flexDirection: "row", alignItems: "center", gap: 12 },
	avatar: {
		width: 60,
		height: 60,
		borderRadius: 30,
	},
	defaultAvatar: {
		width: 60,
		height: 60,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.dark.inputBackground,
	},
	profileInfo: { flex: 1 },
	profileName: {
		fontSize: 18,
		fontWeight: "600",
		color: Colors.dark.text,
	},
	username: { color: Colors.dark.secondaryText, fontSize: 14 },
	qrcode: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.dark.inputBackground,
	},
	main: { gap: 16 },
	section: { gap: 16 },
	heading: {
		fontSize: 18,
		fontWeight: "600",
		color: Colors.dark.text,
	},
	group: { gap: 8 },
	menuItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.dark.card,
		borderRadius: 12,
		padding: 16,
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
	logoutButton: {
		gap: 8,
		padding: 16,
		borderRadius: 12,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(255, 67, 42, 0.1)",
	},
	logoutText: { fontSize: 16, fontWeight: "600", color: Colors.dark.error },
	version: {
		fontSize: 14,
		textAlign: "center",
		color: Colors.dark.secondaryText,
	},
	errorText: {
		fontSize: 16,
		textAlign: "center",
		color: Colors.dark.text,
	},
})
