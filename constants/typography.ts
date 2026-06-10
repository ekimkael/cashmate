import { useThemeColors } from "./colors"

// Returns the iOS Dynamic Type scale with colors driven by the app theme store.
// Use `const t = useTypography()` in every component that renders text.
export function useTypography() {
  const colors = useThemeColors()
  const label          = colors.text
  const secondaryLabel = colors.secondaryText
  const tertiaryLabel  = colors.secondaryText + "99" // ~60% opacity approximation

  return {
    largeTitle:    { fontSize: 34, fontWeight: "700" as const, color: label },
    title1:        { fontSize: 28, fontWeight: "700" as const, color: label },
    title2:        { fontSize: 22, fontWeight: "600" as const, color: label },
    title3:        { fontSize: 20, fontWeight: "600" as const, color: label },
    headline:      { fontSize: 17, fontWeight: "600" as const, color: label },
    body:          { fontSize: 17, fontWeight: "400" as const, color: label },
    callout:       { fontSize: 16, fontWeight: "400" as const, color: label },
    subhead:       { fontSize: 15, fontWeight: "400" as const, color: secondaryLabel },
    footnote:      { fontSize: 13, fontWeight: "400" as const, color: secondaryLabel },
    caption1:      { fontSize: 12, fontWeight: "400" as const, color: secondaryLabel },
    caption2:      { fontSize: 11, fontWeight: "400" as const, color: tertiaryLabel },
    headlineLight: { fontSize: 17, fontWeight: "400" as const, color: label },
    calloutMedium: { fontSize: 16, fontWeight: "500" as const, color: label },
    subheadMedium: { fontSize: 15, fontWeight: "500" as const, color: secondaryLabel },
    numericLarge:  { fontSize: 34, fontWeight: "700" as const, color: label,          fontVariant: ["tabular-nums"] as const },
    numericBody:   { fontSize: 17, fontWeight: "600" as const, color: label,          fontVariant: ["tabular-nums"] as const },
    numericSmall:  { fontSize: 14, fontWeight: "500" as const, color: secondaryLabel, fontVariant: ["tabular-nums"] as const },
  }
}
