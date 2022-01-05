<template>
<div class="my-tickets-page">
  <h2 class="page-header">My tickets</h2>
  <section class="content-box-size">
    <div class="content-box-inside">
      <div class="content-box-setting-image">
        <img class="content-box-picture" src="@/assets/photo.jpg">
      </div>
      <div class="content-box-textbox">
        <h1 class="content-box-frontsize-title">Rajamangala National Stadium</h1>
        <h1 class="content-box-frontsize-main">Seat</h1>
        <h1 class="content-box-frontsize-message">C4-C09</h1>
        <h1 class="content-box-frontsize-main">Prices</h1>
        <h1 class="content-box-frontsize-message">6800 THB</h1>
        <h1 class="content-box-frontsize-main">Show date</h1>
        <h1 class="content-box-frontsize-message">Wednesday, 6 April 2022</h1>
        <h1 class="content-box-frontsize-message">Thursday, 7 April 2022</h1>
        <div class="flex flex-col">
          <div class="flex justify-center">
            <a href="#" class="button-chang">
              Transfer
            </a>
            <a href="#" class="button-chang">
              Change descriptions
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'my-tickets'
})
</script>

<style scoped lang="scss">
.content-box {
  @apply w-full my-1 border-none;
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

.page-header {
  @apply text-4xl font-semibold text-white;
}

.button-chang {
  @apply bg-pale-gray rounded-full font-bold text-xs text-white px-3 py-2 hover:bg-gray-hover mr-1;
}
</style>
