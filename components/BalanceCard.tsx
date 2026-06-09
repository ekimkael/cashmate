import React from "react"
import { View, Text, Pressable } from "react-native"
import { Eye, EyeOff } from "lucide-react-native"
import Colors from "@/constants/colors"
import { type as t } from "@/constants/typography"

interface BalanceCardProps {
  balance: number
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  const [hidden, setHidden] = React.useState(false)

  return (
    <View
      style={{
        backgroundColor: Colors.dark.card,
        borderRadius: 16,
        borderCurve: "continuous",
        padding: 20,
        width: "100%",
      }}
    >
      <Text style={[t.subhead, { marginBottom: 8, color: Colors.dark.secondaryText }]}>Your Balance</Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[t.title1, { marginRight: 2 }]} selectable>
          $
        </Text>
        <Text
          style={[t.largeTitle, { flex: 1, fontVariant: ["tabular-nums"] }]}
          selectable
        >
          {hidden ? "••••••" : balance.toFixed(2)}
        </Text>
        <Pressable onPress={() => setHidden((h) => !h)} style={{ padding: 8 }}>
          {hidden ? (
            <EyeOff size={20} color={Colors.dark.secondaryText} />
          ) : (
            <Eye size={20} color={Colors.dark.secondaryText} />
          )}
        </Pressable>
      </View>
    </View>
  )
}
