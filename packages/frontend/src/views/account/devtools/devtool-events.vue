<template>
  <div class="devtool-events-page">
    <div class="devtool-events-page-content">
      <h1 class="page-header">
        Events
      </h1>
      <div class="events-table">
        <div class="uppercase border-t border-b border-collapse table-cell-string border-t-black border-b-black">
          Title
        </div>
        <div class="uppercase border-t border-b border-collapse table-cell-string border-t-black border-b-black">
          Status
        </div>
        <div class="uppercase border-t border-b border-collapse table-cell-string border-t-black border-b-black">
          Total tickets
        </div>
        <div class="uppercase border-t border-b border-collapse table-cell-string border-t-black border-b-black">
          Sold tickets
        </div>
        <template v-for="ev in eventsRef" :key="JSON.stringify(ev)">
          <div class="py-4 px-5 cursor-pointer" @click="goToEventPage()">
            <h1 class="font-sans text-sm font-medium text-black">
              {{ ev.title }}
            </h1>
            <h1 class="font-sans text-sm font-normal text-gray-500">
              {{ ev.place }}
            </h1>
          </div>
          <div class="flex flex-row justify-start self-start py-4 px-5">
            <span v-if="ev.status === 'closed'" class="inline-flex px-2 text-sm text-red-500 bg-red-100 rounded-2xl">
              Closed
            </span>
            <span v-else class="inline-flex px-2 text-sm text-green-800 bg-green-100 rounded-2xl">
              Open
            </span>
          </div>
          <h1 class="font-mono text-sm font-medium text-black table-cell-string">
            {{ ev.totaltickets }}
          </h1>
          <h1 class="font-mono text-sm font-medium text-black table-cell-string">
            {{ ev.tickets }}
          </h1>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

import { eventsDatatable } from '@/constants'

export default defineComponent({
  name: 'devtool-events',
  setup () {
    const eventsRef = ref(eventsDatatable)
    const router = useRouter()

    const goToEventPage = (): void => {
      router.push('/event')
    }

    return {
      eventsRef,
      goToEventPage
    }
  }
})
</script>

<style scoped lang="scss">
.devtool-events-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.devtool-events-page-content {
  @apply container;
}

.page-header {
  @apply text-4xl font-semibold text-white;
}

.table-cell-string {
  @apply py-4 px-5 text-sm text-left;
}

.events-table {
  @apply grid mt-8 w-full rounded-lg bg-pale-yellow;
  grid-template-columns: 2fr 1fr 1fr 1fr;
}
</style>
