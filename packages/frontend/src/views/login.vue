<template>
  <div class="login-page">
    <div class="login-page-content">
      <form class="w-11/12 rounded-lg md:w-3/5 xl:w-1/3">
        <div class="flex flex-col px-8 pt-6 pb-8 mb-4 rounded-2xl bg-pale-yellow shadow-transparent">
          <div class="flex justify-center font-bold scroll-mt-50">
            <img class="mb-2 w-64 h-64" src="@/assets/reeba-logo.png" alt="logo-reeba">
          </div>
          <h3 class="text-4xl font-bold text-center text-white">
            Sign in
          </h3>
          <div class="form-control w-full">
            <label for="signin-email-input" class="label">
              <span class="label-text text-base-100">Email</span>
            </label>
            <input type="text" name="signin-email-input" placeholder="example@gmail.com" class="input input-bordered w-full" v-model="emailField">
            <label class="label">
              <span class="label-text text-base-100">
                Password
              </span>
            </label>
            <input type="password" name="signin-email-input" class="input input-bordered w-full" v-model="passwordField">
          </div>
          <a class="inline-block mt-2 font-sans text-right text-white align-baseline hover:underline" href="#">
            Forgot Password?
          </a>
          <div class="flex justify-center items-center">
            <button class="btn btn-secondary" @click.prevent="signin">
              Sign in
            </button>
          </div>
          <router-link to="/signup" class="inline-block mt-2 font-sans text-center align-baseline hover:text-white hover:underline text-pale-gray">
            Don't have an account? <a class="font-bold">Sign up</a>.
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { useAuthStore } from '@/store/use-auth-store'

export default defineComponent({
  name: 'login',
  setup () {
    const authStore = useAuthStore()
    const router = useRouter()
    const toast = useToast()

    const emailField = ref('')
    const passwordField = ref('')

    const signin = async (): Promise<void> => {
      if (emailField.value.length === 0 || passwordField.value.length === 0) {
        toast.error('Email or password cannot be empty')
        return
      }

      try {
        await authStore.signin({ email: emailField.value, password: passwordField.value })
        toast.success('Authentication completed')
        router.push('/')
      } catch (error) {
        // @ts-expect-error error is unknown
        toast.error(error.message)
      }
    }

    return {
      emailField,
      passwordField,
      signin
    }
  }
})
</script>

<style scoped lang="scss">
.login-page {
  @apply w-full min-h-screen bg-pale-gray;
}

.login-page-content {
  @apply flex justify-center items-center py-7 w-full min-h-screen;
}
</style>
