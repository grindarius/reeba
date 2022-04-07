<template>
  <metainfo>
    <template #title="{ content }">
      {{ content }} | ReebA: Ticket booking. Redefined.
    </template>
  </metainfo>
  <div class="text-4xl font-semibold text-white">
    Edit event
  </div>
  <div class="form-control w-full">
    <label class="label">
      <span class="label-text">Event name</span>
    </label>
    <input type="text" placeholder="Type here" class="input input-bordered bg-white text-black w-full" v-model="eventDataResponse.name">
  </div>
  <div class="tabs mt-4">
    <a :class="isEditing ? 'tab tab-bordered tab-active' : 'tab tab-bordered'" @click="isEditing = true">
      Write
    </a>
    <a :class="!isEditing ? 'tab tab-bordered tab-active' : 'tab tab-bordered'" @click="isEditing = false">
      Preview
    </a>
  </div>
  <textarea
    v-if="isEditing" class="textarea textarea-bordered bg-white text-black w-full"
    placeholder="Description" style="height: auto;"
    :rows="eventDataResponse.description.split(/\r\n|\r|\n/).length"
    v-model="eventDescription" />
  <div v-else v-html="renderedMarkdown" class="prosing bg-white rounded-lg p-4" />
  <div class="form-control w-full">
    <label for="event-website" class="label">
      <span class="label-text">Event website</span>
    </label>
    <input type="text" placeholder="events.reeba.com" class="input input-bordered bg-white text-black w-full" v-model="eventDataResponse.website">
  </div>
  <div class="form-control w-full">
    <label class="label">
      <span class="label-text">
        Venue name
      </span>
    </label>
    <input type="text" class="input input-bordered bg-white text-black w-full" v-model="eventDataResponse.venueName">
  </div>
  <div class="form-control w-full">
    <label class="label">
      <span class="label-text">
        Venue coordinates
      </span>
    </label>
    <input type="text" class="input input-bordered bg-white text-black w-full" v-model="eventDataResponse.venueCoordinates">
  </div>
  <div class="form-control max-w-md">
    <label class="label">
      Tags
    </label>
    <label class="label cursor-pointer" v-for="(tag, i) in eventTagsSelectors" :key="`event-tag-selectors-${i}`">
      <span class="label-text">{{ tag.name }}</span>
      <input type="checkbox" v-model="eventDataResponse.tags" :value="tag.tag" class="checkbox checkbox-sm checkbox-primary">
    </label>
  </div>
  <div class="form-control">
    <label class="label">
      <span class="label-text">
        Colors
      </span>
    </label>
    <div class="grid grid-cols-3 gap-4">
      <template v-for="p in eventDataResponse.priceRange" :key="`${p.text}`">
        <input type="color" class="cursor-pointer" v-model="p.color">
        <input type="text" class="input input-bordered bg-white text-black w-full" v-model="p.color">
        <input type="number" class="input input-bordered bg-white text-white w-full" disabled v-model="p.price">
      </template>
    </div>
  </div>
  <div class="flex flex-row justify-center mt-4">
    <div class="btn btn-primary" @click="patchEditableEventData">
      Save
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import ky from 'ky'
import { defineComponent, onMounted, Ref, ref } from 'vue'
import { useMeta } from 'vue-meta'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import {
  GetEditableEventDataReply
} from '@reeba/common'

import {
  getEditableEventData as getEditableEventDataEndpoint,
  patchEditableEventData as patchEditableEventDataEndpoint
} from '@/api/endpoints'
import { useMarkdown } from '@/composables'
import { useAuthStore } from '@/store/use-auth-store'

