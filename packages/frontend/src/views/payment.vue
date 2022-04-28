<template>
  <metainfo>
    <template #title="{ content }">
      {{ content }} | ReebA: Ticket booking. Redefined.
    </template>
  </metainfo>
  <div class="payment-page">
    <div class="payment-section">
      <div class="payment-card">
        <h1 class="text-4xl font-medium text-black">
          {{ eventDataResponse?.name ?? '' }}
        </h1>
        <div class="payment-details">
          <div class="payment-channels">
            <h1 class="mb-6 font-sans text-2xl text-black">
              Payment Details
            </h1>
            <div class="payment-selectors">
              <div class="payment-type-selections">
                <h1 class="font-sans text-xl text-white">
                  Payment Types
                </h1>
                <div class="payment-types">
                  <div class="payment-method">
                    <v-mdi name="mdi-credit-card" fill="#D5A755" size="32" />
                    <h1 class="mt-2 font-sans text-white text-md">
                      Credit card
                    </h1>
                  </div>
                </div>
              </div>
              <div class="selected-payment">
                <div class="credit-card-payment">
                  <label for="card-number-input" class="inline-block mt-2 font-sans text-sm text-white">Card number</label>
                  <input
                    type="text" name="card-number-input"
                    id="card-number-input" placeholder="**** **** **** ****"
                    v-cleave="{ creditCard: true }"
                    v-model="creditCardInput">
                  <label for="card-name-input" class="inline-block mt-2 font-sans text-sm text-white">Card name</label>
                  <input type="text" name="card-name-input" id="card-name-input" v-model="creditCardNameInput">
                  <div class="grid grid-cols-2 gap-6 mt-2">
                    <div class="card-expiration-date-section">
                      <label for="card-expiration-date" class="font-sans text-sm text-white">Expiration date</label>
                      <input
                        type="text" name="card-expiration-date-input"
                        id="card-expiration-date-input"
                        v-cleave="{ date: true, datePattern: ['m', 'y'] }"
                        v-model="creditCardExpiryDateInput">
                    </div>
                    <div class="card-cvc-section">
                      <label for="card-cvc-input" class="font-sans text-sm text-white">CVC</label>
                      <input
                        type="text" name="card-cvc-input"
                        id="card-cvc-input" placeholder="***"
                        maxlength="3"
                        pattern="\d*"
                        v-model="creditCardCVCInput">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="receipt">
            <h1 class="mb-6 font-sans text-2xl text-black">
              Payment Receipt
            </h1>
            <div class="payment-small-receipt">
              <h1 class="mb-2 font-sans text-xl text-white">
                Ticket Type
              </h1>
              <div class="ticket-type">
                <h1 class="text-white">
                  {{ showSeat }}
                </h1>
                <h1 class="text-white">
                  THB {{ format(',')([...transactionStore.transactionStore.section.seats.values()].reduce((prev, curr) => prev + curr.price, 0)) }}
                </h1>
              </div>
              <h1 class="font-sans text-gray-400 text-s">
                (THB {{ format(',')(transactionStore.currentPrice) }} × {{ transactionStore.transactionStore.section.seats.size }})
              </h1>
              <div class="subtotal-detail">
                <h1 class="font-sans text-lg text-white">
                  Subtotal
                </h1>
                <h1 class="font-sans text-lg text-white">
                  THB {{ format(',')([...transactionStore.transactionStore.section.seats.values()].reduce((prev, curr) => prev + curr.price, 0)) }}
                </h1>
              </div>
              <div class="font-sans text-white service-fee-detail">
                <h1 class="text-lg">
                  Service Fee
                </h1>
                <h1 class="text-lg">
                  THB 40
                </h1>
              </div>
              <div class="font-sans text-lg text-white credit-fee-detail">
                <h1>Credit Card Fee (VAT incl.)</h1>
                <h1>THB 5</h1>
              </div>
            </div>
            <div class="mt-5 font-sans text-2xl text-black total-detail">
              <h1>Total</h1>
              <h1 class="text-gray-600">
                THB {{ format(',')([...transactionStore.transactionStore.section.seats.values()].reduce((prev, curr) => prev + curr.price, 0) + 45) }}
              </h1>
            </div>
            <div class="mt-5 text-black agree-check">
              <input type="checkbox" id="scales" name="scales" unchecked v-model="isAgreed">
              <label for="scales">
                By checking out, I agree to <a class="font-bold underline text-pale-yellow">ReebA's Terms of Service</a>
                and <a class="font-bold underline text-pale-yellow">Event Organizer's Disclaimer.</a>
                I accept that the items in this order cannot be canceled and payments are non-refundable.
              </label>
              <button class="checkout-button" @click="checkSeat">
                Pay now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Cleave from 'cleave.js'
import { format } from 'd3'
import ky from 'ky'
import { computed, defineComponent, onMounted, Ref, ref } from 'vue'
import { useMeta } from 'vue-meta'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { GetIndividualEventReply, numberToLetters } from '@reeba/common'

import {
  getIndividualEventEndpoint,
  postTransactionEndpoint
} from '@/api/endpoints'
import { useAuthStore } from '@/store/use-auth-store'
import { useTransactionStore } from '@/store/use-transaction-store'

