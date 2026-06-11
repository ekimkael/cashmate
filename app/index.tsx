import { useEffect, useState } from "react"
import { Redirect, Stack } from "expo-router"

import { useUserStore } from '@/store/user-store'
import { useAppStore } from '@/store/app-store'

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
		return <Redirect href="/(tabs)/(home)" />
	}
	return <Redirect href="/auth/login" />
}
