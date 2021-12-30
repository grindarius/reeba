<template>
  <div class="select-seat-page">
    <div class="base">
      <h1 class="title">Stage zones</h1>
      <div class="zone">
        <div class="section">
          <button
            :class="`${zoneData.id === userSelectedZone ? 'button-active' : 'button'}`"
            @click="changeZone(zoneData.id)"
            v-for="(zoneData, id) in zoneData"
            :key="`section-text-${id}`">
            <h1 class="section-text">
              {{ zoneData.zone }}
            </h1>
          </button>
        </div>
      </div>
      <h1 class="title" v-if="userSelectedZone === 0">Select the zone</h1>
      <h1 class="title" v-else>Zone {{ zoneData[userSelectedZone - 1].zone }}</h1>
      <div v-if="userSelectedZone === 0"></div>
      <div class="selected" v-else>
        <div class="price-list">
          <div class="price-rate"
            v-for="(ticketPrice, id) in zoneData[userSelectedZone - 1].ticketPrices"
            :key="`price-rate-${id}`">
            <div class="price-color" :style="{'background-color': zoneData[userSelectedZone-1].ticketPriceColors[id]}"></div>
            <p class="text-white">
              {{ ticketPrice }}
            </p>
          </div>
        </div>
        <div class="zone-detail">
          <div class="seats">
            <div class="seats-rows" v-for="row in 5" :key="row">
              <p class="px-1 text-white">{{ alphabet[row - 1] }}</p>
              <button
                class="price-color"
                @click="changeSeat(row, column)"
                :style="{'background-color': zoneData[userSelectedZone - 1].ticketPriceColors[row - 1]}"
                v-for="column in 15"
                :key="column">
                <v-mdi name="mdi-check"></v-mdi>
              </button>
            </div>
          </div>
           <div class="grow">
          </div>
          <div class="seats-details">
            <div class="detail-header">
              <p class="detail-header-text">Reservation Description</p>
            </div>
            <table class="detail-content">
              <tbody>
                <tr>
                  <td class="px-3">Date</td>
                  <td class="text-right px-3">{{ getTimeString }}</td>
                </tr>
                <tr>
                  <td class="px-3">Zone</td>
                  <td class="text-right px-3">{{ zoneData[userSelectedZone - 1].zone }}</td>
                </tr>
                <tr>
                  <td class="px-3">Price</td>
                  <td class="text-right px-3">{{ ticketPrice }}</td>
                </tr>
                <tr>
                  <td class="px-3">Seat</td>
                  <td class="text-right px-3">{{ userSelectedSeatNumber }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { computed, defineComponent, ref } from 'vue'

import { alphabet, zoneData } from '@/constants'

dayjs.extend(localizedFormat)

export default defineComponent({
  name: 'select-seat',
  setup () {
    const userSelectedZone = ref(0)
    const userSelectedSeatNumber = ref('')
    const ticketPrice = ref(0)

    const changeZone = (id: number): void => {
      userSelectedZone.value = id
      userSelectedSeatNumber.value = ''
      ticketPrice.value = 0
    }

    const changeSeat = (row: number, column: number): void => {
      userSelectedSeatNumber.value = alphabet[row - 1] + column
      ticketPrice.value = zoneData[userSelectedZone.value - 1].ticketPrices[row - 1]
    }

    const getTimeString = computed((): string => {
      return dayjs().format('LLLL')
    })

    return {
      zoneData,
      userSelectedZone,
      changeZone,
      changeSeat,
      alphabet,
      userSelectedSeatNumber,
      ticketPrice,
      getTimeString
    }
  }
})
</script>

<style scoped lang="scss">
.select-seat-page {
  @apply w-full flex justify-center bg-pale-gray min-h-screen;
}

.base {
  @apply container py-6;
}

.title {
  @apply text-4xl font-sans font-semibold text-white;
}

.button {
  @apply w-[100px] h-[100px] bg-pale-yellow hover:ring text-white font-bold py-2 px-4 rounded active:bg-gray-300 focus:outline-none;
}

.button-active {
  @apply w-[100px] h-[100px] bg-amber-200 hover:ring text-white font-bold py-2 px-4 rounded active:bg-gray-300 focus:outline-none;
}

.zone {
  @apply px-12 py-6 flex md:justify-center w-full;
}

.section {
  @apply grid gap-4;
  grid-template-columns: repeat(5, 100px);
}

.section-text {
  @apply text-4xl font-sans font-semibold text-black;
}

.selected {
  @apply w-full;
}

.price-list {
  @apply gap-9 columns-1 flex justify-center;
}

.price-rate {
  @apply flex columns-1 gap-3 py-3;
}

.price-color {
  @apply rounded-full px-3 py-3;
}

.zone-detail {
  @apply flex w-full py-3 px-8;
}

.seats {
  @apply py-24 basis-1/2;
}

.seats-rows {
  @apply flex columns-1 gap-2 py-1 justify-center;
}

.seats-details {
  @apply py-12 basis-1/3;
}

.detail-header {
  @apply w-4/5 h-14 bg-black rounded-t-lg flex place-content-center;
}

.detail-header-text {
  @apply text-white place-self-center;
}

.detail-content {
  @apply table-auto h-48 w-4/5 bg-white rounded-b-lg;
}
</style>
