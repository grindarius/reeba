<template>
  <div class="create-event-page">
    <div class="create-event-page-content">
      <h3 class="font-medium text-4xl text-white">
        Create event
      </h3>
      <div class="event-descriptions">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 mt-6 py-4">
          <div class="input-box col-span-4">
            <label for="event-name" class="block font-bold py-2 text-white text-xs tracking-wide uppercase">Event name</label>
            <input type="text" id="event-name" name="event-name" class="appearance-none input" placeholder="LOVE YOUR SELF">
          </div>
          <div class="input-box col-span-4">
            <label for="event-website-name" class="block font-bold py-2 text-white text-xs tracking-wide uppercase">Website</label>
            <input type="text" id="event-website-name" name="event-website-name" class="appearance-none input" placeholder="https://event.reeba.com">
          </div>
          <div class="input-box col-span-4 md:col-span-2">
            <label for="event-date" class="block font-bold py-2 text-white text-xs tracking-wide uppercase">Date</label>
            <input type="date" id="event-date" name="event-date" class="input">
          </div>
          <div class="input-box col-span-4 md:col-span-2">
            <label for="event-start-time" class="block font-bold py-2 text-white text-xs tracking-wide uppercase">Start time</label>
            <input type="time" id="event-start-time" name="event-start-time" class="input">
          </div>
          <div class="input-box col-span-4 md:col-span-1">
            <label for="event-location-name" class="block font-bold py-2 text-white text-xs tracking-wide uppercase">Location name</label>
            <input type="text" id="event-location-name" name="event-location-name" class="appearance-none input" placeholder="Rajamangkala National Stadium">
          </div>
          <div class="input-box col-span-4 md:col-span-3">
            <label for="event-location-coords" class="block font-bold py-2 text-white text-xs tracking-wide uppercase">Location coordinates</label>
            <input type="text" id="event-location-coords" name="event-location-coords" class="appearance-none input" placeholder="latitude,longitude">
          </div>
          <div class="input-box col-span-4">
            <label for="event-contact" class="block font-bold py-2 text-white text-xs tracking-wide uppercase">Who to contact</label>
            <input type="text" id="event-contact" name="event-contact" class="appearance-none input" placeholder="Ms. Sopaphorn Jamyoo">
          </div>
          <div class="input-box col-span-4">
            <label for="event-contact-credentials" class="block font-bold py-2 text-white text-xs tracking-wide uppercase">Credentials</label>
            <input type="text" id="event-contact-credentials" name="event-contact-credentials" class="appearance-none input" placeholder="092-3245423">
          </div>
          <hr class="border col-span-4 border-pale-yellow mt-8 w-full">
        </div>
      </div>
      <div class="event-sections">
        <h3 class="font-medium text-4xl text-white my-6">
          Event sections
        </h3>
        <div class="flex flex-col md:flex-row gap-y-4 gap-x-6">
          <div class="input-box grow">
            <label for="event-section-rows" class="block font-bold py-2 text-white text-xs tracking-wide uppercase">Section rows</label>
            <input type="number" id="event-section-rows" name="event-section-rows" class="input" step="1" v-model="selectedSectionRow">
          </div>
          <div class="input-box grow">
            <label for="event-section-columns" class="block font-bold py-2 text-white text-xs tracking-wide uppercase">Section columns</label>
            <input type="number" id="event-section-columns" name="event-section-columns" class="input" step="1" v-model="selectedSectionColumn">
          </div>
        </div>
        <div class="event-sections-visualize">
          <div class="grid max-w-min gap-4 mx-auto my-0" :style="selectedSectionStyles">
            <template v-for="row in sections" :key="JSON.stringify(row)">
              <template v-for="button in row" :key="button">
                <button :class="selectedSection === button ? 'button-active' : 'button'" @click="onSelectedSection(button)">
                  <h1 class="text-4xl font-sans font-semibold text-black">
                    {{ button }}
                  </h1>
                </button>
              </template>
            </template>
          </div>
        </div>
        <hr class="border col-span-4 border-pale-yellow mt-8 w-full">
      </div>
      <div class="event-seatings">
        <h3 class="font-medium text-4xl text-white my-6">
          Zone {{ selectedSection }}
        </h3>
        <div class="flex flex-col md:flex-row gap-y-4 gap-x-6">
          <div class="input-box grow">
            <label for="event-zone-rows" class="block font-bold py-2 text-white text-xs tracking-wide uppercase">Zone rows</label>
            <input type="number" id="event-zone-rows" name="event-zone-rows" class="input" step="1" v-model="selectedZoneRow">
          </div>
          <div class="input-box grow">
            <label for="event-zone-columns" class="block font-bold py-2 text-white text-xs tracking-wide uppercase">Zone columns</label>
            <input type="number" id="event-zone-columns" name="event-zone-columns" class="input" step="1" v-model="selectedZoneColumn">
          </div>
        </div>
        <div class="seatings">
          <div class="grid max-w-min gap-3 mx-auto mt-3 mb-6 overflow-x-auto" :style="selectedZoneStyles">
            <template v-for="row in zones" :key="JSON.stringify(row)">
              <template v-for="seat in row" :key="seat">
                <button
                  @click="onSeatChange(seat)"
                  class="p-3 m-3 rounded-full bg-pale-yellow"></button>
              </template>
            </template>
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="bg-pale-yellow outline-none disabled:bg-red-disabled focus:ring-pale-gray hover:bg-yellow-hover justify-center flex flex-row tracking-wide w-full py-2 rounded-lg">
        <span>Submit</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, StyleValue } from 'vue'

