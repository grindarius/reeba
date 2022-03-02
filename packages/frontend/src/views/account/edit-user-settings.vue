<template>
  <div class="edit-user-settings-page">
    <h1 class="page-header">
      Edit Settings
    </h1>
    <section class="setting-bg-content">
      <form>
        <div class="flex justify-center">
          <img class="object-cover object-center w-24 h-24 rounded-full" src="@/assets/user.png" alt="Avatar Upload">
        </div>
        <div class="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
          <div>
            <label class="text-header" for="username">Username</label>
            <input id="username" type="text" class="box-text">
          </div>
          <label class="block">
            <div>
              <label class="text-header" for="password">Password</label>
              <input id="password" type="password" class="box-text">
            </div>
          </label>
          <div>
            <label class="text-header" for="emailAddress">Email Address</label>
            <input id="edit-user-settings-email-input" type="email" class="box-text">
          </div>
          <div>
            <label class="text-header" for="passwordConfirmation">Confirm Password</label>
            <input id="edit-user-settings-password-confirmation-input" type="password" class="box-text">
          </div>
          <div>
            <label class="text-header" for="birthday">Birthday</label>
            <input id="birthday" type="password" class="box-text">
          </div>
        </div>
        <div class="flex justify-center mt-6">
          <button class="button-save">
            Save
          </button>
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
  @apply text-base font-bold text-pale-gray;
}

.box-text {
  @apply block py-2 px-4 mt-2 w-full text-gray-700 bg-white rounded-md border border-gray-300 dark:text-black dark:bg-gray-100 dark:border-gray-600 focus:border-blue-500 focus:ring focus:outline-none dark:focus:border-blue-500;
}

.button-save {
  @apply py-2 px-6 leading-5 text-white rounded-md transition-colors duration-200 transform bg-pale-gray hover:bg-gray-hover;
}

.setting-bg-content {
  @apply p-6 mx-auto mt-8 w-full rounded-md shadow-md bg-pale-yellow;
}
</style>
