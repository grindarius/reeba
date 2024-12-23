import { NavigationGuardWithThis } from "vue-router"

import { useAuthStore } from "@/store/use-auth-store"

export const useSignedInGuard: NavigationGuardWithThis<undefined> = (
  _,
  __,
  next
) => {
  const authStore = useAuthStore()

  if (authStore.isAuthenticated) {
    next()
  } else {
    next("/signin")
  }
}
