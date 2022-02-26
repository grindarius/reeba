<template>
  <div class="create-event-page">
    <div class="create-event-page-content">
      <h3 class="text-4xl font-medium text-white">
        Create event
      </h3>
      <div class="event-descriptions">
        <div class="grid grid-cols-2 gap-y-4 gap-x-6 py-4 mt-6 md:grid-cols-4">
          <div class="col-span-4 input-box">
            <label for="event-name" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Event name</label>
            <input type="text" id="event-name" name="event-name" class="appearance-none input" placeholder="LOVE YOUR SELF">
          </div>
          <div class="grid overflow-x-auto col-span-4 grid-rows-1 gap-y-4 gap-x-6 md:grid-cols-2">
            <div class="input-box">
              <div class="grid grid-cols-2">
                <label for="event-description-box" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Description</label>
                <button @click="openMarkdownRef('https://markdown-it.github.io/')" class="self-center place-self-end">
                  <v-mdi name="mdi-information-outline" fill="#D5A755" class="self-center place-self-end" />
                </button>
              </div>
              <span
                class="overflow-x-auto font-mono textarea" id="description"
                role="textbox" contenteditable="true"
                v-text="rawInput"
                @input="updateMarkdown" />
            </div>
            <div class="input-box">
              <label for="event-description-box-example" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Example</label>
              <div :class="displayedDescription !== '' ? 'input prosing' : 'input prosing h-12'" v-html="displayedDescription" />
            </div>
          </div>
          <div class="col-span-4 md:col-span-3 input-box">
            <label for="event-website-name" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Website</label>
            <input type="text" id="event-website-name" name="event-website-name" class="appearance-none input" placeholder="https://event.reeba.com">
          </div>
          <div class="col-span-4 md:col-span-1 input-box">
            <label for="event-age" class="block py-2 text-xs font-bold tracking-wide truncate text-white uppercase">Minimum age for users to enter the event</label>
            <input type="text" id="event-age" name="event-age" class="appearance-none input" placeholder="0">
          </div>
          <div class="col-span-4 md:col-span-2 input-box">
            <label for="event-start-datetime" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Start time</label>
            <input type="datetime-local" id="event-start-datetime" name="event-start-datetime" class="input" v-model="selectedEventStartTime">
          </div>
          <div class="col-span-4 md:col-span-2 input-box">
            <label for="event-end-datetime" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">End time</label>
            <div class="flex flex-row items-center">
              <input type="datetime-local" id="event-end-datetime" name="event-end-datetime" class="input" v-model="selectedEventEndTime">
              <v-mdi name="mdi-plus-circle" class="mx-3 cursor-pointer" size="36" fill="#D5A755" @click="addEventTime" />
            </div>
          </div>
          <div class="col-span-4">
            <div v-for="(time, i) in selectedTimes" :key="`selected-event-time-${i}`">
              <div class="add-list-remove">
                {{ getTimeString(time) }}
                <v-mdi name="mdi-minus-circle" class="mx-3 cursor-pointer" size="36" fill="#D5A755" @click="removeEventTime(i)" />
              </div>
            </div>
          </div>
          <div class="col-span-4 md:col-span-1 input-box">
            <label for="event-location-name" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Location name</label>
            <input type="text" id="event-location-name" name="event-location-name" class="appearance-none input" placeholder="Rajamangkala National Stadium">
          </div>
          <div class="col-span-4 md:col-span-3 input-box">
            <label for="event-location-coords" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Location coordinates</label>
            <input type="text" id="event-location-coords" name="event-location-coords" class="appearance-none input" placeholder="latitude,longitude">
          </div>
          <div class="col-span-4 input-box">
            <label for="event-contact" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Who to contact</label>
            <input type="text" id="event-contact" name="event-contact" class="appearance-none input" placeholder="Ms. Sopaphorn Jamyoo">
          </div>
          <div class="col-span-4 input-box">
            <label for="event-contact-credentials" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Credentials</label>
            <input type="text" id="event-contact-credentials" name="event-contact-credentials" class="appearance-none input" placeholder="092-3245423">
          </div>
          <hr class="col-span-4 mt-8 w-full border border-pale-yellow">
        </div>
      </div>

      <h3 class="my-6 text-4xl font-medium text-white">
        Checkbox tags
      </h3>
      <div class="grid grid-cols-1 gap-y-4 gap-x-6 py-4 mt-6 md:grid-cols-3">
        <div class="flex items-center h-5" v-for="(tag, i) in eventTagsList" :key="`event-tag-list-checkbox-${i}`">
          <input :id="`event-tag-checkbox-input-${tag.tag}`" type="checkbox" class="w-4 h-4 mr-10 accent-pink-500 rounded border border-gray-300 focus:ring-3 focus:border-gray-600" :value="tag.tag" v-model="selectedEventTags">
          <label :for="`event-tag-checkbox-input-${tag.tag}`" class="font-medium text-white">{{ tag.name }}</label>
        </div>
      </div>

      <h3 class="my-6 text-4xl font-medium text-white">
        Stage zone picture
      </h3>
      <div class="flex justify-center mt-5">
        <div class="rounded-lg lg:w-2/3">
          <div class="m-4">
            <div class="flex justify-between">
              <label class="inline-block mb-2 text-white">Upload Image</label>
              <button @click="deleteImage">
                <v-mdi name="mdi-delete" fill="#FF0000" />
              </button>
            </div>
            <div v-if="image == null" class="flex justify-center items-center w-full">
              <label class="flex flex-col w-full h-56 border-4 border-dashed hover:border-white hover:bg-pale-yellow">
                <div class="flex flex-col justify-center items-center pt-10 mt-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-12 h-12 text-white group-hover:text-white" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clip-rule="evenodd" />
                  </svg>
                  <p class="pt-1 text-sm tracking-wider text-white group-hover:text-white">Select an image</p>
                </div>
                <input type="file" ref="inputImage" class="opacity-0" accept="image/jpg, image/JPG, image/png, image/PNG, image/jpeg, image/JPEG" @change="uploadImage">
              </label>
            </div>
            <img v-else :src="preview" ref="previewImage">
          </div>
        </div>
      </div>

      <h3 class="my-6 text-4xl font-medium text-white">
        Price range
      </h3>
      <div class="grid grid-rows-1 md:grid-cols-5">
        <div class="flex flex-row mb-4 md:col-span-1 justify-center">
          <input
            type="number" id="event-zone-rows"
            name="event-zone-rows" class="input-button h-12"
            step="1"
            v-model="selectedPrices.length" disabled>
          <button @click="onPriceRangeDecrement" class="flex-none bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-12 w-12 border border-x-black cursor-pointer outline-none">
            <span class="m-auto text-2xl font-thin">-</span>
          </button>
          <button @click="onPriceRangeIncrement" class="flex-none bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-12 w-12 rounded-r cursor-pointer">
            <span class="m-auto text-2xl font-thin">+</span>
          </button>
        </div>
        <div class="grid grid-cols-1 md:col-span-4">
          <div v-for="(price, i) in selectedPrices.sort((a, b) => a.price - b.price)" :key="`event-price-selector-${i}`" class="flex flex-none place-items-center place-self-center mb-4">
            <input type="color" class="mr-4 cursor-pointer" :value="price.color" @change="changeColor($event, i)">
            <div class="flex">
              <div class="relative rounded-md shadow-sm">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <span class="text-gray-500 sm:text-sm"> $ </span>
                </div>
                <input
                  type="number" name="price"
                  id="price-range-selector-input" class="block h-12 py-3 pr-12 pl-7 w-full rounded-md border-gray-300 sm:text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="0.00"
                  :value="price.price"
                  @change="changePrice($event, i)">
                <div class="flex absolute inset-y-0 right-0 items-center">
                  <label for="currency" class="sr-only">Currency</label>
                  <select id="currency" :value="price.currency" @change="changeCurrency($event, i)" name="currency" class="py-0 pr-7 pl-2 h-full text-gray-500 bg-transparent rounded-md border-transparent sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
                    <option value="USD">
                      USD
                    </option>
                    <option value="CAD">
                      CAD
                    </option>
                    <option value="EUR">
                      EUR
                    </option>
                    <option value="THB">
                      THB
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 class="my-6 text-4xl font-medium text-white">
        Section builder
      </h3>
      <div class="section-seats-builder">
        <div class="flex flex-col gap-y-4 gap-x-6 md:flex-row">
          <div class="input-box grow">
            <label for="event-initial-zone-rows" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Initial zone row</label>
            <div class="flex flex-row">
              <input
                type="number" id="event-initial-zone-rows"
                name="event-zone-rows" class="input-button"
                step="1"
                :value="initialZone.length" disabled>
              <button @click="decreaseInitialRow" class="flex-none bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-12 w-12 border border-x-black cursor-pointer outline-none">
                <span class="m-auto text-2xl font-thin">-</span>
              </button>
              <button @click="increaseInitialRow" class="flex-none bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-12 w-12 rounded-r cursor-pointer">
                <span class="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>
          <div class="input-box grow">
            <label for="event-initial-zone-columns" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Initial zone columns</label>
            <div class="flex flex-row">
              <input
                type="number" id="event-initial-zone-columns"
                name="event-initial-zone-columns" class="input-button"
                step="1"
                :value="initialZone[0].length" disabled>
              <button @click="decreaseInitialColumn" class="flex-none bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-12 w-12 border border-x-black cursor-pointer">
                <span class="m-auto text-2xl font-thin">-</span>
              </button>
              <button @click="increaseInitialColumn" class="flex-none bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-12 w-12 rounded-r cursor-pointer">
                <span class="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 mt-8 gap-6 lg:grid-cols-4">
          <div class="overflow-x-auto col-span-4 lg:col-span-3">
            <div class="grid gap-2 py-5 mx-auto mt-3 mb-6 max-w-min" :style="selctedInitialZoneStyles">
              <template v-for="(row, i) in initialZone" :key="`initial-zone-visualization-row-${i}`">
                <template v-for="(seat, j) in row" :key="`initial-zone-visualization-column-${j}`">
                  <button
                    @click="onSectionBuilderSeatClicked(i, j)"
                    class="w-8 h-8 rounded-full"
                    :style="{ 'background-color': selectedPrices.find((s) => s.price === seat.price)!.color }" />
                </template>
              </template>
            </div>
          </div>
          <div class="grid grid-cols-1 md:col-span-1">
            <div class="flex flex-col justify-center place-items-center mt-8 basis-1/3 columns-1">
              <div class="flex place-content-center w-full h-14 bg-black rounded-t-lg">
                <p class="place-self-center text-2xl font-semibold text-center text-white">
                  Seat prices
                </p>
              </div>
              <div class="flex place-content-center w-full h-14 bg-white">
                <p class="place-self-center text-2xl font-semibold text-center">
                  {{ sectionBuilderSelectedSeat.name }}
                </p>
              </div>
              <div v-for="(price, index) in selectedPrices" :key="index" @click="setSelectedInitialSeatToPrice(price)" class="cursor-pointer grid grid-cols-3 place-content-center w-full h-14 bg-white border">
                <div class="h-8 w-8 rounded-full place-self-center" :style="{ 'background-color': selectedPrices[index].color }" />
                <p class="place-self-center text-lg font-semibold text-center">
                  {{ price.price }}
                </p>
                <p class="place-self-center text-lg font-semibold text-center">
                  {{ price.currency }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="event-sections">
        <h3 class="my-6 text-4xl font-medium text-white">
          Event sections
        </h3>
        <div class="flex flex-col gap-y-4 gap-x-6 md:flex-row">
          <div class="input-box grow">
            <label for="event-section-rows" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Section rows</label>
            <input
              type="number" id="event-section-rows"
              name="event-section-rows" class="input"
              step="1"
              :value="sections.length">
          </div>
          <div class="input-box grow">
            <label for="event-section-columns" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Section columns</label>
            <input
              type="number" id="event-section-columns"
              name="event-section-columns" class="input"
              step="1"
              :value="sections[0].length">
          </div>
        </div>
        <div class="grid grid-flow-col gap-4 py-8 px-3 mt-8 -mb-5">
          <div class="col-span-2 font-mono text-4xl text-center text-white">
            STAGE
          </div>
        </div>
        <hr class="col-span-4 mb-8 w-full border border-pale-yellow">
        <div class="event-sections-visualize">
          <div class="grid gap-4 my-0 mx-auto max-w-min" :style="selectedSectionStyles">
            <template v-for="row in sections" :key="JSON.stringify(row)">
              <template v-for="button in row" :key="button">
                <button :class="selectedSection.row === button.rowPosition && selectedSection.column === button.columnPosition ?'button-active' : 'button'" @click="onSelectedSection(button)">
                  <h1 class="font-sans text-4xl font-semibold text-black">
                    {{ `${numberToLetters(button.rowPosition)}${button.columnPosition + 1}` }}
                  </h1>
                </button>
              </template>
            </template>
          </div>
        </div>
        <hr class="col-span-4 mt-8 w-full border border-pale-yellow">
      </div>
      <div class="event-seatings">
        <h3 class="my-6 text-4xl font-medium text-white">
          Zone {{ selectedSection.name }}
        </h3>
        <div class="flex flex-col gap-y-4 gap-x-6 md:flex-row">
          <div class="input-box grow">
            <label for="event-zone-rows" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Zone rows</label>
            <div class="flex flex-row">
              <input
                type="number" id="event-zone-rows"
                name="event-zone-rows" class="input-button"
                step="1"
                :value="zones[selectedSection.row][selectedSection.column].seats[0].length"
                disabled>
              <button @click="decreaseRow" class="flex-none bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-12 w-12 border border-x-black cursor-pointer outline-none">
                <span class="m-auto text-2xl font-thin">-</span>
              </button>
              <button @click="increaseRow" class="flex-none bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-12 w-12 rounded-r cursor-pointer">
                <span class="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>
          <div class="input-box grow">
            <label for="event-zone-columns" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Zone columns</label>
            <div class="flex flex-row">
              <input
                type="number" id="event-zone-columns"
                name="event-zone-columns" class="input-button"
                step="1"
                :value="zones[selectedSection.row][selectedSection.column].seats.length"
                disabled>
              <button @click="decreaseColumn" class="flex-none bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-12 w-12 border border-x-black cursor-pointer">
                <span class="m-auto text-2xl font-thin">-</span>
              </button>
              <button @click="increaseColumn" class="flex-none bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-12 w-12 rounded-r cursor-pointer">
                <span class="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>
        </div>
        <div class="seatings">
          <div class="grid grid-rows-1 md:grid-cols-4">
            <div class="overflow-x-auto md:col-span-3">
              <div class="grid gap-2 py-5 mx-auto mt-3 mb-6 max-w-min" :style="selectedZoneStyles">
                <template v-for="(row, i) in zones[selectedSection.row][selectedSection.column].seats" :key="`zone-button-selector-${i}`">
                  <template v-for="(seat, j) in row" :key="`zone-button-selector-${j}`">
                    <button
                      @click="onSeatChange(seat, i, j)"
                      :style="{ 'background-color': selectedPrices.find(s => s.price === seat.price)!.color }"
                      class="w-8 h-8 rounded-full" />
                  </template>
                </template>
              </div>
            </div>
            <div class="grid grid-cols-1 md:col-span-1">
              <div class="flex flex-col justify-center place-items-center mt-8 basis-1/3 columns-1">
                <div class="flex place-content-center w-full h-14 bg-black rounded-t-lg">
                  <p class="place-self-center text-2xl font-semibold text-center text-white">
                    Seat prices
                  </p>
                </div>
                <div class="flex place-content-center w-full h-14 bg-white">
                  <p class="place-self-center text-2xl font-semibold text-center">
                    {{ selectedSeatNumber.name }}
                  </p>
                </div>
                <div v-for="(price, index) in selectedPrices" :key="index" @click="setSeatPriceIndividually(price)" class="cursor-pointer grid grid-cols-3 place-content-center w-full h-14 bg-white border">
                  <div class="h-8 w-8 rounded-full place-self-center" :style="{ 'background-color': selectedPrices[index].color }" />
                  <p class="place-self-center text-lg font-semibold text-center">
                    {{ price.price }}
                  </p>
                  <p class="place-self-center text-lg font-semibold text-center">
                    {{ price.currency }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="flex flex-row justify-center py-2 mt-8 w-full tracking-wide rounded-lg outline-none bg-pale-yellow hover:bg-yellow-hover focus:ring-pale-gray disabled:bg-red-disabled" @click="createEvent">
        <span>Submit</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import debounce from 'debounce'
import MarkdownIt from 'markdown-it'
// @ts-expect-error not have definitelyTyped
import abbr from 'markdown-it-abbr'
import emoji from 'markdown-it-emoji'
import { computed, defineComponent, Ref, ref, StyleValue, watch } from 'vue'
import { useRouter } from 'vue-router'
import { POSITION, useToast } from 'vue-toastification'

import { useAuthStore } from '@/store/use-auth-store'
import { ReebAEventDatetime, ReebAEventSeat, ReebAEventSection, ReebAExtendedEventPrice } from '@/types'
import { decrease2DArrayDimension, generateEventSeats, generateEventSections, increase2DArrayDimension, numberToLetters } from '@/utils'

dayjs.extend(customParseFormat)

interface Selected {
  name: string
  row: number
  column: number
}

export default defineComponent({
  name: 'create-event',
  beforeRouteEnter (_, __, next) {
    const authStore = useAuthStore()

    if (!authStore.isAuthenticated) {
      next({ name: 'Signin' })
    } else {
      next()
    }
  },
  setup () {
    const router = useRouter()
    const toast = useToast()

    const createEvent = (): void => {
      toast.success('Event created!', { position: POSITION.BOTTOM_RIGHT, timeout: 2000 })
      router.push('/')
    }

    const selectedEventStartTime = ref('')
    const selectedEventEndTime = ref('')

    const selectedTimes = ref<Array<ReebAEventDatetime>>([])

    const selectedSection: Ref<Selected> = ref({
      name: 'A1',
      row: 0,
      column: 0
    })

    const selectedPrices: Ref<Array<ReebAExtendedEventPrice>> = ref([
      {
        color: '#D5A755',
        price: 1000,
        currency: 'THB' as 'USD' | 'CAD' | 'THB' | 'EUR'
      }
    ])

    const sectionBuilderSelectedSeat: Ref<Selected> = ref({
      name: 'A1',
      row: 0,
      column: 0
    })

    const selectedSeatNumber: Ref<Selected> = ref({
      name: 'A1',
      row: 0,
      column: 0
    })

    const selectedEventTags: Ref<Array<string>> = ref([])
    const eventTagsList: Ref<Array<{ name: string, tag: string }>> = ref([
      { name: 'Amphitheater', tag: 'amphitheater' },
      { name: 'Business', tag: 'business' },
      { name: 'Concert', tag: 'concert' },
      { name: 'Entertainment', tag: 'entertainment' },
      { name: 'Fan meet', tag: 'fan-meet' },
      { name: 'Gameshow', tag: 'gameshow' },
      { name: 'Lifestyle', tag: 'lifestyle' },
      { name: 'Live', tag: 'live' },
      { name: 'Musical', tag: 'musical' },
      { name: 'Online', tag: 'online' },
      { name: 'Opera', tag: 'opera' },
      { name: 'Seminar', tag: 'seminar' },
      { name: 'Stand up comedy', tag: 'stand-up-comedy' },
      { name: 'Technology', tag: 'technology' },
      { name: 'Variety', tag: 'variety' }
    ])

    const markdown = ref(new MarkdownIt('default', { breaks: true, linkify: true, typographer: true, html: true }).use(emoji).use(abbr))

    const initialZone: Ref<Array<Array<ReebAEventSeat>>> = ref(generateEventSeats(5, 5, selectedPrices.value[0].price))
    const sections: Ref<Array<Array<ReebAEventSection>>> = ref(generateEventSections(2, 2, initialZone.value))
    const zones: Ref<Array<Array<ReebAEventSection>>> = ref(generateEventSections(2, 2, initialZone.value))

    const selectedSectionStyles = computed<StyleValue>(() => {
      return {
        'grid-template-columns': `repeat(${sections.value[0].length || '1'}, 100px)`,
        'grid-template-rows': `repeat(${sections.value.length || '1'}, 100px)`
      }
    })
    const selectedZoneStyles = computed<StyleValue>(() => {
      return {
        'grid-template-columns': `repeat(${zones.value[selectedSection.value.row][selectedSection.value.column].seats[0].length || '1'}, 32px)`,
        'grid-template-rows': `repeat(${zones.value[selectedSection.value.row][selectedSection.value.column].seats.length || '1'}, 32px)`
      }
    })
    const selctedInitialZoneStyles = computed<StyleValue>(() => {
      return {
        'grid-template-columns': `repeat(${initialZone.value[0].length || '1'}, 32px)`,
        'grid-template-rows': `repeat(${initialZone.value.length || '1'}, 32px)`
      }
    })

    const onSectionBuilderSeatClicked = (row: number, column: number) => {
      sectionBuilderSelectedSeat.value = {
        name: numberToLetters(row) + (column + 1),
        row,
        column
      }
    }

    const setSelectedInitialSeatToPrice = (price: ReebAExtendedEventPrice): void => {
      initialZone.value[sectionBuilderSelectedSeat.value.row][sectionBuilderSelectedSeat.value.column].price = price.price
    }

    const onSelectedSection = (value: ReebAEventSection): void => {
      const modifiedSection = {
        name: numberToLetters(value.rowPosition) + (value.columnPosition + 1),
        row: value.rowPosition,
        column: value.columnPosition
      }
      selectedSection.value = modifiedSection
    }

    const onSeatChange = (value: ReebAEventSeat, row: number, column: number): void => {
      const modifiedSeat: Selected = {
        name: numberToLetters(row) + (column + 1),
        row: row,
        column: column
      }
      selectedSeatNumber.value = modifiedSeat
      console.log(value)
    }

    const getTimeString = (time: ReebAEventDatetime): string => {
      return `${time.from.format('MMMM D, YYYY HH:mm')} to ${time.to.format('MMMM D, YYYY HH:mm')}`
    }
    const addEventTime = (): void => {
      if (!dayjs(selectedEventStartTime.value, 'YYYY-MM-DDTHH:mm', true).isValid()) {
        return
      }

      if (!dayjs(selectedEventEndTime.value, 'YYYY-MM-DDTHH:mm', true).isValid()) {
        return
      }

      selectedTimes.value.push({
        from: dayjs(selectedEventStartTime.value, 'YYYY-MM-DDTHH:mm'),
        to: dayjs(selectedEventEndTime.value, 'YYYY-MM-DDTHH:mm')
      })
    }

    const removeEventTime = (index: number): void => {
      selectedTimes.value.splice(index, 1)
    }

    const rawInput = ref([
      '## Heading 8-)\n',
      '**This is bold text**\n',
      '__This is bold text__\n',
      '*This is italic text*\n',
      '~~Strikethrough~~\n',
      '> Blockquotes can also be nested...',
      '> > ...by using additional greater-than signs right next to each other...',
      '> > > ...by using additional greater-than signs right next to each other...\n',
      '+ Create a list by starting a line with +',
      '+ Very easy!\n',
      '1. Lorem ipsum dolor sit amet\n2. Consectetur adipiscing elit',
      '2. Consectetur adipiscing elit',
      '3. Integer molestie lorem at massa\n',
      '1. You can use sequential numbers...',
      '1. ...or keep all the numbers as 1.'
    ].join('\n'))

    const updateMarkdown = debounce((e: Event): void => {
      rawInput.value = (e.target as HTMLSpanElement).innerText
    }, 500)

    const displayedDescription = computed<string>(() => {
      return markdown.value.render(rawInput.value)
    })

    const openMarkdownRef = (url: string) => {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
    }

    const changeColor = (ev: Event, index: number): void => {
      selectedPrices.value[index].color = (ev.target as HTMLInputElement).value
    }

    const changePrice = (ev: Event, index: number): void => {
      selectedPrices.value[index].price = Number((ev.target as HTMLInputElement).value)
    }

    const changeCurrency = (ev: Event, index: number): void => {
      selectedPrices.value[index].currency = (ev.target as HTMLInputElement).value as 'USD' | 'CAD' | 'THB' | 'EUR'
    }

    const onPriceRangeIncrement = (): void => {
      selectedPrices.value.push({
        color: '#D5A755',
        price: selectedPrices.value[selectedPrices.value.length - 1].price,
        currency: selectedPrices.value[selectedPrices.value.length - 1].currency as 'USD' | 'CAD' | 'THB' | 'EUR'
      })
    }

    watch(initialZone, (newInitialZone) => {
      console.log(newInitialZone)

      for (let i = 0; i < zones.value.length; i++) {
        for (let j = 0; j < zones.value[i].length; j++) {
          zones.value[i][j].seats = newInitialZone
        }
      }
    }, { deep: true })

    watch(zones, (newZone) => {
      console.log(newZone)
    }, { deep: true })

    const setSeatPriceIndividually = (price: ReebAExtendedEventPrice): void => {
      zones.value[selectedSection.value.row][selectedSection.value.column].seats[selectedSeatNumber.value.row][selectedSeatNumber.value.column].price = price.price
    }

    const onPriceRangeDecrement = (): void => {
      if (selectedPrices.value.length - 1 === 0) {
        return
      }

      const firstElement = JSON.parse(JSON.stringify(selectedPrices.value[0])) as ReebAExtendedEventPrice
      const lastElement = JSON.parse(JSON.stringify(selectedPrices.value[selectedPrices.value.length - 1])) as ReebAExtendedEventPrice

      initialZone.value = initialZone.value.map((u) => {
        return u.map(v => {
          if (v.price === lastElement.price) {
            v.price = firstElement.price
          }

          return v
        })
      })

      selectedPrices.value.pop()
    }

    const increaseRow = (): void => {
      zones.value[selectedSection.value.row][selectedSection.value.column].seats = increase2DArrayDimension(zones.value[selectedSection.value.row][selectedSection.value.column].seats, 'row')
    }

    const increaseColumn = (): void => {
      zones.value[selectedSection.value.row][selectedSection.value.column].seats = increase2DArrayDimension(zones.value[selectedSection.value.row][selectedSection.value.column].seats, 'column')
    }

    const increaseInitialColumn = (): void => {
      initialZone.value = increase2DArrayDimension(initialZone.value, 'column')
    }

    const increaseInitialRow = (): void => {
      initialZone.value = increase2DArrayDimension(initialZone.value, 'row')
    }

    const decreaseRow = (): void => {
      if (zones.value[selectedSection.value.row][selectedSection.value.column].seats.length - 1 === 0) {
        return
      }
      zones.value[selectedSection.value.row][selectedSection.value.column].seats = decrease2DArrayDimension(zones.value[selectedSection.value.row][selectedSection.value.column].seats, 'row')
    }

    const decreaseColumn = (): void => {
      if (zones.value[selectedSection.value.row][selectedSection.value.column].seats[0].length - 1 === 0) {
        return
      }
      zones.value[selectedSection.value.row][selectedSection.value.column].seats = decrease2DArrayDimension(zones.value[selectedSection.value.row][selectedSection.value.column].seats, 'row')
    }

    const decreaseInitialColumn = (): void => {
      if (initialZone.value[0].length - 1 === 0) {
        return
      }
      initialZone.value = decrease2DArrayDimension(initialZone.value, 'column')
    }

    const decreaseInitialRow = (): void => {
      if (initialZone.value.length - 1 === 0) {
        return
      }
      initialZone.value = decrease2DArrayDimension(initialZone.value, 'row')
    }

    const image = ref<File | null>(null)
    const preview = ref('')
    const uploadImage = (e: Event): void => {
      if ((e.target as HTMLInputElement).files != null) {
        // @ts-expect-error file probably null event after checked
        image.value = (e.target as HTMLInputElement).files[0]

        // @ts-expect-error file probably null event after checked
        preview.value = URL.createObjectURL((e.target as HTMLInputElement).files[0])
      }
    }
    const deleteImage = () => {
      image.value = null
    }

    return {
      sections,
      eventTagsList,
      onSelectedSection,
      selectedSection,
      selectedSectionStyles,
      selectedZoneStyles,
      zones,
      getTimeString,
      onSeatChange,
      selectedEventStartTime,
      selectedEventEndTime,
      selectedTimes,
      addEventTime,
      removeEventTime,
      updateMarkdown,
      rawInput,
      displayedDescription,
      openMarkdownRef,
      increaseRow,
      increaseColumn,
      decreaseRow,
      decreaseColumn,
      selectedPrices,
      changeColor,
      changePrice,
      selectedEventTags,
      onPriceRangeIncrement,
      onPriceRangeDecrement,
      changeCurrency,
      initialZone,
      increaseInitialColumn,
      increaseInitialRow,
      decreaseInitialColumn,
      decreaseInitialRow,
      selctedInitialZoneStyles,
      uploadImage,
      image,
      preview,
      deleteImage,
      selectedSeatNumber,
      sectionBuilderSelectedSeat,
      onSectionBuilderSeatClicked,
      setSelectedInitialSeatToPrice,
      numberToLetters,
      createEvent,
      setSeatPriceIndividually
    }
  }
})
</script>

<style scoped lang="scss">
.create-event-page {
  @apply flex flex-row justify-center pb-48 w-full min-h-screen bg-pale-gray;
}

.create-event-page-content {
  @apply container px-6 mt-12 lg:px-0;
}

.event-zone {
  @apply flex flex-row justify-center w-full bg-pale-gray;
}

.zone {
  @apply flex flex-row justify-center w-full bg-pale-gray;
}

.button {
  @apply py-2 px-4 w-24 h-24 font-bold text-white rounded hover:ring focus:outline-none bg-pale-yellow active:bg-gray-hover;
}

.button-active {
  @apply py-2 px-4 w-24 h-24 font-bold text-white rounded bg-yellow-hover;
}

.input {
  @apply py-3 px-4 w-full bg-gray-100 rounded outline-none focus:bg-white ring-pale-gray focus:ring-gray-hover;
}

.input-button {
  @apply py-3 px-4 w-full bg-gray-100 rounded-l outline-none focus:bg-white ring-pale-gray focus:ring-gray-hover;
}

.event-sections-visualize {
  @apply overflow-x-auto p-3 mt-3 w-full;
}

.add-list-remove {
  @apply flex justify-between mt-5 w-full text-xl text-white align-middle rounded outline-none;
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

input[type=color] {
    width: 32px;
    height: 32px;
    border-radius: 100%;
    overflow: hidden;
}

input[type=color]::-webkit-color-swatch {
  border-radius: 100%;
  padding: 0;
}

input[type=color]::-webkit-color-swatch-wrapper {
    border-radius: 100%;
    padding: 0;
}

.textarea {
  @apply inline-block whitespace-pre input;
}

.prosing {
  @apply max-w-none prose prose-a:no-underline prose-a:text-blue-700 prose-blockquote:not-italic hover:prose-a:text-blue-500 hover:prose-a:underline;
}

.initial-price-selector {
  @apply flex flex-col lg:flex-row;
}
</style>
