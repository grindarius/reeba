<template>
<div class="organizer-tools-page">
  <div class="organizer-tools-page-content">
    <h1 class="text-white text-4xl">organizer-tools</h1>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'organizer-tools'
})
</script>

<style scoped lang="scss">
.organizer-tools-page {
  @apply w-full min-h-screen flex flex-row justify-center bg-pale-gray;
}

.organizer-tools-page-content {
  @apply mt-6 container;
}
</style>
