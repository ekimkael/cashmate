import React from "react"
import { View, Text, Pressable, Image } from "react-native"
import {
  ArrowDownLeft, ArrowUpRight, CreditCard, Wallet, DollarSign,
} from "lucide-react-native"
import { Transaction } from "@/types"
import { useThemeColors } from "@/constants/colors"
import { useTypography } from "@/constants/typography"

interface TransactionItemProps {
  transaction: Transaction
  onPress?: (transaction: Transaction) => void
}

export default function TransactionItem({ transaction, onPress }: TransactionItemProps) {
  const colors = useThemeColors()
  const t = useTypography()
  const { type, amount, date, user, note, status } = transaction

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  const isDebit = type === "send" || type === "payment" || type === "withdrawal"
  const amountColor = isDebit ? colors.error : colors.success
  const prefix = isDebit ? "-" : "+"

  const iconEl = () => {
    switch (type) {
      case "send":       return <ArrowUpRight  size={20} color={colors.error} />
      case "receive":    return <ArrowDownLeft size={20} color={colors.success} />
      case "payment":    return <CreditCard    size={20} color={colors.secondaryText} />
      case "deposit":    return <Wallet        size={20} color={colors.success} />
      case "withdrawal": return <DollarSign    size={20} color={colors.error} />
      default:           return null
    }
  }

  return (
    <Pressable
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: pressed ? colors.card : "transparent",
      })}
      onPress={() => onPress?.(transaction)}
    >
      {/* Avatar or icon */}
      <View style={{ marginRight: 16 }}>
        {user.avatar ? (
          <Image source={{ uri: user.avatar }} style={{ width: 48, height: 48, borderRadius: 24 }} />
        ) : (
          <View
            style={{
              width: 48, height: 48, borderRadius: 24,
              backgroundColor: colors.inputBackground,
              alignItems: "center", justifyContent: "center",
            }}
          >
            {iconEl()}
          </View>
        )}
      </View>

      {/* Name / note / date */}
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={t.calloutMedium}>{user.name}</Text>
        {note && <Text style={t.footnote}>{note}</Text>}
        <Text style={t.caption1}>{formattedDate}</Text>
      </View>

      {/* Amount */}
      <View style={{ alignItems: "flex-end", gap: 2 }}>
        <Text selectable style={[t.numericBody, { color: amountColor }]}>
          {prefix}${amount.toFixed(2)}
        </Text>
        {status === "pending" && <Text style={t.caption1}>Pending</Text>}
      </View>
    </Pressable>
  )
}
