<template>
  <nav class="navbar bg-primary">
    <div class="navbar-start">
      <router-link to="/">
        <img src="@/assets/reeba-logo-2.png" alt="Reeba logo" width="35" class="cursor-pointer">
      </router-link>
    </div>
    <div class="navbar-center">
      <div class="form-control">
        <input type="text" placeholder="Search" class="input w-54 input-bordered">
      </div>
    </div>
    <div class="navbar-end">
      <router-link to="/create" custom v-slot="{ navigate }">
        <button class="btn btn-accent mr-6" @click="navigate">
          Create Event
        </button>
      </router-link>
      <router-link to="/signin" custom v-slot="{ navigate }">
        <button v-show="!authStore.isAuthenticated" @click="navigate" class="btn btn-accent">
          Sign in
        </button>
      </router-link>
      <div v-show="authStore.isAuthenticated" class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://api.lorem.space/image/face?hash=33791">
          </div>
        </label>
        <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-primary text-base-100 font-bold rounded-box w-52">
          <li>
            <router-link :to="`/${authStore.userData.username}`">
              Profile
            </router-link>
          </li>
          <li>
            <router-link to="/account">
              Settings
            </router-link>
          </li>
          <li>
            <button @click="signout" class="font-bold">
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view :key="$route.fullPath" />
  <footer class="dark:text-black">
    <div class="container flex flex-col justify-center py-10 mx-auto lg:flex-row lg:space-y-center">
      <div class="md:w-1/5">
        <a rel="noopener noreferrer" href="#" class="flex justify-start space-x-3">
          <div class="space-y-3">
            <div class="px-4 mt-10 font-bold md:mt-8">
              Follow us
            </div>
            <div class="flex justify-start px-4 mt-10 space-x-3">
              <a class="block p-0 rounded-full bg-pale-yellow">
                <a rel="noopener noreferrer" href="#" title="Facebook" class="flex items-center p-1">
                  <v-mdi name="mdi-facebook" size="40" fill="#FFFFFF" />
                </a>
              </a>
              <a class="block p-0 rounded-full bg-pale-yellow">
                <a rel="noopener noreferrer" href="#" title="Twitter" class="flex items-center p-1">
                  <v-mdi name="mdi-twitter" size="40" fill="#FFFFFF" />
                </a>
              </a>
              <a class="block p-0 rounded-full bg-pale-yellow">
                <a rel="noopener noreferrer" href="#" title="Instagram" class="flex items-center p-1">
                  <v-mdi name="mdi-Instagram" size="40" fill="#FFFFFF" />
                </a>
              </a>
            </div>
          </div>
        </a>
      </div>
      <div class="footer-help">
        <div class="space-y-3">
          <h3 class="font-bold text-black-700">
            Need help?
          </h3>
          <ul class="space-y-3 text-gray-600">
            <li>
              <a rel="noopener noreferrer" href="#">How to buy tickets?</a>
            </li>
            <li>
              <a rel="noopener noreferrer" href="#">Where are my tickets?</a>
            </li>
            <li>
              <a rel="noopener noreferrer" href="#">How to use e-ticket?</a>
            </li>
            <li>
              <a rel="noopener noreferrer" href="#">Help Center</a>
            </li>
          </ul>
        </div>
        <div class="space-y-3">
          <h3 class="font-bold text-black-700">
            Customer Support
          </h3>
          <ul class="space-y-3 text-gray-600">
            <li>
              <button class="inline-flex justify-center items-center mr-1 w-5 h-5 text-white rounded-full transition-colors duration-150 bg-pale-yellow focus:shadow-outline">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 3l-6 6m0 0V4m0 5h5M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                </svg>
              </button>
              <a rel="noopener noreferrer" href="#">+(66)2 026 3068
                10.30 - 18.00 (UTC +7), Mon - Fri
              </a>
            </li>
            <li>
              <button class="inline-flex justify-center items-center mr-1 w-5 h-5 text-white rounded-full transition-colors duration-150 bg-pale-yellow focus:shadow-outline">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                </svg>
              </button>
              <a rel="noopener noreferrer" href="#">@reeba</a>
            </li>
            <li>
              <button class="inline-flex justify-center items-center mr-1 w-5 h-5 text-white rounded-full transition-colors duration-150 bg-pale-yellow focus:shadow-outline">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
              <a rel="noopener noreferrer" href="#">support@reeba.com</a>
            </li>
          </ul>
        </div>
        <div class="space-y-3">
          <h3 class="font-bold text-black-700">
            Our Services
          </h3>
          <ul class="space-y-3 text-gray-600">
            <li>
              <a rel="noopener noreferrer" href="#">How it works</a>
            </li>
            <li>
              <a rel="noopener noreferrer" href="#">Pricing</a>
            </li>
            <li>
              <a rel="noopener noreferrer" href="#">Customer Stories</a>
            </li>
            <li>
              <a rel="noopener noreferrer" href="#">Talk to us</a>
            </li>
          </ul>
        </div>
        <div class="space-y-3">
          <ul class="space-y-3 text-gray-600">
            <li>
              <button class="inline-flex justify-center items-center mr-1 w-5 h-5 text-white rounded-full transition-colors duration-150 bg-pale-yellow focus:shadow-outline">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 3l-6 6m0 0V4m0 5h5M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                </svg>
              </button>
              <a rel="noopener noreferrer" href="#">+(66)2 026 3235</a>
            </li>
            <li>
              <button class="inline-flex justify-center items-center mr-1 w-5 h-5 text-white rounded-full transition-colors duration-150 bg-pale-yellow focus:shadow-outline">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
              <a rel="noopener noreferrer" href="#">sales@reeba.com</a>
            </li>
          </ul>
          <router-link to="" class="buy-button">
            Sell Tickets
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

