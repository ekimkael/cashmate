import React from "react"
import { ScrollView, View, Text } from "react-native"
import { useRouter, Stack } from "expo-router"
import * as Haptics from "expo-haptics"

import Colors from "@/constants/colors"
import { useUserStore } from "@/store/userStore"
import BalanceCard from "@/components/BalanceCard"
import ActionButton from "@/components/ActionButton"
import { ArrowUpRight, ArrowDownLeft, Scan, QrCode } from "lucide-react-native"

export default function HomeScreen() {
  const router = useRouter()
  const { user } = useUserStore()

  if (!user) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: Colors.dark.background }}>
        <Text style={{ color: Colors.dark.text, fontSize: 16 }}>User not found</Text>
      </View>
    )
  }

  const handleAction = (path: string) => {
    if (process.env.EXPO_OS === "ios") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.push(path as any)
  }

  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          icon="bell"
          onPress={() => router.push("/notifications" as any)}
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
              onPress={() => handleAction("/send")}
              style={{ flex: 1 }}
            />
            <ActionButton
              icon={ArrowDownLeft}
              label="Request"
              onPress={() => handleAction("/request")}
              style={{ flex: 1 }}
            />
          </View>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <ActionButton
              icon={Scan}
              label="Scan"
              onPress={() => handleAction("/scan")}
              style={{ flex: 1 }}
              variant="secondary"
            />
            <ActionButton
              icon={QrCode}
              label="QR Code"
              onPress={() => handleAction("/qrcode")}
              style={{ flex: 1 }}
              variant="secondary"
            />
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 18, fontWeight: "600", color: Colors.dark.text, marginBottom: 12 }}>
            Instant Deposit
          </Text>
          <View
            style={{
              padding: 20,
              borderRadius: 16,
              borderCurve: "continuous",
              backgroundColor: Colors.dark.card,
              boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
            }}
          >
            <Text
              style={{ fontSize: 17, fontWeight: "600", color: Colors.dark.text, marginBottom: 6 }}
              onPress={() => handleAction("/deposit")}
            >
              Add Cash
            </Text>
            <Text style={{ fontSize: 14, color: Colors.dark.secondaryText }}>
              Instantly deposit money to your CashMate
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  )
}
