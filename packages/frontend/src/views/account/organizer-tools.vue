<template>
  <metainfo>
    <template #title="{ content }">
      {{ content }} | ReebA: Ticket booking. Redefined.
    </template>
  </metainfo>
  <div class="container mx-auto">
    <section class="mt-8">
      <div class="flex flex-row justify-between mb-4">
        <h1 class="page-header">
          Organizer tools
        </h1>
        <div class="flex flex-row gap-3">
          <router-link custom :to="{ name: 'Organizer Settings', query: { ...$route.query, ...{ page: page - 1 } } }" v-slot="{ navigate }">
            <button class="btn btn-circle btn-outline" :disabled="page - 1 === 0" @click="navigate">
              <v-mdi name="mdi-arrow-left-thin" fill="#D5A755" />
            </button>
          </router-link>
          <router-link custom :to="{ name: 'Organizer Settings', query: { ...$route.query, ...{ page: page + 1 } } }" v-slot="{ navigate }">
            <button class="btn btn-circle btn-outline" :disabled="(page * 30) > organizerEventsResponse.total" @click="navigate">
              <v-mdi name="mdi-arrow-right-thin" fill="#D5A755" />
            </button>
          </router-link>
          <select class="max-w-xs select select-ghost">
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
            <tr v-for="e in organizerEventsResponse.events" :key="`organizer-event-small-table-${e.id}`">
              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar">
                    <div class="w-12 h-12 mask mask-squircle">
                      <img :src="`${getEventImage({ eventId: e.id }).url}`" :alt="e.name">
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">
                      {{ e.name }}
                    </div>
                    <div class="text-sm opacity-50">
                      {{ e.id }}
                    </div>
                  </div>
                </div>
                <div class="flex flex-col justify-between">
                  <div class="mt-4">
                    <h1 class="font-bold text-gray-300">
                      Venue
                    </h1>
                    <h1 class="font-normal text-white">
                      {{ e.venueName }} <br>
                      {{ `${e.venueCoordinates.x}, ${e.venueCoordinates.y}` }}
                    </h1>
                  </div>
                  <div class="mt-4">
                    <h1 class="font-bold text-gray-300">
                      Creation date
                    </h1>
                    <h1 class="font-normal text-white">
                      {{ formatTimeString(e.creationDate, 'MMMM D, YYYY H:mm:ss') }}
                    </h1>
                  </div>
                  <div class="mt-4">
                    <h1 class="font-bold text-gray-300">
                      Opening date
                    </h1>
                    <h1 class="font-normal text-white">
                      {{ formatTimeString(e.openingDate, 'MMMM D, YYYY H:mm:ss') }}
                    </h1>
                  </div>
                  <div class="mt-4">
                    <h1 class="font-bold text-gray-300">
                      Status
                    </h1>
                    <span v-show="e.status === 'open'" class="badge">
                      Open
                    </span>
                    <span v-show="e.status === 'closed'" class="badge badge-error">
                      Closed
                    </span>
                  </div>
                  <div class="mt-4">
                    <h1 class="font-bold text-gray-300">
                      Total datetimes
                    </h1>
                    <h1 class="font-normal text-white">
                      {{ e.totalDatetimes }}
                    </h1>
                  </div>
                  <div class="mt-4">
                    <h1 class="font-bold text-gray-300">
                      Total sections
                    </h1>
                    <h1 class="font-normal text-white">
                      {{ e.totalSections }}
                    </h1>
                  </div>
                  <div class="mt-4">
                    <h1 class="font-bold text-gray-300 mb-2">
                      Taken / Total seats
                    </h1>
                    <div class="radial-progress" :style="`--value: ${Math.round(e.seatFullnessPercentage)};`">
                      {{ Math.round(e.seatFullnessPercentage) }}%
                    </div>
                    {{ format(',')(e.totalTakenSeats) }} / {{ format(',')(e.totalSeats) }}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="overflow-x-auto w-full hidden lg:block">
        <table class="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Venue</th>
              <th>Creation date</th>
              <th>Opening date</th>
              <th>Status</th>
              <th>Total datetimes</th>
              <th>Total sections</th>
              <th>Taken / Total seats</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="e in organizerEventsResponse.events" :key="`organizer-event-big-table-${e.id}`">
              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img :src="getEventImage({ eventId: e.id }).url" :alt="e.name">
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">
                      {{ e.name }}
                    </div>
                    <div class="text-sm opacity-50">
                      {{ e.id }}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {{ e.venueName }}
                <br>
                {{ `${e.venueCoordinates.x}, ${e.venueCoordinates.y}` }}
              </td>
              <td>
                {{ formatTimeString(e.creationDate, 'MMMM D, YYYY H:mm:ss') }}
              </td>
              <td>
                {{ formatTimeString(e.openingDate, 'MMMM D, YYYY H:mm:ss') }}
              </td>
              <td>
                <span v-show="e.status === 'open'" class="badge">
                  Open
                </span>
                <span v-show="e.status === 'closed'" class="badge badge-error">
                  Closed
                </span>
              </td>
              <td>
                {{ e.totalDatetimes }}
              </td>
              <td>
                {{ e.totalSections }}
              </td>
              <td>
                <div class="radial-progress" :style="`--value: ${Math.round(e.seatFullnessPercentage)};`">
                  {{ Math.round(e.seatFullnessPercentage) }}%
                </div>
                {{ format(',')(e.totalTakenSeats) }} / {{ format(',')(e.totalSeats) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { format } from 'd3'
import ky from 'ky'
import { defineComponent, onMounted, Ref, ref } from 'vue'
import { useMeta } from 'vue-meta'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { GetOrganizerDataReply } from '@reeba/common'

import { getEventImage, getOrganizerData as getOrganizerDataEndpoint } from '@/api/endpoints'
import { useAuthStore } from '@/store/use-auth-store'
import { formatQueryString, formatTimeString } from '@/utils'

export default defineComponent({
  name: 'organizer-tools',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()
    const toast = useToast()

    useMeta({
      title: 'Organizer tools'
    })

    const page = ref(1)
    const organizerEventsResponse: Ref<GetOrganizerDataReply> = ref({
      total: 0,
      events: []
    })

    const getOrganizerData = async (): Promise<void> => {
      const formattedPage = formatQueryString(route.query.page, '1')
      page.value = Number(formattedPage)

      try {
        const { method, url } = getOrganizerDataEndpoint({ username: authStore.userData.username })

        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          },
          searchParams: [
            ['page', page.value]
          ]
        }).json<GetOrganizerDataReply>()

        organizerEventsResponse.value = response
      } catch (error) {
        // @ts-expect-error error is unknown
        const resp = error?.response

        const json = await resp?.json()

        if (resp.status == null) {
          router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
          return
        }

        if (resp.status === 401) {
          router.push({ name: 'Signin' })
          return
        }

        toast.error(json.message)
      }
    }

    onMounted(async () => {
      await getOrganizerData()
    })

    return {
      organizerEventsResponse,
      getOrganizerData,
      getEventImage,
      format,
      formatTimeString,
      page
    }
  }
})
</script>

<style scoped lang="scss">
.page-header {
  @apply text-4xl font-semibold text-white;
}

.box-bg {
  @apply py-3 px-6 text-xs font-medium tracking-wider leading-4 text-left uppercase border-b border-pale-gray bg-pale-yellow text-pale-gray;
}

.header-box {
  @apply inline-block overflow-hidden min-w-full align-middle border-b shadow sm:rounded-lg border-pale-gray;
}

.active-setting {
  @apply inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full;
}
</style>
