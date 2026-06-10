import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Pressable,
	Platform,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native"
import React, { useState } from "react"
import { Stack, useRouter } from "expo-router"
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from "lucide-react-native"

import { useThemeColors } from "@/constants/colors"
import Button from "@/components/ui/button"
import { useUserStore } from '@/store/user-store'

export default function RegisterScreen() {
  const colors = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: colors.background,
  	},
  	keyboardAvoidingView: {
  		flex: 1,
  	},
  	scrollContent: {
  		flexGrow: 1,
  		padding: 20,
  	},
  	header: {
  		marginBottom: 32,
  	},
  	title: {
  		color: colors.text,
  		fontSize: 32,
  		fontWeight: "700",
  		marginBottom: 8,
  	},
  	subtitle: {
  		color: colors.secondaryText,
  		fontSize: 16,
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
  	atSymbol: {
  		color: colors.secondaryText,
  		fontSize: 18,
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
  	footer: {
  		flexDirection: "row",
  		justifyContent: "center",
  		alignItems: "center",
  	},
  	footerText: {
  		color: colors.secondaryText,
  		fontSize: 14,
  		marginRight: 4,
  	},
  	signInText: {
  		color: colors.primary,
  		fontSize: 14,
  		fontWeight: "600",
  	},
  })
	const router = useRouter()
	const { setUser } = useUserStore()

	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState("")

	const handleRegister = () => {
		if (!name || !email || !username || !password || !confirmPassword) {
			setError("Please fill in all fields")
			return
		}

		if (password !== confirmPassword) {
			setError("Passwords do not match")
			return
		}

		// In a real app, we would send registration data to a backend
		// For demo purposes, we'll create a new user locally
		const newUser = {
			id: crypto.randomUUID(),
			name,
			username,
			email,
			balance: 0,
		}

		setUser(newUser)
		router.replace("/")
	}

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: "Create Account",
					headerLeft: () => (
						<Pressable onPress={() => router.back()}>
							<ArrowLeft size={24} color={colors.text} />
						</Pressable>
					),
					headerStyle: {
						backgroundColor: colors.background,
					},
					headerTintColor: colors.text,
				}}
			/>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.keyboardAvoidingView}>
				<ScrollView contentContainerStyle={styles.scrollContent}>
					<View style={styles.header}>
						<Text style={styles.title}>Create Account</Text>
						<Text style={styles.subtitle}>Sign up to start using Cash App</Text>
					</View>

					{error ? (
						<View style={styles.errorContainer}>
							<Text style={styles.errorText}>{error}</Text>
						</View>
					) : null}

					<View style={styles.form}>
						<View style={styles.inputContainer}>
							<User
								size={20}
								color={colors.secondaryText}
								style={styles.inputIcon}
							/>
							<TextInput
								style={styles.input}
								placeholder="Full Name"
								placeholderTextColor={colors.secondaryText}
								value={name}
								onChangeText={setName}
							/>
						</View>

						<View style={styles.inputContainer}>
							<Mail
								size={20}
								color={colors.secondaryText}
								style={styles.inputIcon}
							/>
							<TextInput
								style={styles.input}
								placeholder="Email"
								placeholderTextColor={colors.secondaryText}
								value={email}
								onChangeText={setEmail}
								autoCapitalize="none"
								keyboardType="email-address"
							/>
						</View>

						<View style={styles.inputContainer}>
							<Text style={styles.atSymbol}>@</Text>
							<TextInput
								style={styles.input}
								placeholder="Username"
								placeholderTextColor={colors.secondaryText}
								value={username}
								onChangeText={setUsername}
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
								placeholder="Password"
								placeholderTextColor={colors.secondaryText}
								value={password}
								onChangeText={setPassword}
								secureTextEntry={!showPassword}
								autoCapitalize="none"
							/>
							<Pressable
								onPress={() => setShowPassword(!showPassword)}
								style={styles.passwordToggle}>
								{showPassword ? (
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
								placeholder="Confirm Password"
								placeholderTextColor={colors.secondaryText}
								value={confirmPassword}
								onChangeText={setConfirmPassword}
								secureTextEntry={!showPassword}
								autoCapitalize="none"
							/>
						</View>

						<Button label="Create Account" onPress={handleRegister} style={{ marginTop: 8 }} />
					</View>

					<View style={styles.footer}>
						<Text style={styles.footerText}>Already have an account?</Text>
						<Pressable onPress={() => router.push("/auth/login")}>
							<Text style={styles.signInText}>Sign In</Text>
						</Pressable>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	)
}

