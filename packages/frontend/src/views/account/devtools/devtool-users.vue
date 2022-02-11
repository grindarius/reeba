<template>
  <div class="devtool-users-page">
    <div class="container">
      <h1 class="text-4xl font-semibold text-white">
        Users
      </h1>
      <div id="user-table" class="grid mt-8 w-full rounded-lg bg-pale-yellow">
        <div class="uppercase border-t border-b border-collapse table-cell-string border-t-black border-b-black">
          Name
        </div>
        <div class="uppercase border-t border-b border-collapse table-cell-string border-t-black border-b-black">
          Birthdate
        </div>
        <div class="uppercase border-t border-b border-collapse table-cell-string border-t-black border-b-black">
          Role
        </div>
        <div class="uppercase border-t border-b border-collapse table-cell-string border-t-black border-b-black" />
        <template v-for="(user, i) in userRef" :key="JSON.stringify(user)">
          <div class="flex flex-row gap-4 items-center py-4 px-5 cursor-pointer" @click="goToUsersPage(i)">
            <img src="@/assets/user.png" alt="user" class="w-8 h-8 rounded-full">
            <div>
              <h1 class="font-sans text-sm font-medium text-black">
                {{ user.username }}
              </h1>
              <h1 class="font-sans text-sm font-normal text-gray-500">
                {{ user.email }}
              </h1>
            </div>
          </div>
          <h1 class="font-sans text-sm font-medium text-black table-cell-string">
            {{ formatBirthdate(user.birthdate) }}
          </h1>
          <div class="flex flex-row justify-start self-start py-4 px-5">
            <span v-if="user.role === 0" class="inline-flex px-2 text-sm text-red-500 bg-red-100 rounded-2xl">
              Admin
            </span>
            <span v-else class="inline-flex px-2 text-sm text-green-800 bg-green-100 rounded-2xl">
              User
            </span>
          </div>
          <div class="table-cell-string">
            <v-mdi class="cursor-pointer" name="mdi-delete-sweep" fill="#423E41" @click="deleteUser(i)" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

import { users } from '@/constants/devtools-users'

export default defineComponent({
  name: 'devtool-users',
  setup () {
    const router = useRouter()

    const userRef = ref(users)

    const formatBirthdate = (birthdate: string): string => {
      return dayjs(birthdate).format('MMMM D, YYYY')
    }

    const deleteUser = (index: number): void => {
      if (userRef.value[index].role === 0) {
        return
      }

      userRef.value.splice(index, 1)
    }

    const goToUsersPage = (index: number): void => {
      router.push('/users')
      console.log(index)
    }

    return {
      userRef,
      formatBirthdate,
      deleteUser,
      goToUsersPage
    }
  }
})
</script>

<style scoped lang="scss">
#user-table {
  grid-template-columns: 2fr 1fr 0.5fr 0.5fr;
}

.devtool-users-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.table-cell-string {
  @apply py-4 px-5 text-sm text-left;
}
</style>
