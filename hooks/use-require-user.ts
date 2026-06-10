import { useEffect } from "react"
import { useRouter } from "expo-router"
import { useUserStore } from "@/store/user-store"
import { type User } from "@/types"

/**
 * Returns the authenticated user or redirects to /auth/login if none is found.
 * Use the returned value only after checking for null in the render guard.
 */
export function useRequireUser(): User | null {
  const router = useRouter()
  const { user } = useUserStore()

  useEffect(() => {
    if (!user) router.replace("/auth/login")
  }, [user])

  return user
}
