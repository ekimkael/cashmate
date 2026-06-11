import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import Animated, {
	FadeIn,
	FadeOut,
	FadeOutUp,
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
	const [showContent, setShowContent] = useState(true)
	const [showText, setShowText] = useState(false)
	const startTimeRef = useRef(Date.now())

	useEffect(() => {
		const t = setTimeout(() => setShowText(true), 320)
		return () => clearTimeout(t)
	}, [])

	useEffect(() => {
		if (!isAppReady) return
		const elapsed = Date.now() - startTimeRef.current
		const remaining = Math.max(0, MIN_DURATION - elapsed)

		const exitTimer = setTimeout(() => {
			setShowContent(false)
			setTimeout(() => setVisible(false), 750)
		}, remaining)

		return () => clearTimeout(exitTimer)
	}, [isAppReady])

	if (!visible) return null

	return (
		<View style={StyleSheet.absoluteFill} pointerEvents="none">
			{showContent && (
				<Animated.View
					style={[StyleSheet.absoluteFill, styles.bg]}
					exiting={FadeOut.duration(650)}
				/>
			)}
			{showContent && (
				<Animated.View
					style={styles.centered}
					entering={FadeIn.duration(150)}
					exiting={FadeOutUp.duration(500)}
				>
					<View style={styles.logoRow}>
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
					</View>
				</Animated.View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	bg: {
		backgroundColor: BRAND_GREEN,
	},
	centered: {
		...StyleSheet.absoluteFillObject,
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
