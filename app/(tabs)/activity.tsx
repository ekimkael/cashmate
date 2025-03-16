import React, { useState, useMemo } from "react"
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	SectionList,
	ScrollView,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Filter } from "lucide-react-native"
import { useTransactionStore } from "@/store/transactionStore"
import TransactionItem from "@/components/TransactionItem"
import Colors from "@/constants/colors"

export default function ActivityScreen() {
	const router = useRouter()
	const { transactions } = useTransactionStore()
	const [filterType, setFilterType] = useState("all")
	const [showFilter, setShowFilter] = useState(false)

	const handleTransactionPress = (transaction) => {
		router.push({
			pathname: "/transaction/[id]",
			params: { id: transaction.id },
		})
	}

	const filteredTransactions = useMemo(() => {
		if (filterType === "all") return transactions
		return transactions.filter((tx) => tx.type === filterType)
	}, [transactions, filterType])

	// Group transactions by date
	const groupedTransactions = useMemo(() => {
		const groups = {}

		filteredTransactions.forEach((transaction) => {
			const date = new Date(transaction.date)
			const dateString = date.toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			})

			if (!groups[dateString]) {
				groups[dateString] = []
			}

			groups[dateString].push(transaction)
		})

		return Object.keys(groups).map((date) => ({
			title: date,
			data: groups[date],
		}))
	}, [filteredTransactions])

	const filterOptions = [
		{ label: "All", value: "all" },
		{ label: "Sent", value: "send" },
		{ label: "Received", value: "receive" },
		{ label: "Payments", value: "payment" },
		{ label: "Deposits", value: "deposit" },
		{ label: "Withdrawals", value: "withdrawal" },
	]

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Activity</Text>

				<Pressable
					style={styles.filterButton}
					onPress={() => setShowFilter(!showFilter)}>
					<Filter size={20} color={Colors.dark.text} />
				</Pressable>
			</View>

			{showFilter && (
				<View style={styles.filterContainer}>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						{filterOptions.map((option) => (
							<Pressable
								key={option.value}
								style={[
									styles.filterOption,
									filterType === option.value && styles.filterOptionActive,
								]}
								onPress={() => setFilterType(option.value)}>
								<Text
									style={[
										styles.filterOptionText,
										filterType === option.value &&
											styles.filterOptionTextActive,
									]}>
									{option.label}
								</Text>
							</Pressable>
						))}
					</ScrollView>
				</View>
			)}

			<SectionList
				sections={groupedTransactions}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TransactionItem
						transaction={item}
						onPress={handleTransactionPress}
					/>
				)}
				renderSectionHeader={({ section: { title } }) => (
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionHeaderText}>{title}</Text>
					</View>
				)}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>No transactions found</Text>
					</View>
				}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.dark.background,
	},
	header: {
		padding: 20,
		paddingBottom: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headerTitle: {
		color: Colors.dark.text,
		fontSize: 24,
		fontWeight: "700",
	},
	filterButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.dark.card,
		alignItems: "center",
		justifyContent: "center",
	},
	filterContainer: {
		paddingHorizontal: 20,
		paddingBottom: 10,
	},
	filterOption: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		marginRight: 8,
		backgroundColor: Colors.dark.card,
	},
	filterOptionActive: {
		backgroundColor: Colors.dark.primary,
	},
	filterOptionText: {
		color: Colors.dark.text,
		fontSize: 14,
	},
	filterOptionTextActive: {
		color: Colors.dark.background,
		fontWeight: "600",
	},
	sectionHeader: {
		backgroundColor: Colors.dark.background,
		paddingHorizontal: 20,
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: Colors.dark.border,
	},
	sectionHeaderText: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
		fontWeight: "600",
	},
	emptyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
		height: 300,
	},
	emptyText: {
		color: Colors.dark.secondaryText,
		fontSize: 16,
		textAlign: "center",
	},
})
