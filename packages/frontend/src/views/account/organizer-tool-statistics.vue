<template>
  <div class="organizer-tool-statistics-page">
    <div class="organizer-tool-statistics-page-content">
      <h1 class="text-4xl text-white">
        organizer-tool-statistics
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'organizer-tool-statistics'
})
</script>

<style scoped lang="scss">
.organizer-tool-statistics-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.organizer-tool-statistics-page-content {
  @apply container mt-6;
}
</style>
