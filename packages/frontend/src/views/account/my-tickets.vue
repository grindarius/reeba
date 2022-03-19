<template>
  <div class="my-tickets-page">
    <h2 class="page-header">
      My tickets
    </h2>
    <section class="mt-8">
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
              <label for="transfer-ownership-modal" class="btn modal-button">Transfer Ownership</label>
              <router-link to="/select-seat" class="command-buttons">
                Change descriptions
              </router-link>
              <router-link to="/receipt" class="command-buttons">
                View receipt
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <input type="checkbox" id="transfer-ownership-modal" class="modal-toggle">
  <label for="transfer-ownership-modal" class="modal cursor-pointer" style="background-color: #00000055;">
    <label class="modal-box relative" for="">
      <h3 class="text-lg font-bold">Congratulations random Interner user!</h3>
      <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    </label>
  </label>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

import { useCounter } from '@/composables'

export default defineComponent({
  name: 'my-tickets',
  setup () {
    const { life } = useCounter()

    onMounted(() => {
      console.log(life.value)
    })

    return {
      life
    }
  }
})
</script>

<style scoped lang="scss">
.content-box-inside {
  @apply flex overflow-hidden flex-col max-w-xl rounded-lg md:flex-row bg-pale-yellow;
}

.content-box-picture {
  @apply object-cover object-center w-full h-64 md:h-full;
}

.content-box-setting-image {
  @apply md:w-2/5;
}

.content-box-textbox {
  @apply p-6 space-y-2 w-full text-left md:p-4 md:w-4/5;

  & h1 {
    @apply text-sm font-bold text-gray-900;
  }

  & h2 {
    @apply text-xs font-normal text-gray-600;
  }

  & h3 {
    @apply text-xs font-normal text-gray-900;
  }
}

.page-header {
  @apply text-4xl font-semibold text-white;
}

.command-buttons {
  @apply py-2 px-3 mr-1 text-xs font-bold text-white rounded-full bg-pale-gray hover:bg-gray-hover;
}

</style>
