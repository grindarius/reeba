<template>
  <div class="select-seat-page">
    <div class="base">
      <h1 class="title">
        Stage zones
      </h1>
      <div class="zone">
        <div class="section">
          <button
            v-for="(zoneInfo, id) in zoneData"
            :class="`${zoneInfo.id === userSelectedZone ? 'button-active' : 'button'}`"
            @click="changeZone(zoneInfo.id)"
            :key="`section-text-${id}`">
            <h1 class="section-text">
              {{ zoneInfo.zone }}
            </h1>
          </button>
        </div>
      </div>
      <h1 class="title" v-if="userSelectedZone === 0">
        Select the zone
      </h1>
      <h1 class="title" v-else>
        Zone {{ zoneData[userSelectedZone - 1].zone }}
      </h1>
      <div v-if="userSelectedZone === 0" />
      <div class="selected" v-else>
        <div class="price-list">
          <div
            class="price-rate"
            v-for="(price, id) in zoneData[userSelectedZone - 1].ticketPrices"
            :key="`price-rate-${id}`">
            <div class="price-rate-color" :style="{'background-color': zoneData[userSelectedZone - 1].ticketPriceColors[id]}" />
            <p class="ticket-price-text">
              {{ price }}
            </p>
          </div>
        </div>
        <div class="zone-detail">
          <div class="seats">
            <div class="seats-rows" v-for="row in 5" :key="row">
              <p class="seats-rows-text">
                {{ alphabet[row - 1] }}
              </p>
              <label
                class="seats-label"
                v-for="column in 15"
                :key="column">
                <input
                  :disabled="disabledOtherRow(row)||isSeatTaken(row, column)" type="checkbox"
                  @change="seatSelected($event, row)"
                  class="seats-checkbox" :value="alphabet[row - 1] + column"
                  v-model="checkedSeat"
                  :style="{'background-color': zoneData[userSelectedZone - 1].ticketPriceColors[row - 1]}">
                <v-mdi v-if="isSeatChecked(row, column)" class="absolute cursor-pointer" name="mdi-check" size="24" fill="black" />
              </label>
            </div>
          </div>
          <div class="seats-details">
            <div class="detail-header">
              <p class="detail-header-text">
                Reservation Description
              </p>
            </div>
            <table class="detail-content">
              <tbody>
                <tr>
                  <td class="left-table">
                    Date
                  </td>
                  <td class="right-table">
                    {{ getTimeString }}
                  </td>
                </tr>
                <tr>
                  <td class="left-table">
                    Zone
                  </td>
                  <td class="right-table">
                    {{ zoneData[userSelectedZone - 1].zone }}
                  </td>
                </tr>
                <tr>
                  <td class="left-table">
                    Price
                  </td>
                  <td class="right-table">
                    {{ ticketPrice }}
                  </td>
                </tr>
                <tr>
                  <td class="left-table">
                    Seat
                  </td>
                  <td class="right-table">
                    {{ checkedSeat.join(', ') }}
                  </td>
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
    const ticketPrice = ref(0)
    const checkedSeat: Ref<Array<string>> = ref([])
    const selectedRow = ref('')

    const changeZone = (id: number): void => {
      if (userSelectedZone.value !== id) {
        userSelectedZone.value = id
        checkedSeat.value = []
        ticketPrice.value = 0
        selectedRow.value = ''
      }
    }

    const getTimeString = computed((): string => {
      return dayjs().format('LLLL')
    })

    const seatSelected = (e: Event, row: number): void => {
      const target = e.target as HTMLInputElement
      if (selectedRow.value === '') {
        selectedRow.value = alphabet[row - 1]
      }
      if (target.checked) {
        ticketPrice.value += zoneData[userSelectedZone.value - 1].ticketPrices[row - 1]
        checkedSeat.value = checkedSeat.value.map(s => s.slice(1)).map(i => Number(i)).sort((n1, n2) => n1 - n2).map(i => selectedRow.value + i)
      } else {
        ticketPrice.value -= zoneData[userSelectedZone.value - 1].ticketPrices[row - 1]
        if (!checkedSeat.value.length) {
          selectedRow.value = ''
        }
      }
    }

    const isSeatChecked = (row: number, column: number): boolean => {
      return checkedSeat.value.some(x => x == alphabet[row - 1] + column)
    }

    return {
      zoneData,
      userSelectedZone,
      changeZone,
      alphabet,
      ticketPrice,
      getTimeString,
      checkedSeat,
      seatSelected,
      isSeatChecked
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
  @apply py-2 px-4 w-24 h-24 font-bold rounded focus:outline-none bg-pale-yellow active:bg-gray-hover disabled:bg-red-disabled disabled:cursor-not-allowed;
}

.button-active {
  @apply py-2 px-4 w-24 h-24 font-bold rounded bg-yellow-hover;
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

.seats-checkbox {
  @apply flex place-self-center rounded-full appearance-none h-6 w-6 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50;
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

.seats-label{
  @apply flex flex-col justify-center items-center relative;
}
</style>
