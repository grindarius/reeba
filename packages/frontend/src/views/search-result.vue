<template>
  <div class="search-page">
    <div class="search-page-content">
      <div class="hidden primary-menu">
        <div class="primary-filter">
          <div class="primary-hade text-2xl font-bold">
            <div class="primary-hade-text">
              Filter
            </div>
          </div>
          <div class="primary-hade">
            <div class="primary-hade-text">
              Type
            </div>
            <div class="flex items-center py-2 px-3 dark:hover:bg-yellow-hover" v-for="(tag, i) in eventTypeSelectors" :key="`event-type-list-checkbox-${i}`">
              <input :id="`event-type-checkbox-input-${tag.tag}`" type="checkbox" class="cursor-pointer mr-10 w-4 h-4 rounded accent-pink-500" :value="tag.tag" v-model="eventType">
              <label :for="`event-type-checkbox-input-${tag.tag}`" class="cursor-pointer font-medium text-black">{{ tag.name }}</label>
            </div>
          </div>
          <div class="primary-hade">
            <div class="primary-hade-text">
              Price range
            </div>
            <div class="flex items-center py-2 px-3 dark:hover:bg-yellow-hover" v-for="(tag, i) in eventPriceRangeSelectors" :key="`event-price-range-list-radio-${i}`">
              <input :id="`event-price-checkbox-input-${tag.tag}`" type="radio" class="cursor-pointer mr-10 w-4 h-4 rounded accent-pink-500" :value="tag.tag" v-model="eventPrice">
              <label :for="`event-price-checkbox-input-${tag.tag}`" class="cursor-pointer font-medium text-black">{{ tag.name }}</label>
            </div>
          </div>
          <div class="mt-3 divide-y py-4 rounded text-black bg-pale-yellow">
            <div class="primary-hade-text">
              Date
            </div>
            <div>
              <r-dropdown :values="reformattedArrayeventDateSelectors" v-model:selected="eventDateSelectors" style="padding: 2%;" />
            </div>
          </div>
          <div class="primary-hade">
            <div class="primary-hade-text">
              Tag
            </div>
            <div class="flex items-center py-2 px-3 dark:hover:bg-yellow-hover" v-for="(tag, i) in eventTagsSelectors" :key="`event-tag-list-checkbox-${i}`">
              <input :id="`event-tag-checkbox-input-${tag.tag}`" type="checkbox" class="cursor-pointer mr-10 w-4 h-4 rounded accent-pink-500" :value="tag.tag" v-model="eventTags">
              <label :for="`event-tag-checkbox-input-${tag.tag}`" class="cursor-pointer font-medium text-black">{{ tag.name }}</label>
            </div>
          </div>
        </div>
        <div class="grow pl-20">
          <div class="mt-3 divide-y py-4 rounded text-black bg-pale-yellow text-2xl font-bold overflow-y-auto px-5 ">
            12 event results
          </div>
          <div class="mt-3 divide-y py-4 rounded text-black bg-pale-yellow overflow-y-auto px-5 list-inside">
            <div class="text-xl font-bold text-left pb-2">
              <div class="">
                <v-mdi name="mdi-ticket-outline" fill="#666265" />
                Name
              </div>
              <div class=" text-base font-medium pt-3">
                <li class="px-3">
                  Date
                </li>
              </div>
            </div>
            <div class="text-lg font-medium pt-3 break-all whitespace-pre-line text-ellipsis truncate">
              Description
              <div class="text-base font-medium pt-3">
                <li class="px-3">
                  location
                </li>
              </div>
            </div>
          </div>
          <div class="px-4 py-4">
            <div class="flex flex-col items-center">
              <span class="text-sm text-white">
                Showing
                <span class="font-semibold text-white" />
                <span class="font-semibold text-white">
                  10
                </span>
                of
                <span class="font-semibold text-white">
                  100
                </span> Entries
              </span>

              <div class="inline-flex mt-2 xs:mt-0">
                <button class="py-2 px-4 text-sm font-medium text-back bg-pale-yellow hover:bg-yellow-hover rounded-l">
                  Prev
                </button>
                <button class="py-2 px-4 text-sm font-medium text-back bg-pale-yellow hover:bg-yellow-hover rounded-r border-0 border-l">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:hidden mobile-menu">
        <div class="mobile-filter-box overflow-y-auto">
          <div class="text-xl font-bold text-left pl-4">
            Type
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-2 px-2 py-2 mt-2 ">
            <div class="flex items-center px-2 py-2 dark:hover:bg-yellow-hover rounded" v-for="(tag, i) in eventTypeSelectors" :key="`event-tag-list-checkbox-${i}`">
              <input :id="`event-type-checkbox-input-${tag.tag}`" type="checkbox" class="mr-10 w-4 h-4 rounded border border-gray-300 focus:border-gray-600 accent-pink-500 focus:ring-3" :value="tag.tag" v-model="eventType">
              <label :for="`event-type-checkbox-input-${tag.tag}`" class="font-medium text-black">{{ tag.name }}</label>
            </div>
          </div>
        </div>
        <div class="mobile-filter-box overflow-y-auto">
          <div class="text-xl font-bold text-left pl-4">
            Price range
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-y-1 gap-x-2 px-2 py-2 mt-2">
            <div class="flex items-center px-2 py-2 dark:hover:bg-yellow-hover rounded" v-for="(tag, i) in eventPriceRangeSelectors" :key="`event-tag-list-radio-${i}`">
              <input :id="`event-price-checkbox-input-${tag.tag}`" type="radio" class="mr-10 w-4 h-4 rounded border border-gray-300 focus:border-gray-600 accent-pink-500 focus:ring-3" :value="tag.tag" v-model="eventPrice">
              <label :for="`event-price-checkbox-input-${tag.tag}`" class="font-medium text-black">{{ tag.name }}</label>
            </div>
          </div>
        </div>
        <div class="mobile-filter-box">
          <div class="text-xl font-bold text-left pl-4">
            Date
          </div>
          <div>
            <r-dropdown :values="reformattedArrayeventDateSelectors" v-model:selected-name="eventDateSelectors" v-model="eventDate" style="padding: 2%;" />
          </div>
        </div>
        <div class="mobile-filter-box overflow-y-auto">
          <div class="text-xl font-bold text-left pl-4">
            Tag
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-y-1 gap-x-2 px-2 py-2 mt-2">
            <div class="flex items-center px-2 py-2 dark:hover:bg-yellow-hover rounded" v-for="(tag, i) in eventTagsSelectors" :key="`event-tag-list-checkbox-${i}`">
              <input :id="`event-tag-checkbox-input-${tag.tag}`" type="checkbox" class="mr-10 w-4 h-4 rounded border border-gray-300 focus:border-gray-600 accent-pink-500 focus:ring-3" :value="tag.tag" v-model="eventTags">
              <label :for="`event-tag-checkbox-input-${tag.tag}`" class="font-medium text-black">{{ tag.name }}</label>
            </div>
          </div>
        </div>
        <div class="grow">
          <div class="mt-3 divide-y py-4 rounded text-black bg-pale-yellow px-4 text-2xl font-bold overflow-y-auto">
            12 event results
          </div>
          <div class="mt-3 divide-y py-4 rounded text-black bg-pale-yellow overflow-y-auto px-5 list-inside">
            <div class="text-xl font-bold text-left pb-2">
              <div class="">
                <v-mdi name="mdi-ticket-outline" fill="#666265" />
                Name
              </div>
              <div class=" text-base font-medium pt-3">
                <li class="px-3">
                  Date
                </li>
              </div>
            </div>
            <div class="text-lg font-medium pt-3 break-all whitespace-pre-line text-ellipsis truncate">
              Description
              <div class="text-base font-medium pt-3">
                <li class="px-3">
                  location
                </li>
              </div>
            </div>
          </div>
          <div class="px-4 py-4">
            <div class="flex flex-col items-center">
              <span class="text-sm text-white">
                Showing
                <span class="font-semibold text-white" />
                <span class="font-semibold text-white">
                  10
                </span>
                of
                <span class="font-semibold text-white">
                  100
                </span> Entries
              </span>

              <div class="inline-flex mt-2 xs:mt-0">
                <button class="py-2 px-4 text-sm font-medium text-back bg-pale-yellow hover:bg-yellow-hover rounded-l">
                  Prev
                </button>
                <button class="py-2 px-4 text-sm font-medium text-back bg-pale-yellow hover:bg-yellow-hover rounded-r border-0 border-l">
                  Next
                </button>
              </div>
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

