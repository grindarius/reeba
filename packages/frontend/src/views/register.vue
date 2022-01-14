<template>
  <div class="register-page">
    <div class="register-page-content">
      <form class="w-11/12 rounded-lg mt-52 md:w-3/5  xl:w-1/3">
        <div class="flex flex-col px-8 pt-6 pb-8 mb-4 rounded-2xl bg-pale-yellow shadow-transparent">
          <div class="flex justify-center font-bold mt-50">
            <img class="mb-1 w-64 h-64" src="@/assets/reeba-logo.png" alt="logo-reeba">
          </div>
          <h1 class="text-4xl text-center text-white">
            Register
          </h1>
          <h2 class="mt-3 text-base text-center text-white">
            Enter your credentials to get access account
          </h2>
          <div class="flex flex-col">
            <div class="mt-4">
              <label class="block mb-2 text-sm text-pale-gray" for="username">
                Username
              </label>
              <div>
                <input class="py-2 px-3 mb-2 w-full rounded-xl ring-0 shadow-lg outline-none focus:ring-2 shadow-zinc-900 text-grey-darker focus:ring-pale-gray" id="username" type="text" placeholder="Username">
              </div>
            </div>

            <div class="mt-4">
              <label class="block mb-2 text-sm text-pale-gray" for="email">
                Email
              </label>
              <div>
                <input class="py-2 px-3 mb-2 w-full rounded-xl ring-0 shadow-lg outline-none focus:ring-2 shadow-zinc-900 text-grey-darker focus:ring-pale-gray" id="email" type="text" placeholder="Email">
              </div>
            </div>

            <div class="mt-4">
              <label class="block mb-2 text-sm text-pale-gray" for="password">
                Password
              </label>
              <div>
                <input class="py-2 px-3 mb-2 w-full rounded-xl ring-0 shadow-lg outline-none focus:ring-2 shadow-zinc-900 border-red text-grey-darker focus:ring-pale-gray" id="password" type="password" placeholder="Password">
              </div>
            </div>

            <div class="mt-4">
              <label class="block mb-2 text-sm text-pale-gray" for="confirm-password">
                Confirm password
              </label>
              <div>
                <input class="py-2 px-3 mb-2 w-full rounded-xl ring-0 shadow-lg outline-none focus:ring-2 shadow-zinc-900 text-grey-darker focus:ring-pale-gray" id="confirm-password" type="password" placeholder="Confirm password">
              </div>
            </div>
          </div>
          <div class="mt-5 flex justify-center items-center">
            <button class="py-2 px-8 font-sans text-white rounded-xl bg-pale-gray hover:bg-gray-hover" type="button">
              Sign up
            </button>
          </div>
          <div class="mt-2 flex justify-center items-center">
            <a class="inline-block font-sans text-center align-baseline hover:text-white hover:underline text-pale-gray" href="#">Do you have an account?</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'register'
})
</script>

<style scoped lang="scss">
.register-page {
  @apply w-full h-screen bg-pale-gray;
}

.register-page-content {
  @apply flex justify-center items-center w-full h-screen;
}
</style>
