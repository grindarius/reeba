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
              <label class="heading" for="email">
                Phone country code
              </label>
              <div>
                <div class="register-input-box bg-white inline-block relative">
                  <div class="flex justify-between items-center" @click="toggleDropdown">
                    <span>{{ `${selectedCountryCode.name} (+${selectedCountryCode.phoneCode})` }}</span>
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path fill="#000" d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                  <ul :class="dropdownState ? 'dropdown-list block' : 'dropdown-list hidden'">
                    <li class="link-wrapper" v-for="(v, i) in phoneCodesList" :key="`country-code-dropdown-${i}`">
                      <div :class="getDropdownClassname(v)">
                        {{ `${v.name} (+${v.phoneCode})` }}
                      </div>
                    </li>
                  </ul>
                </div>
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
            Already have an account? <a class="font-bold">Sign in</a>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { countries } from 'countries-list'
import { computed, defineComponent, ref } from 'vue'

import { useModalState } from '@/composables'

export default defineComponent({
  name: 'register',
  setup () {
    const { state: dropdownState, toggle: toggleDropdown } = useModalState()

    const passwordField = ref('')
    const confirmPasswordField = ref('')

    const selectedCountryCode = ref({
      name: 'Thailand',
      phoneCode: '66'
    })

    const phoneCodesList = computed(() => {
      return Object.values(countries).flatMap(ct => {
        const phoneCodeArray = ct.phone.split(',')

        return phoneCodeArray.map(code => {
          return {
            name: ct.name,
            phoneCode: code
          }
        })
      })
    })

    const onCredentialsSubmit = (): void => {
      if (passwordField.value === confirmPasswordField.value) {
        console.log('submit credentials')
      }
    }

    const getDropdownClassname = (v: { name: string, phoneCode: string }) => {
      if (selectedCountryCode.value != null && v.name === selectedCountryCode.value.name && v.phoneCode === selectedCountryCode.value.phoneCode) {
        return 'dropdown-selector selected'
      }

      return 'dropdown-selector not-selected'
    }

    return {
      passwordField,
      confirmPasswordField,
      onCredentialsSubmit,
      getDropdownClassname,
      dropdownState,
      phoneCodesList,
      toggleDropdown,
      selectedCountryCode
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
  @apply absolute top-auto left-0 right-0 max-h-52 overflow-x-scroll;
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
  @apply bg-slate-700 text-white;
}

.not-selected {
  @apply bg-slate-900 text-white;
}

.dropdown-selector {
  @apply block py-2 px-3 whitespace-normal cursor-pointer bg-white text-pale-gray;
}
</style>
