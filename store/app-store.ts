import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface AppState {
	isAppReady: boolean
	notifications: boolean
	soundEffects: boolean
	hapticFeedback: boolean
	setAppReady: () => void
	/** Toggles a boolean preference by key. */
	togglePreference: (key: "notifications" | "soundEffects" | "hapticFeedback") => void
}

export const useAppStore = create<AppState>()(
	persist(
		(set) => ({
			isAppReady: false,
			notifications: true,
			soundEffects: true,
			hapticFeedback: true,
			setAppReady: () => set({ isAppReady: true }),
			togglePreference: (key) => set((state) => ({ [key]: !state[key] })),
		}),
		{
			name: "app-storage",
			storage: createJSONStorage(() => AsyncStorage),
			partialize: (state) => ({
				notifications: state.notifications,
				soundEffects: state.soundEffects,
				hapticFeedback: state.hapticFeedback,
			}),
		}
	)
)
