<template>
  <metainfo>
    <template #title="{ content }">
      {{ content }} | ReebA: Ticket booking. Redefined.
    </template>
  </metainfo>
  <div class="select-seat-page">
    <div class="container my-10">
      <h1 class="font-sans text-4xl font-semibold text-white">
        Stage sections
      </h1>
      <div class="overflow-x-auto py-6 px-10 w-full">
        <div class="grid gap-4 mx-auto max-w-min" :style="{ 'grid-template-columns': `repeat(${sectionHeight}, 80px)`, 'grid-template-rows': `repeat(${sectionWidth}, 80px)`}">
          <button
            v-for="(section, i) in Object.values(sections)"
            class="w-20 h-20 btn btn-square"
            @click="selectSection(i)"
            :key="`section-text-${i}`">
            <h1 class="section-text">
              {{ formatSectionName(section[0].sectionRowPosition, section[0].sectionColumnPosition) }}
            </h1>
          </button>
        </div>
      </div>
      <h1 class="title" v-if="selectedSection.length === 0">
        Select the zone
      </h1>
      <h1 class="title" v-else>
        Section {{ formatSectionName(selectedSection[0].sectionRowPosition, selectedSection[0].sectionColumnPosition) }}
      </h1>
      <div v-if="selectedSection.length === 0" />
      <div v-else class="w-full">
        <div class="price-list">
          <div
            class="price-rate"
            v-for="(price, id) in priceList"
            :key="`price-rate-${id}`">
            <div class="py-4 px-4 rounded-full" :style="{ 'background-color': price.color }" />
            <p class="ticket-price-text">
              {{ price.price }}
            </p>
          </div>
        </div>
        <div class="zone-detail">
          <div class="flex flex-row py-20 basis-1/2">
            <div>
              <div class="flex flex-col gap-2 py-1 px-10 md:justify-center md:px-0 columns-1" v-for="(_, i) in seatHeight" :key="`section-row-name-display-${i}`">
                <p class="place-self-center mr-10 text-lg text-white">
                  {{ numberToLetters(i) }}
                </p>
              </div>
            </div>
            <div class="grid gap-3" :style="{ 'grid-template-rows': `repeat(${seatHeight}, 24px)`, 'grid-template-columns': `repeat(${seatWidth}, 24px)`}">
              <label :class="seatLabelClassName(s.isSeatTaken)" v-for="(s, i) in selectedSection" :key="s.seatId" :style="{ 'background-color': colorRecord[s.seatPrice] }" @click="selectSeat(i, s.isSeatTaken)">
                <v-mdi v-if="transactionStore.transactionStore.section.seats.has(s.seatId)" class="absolute cursor-pointer" name="mdi-check" size="24" fill="black" />
                <v-mdi v-else-if="s.isSeatTaken" class="absolute cursor-not-allowed" name="mdi-close" size="24" fill="black" />
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
                    Seats
                  </td>
                  <td class="right-table">
                    {{ getSectionSummaryString() }}
                  </td>
                </tr>
                <tr>
                  <td class="left-table">
                    Seat
                  </td>
                  <td class="right-table">
                    {{ getSeatSummaryString() }}
                  </td>
                </tr>
                <tr>
                  <td class="left-table">
                    Price
                  </td>
                  <td class="right-table">
                    {{ [...transactionStore.transactionStore.section.seats.values()].reduce((total, current) => current.price + total, 0) }}
                  </td>
                </tr>
              </tbody>
            </table>
            <router-link :to="`/${$route.params.username as string ?? ''}/${$route.params.eventId as string ?? ''}/${$route.params.datetimeId as string ?? ''}/payment`" custom v-slot="{ navigate }">
              <button class="w-full rounded-t-none md:w-4/5 disabled:text-white btn disabled:bg-red-disabled" :disabled="transactionStore.transactionStore.section.seats.size === 0" @click="navigate">
                {{ transactionStore.transactionStore.section.seats.size === 0 ? 'Select seat first' : 'Submit' }}
              </button>
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
import ky from 'ky'
import { computed, defineComponent, onMounted, Ref, ref } from 'vue'
import { useMeta } from 'vue-meta'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { GetEventSeatsReply, groupBy, numberToLetters } from '@reeba/common'

