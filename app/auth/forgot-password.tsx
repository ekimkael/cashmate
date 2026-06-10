import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Pressable,
	Platform,
	KeyboardAvoidingView,
} from "react-native"
import React, { useState } from "react"
import { Stack, useRouter } from "expo-router"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react-native"

import Colors, { useThemeColors } from "@/constants/colors"
import Button from "@/components/ui/button"

export default function ForgotPasswordScreen() {
  const C = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: C.background,
  	},
  	keyboardAvoidingView: {
  		flex: 1,
  	},
  	content: {
  		flex: 1,
  		padding: 20,
  		justifyContent: "center",
  	},
  	header: {
  		marginBottom: 32,
  	},
  	title: {
  		color: C.text,
  		fontSize: 32,
  		fontWeight: "700",
  		marginBottom: 8,
  	},
  	subtitle: {
  		color: C.secondaryText,
  		fontSize: 16,
  		lineHeight: 22,
  	},
  	errorContainer: {
  		backgroundColor: "rgba(255, 67, 42, 0.1)",
  		borderRadius: 8,
  		padding: 12,
  		marginBottom: 20,
  	},
  	errorText: {
  		color: C.error,
  		fontSize: 14,
  	},
  	form: {
  		marginBottom: 32,
  	},
  	inputContainer: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: C.inputBackground,
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
  		color: C.text,
  		fontSize: 16,
  	},
  	successContent: {
  		flex: 1,
  		padding: 20,
  		justifyContent: "center",
  		alignItems: "center",
  	},
  	successTitle: {
  		color: C.text,
  		fontSize: 24,
  		fontWeight: "700",
  		marginTop: 24,
  		marginBottom: 12,
  	},
  	successMessage: {
  		color: C.secondaryText,
  		fontSize: 16,
  		textAlign: "center",
  		marginBottom: 32,
  		paddingHorizontal: 20,
  	},
  })
	const router = useRouter()
	const [email, setEmail] = useState("")
	const [submitted, setSubmitted] = useState(false)
	const [error, setError] = useState("")

	const handleSubmit = () => {
		if (!email) {
			setError("Please enter your email address")
			return
		}

		// In a real app, we would send a password reset email
		// For demo purposes, we'll just show a success message
		setSubmitted(true)
	}

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: "Forgot Password",
					headerLeft: () => (
						<Pressable onPress={() => router.back()}>
							<ArrowLeft size={24} color={C.text} />
						</Pressable>
					),
					headerStyle: {
						backgroundColor: C.background,
					},
					headerTintColor: C.text,
				}}
			/>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.keyboardAvoidingView}>
				{!submitted ? (
					<View style={styles.content}>
						<View style={styles.header}>
							<Text style={styles.title}>Reset Password</Text>
							<Text style={styles.subtitle}>
								Enter your email address and we'll send you instructions to
								reset your password
							</Text>
						</View>

						{error ? (
							<View style={styles.errorContainer}>
								<Text style={styles.errorText}>{error}</Text>
							</View>
						) : null}

						<View style={styles.form}>
							<View style={styles.inputContainer}>
								<Mail
									size={20}
									color={C.secondaryText}
									style={styles.inputIcon}
								/>
								<TextInput
									style={styles.input}
									placeholder="Email"
									placeholderTextColor={C.secondaryText}
									value={email}
									onChangeText={setEmail}
									autoCapitalize="none"
									keyboardType="email-address"
								/>
							</View>

							<Button label="Send Reset Link" onPress={handleSubmit} />
						</View>
					</View>
				) : (
					<View style={styles.successContent}>
						<CheckCircle size={80} color={C.primary} />
						<Text style={styles.successTitle}>Check Your Email</Text>
						<Text style={styles.successMessage}>
							We've sent password reset instructions to {email}
						</Text>
						<Button label="Back to Login" onPress={() => router.push("/auth/login")} />
					</View>
				)}
			</KeyboardAvoidingView>
		</View>
	)
}

