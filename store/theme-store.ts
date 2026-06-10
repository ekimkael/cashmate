import { Appearance } from "react-native"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface ThemeState {
  isDark: boolean
  toggle: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDark: true,
      toggle: () => {
        const newIsDark = !get().isDark
        Appearance.setColorScheme(newIsDark ? "dark" : "light")
        set({ isDark: newIsDark })
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          Appearance.setColorScheme(state.isDark ? "dark" : "light")
        }
      },
    }
  )
)
