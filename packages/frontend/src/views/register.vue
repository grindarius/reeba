<template>
  <div class="register-page">
    <div class="register-page-content">
      <form class="register-form-section">
        <div class="register">
          <div class="flex justify-center font-bold scroll-mt-50">
            <img class="mb-1 w-64 h-64" src="@/assets/reeba-logo.png" alt="logo-reeba">
          </div>
          <h1 class="text-4xl text-center text-white">
            Sign up
          </h1>
          <div class="register-section">
            <div class="register-input-section">
              <label class="heading" for="username">
                Username
              </label>
              <div>
                <input class="register-input-box" id="username" type="text" placeholder="Username">
              </div>
            </div>

            <div class="register-input-section">
              <label class="heading" for="email">
                Email
              </label>
              <div>
                <input class="register-input-box" id="email" type="text" placeholder="Email">
              </div>
            </div>

            <div class="register-input-section">
              <label class="heading" for="password">
                Password
              </label>
              <div>
                <input class="register-input-box" id="password" type="password" placeholder="Password">
              </div>
            </div>

            <div class="register-input-section">
              <label class="heading" for="confirm-password">
                Confirm password
              </label>
              <div>
                <input class="register-input-box" id="confirm-password" type="password" placeholder="Confirm password">
              </div>
            </div>
          </div>
          <div class="register-sing-up-section">
            <button class="register-button" type="button">
              Sign up
            </button>
          </div>
          <router-link class="mt-2 inline-block font-sans text-center align-baseline" to="/login">
            <a class="hover:text-white hover:underline text-pale-gray" href="#">
              Already have an account? <a class="font-bold">Sign in</a>.
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
  name: 'register'
})
</script>

<style scoped lang="scss">
.register-page {
  @apply w-full min-h-screen bg-pale-gray;
}

.register-page-content {
  @apply py-7 flex justify-center items-center w-full min-h-screen;
}

.register {
  @apply flex flex-col px-8 pt-6 pb-8 mb-4 rounded-2xl bg-pale-yellow shadow-transparent;
}

.register-form-section {
  @apply w-11/12 rounded-lg pb-8 md:w-3/5  xl:w-1/3;
}

.register-section {
  @apply flex flex-col;
}

.register-input-section {
  @apply mt-1;
}

.heading {
  @apply block mb-2 text-sm text-pale-gray;
}

.register-sing-up-section {
  @apply mt-5 flex justify-center items-center;
}

.register-input-box {
  @apply text-pale-gray py-2 px-3 mb-2 w-full rounded-xl ring-0 shadow-lg outline-none focus:ring-2 shadow-zinc-900 focus:ring-pale-gray;
}

.register-button {
  @apply py-2 px-8 font-sans text-white rounded-xl bg-pale-gray hover:bg-gray-hover;
}
</style>
