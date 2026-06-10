import { PlatformColor } from "react-native"
import { useThemeStore } from '@/store/theme-store'

const palette = {
  dark: {
    background: "#121212",
    card: "#1E1E1E",
    text: "#FFFFFF",
    secondaryText: "#AAAAAA",
    primary: "#00D632",
    primaryMuted: "rgba(0, 214, 50, 0.12)",
    secondary: "#8A8D93",
    border: "#2A2A2A",
    success: "#00D632",
    error: "#FF432A",
    inputBackground: "#2A2A2A",
  },
  light: {
    background: "#F2F2F7",
    card: "#FFFFFF",
    text: "#0A0A0A",
    secondaryText: "#6B6B6B",
    primary: "#00B82A",
    primaryMuted: "rgba(0, 184, 42, 0.12)",
    secondary: "#8A8D93",
    border: "#E0E0E0",
    success: "#00B82A",
    error: "#FF432A",
    inputBackground: "#EBEBF0",
  },
}

export function useThemeColors() {
  const isDark = useThemeStore((s) => s.isDark)
  return isDark ? palette.dark : palette.light
}

// Adaptive iOS semantic colors — auto-switch between light and dark mode
export const semantic = {
  label: PlatformColor("label"),
  secondaryLabel: PlatformColor("secondaryLabel"),
  tertiaryLabel: PlatformColor("tertiaryLabel"),
  systemBackground: PlatformColor("systemBackground"),
  secondarySystemBackground: PlatformColor("secondarySystemBackground"),
  tertiarySystemBackground: PlatformColor("tertiarySystemBackground"),
  systemFill: PlatformColor("systemFill"),
  separator: PlatformColor("separator"),
  opaqueSeparator: PlatformColor("opaqueSeparator"),
}

export default palette
