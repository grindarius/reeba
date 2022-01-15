<template>
  <div class="login-page">
    <div class="login-page-content">
      <form class="w-11/12 rounded-lg md:w-3/5 xl:w-1/3">
        <div class="flex flex-col px-8 pt-6 pb-8 mb-4 rounded-2xl bg-pale-yellow shadow-transparent">
          <div class="flex justify-center font-bold scroll-mt-50">
            <img class="mb-2 w-64 h-64" src="@/assets/reeba-logo.png" alt="logo-reeba">
          </div>
          <h3 class="text-4xl text-center text-white">
            Login
          </h3>
          <div class="mb-4">
            <label class="block mb-2 font-sans text-sm text-pale-gray" for="email">
              Email
            </label>
            <input class="py-2 px-3 mb-2 w-full rounded-xl ring-0 shadow-lg outline-none focus:ring-2 shadow-zinc-900 text-grey-darker focus:ring-pale-gray" id="username" type="text" placeholder="Email">
          </div>
          <div class="mb-6">
            <label class="block mb-2 font-sans text-sm text-pale-gray" for="password">
              Password
            </label>
            <input class="py-2 px-3 mb-3 w-full rounded-xl ring-0 shadow-lg outline-none focus:ring-2 shadow-zinc-900 border-red text-grey-darker focus:ring-pale-gray" id="password" type="password" placeholder="Password">
          </div>
          <a class="inline-block font-sans text-right text-white align-baseline hover:underline" href="#">
            Forgot Password?
          </a>
          <div class="flex justify-center items-center">
            <button class="py-2 px-8 font-sans text-white rounded-xl bg-pale-gray hover:bg-gray-hover" type="button">
              Sign in
            </button>
          </div>
          <router-link to="/register" class="mt-2 inline-block font-sans text-center align-baseline">
            <a class="hover:text-white hover:underline text-pale-gray" href="#">
              Don't have an account?
            </a>
          </router-link>
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
  @apply flex justify-center items-center w-full h-screen;
}
</style>
