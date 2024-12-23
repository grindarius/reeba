<template>
  <metainfo>
    <template #title="{ content }">
      {{ content }} | ReebA: Ticket booking. Redefined.
    </template>
  </metainfo>
  <img class="float-none" src="@/assets/hero-logo.jpg">
  <div class="all-events-page">
    <div class="container w-full min-h-screen">
      <div class="official-events-box">
        <div class="event-section">
          <h1 class="text-main-event-name">
            All events
          </h1>
          <div v-if="eventData.events.length === 0" class="w-full text-center">
            <span class="text-4xl text-white">No events</span>
          </div>
          <div v-else class="event-grid-box">
            <div class="event" v-for="({username, id: eventId, name: eventName, firstDatetime, venueName}, i) in eventData.events" :key="`all-events-page-event-${i}`">
              <router-link :to="{ name: 'Event', params: { username, eventId }}">
                <div class="event-image-box">
                  <img class="event-image" :src="`${getEventImageEndpoint({ eventId }).url}`" :alt="eventName">
                </div>
                <div class="event-info">
                  <div>
                    <h3 class="event-name">
                      {{ eventName }}
                    </h3>
                    <p class="event-time">
                      {{ formatTimeString(firstDatetime) }}
                    </p>
                    <p class="event-location">
                      {{ venueName }}
                    </p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ky from "ky"
import { defineComponent, onMounted, Ref, ref } from "vue"
import { useMeta } from "vue-meta"
import { useRoute, useRouter } from "vue-router"

import { GetAllEventsReply } from "@reeba/common"

import { getAllEventsEndpoint, getEventImageEndpoint } from "@/api/endpoints"
import { formatTimeString } from "@/utils"

export default defineComponent({
  name: "all-events",
  setup() {
    const router = useRouter()
    const route = useRoute()

    useMeta({
      title: "All events"
    })

    const eventData: Ref<GetAllEventsReply> = ref({
      events: []
    })
    const { method, url } = getAllEventsEndpoint

    onMounted(async () => {
      try {
        const response = await ky(url, { method }).json<GetAllEventsReply>()

        eventData.value.events = response.events ?? []
      } catch (error) {
        router.push({
          name: "Not Found",
          params: { pathMatch: route.path.substring(1).split("/") },
          query: route.query,
          hash: route.hash
        })
      }
    })

    return {
      eventData,
      getEventImageEndpoint,
      formatTimeString
    }
  }
})
</script>

<style scoped lang="scss">
.all-events-page {
  @apply flex flex-row justify-center bg-pale-gray;
}

.text-main-event-name {
  @apply font-sans text-4xl font-bold text-white;
}

.event-section {
  @apply py-10 px-10 mx-auto max-w-2xl sm:py-12 sm:px-6 lg:px-8 lg:max-w-7xl;
}

.event-grid-box {
  @apply grid grid-cols-1 gap-x-6 gap-y-10 mt-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8;
}

.event {
  @apply rounded-lg shadow-xl transition duration-200 ease-in-out delay-100 cursor-pointer hover:scale-105 hover:-translate-y-1;
}

.event-image-box {
  @apply overflow-hidden bg-gray-200 rounded-t-lg group-hover:opacity-75;
}

.event-image {
  @apply object-cover w-full h-96;
}

.event-info {
  @apply flex object-cover flex-col justify-self-start pl-2 h-24 rounded-b-lg bg-pale-yellow;
}

.event-name {
  @apply mt-0.5 text-lg font-medium text-black truncate;
}

.event-time {
  @apply mt-1 text-sm font-normal text-white truncate;
}

.event-location {
  @apply mt-1 text-sm font-normal text-white truncate;
}
</style>
