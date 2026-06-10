import { useEffect, useState } from "react"
import { Redirect, Stack } from "expo-router"

import { useUserStore } from "@/store/userStore"
import { useAppStore } from "@/store/appStore"

export default function IndexScreen() {
	const { user } = useUserStore()
	const setAppReady = useAppStore((s) => s.setAppReady)
	const [authChecked, setAuthChecked] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setAuthChecked(true)
			setAppReady()
		}, 1000)
		return () => clearTimeout(timer)
	}, [setAppReady])

	if (!authChecked) {
		return <Stack.Screen options={{ headerShown: false }} />
	}

	if (user) {
		return <Redirect href="/(tabs)" />
	}
	return <Redirect href="/auth/login" />
}
