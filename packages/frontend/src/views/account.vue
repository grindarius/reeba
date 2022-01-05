<template>
  <div class="account-page">
    <div class="container flex flex-row">
      <nav class="account-table">
        <div class="account-image-wrapper">
          <div class="w-10/12">
            <img src="@/assets/user.png" class="mx-auto w-20 h-20 rounded-full" />
          </div>
        </div>
        <div class="text-center">
          <span class="font-semibold text-white text-lg">Bhattarapong Somwong</span>
          <p class="text-sm">Bhattarapongs@nu.ac.th</p>
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
        <h2 class="content-heading">My tickets</h2>
        <section class="content-box-size">
          <div class="content-box-inside">
            <div class="content-box-setting-image">
              <img class="content-box-picture" src="@/assets/photo.jpg" />
            </div>
            <div class="content-box-textbox">
              <p class="content-box-frontsize-title">Rajamangala National Stadium</p>
              <p class="content-box-frontsize-main">Seat</p>
              <p class="content-box-frontsize-message">C4-C09</p>
              <p class="content-box-frontsize-main">Prices</p>
              <p class="content-box-frontsize-message">6800THB</p>
              <p class="content-box-frontsize-main">Show date</p>
              <p class="content-box-frontsize-message">Wednesday, 6 April 2022</p>
              <p class="content-box-frontsize-message">Thursday, 7 April 2022</p>
            </div>
          </div>
        </section>
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
  @apply mb-2 px-4 py-4 text-gray-100 flex flex-row hover:border-l-4 border-pale-yellow hover:bg-gray-800 hover:font-bold rounded-lg;
}

.account-content {
  @apply grow;
}

.content-box {
  @apply w-full my-1 border-none;
}

.content-box-frontsize-title {
  @apply text-sm text-gray-900 font-bold;
}

.content-box-frontsize-main {
  @apply text-xs text-gray-900 font-normal;
}

.content-box-frontsize-message {
  @apply text-xs text-gray-600 font-normal;
}

.content-box-size {
  @apply max-w-md mx-10 px-4 sm:px-6 lg:px-2 py-4;
}

.content-box-inside {
  @apply w-full bg-pale-yellow rounded-lg  overflow-hidden flex flex-col md:flex-row;
}

.content-box-picture {
  @apply object-center object-cover h-full w-full;
}

.content-box-setting-image {
  @apply w-full md:w-2/5 h-60;
}

.content-box-textbox {
  @apply w-full md:w-3/5 text-left p-6 md:p-4 space-y-2;
}

.content-heading {
  @apply text-3xl font-bold text-white m-8;
}
</style>
