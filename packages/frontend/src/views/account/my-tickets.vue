<template>
<div class="my-tickets-page">
  <h2 class="page-header">My tickets</h2>
  <section class="content-box-size">
    <div class="content-box-inside">
      <div class="content-box-setting-image">
        <img class="content-box-picture" src="@/assets/photo.jpg">
      </div>
      <div class="content-box-textbox">
        <h1>Rajamangala National Stadium</h1>
        <h3>Seat</h3>
        <h2>C4-C09</h2>
        <h3>Prices</h3>
        <h2>6800 THB</h2>
        <h3>Show date</h3>
        <h2>Wednesday, 6 April 2022</h2>
        <h2>Thursday, 7 April 2022</h2>
        <div class="flex flex-col">
          <div class="flex justify-center">
            <a href="#" class="command-buttons">
              Transfer
            </a>
            <a href="#" class="command-buttons">
              Change descriptions
            </a>
            <router-link to="/receipt" class="command-buttons">
              View receipt
            </router-link>
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
.content-box-inside {
  @apply bg-pale-yellow rounded-lg overflow-hidden flex flex-col md:flex-row max-w-xl;
}

.content-box-picture {
  @apply object-center object-cover h-64 md:h-full w-full;
}

.content-box-setting-image {
  @apply md:w-2/5;
}

.content-box-textbox {
  @apply w-full md:w-4/5 text-left p-6 md:p-4 space-y-2;

  & h1 {
    @apply text-sm text-gray-900 font-bold;
  }

  & h2 {
    @apply text-xs text-gray-600 font-normal;
  }

  & h3 {
    @apply text-xs text-gray-900 font-normal;
  }
}

.page-header {
  @apply text-4xl font-semibold text-white;
}

.command-buttons {
  @apply bg-pale-gray rounded-full font-bold text-xs text-white px-3 py-2 hover:bg-gray-hover mr-1;
}
</style>
