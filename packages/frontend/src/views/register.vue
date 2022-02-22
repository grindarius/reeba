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
          <div class="register-section">
            <div class="register-input-section">
              <label class="heading" for="username">
                Username
              </label>
              <div>
                <input class="register-input-box" id="username" type="text" placeholder="Username" v-model="usernameField">
              </div>
            </div>
            <div class="register-input-section">
              <label class="heading" for="email">
                Email
              </label>
              <div>
                <input class="register-input-box" id="email" type="text" placeholder="Email" v-model="emailField">
              </div>
            </div>

            <div class="register-input-section">
              <label class="heading" for="country-code">
                Phone country code
              </label>
              <div class="inline-block relative bg-white cursor-pointer register-input-box">
                <div class="flex justify-between items-center" @click="toggleDropdown">
                  <span>{{ `${phoneCountryCodeField.name} (+${phoneCountryCodeField.phoneCode})` }}</span>
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path fill="#000" d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
                <ul :class="dropdownState ?'dropdown-list block' : 'dropdown-list hidden'">
                  <li class="link-wrapper" v-for="(v, i) in phoneCodesList" :key="`country-code-dropdown-${i}`">
                    <div :class="getDropdownClassname(v)" @click="onPhoneCountryCodeClicked(i)">
                      {{ countryCodeString(v) }}
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div class="register-input-section">
              <label class="heading" for="phone-number-input">
                Phone number
              </label>
              <div>
                <input class="register-input-box" id="phone-number-input" type="tel" placeholder="Phone number" v-model="phoneNumberField">
              </div>
            </div>

            <div class="register-input-section">
              <label class="heading" for="password">
                Password
              </label>
              <div>
                <input class="register-input-box" id="password" type="password" placeholder="Password" v-model="passwordField">
              </div>
            </div>

            <div class="register-input-section">
              <label class="heading" for="confirm-password">
                Confirm password
              </label>
              <div>
                <input class="register-input-box" id="confirm-password" type="password" placeholder="Confirm password" v-model="confirmPasswordField">
              </div>
            </div>
          </div>
          <div class="register-sing-up-section">
            <button class="register-button" type="button" @click="onCredentialsSubmit">
              Sign up
            </button>
          </div>
          <router-link class="inline-block mt-2 font-sans text-center align-baseline hover:text-white hover:underline text-pale-gray" to="/signin">
            Already have an account? <a class="font-bold">Sign in</a>.
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { countries } from 'countries-list'
import { computed, defineComponent, Ref, ref } from 'vue'

import { useModalState } from '@/composables'

interface CountryCode {
  name: string
  phoneCode: string
}

export default defineComponent({
  name: 'register',
  setup () {
    const { state: dropdownState, toggle: toggleDropdown } = useModalState()

    const usernameField = ref('')
    const emailField = ref('')
    const phoneCountryCodeField: Ref<CountryCode> = ref({
      name: 'Thailand',
      phoneCode: '66'
    })
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

    const onCredentialsSubmit = (): void => {
      if (passwordField.value === confirmPasswordField.value) {
        console.log('submit credentials')
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
      onCredentialsSubmit,
      getDropdownClassname,
      dropdownState,
      phoneCodesList,
      toggleDropdown,
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

.dropdown-list {
  @apply overflow-y-scroll absolute right-0 left-0 top-auto max-h-52;
}

.link-wrapper:first-child > div {
  @apply rounded-t;
}

.link-wrapper:last-child > div {
  @apply rounded-b;
}

.register {
  @apply flex flex-col px-8 pt-6 pb-8 mb-4 rounded-2xl bg-pale-yellow shadow-transparent;
}

.register-form-section {
  @apply pb-8 w-11/12 rounded-lg md:w-3/5 xl:w-1/3;
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
  @apply flex justify-center items-center mt-5;
}

.register-input-box {
  @apply py-2 px-3 mb-2 w-full rounded-xl ring-0 shadow-lg outline-none focus:ring-2 text-pale-gray shadow-zinc-900 focus:ring-pale-gray;
}

.register-button {
  @apply py-2 px-8 font-sans text-white rounded-xl bg-pale-gray hover:bg-gray-hover;
}

.selected {
  @apply bg-zinc-300;
}

.not-selected {
  @apply bg-white;
}

.dropdown-selector {
  @apply block py-2 px-3 whitespace-normal cursor-pointer text-pale-gray;
}
</style>
