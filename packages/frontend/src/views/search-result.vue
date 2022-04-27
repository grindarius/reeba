<template>
  <div class="w-full drawer drawer-mobile" style="height: auto;">
    <metainfo>
      <template #title="{ content }">
        {{ content }} | ReebA: Ticket booking. Redefined.
      </template>
    </metainfo>
    <input type="checkbox" id="search-sidebar" class="drawer-toggle">
    <div class="flex flex-col justify-start items-center drawer-content" style="max-height: none;">
      <div class="search-page">
        <div class="search-page-content">
          <div class="result-pane">
            <div class="py-4 px-5 mt-3 text-2xl font-bold rounded text-base-content">
              {{ selectedSearchQueryType === 'Events' ? searchResultResponse.events.length : searchResultResponse.users.length }} results
            </div>
            <router-link
              v-show="selectedSearchQueryType === 'Events'" v-for="(result, i) in searchResultResponse.events"
              :key="`search-result-event-${i}`"
              :to="{ name: 'Event', params: { username: result.createdBy, eventId: result.id } }">
              <div class="place-items-start my-2 mx-1 cursor-pointer hero hover:bg-base-300">
                <div class="hero-content">
                  <div class="max-w-md">
                    <div class="flex flex-row items-center space-x-2">
                      <div>
                        <v-mdi name="mdi-ticket-outline" fill="#c4c4c4" />
                      </div>
                      <h1 class="items-center text-2xl font-bold hover:underline underline-offset-2">
                        {{ result.name }}
                      </h1>
                      <div v-show="result.type === 'Official'">
                        <span class="self-center font-semibold badge badge-md">{{ result.type }}</span>
                      </div>
                    </div>
                    <p class="pt-3 pb-1">
                      {{ formatTimeString(result.firstStartDatetime) }} - {{ formatTimeString(result.lastStartDatetime) }}
                    </p>
                    <p>
                      <v-mdi name="mdi-alarm" fill="#D5A755" />
                      {{ formatTimeString(result.openingDate) }}
                    </p>
                    <p class="py-2 text-primary">
                      <v-mdi name="mdi-map-marker-account" fill="#D5A755" />
                      {{ result.venueName }}
                    </p>
                  </div>
                </div>
              </div>
            </router-link>
            <router-link
              v-show="selectedSearchQueryType === 'Users'" v-for="(result, i) in searchResultResponse.users"
              :key="`search-result-user-${i}`"
              :to="{ name: 'Users', params: { username: result.username } }">
              <div class="place-items-start my-2 mx-1 cursor-pointer hero hover:bg-base-300">
                <div class="hero-content">
                  <div class="max-w-md">
                    <div class="flex flex-row items-center space-x-2">
                      <div>
                        <img :src="getUserAvatarEndpoint({ username: result.username }).url" class="w-10 h-10 rounded-lg shadow-2xl">
                      </div>
                      <h1 class="items-center text-2xl font-bold hover:underline underline-offset-2">
                        {{ result.username }}
                      </h1>
                      <v-mdi name="mdi-check-decagram" fill="#D5A755" v-show="isVerified(result.isVerified, result.isAdmin)" />
                      <v-mdi name="mdi-crown" fill="#D5A755" v-show="result.isAdmin" />
                    </div>
                    <p class="pt-3 pb-1">
                      {{ result.description }}
                    </p>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <div class="grid grid-cols-2 mx-auto w-full max-w-xs btn-group">
            <button :class="getPreviousButtonClassName" @click="goToPreviousPage">
              Previous
            </button>
            <button class="btn btn-outline" @click="goToNextPage">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    <label for="search-sidebar" class="fixed right-10 bottom-10 rounded-full lg:hidden btn btn-primary drawer-button border-slate-700">
      <v-mdi name="mdi-menu-open" fill="#fff" />
    </label>
    <div class="drawer-side" style="max-height: none;">
      <label for="search-sidebar" class="drawer-overlay" style="background-color: #00000055;" />
      <ul class="overflow-y-auto p-4 w-80 menu bg-base-100 text-base-content">
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
          Types
        </li>
        <li class="disabled">
          <label :for="`search-query-type-${selector}`" class="label" v-for="(selector, i) of searchType" :key="`search-page-query-type-radio-${i}`">
            <span class="label-text">{{ selector }}</span>
            <input type="radio" :name="`search-query-type-${selector}`" class="radio radio-primary bg-base-300 hover:bg-primary" :value="selector" v-model="selectedSearchQueryType">
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
          Tags
        </li>
        <li class="disabled">
          <label :for="`search-tags-${selector}`" class="label" v-for="(selector, i) of eventTags" :key="`search-page-tags-checkbox-${i}`">
            <span class="label-text">{{ selector }}</span>
            <input type="checkbox" :name="`search-tags-${selector}`" class="checkbox checkbox-primary bg-base-300 hover:bg-primary" :value="selector" v-model="selectedTags">
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import ky from 'ky'
import { computed, defineComponent, onMounted, Ref, ref, watch } from 'vue'
import { useMeta } from 'vue-meta'
import { useRoute, useRouter } from 'vue-router'

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

