<template>
  <metainfo>
    <template #title="{ content }">
      {{ content }} | ReebA: Ticket booking. Redefined.
    </template>
  </metainfo>
  <h1 class="text-4xl font-semibold text-white">
    Orders
  </h1>
  <div class="block mt-6 lg:hidden">
    <table class="table w-full">
      <thead>
        <tr>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in transactionsDataResponse.transactions" :key="`organizer-transactions-table-small-${t.transactionId}`">
          <th>
            <div class="grid grid-cols-2">
              <div class="font-bold text-md">
                Transaction ID
              </div>
              <div class="font-normal text-md">
                {{ t.transactionId }}
              </div>
              <div class="font-bold text-md">
                Transaction time
              </div>
              <div class="font-normal text-md">
                {{ formatTimeString(t.transactionTime, 'MMMM D, YYYY H:mm:ss') }}
              </div>
              <div class="font-bold text-md">
                Username
              </div>
              <div class="font-normal text-md">
                {{ t.username }}
              </div>
              <div class="font-bold text-md">
                Email
              </div>
              <div class="font-normal text-md">
                {{ t.email }}
              </div>
              <div class="font-bold text-md">
                Phone number
              </div>
              <div class="font-normal text-md">
                {{ `+${t.phoneCountryCode} ${t.phoneNumber}` }}
              </div>
              <div class="font-bold text-md">
                Start time
              </div>
              <div class="font-normal text-md">
                {{ formatTimeString(t.startDatetime, 'MMMM D, YYYY H:mm:ss') }}
              </div>
              <div class="font-bold text-md">
                Section
              </div>
              <div class="font-normal text-md">
                {{ t.sectionName }}
              </div>
              <div class="font-bold text-md">
                Seats
              </div>
              <div class="font-normal text-md">
                {{ t.seats.map(s => s.seatName).join(', ') }}
              </div>
              <div class="font-bold text-md">
                Remove user
              </div>
              <v-mdi name="mdi-delete" class="cursor-pointer" title="Remove user" @click="removeTransaction(t.transactionId)" fill="#ff0000" />
            </div>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="hidden overflow-x-auto mt-6 lg:block">
    <table class="table w-full table-compact">
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Transaction time</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone number</th>
          <th>Start time</th>
          <th>Section</th>
          <th>Seats</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in transactionsDataResponse.transactions" :key="`organizer-transactions-table-big-${t.transactionId}`">
          <td>
            {{ t.transactionId }}
          </td>
          <td>
            {{ formatTimeString(t.transactionTime, 'MMMM D, YYYY H:mm:ss') }}
          </td>
          <td>
            {{ t.username }}
          </td>
          <td>
            {{ t.email }}
          </td>
          <td>
            {{ `+${t.phoneCountryCode} ${t.phoneNumber}` }}
          </td>
          <td>
            {{ formatTimeString(t.startDatetime, 'MMMM D, YYYY H:mm:ss') }}
          </td>
          <td>
            {{ t.sectionName }}
          </td>
          <td>
            {{ t.seats.map(s => s.seatName).join(', ') }}
          </td>
          <td>
            <v-mdi name="mdi-delete" class="cursor-pointer" title="Remove user" @click="removeTransaction(t.transactionId)" fill="#ff0000" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import ky from 'ky'
import { defineComponent, onMounted, Ref, ref } from 'vue'
import { useMeta } from 'vue-meta'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { GetOrganizerEventOrdersReply } from '@reeba/common'

import {
  deleteTransactionEndpoint,
  getOrganizerEventOrdersEndpoint
} from '@/api/endpoints'
import { useAuthStore } from '@/store/use-auth-store'
import { formatTimeString } from '@/utils'

export default defineComponent({
  name: 'organizer-tool-orders',
  setup () {
    const authStore = useAuthStore()
    const route = useRoute()
    const router = useRouter()
    const toast = useToast()

    useMeta({
      title: 'Orders'
    })

    const transactionsDataResponse: Ref<GetOrganizerEventOrdersReply> = ref({
      transactions: []
    })

    onMounted(async () => {
      try {
        const { method, url } = getOrganizerEventOrdersEndpoint({ username: authStore.userData.username, eventId: route.params.eventId as string ?? '' })
        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          }
        }).json<GetOrganizerEventOrdersReply>()

        transactionsDataResponse.value = response
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
    })

    const removeTransaction = async (transactionId: string): Promise<void> => {
      const { method, url } = deleteTransactionEndpoint({ transactionId })

      try {
        await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          }
        })

        toast.success('Successfully removed')
        setTimeout(() => {
          router.go(0)
        }, 2050)
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

        const json = await resp?.json()
        toast.error(json.message)
      }
    }

    return {
      transactionsDataResponse,
      formatTimeString,
      removeTransaction
    }
  }
})
</script>
