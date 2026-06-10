import React, { useState } from "react"
import { Stack, useRouter } from "expo-router"
import { Lock, Eye, EyeOff } from "lucide-react-native"
import { View, Text, StyleSheet, Pressable, Alert } from "react-native"

import NumPad from "@/components/ui/num-pad"
import { useThemeColors } from "@/constants/colors"

export default function CardPinScreen() {
  const colors = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: colors.background,
  	},
  	content: {
  		flex: 1,
  		alignItems: "center",
  		justifyContent: "center",
  		paddingHorizontal: 20,
  	},
  	lockIconContainer: {
  		width: 64,
  		height: 64,
  		borderRadius: 32,
  		backgroundColor: "rgba(0, 214, 50, 0.1)",
  		alignItems: "center",
  		justifyContent: "center",
  		marginBottom: 24,
  	},
  	title: {
  		color: colors.text,
  		fontSize: 24,
  		fontWeight: "600",
  		marginBottom: 12,
  		textAlign: "center",
  	},
  	description: {
  		color: colors.secondaryText,
  		fontSize: 16,
  		marginBottom: 32,
  		textAlign: "center",
  	},
  	pinDotsContainer: {
  		flexDirection: "row",
  		justifyContent: "center",
  		marginBottom: 24,
  	},
  	pinDot: {
  		width: 48,
  		height: 48,
  		borderRadius: 24,
  		borderWidth: 1,
  		borderColor: colors.border,
  		marginHorizontal: 8,
  		alignItems: "center",
  		justifyContent: "center",
  	},
  	pinDotFilled: {
  		backgroundColor: colors.card,
  		borderColor: colors.primary,
  	},
  	pinDotText: {
  		color: colors.text,
  		fontSize: 20,
  		fontWeight: "600",
  	},
  	showPinButton: {
  		flexDirection: "row",
  		alignItems: "center",
  		padding: 8,
  	},
  	showPinText: {
  		color: colors.secondaryText,
  		fontSize: 14,
  		marginLeft: 8,
  	},
  	numPad: {
  		marginBottom: 20,
  	},
  })
	const router = useRouter()
	const [currentPin, setCurrentPin] = useState("")
	const [newPin, setNewPin] = useState("")
	const [confirmPin, setConfirmPin] = useState("")
	const [step, setStep] = useState("current") // current, new, confirm
	const [showPin, setShowPin] = useState(false)

	const handlePinInput = (value: string) => {
		if (step === "current") {
			if (currentPin.length < 4) {
				setCurrentPin(currentPin + value)
			}
			if (currentPin.length === 3) {
				// Move to next step after entering current PIN
				setTimeout(() => {
					setStep("new")
				}, 500)
			}
		} else if (step === "new") {
			if (newPin.length < 4) {
				setNewPin(newPin + value)
			}
			if (newPin.length === 3) {
				// Move to confirm step after entering new PIN
				setTimeout(() => {
					setStep("confirm")
				}, 500)
			}
		} else if (step === "confirm") {
			if (confirmPin.length < 4) {
				setConfirmPin(confirmPin + value)
			}
			if (confirmPin.length === 3) {
				// Check if PINs match after entering confirmation
				setTimeout(() => {
					if (newPin === confirmPin + value) {
						// Success - PIN changed
						Alert.alert(
							"PIN Changed",
							"Your PIN has been successfully updated.",
							[{ text: "OK", onPress: () => router.back() }]
						)
					} else {
						// PINs don't match
						Alert.alert(
							"PINs Don't Match",
							"The PINs you entered don't match. Please try again.",
							[
								{
									text: "Try Again",
									onPress: () => {
										setNewPin("")
										setConfirmPin("")
										setStep("new")
									},
								},
							]
						)
					}
				}, 500)
			}
		}
	}

	const handleDelete = () => {
		if (step === "current") {
			setCurrentPin(currentPin.slice(0, -1))
		} else if (step === "new") {
			setNewPin(newPin.slice(0, -1))
		} else if (step === "confirm") {
			setConfirmPin(confirmPin.slice(0, -1))
		}
	}

	const renderPinDots = (pin: string) => {
		return (
			<View style={styles.pinDotsContainer}>
				{[...Array(4)].map((_, index) => (
					<View
						key={index}
						style={[styles.pinDot, index < pin.length && styles.pinDotFilled]}>
						{showPin && index < pin.length && (
							<Text style={styles.pinDotText}>{pin[index]}</Text>
						)}
					</View>
				))}
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Change PIN" }} />

			<View style={styles.content}>
				<View style={styles.lockIconContainer}>
					<Lock size={32} color={colors.primary} />
				</View>

				<Text style={styles.title}>
					{step === "current"
						? "Enter Current PIN"
						: step === "new"
						? "Enter New PIN"
						: "Confirm New PIN"}
				</Text>

				<Text style={styles.description}>
					{step === "current"
						? "Please enter your current 4-digit PIN"
						: step === "new"
						? "Create a new 4-digit PIN for your card"
						: "Re-enter your new PIN to confirm"}
				</Text>

				{renderPinDots(
					step === "current" ? currentPin : step === "new" ? newPin : confirmPin
				)}

				<Pressable
					style={styles.showPinButton}
					onPress={() => setShowPin(!showPin)}>
					{showPin ? (
						<EyeOff size={20} color={colors.secondaryText} />
					) : (
						<Eye size={20} color={colors.secondaryText} />
					)}
					<Text style={styles.showPinText}>
						{showPin ? "Hide PIN" : "Show PIN"}
					</Text>
				</Pressable>
			</View>

			<NumPad
				onDeletePress={handleDelete}
				onNumberPress={handlePinInput}
				// style={styles.numPad}
			/>
		</View>
	)
}

