import { useEffect } from "react"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import * as SplashScreen from "expo-splash-screen"
import FontAwesome from "@expo/vector-icons/FontAwesome"

import { useThemeColors } from "@/constants/colors"
import { useThemeStore } from "@/store/themeStore"
import { Theme } from "@/components/ui/theme"
import { SplashOverlay } from "@/components/ui/splash-overlay"
import { ErrorBoundary } from "./error-boundary"

export const unstable_settings = { initialRouteName: "(tabs)" }

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded, error] = useFonts({
		...FontAwesome.font,
	})

	useEffect(() => {
		if (error) {
			console.error(error)
			throw error
		}
	}, [error])

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return (
		<ErrorBoundary>
			<Theme>
				<RootLayoutNav />
				<SplashOverlay />
			</Theme>
		</ErrorBoundary>
	)
}

function RootLayoutNav() {
	const C = useThemeColors()
	const isDark = useThemeStore((s) => s.isDark)

	return (
		<>
			<StatusBar style={isDark ? "light" : "dark"} />
			<Stack
				screenOptions={{
					headerShadowVisible: false,
					headerTintColor: C.text,
					headerBackButtonDisplayMode: "minimal",
					headerStyle: { backgroundColor: C.background },
					contentStyle: { backgroundColor: C.background },
				}}>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="send" />
				<Stack.Screen name="send/amount" options={{ headerShown: false }} />
				<Stack.Screen name="send/success" options={{ headerShown: false }} />
				<Stack.Screen name="request" />
				<Stack.Screen name="request/amount" options={{ headerShown: false }} />
				<Stack.Screen name="request/success" options={{ headerShown: false }} />
				<Stack.Screen name="deposit" />
				<Stack.Screen name="deposit/success" options={{ headerShown: false }} />
				<Stack.Screen name="card-details" />
				<Stack.Screen name="card" />
				<Stack.Screen name="scan" />
				<Stack.Screen name="qrcode" options={{ presentation: "modal" }} />
				<Stack.Screen name="notifications" />
				<Stack.Screen name="privacy" />
				<Stack.Screen name="help" />
				<Stack.Screen name="settings" />
				<Stack.Screen
					name="transaction/[id]"
					options={{
						presentation: process.env.EXPO_OS === "ios" ? "formSheet" : "modal",
						sheetAllowedDetents: process.env.EXPO_OS === "ios" ? [0.64, 1] : undefined,
					}}
				/>
				<Stack.Screen name="auth" options={{ headerShown: false }} />
				<Stack.Screen name="editprofile" />
				<Stack.Screen name="change-password" />
				<Stack.Screen name="terms" />
				<Stack.Screen name="privacy-policy" />
			</Stack>
		</>
	)
}
