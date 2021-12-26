<template>
<div class="event-page">
 <div class="event-page-content">
   <img class="object-none object-left-top float-left text-5xl " src="@/assets/bts-world-tour.jpg">
   <p class="indent-8 text-4xl text-white ml-100 mt-10">BTS WORLD TOUR 'LOVE YOURSELF' BANGKOK</p>
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
