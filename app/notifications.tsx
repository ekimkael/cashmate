import {
	View,
	Text,
	Switch,
	FlatList,
	Pressable,
	StyleSheet,
	ScrollView,
} from "react-native"
import React from "react"
import { Stack, useRouter } from "expo-router"
import { Bell, DollarSign, CreditCard, User } from "lucide-react-native"

import { useThemeColors } from "@/constants/colors"

export default function NotificationsScreen() {
  const colors = useThemeColors()
  const styles = StyleSheet.create({
  	container: { flex: 1, backgroundColor: colors.background },
  	header: { padding: 16 },
  	headerTitle: {
  		fontSize: 18,
  		fontWeight: "600",
  		marginBottom: 16,
  		color: colors.text,
  	},
  	settings: { padding: 16, gap: 8 },
  	settingItem: {
  		gap: 16,
  		padding: 16,
  		borderRadius: 12,
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: colors.card,
  	},
  	settingIcon: {
  		width: 40,
  		height: 40,
  		borderRadius: 20,
  		alignItems: "center",
  		justifyContent: "center",
  		backgroundColor: colors.inputBackground,
  	},
  	settingContent: { flex: 1, gap: 4 },
  	settingLabel: {
  		fontSize: 16,
  		fontWeight: "500",
  		color: colors.text,
  	},
  	settingDescription: {
  		color: colors.secondaryText,
  		fontSize: 14,
  	},
  	recentTitle: {
  		color: colors.text,
  		fontSize: 18,
  		fontWeight: "600",
  		marginBottom: 16,
  	},
  	notificationItem: {
  		flexDirection: "row",
  		padding: 16,
  		borderBottomWidth: 1,
  		borderBottomColor: colors.border,
  	},
  	unreadItem: {
  		backgroundColor: "rgba(0, 214, 50, 0.05)",
  	},
  	notificationIcon: {
  		width: 40,
  		height: 40,
  		borderRadius: 20,
  		backgroundColor: colors.card,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 12,
  	},
  	notificationContent: {
  		flex: 1,
  	},
  	notificationTitle: {
  		color: colors.text,
  		fontSize: 16,
  		fontWeight: "600",
  		marginBottom: 4,
  	},
  	notificationMessage: {
  		color: colors.secondaryText,
  		fontSize: 14,
  		marginBottom: 8,
  	},
  	notificationTime: {
  		color: colors.secondaryText,
  		fontSize: 12,
  	},
  	emptyContainer: {
  		padding: 20,
  		alignItems: "center",
  	},
  	emptyText: {
  		color: colors.secondaryText,
  		fontSize: 16,
  	},
  })
	const router = useRouter()

	const [notificationSettings, setNotificationSettings] = React.useState({
		payments: true,
		deposits: true,
		cardActivity: true,
		promotions: false,
		friendActivity: true,
	})

	const toggleSetting = (key) => {
		setNotificationSettings({
			...notificationSettings,
			[key]: !notificationSettings[key],
		})
	}

	const notificationItems = [
		{
			id: "1",
			title: "Payment Received",
			message: "You received $50.00 from Sarah Johnson",
			time: "2 hours ago",
			icon: DollarSign,
			read: false,
		},
		{
			id: "2",
			title: "Card Purchase",
			message: "Your Cash Card was used for a $25.50 purchase at Coffee Shop",
			time: "1 day ago",
			icon: CreditCard,
			read: true,
		},
		{
			id: "3",
			title: "New Friend on Cash App",
			message:
				"Michael Chen joined Cash App. Send them a payment to say hello!",
			time: "2 days ago",
			icon: User,
			read: true,
		},
		{
			id: "4",
			title: "Boost Added",
			message: "New 10% off Boost added for Coffee Shop",
			time: "3 days ago",
			icon: DollarSign,
			read: true,
		},
	]

	return (
		<View style={styles.container}>
			<Stack.Screen options={{
				title: "Notifications",
				headerLargeTitle: true,
				headerTransparent: true,
				headerShadowVisible: false,
				headerLargeTitleShadowVisible: false,
				headerLargeStyle: { backgroundColor: "transparent" },
				headerBlurEffect: "systemChromeMaterial",
			}} />

			<ScrollView contentInsetAdjustmentBehavior="automatic">
				<View style={styles.settings}>
					<View style={styles.settingItem}>
						<View style={styles.settingIcon}>
							<DollarSign size={20} color={colors.text} />
						</View>
						<View style={styles.settingContent}>
							<Text style={styles.settingLabel}>Payments</Text>
							<Text style={styles.settingDescription}>
								Receive notifications for payments
							</Text>
						</View>
						<Switch
							value={notificationSettings.payments}
							onValueChange={() => toggleSetting("payments")}
							trackColor={{
								false: colors.border,
								true: colors.primary,
							}}
							thumbColor={colors.text}
						/>
					</View>

					<View style={styles.settingItem}>
						<View style={styles.settingIcon}>
							<DollarSign size={20} color={colors.text} />
						</View>
						<View style={styles.settingContent}>
							<Text style={styles.settingLabel}>Deposits</Text>
							<Text style={styles.settingDescription}>
								Receive notifications for deposits
							</Text>
						</View>
						<Switch
							value={notificationSettings.deposits}
							onValueChange={() => toggleSetting("deposits")}
							trackColor={{
								false: colors.border,
								true: colors.primary,
							}}
							thumbColor={colors.text}
						/>
					</View>

					<View style={styles.settingItem}>
						<View style={styles.settingIcon}>
							<CreditCard size={20} color={colors.text} />
						</View>
						<View style={styles.settingContent}>
							<Text style={styles.settingLabel}>Card Activity</Text>
							<Text style={styles.settingDescription}>
								Receive notifications for card transactions
							</Text>
						</View>
						<Switch
							value={notificationSettings.cardActivity}
							onValueChange={() => toggleSetting("cardActivity")}
							trackColor={{
								false: colors.border,
								true: colors.primary,
							}}
							thumbColor={colors.text}
						/>
					</View>

					<View style={styles.settingItem}>
						<View style={styles.settingIcon}>
							<Bell size={20} color={colors.text} />
						</View>
						<View style={styles.settingContent}>
							<Text style={styles.settingLabel}>Promotions</Text>
							<Text style={styles.settingDescription}>
								Receive promotional notifications
							</Text>
						</View>
						<Switch
							value={notificationSettings.promotions}
							onValueChange={() => toggleSetting("promotions")}
							trackColor={{
								false: colors.border,
								true: colors.primary,
							}}
							thumbColor={colors.text}
						/>
					</View>

					<View style={styles.settingItem}>
						<View style={styles.settingIcon}>
							<User size={20} color={colors.text} />
						</View>
						<View style={styles.settingContent}>
							<Text style={styles.settingLabel}>Friend Activity</Text>
							<Text style={styles.settingDescription}>
								Receive notifications about friends
							</Text>
						</View>
						<Switch
							value={notificationSettings.friendActivity}
							onValueChange={() => toggleSetting("friendActivity")}
							trackColor={{
								false: colors.border,
								true: colors.primary,
							}}
							thumbColor={colors.text}
						/>
					</View>
				</View>

				<FlatList
					scrollEnabled={false}
					data={notificationItems}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<Pressable
							style={[
								styles.notificationItem,
								!item.read && styles.unreadItem,
							]}>
							<View style={styles.notificationIcon}>
								<item.icon size={20} color={colors.text} />
							</View>
							<View style={styles.notificationContent}>
								<Text style={styles.notificationTitle}>{item.title}</Text>
								<Text style={styles.notificationMessage}>{item.message}</Text>
								<Text style={styles.notificationTime}>{item.time}</Text>
							</View>
						</Pressable>
					)}
					ListHeaderComponent={
						<View style={styles.header}>
							<Text style={styles.recentTitle}>Recent Notifications</Text>
						</View>
					}
					ListEmptyComponent={
						<View style={styles.emptyContainer}>
							<Text style={styles.emptyText}>No notifications</Text>
						</View>
					}
				/>
			</ScrollView>
		</View>
	)
}

