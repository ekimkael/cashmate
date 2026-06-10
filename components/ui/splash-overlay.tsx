import React, { useCallback, useEffect, useRef, useState } from "react"
import { StyleSheet, View } from "react-native"
import Animated, {
	Easing,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSpring,
	withTiming,
} from "react-native-reanimated"
import { SvgXml } from "react-native-svg"

import { useAppStore } from '@/store/app-store'

const BRAND_GREEN = "#00D632"
const MIN_DURATION = 2500

const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
  <rect x="7" y="7" width="24" height="24" rx="5" fill="#FFFFFF" opacity="0.3"/>
  <rect x="13" y="13" width="24" height="24" rx="5" fill="#FFFFFF"/>
</svg>`

export function SplashOverlay() {
	const isAppReady = useAppStore((s) => s.isAppReady)
	const [visible, setVisible] = useState(true)
	const startTimeRef = useRef(Date.now())

	// Entry values
	const markScale = useSharedValue(0.6)
	const markOpacity = useSharedValue(0)
	const textScaleX = useSharedValue(0)
	const textOpacity = useSharedValue(0)

	// Exit values
	const bgOpacity = useSharedValue(1)
	const logoY = useSharedValue(0)
	const logoOpacity = useSharedValue(1)

	// Entry animation on mount
	useEffect(() => {
		markOpacity.value = withTiming(1, { duration: 350 })
		markScale.value = withSpring(1, { damping: 14, stiffness: 90 })

		textOpacity.value = withDelay(320, withTiming(1, { duration: 280 }))
		textScaleX.value = withDelay(320, withSpring(1, { damping: 18, stiffness: 120 }))
	}, [])

	const playExit = useCallback(() => {
		bgOpacity.value = withTiming(0, {
			duration: 650,
			easing: Easing.out(Easing.cubic),
		})
		logoY.value = withTiming(-48, {
			duration: 550,
			easing: Easing.out(Easing.cubic),
		})
		logoOpacity.value = withTiming(
			0,
			{ duration: 450, easing: Easing.out(Easing.cubic) },
			(finished) => {
				if (finished) runOnJS(setVisible)(false)
			},
		)
	}, [bgOpacity, logoOpacity, logoY])

	useEffect(() => {
		if (!isAppReady) return
		const elapsed = Date.now() - startTimeRef.current
		const remaining = Math.max(0, MIN_DURATION - elapsed)
		const t = setTimeout(playExit, remaining)
		return () => clearTimeout(t)
	}, [isAppReady, playExit])

	const bgStyle = useAnimatedStyle(() => ({ opacity: bgOpacity.value }))
	const logoGroupStyle = useAnimatedStyle(() => ({
		opacity: logoOpacity.value,
		transform: [{ translateY: logoY.value }],
	}))
	const markStyle = useAnimatedStyle(() => ({
		opacity: markOpacity.value,
		transform: [{ scale: markScale.value }],
	}))
	const textStyle = useAnimatedStyle(() => ({
		opacity: textOpacity.value,
		transform: [{ scaleX: textScaleX.value }],
	}))

	if (!visible) return null

	return (
		<View style={StyleSheet.absoluteFill} pointerEvents="none">
			<Animated.View style={[StyleSheet.absoluteFill, styles.bg, bgStyle]} />
			<Animated.View style={[styles.centered, logoGroupStyle]}>
				<View style={styles.logoRow}>
					<Animated.View style={markStyle}>
						<SvgXml xml={markSvg} width={56} height={56} />
					</Animated.View>
					<Animated.View style={[styles.textWrap, textStyle]}>
						<Animated.Text style={styles.logoText}>cashmate</Animated.Text>
					</Animated.View>
				</View>
			</Animated.View>
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
	textWrap: {
		overflow: "hidden",
	},
	logoText: {
		color: "#FFFFFF",
		fontSize: 30,
		fontWeight: "400",
		letterSpacing: -0.5,
		fontFamily: "System",
	},
})