import { getEventSeats } from '@/api/endpoints'
import { alphabet, zoneData } from '@/constants'
import { useAuthStore } from '@/store/use-auth-store'
import { useTransactionStore } from '@/store/use-transaction-store'
import { TransactionStoreSeat } from '@/types'

dayjs.extend(localizedFormat)

export default defineComponent({
  name: 'select-seat',
  setup () {
    const transactionStore = useTransactionStore()
    const authStore = useAuthStore()
    const route = useRoute()
    const router = useRouter()
    const toast = useToast()

    const sections: Ref<Record<string, GetEventSeatsReply['sections']>> = ref({})
    const priceList: Ref<GetEventSeatsReply['ticketPrices']> = ref([])
    const sectionAsValues = computed(() => Object.values(sections.value))
    const selectedSection: Ref<GetEventSeatsReply['sections']> = ref([])
    const colorRecord: Ref<Record<number, string>> = computed(() => priceList.value.reduce<Record<number, string>>((obj, item) => {
      obj[item.price] = item.color
      return obj
    }, {}))

    const sectionWidth = ref(0)
    const sectionHeight = ref(0)

    const seatWidth = ref(0)
    const seatHeight = ref(0)

    useMeta({
      title: 'Seats'
    })

    const userSelectedZone = ref(1)
    const ticketPrice = ref(0)
    const checkedSeat: Ref<Array<string>> = ref([])
    const selectedRow = ref('')

    const formatSectionName = (alphabetic: number, numeric: number): string => {
      return `${numberToLetters(alphabetic)}${numeric + 1}`
    }

    const selectSection = (i: number): void => {
      selectedSection.value = sectionAsValues.value[i]
      transactionStore.setSection({
        id: selectedSection.value[0].sectionId,
        rowPosition: selectedSection.value[0].sectionRowPosition,
        columnPosition: selectedSection.value[0].sectionColumnPosition,
        seats: new Map<string, TransactionStoreSeat>()
      })
      seatWidth.value = Math.max(...selectedSection.value.map(s => s.seatColumnPosition)) + 1
      seatHeight.value = Math.max(...selectedSection.value.map(s => s.seatRowPosition)) + 1
    }

    const selectSeat = (i: number, isSeatTaken: boolean): void => {
      if (isSeatTaken) {
        return
      }

      if (transactionStore.transactionStore.section.seats.has(selectedSection.value[i].seatId)) {
        transactionStore.transactionStore.section.seats.delete(selectedSection.value[i].seatId)
        return
      }

      try {
        transactionStore.setSeat(selectedSection.value[i].seatId, {
          rowPosition: selectedSection.value[i].seatRowPosition,
          columnPosition: selectedSection.value[i].seatColumnPosition,
          price: selectedSection.value[i].seatPrice
        })
      } catch (error) {
        toast.error('Cannot set other seat price')
      }
    }

    onMounted(async () => {
      const { method, url } = getEventSeats({ eventId: route.params.eventId as string ?? '' })

      try {
        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          },
          searchParams: [
            ['datetimeId', route.params.datetimeId as string ?? '']
          ]
        }).json<GetEventSeatsReply>()

        const groupedBySectionId = response.sections.sort((a, b) => {
          return a.sectionRowPosition - b.sectionRowPosition ||
            a.sectionColumnPosition - b.sectionColumnPosition ||
            a.seatRowPosition - b.seatRowPosition ||
            a.seatColumnPosition - b.seatColumnPosition
        })

        sectionWidth.value = Math.max(...response.sections.map(s => s.sectionRowPosition)) + 1
        sectionHeight.value = Math.max(...response.sections.map(s => s.sectionColumnPosition)) + 1

        transactionStore.setEventId(route.params.eventId as string ?? '')
        transactionStore.setDatetimeId(route.params.datetimeId as string ?? '')

        sections.value = groupBy(groupedBySectionId, r => r.sectionId)
        priceList.value = response.ticketPrices
      } catch (error) {
        // @ts-expect-error error is unknown
        const response = error?.response

        if (response.status === 401) {
          toast.error('Token expired')
          router.push({ name: 'Signin' })
        }

        const json = await response.json()
        toast.error(json.message)
      }
    })

    const getTimeString = computed((): string => {
      return dayjs().format('LLLL')
    })

    const seatSelected = (e: Event, row: number): void => {
      const target = e.target as HTMLInputElement
      if (selectedRow.value === '') {
        selectedRow.value = alphabet[row - 1]
      }
      if (target.checked) {
        ticketPrice.value += zoneData[0 - 1].ticketPrices[row - 1]
        checkedSeat.value = checkedSeat.value.map(s => s.slice(1)).map(i => Number(i)).sort((n1, n2) => n1 - n2).map(i => selectedRow.value + i)
      } else {
        ticketPrice.value -= zoneData[0 - 1].ticketPrices[row - 1]
        if (!checkedSeat.value.length) {
          selectedRow.value = ''
        }
      }
    }

    const disabledOtherRow = (row:number): boolean => {
      if (selectedRow.value !== '') {
        return selectedRow.value !== alphabet[row - 1]
      } else {
        return false
      }
    }

    const seatLabelClassName = (isSeatTaken: boolean): string => {
      return isSeatTaken ? 'seats-label rounded-full hover:cursor-not-allowed' : 'seats-label rounded-full hover:cursor-pointer'
    }

    const getSectionSummaryString = (): string => {
      if (selectedSection.value.length === 0) {
        return ''
      }

      const sectionString = `${formatSectionName(transactionStore.transactionStore.section.rowPosition, transactionStore.transactionStore.section.columnPosition)}`
      return sectionString
    }

    const getSeatSummaryString = (): string => {
      if (transactionStore.transactionStore.section.seats.size === 0) {
        return ''
      }

      return `${[...transactionStore.transactionStore.section.seats.values()].map(s => formatSectionName(s.rowPosition, s.columnPosition))}`
    }

    return {
      zoneData,
      selectSeat,
      getSectionSummaryString,
      getSeatSummaryString,
      userSelectedZone,
      selectedSection,
      sectionAsValues,
      alphabet,
      priceList,
      ticketPrice,
      getTimeString,
      checkedSeat,
      seatSelected,
      disabledOtherRow,
      transactionStore,
      sectionWidth,
      formatSectionName,
      selectSection,
      sectionHeight,
      sections,
      seatWidth,
      seatHeight,
      colorRecord,
      numberToLetters,
      seatLabelClassName
    }
  }
})
</script>

