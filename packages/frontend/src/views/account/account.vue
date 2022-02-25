<template>
  <div class="account-page">
    <div class="container flex flex-row">
      <nav class="max-w-xs account-table">
        <div class="account-image-wrapper">
          <div class="w-10/12">
            <img :src="`${getUserAvatar.url}/${authStore.userData.username ?? ''}`" class="mx-auto w-20 h-20 rounded-full">
          </div>
        </div>
        <div class="account-info">
          <p class="text-base font-semibold text-center text-white">
            {{ authStore.userData.username }}
          </p>
          <v-mdi name="mdi-check-decagram" fill="#D5A755" />
        </div>
        <p class="text-sm text-center text-pale-yellow">
          {{ authStore.userData.email }}
        </p>
        <div class="account-settings-menu">
          <ul class="account-settings-menu-wrapper">
            <li class="account-settings-menu-list">
              <router-link class="link" to="/account">
                My tickets
              </router-link>
            </li>
            <li class="account-settings-menu-list">
              <router-link class="link" to="/account/purchase-history">
                Purchase history
              </router-link>
            </li>
            <li class="account-settings-menu-list">
              <router-link class="link" to="/account/edit">
                Edit profile
              </router-link>
            </li>
            <li class="account-settings-menu-list">
              <router-link class="link" to="/account/organizer">
                Organizer tools
              </router-link>
            </li>
            <li v-show="authStore.userData.role === 'admin'" class="px-2 my-1 text-gray-100 rounded-lg">
              <a class="link">
                Developer tools
              </a>
            </li>
            <li v-show="authStore.userData.role === 'admin'" class="pl-3 ml-2 border-l-2">
              <ul>
                <li class="account-settings-menu-list">
                  <router-link class="link" to="/account/developer/">
                    Summary
                  </router-link>
                </li>
                <li class="account-settings-menu-list">
                  <router-link class="link" to="/account/developer/events">
                    Events
                  </router-link>
                </li>
                <li class="account-settings-menu-list">
                  <router-link class="link" to="/account/developer/users">
                    Users
                  </router-link>
                </li>
                <li class="account-settings-menu-list">
                  <router-link class="link" to="/account/developer/transactions">
                    Transactions
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="account-settings-menu-list">
              <button class="text-left link" @click="signout">
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div class="account-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { POSITION, useToast } from 'vue-toastification'

import { getUserAvatar } from '@/api/endpoints'
import { useAuthStore } from '@/store/use-auth-store'
import { useSignedInGuard } from '@/utils'

export default defineComponent({
  name: 'account',
  beforeRouteEnter: useSignedInGuard,
  setup () {
    const authStore = useAuthStore()
    const router = useRouter()
    const toast = useToast()

    const signout = (): void => {
      authStore.signout()
      toast.success('Signed out successfully!', { position: POSITION.BOTTOM_RIGHT, timeout: 2000 })
      router.push('/')
    }

    return {
      authStore,
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

.link {
  @apply inline-block py-2 w-full h-full;
}

.account-content {
  @apply p-12 grow;
}
</style>
