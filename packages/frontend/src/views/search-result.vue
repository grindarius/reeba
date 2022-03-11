<template>
  <div class="search-page">
    <div class="search-page-content">
      <div class="hidden lg:flex flex-row">
        <div class="flex-none w-56">
          <div class="mt-3 divide-y overflow-y-auto py-4 px-4 rounded text-2xl font-bold text-pale-gray bg-pale-yellow">
            Filter
          </div>
          <div class="mt-3 divide-y overflow-y-auto pt-4 rounded text-pale-gray bg-pale-yellow">
            <div class="text-xl font-bold text-left pl-4 pb-2">
              Type
            </div>
            <div class="flex items-center py-2 px-3 dark:hover:bg-yellow-hover" v-for="(tag, i) in eventTypeSelectors" :key="`event-tag-list-checkbox-${i}`">
              <input :id="`event-tag-checkbox-input-${tag.tag}`" type="checkbox" class="cursor-pointer mr-10 w-4 h-4 rounded" :value="tag.tag" v-model="eventTags">
              <label :for="`event-tag-checkbox-input-${tag.tag}`" class="cursor-pointer font-medium text-pale-gray">{{ tag.name }}</label>
            </div>
          </div>
          <div class="mt-3 divide-y overflow-y-auto py-4 rounded text-pale-gray bg-pale-yellow">
            <div class="text-xl font-bold text-left pl-4 pb-2">
              Price range
            </div>
            <div class="flex items-center py-2 px-3 dark:hover:bg-yellow-hover" v-for="(tag, i) in eventPriceRangeSelectors" :key="`event-tag-list-checkbox-${i}`">
              <input :id="`event-tag-checkbox-input-${tag.tag}`" type="checkbox" class="cursor-pointer mr-10 w-4 h-4 rounded" :value="tag.tag" v-model="eventTags">
              <label :for="`event-tag-checkbox-input-${tag.tag}`" class="cursor-pointer font-medium text-pale-gray">{{ tag.name }}</label>
            </div>
          </div>
          <div class="mt-3 divide-y overflow-y-auto py-4 rounded text-pale-gray bg-pale-yellow">
            <div class="text-xl font-bold text-left pl-4 pb-2">
              Date
            </div>
            <!-- <div class="pt-4 text-center relative">
              <select class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                <option class="">
                  All Dates
                </option>
                <option>Today</option>
                <option>This Week</option>
                <option>Next Week</option>
                <option>This Month</option>
                <option>Next Month</option>
              </select>
            </div> -->
          </div>
          <div class="mt-3 divide-y overflow-y-auto py-4 rounded text-pale-gray bg-pale-yellow">
            <div class="text-xl font-bold text-left pl-4 pb-2">
              Tag
            </div>
            <div class="flex items-center py-2 px-3 dark:hover:bg-yellow-hover" v-for="(tag, i) in eventTagsSelectors" :key="`event-tag-list-checkbox-${i}`">
              <input :id="`event-tag-checkbox-input-${tag.tag}`" type="checkbox" class="cursor-pointer mr-10 w-4 h-4 rounded" :value="tag.tag" v-model="eventTags">
              <label :for="`event-tag-checkbox-input-${tag.tag}`" class="cursor-pointer font-medium text-pale-gray">{{ tag.name }}</label>
            </div>
          </div>
        </div>
        <div class="grow pl-20 ">
          <div class="mt-3 divide-y overflow-y-auto py-4 px-4 rounded text-2xl font-bold text-pale-gray bg-pale-yellow">
            12 event results
          </div>
          <div class="mt-3 divide-y overflow-y-auto py-4 px-4 rounded text-pale-gray bg-pale-yellow">
            <div class=" text-xl font-bold text-left pl-4 pb-2">
              Name
              <div class=" text-base font-medium pl-3 pt-3">
                Date
              </div>
            </div>
            <div class="text-lg pl-3 pt-3 break-all whitespace-pre-line text-ellipsis truncate">
              Description
              <div class="text-base font-medium pl-4 pt-3">
                location
              </div>
            </div>
          </div>
          <div class="px-4 py-4">
            <div class="flex items-center space-x-1">
              <a href="#" class="flex items-center px-4 py-2 text-gray-500 bg-gray-300 rounded-md">
                Previous
              </a>

              <a href="#" class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white">
                1
              </a>
              <a href="#" class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white">
                2
              </a>
              <a href="#" class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white">
                3
              </a>
              <a href="#" class="px-4 py-2 font-bold text-gray-500 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white">
                Next
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ky from 'ky'
import { defineComponent, onMounted, Ref, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useModalState } from '@/composables'

export default defineComponent({
  name: 'search',
  setup () {
    const route = useRoute()
    const eventTags: Ref<Array<string>> = ref([])
    const { state: dropdownState, toggle: toggleDropdown } = useModalState()

    onMounted(async () => {
      await ky('http://localhost:3000/search', {
        method: 'get',
        searchParams: {
          q: route.query.q == null ? '' : Array.isArray(route.query.q) ? route.query.q.join(',') : route.query.q,
          pricerange: route.query.pricerange == null ? '' : Array.isArray(route.query.pricerange) ? route.query.pricerange.join(',') : route.query.pricerange,
          datetime: route.query.datetime == null ? '' : Array.isArray(route.query.datetime) ? route.query.datetime.join(',') : route.query.datetime
        }
      })
    })
    const eventTypeSelectors: Ref<Array<{ name: string, tag: string}>> = ref([
      { name: 'Official', tag: 'official' },
      { name: 'Local', tag: 'local' }
    ])
    const eventPriceRangeSelectors: Ref<Array<{ name: string, tag: string}>> = ref([
      { name: 'Any', tag: '9999999' },
      { name: '< 300', tag: '300' },
      { name: '< 600', tag: '600' },
      { name: '< 1,200', tag: '1200' },
      { name: '< 2,400', tag: '2400' },
      { name: '< 4,800', tag: '4800' },
      { name: '< 7,200', tag: '7200' },
      { name: '< 10,000', tag: '10000' }
    ])
    const eventDateSelectors: Ref<Array<{ name: string, tag: string}>> = ref([
      { name: 'All date', tag: 'alldate' },
      { name: 'Today', tag: 'today' },
      { name: 'This Week', tag: 'thisweek' },
      { name: 'Next Week', tag: 'nextweek' },
      { name: 'This Month', tag: 'thismonth' },
      { name: 'Next Month', tag: 'nextmonth' }
    ])
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
    return {
      eventTypeSelectors,
      eventPriceRangeSelectors,
      eventTagsSelectors,
      eventDateSelectors,
      eventTags,
      toggleDropdown,
      dropdownState
    }
  }
})
</script>

<style scoped lang="scss">
.search-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.search-page-content {
  @apply container mx-6 my-6;
}
</style>
