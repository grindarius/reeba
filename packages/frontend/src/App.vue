<template>
  <nav class="navbar">
    <div class="big-navbar">
      <div class="logo w-12 lg:w-96">
        <img src="@/assets/reeba-logo.png" alt="Reeba logo" width="48" class="logo-image">
      </div>
      <div class="searchbar">
        <label>
          <input type="text" name="searchbar" id="searchbar">
        </label>
      </div>
      <div class="buttons">
        <router-link class="create-event-button" to="/create">
          Create event
        </router-link>
        <router-link class="login-button" to="/login">
          Login/Sign up
        </router-link>
      </div>
      <div class="buttons-mobile">
        <v-mdi name="mdi-hamburger" size="40" fill="#423E41"></v-mdi>
      </div>
    </div>
    <div class="small-navbar">
      <ul>
        <li>lorem</li>
        <li>lorem</li>
        <li>lorem</li>
        <li>lorem</li>
        <li>lorem</li>
      </ul>
    </div>
  </nav>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style scoped lang="scss">
.navbar {
  @apply h-12 w-full bg-pale-yellow text-center;
}

.big-navbar {
  @apply flex flex-row justify-between;
}

.small-navbar {
  @apply lg:hidden flex items-start;
}

.logo-image {
  @apply ml-2;
}

.searchbar {
  @apply flex flex-col justify-center;

  & input {
    @apply hidden lg:block rounded-lg bg-pale-gray shadow-lg w-96 h-7 pl-11 pr-2 outline-none text-white;
  }
}

.create-event-button, .login-button {
  @apply w-36 h-8 bg-pale-gray whitespace-nowrap rounded-lg outline-none text-white p-1 mx-6;
}

.buttons {
  @apply hidden lg:flex justify-center items-center;
}

.buttons-mobile {
  @apply flex items-center lg:hidden mr-3;
}

label {
  @apply relative;

  &:before {
    @apply absolute left-3 bottom-0 w-5;
    top: 3px;
    content: '';
    background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20id%3D%22mdi-magnify%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23D5A755%22%20d%3D%22M9.5%2C3A6.5%2C6.5%200%200%2C1%2016%2C9.5C16%2C11.11%2015.41%2C12.59%2014.44%2C13.73L14.71%2C14H15.5L20.5%2C19L19%2C20.5L14%2C15.5V14.71L13.73%2C14.44C12.59%2C15.41%2011.11%2C16%209.5%2C16A6.5%2C6.5%200%200%2C1%203%2C9.5A6.5%2C6.5%200%200%2C1%209.5%2C3M9.5%2C5C7%2C5%205%2C7%205%2C9.5C5%2C12%207%2C14%209.5%2C14C12%2C14%2014%2C12%2014%2C9.5C14%2C7%2012%2C5%209.5%2C5Z%22%2F%3E%3C%2Fsvg%3E');
  }
}
</style>
