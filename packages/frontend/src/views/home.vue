<template>
  <div class="home-page">
    <div class="container w-full min-h-screen">
      <div class="official-events-box">
        <div class="event-section">
          <h1 class="text-main-event-name">
            Official events
          </h1>
          <div class="event-grid-box">
            <div class="event" v-for="({id, name, firstDatetime, venueName}, i ) in eventData.official" :key="`root-page-official-event-${i}`">
              <router-link :to="{ name: 'Event', params: { eventId: id }}">
                <div class="event-image-box">
                  <img class="event-image" :src="`http://localhost:3000/event-images/${id}`" alt="event-image">
                </div>
                <div class="event-info">
                  <div>
                    <h3 class="event-name">
                      {{ name }}
                    </h3>
                    <p class="event-time">
                      {{ getTimeString(firstDatetime) }}
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

      <div class="local-events-box">
        <div class="event-section">
          <h1 class="text-main-event-name">
            Local events
          </h1>
          <div class="event-grid-box">
            <div class="event" v-for="({id, name, firstDatetime, venueName}, i ) in eventData.local " :key="`root-page-local-event-${i}`">
              <router-link :to="{ name: 'Event', params: { eventId: id }}">
                <div class="event-image-box">
                  <img class="event-image" :src="`http://localhost:3000/event-images/${id}`" alt="event-image">
                </div>
                <div class="event-info">
                  <div>
                    <h3 class="event-name">
                      {{ name }}
                    </h3>
                    <p class="event-time">
                      {{ firstDatetime }}
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
import dayjs from 'dayjs'
import ky from 'ky'
import { defineComponent, onMounted, Ref, ref } from 'vue'

import { GetEventsReply } from '@reeba/common'

import { getRootPageEvents } from '@/api/endpoints'

export default defineComponent({
  name: 'home',
  setup () {
    const eventData: Ref<GetEventsReply> = ref({
      official: [],
      local: []
    })
    const { method, url } = getRootPageEvents

    onMounted(async () => {
      try {
        const response = await ky(url, { method }).json<GetEventsReply>()

        eventData.value.official = response.official ?? []
        eventData.value.local = response.local ?? []
      } catch (error) {
        console.error(error)
      }
    })

    const getTimeString = (firstDatetime: string): string => {
      return dayjs(firstDatetime).format('MMMM D, YYYY HH:mm')
    }

    return {
      eventData,
      getTimeString
    }
  }
})
</script>

<style scoped lang="scss">
.home-page {
  @apply flex flex-row justify-center bg-pale-gray;
}

.text-main-event-name {
  @apply font-sans text-4xl font-bold text-white;
}

.event-section {
  @apply py-10 px-10 mx-auto max-w-2xl sm:py-12 sm:px-6 lg:px-8 lg:max-w-7xl;
}

.event-grid-box {
  @apply grid grid-rows-1 gap-x-6 gap-y-10 mt-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8;
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
