import React from "react"
import { StyleSheet, View, ViewProps } from "react-native"

interface Props extends ViewProps {
	gap?: number
	children: React.ReactNode
	align?: "flex-start" | "center" | "flex-end" | "stretch"
	justify?:
		| "flex-start"
		| "center"
		| "flex-end"
		| "space-between"
		| "space-around"
		| "space-evenly"
}

/**
 * A component that aligns its children horizontally (in a row).
 *
 * @param {number} [props.gap] - The gap between child elements in the row.
 * @param {React.ReactNode} props.children - The child elements to be displayed in the HStack.
 * @param {"flex-start" | "center" | "flex-end" | "stretch"} [props.align="center"] - The vertical alignment of the children.
 * @param {"flex-start" | "center" | "flex-end" | "space-between" | "space-around"} [props.justify="flex-start"] - The horizontal alignment of the children.
 * @param {ViewStyle} [props.style] - Additional styles to apply to the component.
 *
 * @returns {JSX.Element} - The HStack component with its children aligned horizontally.
 */
const HStack = (props: Props): JSX.Element => {
	const {
		gap,
		children,
		justify = "flex-start",
		align = "center",
		style,
	} = props

	const styles = StyleSheet.compose(
		{ flexDirection: "row", justifyContent: justify, alignItems: align, gap },
		style
	)

	return <View style={styles}>{children}</View>
}

export default HStack
