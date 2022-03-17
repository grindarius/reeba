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
            <input type="text" name="signup-username-input" placeholder="natusvincere" class="input input-secondary bg-white text-base-100 w-full" v-model="usernameField">
            <label for="signup-email-input" class="label">
              <span class="label-text text-base-100">Email</span>
            </label>
            <input type="text" name="signup-email-input" placeholder="example@gmail.com" class="input input-secondary bg-white text-base-100 w-full" v-model="emailField">
            <label for="signup-country-code-input" class="label">
              <span class="label-text text-base-100">Phone country code</span>
            </label>
            <select class="select w-full bg-white text-black">
              <option disabled selected :value="{ name: '', phoneCode: '' }">
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
            <input type="tel" name="signup-phone-number-input" placeholder="669483943" class="input input-secondary bg-white text-base-100 w-full" v-model="phoneNumberField">
            <label for="signup-password-input" class="label">
              <span class="label-text text-base-100">Password</span>
            </label>
            <input type="password" name="signup-password-input" class="input input-secondary bg-white text-base-100 w-full" v-model="passwordField">
            <label for="signup-password-confirm-input" class="label">
              <span class="label-text text-base-100">Comfirm password</span>
            </label>
            <input type="password" name="signup-password-confirm-input" class="input input-secondary bg-white text-base-100 w-full" v-model="confirmPasswordField">
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
import { countries } from 'countries-list'
import { computed, defineComponent, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { SignupBody } from '@reeba/common'

import { useAuthStore } from '@/store/use-auth-store'

interface CountryCode {
  name: string
  phoneCode: string
}

export default defineComponent({
  name: 'register',
  setup () {
    const authStore = useAuthStore()
    const toast = useToast()
    const router = useRouter()

    const usernameField = ref('')
    const emailField = ref('')
    const phoneCountryCodeField: Ref<CountryCode> = ref({ name: '', phoneCode: '' })
    const phoneNumberField = ref('')
    const passwordField = ref('')
    const confirmPasswordField = ref('')

    const phoneCodesList = computed(() => {
      return Object.values(countries).flatMap(ct => {
        const phoneCodeArray = ct.phone.split(',')

        return phoneCodeArray.map(code => {
          const ret: CountryCode = {
            name: ct.name,
            phoneCode: code
          }

          return ret
        })
      })
    })

    const signup = async (): Promise<void> => {
      const signupCredentials: SignupBody = {
        username: usernameField.value,
        email: emailField.value,
        password: passwordField.value,
        phoneCountryCode: phoneCountryCodeField.value.phoneCode,
        phoneNumber: phoneNumberField.value
      }

      try {
        await authStore.signup(signupCredentials)
        toast.success('Signup completed')
        router.push({ name: 'Signin' })
      } catch (error) {
        // @ts-expect-error unknown error
        toast.error(error.message)
      }
    }

    const onPhoneCountryCodeClicked = (index: number): void => {
      phoneCountryCodeField.value = phoneCodesList.value[index]
    }

    const countryCodeString = (code: CountryCode): string => {
      return `${code.name} (+${code.phoneCode})`
    }

    const getDropdownClassname = (code: CountryCode) => {
      if (phoneCountryCodeField.value != null && code.name === phoneCountryCodeField.value.name && code.phoneCode === phoneCountryCodeField.value.phoneCode) {
        return 'dropdown-selector selected'
      }

      return 'dropdown-selector not-selected'
    }

    return {
      usernameField,
      emailField,
      phoneNumberField,
      passwordField,
      confirmPasswordField,
      signup,
      getDropdownClassname,
      phoneCodesList,
      phoneCountryCodeField,
      onPhoneCountryCodeClicked,
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
