import React, { useEffect, useRef, useState } from "react"
import { Modal, StyleSheet, Text, View } from "react-native"
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	ZoomIn,
} from "react-native-reanimated"
import { SvgXml } from "react-native-svg"

import { useAppStore } from "@/store/app-store"

const BRAND_GREEN = "#00D632"
const MIN_DURATION = 2500

const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
  <rect x="7" y="7" width="24" height="24" rx="5" fill="#FFFFFF" opacity="0.3"/>
  <rect x="13" y="13" width="24" height="24" rx="5" fill="#FFFFFF"/>
</svg>`

export function SplashOverlay() {
	const isAppReady = useAppStore((s) => s.isAppReady)
	const [visible, setVisible] = useState(true)
	const [showText, setShowText] = useState(false)
	const startTimeRef = useRef(Date.now())

	const bgOpacity = useSharedValue(1)
	const logoScale = useSharedValue(1)
	const logoOpacity = useSharedValue(1)

	useEffect(() => {
		const t = setTimeout(() => setShowText(true), 320)
		return () => clearTimeout(t)
	}, [])

	useEffect(() => {
		if (!isAppReady) return
		const elapsed = Date.now() - startTimeRef.current
		const remaining = Math.max(0, MIN_DURATION - elapsed)

		const exitTimer = setTimeout(() => {
			bgOpacity.value = withTiming(0, { duration: 400 })
			logoScale.value = withTiming(1.8, { duration: 400 })
			logoOpacity.value = withTiming(0, { duration: 400 })
			setTimeout(() => setVisible(false), 450)
		}, remaining)

		return () => clearTimeout(exitTimer)
	}, [isAppReady])

	const bgStyle = useAnimatedStyle(() => ({ opacity: bgOpacity.value }))
	const logoStyle = useAnimatedStyle(() => ({
		transform: [{ scale: logoScale.value }],
		opacity: logoOpacity.value,
	}))

	return (
		<Modal visible={visible} transparent statusBarTranslucent animationType="none">
			<View style={styles.container} pointerEvents="none">
				<Animated.View style={[StyleSheet.absoluteFill, styles.bg, bgStyle]} />
				<View style={styles.centered}>
					<Animated.View style={[styles.logoRow, logoStyle]}>
						<Animated.View
							entering={ZoomIn.springify()
								.damping(14)
								.stiffness(90)
								.duration(500)}
						>
							<SvgXml xml={markSvg} width={56} height={56} />
						</Animated.View>
						{showText && (
							<Text style={styles.logoText}>cashmate</Text>
						)}
						</Animated.View>
					</View>
				</View>
			</Modal>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bg: {
		backgroundColor: BRAND_GREEN,
	},
	centered: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	logoRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	logoText: {
		color: "#FFFFFF",
		fontSize: 30,
		fontWeight: "400",
		letterSpacing: -0.5,
	},
})
