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
        <div class="hero-content flex-col lg:flex-row">
          <div class="content-box-setting-image">
            <img class="content-box-picture rounded-lg shadow-2xl" :src="`${getEventImage({ eventId: e.id}).url}`">
          </div>
          <div class="content-box-textbox">
            <h1>{{ e.name }}</h1>
            <h3>Seat</h3>
            <h2>{{ e.section.name }}</h2>
            <h3>Prices</h3>
            <h2>{{ format(',')(e.totalPrice) }} THB</h2>
            <h3>Show date</h3>
            <h2 class="mb-2">
              {{ formatTimeString(e.time.start) }}
            </h2>

            <div class="flex flex-col lg:flex-row space-y-1 space-x-0 lg:space-y-0 lg:space-x-1">
              <button class="btn">
                <label for="transfer-ownership-modal" class="modal-button rounded-r-none">Transfer Ownership</label>
              </button>
              <router-link to="/select-seat" custom v-slot="{ navigate }">
                <button class="btn" @click="navigate">
                  Change seats
                </button>
              </router-link>
              <router-link to="/receipt" custom v-slot="{ navigate }">
                <button class="btn" @click="navigate">
                  View receipt
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <input type="checkbox" id="transfer-ownership-modal" class="modal-toggle">
  <label for="transfer-ownership-modal" class="cursor-pointer modal" style="background-color: #00000055;">
    <label class="relative modal-box" for="">
      <h3 class="text-lg font-bold">Enter recipient username to transfer</h3>
      <div class="grid grid-cols-1 gap-6 mt-4 ">
        <div>
          <label class="text-header" for="Name">Username</label>
          <input id="edit-user-settings-username-input" type="username" class="box-text">
        </div>
      </div>
      <div class="flex flex-col lg:flex-row space-y-1 space-x-0 lg:space-y-0 lg:space-x-1 justify-end">
        <button class="btn">
          <label for="cancel" class="modal-button rounded-r-none">Cancel</label>
        </button>
        <button class="btn">
          <label for="send" class="modal-button rounded-r-none">Send</label>
        </button>
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

import { GetMyTicketsReply } from '@reeba/common'

import { getEventImage, getMyTickets } from '@/api/endpoints'
import { useAuthStore } from '@/store/use-auth-store'
import { formatTimeString } from '@/utils'

export default defineComponent({
  name: 'my-tickets',
  setup () {
    const store = useAuthStore()
    const eventsList:Ref<GetMyTicketsReply> = ref({ events: [] })

    useMeta({
      title: 'My tickets'
    })

    onMounted(async () => {
      const { method, url } = getMyTickets({ username: store.userData.username })

      const response = await ky(url, {
        method,
        headers: {
          Authorization: `Bearer ${store.userData.token}`
        }
      }).json<GetMyTicketsReply>()
      eventsList.value.events = (response.events ?? []).sort((a, b) => dayjs(b.time.start).diff(a.time.start))
    })

    return {
      getEventImage,
      eventsList,
      formatTimeString,
      format
    }
  }
})
</script>

<style scoped lang="scss">
.hero  {
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
    @apply text-base font-bold text-white ;
  }
}

.page-header {
  @apply text-4xl font-semibold text-white;
}

.box-text{
  @apply block py-2 px-4 mt-auto mb-5 w-full text-gray-700 bg-white rounded-md border border-gray-300;
}

</style>
