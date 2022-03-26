<template>
  <div class="w-full drawer drawer-mobile" style="height: auto;">
    <input id="account-drawer-toggle" type="checkbox" class="drawer-toggle">
    <div class="flex flex-col justify-center items-center drawer-content" style="max-height: none;">
      <div class="account-page">
        <div class="account-content">
          <router-view :key="$route.fullPath" />
        </div>
      </div>
    </div>
    <label for="account-drawer-toggle" class="fixed right-10 bottom-10 rounded-full lg:hidden btn btn-primary drawer-button">
      <v-mdi name="mdi-menu-open" fill="#000000" />
    </label>
    <div class="drawer-side" style="max-height: none;">
      <label for="account-drawer-toggle" class="drawer-overlay" style="background-color: #00000055;" />
      <ul class="overflow-y-auto p-4 w-80 menu bg-base-100 text-base-content">
        <li>
          <router-link to="/account">
            My tickets
          </router-link>
        </li>
        <li>
          <router-link to="/account/purchase-history">
            Purchase history
          </router-link>
        </li>
        <li>
          <router-link to="/account/edit">
            Edit profile
          </router-link>
        </li>
        <li>
          <router-link to="/account/organizer">
            Organizer tools
          </router-link>
        </li>
        <li v-show="userData.role === 'admin'">
          <router-link to="/account/developer">
            Developer tools
          </router-link>
        </li>
        <li class="pl-4" v-show="userData.role === 'admin'">
          <router-link to="/account/developer">
            Summary
          </router-link>
        </li>
        <li class="pl-4" v-show="userData.role === 'admin'">
          <router-link to="/account/developer/events">
            Events
          </router-link>
        </li>
        <li class="pl-4" v-show="userData.role === 'admin'">
          <router-link to="/account/developer/users">
            Users
          </router-link>
        </li>
        <li class="pl-4" v-show="userData.role === 'admin'">
          <router-link to="/account/developer/transactions">
            Transactions
          </router-link>
        </li>
        <li>
          <button @click="signout">
            Sign out
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { getUserAvatar } from '@/api/endpoints'
import { useAuthStore } from '@/store/use-auth-store'
import { useSignedInGuard } from '@/utils'

export default defineComponent({
  name: 'account',
  beforeRouteEnter: useSignedInGuard,
  setup () {
    const authStore = useAuthStore()
    const { userData } = storeToRefs(authStore)
    const router = useRouter()
    const toast = useToast()

    const signout = (): void => {
      authStore.signout()
      toast.success('Signed out successfully!')
      router.push('/')
    }

    return {
      userData,
      signout,
      getUserAvatar
    }
  }
})
</script>

<style scoped lang="scss">
.account-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.account-content {
  @apply p-12 grow;
}
</style>
