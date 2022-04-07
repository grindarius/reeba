<template>
  <div class="organizer-tool-orders-page">
    <div class="organizer-tool-orders-page-content">
      <h1 class="text-4xl text-white">
        organizer-tool-orders
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'organizer-tool-orders'
})
</script>

<style scoped lang="scss">
.organizer-tool-orders-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.organizer-tool-orders-page-content {
  @apply container mt-6;
}
</style>
