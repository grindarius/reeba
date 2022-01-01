<template>
<div class="home-page">
  <div class="w-full min-h-screen container">
    <!-- Start first box here... -->
    <div class="official-events-box">
      <div class="event-section">
        <h1 class="text-main-event-name">
          Official events
        </h1>

        <div class="event-grid-box">
          <div class="ticket">
            <div class="ticket-image-box">
              <img class="ticket-image" src="@/assets/TK-1-Lido.png" alt="image-tickett">
            </div>
            <div class="ticket-info">
              <div>
                <h3 class="ticket-name">
                    LIDO CONNECT - Movie Program
                </h3>
                <p class="ticket-time">16 JAN 2022 | 13:00 </p>
                <p class="ticket-location">LIDO CONNECT Hall 1</p>
              </div>
            </div>
          </div>

          <div class="ticket">
            <div class="ticket-image-box">
              <img class="ticket-image" src="@/assets/TK-2-BTS.png" alt="image-tickett">
            </div>
            <div class="ticket-info">
              <div>
                <h3 class="ticket-name">
                  BTS World Tour 'Love Yourself' Bangkok
                </h3>
                <p class="ticket-time">6 - 7 Apr 2021 | 21:00 </p>
                <p class="ticket-location">Rajamangkala National</p>
              </div>
            </div>
          </div>

          <div class="ticket">
            <div class="ticket-image-box">
              <img class="ticket-image" src="@/assets/TK-3-ReMSC.png" alt="image-tickett">
            </div>
            <div class="ticket-info">
              <div>
                <h3 class="ticket-name">
                    Re-MSC: Reconnecting with Mindful Self-Compassion
                </h3>
                <p class="ticket-time">25 APR 2022 | 13:00 </p>
                <p class="ticket-location">Online Event</p>
              </div>
            </div>
          </div>

          <div class="ticket">
            <div class="ticket-image-box">
              <img class="ticket-image" src="@/assets/TK-4-Sculpture Drive Thru.png" alt="image-tickett">
            </div>
            <div class="ticket-info">
              <div>
                <h3 class="ticket-name">
                  Sculpture Drive Thru
                </h3>
                <p class="ticket-time">5 MAR 2022 | 13:00 </p>
                <p class="ticket-location">Day Day Ari, Ari Samphan Soi 5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End of first box... -->
    </div>

      <!-- Start seconde box here... -->
    <div class="local-events-box">
      <div class="event-section">
        <h1 class="text-main-event-name">
          Local events
        </h1>

        <div class="event-grid-box">
          <div class="ticket">
            <div class="ticket-image-box">
              <img class="ticket-image" src="@/assets/TK-5-PGBLive.png" alt="image-tickett">
            </div>
            <div class="ticket-info">
              <div>
                <h3 class="ticket-name">
                    PGB Live: Next Level Pinoy
                </h3>
                <p class="ticket-time">10 MAR 2022 | 13:00 </p>
                <p class="ticket-location">Virtual Event</p>
              </div>
            </div>
          </div>

          <div class="ticket">
            <div class="ticket-image-box">
              <img class="ticket-image" src="@/assets/TK-6-Child in Mob.png" alt="image-tickett">
            </div>
            <div class="ticket-info">
              <div>
                <h3 class="ticket-name">
                    Child in Mob
                </h3>
                <p class="ticket-time">9 JUN 2022 | 21:00 </p>
                <p class="ticket-location">Charity</p>
              </div>
            </div>
          </div>

          <div class="ticket">
            <div class="ticket-image-box">
              <img class="ticket-image" src="@/assets/TK-7-Transport  Chang Chui 2.png" alt="image-tickett">
            </div>
            <div class="ticket-info">
              <div>
                <h3 class="ticket-name">
                    Transport | Chang Chui 2
                </h3>
                <p class="ticket-time">19 JAN 2022 | 13:00 </p>
                <p class="ticket-location">Chang Chui</p>
              </div>
            </div>
          </div>

          <div class="ticket">
            <div class="ticket-image-box">
              <img class="ticket-image" src="@/assets/TK-8-Hg80 Bar Vouchers.png" alt="image-tickett">
            </div>
            <div class="ticket-info">
              <div>
                <h3 class="ticket-name">
                    Hg80 Bar Vouchers
                </h3>
                <p class="ticket-time">1 DEC 2022 | 13:00 </p>
                <p class="ticket-location">Hg80 Bar Bangkok (near Chong Nonsi BTS)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End of seconed box... -->
    </div>
  </div>
</div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'home'
})
</script>

<style scoped lang="scss">
.home-page {
  @apply bg-pale-gray flex flex-row justify-center;
}

.text-main-event-name {
  @apply text-4xl font-bold font-sans text-white;
}

.event-section {
  @apply max-w-2xl mx-auto py-10 px-10 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8;
}

.event-grid-box {
  @apply mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8;
}

.ticket {
  @apply rounded-lg shadow-xl cursor-pointer transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-200;
}

.ticket-image-box {
  @apply bg-gray-200 rounded-t-lg overflow-hidden group-hover:opacity-75;
}

.ticket-image {
  @apply object-cover h-96 w-full;
}

.ticket-info {
  @apply object-cover flex flex-col indent-[3%] h-24 rounded-b-lg  justify-self-start bg-pale-yellow;
}

.ticket-name {
  @apply truncate mt-0.5 text-lg font-medium text-black;
}

.ticket-time {
  @apply truncate mt-1 text-sm font-normal text-white;
}

.ticket-location {
  @apply truncate mt-1 text-sm font-normal text-white;
}
</style>
