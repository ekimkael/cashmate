import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { User } from "@/types"
import { currentUser } from "@/mocks/data"

interface UserState {
	user: User | null
	isLoading: boolean
	error: string | null
	setUser: (user: User) => void
	updateBalance: (amount: number) => void
	logout: () => void
}

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			user: currentUser, // Start with mock data
			isLoading: false,
			error: null,
			setUser: (user) => set({ user }),
			updateBalance: (amount) =>
				set((state) => ({
					user: state.user
						? { ...state.user, balance: state.user.balance + amount }
						: null,
				})),
			logout: () => set({ user: null }),
		}),
		{
			name: "user-storage",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
)
