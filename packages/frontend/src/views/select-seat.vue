<template>
  <div class="select-seat-page">
    <div class="base">
      <p class="title">Stage zones</p>
      <div class="zone">
        <div class="section">
          <button :class="[zonesData.id === selectZone? 'button-active': 'button']" v-on:click="changeZone(zonesData.id)" v-for="(zonesData, id) in zonesData" :key="`section-text-${id}`">
            <p class="section-text">
              {{ zonesData.zone }}
            </p>
          </button>
        </div>
      </div>
      <p class="title" v-if="selectZone === 0">Select the zone</p>
      <p class="title" v-else>Zone {{ zonesData[selectZone-1].zone }}</p>
      <div v-if="selectZone === 0"></div>
      <div class="selected" v-else>
        <div class="price-list">
          <div class="price-rate" v-for="(price, id) in zonesData[selectZone-1].price" :key="`price-rate-${id}`">
            <div class="price-color"></div>
            <p class="text-white">
                {{ price }}
            </p>
          </div>
        </div>
        <div class="zone-detail">
          <div class="seats">
            <div class="seats-rows" v-for="x in 5" :key="x">
              <p class="px-1 text-white">A</p>
              <button class="price-color" v-for="x in 15" :key="x">
              </button>
            </div>
          </div>
           <div class="grow">
          </div>
          <div class="seats-details">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { zoneColumns, zoneRows, zonesData } from '@/constants'

export default defineComponent({
  name: 'select-seat',
  setup () {
    const selectZone = ref(0)
    return {
      zonesData,
      selectZone,
      zoneColumns,
      zoneRows,
      '--zoneColumns': zoneColumns
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
  @apply w-full flex justify-center bg-pale-gray min-h-screen;
}

.base {
  @apply container py-6;
}

.title {
  @apply text-4xl font-sans font-semibold text-white;
}

.button {
  @apply w-[100px] h-[100px] bg-pale-yellow hover:ring text-white font-bold py-2 px-4 rounded active:bg-gray-300 focus:outline-none;
}

.button-active {
  @apply w-[100px] h-[100px] bg-amber-200 hover:ring text-white font-bold py-2 px-4 rounded active:bg-gray-300 focus:outline-none;
}

.zone {
  @apply px-12 py-6 flex md:justify-center w-full
}

.section {
  @apply grid gap-4;
  grid-template-columns: repeat(5, minmax(100px, 100px))
}

.section-text {
  @apply text-4xl font-sans font-semibold text-black;
}

.selected {
  @apply w-full;
}

.price-list {
  @apply gap-9 columns-1 flex justify-center;
}

.price-rate {
  @apply flex columns-1 gap-3 py-3;
}

.price-color {
  @apply rounded-full px-3 py-3 bg-white;
}

.zone-detail {
  @apply flex w-full py-3 px-8;
}

.seats {
  @apply py-24 basis-1/2;
}

.seats-rows {
  @apply flex columns-1 gap-2 py-1 justify-center;
}

.seats-details {
  @apply bg-white h-10 w-10 basis-1/3;
}
</style>
