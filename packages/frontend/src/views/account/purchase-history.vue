<template>
<div class="purchase-history-page">
  <div class="purchase-history-page-content">
    <h1 class="text-white text-4xl">purchase-history</h1>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'purchase-history'
})
</script>

<style scoped lang="scss">
.purchase-history-page {
  @apply w-full min-h-screen flex flex-row justify-center bg-pale-gray;
}

.purchase-history-page-content {
  @apply mt-6 container;
}
</style>
