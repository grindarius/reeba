<template>
  <div class="organizer-tool-edit-event-page">
    <div class="organizer-tool-edit-event-page-content">
      <h1 class="text-4xl text-white">
        organizer-tool-edit-event
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'organizer-tool-edit-event'
})
</script>

<style scoped lang="scss">
.organizer-tool-edit-event-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.organizer-tool-edit-event-page-content {
  @apply container mt-6;
}
</style>
