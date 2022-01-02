<template>
<div class="upload-page">
  <div class="upload-page-content">
    <h1 class="text-white text-4xl">upload</h1>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'upload'
})
</script>

<style scoped lang="scss">
.upload-page {
  @apply w-full min-h-screen flex flex-row justify-center bg-pale-gray;
}

.upload-page-content {
  @apply mt-6 container;
}
</style>