export default defineComponent({
  name: 'payment',
  beforeRouteEnter (_, from, next) {
    if (from.name !== 'Select Seat') {
      next('/')
    }
    next()
  },
  directives: {
    cleave: {
      mounted: (el, binding) => {
        el.cleave = new Cleave(el, binding.value || {})
      },
      updated: (el) => {
        const e = new Event('input', { bubbles: true })
        setTimeout(function () {
          el.value = el.cleave.properties.result
          el.dispatchEvent(e)
        }, 100)
      }
    }
  },
  setup () {
    const transactionStore = useTransactionStore()
    const authStore = useAuthStore()

    const router = useRouter()
    const route = useRoute()
    const toast = useToast()
    const isAgreed = ref(false)

    const creditCardInput = ref('')
    const creditCardNameInput = ref('')
    const creditCardExpiryDateInput = ref('')
    const creditCardCVCInput = ref('')

    useMeta({
      title: 'Payment'
    })

    const eventDataResponse: Ref<GetIndividualEventReply | undefined> = ref(undefined)

    onMounted(async () => {
      const {
        method: getIndividualEventMethod,
        url: getIndividualEventUrl
      } = getIndividualEventEndpoint({ eventId: route.params.eventId as string ?? '' })

      try {
        const response = await ky(getIndividualEventUrl, {
          method: getIndividualEventMethod
        }).json<GetIndividualEventReply>()

        eventDataResponse.value = response
      } catch (error) {
        // @ts-expect-error error is unknown
        const response = error?.response

        if (response.status !== 200) {
          router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
        }
      }
    })

    const checkSeat = async (): Promise<void> => {
      const { method, url } = postTransactionEndpoint

      if (creditCardInput.value.length < 16) {
        toast.error('invalid credit card number')
        return
      }

      if (creditCardNameInput.value.length === 0) {
        toast.error('invalid credit card name')
        return
      }

      if (creditCardExpiryDateInput.value.length < 4) {
        toast.error('invalid credit card expiry date')
        return
      }

      if (creditCardCVCInput.value.length < 3) {
        toast.error('invalid credit card cvc input')
        return
      }

      if (isAgreed.value === false) {
        return
      }

      try {
        await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          },
          json: {
            eventId: transactionStore.transactionStore.eventId,
            datetimeId: transactionStore.transactionStore.datetimeId,
            sectionId: transactionStore.transactionStore.section.id,
            seatIds: [...transactionStore.transactionStore.section.seats.keys()]
          }
        })

        transactionStore.removeTransaction()
        router.push('/account')
      } catch (error) {
        // @ts-expect-error error is unknown
        const resp = error?.response
        console.log(resp)
        if (resp.status === 401) {
          const json = await resp.json()
          toast.error(json.message)
          router.push({ name: 'Signin' })
        }
        toast.error('Unexpected Error')
      }
    }

    const showSeat = computed(() => {
      const section = `${numberToLetters(transactionStore.transactionStore.section.rowPosition)}${transactionStore.transactionStore.section.columnPosition + 1}`
      const seat = `${[...transactionStore.transactionStore.section.seats.values()].map(t => {
        return `${numberToLetters(t.rowPosition)}${t.columnPosition + 1}`
      }).join(', ')}`
      return section + ' - ' + seat
    })

    return {
      creditCardInput,
      creditCardNameInput,
      creditCardExpiryDateInput,
      isAgreed,
      checkSeat,
      transactionStore,
      numberToLetters,
      showSeat,
      format,
      eventDataResponse,
      creditCardCVCInput
    }
  }
})
</script>

<style scoped lang="scss">
.payment-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.payment-section {
  @apply container py-14;
}

.payment-channels {
  @apply col-span-2;
}

.payment-card {
  @apply p-6 w-full bg-white rounded-xl;
}

.payment-details {
  @apply grid grid-cols-1 gap-4 justify-center mt-10 md:grid-cols-3;
}

.payment-selectors, .payment-small-receipt {
  @apply p-6 bg-gray-800 rounded-lg;
}

.payment-types {
  @apply flex flex-row justify-center mt-4;
}

.payment-method {
  @apply w-32 text-center;
}

.payment-receipt {
  @apply flex flex-row justify-center mt-4;
}

.selected-payment {
  @apply mt-8;
}

.ticket-seat {
  @apply flex flex-row justify-center mt-4;
}

.ticket-type {
  @apply flex justify-between;
}

.subtotal-detail, .service-fee-detail, .credit-fee-detail, .total-detail  {
  @apply flex justify-between mt-2;
}

.agree-check {
  @apply mt-2 text-sm;
}

.checkout-button {
  @apply flex justify-center items-center mt-6 w-full h-12 font-sans text-2xl text-white rounded-full bg-pale-yellow hover:bg-yellow-hover;
}

#card-number-input, #card-name-input, #card-expiration-date-input, #card-cvc-input {
  @apply w-full h-9 font-sans text-white bg-gray-800 border-b border-gray-600 outline-none;
}
</style>
