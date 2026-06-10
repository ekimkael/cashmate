import {
	Laptop,
	Smartphone,
	CheckCircle,
	AlertTriangle,
} from "lucide-react-native"
import { Stack } from "expo-router"
import React, { Fragment } from "react"
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native"

import Colors, { useThemeColors } from "@/constants/colors"

export default function LoginHistoryScreen() {
  const C = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: C.background,
  	},
  	scrollContent: {
  		padding: 20,
  	},
  	description: {
  		color: C.secondaryText,
  		fontSize: 16,
  		marginBottom: 24,
  	},
  	section: {
  		marginBottom: 24,
  	},
  	loginItem: {
  		backgroundColor: C.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 16,
  	},
  	currentDevice: {
  		borderWidth: 1,
  		borderColor: C.primary,
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
  		backgroundColor: C.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 12,
  	},
  	deviceName: {
  		color: C.text,
  		fontSize: 16,
  		fontWeight: "500",
  	},
  	loginDate: {
  		color: C.secondaryText,
  		fontSize: 14,
  		marginTop: 4,
  	},
  	statusContainer: {
  		paddingVertical: 8,
  	},
  	loginDetails: {
  		backgroundColor: C.inputBackground,
  		borderRadius: 8,
  		padding: 12,
  	},
  	detailRow: {
  		flexDirection: "row",
  		justifyContent: "space-between",
  		marginBottom: 8,
  	},
  	detailLabel: {
  		color: C.secondaryText,
  		fontSize: 14,
  	},
  	detailValue: {
  		color: C.text,
  		fontSize: 14,
  		fontWeight: "500",
  	},
  	successText: {
  		color: C.primary,
  	},
  	blockedText: {
  		color: C.error,
  	},
  	currentTag: {
  		backgroundColor: C.primary,
  		borderRadius: 12,
  		paddingHorizontal: 8,
  		paddingVertical: 4,
  	},
  	currentTagText: {
  		color: C.background,
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
  		color: C.error,
  		fontSize: 16,
  		fontWeight: "600",
  	},
  })
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
			return <Smartphone size={20} color={C.text} />
		} else {
			return <Laptop size={20} color={C.text} />
		}
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Login History" }} />

			<FlatList
				contentContainerStyle={styles.scrollContent}
				ListHeaderComponent={
					<Text style={styles.description}>
						Review recent account access. If you see any suspicious activity,
						change your password immediately and contact support.
					</Text>
				}
				data={loginHistory}
				renderItem={({ item }) => (
					<View
						key={item.id}
						style={[styles.loginItem, item.current && styles.currentDevice]}>
						<View style={styles.loginHeader}>
							<View style={styles.deviceInfo}>
								<View style={styles.deviceIcon}>
									{getDeviceIcon(item.device)}
								</View>

								<View>
									<Text style={styles.deviceName}>{item.device}</Text>
									<Text style={styles.loginDate}>{item.date}</Text>
								</View>
							</View>

							<View style={styles.statusContainer}>
								{item.status === "success" ? (
									<Fragment>
										{item.current ? (
											<View style={styles.currentTag}>
												<Text style={styles.currentTagText}>
													Current Device
												</Text>
											</View>
										) : (
											<CheckCircle size={20} color={C.primary} />
										)}
									</Fragment>
								) : (
									<AlertTriangle size={20} color={C.error} />
								)}
							</View>
						</View>

						<View style={styles.loginDetails}>
							<View style={styles.detailRow}>
								<Text style={styles.detailLabel}>Location</Text>
								<Text style={styles.detailValue}>{item.location}</Text>
							</View>

							<View style={styles.detailRow}>
								<Text style={styles.detailLabel}>IP Address</Text>
								<Text style={styles.detailValue}>{item.ip}</Text>
							</View>

							<View style={styles.detailRow}>
								<Text style={styles.detailLabel}>Status</Text>
								<Text
									style={[
										styles.detailValue,
										item.status === "success"
											? styles.successText
											: styles.blockedText,
									]}>
									{item.status === "success" ? "Successful" : "Blocked"}
								</Text>
							</View>
						</View>
					</View>
				)}
				ListFooterComponent={
					<Pressable style={styles.reportButton} onPress={() => null}>
						<Text style={styles.reportButtonText}>
							Report Suspicious Activity
						</Text>
					</Pressable>
				}
			/>
		</View>
	)
}

