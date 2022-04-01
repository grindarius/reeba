<template>
  <metainfo>
    <template #title="{ content }">
      {{ content }} | ReebA: Ticket booking. Redefined.
    </template>
  </metainfo>
  <div class="my-tickets-page">
    <h2 class="page-header">
      My tickets
    </h2>
    <section class="mt-8">
      <div class="hero" v-for="e in eventsList.events" :key="`my-ticket-event-list-${e.id}`">
        <div class="flex-col lg:flex-row hero-content">
          <div class="content-box-setting-image">
            <img class="rounded-lg shadow-2xl content-box-picture" :src="`${getEventImage({ eventId: e.id }).url}`">
          </div>
          <div class="content-box-textbox">
            <h1>{{ e.name }}</h1>
            <h3>Seats</h3>
            <h2>{{ e.section.name }} - {{ e.seats.map(s => s.name).sort().join(', ') }}</h2>
            <h3>Prices</h3>
            <h2>{{ format(',')(e.totalPrice) }} THB</h2>
            <h3>Show date</h3>
            <h2 class="mb-2">
              {{ formatTimeString(e.time.start) }}
            </h2>

            <div class="flex flex-col space-y-1 space-x-0 lg:flex-row lg:space-y-0 lg:space-x-1">
              <label for="transfer-ownership-modal" class="btn modal-button" @click="selectedEvent = e.transactionId">Transfer Ownership</label>
              <button class="btn">
                <router-link :to="{ name: 'Select Seat', params: { username: e.username, eventId: e.id, datetimeId: e.time.id } }">
                  Change seat
                </router-link>
              </button>
              <router-link class="btn modal-button" :to="{ name: 'Receipt', params: { transactionId: e.transactionId } }">
                View receipt
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <input type="checkbox" id="transfer-ownership-modal" class="modal-toggle" ref="transferOwnershipButtonRef">
  <label for="transfer-ownership-modal" class="cursor-pointer modal" style="background-color: #00000055;">
    <label class="relative modal-box">
      <h3 class="mb-3 text-lg font-bold">Transfering ticket.</h3>
      <h3 class="text-lg font-bold">Disclaimer</h3>
      <p>
        After you have transferred the ticket to a user, you <strong>cannot</strong> reverse this from your side anymore.
        The only way to get your ticket back is to have the end user return the ticket back to you,
        the seat will be transferred with the exact same seat configuration.
      </p>
      <div class="grid grid-cols-1 gap-6 mt-4">
        <div class="mb-4 form-control">
          <label class="label">
            <label class="label-text" for="transfer-ticket-username-input">Destination username</label>
          </label>
          <input id="transfer-ticket-username-input" type="text" class="text-black bg-white input" v-model="usernameToTransfer">
        </div>
      </div>
      <div class="flex flex-row justify-center space-y-1 space-x-0 lg:flex-row lg:space-y-0 lg:space-x-1">
        <label for="transfer-ownership-modal" class="modal-button btn btn-error" @click.prevent="transferTicket">I understand the consequences, transfer the ticket.</label>
      </div>
    </label>
  </label>
</template>

<script lang="ts">
import { format } from 'd3'
import dayjs from 'dayjs'
import ky from 'ky'
import { defineComponent, onMounted, Ref, ref } from 'vue'
import { useMeta } from 'vue-meta'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { GetMyTicketsReply } from '@reeba/common'

import { getEventImage, getMyTickets, postTransferTransaction } from '@/api/endpoints'
import { useAuthStore } from '@/store/use-auth-store'
import { formatTimeString } from '@/utils'

export default defineComponent({
  name: 'my-tickets',
  setup () {
    const store = useAuthStore()
    const router = useRouter()
    const route = useRoute()
    const toast = useToast()
    const transferOwnershipButtonRef: Ref<HTMLInputElement | null> = ref(null)
    const eventsList:Ref<GetMyTicketsReply> = ref({ events: [] })
    const usernameToTransfer = ref('')
    const selectedEvent = ref('')

    useMeta({
      title: 'My tickets'
    })

    onMounted(async () => {
      const { method, url } = getMyTickets({ username: store.userData.username })

      try {
        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${store.userData.token}`
          }
        }).json<GetMyTicketsReply>()

        eventsList.value.events = (response.events ?? []).sort((a, b) => dayjs(b.time.start).diff(a.time.start))
      } catch (error) {
        // @ts-expect-error error is unknown
        const resp = error?.response
        const json = await resp?.json()

        if (resp?.status == null) {
          router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
        }

        if (resp?.status === 401) {
          router.push({ name: 'Signin' })
          return
        }

        toast.error(json.message)
      }
    })

    const transferTicket = async (): Promise<void> => {
      if (transferOwnershipButtonRef.value != null) {
        const { method, url } = postTransferTransaction({ transactionId: selectedEvent.value })

        try {
          await ky(url, {
            method,
            json: {
              username: usernameToTransfer.value
            },
            headers: {
              Authorization: `Bearer ${store.userData.token}`
            }
          })

          transferOwnershipButtonRef.value.click()
          toast.success('Successfully transferred the ticket')
        } catch (error) {
          // @ts-expect-error error could be unknown
          const resp = error?.response
          const json = await resp?.json()

          if (resp.status == null) {
            router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
            return
          }

          if (resp.status === 401) {
            router.push({ name: 'Signin' })
            return
          }

          toast.error(json.message)
        }
      }
    }

    return {
      getEventImage,
      eventsList,
      formatTimeString,
      format,
      transferTicket,
      transferOwnershipButtonRef,
      usernameToTransfer,
      selectedEvent
    }
  }
})
</script>

<style scoped lang="scss">
.hero {
  @apply flex flex-col rounded-lg md:flex-row bg-base-200;
}

.content-box-picture {
  @apply object-cover object-center w-full h-64 md:h-full;
}

.content-box-setting-image {
  @apply md:w-1/5;
}

.content-box-textbox {
  @apply p-6 space-y-2 w-full text-left md:p-2 md:w-4/5;

  & h1 {
    @apply text-4xl font-bold text-white;
  }

  & h2 {
    @apply text-xs font-normal text-white;
  }

  & h3 {
    @apply text-base font-bold text-white;
  }
}

.page-header {
  @apply text-4xl font-semibold text-white;
}
</style>
