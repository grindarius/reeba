<template>
  <metainfo>
    <template #title="{ content }">
      {{ content }} | ReebA: Ticket booking. Redefined.
    </template>
  </metainfo>
  <div class="devtool-events-page">
    <div class="container">
      <div class="flex flex-col md:flex-row justify-between mb-4 w-full">
        <h1 class="page-header">
          Events
        </h1>
        <div class="flex flex-col md:flex-row gap-3">
          <div class="flex flex-row gap-3">
            <router-link custom :to="{ name: 'Developer Events', query: { ...$route.query, ...{ page: page - 1 } } }" v-slot="{ navigate }">
              <button class="btn btn-circle btn-outline" :disabled="page - 1 === 0" @click="navigate">
                <v-mdi name="mdi-arrow-left-thin" fill="#D5A755" />
              </button>
            </router-link>
            <router-link custom :to="{ name: 'Developer Events', query: { ...$route.query, ...{ page: page + 1 } } }" v-slot="{ navigate }">
              <button class="btn btn-circle btn-outline" :disabled="(page * 30) > eventsList.total" @click="navigate">
                <v-mdi name="mdi-arrow-right-thin" fill="#D5A755" />
              </button>
            </router-link>
          </div>
          <select class="max-w-xs select select-ghost" v-model="sortOptions">
            <option value="event-name-asc">
              <h1 class="font-bold">
                Sort by
              </h1> event name ↑
            </option>
            <option value="event-name-desc">
              <h1 class="font-bold">
                Sort by
              </h1> event name ↓
            </option>
            <option value="username-asc">
              <h1 class="font-bold">
                Sort by
              </h1> creator name ↑
            </option>
            <option value="username-desc">
              <h1 class="font-bold">
                Sort by
              </h1> creator name ↓
            </option>
            <option value="creation-date-asc">
              <h1 class="font-bold">
                Sort by
              </h1> creation date ↑
            </option>
            <option value="creation-date-desc">
              <h1 class="font-bold">
                Sort by
              </h1> creation date ↓
            </option>
            <option value="opening-date-asc">
              <h1 class="font-bold">
                Sort by
              </h1> opening date ↑
            </option>
            <option value="opening-date-desc">
              <h1 class="font-bold">
                Sort by
              </h1> opening date ↓
            </option>
            <option value="status-asc">
              <h1 class="font-bold">
                Sort by
              </h1> event status ↑
            </option>
            <option value="status-desc">
              <h1 class="font-bold">
                Sort by
              </h1> event status ↓
            </option>
            <option value="seat-fullness-percentage-asc">
              <h1 class="font-bold">
                Sort by
              </h1> seat fullness percentage ↑
            </option>
            <option value="seat-fullness-percentage-desc">
              <h1 class="font-bold">
                Sort by
              </h1> seat fullness percentage ↓
            </option>
            <option value="total-seats-asc">
              <h1 class="font-bold">
                Sort by
              </h1> total seats ↑
            </option>
            <option value="total-seats-desc">
              <h1 class="font-bold">
                Sort by
              </h1> total seats ↓
            </option>
            <option value="total-taken-seats-asc">
              <h1 class="font-bold">
                Sort by
              </h1> total taken seats ↑
            </option>
            <option value="total-taken-seats-desc">
              <h1 class="font-bold">
                Sort by
              </h1> total taken seats ↓
            </option>
          </select>
        </div>
      </div>
      <!-- <div class="block lg:hidden">
        lol
      </div> -->
      <div class="hidden lg:block overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>Event name</th>
              <th>Creation date</th>
              <th>Opening date</th>
              <th>Ticket price range</th>
              <th>Minimum age</th>
              <th>Taken / Total seats</th>
              <th>Event status</th>
              <th>Event venue</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ev in eventsList.events" :key="`developer-events-big-table-${ev.id}`">
              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar">
                    <div class="w-12 h-12 mask mask-squircle">
                      <img :src="getEventImage({ eventId: ev.id }).url" :alt="ev.name">
                    </div>
                  </div>
                  <div>
                    <router-link :to="{ name: 'Event', params: { username: ev.username, eventId: ev.id } }">
                      <div class="font-bold">
                        {{ ev.name }}
                      </div>
                    </router-link>
                    <router-link :to="{ name: 'Users', params: { username: ev.username } }">
                      <div class="text-sm opacity-50">
                        {{ ev.username }}
                      </div>
                    </router-link>
                  </div>
                </div>
              </td>
              <td>
                {{ formatTimeString(ev.creationDate, 'MMMM D, YYYY H:mm:ss') }}
              </td>
              <td>
                {{ formatTimeString(ev.openingDate, 'MMMM D, YYYY H:mm:ss') }}
              </td>
              <td>
                {{ format(',')(ev.minTicketPrice) }} / {{ format(',')(ev.maxTicketPrice) }}
              </td>
              <td>
                {{ ev.minimumAge === 0 ? 'None' : ev.minimumAge }}
              </td>
              <td>
                <div class="radial-progress" :style="`--value: ${Math.round(ev.seatFullnessPercentage)};`">
                  {{ Math.round(ev.seatFullnessPercentage) }}%
                </div>
                {{ format(',')(ev.totalTakenSeats) }} / {{ format(',')(ev.totalSeats) }}
              </td>
              <td>
                <span v-show="ev.status === 'open'" class="badge">
                  Open
                </span>
                <span v-show="ev.status === 'closed'" class="badge badge-error">
                  Closed
                </span>
              </td>
              <td>
                <a :href="`https://www.google.com/maps/search/?api=1&query=${ev.venueCoordinates.x},${ev.venueCoordinates.y}`" class="link" target="_blank" rel="noopener">
                  {{ ev.venueName }}
                </a>
              </td>
              <td>
                <div class="dropdown dropdown-end">
                  <label tabindex="0" class="btn btn-ghost">
                    Options
                  </label>
                  <ul class="p-2 w-52 shadow dropdown-content menu bg-base-200 rounded-box">
                    <li>
                      <a>
                        Close event
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
  </div>
