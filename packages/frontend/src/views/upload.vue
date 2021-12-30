<template>
<div class="upload">
  <div class="upload-content">

  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'upload'
})
</script>

<style lang="scss">
.upload {
  @apply w-full min-h-screen flex flex-row justify-center bg-pale-gray;
}

.upload-content {
  @apply mt-6 container;
}
</style>
