<template>
  <div class="edit-user-settings-page">
    <h1 class="page-header">
      Edit Settings
    </h1>
    <section class="setting-bg-content">
      <form>
        <div class="flex justify-center">
          <img class="object-cover object-center w-24 h-24 rounded-full" :src="getUserAvatar({ username: userData.username }).url" alt="Avatar Upload">
        </div>
        <div class="form-control w-full">
          <label for="edit-user-email" class="label">
            <span class="label-text text-black font-semibold">
              Email address
            </span>
          </label>
          <input type="text" placeholder="Type here" name="edit-user-password" class="input bg-white w-full">
          <label for="edit-user-password" class="label">
            <span class="label-text text-black font-semibold">
              Password
            </span>
          </label>
          <input type="password" name="edit-user-password" class="input bg-white w-full">
          <label for="edit-user-password-confirm" class="label">
            <span class="label-text text-black font-semibold">
              Confirm password
            </span>
          </label>
          <input type="password" name="edit-user-password-confirm" class="input bg-white w-full">
          <label for="edit-user-country-code" class="label">
            <span class="label-text text-black font-semibold">
              Phone country code
            </span>
          </label>
          <select class="select w-full text-black" v-model="phoneCountryCode">
            <option disabled :value="{ name: '', phoneCode: '' }">
              Please select country code
            </option>
            <template v-for="code in phoneCodesList" :key="`edit-user-phone-code-${code.phoneCode}`">
              <option :value="code">
                {{ countryCodeString(code) }}
              </option>
            </template>
          </select>
          <input type="text" placeholder="Type here" name="edit-user-country-code" class="input bg-white w-full">
          <label for="edit-user-phone-number" class="label">
            <span class="label-text text-black font-semibold">
              Phone number
            </span>
          </label>
          <input type="text" placeholder="Type here" name="edit-user-phone-number" class="input bg-white w-full">
          <label for="edit-user-birthdate" class="label">
            <span class="label-text text-black font-semibold">
              Birthdate
            </span>
          </label>
          <input type="text" placeholder="Type here" name="edit-user-birthdate" class="input bg-white w-full">
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
import ky from 'ky'
import { storeToRefs } from 'pinia'
import { defineComponent, onMounted, Ref, ref } from 'vue'

import { GetUserProfileDataReply } from '@reeba/common'

import { getUserAvatar, getUserProfileData } from '@/api/endpoints'
import { usePhoneCodes } from '@/composables'
import { useAuthStore } from '@/store/use-auth-store'
import { CountryCode } from '@/types'

export default defineComponent({
  name: 'edit-user-settings',
  setup () {
    const authStore = useAuthStore()
    const { userData } = storeToRefs(authStore)

    const {
      phoneCodesList,
      selectedPhoneCountryCode: phoneCountryCode,
      onPhoneCountryCodeClicked,
      countryCodeString
    } = usePhoneCodes()

    const birthdate: Ref<string> = ref('')
    const email: Ref<string | undefined> = ref(undefined)
    const password: Ref<string | undefined> = ref(undefined)
    const phoneNumber: Ref<string | undefined> = ref(undefined)

    onMounted(async () => {
      const { method, url } = getUserProfileData({ username: authStore.userData.username })

      try {
        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${userData.value.token}`
          }
        }).json<GetUserProfileDataReply>()

        birthdate.value = response.birthdate
        email.value = response.email
        password.value = response.password
        phoneNumber.value = response.phoneNumber
        phoneCountryCode.value = response.phoneCountryCode
      } catch (error) {
      }
    })

    return {
      getUserAvatar,
      phoneCodesList,
      userData,
      birthdate,
      email,
      password,
      phoneNumber,
      phoneCountryCode,
      phoneCountryCodeField,
      onPhoneCountryCodeClicked,
      phoneCountryCode,
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
