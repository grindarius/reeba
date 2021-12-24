<template>
  <div class="select-seat-page">
    <div class="container px-36 py-6">
      <p class="title">Stage zones</p>
      <div class="px-12 py-6 place-self-center w-[40rem]">
        <div class="seat">
          <button class="button"><p class="seat-text">A1</p></button>
          <button class="button"><p class="seat-text">A2</p></button>
          <button class="button"><p class="seat-text">A3</p></button>
          <button class="button"><p class="seat-text">A4</p></button>
          <button class="button"><p class="seat-text">A5</p></button>
          <button class="button"><p class="seat-text">B1</p></button>
          <button class="button"><p class="seat-text">B2</p></button>
          <button class="button"><p class="seat-text">B3</p></button>
          <button class="button"><p class="seat-text">B4</p></button>
          <button class="button"><p class="seat-text">B5</p></button>
          <button class="button"><p class="seat-text">C1</p></button>
          <button class="button"><p class="seat-text">C2</p></button>
          <button class="button"><p class="seat-text">C3</p></button>
          <button class="button"><p class="seat-text">C4</p></button>
          <button class="button"><p class="seat-text">C5</p></button>
        </div>
      </div>
      <p class="title">Zones</p>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'select-seat'
})
</script>

<style lang="scss">
.select-seat-page {
  @apply w-full flex justify-center;
}

.title {
  @apply text-4xl font-sans font-semibold;
}

.button {
  @apply bg-pale-yellow hover:ring text-white font-bold py-2 px-4 rounded h-24 active:bg-yellow-500 focus:outline-none focus:bg-pale-gray;
}

.seat {
  @apply grid grid-cols-5 gap-4;
}

.seat-text {
  @apply text-4xl font-sans font-semibold;
}
</style>