export default defineComponent({
  name: 'organizer-tool-edit-event',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()
    const isEditing = ref(true)
    const toast = useToast()

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

    const eventDataResponse = ref({
      name: '',
      description: '',
      website: '',
      openingDate: '',
      creationDate: '',
      startTime: [] as Array<{ id: string, start: string, end: string }>,
      venueName: '',
      venueCoordinates: '',
      tags: [] as Array<string>,
      priceRange: [] as Array<{ color: string, price: number }>
    })

    const eventDescription = ref('')

    const { renderedMarkdown } = useMarkdown(ref(eventDescription))

    useMeta({
      title: 'Edit event'
    })

    const getEditableEventData = async (): Promise<void> => {
      try {
        const { method, url } = getEditableEventDataEndpoint({ eventId: route.params.eventId as string ?? '' })

        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          }
        }).json<GetEditableEventDataReply>()

        eventDataResponse.value.name = response.name
        eventDataResponse.value.description = response.description
        eventDataResponse.value.website = response.website
        eventDescription.value = response.description
        eventDataResponse.value.openingDate = dayjs(response.openingDate).format('YYYY-MM-DDTHH:mm')
        eventDataResponse.value.creationDate = dayjs(response.creationDate).toISOString()
        eventDataResponse.value.startTime = response.startTime.map(st => {
          return {
            id: st.id,
            start: dayjs(st.start).format('YYYY-MM-DDTHH:mm'),
            end: dayjs(st.end).format('YYYY-MM-DDTHH:mm')
          }
        })
        eventDataResponse.value.venueName = response.venueName
        eventDataResponse.value.venueCoordinates = `${response.venueCoordinates.x}, ${response.venueCoordinates.y}`
        eventDataResponse.value.tags = response.tags
        eventDataResponse.value.priceRange = response.priceRange
      } catch (error) {
        // @ts-expect-error error is unknown
        const resp = error?.response

        if (resp.status == null) {
          router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
          return
        }

        if (resp.status === 401) {
          router.push({ name: 'Signin' })
          return
        }

        if (resp.status === 403) {
          router.push({ name: 'Home' })
          return
        }

        router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
      }
    }

    const patchEditableEventData = async (): Promise<void> => {
      try {
        const { method, url } = patchEditableEventDataEndpoint({ eventId: route.params.eventId as string ?? '' })
        const coordinateString = eventDataResponse.value.venueCoordinates.split(',')

        if (coordinateString[0] == null || coordinateString[1] == null || isNaN(Number(coordinateString[0])) || isNaN(Number(coordinateString[1]))) {
          toast.error('Cannot parse coordinates')
          return
        }

        for (const st of eventDataResponse.value.startTime) {
          if (dayjs(st.start).isAfter(st.end)) {
            toast.error('one of datetimes is greater than end time')
            return
          }

          if (dayjs(st.start).isBefore(dayjs(eventDataResponse.value.creationDate)) || dayjs(st.end).isBefore(dayjs(eventDataResponse.value.creationDate))) {
            toast.error('one of datetime is less than creation date')
            return
          }

          if (dayjs(st.start).isBefore(dayjs(eventDataResponse.value.openingDate)) || dayjs(st.end).isBefore(dayjs(eventDataResponse.value.creationDate))) {
            toast.error('one of datetime is less than opening date')
            return
          }
        }

        if (dayjs(eventDataResponse.value.openingDate).isBefore(eventDataResponse.value.creationDate)) {
          toast.error('opening date is before creation date')
          return
        }

        await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          },
          json: {
            id: route.params.eventId as string ?? '',
            name: eventDataResponse.value.name,
            description: eventDescription.value,
            website: eventDataResponse.value.website,
            openingDate: dayjs(eventDataResponse.value.openingDate).toISOString(),
            startTime: eventDataResponse.value.startTime.map(dt => {
              return {
                id: dt.id,
                start: dayjs(dt.start).toISOString(),
                end: dayjs(dt.end).toISOString()
              }
            }),
            venueName: eventDataResponse.value.venueName,
            venueCoordinates: {
              x: coordinateString[0],
              y: coordinateString[1]
            },
            tags: eventDataResponse.value.tags,
            priceRange: eventDataResponse.value.priceRange
          }
        })

        toast.success('Successfully updated')
      } catch (error) {
        // @ts-expect-error error is unknown
        const resp = error?.response

        if (resp.status == null) {
          router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
          return
        }

        if (resp.status === 401) {
          router.push({ name: 'Signin' })
          return
        }

        if (resp.status === 403) {
          router.push({ name: 'Home' })
          return
        }

        router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
      }
    }

    onMounted(async () => {
      await getEditableEventData()
    })

    return {
      eventDataResponse,
      isEditing,
      renderedMarkdown,
      eventDescription,
      eventTagsSelectors,
      patchEditableEventData
    }
  }
})
</script>

<style scoped lang="scss">
.prosing {
  @apply max-w-none prose prose-a:no-underline prose-a:text-blue-700 prose-blockquote:not-italic prose-headings:text-black prose-p:text-black prose-strong:text-black prose-em:text-black prose-li:text-black prose-blockquote:border-l-zinc-400 prose-li:marker:text-zinc-400 hover:prose-a:text-blue-500 hover:prose-a:underline;
}
</style>
