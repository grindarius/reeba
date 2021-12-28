<template>
<div class="event-page">
 <div class="event-page-content">
   <img class="object-none object-left-top float-left text-5xl rounded-lg " src="@/assets/bts-world-tour.jpg">
    <p class="indent-10 text-5xl text-white ml-100 mt-10">BTS WORLD TOUR 'LOVE YOURSELF' BANGKOK</p>
     <div class="grid grid-rows-3 grid-flow-col gap-1">

      <div class="text-l text-white " >
       <v-mdi name="mdi-calendar-blank" size="60" class="ml-10 mt-10 " style="color:#D5A755" ></v-mdi>
        Show date
        6-7 April 2022·19.00
      </div>

     <v-mdi name="mdi-currency-usd " size="60" class="ml-10 mt-10" style="color:#D5A755" ></v-mdi>
     <v-mdi name="mdi-map-marker-account" size="60" class="ml-10 mt-10" style="color:#D5A755" ></v-mdi>
     <v-mdi name="mdi-alarm" size="60" class="ml-10 mt-10" style="color:#D5A755" ></v-mdi>
     </div>
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
  @apply container mt-10 ;
}
</style>
