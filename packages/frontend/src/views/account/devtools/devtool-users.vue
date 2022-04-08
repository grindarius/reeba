<template>
  <metainfo>
    <template #title="{ content }">
      {{ content }} | ReebA: Ticket booking. Redefined.
    </template>
  </metainfo>
  <div class="container mx-auto">
    <div class="flex flex-row justify-between mb-4">
      <h1 class="page-header">
        {{ userData.total }} users
      </h1>
      <div class="flex flex-row gap-3">
        <router-link custom :to="{ name: 'Developer Users', query: { ...$route.query, ...{ page: page - 1 } } }" v-slot="{ navigate }">
          <button class="btn btn-circle btn-outline" :disabled="page - 1 === 0" @click="navigate">
            <v-mdi name="mdi-arrow-left-thin" fill="#D5A755" />
          </button>
        </router-link>
        <router-link custom :to="{ name: 'Developer Users', query: { ...$route.query, ...{ page: page + 1 } } }" v-slot="{ navigate }">
          <button class="btn btn-circle btn-outline" :disabled="(page * 30) > userData.total" @click="navigate">
            <v-mdi name="mdi-arrow-right-thin" fill="#D5A755" />
          </button>
        </router-link>
        <select class="max-w-xs select select-ghost" v-model="sortOptions">
          <option value="name-asc">
            <h1 class="font-bold">
              Sort by
            </h1> name ↑
          </option>
          <option value="name-desc">
            <h1 class="font-bold">
              Sort by
            </h1> name ↓
          </option>
          <option value="regis-asc">
            <h1 class="font-bold">
              Sort by
            </h1> registration date ↑
          </option>
          <option value="regis-desc">
            <h1 class="font-bold">
              Sort by
            </h1> registration date ↓
          </option>
        </select>
      </div>
    </div>
    <div class="block lg:hidden">
      <table class="table w-full">
        <thead>
          <tr>
            <th>
              Data
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, i) in userData.users" :key="`developer-user-table-small-${user.username}`">
            <td>
              <div class="flex items-center space-x-3">
                <div class="avatar">
                  <div class="w-12 h-12 mask mask-squircle">
                    <img :src="`${getUserAvatar({ username: user.username }).url}`" :alt="user.username">
                  </div>
                </div>
                <div>
                  <router-link :to="{ name: 'Users', params: { username: user.username } }">
                    <div class="font-bold">
                      {{ user.username }}
                      <v-mdi v-if="user.isVerified" name="mdi-check-decagram" fill="#D5A755" title="Verified" />
                      <v-mdi v-if="user.isAdmin" name="mdi-crown" title="Admin" size="30" fill="#D5A755" />
                    </div>
                  </router-link>
                  <div class="text-sm opacity-50">
                    {{ user.email }}
                  </div>
                </div>
              </div>
              <div class="flex flex-col justify-start">
                <div class="mt-4">
                  <h1 class="font-bold text-gray-300">
                    Birthdate
                  </h1>
                  <h1 class="font-normal text-white">
                    {{ user.birthdate == null ? 'Unspecified' : formatTimeString(user.birthdate, 'MMMM D, YYYY') }}
                  </h1>
                </div>
                <div class="mt-4">
                  <h1 class="font-bold text-gray-300">
                    Registration date
                  </h1>
                  <h1 class="font-normal text-white">
                    {{ formatTimeString(user.registrationDatetime, 'MMMM D, YYYY H:mm:ss') }}
                  </h1>
                </div>
                <div class="mt-4">
                  <h1 class="font-bold text-gray-300">
                    Country
                  </h1>
                  <h1 class="font-normal text-white">
                    {{ getName(user.iso31662, 'en') ?? 'Unknown' }}
                  </h1>
                </div>
                <div class="mt-4">
                  <h1 class="font-bold text-gray-300">
                    Phone number
                  </h1>
                  <h1 class="font-normal text-white">
                    {{ `+${user.phoneCountryCode} ${user.phoneNumber}` }}
                  </h1>
                </div>
                <div class="flex flex-row justify-end">
                  <div :class="dropdownClass(i)" v-show="authStore.userData.username !== user.username">
                    <label tabindex="0" class="btn btn-ghost">Options</label>
                    <ul tabindex="0" class="p-2 w-52 shadow dropdown-content menu bg-base-200 rounded-box">
                      <li>
                        <a @click="grantAdmin(user.username)">
                          Make admin
                        </a>
                      </li>
                      <li>
                        <a @click="revokeAdmin(user.username)">
                          Remove admin
                        </a>
                      </li>
                      <li>
                        <a @click="grantVerification(user.username)">
                          Make verified account
                        </a>
                      </li>
                      <li>
                        <a @click="revokeVerification(user.username)">
                          Unverify account
                        </a>
                      </li>
                      <li>
                        <a @click="removeUser(user.username)">
                          Remove from ReebA
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="hidden overflow-x-auto w-full lg:block">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Birthdate</th>
            <th>Registration date</th>
            <th>Country</th>
            <th>Phone number</th>
            <th>
              <div class="ml-4">
                Options
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, i) in userData.users" :key="`developer-users-table-big-${user.username}`">
            <td>
              <div class="flex items-center space-x-3">
                <div class="avatar">
                  <div class="w-12 h-12 mask mask-squircle">
                    <img :src="`${getUserAvatar({ username: user.username }).url}`" :alt="user.username">
                  </div>
                </div>
                <div>
                  <router-link :to="{ name: 'Users', params: { username: user.username } }">
                    <div class="font-bold">
                      {{ user.username }}
                      <v-mdi v-if="user.isVerified" name="mdi-check-decagram" fill="#D5A755" title="Verified" />
                      <v-mdi v-if="user.isAdmin" name="mdi-crown" title="Admin" size="30" fill="#D5A755" />
                    </div>
                  </router-link>
                  <div class="text-sm opacity-50">
                    {{ user.email }}
                  </div>
                </div>
              </div>
            </td>
            <td>
              {{ user.birthdate == null ? 'Unspecified' : formatTimeString(user.birthdate, 'MMMM D, YYYY') }}
            </td>
            <td>
              {{ formatTimeString(user.registrationDatetime, 'MMMM D, YYYY H:mm:ss') }}
            </td>
            <td>
              {{ getName(user.iso31662, 'en') ?? 'Unknown' }}
            </td>
            <td>
              {{ `+${user.phoneCountryCode} ${user.phoneNumber}` }}
            </td>
            <td>
              <div :class="dropdownClass(i)" v-show="authStore.userData.username !== user.username">
                <label tabindex="0" class="btn btn-ghost">Options</label>
                <ul tabindex="0" class="p-2 w-52 shadow dropdown-content menu bg-base-200 rounded-box">
                  <li>
                    <a @click="grantAdmin(user.username)">
                      Make admin
                    </a>
                  </li>
                  <li>
                    <a @click="revokeAdmin(user.username)">
                      Remove admin
                    </a>
                  </li>
                  <li>
                    <a @click="grantVerification(user.username)">
                      Make verified account
                    </a>
                  </li>
                  <li>
                    <a @click="revokeVerification(user.username)">
                      Unverify account
                    </a>
                  </li>
                  <li>
                    <a @click="removeUser(user.username)">
                      Remove from ReebA
                    </a>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { getName } from 'i18n-iso-countries'
