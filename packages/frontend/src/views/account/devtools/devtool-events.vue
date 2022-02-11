<template>
  <div class="devtool-events-page">
    <div class="devtool-events-page-content">
      <h1 class="text-4xl text-white">
        devtool-events
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'devtool-events'
})
</script>

<style scoped lang="scss">
.devtool-events-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.devtool-events-page-content {
  @apply container mt-6;
}
</style>
