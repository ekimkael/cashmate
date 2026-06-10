import React, { useState, useMemo } from "react"
import { SectionList, View, Text, FlatList, Pressable } from "react-native"
import { useRouter, Stack } from "expo-router"
import * as Haptics from "expo-haptics"

import Colors, { useThemeColors } from "@/constants/colors"
import { useTransactionStore } from '@/store/transaction-store'
import TransactionItem from "@/components/ui/transaction-item"

const FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Sent", value: "send" },
  { label: "Received", value: "receive" },
  { label: "Payments", value: "payment" },
  { label: "Deposits", value: "deposit" },
  { label: "Withdrawals", value: "withdrawal" },
]

export default function ActivityScreen() {
  const C = useThemeColors()
  const router = useRouter()
  const { transactions } = useTransactionStore()
  const [filterType, setFilterType] = useState("all")
  const [showFilter, setShowFilter] = useState(false)

  const filtered = useMemo(
    () => (filterType === "all" ? transactions : transactions.filter((tx) => tx.type === filterType)),
    [transactions, filterType],
  )

  const sections = useMemo(() => {
    const groups: Record<string, typeof transactions> = {}
    filtered.forEach((tx) => {
      const label = new Date(tx.date).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      })
      if (!groups[label]) groups[label] = []
      groups[label].push(tx)
    })
    return Object.keys(groups).map((title) => ({ title, data: groups[title] }))
  }, [filtered])

  const handleFilterToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setShowFilter((v) => !v)
  }

  const handleTransactionPress = (tx: { id: string }) =>
    router.push({ pathname: "/transaction/[id]", params: { id: tx.id } } as any)

  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          icon={showFilter ? "line.3.horizontal.decrease.circle.fill" : "line.3.horizontal.decrease.circle"}
          selected={showFilter}
          onPress={handleFilterToggle}
        />
      </Stack.Toolbar>

      <SectionList
        contentInsetAdjustmentBehavior="automatic"
        sections={sections}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          showFilter ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={FILTER_OPTIONS}
              keyExtractor={(item) => item.value}
              contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10, gap: 8 }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    Haptics.selectionAsync()
                    setFilterType(item.value)
                  }}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    backgroundColor: filterType === item.value ? C.primary : C.card,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: filterType === item.value ? "600" : "400",
                      color: filterType === item.value ? C.background : C.text,
                    }}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />
          ) : null
        }
        renderItem={({ item }) => (
          <TransactionItem transaction={item} onPress={handleTransactionPress} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: C.border,
              backgroundColor: C.background,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "600", color: C.secondaryText }}>
              {title}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={{ height: 300, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 16, color: C.secondaryText }}>No transactions found</Text>
          </View>
        }
      />
    </>
  )
}
