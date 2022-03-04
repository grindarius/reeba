<template>
  <div class="event-page">
    <metainfo>
      <template #title="{ content }">
        {{ content }} | ReebA: Ticket booking. Redefined.
      </template>
    </metainfo>
    <div class="event-page-content">
      <div class="event-top-part">
        <div class="w-full rounded-lg lg:w-min">
          <h1 class="block font-sans text-4xl text-white lg:hidden">
            {{ eventData?.name ?? '' }}
          </h1>
          <img class="mx-auto max-w-md rounded-lg lg:mx-0" :src="`${getEventImage.url}/${route.params.eventId ?? ''}`" :alt="`${eventData?.name ?? '' }`">
        </div>
        <div class="grow">
          <h1 class="hidden font-sans text-4xl text-white lg:block">
            {{ eventData?.name ?? '' }}
          </h1>
          <div class="event-details">
            <div class="event-calendar">
              <v-mdi name="mdi-calendar-blank" size="60" fill="#D5A755" />
              <div class="calendar-content">
                <h1 class="detail-header">
                  Show details
                </h1>
                <h1 class="detail-sub-header">
                  {{ eventData?.datetimes == null ? '' : formatTimeRange(eventData.datetimes ?? []) }}
                </h1>
              </div>
            </div>
            <div class="event-times">
              <v-mdi name="mdi-alarm" size="60" fill="#D5A755" />
              <div class="times-content">
                <h1 class="detail-header">
                  Opening date
                </h1>
                <h1 class="detail-sub-header">
                  {{ eventData?.openingDate == null ? '' : formatOpeningDate(eventData.openingDate) }}
                </h1>
              </div>
            </div>
            <div class="event-prices">
              <v-mdi name="mdi-currency-usd" size="60" fill="#D5A755" />
              <div class="prices-content">
                <h1 class="detail-header">
                  Prices
                </h1>
                <h1 class="detail-sub-header">
                  {{ eventData?.prices == null ? '' : formatPrices(eventData.prices) }}
                </h1>
              </div>
            </div>
            <div class="event-createdby">
              <img class="rounded-full" width="60" :src="`${getUserAvatar.url}/${eventData?.createdBy ?? ''}`" :alt="eventData?.createdBy ?? ''">
              <div class="createdby-content">
                <h1 class="detail-header">
                  Created by
                </h1>
                <h1 class="detail-sub-header">
                  {{ eventData?.createdBy ?? '' }}
                </h1>
              </div>
            </div>
            <div class="cursor-pointer event-place" @click="openGoogle(eventData?.venueCoordinates ?? { x: '0', y: '0' })">
              <v-mdi name="mdi-map-marker-account" size="60" fill="#D5A755" />
              <div class="place-content">
                <h1 class="detail-header">
                  Place
                </h1>
                <h1 class="detail-sub-header">
                  {{ eventData?.venueName ?? '' }}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="event-bottom-part">
        <div class="order-2 col-span-1 lg:order-1 lg:col-span-2">
          <div class="mb-4 font-sans text-4xl text-white">
            Description
          </div>
          <div id="markdown-box" ref="markdownBoxRef" class="markdown-box" v-html="markdownRenderedDescription ?? ''" />
        </div>
        <div class="order-1 lg:order-2">
          <div class="mb-4 font-sans text-4xl text-white">
            Tickets
          </div>
          <div class="ticket-date-selector">
            <h1 class="font-sans text-2xl font-medium text-pale-gray">
              {{ eventData?.venueName ?? '' }}
            </h1>
            <div>
              <h1 class="mt-2 font-sans text-2xl font-medium text-pale-gray">
                Prices
              </h1>
              <h1 class="font-sans text-xl font-medium text-pale-gray">
                {{ formatPrices(eventData?.prices ?? []) ?? 'ราคา' }}
              </h1>
            </div>
            <h1 class="mt-2 text-2xl font-medium text-pale-gray">
              Schedule
            </h1>
            <div class="date-selector">
              <div class="show-date" v-for="(datetimes, i) in (eventData?.datetimes?? [])" :key="`event-page-data-selector-${i}`">
                <div class="show-date-schedule">
                  {{ formatOpeningDate(datetimes.start) }}
                </div>
                <router-link to="/select-seat" class="buy-button">
                  Buy
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { format } from 'd3'
import dayjs from 'dayjs'
import ky from 'ky'
import MarkdownIt from 'markdown-it'
// @ts-expect-error no definitelytyped module
import abbr from 'markdown-it-abbr'
import emoji from 'markdown-it-emoji'
import { computed, defineComponent, onMounted, Ref, ref } from 'vue'
import { useMeta } from 'vue-meta'
import { useRoute, useRouter } from 'vue-router'

