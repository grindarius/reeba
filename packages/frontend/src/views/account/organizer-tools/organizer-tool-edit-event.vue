<template>
  <metainfo>
    <template #title="{ content }">
      {{ content }} | ReebA: Ticket booking. Redefined.
    </template>
  </metainfo>
</template>

<script lang="ts">
import ky from 'ky'
import { defineComponent, onMounted } from 'vue'
import { useMeta } from 'vue-meta'
import { useRoute, useRouter } from 'vue-router'

import { getEditableEventData as getEditableEventDataEndpoint } from '@/api/endpoints'
import { useAuthStore } from '@/store/use-auth-store'

export default defineComponent({
  name: 'organizer-tool-edit-event',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()

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
        }).json()

        console.log(response)
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
  }
})
</script>
