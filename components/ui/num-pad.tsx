import React from "react"
import { Delete } from "lucide-react-native"
import { View, Text, StyleSheet, Pressable } from "react-native"

import Colors, { useThemeColors } from "@/constants/colors"

interface NumPadProps {
	onDonePress?: () => void
	onDeletePress: () => void
	onNumberPress: (number: string) => void
}

export default function NumPad(props: NumPadProps) {
  const C = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		width: "100%",
  		padding: 16,
  	},
  	grid: {
  		flexDirection: "row",
  		flexWrap: "wrap",
  		justifyContent: "space-between",
  	},
  	button: {
  		width: "33%",
  		height: 70,
  		alignItems: "center",
  		justifyContent: "center",
  		marginBottom: 16,
  	},
  	buttonPressed: {
  		opacity: 0.7,
  	},
  	buttonText: {
  		color: C.text,
  		fontSize: 28,
  		fontWeight: "500",
  	},
  	doneButton: {
  		backgroundColor: C.primary,
  		borderRadius: 12,
  		padding: 16,
  		alignItems: "center",
  		justifyContent: "center",
  		marginTop: 8,
  	},
  	doneButtonPressed: {
  		opacity: 0.8,
  	},
  	doneButtonText: {
  		color: C.background,
  		fontSize: 18,
  		fontWeight: "600",
  	},
  })
	const { onNumberPress, onDeletePress, onDonePress } = props

	const buttons = [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		".",
		"0",
		"delete",
	]

	return (
		<View style={styles.container}>
			<View style={styles.grid}>
				{buttons.map((button, index) => (
					<Pressable
						key={button}
						style={({ pressed }) => [
							styles.button,
							pressed && styles.buttonPressed,
						]}
						onPress={() => {
							if (button === "delete") {
								onDeletePress()
							} else {
								onNumberPress(button)
							}
						}}>
						{button === "delete" ? (
							<Delete size={24} color={C.text} />
						) : (
							<Text style={styles.buttonText}>{button}</Text>
						)}
					</Pressable>
				))}
			</View>
			{onDonePress && (
				<Pressable
					style={({ pressed }) => [
						styles.doneButton,
						pressed && styles.doneButtonPressed,
					]}
					onPress={onDonePress}>
					<Text style={styles.doneButtonText}>Done</Text>
				</Pressable>
			)}
		</View>
	)
}

