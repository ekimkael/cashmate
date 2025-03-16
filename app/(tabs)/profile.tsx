import React from "react"
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Pressable,
	Image,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import {
	Settings,
	ChevronRight,
	User,
	QrCode,
	Bell,
	Shield,
	HelpCircle,
	LogOut,
} from "lucide-react-native"
import { useUserStore } from "@/store/userStore"
import Colors from "@/constants/colors"

export default function ProfileScreen() {
	const router = useRouter()
	const { user, logout } = useUserStore()

	if (!user) {
		return (
			<View style={styles.container}>
				<Text style={styles.errorText}>User not found</Text>
			</View>
		)
	}

	const menuItems = [
		{
			icon: QrCode,
			title: "QR Code",
			onPress: () => router.push("/qrcode"),
		},
		{
			icon: Bell,
			title: "Notifications",
			onPress: () => router.push("/notifications"),
		},
		{
			icon: Shield,
			title: "Privacy & Security",
			onPress: () => router.push("/privacy"),
		},
		{
			icon: HelpCircle,
			title: "Help",
			onPress: () => router.push("/help"),
		},
		{
			icon: Settings,
			title: "Settings",
			onPress: () => router.push("/settings"),
		},
	]

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.header}>
					<Text style={styles.headerTitle}>Profile</Text>
				</View>

				<Pressable
					style={styles.profileCard}
					onPress={() => router.push("/editprofile")}>
					<View style={styles.profileAvatar}>
						{user.avatar ? (
							<Image source={{ uri: user.avatar }} style={styles.avatar} />
						) : (
							<View style={styles.defaultAvatar}>
								<User size={32} color={Colors.dark.text} />
							</View>
						)}
					</View>
					<View style={styles.profileInfo}>
						<Text style={styles.profileName}>{user.name}</Text>
						<Text style={styles.profileUsername}>@{user.username}</Text>
					</View>
					<ChevronRight size={20} color={Colors.dark.secondaryText} />
				</Pressable>

				<View style={styles.menuSection}>
					{menuItems.map((item, index) => (
						<Pressable
							key={index}
							style={styles.menuItem}
							onPress={item.onPress}>
							<View style={styles.menuItemIcon}>
								<item.icon size={20} color={Colors.dark.text} />
							</View>
							<Text style={styles.menuItemTitle}>{item.title}</Text>
							<ChevronRight size={20} color={Colors.dark.secondaryText} />
						</Pressable>
					))}
				</View>

				<Pressable
					style={styles.logoutButton}
					onPress={() => {
						logout()
						router.replace("/")
					}}>
					<LogOut size={20} color={Colors.dark.error} />
					<Text style={styles.logoutText}>Log Out</Text>
				</Pressable>

				<Text style={styles.versionText}>Version 1.0.0</Text>
			</ScrollView>
		</SafeAreaView>
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
	header: {
		marginBottom: 24,
	},
	headerTitle: {
		color: Colors.dark.text,
		fontSize: 24,
		fontWeight: "700",
	},
	profileCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.dark.card,
		borderRadius: 16,
		padding: 20,
		marginBottom: 24,
	},
	profileAvatar: {
		marginRight: 16,
	},
	avatar: {
		width: 60,
		height: 60,
		borderRadius: 30,
	},
	defaultAvatar: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: Colors.dark.inputBackground,
		alignItems: "center",
		justifyContent: "center",
	},
	profileInfo: {
		flex: 1,
	},
	profileName: {
		color: Colors.dark.text,
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 4,
	},
	profileUsername: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
	},
	menuSection: {
		marginBottom: 24,
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
		marginRight: 16,
	},
	menuItemTitle: {
		flex: 1,
		color: Colors.dark.text,
		fontSize: 16,
		fontWeight: "500",
	},
	logoutButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(255, 67, 42, 0.1)",
		borderRadius: 12,
		padding: 16,
		marginBottom: 24,
	},
	logoutText: {
		color: Colors.dark.error,
		fontSize: 16,
		fontWeight: "600",
		marginLeft: 8,
	},
	versionText: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
		textAlign: "center",
	},
	errorText: {
		color: Colors.dark.text,
		fontSize: 16,
		textAlign: "center",
	},
})