</template>

<script lang="ts">
import {
  format
} from 'd3'
import ky from 'ky'
import { defineComponent, onMounted, Ref, ref, watch } from 'vue'
import { useMeta } from 'vue-meta'
import { useRoute, useRouter } from 'vue-router'

import {
  AdminGetEventDataReply,
  AdminGetEventDataSortByOption
} from '@reeba/common'

import { adminGetEventData, getEventImage } from '@/api/endpoints'
import { eventsDatatable } from '@/constants'
import { useAuthStore } from '@/store/use-auth-store'
import {
  formatQueryString, formatTimeString
} from '@/utils'

export default defineComponent({
  name: 'devtool-events',
  setup () {
    const eventsRef = ref(eventsDatatable)
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()

    const eventsList: Ref<AdminGetEventDataReply> = ref({
      total: 0,
      events: []
    })

    const page = ref(1)
    const sortOptions: Ref<AdminGetEventDataSortByOption> = ref('event-name-asc')

    useMeta({
      title: 'Developer tools: Events'
    })

    onMounted(async () => {
      await getAdminEvents()
    })

    watch(sortOptions, async (now) => {
      router.replace({
        name: 'Developer Events',
        query: {
          ...route.query,
          ...{ sort: now }
        }
      })
    })

    const getAdminEvents = async (): Promise<void> => {
      const formattedPage = Number(formatQueryString(route.query.page, '1'))
      const formattedSortOptions = formatQueryString(route.query.sort, 'username-asc')

      page.value = formattedPage
      sortOptions.value = formattedSortOptions as AdminGetEventDataSortByOption

      try {
        const { method, url } = adminGetEventData

        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          },
          searchParams: [
            ['page', page.value],
            ['sort', sortOptions.value]
          ]
        }).json<AdminGetEventDataReply>()

        eventsList.value.total = response.total
        eventsList.value.events = response.events
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

    const goToEventPage = (): void => {
      router.push('/event')
    }

    return {
      eventsRef,
      eventsList,
      goToEventPage,
      getEventImage,
      format,
      formatTimeString,
      page,
      sortOptions
    }
  }
})
</script>

<style scoped lang="scss">
.devtool-events-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.devtool-events-page-content {
  @apply container;
}

.page-header {
  @apply text-4xl font-semibold text-white;
}

.table-cell-string {
  @apply py-4 px-5 text-sm text-left;
}

.events-table {
  @apply grid mt-8 w-full rounded-lg bg-pale-yellow;
  grid-template-columns: 2fr 1fr 1fr 1fr;
}
</style>
