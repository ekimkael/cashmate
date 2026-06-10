import React from "react"
import { ScrollView, View, Text, Pressable } from "react-native"
import { Stack } from "expo-router"
import { useHapticNavigation } from "@/hooks/use-haptic-navigation"

import { useThemeColors } from "@/constants/colors"
import { useRequireUser } from "@/hooks/use-require-user"
import BalanceCard from "@/components/ui/balance-card"
import ActionButton from "@/components/ui/action-button"
import { ArrowUpRight, ArrowDownLeft, Scan, QrCode } from "lucide-react-native"

export default function HomeScreen() {
  const colors = useThemeColors()
  const navigate = useHapticNavigation()
  const user = useRequireUser()

  if (!user) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}>
        <Text style={{ color: colors.text, fontSize: 16 }}>User not found</Text>
      </View>
    )
  }

  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          icon="bell"
          onPress={() => navigate("/notifications")}
        />
      </Stack.Toolbar>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: 20, paddingTop: 8, gap: 24 }}
      >
        <BalanceCard balance={user.balance} />

        <View style={{ gap: 16 }}>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <ActionButton
              icon={ArrowUpRight}
              label="Send"
              onPress={() => navigate("/send")}
              style={{ flex: 1 }}
            />
            <ActionButton
              icon={ArrowDownLeft}
              label="Request"
              onPress={() => navigate("/request")}
              style={{ flex: 1 }}
            />
          </View>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <ActionButton
              icon={Scan}
              label="Scan"
              onPress={() => navigate("/scan")}
              style={{ flex: 1 }}
              variant="secondary"
            />
            <ActionButton
              icon={QrCode}
              label="QR Code"
              onPress={() => navigate("/qr-code")}
              style={{ flex: 1 }}
              variant="secondary"
            />
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 18, fontWeight: "600", color: colors.text, marginBottom: 12 }}>
            Instant Deposit
          </Text>
          <View
            style={{
              padding: 20,
              borderRadius: 16,
              borderCurve: "continuous",
              backgroundColor: colors.card,
              boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
            }}
          >
            <Pressable onPress={() => navigate("/deposit")}>
              <Text style={{ fontSize: 17, fontWeight: "600", color: colors.text, marginBottom: 6 }}>
                Add Cash
              </Text>
            </Pressable>
            <Text style={{ fontSize: 14, color: colors.secondaryText }}>
              Instantly deposit money to your CashMate
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  )
}
