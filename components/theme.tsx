import { type ReactNode } from "react"
import { ThemeProvider, DarkTheme } from "expo-router"
import { PlatformColor } from "react-native"

export const AppTheme = {
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

export function Theme({ children }: { children: ReactNode }) {
  return <ThemeProvider value={AppTheme}>{children}</ThemeProvider>
}
