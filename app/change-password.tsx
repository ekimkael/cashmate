import React, { useState } from "react"
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react-native"
import Colors, { useThemeColors } from "@/constants/colors"
import Button from "@/components/ui/button"

export default function ChangePasswordScreen() {
  const colors = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: colors.background,
  	},
  	content: {
  		flex: 1,
  		padding: 20,
  	},
  	title: {
  		color: colors.text,
  		fontSize: 24,
  		fontWeight: "700",
  		marginBottom: 8,
  	},
  	subtitle: {
  		color: colors.secondaryText,
  		fontSize: 16,
  		marginBottom: 24,
  	},
  	errorContainer: {
  		backgroundColor: "rgba(255, 67, 42, 0.1)",
  		borderRadius: 8,
  		padding: 12,
  		marginBottom: 20,
  	},
  	errorText: {
  		color: colors.error,
  		fontSize: 14,
  	},
  	successContainer: {
  		backgroundColor: "rgba(0, 214, 50, 0.1)",
  		borderRadius: 8,
  		padding: 12,
  		marginBottom: 20,
  	},
  	successText: {
  		color: colors.success,
  		fontSize: 14,
  	},
  	form: {
  		marginBottom: 32,
  	},
  	inputContainer: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: colors.inputBackground,
  		borderRadius: 12,
  		marginBottom: 16,
  		paddingHorizontal: 16,
  	},
  	inputIcon: {
  		marginRight: 12,
  	},
  	input: {
  		flex: 1,
  		height: 56,
  		color: colors.text,
  		fontSize: 16,
  	},
  	passwordToggle: {
  		padding: 8,
  	},
  	passwordTips: {
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  	},
  	tipsTitle: {
  		color: colors.text,
  		fontSize: 16,
  		fontWeight: "600",
  		marginBottom: 12,
  	},
  	tipItem: {
  		color: colors.secondaryText,
  		fontSize: 14,
  		marginBottom: 8,
  	},
  })
	const router = useRouter()

	const [currentPassword, setCurrentPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [showPasswords, setShowPasswords] = useState(false)
	const [error, setError] = useState("")
	const [success, setSuccess] = useState(false)

	const handleChangePassword = () => {
		if (!currentPassword || !newPassword || !confirmPassword) {
			setError("Please fill in all fields")
			return
		}

		if (newPassword !== confirmPassword) {
			setError("New passwords do not match")
			return
		}

		if (newPassword.length < 8) {
			setError("Password must be at least 8 characters long")
			return
		}

		// In a real app, we would validate the current password and update it
		// For demo purposes, we'll just show a success message
		setSuccess(true)

		// Reset form
		setCurrentPassword("")
		setNewPassword("")
		setConfirmPassword("")
		setError("")
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Change Password" }} />

			<View style={styles.content}>
				<Text style={styles.subtitle}>
					Create a new password that is at least 8 characters long
				</Text>

				{error ? (
					<View style={styles.errorContainer}>
						<Text style={styles.errorText}>{error}</Text>
					</View>
				) : null}

				{success ? (
					<View style={styles.successContainer}>
						<Text style={styles.successText}>
							Password changed successfully
						</Text>
					</View>
				) : null}

				<View style={styles.form}>
					<View style={styles.inputContainer}>
						<Lock
							size={20}
							color={colors.secondaryText}
							style={styles.inputIcon}
						/>
						<TextInput
							style={styles.input}
							placeholder="Current Password"
							placeholderTextColor={colors.secondaryText}
							value={currentPassword}
							onChangeText={setCurrentPassword}
							secureTextEntry={!showPasswords}
							autoCapitalize="none"
						/>
						<Pressable
							onPress={() => setShowPasswords(!showPasswords)}
							style={styles.passwordToggle}>
							{showPasswords ? (
								<EyeOff size={20} color={colors.secondaryText} />
							) : (
								<Eye size={20} color={colors.secondaryText} />
							)}
						</Pressable>
					</View>

					<View style={styles.inputContainer}>
						<Lock
							size={20}
							color={colors.secondaryText}
							style={styles.inputIcon}
						/>
						<TextInput
							style={styles.input}
							placeholder="New Password"
							placeholderTextColor={colors.secondaryText}
							value={newPassword}
							onChangeText={setNewPassword}
							secureTextEntry={!showPasswords}
							autoCapitalize="none"
						/>
					</View>

					<View style={styles.inputContainer}>
						<Lock
							size={20}
							color={colors.secondaryText}
							style={styles.inputIcon}
						/>
						<TextInput
							style={styles.input}
							placeholder="Confirm New Password"
							placeholderTextColor={colors.secondaryText}
							value={confirmPassword}
							onChangeText={setConfirmPassword}
							secureTextEntry={!showPasswords}
							autoCapitalize="none"
						/>
					</View>

					<Button label="Change Password" onPress={handleChangePassword} style={{ marginTop: 8 }} />
				</View>

				<View style={styles.passwordTips}>
					<Text style={styles.tipsTitle}>Password tips:</Text>
					<Text style={styles.tipItem}>• Use at least 8 characters</Text>
					<Text style={styles.tipItem}>
						• Include uppercase and lowercase letters
					</Text>
					<Text style={styles.tipItem}>
						• Include numbers and special characters
					</Text>
					<Text style={styles.tipItem}>
						• Don't reuse passwords from other sites
					</Text>
				</View>
			</View>
		</View>
	)
}

