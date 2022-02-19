<template>
  <nav class="navbar">
    <div class="flex-1 big-navbar">
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
        <router-link class="button" to="/signin">
          Login/Sign up
        </router-link>
      </div>
      <div class="buttons-mobile">
        <v-mdi name="mdi-hamburger" class="cursor-pointer" size="40" fill="#423E41" @click="onHamburgerClicked" />
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
      </ul>
    </div>
  </nav>
  <router-view />
  <footer class=" dark:text-black">
    <div class="container flex flex-col justify-center py-10 mx-auto lg:flex-row lg:space-y-center">
      <div class="lg:w-1/5">
        <a rel="noopener noreferrer" href="#" class="flex justify-center space-x-3 lg:justify-start">
          <div class="space-y-3 ">
            <div class="font-bold md:mt-8">
              Follow us
            </div>
            <div class="flex justify-start space-x-3">
              <a rel="noopener noreferrer" href="#" title="Facebook" class="flex items-center p-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" class="w-5 h-5 fill-current">
                  <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z" />
                </svg>
              </a>
              <a rel="noopener noreferrer" href="#" title="Twitter" class="flex items-center p-1">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current">
                  <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                </svg>
              </a>
              <a rel="noopener noreferrer" href="#" title="Instagram" class="flex items-center p-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" class="w-5 h-5 fill-current">
                  <path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 2.88c4.271 0 4.781 0.021 6.469 0.093 1.557 0.073 2.405 0.333 2.968 0.553 0.751 0.291 1.276 0.635 1.844 1.197 0.557 0.557 0.901 1.088 1.192 1.839 0.22 0.563 0.48 1.411 0.553 2.968 0.072 1.688 0.093 2.199 0.093 6.469s-0.021 4.781-0.099 6.469c-0.084 1.557-0.344 2.405-0.563 2.968-0.303 0.751-0.641 1.276-1.199 1.844-0.563 0.557-1.099 0.901-1.844 1.192-0.556 0.22-1.416 0.48-2.979 0.553-1.697 0.072-2.197 0.093-6.479 0.093s-4.781-0.021-6.48-0.099c-1.557-0.084-2.416-0.344-2.979-0.563-0.76-0.303-1.281-0.641-1.839-1.199-0.563-0.563-0.921-1.099-1.197-1.844-0.224-0.556-0.48-1.416-0.563-2.979-0.057-1.677-0.084-2.197-0.084-6.459 0-4.26 0.027-4.781 0.084-6.479 0.083-1.563 0.339-2.421 0.563-2.979 0.276-0.761 0.635-1.281 1.197-1.844 0.557-0.557 1.079-0.917 1.839-1.199 0.563-0.219 1.401-0.479 2.964-0.557 1.697-0.061 2.197-0.083 6.473-0.083zM16 7.787c-4.541 0-8.213 3.677-8.213 8.213 0 4.541 3.677 8.213 8.213 8.213 4.541 0 8.213-3.677 8.213-8.213 0-4.541-3.677-8.213-8.213-8.213zM16 21.333c-2.948 0-5.333-2.385-5.333-5.333s2.385-5.333 5.333-5.333c2.948 0 5.333 2.385 5.333 5.333s-2.385 5.333-5.333 5.333zM26.464 7.459c0 1.063-0.865 1.921-1.923 1.921-1.063 0-1.921-0.859-1.921-1.921 0-1.057 0.864-1.917 1.921-1.917s1.923 0.86 1.923 1.917z" />
                </svg>
              </a>
            </div>
          </div>
        </a>
      </div>
      <div class="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4 ">
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
              <a rel="noopener noreferrer" href="#">+(66)2 026 3068
                10.30-18.00(UTC+7), Mon-Fri
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" href="#">@ReebA</a>
            </li>
            <li>
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
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'app',
  setup () {
    const hamburgerState = ref(false)

    const onHamburgerClicked = (): void => {
      hamburgerState.value = !hamburgerState.value
    }

    const closeHamburger = (): void => {
      hamburgerState.value = false
    }

    return {
      onHamburgerClicked,
      hamburgerState,
      closeHamburger
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
  @apply hidden justify-center items-center lg:flex;

  .button {
    @apply p-1 mx-6 w-36 h-8 text-white whitespace-nowrap rounded-lg outline-none bg-pale-gray;

    &:last-child {
      @apply mr-2 #{!important};
    }
  }
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
