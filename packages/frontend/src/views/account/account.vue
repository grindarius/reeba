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
        <span class="font-semibold text-white text-lg">Bhattarapong Somwong</span>
        <p class="text-sm text-pale-yellow">Bhattarapongs@nu.ac.th</p>
      </div>
      <div class="account-settings-menu">
        <ul class="account-settings-menu-wrapper">
          <li class="account-settings-menu-list">
            <router-link class="w-full h-full" to="/account">My tickets</router-link>
          </li>
          <li class="account-settings-menu-list">
            <router-link class="w-full h-full" to="/account/purchase-history">Purchase history</router-link>
          </li>
          <li class="account-settings-menu-list">
            <router-link class="w-full h-full" to="/account/edit">Edit profile</router-link>
          </li>
          <li class="account-settings-menu-list">
            <router-link class="w-full h-full" to="/account/organizer">Organizer tools</router-link>
          </li>
          <li class="account-settings-menu-list">
            <router-link class="w-full h-full" to="/account/developer">Developer tools</router-link>
          </li>
          <li class="account-settings-menu-list">
            <router-link class="w-full h-full" to="/">Logout</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="account-content">
      <router-view></router-view>
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
  @apply bg-pale-gray w-full h-screen flex flex-row justify-center;
}

.account-table {
  @apply flex-col w-72 h-screen px-8 text-gray-900 border-r-4 border-pale-yellow hidden sm:flex;
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
  @apply py-4 pl-2 text-gray-100 hover:bg-gray-hover hover:font-bold rounded-lg;
}

.account-content {
  @apply grow p-12;
}
</style>
