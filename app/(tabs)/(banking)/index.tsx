import React from "react"
import { ScrollView, View, Text, Pressable } from "react-native"
import { Stack } from "expo-router"
import { useHapticNavigation } from "@/hooks/use-haptic-navigation"
import {
  Wallet, Building, DollarSign, CreditCard,
  ArrowDownToLine, ArrowUpFromLine,
} from "lucide-react-native"

import { useThemeColors } from "@/constants/colors"
import { useRequireUser } from "@/hooks/use-require-user"

export default function BankingScreen() {
  const colors = useThemeColors()
  const navigate = useHapticNavigation()
  const user = useRequireUser()

  if (!user) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: colors.text, fontSize: 16 }}>User not found</Text>
      </View>
    )
  }

  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          icon="plus.circle"
          onPress={() => navigate("/link-account")}
        />
      </Stack.Toolbar>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: 20, gap: 20 }}
      >
        {/* Virtual Card */}
        <Pressable
          onPress={() => navigate("/card")}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 20,
            borderCurve: "continuous",
            padding: 24,
            height: 180,
            justifyContent: "space-between",
            boxShadow: "0 4px 20px rgba(0, 214, 50, 0.3)",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <CreditCard size={24} color={colors.background} />
            <Text style={{ fontSize: 18, fontWeight: "600", color: colors.background }}>
              {user.name}
            </Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: "500", color: colors.background, alignSelf: "flex-end" }}>
            •••• 1234
          </Text>
        </Pressable>

        {/* Cash Balance */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 16,
            borderCurve: "continuous",
            padding: 20,
            gap: 6,
          }}
        >
          <Text style={{ fontSize: 14, color: colors.secondaryText }}>Cash Balance</Text>
          <Text style={{ fontSize: 34, fontWeight: "700", color: colors.text, fontVariant: ["tabular-nums"] }}>
            ${user.balance.toFixed(2)}
          </Text>
        </View>

        {/* Actions grid */}
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600", color: colors.text, marginBottom: 12 }}>
            Actions
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {[
              { icon: ArrowDownToLine, label: "Add Cash", path: "/deposit" },
              { icon: ArrowUpFromLine, label: "Cash Out", path: "/cashout" },
              { icon: Building, label: "Direct Deposit", path: "/direct-deposit" },
              { icon: DollarSign, label: "Statements", path: "/statements" },
            ].map(({ icon: Icon, label, path }) => (
              <Pressable
                key={label}
                onPress={() => navigate(path)}
                style={{
                  width: "47%",
                  backgroundColor: colors.card,
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
                    backgroundColor: colors.primaryMuted,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={22} color={colors.primary} />
                </View>
                <Text style={{ fontSize: 15, fontWeight: "500", color: colors.text }}>{label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Linked Accounts */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: colors.text }}>
            Linked Accounts
          </Text>
          <Pressable
            onPress={() => navigate("/linked-accounts")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
              backgroundColor: colors.card,
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
              <Wallet size={24} color={colors.text} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "500", color: colors.text }}>Bank Account</Text>
              <Text style={{ fontSize: 14, color: colors.secondaryText }}>•••• 5678</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </>
  )
}
