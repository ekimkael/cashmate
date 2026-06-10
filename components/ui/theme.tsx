import { type ReactNode, useEffect } from "react"
import { ThemeProvider, DarkTheme, DefaultTheme } from "expo-router"
import { Appearance } from "react-native"
import { useThemeStore } from '@/store/theme-store'

const AppDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#00D632",
    background: "#121212",
    card: "#1E1E1E",
    text: "#FFFFFF",
    border: "#2A2A2A",
    notification: "#00D632",
  },
}

const AppLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#00B82A",
    background: "#F2F2F7",
    card: "#FFFFFF",
    text: "#0A0A0A",
    border: "#E0E0E0",
    notification: "#00B82A",
  },
}

export function Theme({ children }: { children: ReactNode }) {
  const isDark = useThemeStore((s) => s.isDark)

  // Synchronous call in render so PlatformColor tokens resolve correctly
  // for the current render pass (useEffect would be too late).
  Appearance.setColorScheme(isDark ? "dark" : "light")

  return (
    <ThemeProvider value={isDark ? AppDarkTheme : AppLightTheme}>
      {children}
    </ThemeProvider>
  )
}
