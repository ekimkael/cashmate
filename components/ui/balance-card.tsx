import React from "react"
import { View, Text, Pressable } from "react-native"
import { Eye, EyeOff } from "lucide-react-native"
import { useThemeColors } from "@/constants/colors"
import { useTypography } from "@/constants/typography"

interface BalanceCardProps {
  balance: number
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  const C = useThemeColors()
  const t = useTypography()
  const [hidden, setHidden] = React.useState(false)

  return (
    <View
      style={{
        backgroundColor: C.card,
        borderRadius: 16,
        borderCurve: "continuous",
        padding: 20,
        width: "100%",
      }}
    >
      <Text style={[t.subhead, { marginBottom: 8 }]}>Your Balance</Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[t.title1, { marginRight: 2 }]} selectable>$</Text>
        <Text
          style={[t.largeTitle, { flex: 1, fontVariant: ["tabular-nums"] }]}
          selectable
        >
          {hidden ? "••••••" : balance.toFixed(2)}
        </Text>
        <Pressable onPress={() => setHidden((h) => !h)} style={{ padding: 8 }}>
          {hidden ? (
            <EyeOff size={20} color={C.secondaryText} />
          ) : (
            <Eye size={20} color={C.secondaryText} />
          )}
        </Pressable>
      </View>
    </View>
  )
}
