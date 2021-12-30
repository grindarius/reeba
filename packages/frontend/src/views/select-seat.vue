<template>
  <div class="select-seat-page">
    <div class="base">
      <p class="title">Stage zones</p>
      <div class="zone">
        <div class="section">
          <button :class="[zonesData.id === selectZone? 'button-active': 'button']" v-on:click="changeZone(zonesData.id)" v-for="(zonesData, id) in zonesData" :key="`section-text-${id}`">
            <p class="section-text">
              {{ zonesData.zone }}
            </p>
          </button>
        </div>
      </div>
      <p class="title" v-if="selectZone === 0">Select the zone</p>
      <p class="title" v-else>Zone {{ zonesData[selectZone-1].zone }}</p>
      <div v-if="selectZone === 0"></div>
      <div class="selected" v-else>
        <div class="price-list">
          <div class="price-rate" v-for="(price, id) in zonesData[selectZone-1].price" :key="`price-rate-${id}`">
            <div class="price-color" :style="{'background-color': zonesData[selectZone-1].priceColor[id]}"></div>
            <p class="text-white">
                {{ price }}
            </p>
          </div>
        </div>
        <div class="zone-detail">
          <div class="seats">
            <div class="seats-rows" v-for="row in 5" :key="row">
              <p class="px-1 text-white">{{alphabet[row-1]}}</p>
              <button class="price-color" v-on:click="changeSeat(row, column)" :style="{'background-color': zonesData[selectZone-1].priceColor[row-1]}" v-for="column in 15" :key="column">
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
                  <td class="text-right px-3">6 April 2022 19:00</td>
                </tr>
                <tr>
                  <td class="px-3">Zone</td>
                  <td class="text-right px-3">{{zonesData[selectZone-1].zone}}</td>
                </tr>
                <tr>
                  <td class="px-3">Price</td>
                  <td class="text-right px-3">{{price}}</td>
                </tr>
                <tr>
                  <td class="px-3">Seat</td>
                  <td class="text-right px-3">{{seatNumber}}</td>
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
import { defineComponent, ref } from 'vue'

import { alphabet, zoneColumns, zoneRows, zonesData } from '@/constants'

export default defineComponent({
  name: 'select-seat',
  setup () {
    const selectZone = ref(0)
    const seatNumber = ref('')
    const price = ref(0)
    return {
      zonesData,
      selectZone,
      zoneColumns,
      zoneRows,
      alphabet,
      seatNumber,
      price
    }
  },
  methods: {
    changeZone (id: number) {
      this.selectZone = id
      this.seatNumber = ''
      this.price = 0
    },
    changeSeat (row: number, column: number) {
      this.seatNumber = alphabet[row - 1] + column
      this.price = zonesData[this.selectZone - 1].price[row - 1]
    }
  }
})

</script>

<style lang="scss">
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
  @apply px-12 py-6 flex md:justify-center w-full
}

.section {
  @apply grid gap-4;
  grid-template-columns: repeat(5, minmax(100px, 100px))
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
  @apply w-[80%] h-14 bg-black rounded-t-lg flex place-content-center;
}

.detail-header-text {
  @apply text-white place-self-center;
}

.detail-content {
  @apply table-auto h-48 w-[80%] bg-white rounded-b-lg;
}
</style>
