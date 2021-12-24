<template>
  <div class="select-seat-page">
    <div class="container py-6">
      <p class="title">Stage zones</p>
      <div class="zone">
        <div class="section">
          <button class="button" v-for="(seat, i) in seats" :key="`section-text-${i}`">
            <p class="section-text">
              {{ seat }}
            </p>
          </button>
        </div>
      </div>
      <p class="title">Zones</p>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { seats } from '@/constants'

export default defineComponent({
  name: 'select-seat',
  setup () {
    return {
      seats
    }
  }
})
</script>

<style lang="scss">
.select-seat-page {
  @apply w-full flex justify-center;
}

.title {
  @apply text-4xl font-sans font-semibold;
}

.button {
  @apply w-[100px] h-[100px] bg-pale-yellow hover:ring text-white font-bold py-2 px-4 rounded active:bg-yellow-500 focus:outline-none focus:bg-pale-gray;
}

.zone {
  @apply px-12 py-6 flex justify-center w-full
}

.section {
  @apply grid grid-cols-5 gap-4;
}

.section-text {
  @apply text-4xl font-sans font-semibold;
}
</style>
