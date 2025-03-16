import React, { useState } from "react"
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Pressable,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native"
import { useUserStore } from "@/store/userStore"
import { currentUser } from "@/mocks/data"
import Colors from "@/constants/colors"

export default function LoginScreen() {
	const router = useRouter()
	const { setUser } = useUserStore()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState("")

	const handleLogin = () => {
		if (!email || !password) {
			setError("Please enter both email and password")
			return
		}

		// In a real app, we would validate credentials against a backend
		// For demo purposes, we'll just check if the email matches our mock user
		if (email.toLowerCase() === currentUser.email.toLowerCase()) {
			setUser(currentUser)
			router.replace("/")
		} else {
			setError("Invalid email or password")
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<Stack.Screen
				options={{
					title: "Login",
					headerShown: false,
				}}
			/>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.keyboardAvoidingView}>
				<ScrollView contentContainerStyle={styles.scrollContent}>
					<View style={styles.header}>
						<Text style={styles.title}>Welcome Back</Text>
						<Text style={styles.subtitle}>
							Sign in to your Cash App account
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
								color={Colors.dark.secondaryText}
								style={styles.inputIcon}
							/>
							<TextInput
								style={styles.input}
								placeholder="Email"
								placeholderTextColor={Colors.dark.secondaryText}
								value={email}
								onChangeText={setEmail}
								autoCapitalize="none"
								keyboardType="email-address"
							/>
						</View>

						<View style={styles.inputContainer}>
							<Lock
								size={20}
								color={Colors.dark.secondaryText}
								style={styles.inputIcon}
							/>
							<TextInput
								style={styles.input}
								placeholder="Password"
								placeholderTextColor={Colors.dark.secondaryText}
								value={password}
								onChangeText={setPassword}
								secureTextEntry={!showPassword}
								autoCapitalize="none"
							/>
							<Pressable
								onPress={() => setShowPassword(!showPassword)}
								style={styles.passwordToggle}>
								{showPassword ? (
									<EyeOff size={20} color={Colors.dark.secondaryText} />
								) : (
									<Eye size={20} color={Colors.dark.secondaryText} />
								)}
							</Pressable>
						</View>

						<Pressable
							style={styles.forgotPassword}
							onPress={() => router.push("/auth/forgot-password")}>
							<Text style={styles.forgotPasswordText}>Forgot Password?</Text>
						</Pressable>

						<Pressable style={styles.loginButton} onPress={handleLogin}>
							<Text style={styles.loginButtonText}>Sign In</Text>
						</Pressable>
					</View>

					<View style={styles.footer}>
						<Text style={styles.footerText}>Don't have an account?</Text>
						<Pressable onPress={() => router.push("/auth/register")}>
							<Text style={styles.signUpText}>Sign Up</Text>
						</Pressable>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.dark.background,
	},
	keyboardAvoidingView: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
		padding: 20,
		justifyContent: "center",
	},
	header: {
		marginBottom: 40,
	},
	title: {
		color: Colors.dark.text,
		fontSize: 32,
		fontWeight: "700",
		marginBottom: 8,
	},
	subtitle: {
		color: Colors.dark.secondaryText,
		fontSize: 16,
	},
	errorContainer: {
		backgroundColor: "rgba(255, 67, 42, 0.1)",
		borderRadius: 8,
		padding: 12,
		marginBottom: 20,
	},
	errorText: {
		color: Colors.dark.error,
		fontSize: 14,
	},
	form: {
		marginBottom: 40,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.dark.inputBackground,
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
		color: Colors.dark.text,
		fontSize: 16,
	},
	passwordToggle: {
		padding: 8,
	},
	forgotPassword: {
		alignSelf: "flex-end",
		marginBottom: 24,
	},
	forgotPasswordText: {
		color: Colors.dark.primary,
		fontSize: 14,
		fontWeight: "500",
	},
	loginButton: {
		backgroundColor: Colors.dark.primary,
		borderRadius: 12,
		height: 56,
		alignItems: "center",
		justifyContent: "center",
	},
	loginButtonText: {
		color: Colors.dark.background,
		fontSize: 16,
		fontWeight: "600",
	},
	footer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	footerText: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
		marginRight: 4,
	},
	signUpText: {
		color: Colors.dark.primary,
		fontSize: 14,
		fontWeight: "600",
	},
})
