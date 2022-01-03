<template>
<div class="developer-tools-page">
  <div class="developer-tools-page-content">
    <h1 class="text-white text-4xl">developer-tools</h1>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'developer-tools'
})
</script>

<style scoped lang="scss">
.developer-tools-page {
  @apply w-full min-h-screen flex flex-row justify-center bg-pale-gray;
}

.developer-tools-page-content {
  @apply mt-6 container;
}
</style>
