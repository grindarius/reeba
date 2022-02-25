<template>
  <nav class="navbar">
    <div class="big-navbar">
      <div class="w-14 lg:w-96 logo">
        <router-link to="/">
          <img src="@/assets/reeba-logo-2.png" alt="Reeba logo" width="35" class="ml-2 cursor-pointer">
        </router-link>
      </div>
      <div class="searchbar">
        <label>
          <input type="text" name="searchbar" id="searchbar-big" placeholder="Search">
        </label>
      </div>
      <div class="buttons">
        <router-link class="button" to="/create">
          Create event
        </router-link>
        <button @click="dropdownClicked" class="dropdown-navbar">
          <img src="@/assets/user.png" class="profile-image-navbar">
          <v-mdi class="place-self-center" name="mdi-chevron-down" fill="#423E41" />
        </button>
      </div>
      <div class="buttons-mobile">
        <v-mdi name="mdi-hamburger" class="cursor-pointer" size="40" fill="#423E41" @click="onHamburgerClicked" />
      </div>
    </div>
    <div v-if="dropdownState" class="dropdown-state">
      <div class="py-1">
        <router-link to="/signin" class="dropdown-text" @click="closeDropdown">
          Login/Sign up
        </router-link>
      </div>
      <ul class="py-1">
        <li>
          <router-link to="/users" class="dropdown-text" @click="closeDropdown">
            My profile
          </router-link>
        </li>
        <li>
          <router-link to="#" class="dropdown-text" @click="closeDropdown">
            Settings
          </router-link>
        </li>
      </ul>
      <div class="py-1">
        <router-link to="#" class="dropdown-text" @click="closeDropdown">
          Sign out
        </router-link>
      </div>
    </div>
    <div :class="hamburgerState ?'small-navbar block' : 'small-navbar hidden'">
      <ul class="small-navbar-list">
        <li>
          <label>
            <input class="pr-2 pl-11 w-full h-7 text-white rounded-lg shadow-lg outline-none bg-pale-gray" type="text" name="searchbar" id="searchbar-small" placeholder="Search">
          </label>
        </li>
        <li>
          <router-link to="/create" @click="closeHamburger" class="inline-block py-2 w-full">
            Create event
          </router-link>
        </li>
        <li>
          <router-link to="/signin" @click="closeHamburger" class="inline-block py-2 w-full">
            Login/Sign up
          </router-link>
        </li>
        <li>
          <router-link to="/users" @click="closeHamburger" class="flex place-items-center">
            <img src="@/assets/user.png" class="profile-image">
            grindarius
          </router-link>
        </li>
        <li>
          <router-link to="/users" @click="closeHamburger" class="inline-block py-2 w-full">
            My profile
          </router-link>
        </li>
        <li>
          <router-link to="#" @click="closeHamburger" class="inline-block py-2 w-full">
            Settings
          </router-link>
        </li>
        <li>
          <router-link to="#" @click="closeHamburger" class="inline-block py-2 w-full">
            Sign out
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'app',
  setup () {
    const hamburgerState = ref(false)

    const dropdownState = ref(false)

    const dropdownClicked = (): void => {
      dropdownState.value = !dropdownState.value
    }

    const onHamburgerClicked = (): void => {
      hamburgerState.value = !hamburgerState.value
    }

    const closeHamburger = (): void => {
      hamburgerState.value = false
    }

    const closeDropdown = (): void => {
      dropdownState.value = false
    }

    return {
      onHamburgerClicked,
      hamburgerState,
      closeHamburger,
      dropdownClicked,
      dropdownState,
      closeDropdown
    }
  }
})
</script>

<style scoped lang="scss">
.navbar {
  min-height: 48px;
  @apply flex flex-col w-full text-center bg-pale-yellow;
}

@media (min-width: 1024px) {

  .navbar {
    height: 48px !important;
  }
}

.big-navbar {
  @apply flex flex-row mt-0.5 justify-between;
}

.small-navbar {
  @apply lg:hidden;
}

.small-navbar-list {

  & > li {
    @apply my-3 mx-6;
  }

  & > li:not(:first-child) {
    @apply px-4 text-left rounded-lg hover:bg-yellow-hover;
  }

  & > li:first-child {
    @apply px-0 text-center;
  }
}

.logo {
  @apply flex justify-start items-center;
}

.searchbar {
  @apply flex flex-col justify-center;

  & input {
    @apply hidden pr-2 pl-11 w-96 h-7 text-white rounded-lg shadow-lg outline-none lg:block bg-pale-gray;
  }
}

.button {
  @apply p-1 mx-6 w-36 h-8 text-white whitespace-nowrap rounded-lg outline-none bg-pale-gray;
}

.buttons {
  @apply hidden justify-center items-center lg:flex;

  .button {
    @apply p-1 mx-6 w-36 h-8 text-white whitespace-nowrap rounded-lg outline-none bg-pale-gray;

    &:last-child {
      @apply mr-2 #{!important};
    }
  }
}

.profile-image-navbar {
  width: 25px;
  height: 25px;
  @apply rounded-full;
}

.profile-image {
  width: 40px;
  height: 40px;
  @apply rounded-full mr-4;
}

.dropdown-navbar {
  @apply mr-3 mb-3 md:mb-0 px-4 py-2.5 inline-flex items-center;
}

.dropdown-state {
  @apply hidden lg:block place-self-end rounded-lg mt-2 mr-2 z-10 w-44 bg-white divide-y divide-gray-100 shadow dark:bg-zinc-600;
}

.dropdown-text {
  @apply block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-gray-200 dark:hover:text-white;
}

.buttons-mobile {
  @apply flex items-center mr-3 lg:hidden;
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
</style>
