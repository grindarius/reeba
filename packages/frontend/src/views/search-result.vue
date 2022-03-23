<template>
  <metainfo>
    <template #title="{ content }">
      {{ content }} | ReebA: Ticket booking. Redefined.
    </template>
  </metainfo>
  <div class="drawer drawer-mobile w-full">
    <input type="checkbox" id="search-sidebar" class="drawer-toggle">
    <div class="drawer-content flex flex-col items-center justify-start" style="max-height: none;">
      <div class="search-page">
        <div class="search-page-content">
          <div class="result-pane">
            <div class="mt-3 py-4 rounded text-base-content text-2xl font-bold px-5">
              12 results
            </div>
            <router-link to="/">
              <div class="hero place-items-start hover:bg-base-300 rounded-lg mx-1 my-2">
                <div class="hero-content">
                  <div class="max-w-md">
                    <div class="flex flex-row items-center space-x-2">
                      <div>
                        <v-mdi name="mdi-ticket-outline" fill="#c4c4c4" />
                      </div>
                      <h1 class="items-center text-2xl font-bold hover:underline underline-offset-2">
                        Event name
                      </h1>

                      <div>
                        <span class="self-center badge badge-md font-semibold">Official</span>
                      </div>
                    </div>
                    <p class="pt-3 pb-1">
                      first date of the event - last date of the event
                    </p>
                    <p>
                      <v-mdi name="mdi-alarm" fill="#D5A755" />
                      March 23, 2022 06:20
                    </p>
                    <p class="text-primary py-2">
                      <v-mdi name="mdi-map-marker-account" fill="#D5A755" />
                      location name
                    </p>
                  </div>
                </div>
              </div>
            </router-link>
            <div class="hero place-items-start hover:bg-base-300 rounded-lg mx-1 my-2">
              <div class="hero-content">
                <div class="max-w-md">
                  <div class="flex flex-row items-center space-x-2">
                    <div>
                      <v-mdi name="mdi-ticket-outline" fill="#c4c4c4" />
                    </div>
                    <h1 class="items-center text-2xl font-bold hover:underline underline-offset-2">
                      Event name
                    </h1>

                    <div>
                      <span class="self-center badge badge-md font-semibold">Official</span>
                    </div>
                  </div>
                  <p class="pt-3 pb-1">
                    first date of the event - last date of the event
                  </p>
                  <p>
                    <v-mdi name="mdi-alarm" fill="#D5A755" />
                    March 23, 2022 06:20
                  </p>
                  <p class="text-primary py-2">
                    <v-mdi name="mdi-map-marker-account" fill="#D5A755" />
                    location name
                  </p>
                </div>
              </div>
            </div>
            <div class="hero place-items-start hover:bg-base-300 rounded-lg mx-1 my-2">
              <div class="hero-content">
                <div class="max-w-md">
                  <div class="flex flex-row items-center space-x-2">
                    <div>
                      <v-mdi name="mdi-ticket-outline" fill="#c4c4c4" />
                    </div>
                    <h1 class="items-center text-2xl font-bold hover:underline underline-offset-2">
                      Event name
                    </h1>

                    <div>
                      <span class="self-center badge badge-md font-semibold">Official</span>
                    </div>
                  </div>
                  <p class="pt-3 pb-1">
                    first date of the event - last date of the event
                  </p>
                  <p>
                    <v-mdi name="mdi-alarm" fill="#D5A755" />
                    March 23, 2022 06:20
                  </p>
                  <p class="text-primary py-2">
                    <v-mdi name="mdi-map-marker-account" fill="#D5A755" />
                    location name
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="btn-group grid grid-cols-2 max-w-xs w-full mx-auto">
            <button class="btn btn-outline">
              Previous
            </button>
            <button class="btn btn-outline">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    <label for="search-sidebar" class="btn btn-primary drawer-button lg:hidden fixed bottom-10 right-10 rounded-full border-slate-700">
      <v-mdi name="mdi-menu-open" fill="#fff" />
    </label>
    <div class="drawer-side" style="max-height: none;">
      <label for="search-sidebar" class="drawer-overlay" style="background-color: #00000055;" />
      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content;">
        <li class="menu-title">
          Creator type
        </li>
        <li class="disabled">
          <label :for="`search-${selector}-events`" class="label" v-for="(selector, i) of creatorType" :key="`search-page-creator-type-checkbox-${i}`">
            <span class="label-text">{{ selector }} events</span>
            <input :name="`search-${selector}-events`" type="checkbox" class="checkbox checkbox-primary bg-base-300 hover:bg-primary" :value="selector" v-model="selectedCreatorType">
          </label>
        </li>
        <hr class="my-3">
        <li class="menu-title">
          Price range
        </li>
        <li class="disabled">
          <label :for="`search-radio-${selector}`" class="label" v-for="(selector, i) of priceRange" :key="`search-page-price-range-radio-${i}`">
            <span class="label-text">{{ selector }}</span>
            <input type="radio" :name="`search-radio-${selector}`" class="radio radio-primary bg-base-300 hover:bg-primary" :value="selector" v-model="selectedPriceRange">
          </label>
        </li>
        <hr class="my-3">
        <li class="menu-title">
          Tags
        </li>
        <li class="disabled">
          <label :for="`search-tags-${selector}`" class="label" v-for="(selector, i) of eventTags" :key="`search-page-tags-checkbox-${i}`">
            <span class="label-text">{{ selector }}</span>
            <input type="checkbox" :name="`search-tags-${selector}`" class="checkbox checkbox-primary bg-base-300 hover:bg-primary" :value="selector" v-model="selectedTags">
          </label>
        </li>
        <hr class="my-3">
        <li class="menu-title">
          Dates
        </li>
        <li class="disabled">
          <label :for="`search-dates-${selector}`" class="label" v-for="(selector, i) of dateRange" :key="`search-page-date-range-checkbox-${i}`">
            <span class="label-text">{{ selector }}</span>
            <input type="radio" :name="`search-dates-${selector}`" class="radio radio-primary bg-base-300 hover:bg-primary" :value="selector" v-model="selectedDateRange">
          </label>
        </li>
        <hr class="my-3">
        <li class="menu-title">
          Types
        </li>
        <li class="disabled">
          <label :for="`search-query-type-${selector}`" class="label" v-for="(selector, i) of searchType" :key="`search-page-query-type-radio-${i}`">
            <span class="label-text">{{ selector }}</span>
            <input type="radio" :name="`search-query-type-${selector}`" class="radio radio-primary bg-base-300 hover:bg-primary" :value="selector" v-model="selectedSearchQueryType">
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import ky from 'ky'
import { defineComponent, onMounted, Ref, ref, watch } from 'vue'
import { useMeta } from 'vue-meta'
import { LocationQueryValue, useRoute, useRouter } from 'vue-router'

