<template>
<div class="event-page">
  <div class="event-page-content">
    <img class="object-none object-left-top " src="@/assets/bts-world-tour.jpg">
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'event'
})
</script>

<style scoped lang="scss">
.event-page {
  @apply flex flex-row justify-center w-full bg-pale-gray;
}

.event-page-content {
  @apply container mt-10;
}
</style>
