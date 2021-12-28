<template>
<div class="account-page">
  <div class="container flex flex-row">
    <nav class="account-table">
      <div class="account-image-wrapper">
        <div class="w-10/12">
          <img
            src="src/assets/user.png"
            class="mx-auto w-20 h-20 rounded-full"
          />
        </div>
      </div>
      <div class="text-center">
        <span class="font-semibold text-white text-lg">Bhattarapong Somwong</span>
        <p class="text-sm ">Bhattarapongs@nu.ac.th</p>
      </div>
        <div class="account-settings-menu">
          <ul class="account-settings-menu-wrapper">
            <li class="account-settings-menu-list">
              <a href="#">
                <span class="ml-2">My tickets</span>
              </a>
            </li>
            <li class="account-settings-menu-list">
              <a href="#">
                <span class="ml-2">Purchase history</span>
              </a>
            </li>
            <li class="account-settings-menu-list">
              <a href="#">
                <span class="ml-2">Edit profile</span>
              </a>
            </li>
            <li class="account-settings-menu-list">
              <a href="#">
                <span class="ml-2">Change password</span>
              </a>
            </li>
            <li class="account-settings-menu-list">
              <a href="#">
                <span class="ml-2">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div class="account-content">
        <h2 class="text-3xl font-sans text-white m-8">
          My tickets
        </h2>
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

<style lang="scss">
.account-page{
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
  @apply mb-2 px-4 py-4 text-gray-100 flex flex-row hover:border-l-4 border-pale-yellow hover:bg-gray-800 hover:font-bold rounded-lg;
}

.account-content {
  @apply grow;
}
</style>