import { generateEventSections } from '@/utils'

export default defineComponent({
  name: 'create-event',
  setup () {
    const selectedSection = ref('A1')
    const selectedSectionRow = ref('5')
    const selectedSectionColumn = ref('5')
    const selectedZoneRow = ref('5')
    const selectedZoneColumn = ref('5')

    const sections = computed(() => generateEventSections(Number(selectedSectionRow.value) || 1, Number(selectedSectionColumn.value) || 1))
    const zones = computed(() => generateEventSections(Number(selectedZoneRow.value) || 1, Number(selectedZoneColumn.value || 1)))
    const selectedSectionStyles = computed<StyleValue>(() => {
      return {
        'grid-template-columns': `repeat(${selectedSectionColumn.value || '1'}, 100px)`,
        'grid-template-rows': `repeat(${selectedSectionRow.value || '1'}, 100px)`
      }
    })
    const selectedZoneStyles = computed(() => {
      return {
        'grid-template-columns': `repeat(${selectedZoneColumn.value || '1'}, 16px)`,
        'grid-template-rows': `repeat(${selectedZoneRow.value || '1'}, 16px)`
      }
    })

    const onSelectedSection = (value: string): void => {
      selectedSection.value = value
    }

    const onSeatChange = (value: string): void => {
      console.log(value)
    }

    return {
      sections,
      onSelectedSection,
      selectedSection,
      selectedSectionRow,
      selectedSectionColumn,
      selectedZoneRow,
      selectedZoneColumn,
      selectedSectionStyles,
      selectedZoneStyles,
      zones,
      onSeatChange
    }
  }
})
</script>

<style scoped lang="scss">
.create-event-page {
  @apply bg-pale-gray w-full min-h-screen pb-48 flex flex-row justify-center;
}

.create-event-page-content {
  @apply container mt-12 px-6 lg:px-0;
}

.event-zone {
  @apply bg-pale-gray w-full flex flex-row justify-center;
}

.zone {
  @apply bg-pale-gray w-full flex flex-row justify-center;
}

.button {
  @apply w-[100px] h-[100px] bg-pale-yellow hover:ring text-white font-bold py-2 px-4 rounded active:bg-gray-hover focus:outline-none;
}

.button-active {
  @apply w-[100px] h-[100px] bg-yellow-hover text-white font-bold py-2 px-4 rounded;
}

.input {
  @apply outline-none ring-pale-gray focus:ring-gray-hover bg-gray-100 focus:bg-white rounded w-full px-4 py-3;
}

.event-sections-visualize {
  @apply mt-3 overflow-x-auto w-full p-3;
}

input[type=number] {
  margin: 0;

  &::-webkit-inner-spin-button {
    appearance: none;
  }

  &::-webkit-outer-spin-button {
    appearance: none;
  }
}
</style>
