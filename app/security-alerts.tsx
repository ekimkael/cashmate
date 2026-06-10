import React, { useState } from "react"
import { Stack, useRouter } from "expo-router"
import { View, Text, StyleSheet, ScrollView, Switch } from "react-native"
import { Bell, Shield, CreditCard, User, Lock } from "lucide-react-native"

import { useThemeColors } from "@/constants/colors"

export default function SecurityAlertsScreen() {
  const colors = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: colors.background,
  	},
  	scrollContent: {
  		padding: 20,
  	},
  	description: {
  		color: colors.secondaryText,
  		fontSize: 16,
  		marginBottom: 24,
  	},
  	section: {
  		marginBottom: 24,
  	},
  	alertItem: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  	},
  	alertIcon: {
  		width: 40,
  		height: 40,
  		borderRadius: 20,
  		backgroundColor: colors.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 12,
  	},
  	alertContent: {
  		flex: 1,
  	},
  	alertTitle: {
  		color: colors.text,
  		fontSize: 16,
  		fontWeight: "500",
  		marginBottom: 4,
  	},
  	alertDescription: {
  		color: colors.secondaryText,
  		fontSize: 14,
  	},
  	note: {
  		color: colors.secondaryText,
  		fontSize: 14,
  		textAlign: "center",
  	},
  })
	const router = useRouter()

	const [alerts, setAlerts] = useState({
		loginAttempts: true,
		newDevices: true,
		passwordChanges: true,
		suspiciousActivity: true,
		paymentMethods: true,
		profileChanges: false,
	})

	const toggleAlert = (key) => setAlerts({ ...alerts, [key]: !alerts[key] })

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Security Alerts" }} />

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<Text style={styles.description}>
					Choose which security events you want to be notified about. Critical
					security alerts cannot be disabled.
				</Text>

				<View style={styles.section}>
					<View style={styles.alertItem}>
						<View style={styles.alertIcon}>
							<Shield size={20} color={colors.text} />
						</View>
						<View style={styles.alertContent}>
							<Text style={styles.alertTitle}>Suspicious Login Attempts</Text>
							<Text style={styles.alertDescription}>
								Get notified when someone tries to access your account
							</Text>
						</View>
						<Switch
							value={alerts.loginAttempts}
							onValueChange={() => toggleAlert("loginAttempts")}
							trackColor={{
								false: colors.border,
								true: colors.primary,
							}}
							thumbColor={colors.text}
						/>
					</View>

					<View style={styles.alertItem}>
						<View style={styles.alertIcon}>
							<Bell size={20} color={colors.text} />
						</View>
						<View style={styles.alertContent}>
							<Text style={styles.alertTitle}>New Device Login</Text>
							<Text style={styles.alertDescription}>
								Get notified when your account is accessed from a new device
							</Text>
						</View>
						<Switch
							value={alerts.newDevices}
							onValueChange={() => toggleAlert("newDevices")}
							trackColor={{
								false: colors.border,
								true: colors.primary,
							}}
							thumbColor={colors.text}
						/>
					</View>

					<View style={styles.alertItem}>
						<View style={styles.alertIcon}>
							<Lock size={20} color={colors.text} />
						</View>
						<View style={styles.alertContent}>
							<Text style={styles.alertTitle}>Password Changes</Text>
							<Text style={styles.alertDescription}>
								Get notified when your password is changed
							</Text>
						</View>
						<Switch
							value={alerts.passwordChanges}
							onValueChange={() => toggleAlert("passwordChanges")}
							trackColor={{
								false: colors.border,
								true: colors.primary,
							}}
							thumbColor={colors.text}
						/>
					</View>

					<View style={styles.alertItem}>
						<View style={styles.alertIcon}>
							<Shield size={20} color={colors.text} />
						</View>
						<View style={styles.alertContent}>
							<Text style={styles.alertTitle}>Suspicious Activity</Text>
							<Text style={styles.alertDescription}>
								Get notified about unusual transactions or account activity
							</Text>
						</View>
						<Switch
							value={alerts.suspiciousActivity}
							onValueChange={() => toggleAlert("suspiciousActivity")}
							trackColor={{
								false: colors.border,
								true: colors.primary,
							}}
							thumbColor={colors.text}
						/>
					</View>

					<View style={styles.alertItem}>
						<View style={styles.alertIcon}>
							<CreditCard size={20} color={colors.text} />
						</View>
						<View style={styles.alertContent}>
							<Text style={styles.alertTitle}>Payment Method Changes</Text>
							<Text style={styles.alertDescription}>
								Get notified when payment methods are added or removed
							</Text>
						</View>
						<Switch
							value={alerts.paymentMethods}
							onValueChange={() => toggleAlert("paymentMethods")}
							trackColor={{
								false: colors.border,
								true: colors.primary,
							}}
							thumbColor={colors.text}
						/>
					</View>

					<View style={styles.alertItem}>
						<View style={styles.alertIcon}>
							<User size={20} color={colors.text} />
						</View>
						<View style={styles.alertContent}>
							<Text style={styles.alertTitle}>Profile Changes</Text>
							<Text style={styles.alertDescription}>
								Get notified when your profile information is updated
							</Text>
						</View>
						<Switch
							value={alerts.profileChanges}
							onValueChange={() => toggleAlert("profileChanges")}
							trackColor={{
								false: colors.border,
								true: colors.primary,
							}}
							thumbColor={colors.text}
						/>
					</View>
				</View>

				<Text style={styles.note}>
					You will receive these alerts via email and push notifications. You
					can manage notification preferences in the Notifications section.
				</Text>
			</ScrollView>
		</View>
	)
}

