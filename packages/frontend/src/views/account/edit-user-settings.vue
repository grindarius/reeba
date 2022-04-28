<template>
  <metainfo>
    <template #title="{ content }">
      {{ content }} | ReebA: Ticket booking. Redefined.
    </template>
  </metainfo>
  <div class="container mx-auto">
    <h1 class="page-header">
      Edit Settings
    </h1>
    <section class="setting-bg-content">
      <form>
        <div class="flex flex-col justify-center items-center">
          <img class="object-cover object-center w-24 h-24 rounded-full" ref="userProfileImageRef" :src="getUserAvatarEndpoint({ username: userData.username }).url" alt="Avatar Upload">
          <label for="file-upload" class="btn">
            Change profile
          </label>
          <input type="file" id="file-upload" accept="image/jpg,image/png" class="hidden" @change="uploadNewProfileImage($event)">
        </div>
        <div class="w-full form-control">
          <label for="edit-user-email" class="label">
            <span class="font-semibold label-text">
              Email address
            </span>
          </label>
          <input type="text" placeholder="Type here" name="edit-user-password" class="w-full text-black bg-white input" v-model="email">
          <label for="edit-user-password" class="label">
            <span class="font-semibold label-text">
              Password
            </span>
          </label>
          <input type="password" name="edit-user-password" class="w-full text-black bg-white input" v-model="password">
          <label for="edit-user-password-confirm" class="label">
            <span class="font-semibold label-text">
              Confirm password
            </span>
          </label>
          <input type="password" name="edit-user-password-confirm" class="w-full text-black bg-white input" v-model="confirmPassword">
          <label for="edit-user-country-code" class="label">
            <span class="font-semibold label-text">
              Phone country code
            </span>
          </label>
          <select class="w-full text-black bg-white select" v-model="phoneCountryCode">
            <option disabled :value="{ name: '', phoneCode: '', iso31662: '' }">
              Please select country code
            </option>
            <template v-for="code in phoneCodesList" :key="`edit-user-phone-code-${code.phoneCode}`">
              <option :value="code">
                {{ countryCodeString(code) }}
              </option>
            </template>
          </select>
          <label for="edit-user-phone-number" class="label">
            <span class="font-semibold label-text">
              Phone number
            </span>
          </label>
          <input type="text" placeholder="Type here" name="edit-user-phone-number" class="w-full text-black bg-white input" v-model="phoneNumber">
          <label for="edit-user-birthdate" class="label">
            <span class="font-semibold label-text">
              Birthdate
            </span>
          </label>
          <input type="date" placeholder="Type here" name="edit-user-birthdate" class="w-full text-black bg-white input" v-model="birthdate">
        </div>
        <div class="flex justify-center mt-10">
          <button class="button-save" type="button" @click="updateUserProfileData">
            Save
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import ky from 'ky'
import { storeToRefs } from 'pinia'
import { defineComponent, onMounted, Ref, ref } from 'vue'
import { useMeta } from 'vue-meta'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { GetProfileDataReply, PatchProfileDataRequestBody } from '@reeba/common'

import { getProfileDataEndpoint, getUserAvatarEndpoint, patchProfileDataEndpoint, postAvatarEndpoint } from '@/api/endpoints'
import { usePhoneCodes } from '@/composables'
import { useAuthStore } from '@/store/use-auth-store'

export default defineComponent({
  name: 'edit-user-settings',
  setup () {
    const authStore = useAuthStore()
    const { userData } = storeToRefs(authStore)
    const toast = useToast()
    const router = useRouter()
    const userNewProfileImage: Ref<File | null> = ref(null)

    const {
      phoneCodesList,
      onPhoneCountryCodeClicked,
      countryCodeString,
      findCountryName,
      selectedPhoneCountryCode: phoneCountryCode
    } = usePhoneCodes()

    const email: Ref<string> = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const birthdate: Ref<string> = ref('')
    const phoneNumber: Ref<string> = ref('')

    useMeta({
      title: 'Edit profile'
    })

    const updateUserProfileData = async (): Promise<void> => {
      const editedData: PatchProfileDataRequestBody = {
        email: email.value ?? '',
        password: password.value,
        birthdate: birthdate.value ?? '',
        phoneNumber: phoneNumber.value ?? '',
        phoneCountryCode: phoneCountryCode.value.phoneCode
      }

      if (password.value !== confirmPassword.value) {
        toast.error('Password is not the same')
        return
      }

      const { method, url } = patchProfileDataEndpoint({ username: authStore.userData.username })

      try {
        await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${userData.value.token}`
          },
          json: editedData
        }).json<PatchProfileDataRequestBody>()

        toast.success('Successfully updated!')
      } catch (error) {
        // @ts-expect-error error is unknown
        const json = await error?.response

        if (json.status === 401) {
          toast.error('Token expired')
          router.push({ name: 'Signin' })
          return
        }

        toast.error('Unexpedted error occured')
      }
    }

    const uploadNewProfileImage = async (e: Event): Promise<void> => {
      const files = (e.target as HTMLInputElement)
      userNewProfileImage.value = files.files == null ? null : files.files[0]

      if (userNewProfileImage.value == null) {
        return
      }

      try {
        const { method, url } = postAvatarEndpoint({ username: authStore.userData.username })

        const body = new FormData()
        body.append('image', userNewProfileImage.value, userNewProfileImage.value.name)

        await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          },
          body
        })

        router.go(0)
      } catch (error) {
        // @ts-expect-error error is unknown
        const json = await error?.response

        if (json.status === 401) {
          toast.error('Token expired')
          router.push({ name: 'Signin' })
          return
        }

        toast.error('Unexpedted error occured')
      }
    }

    onMounted(async () => {
      const { method, url } = getProfileDataEndpoint({ username: authStore.userData.username })

      try {
        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${userData.value.token}`
          }
        }).json<GetProfileDataReply>()

        birthdate.value = response.birthdate !== '' ? dayjs(response.birthdate).format('YYYY-MM-DD') : ''
        email.value = response.email
        phoneNumber.value = response.phoneNumber
        phoneCountryCode.value.phoneCode = response.phoneCountryCode

        if (findCountryName(response.phoneCountryCode) == null) {
          phoneCountryCode.value = { name: '', phoneCode: '', iso31662: '' }
        }

        phoneCountryCode.value.name = findCountryName(response.phoneCountryCode) ?? ''
        phoneCountryCode.value.iso31662 = response.iso31662
      } catch (error) {
        // @ts-expect-error error is unknown
        const json = await error?.response

        if (json.status === 401) {
          toast.error('Token expired')
          router.push({ name: 'Signin' })
          return
        }

        toast.error('Unexpedted error occured')
      }
    })

    return {
      uploadNewProfileImage,
      getUserAvatarEndpoint,
      phoneCodesList,
      userData,
      password,
      confirmPassword,
      userNewProfileImage,
      birthdate,
      email,
      phoneNumber,
      phoneCountryCode,
      onPhoneCountryCodeClicked,
      countryCodeString,
      updateUserProfileData
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
  @apply p-6 mx-auto mt-8 w-full rounded-md shadow-md;
}
</style>
