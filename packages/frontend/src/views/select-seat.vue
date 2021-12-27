<template>
  <div class="select-seat-page">
    <div class="container py-6">
      <p class="title">Stage zones</p>
      <div class="zone">
        <div class="section">
          <button class="button" v-on:click="changeZone(zonesData.id)" v-for="(zonesData, id) in zonesData" :key="`section-text-${id}`">
            <p class="section-text">
              {{ zonesData.zone }}
            </p>
          </button>
        </div>
      </div>
      <p class="title" v-if="selectZone == 0">Zones</p>
      <p class="title" v-else>Zones {{ zonesData[selectZone-1].zone }}</p>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { zonesData } from '@/constants'

export default defineComponent({
  name: 'select-seat',
  setup () {
    const selectZone = ref(0)
    return {
      zonesData,
      selectZone
    }
  },
  methods: {
    changeZone (id: number) {
      this.selectZone = id
    }
  }
})

</script>

<style lang="scss">
.select-seat-page {
  @apply w-full flex justify-center bg-pale-gray;
}

.title {
  @apply text-4xl font-sans font-semibold text-white;
}

.button {
  @apply w-[100px] h-[100px] bg-pale-yellow hover:ring text-white font-bold py-2 px-4 rounded active:bg-gray-300 focus:outline-none focus:bg-yellow-100;
}

.zone {
  @apply px-12 py-6 flex justify-center w-full
}

.section {
  @apply grid grid-cols-5 gap-4;
}

.section-text {
  @apply text-4xl font-sans font-semibold text-black;
}
</style>