import { getSearchResultEndpoint, getUserAvatarEndpoint } from '@/api/endpoints'
import { formatQueryArray, formatQueryString, formatTimeString } from '@/utils'

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
    const selectedPage: Ref<number> = ref(1)

    const isVerified = (isVerified: boolean, isAdmin: boolean): boolean => {
      if (isAdmin === true) {
        return false
      }

      return isVerified
    }

    const searchResultResponse: Ref<GetSearchResultReply> = ref({ events: [], users: [] })

    useMeta({
      title: route.query.q ?? 'Search'
    })

    const getSearchResult = async (): Promise<void> => {
      const formattedQ = formatQueryString(route.query.q)
      const formattedCreatorType = formatQueryArray(route.query.creatorType)
      const formattedPriceRange = formatQueryString(route.query.priceRange, 'Any')
      const formattedTags = formatQueryArray(route.query.tags)
      const formattedDateRange = formatQueryString(route.query.dateRange, 'All dates')
      const formattedSearchQueryType = formatQueryString(route.query.type, 'Events')
      const formattedPage = formatQueryString(route.query.page, '1')

      selectedCreatorType.value = formattedCreatorType as Array<CreatorType>
      selectedPriceRange.value = formattedPriceRange as PriceRange
      selectedTags.value = formattedTags as Array<EventTags>
      selectedDateRange.value = formattedDateRange as DateRange
      selectedSearchQueryType.value = formattedSearchQueryType as SearchType
      selectedPage.value = Number(formattedPage)

      const { method, url } = getSearchResultEndpoint

      const response = await ky(url, {
        method,
        searchParams: [
          ['q', formattedQ],
          ...formattedCreatorType.map(ct => ['creatorType', ct]),
          ['priceRange', formattedPriceRange],
          ...formattedTags.map(t => ['tags', t]),
          ['dateRange', formattedDateRange],
          ['type', formattedSearchQueryType],
          ['page', selectedPage.value]
        ]
      }).json<GetSearchResultReply>()

      searchResultResponse.value.events = response.events
      searchResultResponse.value.users = response.users
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

    const getPreviousButtonClassName = computed(() => {
      return selectedPage.value - 1 === 0 ? 'btn btn-outline btn-disabled' : 'btn btn-outline'
    })

    const goToNextPage = (): void => {
      router.replace({
        name: 'Search',
        query: {
          ...route.query,
          ...{ page: selectedPage.value += 1 }
        }
      })
    }

    const goToPreviousPage = (): void => {
      if (selectedPage.value - 1 === 0) {
        return
      }

      router.replace({
        name: 'Search',
        query: {
          ...route.query,
          ...{ page: selectedPage.value -= 1 }
        }
      })
    }

    return {
      priceRange,
      dateRange,
      selectedPriceRange,
      selectedDateRange,
      selectedTags,
      getUserAvatarEndpoint,
      selectedCreatorType,
      selectedSearchQueryType,
      creatorType,
      searchType,
      eventTags,
      searchResultResponse,
      formatTimeString,
      goToNextPage,
      goToPreviousPage,
      isVerified,
      getPreviousButtonClassName
    }
  }
})
</script>

<style scoped lang="scss">
.search-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.search-page-content {
  @apply container m-6 lg:ml-0;
}

.result-pane {
  @apply grid grid-flow-row divide-y;
}
</style>
