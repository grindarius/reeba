<template>
  <div class="devtool-transactions-page">
    <div class="devtool-transactions-page-content">
      <h1 class="page-header">
        Transactions
      </h1>
      <div class="transaction-table">
        <div class="uppercase border-t border-b border-collapse table-cell-string border-t-black border-b-black">
          User
        </div>
        <div class="uppercase border-t border-b border-collapse table-cell-string border-t-black border-b-black">
          Transaction time
        </div>
        <div class="uppercase border-t border-b border-collapse table-cell-string border-t-black border-b-black">
          Seat ID
        </div>
        <template v-for="t in transactionsRef" :key="JSON.stringify(t)">
          <h1 class="font-sans text-sm font-medium text-black table-cell-string">
            {{ t.username }}
          </h1>
          <h1 class="font-sans text-sm font-medium text-black table-cell-string">
            {{ formatTime(t.time) }}
          </h1>
          <h1 class="font-mono text-sm font-medium text-black break-words table-cell-string">
            {{ t.seatId }}
          </h1>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

import { transactionsDataTable } from '@/constants'

export default defineComponent({
  name: 'devtool-transactions',
  setup () {
    const transactionsRef = ref(transactionsDataTable)
    const router = useRouter()

    const goToEventPage = (): void => {
      router.push('/events')
    }

    const formatTime = (timestamp: string): string => {
      return dayjs(timestamp).format('MMMM D, YYYY, HH:mm:ss')
    }

    return {
      formatTime,
      transactionsRef,
      goToEventPage
    }
  }
})
</script>

<style scoped lang="scss">
.devtool-transactions-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.devtool-transactions-page-content {
  @apply container;
}

.page-header {
  @apply text-4xl font-semibold text-white;
}

.table-cell-string {
  @apply py-4 px-5 text-sm text-left;
}

.transaction-table {
  @apply grid mt-8 w-full rounded-lg bg-pale-yellow;
  grid-template-columns: 2fr 1fr 1fr;
}
</style>
