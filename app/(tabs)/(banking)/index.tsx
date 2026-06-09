import React from "react"
import { ScrollView, View, Text, Pressable } from "react-native"
import { useRouter, Stack } from "expo-router"
import * as Haptics from "expo-haptics"
import {
  Wallet, Building, DollarSign, CreditCard,
  ArrowDownToLine, ArrowUpFromLine,
} from "lucide-react-native"

import Colors from "@/constants/colors"
import { useUserStore } from "@/store/userStore"

export default function BankingScreen() {
  const router = useRouter()
  const { user } = useUserStore()

  if (!user) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.dark.background, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: Colors.dark.text, fontSize: 16 }}>User not found</Text>
      </View>
    )
  }

  const handlePress = (path: string) => {
    if (process.env.EXPO_OS === "ios") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.push(path as any)
  }

  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          icon="plus.circle"
          onPress={() => handlePress("/linkaccount")}
        />
      </Stack.Toolbar>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: 20, gap: 20 }}
      >
        {/* Virtual Card */}
        <Pressable
          onPress={() => handlePress("/card")}
          style={{
            backgroundColor: Colors.dark.primary,
            borderRadius: 20,
            borderCurve: "continuous",
            padding: 24,
            height: 180,
            justifyContent: "space-between",
            boxShadow: "0 4px 20px rgba(0, 214, 50, 0.3)",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <CreditCard size={24} color={Colors.dark.background} />
            <Text style={{ fontSize: 18, fontWeight: "600", color: Colors.dark.background }}>
              {user.name}
            </Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: "500", color: Colors.dark.background, alignSelf: "flex-end" }}>
            •••• 1234
          </Text>
        </Pressable>

        {/* Cash Balance */}
        <View
          style={{
            backgroundColor: Colors.dark.card,
            borderRadius: 16,
            borderCurve: "continuous",
            padding: 20,
            gap: 6,
          }}
        >
          <Text style={{ fontSize: 14, color: Colors.dark.secondaryText }}>Cash Balance</Text>
          <Text style={{ fontSize: 34, fontWeight: "700", color: Colors.dark.text, fontVariant: ["tabular-nums"] }}>
            ${user.balance.toFixed(2)}
          </Text>
        </View>

        {/* Actions grid */}
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600", color: Colors.dark.text, marginBottom: 12 }}>
            Actions
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {[
              { icon: ArrowDownToLine, label: "Add Cash", path: "/deposit" },
              { icon: ArrowUpFromLine, label: "Cash Out", path: "/cashout" },
              { icon: Building, label: "Direct Deposit", path: "/directdeposit" },
              { icon: DollarSign, label: "Statements", path: "/statements" },
            ].map(({ icon: Icon, label, path }) => (
              <Pressable
                key={label}
                onPress={() => handlePress(path)}
                style={{
                  width: "47%",
                  backgroundColor: Colors.dark.card,
                  borderRadius: 16,
                  borderCurve: "continuous",
                  padding: 16,
                  gap: 12,
                }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: "rgba(0, 214, 50, 0.12)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={22} color={Colors.dark.primary} />
                </View>
                <Text style={{ fontSize: 15, fontWeight: "500", color: Colors.dark.text }}>{label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Linked Accounts */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: Colors.dark.text }}>
            Linked Accounts
          </Text>
          <Pressable
            onPress={() => handlePress("/linkedaccounts")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
              backgroundColor: Colors.dark.card,
              borderRadius: 16,
              borderCurve: "continuous",
              padding: 16,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: "rgba(255,255,255,0.1)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Wallet size={24} color={Colors.dark.text} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "500", color: Colors.dark.text }}>Bank Account</Text>
              <Text style={{ fontSize: 14, color: Colors.dark.secondaryText }}>•••• 5678</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </>
  )
}
