import React from "react"
import { Pressable, Text, ViewStyle, TextStyle } from "react-native"
import { LucideIcon } from "lucide-react-native"
import Colors from "@/constants/colors"
import { semantic } from "@/constants/colors"
import { type as t } from "@/constants/typography"

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
          backgroundColor: isPrimary ? Colors.dark.primary : Colors.dark.card,
          ...(isPrimary ? {} : { borderWidth: 1, borderColor: Colors.dark.border }),
        },
        style,
      ]}
      onPress={onPress}
    >
      <Icon
        size={24}
        color={isPrimary ? Colors.dark.background : Colors.dark.primary}
      />
      <Text
        style={[
          t.callout,
          { marginTop: 8, fontWeight: "500" },
          isPrimary
            ? { color: Colors.dark.background }
            : { color: semantic.label as any },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  )
}
