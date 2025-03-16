import React from "react"
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import {
	ArrowLeft,
	Smartphone,
	Laptop,
	AlertTriangle,
	CheckCircle,
} from "lucide-react-native"
import Colors from "@/constants/colors"

export default function LoginHistoryScreen() {
	const router = useRouter()

	const loginHistory = [
		{
			id: "1",
			device: "iPhone 13",
			location: "San Francisco, CA",
			ip: "192.168.1.1",
			date: "Today, 10:45 AM",
			status: "success",
			current: true,
		},
		{
			id: "2",
			device: "MacBook Pro",
			location: "San Francisco, CA",
			ip: "192.168.1.2",
			date: "Yesterday, 6:30 PM",
			status: "success",
			current: false,
		},
		{
			id: "3",
			device: "Unknown Device",
			location: "New York, NY",
			ip: "203.0.113.1",
			date: "May 15, 2023, 8:12 AM",
			status: "blocked",
			current: false,
		},
		{
			id: "4",
			device: "iPad Pro",
			location: "San Francisco, CA",
			ip: "192.168.1.3",
			date: "May 10, 2023, 3:45 PM",
			status: "success",
			current: false,
		},
		{
			id: "5",
			device: "Windows PC",
			location: "Chicago, IL",
			ip: "198.51.100.1",
			date: "May 5, 2023, 11:20 AM",
			status: "success",
			current: false,
		},
	]

	const getDeviceIcon = (device: string | string[]) => {
		if (device.includes("iPhone") || device.includes("iPad")) {
			return <Smartphone size={20} color={Colors.dark.text} />
		} else {
			return <Laptop size={20} color={Colors.dark.text} />
		}
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Login History" }} />

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<Text style={styles.description}>
					Review recent account access. If you see any suspicious activity,
					change your password immediately and contact support.
				</Text>

				<View style={styles.section}>
					{loginHistory.map((login) => (
						<View
							key={login.id}
							style={[styles.loginItem, login.current && styles.currentDevice]}>
							<View style={styles.loginHeader}>
								<View style={styles.deviceInfo}>
									<View style={styles.deviceIcon}>
										{getDeviceIcon(login.device)}
									</View>
									<View>
										<Text style={styles.deviceName}>{login.device}</Text>
										<Text style={styles.loginDate}>{login.date}</Text>
									</View>
								</View>
								<View style={styles.statusContainer}>
									{login.status === "success" ? (
										<CheckCircle size={20} color={Colors.dark.primary} />
									) : (
										<AlertTriangle size={20} color={Colors.dark.error} />
									)}
								</View>
							</View>

							<View style={styles.loginDetails}>
								<View style={styles.detailRow}>
									<Text style={styles.detailLabel}>Location</Text>
									<Text style={styles.detailValue}>{login.location}</Text>
								</View>
								<View style={styles.detailRow}>
									<Text style={styles.detailLabel}>IP Address</Text>
									<Text style={styles.detailValue}>{login.ip}</Text>
								</View>
								<View style={styles.detailRow}>
									<Text style={styles.detailLabel}>Status</Text>
									<Text
										style={[
											styles.detailValue,
											login.status === "success"
												? styles.successText
												: styles.blockedText,
										]}>
										{login.status === "success" ? "Successful" : "Blocked"}
									</Text>
								</View>
							</View>

							{login.current && (
								<View style={styles.currentTag}>
									<Text style={styles.currentTagText}>Current Device</Text>
								</View>
							)}
						</View>
					))}
				</View>

				<Pressable
					style={styles.reportButton}
					onPress={() => router.push("/report-suspicious")}>
					<Text style={styles.reportButtonText}>
						Report Suspicious Activity
					</Text>
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
	description: {
		color: Colors.dark.secondaryText,
		fontSize: 16,
		marginBottom: 24,
	},
	section: {
		marginBottom: 24,
	},
	loginItem: {
		backgroundColor: Colors.dark.card,
		borderRadius: 12,
		padding: 16,
		marginBottom: 16,
	},
	currentDevice: {
		borderWidth: 1,
		borderColor: Colors.dark.primary,
	},
	loginHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	deviceInfo: {
		flexDirection: "row",
		alignItems: "center",
	},
	deviceIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.dark.inputBackground,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
	deviceName: {
		color: Colors.dark.text,
		fontSize: 16,
		fontWeight: "500",
	},
	loginDate: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
		marginTop: 4,
	},
	statusContainer: {
		padding: 8,
	},
	loginDetails: {
		backgroundColor: Colors.dark.inputBackground,
		borderRadius: 8,
		padding: 12,
	},
	detailRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	detailLabel: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
	},
	detailValue: {
		color: Colors.dark.text,
		fontSize: 14,
		fontWeight: "500",
	},
	successText: {
		color: Colors.dark.primary,
	},
	blockedText: {
		color: Colors.dark.error,
	},
	currentTag: {
		position: "absolute",
		top: 16,
		right: 16,
		backgroundColor: Colors.dark.primary,
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
	currentTagText: {
		color: Colors.dark.background,
		fontSize: 12,
		fontWeight: "600",
	},
	reportButton: {
		backgroundColor: "rgba(255, 67, 42, 0.1)",
		borderRadius: 12,
		padding: 16,
		alignItems: "center",
		justifyContent: "center",
	},
	reportButtonText: {
		color: Colors.dark.error,
		fontSize: 16,
		fontWeight: "600",
	},
})
