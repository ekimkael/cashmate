import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Transaction } from "@/types"
import { transactions as mockTransactions } from "@/mocks/data"
import { useUserStore } from "./user-store"

interface TransactionState {
	transactions: Transaction[]
	isLoading: boolean
	error: string | null
	addTransaction: (transaction: Omit<Transaction, "id" | "date" | "status">) => void
}

export const useTransactionStore = create<TransactionState>()(
	persist(
		(set, get) => ({
			transactions: mockTransactions,
			isLoading: false,
			error: null,
			addTransaction: (transactionData) => {
				const newTransaction: Transaction = {
					id: crypto.randomUUID(),
					date: new Date().toISOString(),
					status: "completed",
					...transactionData,
				}

				set((state) => ({
					transactions: [newTransaction, ...state.transactions],
				}))

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
		}),
		{
			name: "transaction-storage",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
)