<style scoped lang="scss">
.select-seat-page {
  @apply flex justify-center w-full min-h-screen bg-pale-gray;
}

.title {
  @apply font-sans text-4xl font-semibold text-white;
}

.button {
  @apply py-2 px-4 w-24 h-24 font-bold rounded focus:outline-none disabled:cursor-not-allowed bg-pale-yellow active:bg-gray-hover disabled:bg-red-disabled;
}

.button-active {
  @apply py-2 px-4 w-24 h-24 font-bold rounded bg-yellow-hover;
}

.section-text {
  @apply font-sans text-2xl font-semibold text-black;
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
  @apply flex place-self-center w-6 h-6 rounded-full appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed;
}

.zone-detail {
  @apply flex flex-col justify-between py-3 px-8 w-full xl:flex-row;
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
  @apply px-3 font-semibold text-black;
}

.right-table {
  @apply px-3 font-medium text-right text-black;
}

.submit-button-active {
  @apply py-2 px-5 w-4/5 text-xl font-semibold text-center text-black uppercase rounded-b-lg bg-pale-yellow hover:bg-yellow-hover;
}

.submit-button-disable {
  @apply py-2 px-5 w-4/5 text-xl font-semibold text-center text-white uppercase rounded-b-lg pointer-events-none bg-red-disabled;
}

.seats-label{
  @apply flex relative flex-col justify-center items-center;
}
</style>
