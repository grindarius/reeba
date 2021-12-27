<template>
<div class="login-page">
  <div class="w-full h-screen flex items-center justify-center">
    <form class="w-full md:w-1/3 rounded-lg  ">
      <div class="flex font-bold justify-center scroll-mt-50">
        <img class="h-64 w-64 mb-3" src="@/assets/reeba-logo.png" alt="logo-reeba" />
      </div>
      <div class="px-12 pb-10">
        <div class="w-full mb-2">
          <div class="flex items-center">
            <input type="text" placeholder="Email Address" class="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none">
          </div>
        </div>
        <div class="w-full mb-2">
          <div class="flex items-center">
            <input type="password" placeholder="Password" class="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none">
          </div>
        </div>
        <button type="submit" class="w-full py-2 mt-8 rounded-full bg-pale-yellow text-gray-100 focus:outline-none">
          Login
        </button>
        <br>
        <a class="inline-block align-baseline font-bold text-sm text-white hover:text-blue-darker" href="#">
          Forgot Password?
        </a>
      </div>
    </form>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'login'
})
</script>

<style lang="scss">
.login-page {
  @apply w-full h-screen bg-pale-gray;
}
</style>
