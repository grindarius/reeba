<template>
  <div class="account-page">
    <div class="container flex flex-row">
      <nav class="account-table">
        <div class="account-image-wrapper">
          <div class="w-10/12">
            <img src="@/assets/user.png" class="mx-auto w-20 h-20 rounded-full">
          </div>
        </div>
        <div class="text-center">
          <span class="text-lg font-semibold text-white">Bhattarapong Somwong</span>
          <p class="text-sm text-pale-yellow">
            Bhattarapongs@nu.ac.th
          </p>
        </div>
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
            <li class="text-gray-100 rounded-lg my-1 px-2">
              <a class="link">
                Developer tools
              </a>
            </li>
            <li class="pl-3 border-l-2 ml-2">
              <ul>
                <li class="account-settings-menu-list">
                  <router-link class="link" to="/account/developer/">
                    Summary
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
              <router-link class="link" to="/">
                Logout
              </router-link>
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

export default defineComponent({
  name: 'account'
})
</script>

<style scoped lang="scss">
.account-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
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
  @apply text-gray-100 rounded-lg hover:font-bold hover:bg-gray-hover my-1;

  & > a {
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