import { GetIndividualEventReply } from '@reeba/common'

import { getEventImage, getIndividualEvent as getIndividualEventEndpoint, getUserAvatar } from '@/api/endpoints'

export default defineComponent({
  name: 'event',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const eventData: Ref<GetIndividualEventReply | undefined> = ref(undefined)

    useMeta(computed(() => {
      return {
        title: eventData.value?.name ?? ''
      }
    }))

    const markdown = ref(new MarkdownIt('default', { breaks: true, linkify: true, typographer: true, html: true }).use(emoji).use(abbr))

    const formatTimeRange = (datetimes: Array<{ start: string, end: string }>): string => {
      const sortedDatetimes = datetimes.sort((a, b) => dayjs(a.start).unix() - dayjs(b.start).unix())
      const first = dayjs(sortedDatetimes[0].start)
      const last = dayjs(sortedDatetimes[sortedDatetimes.length - 1].start)

      if (first.get('year') !== last.get('year')) {
        return `${first.format('D MMMM YYYY')} - ${last.format('D MMMM YYYY')}`
      } else if (first.get('month') !== last.get('month')) {
        return `${first.format('D MMMM')} - ${last.format('D MMMM')} ${first.format('YYYY')}`
      } else if (first.get('date') !== last.get('date')) {
        return `${first.format('D')} - ${last.format('D')} ${first.format('MMMM YYYY')}`
      } else {
        return first.format('D MMMM YYYY')
      }
    }

    const formatPrices = (prices: Array<{ color: string, value: number }>): string => {
      return prices.map(p => p.value).sort((a, b) => a - b).map(p => format(',')(p)).join(' / ') + ' THB'
    }
    const openGoogle = (place: {x: string, y: string}): void => {
      window.open(`https://www.google.com/maps/search/?api=1&query=${place.x},${place.y}`, '_blank', 'noopener')
    }
    const formatOpeningDate = (openingDate: string): string => {
      return dayjs(openingDate).format('MMMM D, YYYY HH:mm')
    }

    const markdownRenderedDescription = computed(() => {
      return markdown.value.render(eventData.value?.description ?? '## No description provided')
    })

    onMounted(async () => {
      const { method, url } = getIndividualEventEndpoint

      try {
        const response = await ky(`${url}/${route.params.eventId ?? ''}`, {
          method
        }).json<GetIndividualEventReply>()

        eventData.value = response
      } catch (error) {
        router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
      }
    })

    return {
      eventData,
      formatTimeRange,
      formatPrices,
      openGoogle,
      formatOpeningDate,
      markdownRenderedDescription,
      getEventImage,
      route,
      getUserAvatar
    }
  }
})
</script>

<style scoped lang="scss">
.event-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.event-top-part {
  @apply flex flex-col gap-6 lg:flex-row;
}

.event-bottom-part {
  @apply grid grid-cols-1 gap-6 my-12 lg:grid-cols-3;
}

.event-page-content {
  @apply container px-4 mt-10;
}

.event-details {
  @apply grid grid-cols-1 grid-flow-row gap-4 mt-12 xl:grid-cols-2;
}

.event-calendar, .event-prices, .event-times, .event-place, .event-organizer, .event-createdby {
  @apply flex flex-row gap-3;
}

.event-organizer {
  @apply cursor-pointer;
}

.event-prices, .event-place  {
  @apply col-span-1 md:col-span-1;
}

.detail-header {
  @apply font-sans text-xl text-white;
}

.detail-sub-header {
  @apply font-sans text-sm text-white;
}

.ticket-date-selector {
  @apply p-4 rounded-lg bg-pale-yellow;
}

.show-date {
  @apply flex flex-row justify-between my-2;
}

.show-date-schedule {
  @apply font-sans text-lg font-medium text-pale-gray;
}

.buy-button {
  @apply inline-block py-2 px-8 w-min text-white rounded-lg h-min bg-pale-gray hover:bg-gray-hover;
}

.markdown-box {
  @apply prose prose-p:text-white prose-strong:text-white prose-h1:text-white prose-h2:text-white prose-h3:text-white prose-h4:text-white prose-a:no-underline prose-a:text-pale-yellow prose-blockquote:not-italic hover:prose-a:text-yellow-hover hover:prose-a:underline;
}
</style>
