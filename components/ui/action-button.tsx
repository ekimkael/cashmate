import React from "react"
import { Pressable, Text, ViewStyle, TextStyle } from "react-native"
import { LucideIcon } from "lucide-react-native"
import { useThemeColors } from "@/constants/colors"
import { useTypography } from "@/constants/typography"

interface ActionButtonProps {
  icon: LucideIcon
  label: string
  onPress: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  variant?: "primary" | "secondary"
}

export default function ActionButton({
  icon: Icon,
  label,
  onPress,
  style,
  textStyle,
  variant = "primary",
}: ActionButtonProps) {
  const colors = useThemeColors()
  const t = useTypography()
  const isPrimary = variant === "primary"

  return (
    <Pressable
      style={({ pressed }) => [
        {
          borderRadius: 12,
          borderCurve: "continuous",
          padding: 16,
          alignItems: "center",
          justifyContent: "center",
          minWidth: 80,
          opacity: pressed ? 0.8 : 1,
          backgroundColor: isPrimary ? colors.primary : colors.card,
          ...(isPrimary ? {} : { borderWidth: 1, borderColor: colors.border }),
        },
        style,
      ]}
      onPress={onPress}
    >
      <Icon size={24} color={isPrimary ? colors.background : colors.primary} />
      <Text
        style={[
          t.callout,
          { marginTop: 8, fontWeight: "500" },
          { color: isPrimary ? colors.background : colors.text },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  )
}
