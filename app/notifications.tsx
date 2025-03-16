import {
	View,
	Text,
	Switch,
	FlatList,
	Pressable,
	StyleSheet,
} from "react-native"
import React from "react"
import { Stack, useRouter } from "expo-router"
import { Bell, DollarSign, CreditCard, User } from "lucide-react-native"

import Colors from "@/constants/colors"

export default function NotificationsScreen() {
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
			<Stack.Screen options={{ title: "Notifications" }} />

			<FlatList
				data={notificationItems}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Pressable
						style={[styles.notificationItem, !item.read && styles.unreadItem]}>
						<View style={styles.notificationIcon}>
							<item.icon size={20} color={Colors.dark.text} />
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
						<Text style={styles.headerTitle}>Notification Settings</Text>
						<View style={styles.settingsContainer}>
							<View style={styles.settingItem}>
								<View style={styles.settingIcon}>
									<DollarSign size={20} color={Colors.dark.text} />
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
										false: Colors.dark.border,
										true: Colors.dark.primary,
									}}
									thumbColor={Colors.dark.text}
								/>
							</View>

							<View style={styles.settingItem}>
								<View style={styles.settingIcon}>
									<DollarSign size={20} color={Colors.dark.text} />
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
										false: Colors.dark.border,
										true: Colors.dark.primary,
									}}
									thumbColor={Colors.dark.text}
								/>
							</View>

							<View style={styles.settingItem}>
								<View style={styles.settingIcon}>
									<CreditCard size={20} color={Colors.dark.text} />
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
										false: Colors.dark.border,
										true: Colors.dark.primary,
									}}
									thumbColor={Colors.dark.text}
								/>
							</View>

							<View style={styles.settingItem}>
								<View style={styles.settingIcon}>
									<Bell size={20} color={Colors.dark.text} />
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
									<Text style={styles.settingLabel}>Friend Activity</Text>
									<Text style={styles.settingDescription}>
										Receive notifications about friends
									</Text>
								</View>
								<Switch
									value={notificationSettings.friendActivity}
									onValueChange={() => toggleSetting("friendActivity")}
									trackColor={{
										false: Colors.dark.border,
										true: Colors.dark.primary,
									}}
									thumbColor={Colors.dark.text}
								/>
							</View>
						</View>

						<Text style={styles.recentTitle}>Recent Notifications</Text>
					</View>
				}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>No notifications</Text>
					</View>
				}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.dark.background,
	},
	header: {
		padding: 20,
	},
	headerTitle: {
		color: Colors.dark.text,
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 16,
	},
	settingsContainer: {
		marginBottom: 24,
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
	recentTitle: {
		color: Colors.dark.text,
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 16,
	},
	notificationItem: {
		flexDirection: "row",
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: Colors.dark.border,
	},
	unreadItem: {
		backgroundColor: "rgba(0, 214, 50, 0.05)",
	},
	notificationIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.dark.card,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
	notificationContent: {
		flex: 1,
	},
	notificationTitle: {
		color: Colors.dark.text,
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 4,
	},
	notificationMessage: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
		marginBottom: 8,
	},
	notificationTime: {
		color: Colors.dark.secondaryText,
		fontSize: 12,
	},
	emptyContainer: {
		padding: 20,
		alignItems: "center",
	},
	emptyText: {
		color: Colors.dark.secondaryText,
		fontSize: 16,
	},
})
