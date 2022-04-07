<template>
  <metainfo>
    <template #title="{ content }">
      {{ content }} | ReebA: Ticket booking. Redefined.
    </template>
  </metainfo>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMeta } from 'vue-meta'

export default defineComponent({
  name: 'organizer-tool-edit-event',
  setup () {
    useMeta({
      title: 'Edit event'
    })
  }
})
</script>
