<template>
<div class="edit-user-settings-page">
  <h1 class="page-header">Edit Settings</h1>

  <section class="setting-bg-content">
    <form>
      <div class="flex justify-center">
        <img class="rounded-full object-cover object-center h-24 w-24" src="@/assets/user.png" alt="Avatar Upload" />
      </div>
      <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label class="text-header" for="username">Username</label>
          <input id="username" type="text" class="box-text">
        </div>
        <div>
          <label class="text-header" for="emailAddress">Email Address</label>
          <input id="emailAddress" type="email" class="box-text">
        </div>
        <div>
          <label class="text-header" for="password">Password</label>
          <input id="password" type="password" class="box-text">
        </div>
        <div>
          <label class="text-header" for="passwordConfirmation">Confirm Password</label>
          <input id="passwordConfirmation" type="password" class="box-text">
        </div>
      </div>
      <div class="flex justify-center mt-6">
        <button class="button-save">Save</button>
      </div>
    </form>
  </section>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'edit-user-settings'
})
</script>

<style scoped lang="scss">
.page-header {
  @apply text-4xl font-semibold text-white;
}

.text-header {
  @apply  text-base text-pale-gray font-bold;
}

.box-text {
  @apply block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring;
}

.button-save {
  @apply px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pale-gray rounded-md hover:bg-gray-hover;
}

.setting-bg-content {
  @apply w-full p-6 mx-auto bg-pale-yellow rounded-md shadow-md  mt-10;
}
</style>
