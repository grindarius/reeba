<template>
  <h1 class="text-4xl font-semibold text-white">
    Orders
  </h1>
  <div class="block lg:hidden mt-6">
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
              <div class="text-md font-bold">
                Transaction ID
              </div>
              <div class="text-md font-normal">
                {{ t.transactionId }}
              </div>
              <div class="text-md font-bold">
                Transaction time
              </div>
              <div class="text-md font-normal">
                {{ formatTimeString(t.transactionTime, 'MMMM D, YYYY H:mm:ss') }}
              </div>
              <div class="text-md font-bold">
                Username
              </div>
              <div class="text-md font-normal">
                {{ t.username }}
              </div>
              <div class="text-md font-bold">
                Email
              </div>
              <div class="text-md font-normal">
                {{ t.email }}
              </div>
              <div class="text-md font-bold">
                Phone number
              </div>
              <div class="text-md font-normal">
                {{ `+${t.phoneCountryCode} ${t.phoneNumber}` }}
              </div>
              <div class="text-md font-bold">
                Start time
              </div>
              <div class="text-md font-normal">
                {{ formatTimeString(t.startDatetime, 'MMMM D, YYYY H:mm:ss') }}
              </div>
              <div class="text-md font-bold">
                Section name
              </div>
              <div class="text-md font-normal">
                {{ t.sectionName }}
              </div>
              <div class="text-md font-bold">
                Seat names
              </div>
              <div class="text-md font-normal">
                {{ t.seats.map(s => s.seatName).join(', ') }}
              </div>
            </div>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="hidden lg:block overflow-x-auto mt-6">
    <table class="table table-compact w-full">
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Transaction time</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone number</th>
          <th>Start time</th>
          <th>Section name</th>
          <th>Seat names</th>
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
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import ky from 'ky'
import { defineComponent, onMounted, Ref, ref } from 'vue'
import { useRoute } from 'vue-router'

import { GetOrganizerEventOrdersReply } from '@reeba/common'

import {
  getOrganizerOrdersOverview
} from '@/api/endpoints'
import { useAuthStore } from '@/store/use-auth-store'
import { formatTimeString } from '@/utils'

export default defineComponent({
  name: 'organizer-tool-orders',
  setup () {
    const authStore = useAuthStore()
    const route = useRoute()

    const transactionsDataResponse: Ref<GetOrganizerEventOrdersReply> = ref({
      transactions: []
    })

    onMounted(async () => {
      const { method, url } = getOrganizerOrdersOverview({ username: authStore.userData.username, eventId: route.params.eventId as string ?? '' })
      const response = await ky(url, {
        method,
        headers: {
          Authorization: `Bearer ${authStore.userData.token}`
        }
      }).json<GetOrganizerEventOrdersReply>()

      transactionsDataResponse.value = response
    })

    return {
      transactionsDataResponse,
      formatTimeString
    }
  }
})
</script>
