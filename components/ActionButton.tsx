import React from "react"
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { LucideIcon } from "lucide-react-native"
import Colors from "@/constants/colors"

interface ActionButtonProps {
	icon: LucideIcon
	label: string
	onPress: () => void
	style?: ViewStyle
	textStyle?: TextStyle
	variant?: "primary" | "secondary"
}

export default function ActionButton({
	icon: Icon,
	label,
	onPress,
	style,
	textStyle,
	variant = "primary",
}: ActionButtonProps) {
	return (
		<Pressable
			style={({ pressed }) => [
				styles.button,
				variant === "primary" ? styles.primaryButton : styles.secondaryButton,
				pressed && styles.pressed,
				style,
			]}
			onPress={onPress}>
			<Icon
				size={24}
				color={
					variant === "primary" ? Colors.dark.background : Colors.dark.primary
				}
			/>
			<Text
				style={[
					styles.label,
					variant === "primary" ? styles.primaryLabel : styles.secondaryLabel,
					textStyle,
				]}>
				{label}
			</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 12,
		padding: 16,
		alignItems: "center",
		justifyContent: "center",
		minWidth: 80,
	},
	primaryButton: {
		backgroundColor: Colors.dark.primary,
	},
	secondaryButton: {
		backgroundColor: Colors.dark.card,
		borderWidth: 1,
		borderColor: Colors.dark.border,
	},
	pressed: {
		opacity: 0.8,
	},
	label: {
		marginTop: 8,
		fontSize: 14,
		fontWeight: "500",
	},
	primaryLabel: {
		color: Colors.dark.background,
	},
	secondaryLabel: {
		color: Colors.dark.text,
	},
})
