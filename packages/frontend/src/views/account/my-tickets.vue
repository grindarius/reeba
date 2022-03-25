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
              <label for="transfer-ownership-modal" class="btn modal-button command-buttons">Transfer Ownership</label>
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
  <label for="transfer-ownership-modal" class="cursor-pointer modal" style="background-color: #00000055;">
    <label class="relative modal-box" for="">
      <h3 class="text-lg font-bold">Enter Receipt Details</h3>
      <div class="grid grid-cols-1 gap-6 mt-4 ">
        <div>
          <label class="text-header" for="Name">username</label>
          <input id="edit-user-settings-username-input" type="username" class="box-text">
        </div>
      </div>
      <div>
        <div class="modal-action">
          <label for="my-modal-6" class="btn">Cancel</label>
          <label for="my-modal-6" class="btn">Send</label>
        </div>
      </div>
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

.box-text {
  @apply block py-2 px-4 mt-auto mb-5 w-full text-gray-700 bg-white rounded-md border border-gray-300 dark:text-black dark:bg-gray-100 dark:border-gray-600 focus:border-blue-500 focus:ring focus:outline-none dark:focus:border-blue-500;
}

.text-header {
  @apply text-base font-normal text-white;
}

</style>
