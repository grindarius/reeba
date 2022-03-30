<template>
  <div class="receipt-page">
    <div class="receipt-page-content">
      <div class="receipt-section">
        <div class="receipt-section-header">
          <div class="flex flex-row justify-center items-start">
            <h1 class="py-8 text-4xl font-bold text-white">
              Payment receipt
            </h1>
          </div>
          <qrcode-vue :value="url + $route.fullPath" :margin="1" :size="250" level="M" />
        </div>
        <div class="receipt-section-description">
          <h1 class="receipt-header">
            Event name
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">
              {{ receiptData?.eventName ?? '' }}
            </span>
          </div>
          <h1 class="receipt-header">
            Username
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">
              {{ receiptData?.username ?? '' }}
            </span>
          </div>
          <h1 class="receipt-header">
            Venue
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">
              {{ receiptData?.venueName ?? '' }}
            </span>
          </div>
          <h1 class="receipt-header">
            Date & Time
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">
              {{ formatTimeString(receiptData?.firstStartDatetime ?? dayjs().toISOString(), 'D MMMM YYYY H:mm') }}
            </span>
          </div>
          <h1 class="receipt-header">
            Section
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">
              {{ `${numberToLetters(receiptData?.sectionRowPosition ?? 0)}${(receiptData?.sectionColumnPosition ?? 0) + 1}` }}
            </span>
          </div>
          <h1 class="receipt-header">
            Seat number
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">
              {{ (receiptData?.seatDetail ?? []).sort((a, b) => a.seatRowPosition - b.seatRowPosition || a.seatColumnPosition - b.seatColumnPosition).map(s => `${numberToLetters(s.seatRowPosition)}${s.seatColumnPosition + 1}`).join(', ') }}
            </span>
          </div>
          <h1 class="receipt-header">
            Quantity
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">
              {{ (receiptData?.seatDetail ?? []).length }}
            </span>
          </div>
          <h1 class="receipt-header">
            Unit price (THB)
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">
              {{ format(',')((receiptData?.seatDetail ?? []).reduce((total, curr) => curr.seatPrice + total, 0)) }}
            </span>
          </div>
          <h1 class="receipt-header">
            Service fee (40 THB/ticket)
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">
              {{ format(',')((receiptData?.seatDetail ?? []).length * 40) }}
            </span>
          </div>
          <h1 class="receipt-header">
            Credit card fee (THB)
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">5</span>
          </div>
          <h1 class="receipt-header">
            Total price (THB)
          </h1>
          <div class="receipt-description-box">
            <span class="receipt-description-box-text">
              {{ format(',')((receiptData?.seatDetail ?? []).reduce((total, curr) => curr.seatPrice + total + 40, 0) + 5) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { format } from 'd3'
import dayjs from 'dayjs'
import ky from 'ky'
import QRcodeVue from 'qrcode.vue'
import { defineComponent, onMounted, Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { GetTransactionReply, numberToLetters } from '@reeba/common'

import { getTransaction, url } from '@/api/endpoints'
import { useAuthStore } from '@/store/use-auth-store'
import { formatTimeString } from '@/utils'

export default defineComponent({
  name: 'receipt',
  components: {
    'qrcode-vue': QRcodeVue
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()

    const receiptData: Ref<GetTransactionReply | undefined> = ref(undefined)

    const getReceiptData = async (): Promise<void> => {
      try {
        const { method, url } = getTransaction({ transactionId: route.params.transactionId as string ?? '' })

        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          }
        }).json<GetTransactionReply>()

        receiptData.value = response
      } catch (error) {
        // @ts-expect-error error is unknown
        const resp = error?.response

        if (resp?.status == null) {
          router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
          return
        }

        if (resp?.status === 400) {
          router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
          return
        }

        if (resp?.status === 401) {
          router.push({ name: 'Signin' })
          return
        }

        router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
      }
    }

    onMounted(async () => {
      await getReceiptData()
    })

    return {
      authStore,
      receiptData,
      url,
      numberToLetters,
      dayjs,
      formatTimeString,
      format
    }
  }
})
</script>

<style scoped lang="scss">
.receipt-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.receipt-page-content {
  @apply container my-10 lg:px-32;
}

.receipt-section {
  @apply p-8 w-full h-full rounded-md bg-base-300;
}

.receipt-section-header {
  @apply flex flex-col justify-start items-center mb-6 sm:flex-row sm:justify-between;
}

.receipt-section-description {
  @apply grid grid-cols-3 grid-flow-row gap-4;
}

.receipt-header {
  @apply text-2xl text-white;
}

.receipt-description-box {
  @apply col-span-2 px-4 leading-loose bg-white rounded-lg;
}

.receipt-description-box-text {
  @apply text-xl leading-loose text-base-100;
}
</style>
