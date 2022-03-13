<template>
  <div class="edit-user-settings-page">
    <h1 class="page-header">
      Edit Settings
    </h1>
    <section class="setting-bg-content">
      <form>
        <div class="flex justify-center">
          <img class="object-cover object-center w-24 h-24 rounded-full" src="@/assets/user.png" alt="Avatar Upload">
        </div>
        <div class="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
          <div>
            <label class="text-header" for="username">Username</label>
            <input id="username" type="text" class="box-text">
          </div>
          <div>
            <label class="text-header" for="emailAddress">Email Address</label>
            <input id="edit-user-settings-email-input" type="email" class="box-text" v-model="email">
          </div>
          <label class="block">
            <div>
              <label class="text-header" for="password">Password</label>
              <input id="password" type="password" class="box-text" v-model="password">
            </div>
          </label>
          <div>
            <label class="text-header" for="passwordConfirmation">Confirm Password</label>
            <input id="edit-user-settings-password-confirmation-input" type="password" class="box-text">
          </div>
          <div>
            <label class="text-header" for="birthday">Birthday</label>
            <input id="birthday" type="date" class="box-text cursor-pointer" v-model="birthdate">
          </div>
          <div class="register-input-section">
            <label class="text-header" for="country-code">
              Phone country code
            </label>
            <div class="inline-block relative bg-white cursor-pointer box-text">
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
          <div>
            <label class="text-header" for="phone-number-input">Phone number</label>
            <input id="phone-number-input" type="tel" class="box-text" v-model="phoneNumber">
          </div>
        </div>
        <div class="flex justify-center mt-10">
          <button class="button-save">
            Save
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import { countries } from 'countries-list'
import ky from 'ky'
import { computed, defineComponent, onMounted, Ref, ref } from 'vue'

// import { useRoute } from 'vue-router'
import { GetUserProfileDataReply } from '@reeba/common'

import { getUserProfileData } from '@/api/endpoints'
import { useModalState } from '@/composables'
// import router from '@/router'
import { useAuthStore } from '@/store/use-auth-store'

interface CountryCode {
  name: string
  phoneCode: string
}
export default defineComponent({
  name: 'edit-user-settings',
  setup () {
    const authStore = useAuthStore()
    const birthdate: Ref<string | null> = ref(null)
    const email: Ref<string | undefined> = ref(undefined)
    const password: Ref<string | undefined> = ref(undefined)
    const phoneNumber: Ref<string | undefined> = ref(undefined)
    const phoneCountryCode: Ref<CountryCode | undefined> = ref(undefined)

    const { state: dropdownState, toggle: toggleDropdown } = useModalState()

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

    const phoneCountryCodeField: Ref<CountryCode> = ref({
      name: 'Thailand',
      phoneCode: '66'
    })

    // const route = useRoute()

    onMounted(async () => {
      const { method, url } = getUserProfileData({ username: authStore.userData.username })

      try {
        const response = await ky(url, {
          method
        }).json<GetUserProfileDataReply>()

        birthdate.value = response.birthdate
        email.value = response.email
        password.value = response.password
        phoneNumber.value = response.phoneNumber
        phoneCountryCode.value = response.phoneCountryCode
      } catch (error) {
      //   router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
      }
    })
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
      birthdate,
      email,
      password,
      phoneNumber,
      phoneCountryCode,
      phoneCountryCodeField,
      toggleDropdown,
      dropdownState,
      phoneCodesList,
      getDropdownClassname,
      onPhoneCountryCodeClicked,
      countryCodeString
    }
  }
})
</script>

<style scoped lang="scss">
.page-header {
  @apply text-4xl font-semibold text-white;
}

.text-header {
  @apply text-base font-bold text-pale-gray;
}

.box-text {
  @apply block py-2 px-4 mt-2 w-full text-gray-700 bg-white rounded-md border border-gray-300 dark:text-black dark:bg-gray-100 dark:border-gray-600 focus:border-blue-500 focus:ring focus:outline-none dark:focus:border-blue-500;
}

.button-save {
  @apply py-2 px-6 leading-10 text-white rounded-md transition-colors duration-200 transform bg-pale-gray hover:bg-gray-hover;
}

.setting-bg-content {
  @apply p-6 mx-auto mt-8 w-full rounded-md shadow-md bg-pale-yellow;
}

.register-input-section {
  @apply mt-1;
}

.link-wrapper:first-child > div {
  @apply rounded-t;
}

.link-wrapper:last-child > div {
  @apply rounded-b;
}

.dropdown-selector {
  @apply block py-2 px-3 whitespace-normal cursor-pointer text-pale-gray;
}

.dropdown-list {
  @apply overflow-y-scroll absolute right-0 left-0 top-auto max-h-52 bg-white rounded-md;
}
</style>
