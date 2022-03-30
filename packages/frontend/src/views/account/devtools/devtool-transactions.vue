<template>
  <metainfo>
    <template #title="{ content }">
      {{ content }} | ReebA: Ticket booking. Redefined.
    </template>
  </metainfo>
  <div class="devtool-transactions-page">
    <div class="container">
      <div class="flex flex-row justify-between">
        <h1 class="page-header">
          {{ transactionData.total }} transactions
        </h1>
        <div class="flex flex-row gap-3">
          <router-link custom :to="{ name: 'Developer Transactions', query: { ...$route.query, ...{ page: page - 1 } } }" v-slot="{ navigate }">
            <button class="btn btn-circle btn-outline" :disabled="page - 1 === 0" @click="navigate">
              <v-mdi name="mdi-arrow-left-thin" fill="#D5A755" />
            </button>
          </router-link>
          <router-link custom :to="{ name: 'Developer Transactions', query: { ...$route.query, ...{ page: page + 1 } } }" v-slot="{ navigate }">
            <button class="btn btn-circle btn-outline" :disabled="(page * 30) > transactionData.total" @click="navigate">
              <v-mdi name="mdi-arrow-right-thin" fill="#D5A755" />
            </button>
          </router-link>
          <select class="select select-ghost max-w-xs" v-model="sort">
            <option value="time-asc">
              <h1 class="font-bold">
                Sort by
              </h1> transaction time ↑
            </option>
            <option value="time-desc">
              <h1 class="font-bold">
                Sort by
              </h1> transaction time ↓
            </option>
            <option value="price-asc">
              <h1 class="font-bold">
                Sort by
              </h1> price ↑
            </option>
            <option value="price-desc">
              <h1 class="font-bold">
                Sort by
              </h1> price ↓
            </option>
            <option value="username-asc">
              <h1 class="font-bold">
                Sort by
              </h1> username ↑
            </option>
            <option value="username-desc">
              <h1 class="font-bold">
                Sort by
              </h1> username ↓
            </option>
          </select>
        </div>
      </div>
      <div class="block lg:hidden">
        <table class="table w-full">
          <thead>
            <tr>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactionData.transactions" :key="`developer-transactions-table-small-${transaction.transactionId}`">
              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img :src="getUserAvatar({ username: transaction.username }).url" :alt="transaction.username">
                    </div>
                  </div>
                  <div>
                    <router-link :to="{ name: 'Users', params: { username: transaction.username } }">
                      <div class="font-bold">
                        {{ transaction.username }}
                      </div>
                    </router-link>
                  </div>
                </div>
                <h1 class="font-bold text-gray-300 mt-4">
                  Transaction ID
                </h1>
                <h1 class="font-normal text-white">
                  {{ transaction.transactionId }}
                </h1>
                <h1 class="font-bold text-gray-300 mt-4">
                  Transaction time
                </h1>
                <h1 class="font-normal text-white">
                  {{ formatTimeString(transaction.time, 'MMMM D, YYYY H:mm:ss') }}
                </h1>
                <h1 class="font-bold text-gray-300 mt-4">
                  Price
                </h1>
                <h1 class="font-normal text-white">
                  THB {{ format(',')(transaction.totalPriceWithVat) }}
                </h1>
                <div class="dropdown dropdown-end" v-show="authStore.userData.username !== transaction.username">
                  <label tabindex="0" class="btn btn-ghost">Options</label>
                  <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
                    <li>
                      <router-link :to="{ name: 'Receipt', params: { transactionId: transaction.transactionId } }">
                        See transaction
                      </router-link>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="hidden lg:block">
        <table class="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Transaction ID</th>
              <th>Transaction time</th>
              <th>Price</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactionData.transactions" :key="`developer-transactions-table-big-${transaction.transactionId}`">
              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img :src="getUserAvatar({ username: transaction.username }).url" :alt="transaction.username">
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">
                      {{ transaction.username }}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {{ transaction.transactionId }}
              </td>
              <td>
                {{ formatTimeString(transaction.time, 'MMMM D, YYYY H:mm:ss') }}
              </td>
              <td>
                THB {{ format(',')(transaction.totalPriceWithVat) }}
              </td>
              <th>
                <div class="dropdown dropdown-end" v-show="authStore.userData.username !== transaction.username">
                  <label tabindex="0" class="btn btn-ghost">Options</label>
                  <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
                    <li>
                      <router-link :to="{ name: 'Receipt', params: { transactionId: transaction.transactionId } }">
                        See transaction
                      </router-link>
                    </li>
                  </ul>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { format } from 'd3'
import ky from 'ky'
import { defineComponent, onMounted, Ref, ref, watch } from 'vue'
import { useMeta } from 'vue-meta'
import { useRoute, useRouter } from 'vue-router'

import {
  AdminGetTransactionDataReply,
  AdminGetTransactionDataSortByOption
} from '@reeba/common'

import { adminGetTransactionData, getUserAvatar } from '@/api/endpoints'
import { useAuthStore } from '@/store/use-auth-store'
import { formatQueryString, formatTimeString } from '@/utils'

export default defineComponent({
  name: 'devtool-transactions',
  setup () {
    const transactionData: Ref<AdminGetTransactionDataReply> = ref({ total: 0, transactions: [] })
    const authStore = useAuthStore()
    const router = useRouter()
    const route = useRoute()

    const page = ref(1)
    const sort: Ref<AdminGetTransactionDataSortByOption> = ref('time-asc')

    useMeta({
      title: 'Developer tools: Transactions'
    })

    watch(sort, async (now) => {
      router.replace({
        name: 'Developer Transactions',
        query: {
          ...route.query,
          ...{ sort: now }
        }
      })
    })

    const getAdminTransactions = async (): Promise<void> => {
      const formattedPage = Number(formatQueryString(route.query.page, '1'))
      const formattedSortOptions = formatQueryString(route.query.sort, 'time-asc')

      page.value = formattedPage
      sort.value = formattedSortOptions as AdminGetTransactionDataSortByOption

      try {
        const { method, url } = adminGetTransactionData

        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          },
          searchParams: [
            ['page', page.value],
            ['sort', sort.value]
          ]
        }).json<AdminGetTransactionDataReply>()

        transactionData.value.total = response.total
        transactionData.value.transactions = response.transactions
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

    onMounted(async () => {
      await getAdminTransactions()
    })

    return {
      transactionData,
      getAdminTransactions,
      getUserAvatar,
      authStore,
      format,
      page,
      sort,
      formatTimeString
    }
  }
})
</script>

<style scoped lang="scss">
.devtool-transactions-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.page-header {
  @apply text-4xl font-semibold text-white mb-6;
}

.table-cell-string {
  @apply py-4 px-5 text-sm text-left;
}

.transaction-table {
  @apply grid mt-8 w-full rounded-lg bg-pale-yellow;
  grid-template-columns: 2fr 1fr 1fr;
}
</style>
