import { PlatformColor } from "react-native"

const palette = {
  dark: {
    background: "#121212",
    card: "#1E1E1E",
    text: "#FFFFFF",
    secondaryText: "#AAAAAA",
    primary: "#00D632",
    secondary: "#8A8D93",
    border: "#2A2A2A",
    success: "#00D632",
    error: "#FF432A",
    inputBackground: "#2A2A2A",
  },
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
