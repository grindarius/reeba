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
        <div class="w-full form-control">
          <label for="edit-user-email" class="label">
            <span class="font-semibold text-black label-text">
              Email address
            </span>
          </label>
          <input type="text" placeholder="Type here" name="edit-user-password" class="w-full text-black bg-white input" v-model="email">
          <label for="edit-user-password" class="label">
            <span class="font-semibold text-black label-text">
              Password
            </span>
          </label>
          <input type="password" name="edit-user-password" class="w-full text-black bg-white input" v-model="password">
          <label for="edit-user-password-confirm" class="label">
            <span class="font-semibold text-black label-text">
              Confirm password
            </span>
          </label>
          <input type="password" name="edit-user-password-confirm" class="w-full text-black bg-white input" v-model="confirmPassword">
          <label for="edit-user-country-code" class="label">
            <span class="font-semibold text-black label-text">
              Phone country code
            </span>
          </label>
          <select class="w-full text-black bg-white select" v-model="phoneCountryCode">
            <option disabled :value="{ name: '', phoneCode: '' }">
              Please select country code
            </option>
            <template v-for="code in phoneCodesList" :key="`edit-user-phone-code-${code.phoneCode}`">
              <option :value="code">
                {{ countryCodeString(code) }}
              </option>
            </template>
          </select>
          <label for="edit-user-phone-number" class="label">
            <span class="font-semibold text-black label-text">
              Phone number
            </span>
          </label>
          <input type="text" placeholder="Type here" name="edit-user-phone-number" class="w-full text-black bg-white input" v-model="phoneNumber">
          <label for="edit-user-birthdate" class="label">
            <span class="font-semibold text-black label-text">
              Birthdate
            </span>
          </label>
          <input type="datetime-local" placeholder="Type here" name="edit-user-birthdate" class="w-full text-black bg-white input" v-model="birthdate">
        </div>
        <div class="flex justify-center mt-10">
          <button class="button-save" type="button" @click="save">
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
import { useToast } from 'vue-toastification'

import { GetProfileDataReply, PatchProfileDataRequestBody } from '@reeba/common'

import { getUserAvatar, getUserProfileData, patchUserProfileData } from '@/api/endpoints'
import { usePhoneCodes } from '@/composables'
import { useAuthStore } from '@/store/use-auth-store'

export default defineComponent({
  name: 'edit-user-settings',
  setup () {
    const authStore = useAuthStore()
    const { userData } = storeToRefs(authStore)
    const toast = useToast()
    const {
      phoneCodesList,
      onPhoneCountryCodeClicked,
      countryCodeString,
      findCountryName,
      selectedPhoneCountryCode: phoneCountryCode
    } = usePhoneCodes()

    const email: Ref<string | undefined> = ref(undefined)
    const password = ref('')
    const confirmPassword = ref('')
    const birthdate: Ref<string> = ref('')
    const phoneNumber: Ref<string | undefined> = ref(undefined)

    const save = async (): Promise<void> => {
      const saveProfileEdit: PatchProfileDataRequestBody = {
        email: email.value ?? '',
        password: password.value,
        birthdate: birthdate.value ?? '',
        phoneNumber: phoneNumber.value ?? '',
        phoneCountryCode: phoneCountryCode.value.phoneCode
      }

      if (password.value !== confirmPassword.value) {
        toast.error('Password Mistake')
        return
      }
      toast.success('Save Complete')
      const { method, url } = patchUserProfileData({ username: authStore.userData.username })
      try {
        await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${userData.value.token}`
          },
          json: saveProfileEdit
        }).json<PatchProfileDataRequestBody>()
      } catch (error) {
        console.log(error)
      }
    }
    onMounted(async () => {
      const { method, url } = getUserProfileData({ username: authStore.userData.username })

      try {
        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${userData.value.token}`
          }
        }).json<GetProfileDataReply>()

        birthdate.value = response.birthdate
        email.value = response.email
        phoneNumber.value = response.phoneNumber
        phoneCountryCode.value.phoneCode = response.phoneCountryCode

        if (findCountryName(response.phoneCountryCode) == null) {
          phoneCountryCode.value = { name: '', phoneCode: '' }
        }
        phoneCountryCode.value.name = findCountryName(response.phoneCountryCode) ?? ''
      } catch (error) {
        console.log(error)
      }
    })

    return {
      getUserAvatar,
      phoneCodesList,
      userData,
      password,
      confirmPassword,
      birthdate,
      email,
      phoneNumber,
      phoneCountryCode,
      onPhoneCountryCodeClicked,
      countryCodeString,
      save
    }
  }
})
</script>

<style scoped lang="scss">
.page-header {
  @apply text-4xl font-semibold text-white;
}

.button-save {
  @apply py-2 px-6 leading-10 text-white rounded-md transition-colors duration-200 transform bg-pale-gray hover:bg-gray-hover;
}

.setting-bg-content {
  @apply p-6 mx-auto mt-8 w-full rounded-md shadow-md bg-pale-yellow;
}
</style>
