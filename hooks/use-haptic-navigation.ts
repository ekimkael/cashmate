import * as Haptics from "expo-haptics"
import { useRouter, type Href } from "expo-router"

/**
 * Returns a navigation function that fires a light haptic impact on iOS
 * before pushing the given route. On Android and Web the push is immediate.
 */
export function useHapticNavigation(): (path: Href) => void {
  const router = useRouter()

  return (path: Href) => {
    if (process.env.EXPO_OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
    router.push(path)
  }
}
