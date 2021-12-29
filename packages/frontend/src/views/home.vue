<template>
<div class="home-page">
  <div class="w-full min-h-screen container">
    <!-- Start first box here... -->
    <div class="Official-events-box">
      <div class="whole-event-box">
        <h1 class="text-Main-event-name">
          Official events
        </h1>
        <!-- Official Envent start here... -->
        <div class="local-events-box-setting">
          <div class="whole-ticket">
            <div class="image-ticket-box">
              <img class="image-ticket-main-image" src="@/assets/TK-1-Lido.png" alt="image-tickett">
            </div>
            <div class="ticket-text-info">
              <div>
                <h3 class="ticket-text-name">
                    LIDO CONNECT - Movie Program
                </h3>
                <p class="ticket-text-time">16 JAN 2022 | 13:00 PM</p>
                <p class="ticket-text-location">LIDO CONNECT Hall 1</p>
              </div>
              <!--p-- class="text-sm font-medium text-gray-900">$35</!--p-->
            </div>
          </div>
          <div class="whole-ticket">
            <div class="image-ticket-box">
              <img class="image-ticket-main-image" src="@/assets/TK-2-BTS.png" alt="image-tickett">
            </div>
            <div class="ticket-text-info">
              <div>
                <h3 class="ticket-text-name">
                  BTS World Tour 'Love Yourself' Bangkok
                </h3>
                <p class="ticket-text-time">6 - 7 Apr 2021 | 13:00 PM</p>
                <p class="ticket-text-location">Rajamangkala National</p>
              </div>
              <!--p-- class="text-sm font-medium text-gray-900">$35</!--p-->
            </div>
          </div>
          <div class="whole-ticket">
            <div class="image-ticket-box">
              <img class="image-ticket-main-image" src="@/assets/TK-3-ReMSC.png" alt="image-tickett">
            </div>
            <div class="ticket-text-info">
              <div>
                <h3 class="ticket-text-name">
                    Re-MSC: Reconnecting with Mindful Self-Compassion
                </h3>
                <p class="ticket-text-time">25 APR 2022 | 13:00 PM</p>
                <p class="ticket-text-location">Online Event</p>
              </div>
              <!--p-- class="text-sm font-medium text-gray-900">$35</!--p-->
            </div>
          </div>
          <div class="whole-ticket">
            <div class="image-ticket-box">
              <img class="image-ticket-main-image" src="@/assets/TK-4-Sculpture Drive Thru.png" alt="image-tickett">
            </div>
            <div class="ticket-text-info">
              <div>
                <h3 class="ticket-text-name">
                  Sculpture Drive Thru
                </h3>
                <p class="ticket-text-time">5 MAR 2022 | 13:00 PM</p>
                <p class="ticket-text-location">Day Day Ari, Ari Samphan Soi 5</p>
              </div>
              <!--p-- class="text-sm font-medium text-gray-900">$35</!--p-->
            </div>
          </div>
        <!-- Official Envent end here... -->
        </div>
      </div>
      <!-- End of first box... -->
    </div>
      <!-- Start seconde box here... -->
    <div class="Local-events-box">
      <div class="whole-event-box">
        <h1 class="text-Main-event-name">
          Local events
        </h1>

        <!-- Local Enevnt start here... -->
        <div class="local-events-box-setting">

          <!-- Cofficial Envent start here... -->
          <div class="whole-ticket">
            <div class="image-ticket-box">
              <img class="image-ticket-main-image" src="@/assets/TK-5-PGBLive.png" alt="image-tickett">
            </div>
            <div class="ticket-text-info">
              <div>
                <h3 class="ticket-text-name">
                    PGB Live: Next Level Pinoy
                </h3>
                <p class="ticket-text-time">10 MAR 2022 | 13:00 PM</p>
                <p class="ticket-text-location">Virtual Event</p>
              </div>
              <!--p-- class="text-sm font-medium text-gray-900">$35</!--p-->
            </div>
          </div>

          <div class="whole-ticket">
            <div class="image-ticket-box">
              <img class="image-ticket-main-image" src="@/assets/TK-6-Child in Mob.png" alt="image-tickett">
            </div>
            <div class="ticket-text-info">
              <div>
                <h3 class="ticket-text-name">
                    Child in Mob
                </h3>
                <p class="ticket-text-time">9 JUN 2022 | 13:00 PM</p>
                <p class="ticket-text-location">Charity</p>
              </div>
              <!--p-- class="text-sm font-medium text-gray-900">$35</!--p-->
            </div>
          </div>

          <div class="whole-ticket">
            <div class="image-ticket-box">
              <img class="image-ticket-main-image" src="@/assets/TK-7-Transport  Chang Chui 2.png" alt="image-tickett">
            </div>
            <div class="ticket-text-info">
              <div>
                <h3 class="ticket-text-name">
                    Transport | Chang Chui 2
                </h3>
                <p class="ticket-text-time">19 JAN 2022 | 13:00 PM</p>
                <p class="ticket-text-location">Chang Chui</p>
              </div>
              <!--p-- class="text-sm font-medium text-gray-900">$35</!--p-->
            </div>
          </div>

          <div class="whole-ticket">
            <div class="image-ticket-box">
              <img class="image-ticket-main-image" src="@/assets/TK-8-Hg80 Bar Vouchers.png" alt="image-tickett">
            </div>
            <div class="ticket-text-info">
              <div>
                <h3 class="ticket-text-name">
                    Hg80 Bar Vouchers
                </h3>
                <p class="ticket-text-time">1 DEC 2022 | 13:00 PM</p>
                <p class="ticket-text-location">Hg80 Bar Bangkok (near Chong Nonsi BTS)</p>
              </div>
              <!--p-- class="text-sm font-medium text-gray-900">$35</!--p-->
            </div>
          </div>
        <!-- Local Envent end here... -->

        </div>
      </div>
      <!-- End of seconed box... -->
    </div>
  </div>
</div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'home',
  components: {
  },
  setup () {
    const message = ref('Vue 3 + TypeScript setup')

    return { message }
  }
})
</script>

<style lang="scss">
.home-page {
  @apply bg-pale-gray flex flex-row justify-center;
}
.text-Main-event-name {
  @apply text-4xl font-bold font-sans text-white;
}
.whole-event-box {
  @apply max-w-2xl mx-auto py-10 px-10 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8;
}
.local-events-box-setting {
  @apply mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8;
}
.whole-ticket {
  /*ease-in duration-300*/
  @apply hover:scale-105 rounded-lg shadow-xl cursor-pointer;
}
.image-ticket-box {
  @apply bg-gray-200 rounded-t-lg overflow-hidden group-hover:opacity-75;
}
.image-ticket-main-image {
  @apply object-cover h-96 w-96;
}
.ticket-text-info {
  /*mt-4 flex justify-between bg-yellow-400*/
  @apply object-cover flex flex-col indent-[3%] h-24 rounded-b-lg  justify-self-start bg-pale-yellow;
}
.ticket-text-name {
  @apply truncate mt-0.5 text-lg font-medium text-black;
}
.ticket-text-time{
  @apply truncate mt-1 text-sm font-normal text-white;
}
.ticket-text-location{
  @apply truncate mt-1 text-sm font-normal text-white;
}
</style>
