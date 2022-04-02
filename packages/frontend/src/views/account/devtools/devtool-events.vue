<template>
  <metainfo>
    <template #title="{ content }">
      {{ content }} | ReebA: Ticket booking. Redefined.
    </template>
  </metainfo>
  <div class="devtool-events-page">
    <div class="devtool-events-page-content">
      <h1 class="page-header">
        Events
      </h1>
      <div class="events-table">
        <div class="uppercase border-t border-b border-collapse table-cell-string border-t-black border-b-black">
          Title
        </div>
        <div class="uppercase border-t border-b border-collapse table-cell-string border-t-black border-b-black">
          Status
        </div>
        <div class="uppercase border-t border-b border-collapse table-cell-string border-t-black border-b-black">
          Total tickets
        </div>
        <div class="uppercase border-t border-b border-collapse table-cell-string border-t-black border-b-black">
          Sold tickets
        </div>
        <template v-for="ev in eventsRef" :key="JSON.stringify(ev)">
          <div class="py-4 px-5 cursor-pointer" @click="goToEventPage()">
            <h1 class="font-sans text-sm font-medium text-black">
              {{ ev.title }}
            </h1>
            <h1 class="font-sans text-sm font-normal text-gray-500">
              {{ ev.place }}
            </h1>
          </div>
          <div class="flex flex-row justify-start self-start py-4 px-5">
            <span v-if="ev.status === 'closed'" class="inline-flex px-2 text-sm text-red-500 bg-red-100 rounded-2xl">
              Closed
            </span>
            <span v-else class="inline-flex px-2 text-sm text-green-800 bg-green-100 rounded-2xl">
              Open
            </span>
          </div>
          <h1 class="font-mono text-sm font-medium text-black table-cell-string">
            {{ ev.totaltickets }}
          </h1>
          <h1 class="font-mono text-sm font-medium text-black table-cell-string">
            {{ ev.tickets }}
          </h1>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ky from 'ky'
import { defineComponent, onMounted, Ref, ref } from 'vue'
import { useMeta } from 'vue-meta'
import { useRoute, useRouter } from 'vue-router'

import { AdminGetEventDataReply, AdminGetEventDataSortByOption } from '@reeba/common'

import { adminGetEventData } from '@/api/endpoints'
import { eventsDatatable } from '@/constants'
import { useAuthStore } from '@/store/use-auth-store'
import { formatQueryString } from '@/utils'

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
    const sortOption: Ref<AdminGetEventDataSortByOption> = ref('event-name-asc')

    useMeta({
      title: 'Developer tools: Events'
    })

    onMounted(async () => {
      await getAdminEvents()
    })

    const getAdminEvents = async (): Promise<void> => {
      const formattedPage = Number(formatQueryString(route.query.page, '1'))
      const formattedSortOptions = formatQueryString(route.query.sort, 'username-asc')

      page.value = formattedPage
      sortOption.value = formattedSortOptions as AdminGetEventDataSortByOption

      try {
        const { method, url } = adminGetEventData

        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          },
          searchParams: [
            ['page', page.value],
            ['sort', sortOption.value]
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
      goToEventPage
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