import {
  CreatorType,
  creatorType,
  DateRange,
  dateRange,
  EventTags,
  eventTags,
  GetSearchResultReply,
  PriceRange,
  priceRange,
  SearchType,
  searchType
} from '@reeba/common'

export default defineComponent({
  name: 'search',
  setup () {
    const route = useRoute()
    const router = useRouter()

    const selectedCreatorType: Ref<Array<CreatorType>> = ref([])
    const selectedPriceRange: Ref<PriceRange> = ref('Any')
    const selectedTags: Ref<Array<EventTags>> = ref([])
    const selectedDateRange: Ref<DateRange> = ref('All dates')
    const selectedSearchQueryType: Ref<SearchType> = ref('Events')

    const searchResultResponse: Ref<GetSearchResultReply | undefined> = ref(undefined)

    useMeta({
      title: route.query.q ?? 'Search'
    })

    const formatQueryString = (query: LocationQueryValue | Array<LocationQueryValue>, defaultValue = ''): string => {
      return query == null
        ? defaultValue
        : Array.isArray(query)
          ? query.filter(q => q != null)[0] ?? ''
          : query
    }

    const formatQueryArray = (query: LocationQueryValue | Array<LocationQueryValue>): Array<string> => {
      return query == null
        ? []
        : Array.isArray(query)
          ? query.filter(c => c != null) as Array<string>
          : [query]
    }

    const getSearchResult = async (): Promise<void> => {
      const formattedQ = formatQueryString(route.query.q)
      const formattedCreatorType = formatQueryArray(route.query.creatorType)
      const formattedPriceRange = formatQueryString(route.query.priceRange, 'Any')
      const formattedTags = formatQueryArray(route.query.tags)
      const formattedDateRange = formatQueryString(route.query.dateRange, 'All dates')
      const formattedSearchQueryType = formatQueryString(route.query.type, 'Events')

      selectedCreatorType.value = formattedCreatorType as Array<CreatorType>
      selectedPriceRange.value = formattedPriceRange as PriceRange
      selectedTags.value = formattedTags as Array<EventTags>
      selectedDateRange.value = formattedDateRange as DateRange
      selectedSearchQueryType.value = formattedSearchQueryType as SearchType

      const response = await ky('http://localhost:3000/search', {
        method: 'get',
        searchParams: [
          ['q', formattedQ],
          ...formattedCreatorType.map(ct => ['creatorType', ct]),
          ['priceRange', formattedPriceRange],
          ...formattedTags.map(t => ['tags', t]),
          ['dateRange', formattedDateRange],
          ['type', formattedSearchQueryType]
        ]
      }).json<GetSearchResultReply>()

      searchResultResponse.value = response
    }

    onMounted(async () => {
      await getSearchResult()
    })

    watch(selectedCreatorType, (now) => {
      router.replace({
        name: 'Search',
        query: {
          ...route.query,
          ...{ creatorType: now }
        }
      })
    })

    watch(selectedPriceRange, (now) => {
      router.replace({
        name: 'Search',
        query: {
          ...route.query,
          ...{ priceRange: now }
        }
      })
    })

    watch(selectedTags, (now) => {
      router.replace({
        name: 'Search',
        query: {
          ...route.query,
          ...{ tags: now }
        }
      })
    })

    watch(selectedDateRange, (now) => {
      router.replace({
        name: 'Search',
        query: {
          ...route.query,
          ...{ dateRange: now }
        }
      })
    })

    watch(selectedSearchQueryType, (now) => {
      router.replace({
        name: 'Search',
        query: {
          ...route.query,
          ...{ type: now }
        }
      })
    })

    return {
      priceRange,
      dateRange,
      selectedPriceRange,
      selectedDateRange,
      selectedTags,
      selectedCreatorType,
      selectedSearchQueryType,
      creatorType,
      searchType,
      eventTags
    }
  }
})
</script>

<style scoped lang="scss">
.search-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.search-page-content {
  @apply container m-6 ml-0;
}

.result-pane {
  @apply grid grid-flow-row divide-y;
}
</style>
