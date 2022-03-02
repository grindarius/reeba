<template>
  <div class="-page">
    <div class="-page-content">
      <h1 class="text-4xl text-white" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'search-result'
})
</script>

<style scoped lang="scss">
.-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.-page-content {
  @apply container mt-6;
}
</style>
