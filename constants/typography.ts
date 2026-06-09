import { semantic } from "./colors"

// iOS Dynamic Type scale with semantic PlatformColor text colors.
// Using PlatformColor("label") / "secondaryLabel" means these styles
// adapt to dark/light mode and accessibility (increased contrast, bold text)
// without any extra logic in components.

export const type = {
  largeTitle:  { fontSize: 34, fontWeight: "700" as const, color: semantic.label },
  title1:      { fontSize: 28, fontWeight: "700" as const, color: semantic.label },
  title2:      { fontSize: 22, fontWeight: "600" as const, color: semantic.label },
  title3:      { fontSize: 20, fontWeight: "600" as const, color: semantic.label },
  headline:    { fontSize: 17, fontWeight: "600" as const, color: semantic.label },
  body:        { fontSize: 17, fontWeight: "400" as const, color: semantic.label },
  callout:     { fontSize: 16, fontWeight: "400" as const, color: semantic.label },
  subhead:     { fontSize: 15, fontWeight: "400" as const, color: semantic.secondaryLabel },
  footnote:    { fontSize: 13, fontWeight: "400" as const, color: semantic.secondaryLabel },
  caption1:    { fontSize: 12, fontWeight: "400" as const, color: semantic.secondaryLabel },
  caption2:    { fontSize: 11, fontWeight: "400" as const, color: semantic.tertiaryLabel },

  // Variants with different weights for the same size/role
  headlineLight:  { fontSize: 17, fontWeight: "400" as const, color: semantic.label },
  calloutMedium:  { fontSize: 16, fontWeight: "500" as const, color: semantic.label },
  subheadMedium:  { fontSize: 15, fontWeight: "500" as const, color: semantic.secondaryLabel },

  // Numeric counters — enforce tabular-nums alignment
  numericLarge:  { fontSize: 34, fontWeight: "700" as const, color: semantic.label,          fontVariant: ["tabular-nums"] as const },
  numericBody:   { fontSize: 17, fontWeight: "600" as const, color: semantic.label,          fontVariant: ["tabular-nums"] as const },
  numericSmall:  { fontSize: 14, fontWeight: "500" as const, color: semantic.secondaryLabel, fontVariant: ["tabular-nums"] as const },
}
