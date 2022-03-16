<template>
  <div class="h-screen drawer drawer-mobile w-full">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle">
    <div class="drawer-content flex flex-col items-center justify-center">
      <div class="account-page">
        <div class="account-content">
          <router-view :key="$route.fullPath" />
        </div>
      </div>
    </div>
    <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden fixed bottom-10 right-10 rounded-full">
      <v-mdi name="mdi-menu-open" fill="#000000" />
    </label>
    <div class="drawer-side">
      <label for="my-drawer-2" class="drawer-overlay" />
      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
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
          <a>
            Developer tools
          </a>
        </li>
        <li class="pl-4" v-show="userData.role === 'admin'">
          <router-link to="/account/developer/">
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

.account-info {
  @apply flex flex-row gap-1 justify-center text-center text-white;
}

.account-table {
  @apply hidden flex-col px-8 w-72 min-h-screen text-gray-900 border-r-4 lg:flex border-pale-yellow;
}

.account-image-wrapper {
  @apply flex flex-row justify-center mt-10;
}

.account-settings-menu {
  @apply mt-10 mb-4;
}

.account-settings-menu-wrapper {
  @apply ml-4;
}

.account-settings-menu-list {
  @apply my-1 text-gray-100 rounded-lg hover:font-bold hover:bg-gray-hover;

  & > * {
    @apply px-2;
  }
}

.account-content {
  @apply p-12 grow;
}
</style>
