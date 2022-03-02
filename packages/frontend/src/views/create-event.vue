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
            <input
              type="text" id="event-name"
              name="event-name" class="appearance-none input"
              placeholder="Natus Vincere"
              v-model="eventName">
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
                v-text="eventDescription"
                @input="updateMarkdown" />
            </div>
            <div class="input-box">
              <label for="event-description-box-example" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Example</label>
              <div :class="displayedDescription !== '' ? 'input prosing' : 'input prosing h-12'" v-html="displayedDescription" />
            </div>
          </div>
          <div class="col-span-4 md:col-span-3 input-box">
            <label for="event-website-name" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Website</label>
            <input
              type="text" id="event-website-name"
              name="event-website-name" class="appearance-none input"
              placeholder="https://event.reeba.com"
              v-model="eventWebsite">
          </div>
          <div class="col-span-4 md:col-span-1 input-box">
            <label for="event-age" class="block py-2 text-xs font-bold tracking-wide text-white uppercase truncate">Minimum age for users to enter the event</label>
            <input
              type="number" id="event-age"
              name="event-age" class="appearance-none input"
              placeholder="0"
              v-model="eventMinimumAge">
          </div>
          <div class="col-span-4 input-box">
            <label for="event-opening-date" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Opening Date</label>
            <input
              type="datetime-local" id="event-opening-date"
              name="event-opening-date" class="appearance-none input"
              v-model="eventOpeningDate">
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
            <div v-for="(time, i) in eventDatetimes" :key="`selected-event-time-${i}`">
              <div class="add-list-remove">
                {{ getTimeString(time) }}
                <v-mdi name="mdi-minus-circle" class="mx-3 cursor-pointer" size="36" fill="#D5A755" @click="removeEventTime(i)" />
              </div>
            </div>
          </div>
          <div class="col-span-4 md:col-span-1 input-box">
            <label for="event-location-name" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Location name</label>
            <input
              type="text" id="event-location-name"
              name="event-location-name" class="appearance-none input"
              placeholder="Rajamangkala National Stadium"
              v-model="eventVenueName">
          </div>
          <div class="col-span-4 md:col-span-3 input-box">
            <label for="event-location-coords" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Location coordinates</label>
            <input
              type="text" id="event-location-coords"
              name="event-location-coords" class="appearance-none input"
              placeholder="latitude,longitude"
              v-model="eventVenueCoordinates">
          </div>
          <hr class="col-span-4 mt-8 w-full border border-pale-yellow">
        </div>
      </div>

      <h3 class="my-6 text-4xl font-medium text-white">
        Tags
      </h3>
      <div class="grid grid-cols-1 gap-y-4 gap-x-6 py-4 mt-6 md:grid-cols-3">
        <div class="flex items-center h-5" v-for="(tag, i) in eventTagsSelectors" :key="`event-tag-list-checkbox-${i}`">
          <input :id="`event-tag-checkbox-input-${tag.tag}`" type="checkbox" class="mr-10 w-4 h-4 rounded border border-gray-300 focus:border-gray-600 accent-pink-500 focus:ring-3" :value="tag.tag" v-model="eventTags">
          <label :for="`event-tag-checkbox-input-${tag.tag}`" class="font-medium text-white">{{ tag.name }}</label>
        </div>
      </div>

      <h3 class="my-6 text-4xl font-medium text-white">
        Event image
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
            <div v-if="eventImage == null" class="flex justify-center items-center w-full">
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
                <input type="file" class="opacity-0" accept=".jpg, .png, .jpeg" @change="onImageSelected">
              </label>
            </div>
            <img v-else :src="previewImage">
          </div>
        </div>
      </div>

      <h3 class="my-6 text-4xl font-medium text-white">
        Price range
      </h3>
      <div class="grid grid-rows-1 md:grid-cols-5">
        <div class="flex flex-row justify-center mb-4 md:col-span-1">
          <input
            type="number" id="event-price-range"
            name="event-price-range" class="h-12 input-button"
            step="1"
            v-model="eventTicketPrices.length" disabled>
          <button @click="decreasePriceRangeAmount" class="flex-none w-12 h-12 text-gray-600 bg-gray-300 border cursor-pointer outline-none hover:text-gray-700 hover:bg-gray-400 border-x-black">
            <span class="m-auto text-2xl font-thin">-</span>
          </button>
          <button @click="increasePriceRangeAmount" class="flex-none w-12 h-12 text-gray-600 bg-gray-300 rounded-r cursor-pointer hover:text-gray-700 hover:bg-gray-400">
            <span class="m-auto text-2xl font-thin">+</span>
          </button>
        </div>
        <div class="grid grid-cols-1 md:col-span-4">
          <div v-for="(price, i) in eventTicketPrices" :key="`event-price-selector-${i}`" class="flex flex-none place-items-center place-self-center mb-4">
            <input type="color" class="mr-4 cursor-pointer" :value="price.color" @change="onPriceRangeColorChange($event, i)">
            <div class="flex">
              <div class="relative rounded-md shadow-sm">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <span class="text-gray-500 sm:text-sm"> $ </span>
                </div>
                <input
                  type="number" name="price"
                  id="price-range-selector-input" class="block py-3 pr-12 pl-7 w-full h-12 rounded-md border-gray-300 sm:text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="0.00"
                  :value="price.price"
                  @change="onPriceRangePriceChange($event, i)">
                <div class="flex absolute inset-y-0 right-0 items-center">
                  <label for="currency" class="sr-only">Currency</label>
                  <select id="currency" :value="price.currency" @change="onPriceRangeCurrencyChange($event, i)" name="currency" class="py-0 pr-7 pl-2 h-full text-gray-500 bg-transparent rounded-md border-transparent sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
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
        Seat template
      </h3>
      <div class="section-seats-builder">
        <div class="flex flex-col gap-y-4 gap-x-6 md:flex-row">
          <div class="input-box grow">
            <label for="event-initial-zone-rows" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Template seat row</label>
            <div class="flex flex-row">
              <input
                type="number" id="event-initial-zone-rows"
                name="event-zone-rows" class="input-button"
                step="1"
                :value="seatTemplate.length" disabled>
              <button @click="decreaseSeatTemplateRow" class="flex-none w-12 h-12 text-gray-600 bg-gray-300 border cursor-pointer outline-none hover:text-gray-700 hover:bg-gray-400 border-x-black">
                <span class="m-auto text-2xl font-thin">-</span>
              </button>
              <button @click="increaseSeatTemplateRow" class="flex-none w-12 h-12 text-gray-600 bg-gray-300 rounded-r cursor-pointer hover:text-gray-700 hover:bg-gray-400">
                <span class="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>
          <div class="input-box grow">
            <label for="event-initial-zone-columns" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Template seat columns</label>
            <div class="flex flex-row">
              <input
                type="number" id="event-initial-zone-columns"
                name="event-initial-zone-columns" class="input-button"
                step="1"
                :value="seatTemplate[0].length" disabled>
              <button @click="decreaseSeatTemplateColumn" class="flex-none w-12 h-12 text-gray-600 bg-gray-300 border cursor-pointer hover:text-gray-700 hover:bg-gray-400 border-x-black">
                <span class="m-auto text-2xl font-thin">-</span>
              </button>
              <button @click="increaseSeatTemplateColumn" class="flex-none w-12 h-12 text-gray-600 bg-gray-300 rounded-r cursor-pointer hover:text-gray-700 hover:bg-gray-400">
                <span class="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-4">
          <div class="overflow-x-auto col-span-4 lg:col-span-3">
            <div class="grid gap-2 py-5 mx-auto mt-3 mb-6 max-w-min" :style="seatTemplateStyles">
              <template v-for="(row, i) in seatTemplate" :key="`initial-zone-visualization-row-${i}`">
                <template v-for="(seat, j) in row" :key="`initial-zone-visualization-column-${j}`">
                  <button
                    @click="onSeatTemplateClick(i, j)"
                    class="w-8 h-8 rounded-full"
                    :style="{ 'background-color': eventTicketPrices.find((s) => s.price === seat.seatPrice)!.color }" />
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
                  {{ seatTemplateSelectedSeat.name }}
                </p>
              </div>
              <div v-for="(price, index) in eventTicketPrices" :key="index" @click="setSelectedSeatTemplatePrice(price)" class="grid grid-cols-3 place-content-center w-full h-14 bg-white border cursor-pointer">
                <div class="place-self-center w-8 h-8 rounded-full" :style="{ 'background-color': eventTicketPrices[index].color }" />
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
            <label for="event-section-zone-rows" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Section rows</label>
            <div class="flex flex-row">
              <input
                type="number" id="event-section-zone-rows"
                name="event-zone-rows" class="input-button"
                step="1"
                v-model="eventSectionRowLength" disabled>
              <button @click="decreaseSectionRow" class="flex-none w-12 h-12 text-gray-600 bg-gray-300 border cursor-pointer outline-none hover:text-gray-700 hover:bg-gray-400 border-x-black">
                <span class="m-auto text-2xl font-thin">-</span>
              </button>
              <button @click="increaseSectionRow" class="flex-none w-12 h-12 text-gray-600 bg-gray-300 rounded-r cursor-pointer hover:text-gray-700 hover:bg-gray-400">
                <span class="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>
          <div class="input-box grow">
            <label for="event-section-zone-columns" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Section columns</label>
            <div class="flex flex-row">
              <input
                type="number" id="event-section-zone-columns"
                name="event-initial-zone-columns" class="input-button"
                step="1"
                v-model="eventSectionColumnLength" disabled>
              <button @click="decreaseSectionColumn" class="flex-none w-12 h-12 text-gray-600 bg-gray-300 border cursor-pointer hover:text-gray-700 hover:bg-gray-400 border-x-black">
                <span class="m-auto text-2xl font-thin">-</span>
              </button>
              <button @click="increaseSectionColumn" class="flex-none w-12 h-12 text-gray-600 bg-gray-300 rounded-r cursor-pointer hover:text-gray-700 hover:bg-gray-400">
                <span class="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>
        </div>
        <div class="grid grid-flow-col gap-4 py-8 px-3 mt-8 -mb-5">
          <div class="col-span-2 font-mono text-4xl text-center text-white">
            STAGE
          </div>
        </div>
        <hr class="col-span-4 mb-8 w-full border border-pale-yellow">
        <div class="event-sections-visualize">
          <div class="grid gap-4 my-0 mx-auto max-w-min" :style="sectionsStyles">
            <template v-for="row in eventSections" :key="JSON.stringify(row)">
              <template v-for="button in row" :key="button">
                <button :class="selectedSection.row === button.sectionRowPosition && selectedSection.column === button.sectionColumnPosition ? 'button-active' : 'button'" @click="onSectionClick(button)">
                  <h1 class="font-sans text-4xl font-semibold text-black">
                    {{ `${numberToLetters(button.sectionRowPosition)}${button.sectionColumnPosition + 1}` }}
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
          Section {{ selectedSection.name }}
        </h3>
        <div class="flex flex-col gap-y-4 gap-x-6 md:flex-row">
          <div class="input-box grow">
            <label for="event-zone-rows" class="block py-2 text-xs font-bold tracking-wide text-white uppercase">Zone rows</label>
            <div class="flex flex-row">
              <input
                type="number" id="event-zone-rows"
                name="event-zone-rows" class="input-button"
                step="1"
                :value="eventSections[selectedSection.row][selectedSection.column].seats[0].length"
                disabled>
              <button @click="decreaseActualSeatPlanRow" class="flex-none w-12 h-12 text-gray-600 bg-gray-300 border cursor-pointer outline-none hover:text-gray-700 hover:bg-gray-400 border-x-black">
                <span class="m-auto text-2xl font-thin">-</span>
              </button>
              <button @click="increaseActualSeatPlanRow" class="flex-none w-12 h-12 text-gray-600 bg-gray-300 rounded-r cursor-pointer hover:text-gray-700 hover:bg-gray-400">
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
                :value="eventSections[selectedSection.row][selectedSection.column].seats.length"
                disabled>
              <button @click="decreaseActualSeatPlanColumn" class="flex-none w-12 h-12 text-gray-600 bg-gray-300 border cursor-pointer hover:text-gray-700 hover:bg-gray-400 border-x-black">
                <span class="m-auto text-2xl font-thin">-</span>
              </button>
              <button @click="increaseActualSeatPlanColumn" class="flex-none w-12 h-12 text-gray-600 bg-gray-300 rounded-r cursor-pointer hover:text-gray-700 hover:bg-gray-400">
                <span class="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>
        </div>
        <div class="seatings">
          <div class="grid grid-rows-1 md:grid-cols-4">
            <div class="overflow-x-auto md:col-span-3">
              <div class="grid gap-2 py-5 mx-auto mt-3 mb-6 max-w-min" :style="actualSeatPlanStyles">
                <template v-for="(row, i) in eventSections[selectedSection.row][selectedSection.column].seats" :key="`zone-button-selector-${i}`">
                  <template v-for="(seat, j) in row" :key="`zone-button-selector-${j}`">
                    <button
                      @click="onActualSeatPlanChange(i, j)"
                      :style="{ 'background-color': eventTicketPrices.find(s => s.price === seat.seatPrice)!.color }"
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
                    {{ actualSeatPlanSelectedSeat.name }}
                  </p>
                </div>
                <div
                  v-for="(price, index) in eventTicketPrices" :key="`zone-price-selector-${index}`"
                  @click="setActualSeatPlanPriceIndividually(price)"
                  class="grid grid-cols-3 place-content-center w-full h-14 bg-white border cursor-pointer">
                  <div class="place-self-center w-8 h-8 rounded-full" :style="{ 'background-color': eventTicketPrices[index].color }" />
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
import ky from 'ky'
import MarkdownIt from 'markdown-it'
// @ts-expect-error not have definitelyTyped
import abbr from 'markdown-it-abbr'
import emoji from 'markdown-it-emoji'
import { computed, defineComponent, Ref, ref, StyleValue, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { PostEventBody, PostEventReply } from '@reeba/common'

import { postEvent, postEventImage } from '@/api/endpoints'
import { useAuthStore } from '@/store/use-auth-store'
import { ReebAEventDatetime, ReebAEventSeat, ReebAEventSection, ReebAExtendedEventPrice } from '@/types'
import { decrease2DArrayDimension, generateEventSeats, generateEventSections, increase2DArrayDimension, numberToLetters, randomPastelColor } from '@/utils'

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
    const authStore = useAuthStore()

    const defaults: Selected = {
      name: 'A1',
      row: 0,
      column: 0
    }

    const eventName = ref('')
    const eventDescription = ref([
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
    const eventWebsite = ref('')
    const eventVenueName = ref('')
    const eventVenueCoordinates = ref('0, 0')
    const eventOpeningDate = ref('')
    const eventTags: Ref<Array<string>> = ref([])
    const eventTicketPrices: Ref<Array<ReebAExtendedEventPrice>> = ref([
      {
        color: '#D5A755',
        price: 1000,
        currency: 'THB' as 'USD' | 'CAD' | 'THB' | 'EUR'
      }
    ])
    const eventDatetimes = ref<Array<ReebAEventDatetime>>([])
    const eventMinimumAge = ref('0')

    const selectedEventStartTime = ref('')
    const selectedEventEndTime = ref('')

    const eventSectionRowLength = ref('2')
    const eventSectionColumnLength = ref('2')

    const seatTemplate: Ref<Array<Array<ReebAEventSeat>>> = ref(generateEventSeats(5, 5, eventTicketPrices.value[0].price))
    const eventSections: Ref<Array<Array<ReebAEventSection>>> = ref(generateEventSections(Number(eventSectionRowLength.value) || 1, Number(eventSectionColumnLength.value) || 1, seatTemplate.value))

    const eventImage = ref<File | null>(null)
    const previewImage = ref('')
    const onImageSelected = (e: Event): void => {
      const target = e.target as HTMLInputElement
      eventImage.value = target.files == null ? null : target.files[0]
      previewImage.value = URL.createObjectURL(target.files == null ? new Blob() : target.files[0])
      console.log(previewImage.value)
    }
    const deleteImage = () => {
      eventImage.value = null
    }

    const createEvent = async (): Promise<void> => {
      const { method: postEventMethod, url: postEventUrl } = postEvent
      const { method: postEventImageMethod, url: postEventImageUrl } = postEventImage
      const coordinateString = eventVenueCoordinates.value.split(',')

      if (eventName.value === '') {
        toast.error('Event name is not defined')
        return
      }

      if (coordinateString[0] == null || coordinateString[1] == null || isNaN(Number(coordinateString[0])) || isNaN(Number(coordinateString[1]))) {
        toast.error('Cannot parse coordinates')
        return
      }

      if (eventDatetimes.value.length === 0) {
        toast.error('There must be at least 1 datetime')
        return
      }

      for (const dt of eventDatetimes.value) {
        if (dt.start.isBefore(dayjs(eventOpeningDate.value, 'YYYY-MM-DDTHH:mm')) || dt.end.isBefore(dayjs(eventOpeningDate.value, 'YYYY-MM-DDTHH:mm'))) {
          toast.error('One of datetimes is before opening date')
          return
        }

        if (dt.end.isBefore(dt.start)) {
          toast.error('One of datetimes, end time is before start time')
          return
        }
      }

      if (eventOpeningDate.value === '') {
        toast.error('Opening date cannot be blank')
        return
      }

      const priceSet = new Set(eventTicketPrices.value.map(p => p.price))

      if (priceSet.size < eventTicketPrices.value.length) {
        toast.error('There is a redundant price')
        return
      }

      const ev: PostEventBody = {
        eventName: eventName.value,
        createdBy: authStore.userData.username,
        description: eventDescription.value,
        website: eventWebsite.value,
        venueName: eventVenueName.value,
        venueCoordinates: {
          x: coordinateString[0],
          y: coordinateString[1]
        },
        openingDate: dayjs(eventOpeningDate.value, 'YYYY-MM-DDTHH:mm').toISOString(),
        tags: eventTags.value,
        ticketPrices: eventTicketPrices.value.map(p => {
          return {
            color: p.color,
            price: p.price
          }
        }),
        datetimes: eventDatetimes.value.map(dt => {
          return {
            start: dt.start.toISOString(),
            end: dt.end.toISOString()
          }
        }),
        minimumAge: Number(eventMinimumAge.value),
        sections: eventSections.value.map((sectionArray, i) => {
          return sectionArray.map((sec, j) => {
            return {
              sectionRowPosition: i,
              sectionColumnPosition: j,
              seats: sec.seats.map((seatRow, k) => {
                return seatRow.map((seat, l) => {
                  return {
                    seatRowPosition: k,
                    seatColumnPosition: l,
                    seatPrice: seat.seatPrice
                  }
                })
              })
            }
          })
        })
      }

      try {
        const response = await ky(postEventUrl, {
          method: postEventMethod,
          json: ev,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          }
        }).json<PostEventReply>()

        const form = new FormData()

        if (eventImage.value != null) {
          form.append('image', eventImage.value)

          await ky(postEventImageUrl + `/${response.eventId}`, {
            method: postEventImageMethod,
            body: form
          })
        }

        toast.success('Event created!')
        router.push('/')
      } catch (error) {
        // @ts-expect-error error is unknown
        const json = await error.response.json()
        toast.error(json.message)
      }
    }

    const selectedSection: Ref<Selected> = ref({
      name: 'A1',
      row: 0,
      column: 0
    })

    const seatTemplateSelectedSeat: Ref<Selected> = ref({
      name: 'A1',
      row: 0,
      column: 0
    })

    const actualSeatPlanSelectedSeat: Ref<Selected> = ref({
      name: 'A1',
      row: 0,
      column: 0
    })

    const eventTagsSelectors: Ref<Array<{ name: string, tag: string }>> = ref([
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
    const updateMarkdown = debounce((e: Event): void => {
      eventDescription.value = (e.target as HTMLSpanElement).innerText
    }, 500)
    const displayedDescription = computed<string>(() => {
      return markdown.value.render(eventDescription.value)
    })
    const openMarkdownRef = (url: string) => {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
    }

    const sectionsStyles = computed<StyleValue>(() => {
      return {
        'grid-template-columns': `repeat(${eventSections.value[0].length || '1'}, 100px)`,
        'grid-template-rows': `repeat(${eventSections.value.length || '1'}, 100px)`
      }
    })
    const actualSeatPlanStyles = computed<StyleValue>(() => {
      return {
        'grid-template-columns': `repeat(${eventSections.value[selectedSection.value.row][selectedSection.value.column].seats[0].length || '1'}, 32px)`,
        'grid-template-rows': `repeat(${eventSections.value[selectedSection.value.row][selectedSection.value.column].seats.length || '1'}, 32px)`
      }
    })
    const seatTemplateStyles = computed<StyleValue>(() => {
      return {
        'grid-template-columns': `repeat(${seatTemplate.value[0].length || '1'}, 32px)`,
        'grid-template-rows': `repeat(${seatTemplate.value.length || '1'}, 32px)`
      }
    })

    const getTimeString = (time: ReebAEventDatetime): string => {
      return `${time.start.format('MMMM D, YYYY HH:mm')} to ${time.end.format('MMMM D, YYYY HH:mm')}`
    }

    const addEventTime = (): void => {
      if (!dayjs(selectedEventStartTime.value, 'YYYY-MM-DDTHH:mm', true).isValid()) {
        return
      }

      if (!dayjs(selectedEventEndTime.value, 'YYYY-MM-DDTHH:mm', true).isValid()) {
        return
      }

      eventDatetimes.value.push({
        start: dayjs(selectedEventStartTime.value, 'YYYY-MM-DDTHH:mm'),
        end: dayjs(selectedEventEndTime.value, 'YYYY-MM-DDTHH:mm')
      })
    }

    const onSeatTemplateClick = (row: number, column: number) => {
      seatTemplateSelectedSeat.value = {
        name: numberToLetters(row) + (column + 1),
        row,
        column
      }
    }

    const onSectionClick = (value: ReebAEventSection): void => {
      const modifiedSection = {
        name: numberToLetters(value.sectionRowPosition) + (value.sectionColumnPosition + 1),
        row: value.sectionRowPosition,
        column: value.sectionColumnPosition
      }
      selectedSection.value = modifiedSection
    }

    const setSelectedSeatTemplatePrice = (price: ReebAExtendedEventPrice): void => {
      seatTemplate.value[seatTemplateSelectedSeat.value.row][seatTemplateSelectedSeat.value.column].seatPrice = price.price
    }

    const onActualSeatPlanChange = (row: number, column: number): void => {
      const modifiedSeat: Selected = {
        name: numberToLetters(row) + (column + 1),
        row: row,
        column: column
      }
      actualSeatPlanSelectedSeat.value = modifiedSeat
    }

    const removeEventTime = (index: number): void => {
      eventDatetimes.value.splice(index, 1)
    }

    const onPriceRangeColorChange = (ev: Event, index: number): void => {
      eventTicketPrices.value[index].color = (ev.target as HTMLInputElement).value
    }

    const onPriceRangePriceChange = (ev: Event, index: number): void => {
      eventTicketPrices.value[index].price = Number((ev.target as HTMLInputElement).value)
    }

    const onPriceRangeCurrencyChange = (ev: Event, index: number): void => {
      eventTicketPrices.value[index].currency = (ev.target as HTMLInputElement).value as 'USD' | 'CAD' | 'THB' | 'EUR'
    }

    const setActualSeatPlanPriceIndividually = (price: ReebAExtendedEventPrice): void => {
      eventSections.value[selectedSection.value.row][selectedSection.value.column].seats[actualSeatPlanSelectedSeat.value.row][actualSeatPlanSelectedSeat.value.column].seatPrice = price.price
    }

    const increasePriceRangeAmount = (): void => {
      eventTicketPrices.value.push({
        color: randomPastelColor(),
        price: eventTicketPrices.value[eventTicketPrices.value.length - 1].price,
        currency: eventTicketPrices.value[eventTicketPrices.value.length - 1].currency as 'USD' | 'CAD' | 'THB' | 'EUR'
      })
    }

    const decreasePriceRangeAmount = (): void => {
      if (eventTicketPrices.value.length - 1 === 0) {
        return
      }

      const firstElement = JSON.parse(JSON.stringify(eventTicketPrices.value[0])) as ReebAExtendedEventPrice
      const lastElement = JSON.parse(JSON.stringify(eventTicketPrices.value[eventTicketPrices.value.length - 1])) as ReebAExtendedEventPrice

      seatTemplate.value = seatTemplate.value.map((u) => {
        return u.map(v => {
          if (v.seatPrice === lastElement.price) {
            v.seatPrice = firstElement.price
          }

          return v
        })
      })

      eventTicketPrices.value.pop()
    }

    const increaseSeatTemplateRow = (): void => {
      seatTemplate.value = increase2DArrayDimension(seatTemplate.value, 'row')
    }

    const increaseSeatTemplateColumn = (): void => {
      seatTemplate.value = increase2DArrayDimension(seatTemplate.value, 'column')
    }

    const decreaseSeatTemplateRow = (): void => {
      if (seatTemplate.value.length - 1 === 0) {
        return
      }
      seatTemplate.value = decrease2DArrayDimension(seatTemplate.value, 'row')
    }

    const decreaseSeatTemplateColumn = (): void => {
      if (seatTemplate.value[0].length - 1 === 0) {
        return
      }
      seatTemplate.value = decrease2DArrayDimension(seatTemplate.value, 'column')
    }

    const increaseSectionRow = (): void => {
      eventSectionRowLength.value = (Number(eventSectionRowLength.value) + 1).toString()
      eventSections.value = generateEventSections(Number(eventSectionRowLength.value), Number(eventSectionColumnLength.value), seatTemplate.value)
    }

    const increaseSectionColumn = (): void => {
      eventSectionColumnLength.value = (Number(eventSectionColumnLength.value) + 1).toString()
      eventSections.value = generateEventSections(Number(eventSectionRowLength.value), Number(eventSectionColumnLength.value), seatTemplate.value)
    }

    const decreaseSectionRow = (): void => {
      if (eventSections.value.length - 1 === 0) {
        return
      }
      selectedSection.value = defaults
      eventSectionRowLength.value = (Number(eventSectionRowLength.value) - 1).toString()
      eventSections.value = generateEventSections(Number(eventSectionRowLength.value), Number(eventSectionColumnLength.value), seatTemplate.value)
    }

    const decreaseSectionColumn = (): void => {
      if (eventSections.value[0].length - 1 === 0) {
        return
      }
      selectedSection.value = defaults
      eventSectionColumnLength.value = (Number(eventSectionColumnLength.value) - 1).toString()
      eventSections.value = generateEventSections(Number(eventSectionRowLength.value), Number(eventSectionColumnLength.value), seatTemplate.value)
    }

    const increaseActualSeatPlanRow = (): void => {
      eventSections.value[selectedSection.value.row][selectedSection.value.column].seats = increase2DArrayDimension(eventSections.value[selectedSection.value.row][selectedSection.value.column].seats, 'row')
    }

    const increaseActualSeatPlanColumn = (): void => {
      eventSections.value[selectedSection.value.row][selectedSection.value.column].seats = increase2DArrayDimension(eventSections.value[selectedSection.value.row][selectedSection.value.column].seats, 'column')
    }

    const decreaseActualSeatPlanRow = (): void => {
      if (eventSections.value[selectedSection.value.row][selectedSection.value.column].seats.length - 1 === 0) {
        return
      }
      eventSections.value[selectedSection.value.row][selectedSection.value.column].seats = decrease2DArrayDimension(eventSections.value[selectedSection.value.row][selectedSection.value.column].seats, 'row')
    }

    const decreaseActualSeatPlanColumn = (): void => {
      if (eventSections.value[selectedSection.value.row][selectedSection.value.column].seats[0].length - 1 === 0) {
        return
      }
      eventSections.value[selectedSection.value.row][selectedSection.value.column].seats = decrease2DArrayDimension(eventSections.value[selectedSection.value.row][selectedSection.value.column].seats, 'column')
    }

    watch(seatTemplate, (newInitialZone) => {
      for (let i = 0; i < eventSections.value.length; i++) {
        for (let j = 0; j < eventSections.value[i].length; j++) {
          eventSections.value[i][j].seats = JSON.parse(JSON.stringify(newInitialZone))
        }
      }
    }, { deep: true })

    return {
      eventTags,
      eventName,
      eventWebsite,
      eventVenueName,
      eventVenueCoordinates,
      eventOpeningDate,
      eventTicketPrices,
      eventDatetimes,
      eventMinimumAge,
      increaseSectionRow,
      increaseSectionColumn,
      decreaseSectionRow,
      decreaseSectionColumn,
      eventTagsSelectors,
      onSectionClick,
      selectedSection,
      sectionsStyles,
      actualSeatPlanStyles,
      eventSections,
      getTimeString,
      onActualSeatPlanChange,
      selectedEventStartTime,
      selectedEventEndTime,
      addEventTime,
      removeEventTime,
      updateMarkdown,
      eventDescription,
      displayedDescription,
      openMarkdownRef,
      increaseActualSeatPlanRow,
      increaseActualSeatPlanColumn,
      decreaseActualSeatPlanRow,
      decreaseActualSeatPlanColumn,
      onPriceRangeColorChange,
      onPriceRangePriceChange,
      increasePriceRangeAmount,
      decreasePriceRangeAmount,
      onPriceRangeCurrencyChange,
      seatTemplate,
      increaseSeatTemplateColumn,
      increaseSeatTemplateRow,
      decreaseSeatTemplateColumn,
      decreaseSeatTemplateRow,
      seatTemplateStyles,
      onImageSelected,
      eventImage,
      previewImage,
      deleteImage,
      actualSeatPlanSelectedSeat,
      seatTemplateSelectedSeat,
      onSeatTemplateClick,
      setSelectedSeatTemplatePrice,
      numberToLetters,
      createEvent,
      setActualSeatPlanPriceIndividually,
      eventSectionRowLength,
      eventSectionColumnLength
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
