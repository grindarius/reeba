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
            <div class="price-rate-color" :style="{'background-color': zoneData[userSelectedZone-1].ticketPriceColors[id]}"></div>
            <p class="ticket-price-text">
              {{ ticketPrice }}
            </p>
          </div>
        </div>
        <div class="zone-detail">
          <div class="seats">
            <div class="seats-rows" v-for="row in 5" :key="row">
              <p class="seats-rows-text">{{ alphabet[row - 1] }}</p>
              <button
                class="price-color"
                @click="changeSeat(row, column)"
                :style="{'background-color': zoneData[userSelectedZone - 1].ticketPriceColors[row - 1]}"
                v-for="column in 15"
                :key="column">
                <div class="blank-space" v-if="alphabet[row - 1] + column !== userSelectedSeatNumber"></div>
                <v-mdi v-else name="mdi-check" size="24" fill="black"></v-mdi>
              </button>
            </div>
          </div>
          <div class="seats-details">
            <div class="detail-header">
              <p class="detail-header-text">Reservation Description</p>
            </div>
            <table class="detail-content">
              <tbody>
                <tr>
                  <td class="left-table">Date</td>
                  <td class="right-table">{{ getTimeString }}</td>
                </tr>
                <tr>
                  <td class="left-table">Zone</td>
                  <td class="right-table">{{ zoneData[userSelectedZone - 1].zone }}</td>
                </tr>
                <tr>
                  <td class="left-table">Price</td>
                  <td class="right-table">{{ ticketPrice }}</td>
                </tr>
                <tr>
                  <td class="left-table">Seat</td>
                  <td class="right-table">{{ userSelectedSeatNumber }}</td>
                </tr>
              </tbody>
            </table>
            <router-link to="/payment" :class="`${ticketPrice !== 0 ? 'submit-button-active' : 'submit-button-disable'}`">
              {{ ticketPrice === 0 ? "Select seat first":"Submit" }}
            </router-link>
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
      if (userSelectedZone.value !== id) {
        userSelectedZone.value = id
        userSelectedSeatNumber.value = ''
        ticketPrice.value = 0
      }
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
  @apply flex justify-center w-full min-h-screen bg-pale-gray;
}

.base {
  @apply container py-6;
}

.title {
  @apply py-2 font-sans text-4xl font-semibold text-white;
}

.button {
  @apply py-2 px-4 w-24 h-24 font-bold text-white rounded hover:ring focus:outline-none bg-pale-yellow active:bg-gray-hover;
}

.button-active {
  @apply py-2 px-4 w-24 h-24 font-bold text-white rounded bg-yellow-hover;
}

.zone {
  @apply flex py-6 px-10 w-full md:justify-center;
}

.section {
  @apply grid gap-4;
  grid-template-columns: repeat(5, 100px);
}

.section-text {
  @apply font-sans text-4xl font-semibold text-black;
}

.selected {
  @apply w-full;
}

.price-list {
  @apply flex gap-12 py-6 px-12 md:justify-center md:px-0 columns-1;
}

.price-rate {
  @apply flex gap-3 py-3 columns-1;
}

.price-rate-color {
  @apply py-4 px-4 rounded-full;
}

.price-color {
  @apply flex place-self-center rounded-full;
}

.zone-detail {
  @apply flex flex-col justify-between py-3 px-8 w-full lg:flex-row;
}

.seats {
  @apply py-20 basis-1/2;
}

.seats-rows {
  @apply flex gap-2 py-1 px-10 md:justify-center md:px-0 columns-1;
}

.seats-details {
  @apply flex flex-col justify-center place-items-center py-12 basis-1/3 columns-1;
}

.detail-header {
  @apply flex place-content-center w-full h-14 bg-black rounded-t-lg md:w-4/5;
}

.detail-header-text {
  @apply place-self-center text-2xl font-semibold text-center text-white;
}

.detail-content {
  @apply w-full h-48 bg-white table-auto md:w-4/5;
}

.ticket-price-text {
  @apply place-self-center text-2xl text-white;
}

.seats-rows-text {
  @apply place-self-center px-1 text-lg text-white;
}

.blank-space {
  @apply py-3 px-3 rounded-full hover:ring;
}

.left-table {
  @apply px-3 font-semibold;
}

.right-table {
  @apply px-3 font-medium text-right;
}

.submit-button-active {
  @apply py-2 px-5 w-4/5 text-xl font-semibold text-center uppercase rounded-b-lg bg-pale-yellow hover:bg-yellow-hover;
}

.submit-button-disable {
  @apply py-2 px-5 w-4/5 text-xl font-semibold text-center text-white uppercase rounded-b-lg pointer-events-none bg-red-disabled;
}
</style>
