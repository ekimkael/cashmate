import { useEffect } from "react"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import { Platform } from "react-native"
import { StatusBar } from "expo-status-bar"
import * as SplashScreen from "expo-splash-screen"
import FontAwesome from "@expo/vector-icons/FontAwesome"

import Colors from "@/constants/colors"
import { ErrorBoundary } from "./error-boundary"

export const unstable_settings = { initialRouteName: "(tabs)" }

// Prevent the splash screen from auto-hiding before asset loading is complete.
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
			<StatusBar style="light" />
			<RootLayoutNav />
		</ErrorBoundary>
	)
}

function RootLayoutNav() {
	return (
		<Stack
			screenOptions={{
				headerShadowVisible: false,
				headerTintColor: Colors.dark.text,
				headerBackButtonDisplayMode: "minimal",
				headerStyle: { backgroundColor: Colors.dark.background },
				contentStyle: { backgroundColor: Colors.dark.background },
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
					presentation: Platform.OS === "ios" ? "formSheet" : "modal",
					sheetAllowedDetents: Platform.OS === "ios" ? [0.64, 1] : undefined,
				}}
			/>
			<Stack.Screen name="auth" options={{ headerShown: false }} />
			<Stack.Screen name="editprofile" />
			<Stack.Screen name="change-password" />
			<Stack.Screen name="terms" />
			<Stack.Screen name="privacy-policy" />
		</Stack>
	)
}
