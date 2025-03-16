import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Transaction } from "@/types"
import { transactions as mockTransactions } from "@/mocks/data"
import { useUserStore } from "./userStore"

interface TransactionState {
	transactions: Transaction[]
	isLoading: boolean
	error: string | null
	addTransaction: (
		transaction: Omit<Transaction, "id" | "date" | "status">
	) => void
	getTransactions: () => Transaction[]
}

export const useTransactionStore = create<TransactionState>()(
	persist(
		(set, get) => ({
			transactions: mockTransactions, // Start with mock data
			isLoading: false,
			error: null,
			addTransaction: (transactionData) => {
				const newTransaction: Transaction = {
					id: `tx-${Date.now()}`,
					date: new Date().toISOString(),
					status: "completed",
					...transactionData,
				}

				set((state) => ({
					transactions: [newTransaction, ...state.transactions],
				}))

				// Update user balance
				if (
					transactionData.type === "send" ||
					transactionData.type === "payment" ||
					transactionData.type === "withdrawal"
				) {
					useUserStore.getState().updateBalance(-transactionData.amount)
				} else if (
					transactionData.type === "receive" ||
					transactionData.type === "deposit"
				) {
					useUserStore.getState().updateBalance(transactionData.amount)
				}
			},
			getTransactions: () => get().transactions,
		}),
		{
			name: "transaction-storage",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
)
