<template>
  <div class="devtool-users-page">
    <div class="container">
      <div class="flex flex-row justify-between mb-4">
        <h1 class="page-header">
          {{ userData.total }} users
        </h1>
        <div class="flex flex-row gap-3">
          <router-link custom :to="{ name: 'Developer Users', query: { page: page - 1 } }" v-slot="{ navigate }">
            <button class="btn btn-circle btn-outline" :disabled="page - 1 === 0" @click="navigate">
              <v-mdi name="mdi-arrow-left-thin" fill="#D5A755" />
            </button>
          </router-link>
          <router-link custom :to="{ name: 'Developer Users', query: { page: page + 1} }" v-slot="{ navigate }">
            <button class="btn btn-circle btn-outline" :disabled="(page * 30) > userData.total" @click="navigate">
              <v-mdi name="mdi-arrow-right-thin" fill="#D5A755" />
            </button>
          </router-link>
          <select class="select select-ghost max-w-xs" v-model="sortOptions">
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
        small
      </div>
      <div class="hidden lg:block">
        <div class="overflow-x-auto w-full">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Registration date</th>
                <th>Is admin</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in userData.users" :key="user.username">
                <td>
                  <div class="flex items-center space-x-3">
                    <div class="avatar">
                      <div class="mask mask-squircle w-12 h-12">
                        <img :src="`${getUserAvatar({ username: user.username }).url}`" :alt="user.username">
                      </div>
                    </div>
                    <div>
                      <div class="font-bold">
                        {{ user.username }}
                        <v-mdi v-if="user.isAdmin ? false : user.isVerified" name="mdi-check-decagram" fill="#D5A755" title="Verified" />
                        <v-mdi v-if="user.isAdmin" name="mdi-crown" title="Admin" size="30" fill="#D5A755" />
                      </div>
                      <div class="text-sm opacity-50">
                        {{ user.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {{ formatTimeString(user.registrationDatetime, 'MMMM D, YYYY HH:mm:ss') }}
                </td>
                <td>{{ user.isAdmin }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ky from 'ky'
import { defineComponent, onMounted, Ref, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { AdminGetUserDataOptions, AdminGetUserDataReply } from '@reeba/common'

import { adminGetUserData, getUserAvatar } from '@/api/endpoints'
import { useAuthStore } from '@/store/use-auth-store'
import { formatQueryString, formatTimeString } from '@/utils'

export default defineComponent({
  name: 'devtool-users',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()

    const sortOptions: Ref<AdminGetUserDataOptions> = ref('name-asc')
    const userData: Ref<AdminGetUserDataReply> = ref({ total: 0, users: [] })
    const page = ref(1)

    watch(sortOptions, async () => {
      await getAdminUsers()
    })

    const getAdminUsers = async (): Promise<void> => {
      const formattedPage = Number(formatQueryString(route.query.page, '1'))
      page.value = formattedPage

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
        }

        if (resp.status === 401) {
          router.push({ name: 'Signin' })
        }

        if (resp.status === 403) {
          router.push({ name: 'Home' })
        }

        router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
      }
    }

    onMounted(async () => {
      await getAdminUsers()
    })

    return {
      page,
      getUserAvatar,
      userData,
      sortOptions,
      formatTimeString
    }
  }
})
</script>

<style scoped lang="scss">
.user-table {
  @apply grid mt-8 w-full rounded-lg bg-pale-yellow;
  grid-template-columns: 2fr 1fr 0.5fr 0.5fr;
}

.devtool-users-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.table-cell-string {
  @apply py-4 px-5 text-sm text-left;
}

.page-header {
  @apply text-4xl font-semibold text-white;
}
</style>
