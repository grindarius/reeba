<template>
  <div class="devtool-users-page">
    <div class="container">
      <h1 class="text-4xl font-semibold text-white">
        Users
      </h1>
      <div id="user-table" class="grid mt-8 bg-pale-yellow rounded-lg w-full">
        <div class="table-cell-string uppercase border-t border-b border-t-black border-b-black border-collapse">
          Name
        </div>
        <div class="table-cell-string uppercase border-t border-b border-t-black border-b-black border-collapse">
          Birthdate
        </div>
        <div class="table-cell-string uppercase border-t border-b border-t-black border-b-black border-collapse">
          Role
        </div>
        <div class="table-cell-string uppercase border-t border-b border-t-black border-b-black border-collapse" />
        <template v-for="(user, i) in userRef" :key="JSON.stringify(user)">
          <div class="py-4 px-5 flex flex-row gap-4 items-center cursor-pointer" @click="goToUsersPage(i)">
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
          <h1 class="table-cell-string font-sans text-sm font-medium text-black">
            {{ formatBirthdate(user.birthdate) }}
          </h1>
          <div class="py-4 px-5 flex flex-row justify-start self-start">
            <span v-if="user.role === 0" class="inline-flex text-sm bg-red-100 text-red-500 rounded-2xl px-2">
              Admin
            </span>
            <span v-else class="inline-flex text-sm bg-green-100 text-green-800 rounded-2xl px-2">
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
  @apply text-left text-sm py-4 px-5;
}
</style>
