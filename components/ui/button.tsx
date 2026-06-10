import { ActivityIndicator, Pressable, Text, ViewStyle } from "react-native"
import { LucideIcon } from "lucide-react-native"
import { useThemeColors } from "@/constants/colors"

type Variant = "primary" | "secondary" | "ghost" | "danger"
type Size = "md" | "lg"

interface ButtonProps {
  label: string
  onPress: () => void
  variant?: Variant
  size?: Size
  disabled?: boolean
  loading?: boolean
  icon?: LucideIcon
  style?: ViewStyle
}

const height: Record<Size, number> = { md: 48, lg: 56 }
const fontSize: Record<Size, number> = { md: 15, lg: 16 }

export default function Button({
  label,
  onPress,
  variant = "primary",
  size = "lg",
  disabled = false,
  loading = false,
  icon: Icon,
  style,
}: ButtonProps) {
  const colors = useThemeColors()
  const config: Record<Variant, { bg: string; text: string; border?: string }> = {
    primary:   { bg: colors.primary, text: colors.background },
    secondary: { bg: colors.card,    text: colors.primary, border: colors.border },
    ghost:     { bg: "transparent", text: colors.text, border: colors.border },
    danger:    { bg: colors.error,   text: colors.background },
  }
  const c = config[variant]
  const hasBorder = !!c.border

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          height: height[size],
          borderRadius: 12,
          borderCurve: "continuous",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 8,
          backgroundColor: c.bg,
          opacity: pressed ? 0.8 : disabled ? 0.4 : 1,
          ...(hasBorder && { borderWidth: 1, borderColor: c.border }),
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator size="small" color={c.text} />
      ) : (
        <>
          {Icon && <Icon size={fontSize[size] + 2} color={c.text} />}
          <Text
            style={{
              color: c.text,
              fontSize: fontSize[size],
              fontWeight: "600",
              letterSpacing: -0.2,
            }}
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  )
}
