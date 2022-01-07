<template>
  <div class="login-page">
    <div class="login-page-content">
      <form class="w-11/12 md:w-3/5 xl:w-1/3 rounded-lg">
        <div class="bg-pale-yellow shadow-transparent rounded-2xl px-8 pt-6 pb-8 mb-4 flex flex-col">
          <div class="flex font-bold justify-center scroll-mt-50">
            <img class="h-64 w-64 mb-2" src="@/assets/reeba-logo.png" alt="logo-reeba">
          </div>
          <h3 class="text-4xl text-white text-center">
            Login
          </h3>
          <div class="mb-4">
            <label class="block text-pale-gray text-sm font-sans mb-2" for="email">
              Email
            </label>
            <input class="shadow-lg shadow-zinc-900 rounded-xl w-full py-2 px-3 mb-2 text-grey-darker outline-none focus:ring-pale-gray ring-0 focus:ring-2" id="username" type="text" placeholder="Email">
          </div>
          <div class="mb-6">
            <label class="block text-pale-gray text-sm font-sans mb-2" for="password">
              Password
            </label>
            <input class="shadow-lg shadow-zinc-900 border-red rounded-xl w-full py-2 px-3 text-grey-darker mb-3 outline-none focus:ring-pale-gray ring-0 focus:ring-2" id="password" type="password" placeholder="Password">
          </div>
          <a class="inline-block align-baseline font-sans text-right text-white hover:underline" href="#">
            Forgot Password?
          </a>
          <div class="flex items-center justify-center">
            <button class="bg-pale-gray hover:bg-gray-hover text-white font-sans py-2 px-8 rounded-xl" type="button">
              Sign in
            </button>
          </div>
          <a class="inline-block align-baseline font-sans text-center text-pale-gray hover:text-white hover:underline" href="#">Do you have an account?</a>
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

<style scoped lang="scss">
.login-page {
  @apply w-full h-screen bg-pale-gray;
}

.login-page-content {
  @apply w-full h-screen flex items-center justify-center;
}
</style>
