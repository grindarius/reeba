<template>
<div class="purchase-history-page">
  <h1 class="page-header">Purchase History</h1>
  <section class="content-box-size">
    <div class="content-box-inside">
      <div class="content-box-setting-image">
        <img class="content-box-picture" src="@/assets/photo.jpg" />
      </div>
      <div class="content-box-textbox">
        <p class="content-box-frontsize-title">Rajamangala National Stadium</p>
        <p class="content-box-frontsize-main">Seat</p>
        <p class="content-box-frontsize-message">C4-C09</p>
        <p class="content-box-frontsize-main">Prices</p>
        <p class="content-box-frontsize-message">6800 THB</p>
        <p class="content-box-frontsize-main">Show date</p>
        <p class="content-box-frontsize-message">Wednesday, 6 April 2022</p>
        <p class="content-box-frontsize-message">Thursday, 7 April 2022</p>
      </div>
    </div>
  </section>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'purchase-history'
})
</script>

<style scoped lang="scss">
.page-header {
  @apply text-4xl font-semibold text-white;
}

.content-box-frontsize-title {
  @apply text-sm text-gray-900 font-bold;
}

.content-box-frontsize-main {
  @apply text-xs text-gray-900 font-normal;
}

.content-box-frontsize-message {
  @apply text-xs text-gray-600 font-normal;
}

.content-box-size {
  @apply max-w-md py-4;
}

.content-box-inside {
  @apply w-full bg-pale-yellow rounded-lg  overflow-hidden flex flex-col md:flex-row;
}

.content-box-picture {
  @apply object-center object-cover h-64 md:h-full w-full;
}

.content-box-setting-image {
  @apply md:w-2/5;
}

.content-box-textbox {
  @apply w-full md:w-3/5 text-left p-6 md:p-4 space-y-2;
}

</style>
