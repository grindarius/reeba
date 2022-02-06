<template>
  <div class="home-page">
    <div class="container w-full min-h-screen">
      <div class="official-events-box">
        <div class="event-section">
          <h1 class="text-main-event-name">
            Official events
          </h1>
          <div v-for="({coverImagePath, name, firstDatetime, venueName}, index) in eventData?.official " :key="index">
            {{ coverImagePath }}: {{ name }}: {{ firstDatetime }}: {{ venueName }}
          </div>
          <div class="event-grid-box">
            <div class="event">
              <div class="event-image-box">
                <img class="event-image" src="@/assets/TK-1-Lido.png" alt="event-image">
              </div>
              <div class="event-info">
                <div>
                  <h3 class="event-name">
                    {{ eventData?.official ?? 'noreply' }}
                  </h3>
                  <p class="event-time">
                    16 JAN 2022 | 13:00
                  </p>
                  <p class="event-location">
                    LIDO CONNECT Hall 1
                  </p>
                </div>
              </div>
            </div>

            <div class="event">
              <router-link to="/event">
                <div class="event-image-box">
                  <img class="event-image" src="@/assets/TK-2-BTS.png" alt="event-image">
                </div>
                <div class="event-info">
                  <div>
                    <h3 class="event-name">
                      BTS World Tour 'Love Yourself' Bangkok
                    </h3>
                    <p class="event-time">
                      6 - 7 Apr 2021 | 21:00
                    </p>
                    <p class="event-location">
                      Rajamangkala National
                    </p>
                  </div>
                </div>
              </router-link>
            </div>

            <div class="event">
              <div class="event-image-box">
                <img class="event-image" src="@/assets/TK-3-ReMSC.png" alt="event-image">
              </div>
              <div class="event-info">
                <div>
                  <h3 class="event-name">
                    Re-MSC: Reconnecting with Mindful Self-Compassion
                  </h3>
                  <p class="event-time">
                    25 APR 2022 | 13:00
                  </p>
                  <p class="event-location">
                    Online Event
                  </p>
                </div>
              </div>
            </div>

            <div class="event">
              <div class="event-image-box">
                <img class="event-image" src="@/assets/TK-4-sculpture-drive-through.png" alt="event-image">
              </div>
              <div class="event-info">
                <div>
                  <h3 class="event-name">
                    Sculpture Drive Thru
                  </h3>
                  <p class="event-time">
                    5 MAR 2022 | 13:00
                  </p>
                  <p class="event-location">
                    Day Day Ari, Ari Samphan Soi 5
                  </p>
                </div>
              </div>
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
            <div class="event">
              <div class="event-image-box">
                <img class="event-image" src="@/assets/TK-5-PGBLive.png" alt="event-image">
              </div>
              <div class="event-info">
                <div>
                  <h3 class="event-name">
                    PGB Live: Next Level Pinoy
                  </h3>
                  <p class="event-time">
                    10 MAR 2022 | 13:00
                  </p>
                  <p class="event-location">
                    Virtual Event
                  </p>
                </div>
              </div>
            </div>

            <div class="event">
              <div class="event-image-box">
                <img class="event-image" src="@/assets/TK-6-child-in-mob.png" alt="event-image">
              </div>
              <div class="event-info">
                <div>
                  <h3 class="event-name">
                    Child in Mob
                  </h3>
                  <p class="event-time">
                    9 JUN 2022 | 21:00
                  </p>
                  <p class="event-location">
                    Charity
                  </p>
                </div>
              </div>
            </div>

            <div class="event">
              <div class="event-image-box">
                <img class="event-image" src="@/assets/TK-7-transport-chang-chui-2.png" alt="event-image">
              </div>
              <div class="event-info">
                <div>
                  <h3 class="event-name">
                    Transport | Chang Chui 2
                  </h3>
                  <p class="event-time">
                    19 JAN 2022 | 13:00
                  </p>
                  <p class="event-location">
                    Chang Chui
                  </p>
                </div>
              </div>
            </div>

            <div class="event">
              <div class="event-image-box">
                <img class="event-image" src="@/assets/TK-8-hg80.png" alt="event-image">
              </div>
              <div class="event-info">
                <div>
                  <h3 class="event-name">
                    Hg80 Bar Vouchers
                  </h3>
                  <p class="event-time">
                    1 DEC 2022 | 13:00
                  </p>
                  <p class="event-location">
                    Hg80 Bar Bangkok (near Chong Nonsi BTS)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ky from 'ky'
import { defineComponent, onMounted, Ref, ref } from 'vue'

import { GetEventsReply } from '@reeba/common'

import { getEvents } from '@/api/endpoints'

export default defineComponent({
  name: 'home',
  setup () {
    const eventData: Ref<GetEventsReply | undefined> = ref(undefined)

    onMounted(async () => {
      const { method, url } = getEvents
      try {
        const response = await ky(url, {
          method
        }).json<GetEventsReply>()

        eventData.value = response
      } catch (error) {
        console.error(error)
      }
    })

    return {
      eventData
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
