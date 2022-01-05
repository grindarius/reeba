<template>
  <nav class="navbar">
    <div class="logo w-min lg:w-96">
      <img src="@/assets/reeba-logo.png" alt="Reeba logo" width="49" class="logo-image">
    </div>
    <div class="searchbar">
      <input type="text" name="searchbar" id="searchbar">
    </div>
    <div class="buttons">
      <router-link class="create-event-button" to="/create">
        Create event
      </router-link>
      <router-link class="login-button" to="/login">
        Login/Sign up
      </router-link>
    </div>
    <div class="buttons-mobile">
    </div>
    <!-- <div class="searchbox">
      <div class="flex content-center">
        <div class="hidden relative mr-3 md:mr-0 md:block">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          </div>
          <input type="text" id="email-adress-icon" class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search...">
        </div>
      </div>
    </div>
    <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
      <a href="#" class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
        Creat new event
      </a>
    </div>
    <div>
      <a href="#" class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
        Creat new event
      </a>
    </div>
    <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
      <a href="#" class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
        Sign up
      </a>
    </div>
    <div>
      <a href="#" class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
        Sign up
      </a>
    </div> -->
  </nav>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style scoped lang="scss">
.navbar {
  @apply h-12 w-full bg-pale-yellow text-center flex flex-row justify-between;
}

.logo-image {
  @apply ml-2;
}

.searchbar {
  @apply flex flex-col justify-center;

  & input {
    @apply hidden lg:block rounded-lg bg-pale-gray shadow-lg w-96 h-7 px-2 outline-none text-white;
  }
}

.create-event-button, .login-button {
  @apply w-36 h-8 bg-pale-gray whitespace-nowrap rounded-lg outline-none text-white p-1 mx-6;
}

.buttons {
  @apply hidden lg:flex justify-center items-center;
}

.buttons-mobile {
  @apply block lg:hidden;
}
</style>