import ky from 'ky'
import { defineComponent, onMounted, Ref, ref, watch } from 'vue'
import { useMeta } from 'vue-meta'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { AdminGetUserDataOptions, AdminGetUserDataReply } from '@reeba/common'

import {
  adminGetUserData,
  adminGrantAdmin,
  adminGrantVerification,
  adminRemoveUser,
  adminRevokeAdmin,
  adminRevokeVerification,
  getUserAvatar
} from '@/api/endpoints'
import { useAuthStore } from '@/store/use-auth-store'
import { formatQueryString, formatTimeString } from '@/utils'

export default defineComponent({
  name: 'devtool-users',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()
    const toast = useToast()

    useMeta({
      title: 'Developer tools: Users'
    })

    const sortOptions: Ref<AdminGetUserDataOptions> = ref('name-asc')
    const userData: Ref<AdminGetUserDataReply> = ref({ total: 0, users: [] })
    const page = ref(1)

    watch(sortOptions, async (now) => {
      router.replace({
        name: 'Developer Users',
        query: {
          ...route.query,
          ...{ sort: now }
        }
      })
    })

    const getAdminUsers = async (): Promise<void> => {
      const formattedPage = Number(formatQueryString(route.query.page, '1'))
      const formattedSortOptions = formatQueryString(route.query.sort, 'name-asc')

      page.value = formattedPage
      sortOptions.value = formattedSortOptions as AdminGetUserDataOptions

      try {
        const { method, url } = adminGetUserData

        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          },
          searchParams: [
            ['page', page.value],
            ['sort', sortOptions.value]
          ]
        }).json<AdminGetUserDataReply>()

        userData.value.total = response.total
        userData.value.users = response.users
      } catch (error) {
        // @ts-expect-error error is unknown
        const resp = error?.response

        if (resp.status == null) {
          router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
          return
        }

        if (resp.status === 401) {
          router.push({ name: 'Signin' })
          return
        }

        if (resp.status === 403) {
          router.push({ name: 'Home' })
          return
        }

        router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
      }
    }

    const grantAdmin = async (username: string): Promise<void> => {
      try {
        const { method, url } = adminGrantAdmin({ username })

        await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          }
        })

        toast.success('Granted admin successfully')
        setTimeout(() => {
          router.go(0)
        }, 2050)
      } catch (error) {
        // @ts-expect-error error is unknown
        const json = await error?.response.json()
        toast.error(json.message)
      }
    }

    const revokeAdmin = async (username: string): Promise<void> => {
      try {
        const { method, url } = adminRevokeAdmin({ username })

        await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          }
        })

        toast.success('Revoke admin successfully')
        setTimeout(() => {
          router.go(0)
        }, 2050)
      } catch (error) {
        // @ts-expect-error error is unknown
        const json = await error?.response.json()
        toast.error(json.message)
      }
    }

    const grantVerification = async (username: string): Promise<void> => {
      try {
        const { method, url } = adminGrantVerification({ username })

        await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          }
        })

        toast.success('Grant verified status successfully')
        setTimeout(() => {
          router.go(0)
        }, 2050)
      } catch (error) {
        // @ts-expect-error error is unknown
        const json = await error?.response.json()
        toast.error(json.message)
      }
    }

    const revokeVerification = async (username: string): Promise<void> => {
      try {
        const { method, url } = adminRevokeVerification({ username })

        await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          }
        })

        toast.success('Revoke verified status successfully')
        setTimeout(() => {
          router.go(0)
        }, 2050)
      } catch (error) {
        // @ts-expect-error error is unknown
        const json = await error?.response.json()
        toast.error(json.message)
      }
    }

    const removeUser = async (username: string): Promise<void> => {
      try {
        const { method, url } = adminRemoveUser({ username })

        await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          }
        })

        toast.success('User removed successfully')
        setTimeout(() => {
          router.go(0)
        }, 2050)
      } catch (error) {
        // @ts-expect-error error is unknown
        const json = await error?.response.json()
        toast.error(json.message)
      }
    }

    const dropdownClass = (i: number) => {
      if (userData.value.users.length - i < 6) {
        return 'dropdown dropdown-end dropdown-top'
      }

      return 'dropdown dropdown-end'
    }

    onMounted(async () => {
      await getAdminUsers()
    })

    return {
      page,
      getName,
      getUserAvatar,
      dropdownClass,
      userData,
      authStore,
      sortOptions,
      formatTimeString,
      grantAdmin,
      revokeAdmin,
      grantVerification,
      revokeVerification,
      removeUser
    }
  }
})
</script>

<style scoped lang="scss">
.devtool-users-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.page-header {
  @apply text-4xl font-semibold text-white;
}
</style>
