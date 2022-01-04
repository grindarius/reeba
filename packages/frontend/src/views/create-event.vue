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
            <input type="text" id="event-contact-credentials" name="event-contact-credentials" class="appearance-none input" placeholder="">
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
            <input type="number" id="event-section-rows" name="event-section-rows" class="input" step="1" v-model="selectedSectionColumn">
          </div>
          <div class="input-box grow">
            <label for="event-section-columns" class="block font-bold py-2 text-white text-xs tracking-wide uppercase">Section columns</label>
            <input type="number" id="event-section-columns" name="event-section-columns" class="input" step="1" v-model="selectedSectionRow">
          </div>
        </div>
        <div class="event-sections-visualize">
          <div class="p-6 grid gap-4 mx-auto my-0" :style="{ 'grid-template-columns': `repeat(${selectedSectionColumn}, 100px)`, 'grid-template-rows': `repeat(${selectedSectionRow}, 100px)` }">
            <template v-for="(row) in sections" :key="JSON.stringify(row)">
              <template v-for="(button) in row" :key="button">
                <button :class="selectedSection === button ? 'button-active' : 'button'" @click="onSelectedSection(button)">
                  <h1 class="text-4xl font-sans font-semibold text-black">
                    {{ button }}
                  </h1>
                </button>
              </template>
            </template>
          </div>
        </div>
      </div>
      <div class="event-seatings">
      </div>
    </div>
  </div>

  <div class="zone">
    <div class="container mt-12 px-6 lg:px-0">
      <h3 class="font-medium text-4xl text-white">
        Zones
      </h3>
      <div class="flex flex-wrap mt-6 rounded-lg">
        <!--Rows-->
        <div class="md:w-1/2 mt-6 pr-3 w-full">
          <label class="block font-bold py-2 text-white text-xs tracking-wide uppercase" for="contact-name">Zone rows</label>
          <input id="rows" class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 leading-tight px-4 py-3 rounded w-full" type="number" placeholder="0">
        </div>

        <!--Columns-->
        <div class="md:w-1/2 mt-6 pl-3 w-full">
          <label class="block font-bold py-2 text-white text-xs tracking-wide uppercase" for="contact-id">Zone columns</label>
          <input id="columns" class="appearance-none bg-gray-100 block border border-gray-200 focus:bg-white focus:border-gray-500 leading-tight px-4 py-3 rounded w-full" type="number" placeholder="0">
        </div>

        <!-- <div class="mt-8 py-3 w-full">
          <button type="submit" class="bg-pale-yellow block border border-transparent disabled:text-gray-900 focus:ring-2
          focus:ring-pale-gray focus:ring-offset-2 font-semibold hover:bg-amber-200 justify-center mb-2 px-10 py-2 rounded-md shadow-sm text-sm text-pale-gray tracking-wide uppercase w-full">
            <span>Submit</span>
          </button>
        </div> -->
      </div>

      <div class="sit">
        <div class="bg-pale-gray py-6 flex items-center justify-center space-x-6">
          <div class="bg-pale-yellow w-8 h-8 rounded-full"></div>
          <div class="bg-pale-yellow w-8 h-8 rounded-full"></div>
          <div class="bg-pale-yellow w-8 h-8 rounded-full"></div>
          <div class="bg-pale-yellow w-8 h-8 rounded-full"></div>
          <div class="bg-pale-yellow w-8 h-8 rounded-full"></div>
          <div class="bg-pale-yellow w-8 h-8 rounded-full"></div>
          <div class="bg-pale-yellow w-8 h-8 rounded-full"></div>
          <div class="bg-pale-yellow w-8 h-8 rounded-full"></div>
          <div class="bg-pale-yellow w-8 h-8 rounded-full"></div>
          <div class="bg-pale-yellow w-8 h-8 rounded-full"></div>
        </div>

        <div class="bg-pale-gray flex items-center justify-center space-x-6">
          <div class="bg-pale-yellow w-8 h-8 rounded-full"></div>
          <div class="bg-pale-yellow w-8 h-8 rounded-full"></div>
          <div class="bg-pale-yellow w-8 h-8 rounded-full"></div>
          <div class="bg-pale-yellow w-8 h-8 rounded-full"></div>
          <div class="bg-pale-yellow w-8 h-8 rounded-full"></div>
          <div class="bg-pale-yellow w-8 h-8 rounded-full"></div>
          <div class="bg-pale-yellow w-8 h-8 rounded-full"></div>
          <div class="bg-pale-yellow w-8 h-8 rounded-full"></div>
          <div class="bg-pale-yellow w-8 h-8 rounded-full"></div>
          <div class="bg-pale-yellow w-8 h-8 rounded-full"></div>
        </div>
      </div>

      <div class="mt-8 py-3 w-full">
          <button type="submit" class="bg-pale-yellow block border border-transparent disabled:text-gray-900 focus:ring-2
          focus:ring-pale-gray focus:ring-offset-2 font-semibold hover:bg-amber-200 justify-center mb-2 px-10 py-2 rounded-md shadow-sm text-sm text-pale-gray tracking-wide uppercase w-full">
            <span>Submit</span>
          </button>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import { generateEventSections } from '@/utils/array'

export default defineComponent({
  name: 'create-event',
  setup () {
    const selectedSection = ref('A1')
    const selectedSectionRow = ref('5')
    const selectedSectionColumn = ref('5')

    const sections = computed(() => generateEventSections(Number(selectedSectionRow.value) || 1, Number(selectedSectionColumn.value) || 1))

    const onSelectedSection = (value: string): void => {
      selectedSection.value = value
    }

    return {
      sections,
      onSelectedSection,
      selectedSection,
      selectedSectionRow,
      selectedSectionColumn
    }
  }
})
</script>

<style scoped lang="scss">
.create-event-page {
  @apply bg-pale-gray w-full flex flex-row justify-center;
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
  @apply mt-3 overflow-x-auto w-full;
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
