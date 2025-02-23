<template>
  <div class="register-page">
    <div class="register-page-content">
      <form class="register-form-section">
        <div class="register">
          <div class="flex justify-center font-bold scroll-mt-50">
            <img class="mb-1 w-64 h-64" src="@/assets/reeba-logo.png" alt="logo-reeba">
          </div>
          <h1 class="text-4xl font-bold text-center text-white">
            Sign up
          </h1>
          <div class="form-control">
            <label for="signup-username-input" class="label">
              <span class="label-text text-base-100">Username</span>
            </label>
            <input
              type="text" name="signup-username-input"
              id="signup-username-input" placeholder="natusvincere"
              class="w-full bg-white input input-secondary text-base-100"
              v-model="usernameField">
            <label for="signup-email-input" class="label">
              <span class="label-text text-base-100">Email</span>
            </label>
            <input
              type="text" name="signup-email-input"
              id="signup-email-input" placeholder="example@gmail.com"
              class="w-full bg-white input input-secondary text-base-100"
              v-model="emailField">
            <label for="signup-country-code-input" class="label">
              <span class="label-text text-base-100">Phone country code</span>
            </label>
            <select id="signup-country-code-input" class="w-full text-black bg-white select" v-model="phoneCountryCodeField">
              <option disabled selected :value="{ name: '', phoneCode: '', iso31662: '' }">
                Pick your country code
              </option>
              <template v-for="code in phoneCodesList" :key="`signup-phone-code-list-${code.phoneCode}`">
                <option :value="code">
                  {{ countryCodeString(code) }}
                </option>
              </template>
            </select>
            <label for="signup-phone-number-input" class="label">
              <span class="label-text text-base-100">Phone number</span>
            </label>
            <input
              type="tel" name="signup-phone-number-input"
              id="signup-phone-number-input" placeholder="669483943"
              class="w-full bg-white input input-secondary text-base-100"
              v-model="phoneNumberField">
            <label for="signup-password-input" class="label">
              <span class="label-text text-base-100">Password</span>
            </label>
            <input type="password" name="signup-password-input" id="signup-password-input" class="w-full bg-white input input-secondary text-base-100" v-model="passwordField">
            <label for="signup-password-confirm-input" class="label">
              <span class="label-text text-base-100">Confirm password</span>
            </label>
            <input type="password" name="signup-password-confirm-input" id="signup-password-confirm-input" class="w-full bg-white input input-secondary text-base-100" v-model="confirmPasswordField">
            <div class="register-signup-section">
              <button class="register-button" type="button" @click="signup">
                Sign up
              </button>
            </div>
            <router-link class="inline-block mt-2 font-sans text-center align-baseline hover:text-white hover:underline text-pale-gray" to="/signin">
              Already have an account? <a class="font-bold">Sign in</a>.
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { useRouter } from "vue-router"
import { useToast } from "vue-toastification"

import { SignupBody } from "@reeba/common"

import { usePhoneCodes } from "@/composables"
import { useAuthStore } from "@/store/use-auth-store"

export default defineComponent({
  name: "register",
  setup() {
    const authStore = useAuthStore()
    const toast = useToast()
    const router = useRouter()

    const {
      phoneCodesList,
      countryCodeString,
      selectedPhoneCountryCode: phoneCountryCodeField
    } = usePhoneCodes()

    const usernameField = ref("")
    const emailField = ref("")
    const phoneNumberField = ref("")
    const passwordField = ref("")
    const confirmPasswordField = ref("")

    const signup = async (): Promise<void> => {
      const signupCredentials: SignupBody = {
        username: usernameField.value,
        email: emailField.value,
        password: passwordField.value,
        phoneCountryCode: phoneCountryCodeField.value.phoneCode,
        iso31662: phoneCountryCodeField.value.iso31662,
        phoneNumber: phoneNumberField.value
      }

      try {
        await authStore.signup(signupCredentials)
        toast.success("Signup completed")
        router.push({ name: "Signin" })
      } catch (error) {
        // @ts-expect-error unknown error
        const json = await error.response.json()

        toast.error(json.message)
      }
    }

    return {
      usernameField,
      emailField,
      phoneNumberField,
      passwordField,
      confirmPasswordField,
      signup,
      phoneCodesList,
      phoneCountryCodeField,
      countryCodeString
    }
  }
})
</script>

<style scoped lang="scss">
.register-page {
  @apply w-full min-h-screen bg-pale-gray;
}

.register-page-content {
  @apply flex justify-center items-center py-7 w-full min-h-screen;
}

.register {
  @apply flex flex-col px-8 pt-6 pb-8 mb-4 rounded-2xl bg-pale-yellow shadow-transparent;
}

.register-form-section {
  @apply pb-8 w-11/12 rounded-lg md:w-3/5 xl:w-1/3;
}

.register-signup-section {
  @apply flex justify-center items-center mt-5;
}

.register-button {
  @apply py-2 px-8 font-sans text-white rounded-xl bg-pale-gray hover:bg-gray-hover;
}
</style>