import RDropdown from '@/components/r-dropdown.vue'
import { useModalState } from '@/composables'

export default defineComponent({
  name: 'search',
  components: {
    'r-dropdown': RDropdown
  },
  setup () {
    const route = useRoute()
    const eventTags: Ref<Array<string>> = ref([])
    const eventType: Ref<Array<string>> = ref([])
    const eventPrice: Ref<Array<string>> = ref([])
    const eventDate: Ref<Array<string>> = ref([])
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
    const reformattedArrayeventDateSelectors = eventDateSelectors.value.map(name => name.name)
    const eventTagsSelectors: Ref<Array<{ name: string, tag: string}>> = ref([
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
      eventType,
      eventPrice,
      eventDate,
      toggleDropdown,
      dropdownState,
      reformattedArrayeventDateSelectors
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

.primary-menu {
  @apply lg:flex flex-row;
}

.primary-filter {
  @apply flex-none w-56;
}

.primary-hade {
  @apply mt-3 divide-y overflow-y-auto py-4 rounded text-black bg-pale-yellow;
}

.primary-hade-text {
  @apply text-xl font-bold text-left pl-4 pb-2;
}

.mobile-menu {
  @apply items-center grow px-2;
}

.mobile-filter-box {
  @apply mt-3 divide-y pt-4 rounded text-black bg-pale-yellow;
}
</style>
