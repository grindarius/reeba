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
            <button class="command-buttons" @click="openModal">
              Transfer
            </button>
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
  <div class="cursor-pointer modal-background" v-if="transferOwnershipModalState">
    <div class="modal">
      <div class="modal-content">
        <div class="modal-title">
          <h1>Transfer ownership</h1>
          <button class="modal-close-button-icon" @click="closeModal">
            <v-mdi fill="#fff" name="mdi-close-circle-outline"></v-mdi>
          </button>
        </div>
        <div class="modal-body">
          <h1 class="font-semibold text-white">
            Who are you going to transfer the ticket to?
          </h1>
          <div class="searchbar">
            <label>
              <input type="text" name="searchbar" placeholder="Search">
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <div>
            <button class="modal-close-button" type="button" @click="closeModal">
              Close
            </button>
            <button class="modal-accept-button" type="button" @click="closeModal">
              Submit changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-background-color" v-if="transferOwnershipModalState"></div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'my-tickets',
  setup () {
    const transferOwnershipModalState = ref(false)

    const closeModal = (): void => {
      transferOwnershipModalState.value = false
    }

    const openModal = (): void => {
      transferOwnershipModalState.value = true
    }

    return {
      transferOwnershipModalState,
      closeModal,
      openModal
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

.searchbar {
  @apply flex flex-col justify-center;

  & input {
    @apply pr-2 pl-11 w-96 h-7 text-black bg-white rounded-lg shadow-lg outline-none;
  }
}

label {
  @apply relative;

  &:before {
    @apply absolute bottom-0 left-3 w-5;
    top: 3px;
    content: '';
    background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20id%3D%22mdi-magnify%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23D5A755%22%20d%3D%22M9.5%2C3A6.5%2C6.5%200%200%2C1%2016%2C9.5C16%2C11.11%2015.41%2C12.59%2014.44%2C13.73L14.71%2C14H15.5L20.5%2C19L19%2C20.5L14%2C15.5V14.71L13.73%2C14.44C12.59%2C15.41%2011.11%2C16%209.5%2C16A6.5%2C6.5%200%200%2C1%203%2C9.5A6.5%2C6.5%200%200%2C1%209.5%2C3M9.5%2C5C7%2C5%205%2C7%205%2C9.5C5%2C12%207%2C14%209.5%2C14C12%2C14%2014%2C12%2014%2C9.5C14%2C7%2012%2C5%209.5%2C5Z%22%2F%3E%3C%2Fsvg%3E');
  }
}

.page-header {
  @apply text-4xl font-semibold text-white;
}

.command-buttons {
  @apply py-2 px-3 mr-1 text-xs font-bold text-white rounded-full bg-pale-gray hover:bg-gray-hover;
}

.modal-background {
  @apply flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center outline-none focus:outline-none;
}

.modal-background-color {
  @apply fixed inset-0 top-0 z-40 bg-black opacity-25;
}

.modal {
  @apply relative my-6 mx-auto w-full max-w-xl;
}

.modal-content {
  @apply flex relative flex-col w-full rounded-lg border-0 shadow-lg outline-none focus:outline-none bg-pale-gray;
}

.modal-title {
  @apply flex justify-between items-start p-5 rounded-t;

  & h1 {
    @apply text-3xl font-semibold text-white;
  }
}

.modal-close-button-icon {
  @apply float-right p-1 ml-auto text-3xl font-semibold leading-none text-black border-0 outline-none focus:outline-none;
}

.modal-body {
  @apply flex relative flex-col gap-y-6 justify-center items-center py-3 px-5;
}

.modal-footer {
  @apply flex justify-end items-center p-6 rounded-b;
}

.modal-close-button {
  @apply px-6 py-2 mr-1 mb-1 text-lg font-bold uppercase rounded-lg transition-all duration-150 ease-linear outline-none focus:outline-none text-pale-gray bg-pale-yellow;
}

.modal-accept-button {
  @apply px-6 py-2 mr-1 mb-1 text-lg font-bold uppercase rounded-lg transition-all duration-150 ease-linear outline-none focus:outline-none text-pale-gray bg-pale-yellow;
}
</style>
