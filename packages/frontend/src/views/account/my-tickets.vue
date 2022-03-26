<template>
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
            <h2>{{ e.totalPrice }} THB</h2>
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
      <h3 class="text-lg font-bold">Congratulations random Interner user!</h3>
      <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    </label>
  </label>
</template>

<script lang="ts">
import ky from 'ky'
import { defineComponent, onMounted, Ref, ref } from 'vue'

import { GetMyTicketsReply } from '@reeba/common'

import { getEventImage, getMyTickets } from '@/api/endpoints'
import { useCounter } from '@/composables'
import { useAuthStore } from '@/store/use-auth-store'
import { formatTimeString } from '@/utils'

export default defineComponent({
  name: 'my-tickets',
  setup () {
    const { life } = useCounter()
    const store = useAuthStore()
    const eventsList:Ref<GetMyTicketsReply> = ref({ events: [] })

    onMounted(async () => {
      console.log(life.value)
      const { method, url } = getMyTickets({ username: store.userData.username })

      const response = await ky(url, {
        method,
        headers: {
          Authorization: `Bearer ${store.userData.token}`
        }
      }).json<GetMyTicketsReply>()
      eventsList.value.events = response.events ?? []
    })

    return {
      life,
      getEventImage,
      eventsList,
      formatTimeString
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

</style>