import { getUserAvatar } from '@/api/endpoints'
import { useModalState } from '@/composables'
import { useAuthStore } from '@/store/use-auth-store'

export default defineComponent({
  name: 'app',
  setup () {
    const authStore = useAuthStore()
    const router = useRouter()

    const { state: dropdownState, toggle: dropdownClicked, close: closeDropdown } = useModalState()
    const { state: hamburgerState, toggle: toggleHamburger, close: closeHamburger } = useModalState()

    const signout = (): void => {
      authStore.signout()
      closeDropdown()
      router.push('/')
    }

    const dropdownStateClass = computed(() => {
      return authStore.isAuthenticated ? 'py-1 block' : 'py-1 hidden'
    })

    const signinButtonStateClass = computed(() => {
      return !authStore.isAuthenticated ? 'py-1 block' : 'py-1 hidden'
    })

    const hamburgerStateClass = computed(() => {
      return hamburgerState ? 'small-navbar block' : 'small-navbar hidden'
    })

    return {
      toggleHamburger,
      closeHamburger,
      dropdownClicked,
      dropdownState,
      closeDropdown,
      authStore,
      getUserAvatar,
      signout,
      dropdownStateClass,
      signinButtonStateClass,
      hamburgerStateClass

    }
  }
})
</script>

<style scoped lang="scss">
.big-navbar {
  min-height: 48px;
  @apply flex flex-row justify-between;
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
  @apply hidden justify-end items-center w-96 lg:flex;

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
  @apply mr-4 rounded-full;
}

.dropdown-navbar {
  @apply items-center py-2.5 px-4 mr-3 mb-3 md:mb-0;
}

.dropdown-state {
  @apply hidden z-10 place-self-end mt-2 mr-2 w-44 bg-white rounded-lg divide-y divide-gray-100 shadow lg:block dark:bg-zinc-600;
}

.dropdown-text {
  @apply block py-2 px-4 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white;
}

.buy-button {
  @apply inline-block py-2 px-8 text-white rounded-lg bg-pale-gray hover:bg-gray-hover;
}

.footer-help {
  @apply grid grid-cols-1 gap-x-3 gap-y-8 px-4 mt-10 text-sm sm:grid-cols-4 lg:w-2/3;
}

.buttons-mobile {
  @apply flex items-center mr-3 lg:hidden;
}

// label {
//   @apply relative;

//   &:before {
//     @apply absolute bottom-0 left-3 w-5;
//     top: 3px;
//     content: '';
//     background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20id%3D%22mdi-magnify%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23D5A755%22%20d%3D%22M9.5%2C3A6.5%2C6.5%200%200%2C1%2016%2C9.5C16%2C11.11%2015.41%2C12.59%2014.44%2C13.73L14.71%2C14H15.5L20.5%2C19L19%2C20.5L14%2C15.5V14.71L13.73%2C14.44C12.59%2C15.41%2011.11%2C16%209.5%2C16A6.5%2C6.5%200%200%2C1%203%2C9.5A6.5%2C6.5%200%200%2C1%209.5%2C3M9.5%2C5C7%2C5%205%2C7%205%2C9.5C5%2C12%207%2C14%209.5%2C14C12%2C14%2014%2C12%2014%2C9.5C14%2C7%2012%2C5%209.5%2C5Z%22%2F%3E%3C%2Fsvg%3E');
//   }
// }
</style>
